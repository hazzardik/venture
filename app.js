const SUPABASE_URL="https://qmjtmhtmbaseykmwttvn.supabase.co";
const SUPABASE_KEY="sb_publishable_CD-9o4mQVn0j6tltKgRRZA_IsUUq_iJ";
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const C=window.FORGE_CONTENT;

const NAV=[
  ["dashboard","◉","Главная"],
  ["learn","▦","Учёба"],
  ["dictionary","⌕","Словарь"],
  ["cases","◆","Кейсы"],
  ["simulator","▣","Симулятор"],
  ["coach","✦","Coach"],
  ["profile","◎","Профиль"]
];
const LEVELS=[["Apprentice",0],["Builder",300],["Operator",800],["Founder",1500],["Scaler",2500],["Visionary",4000],["Titan",6500]];
const DEFAULT_STATE={onboarded:false,goal:"",xp:0,streak:1,lastVisit:"",lessons:[],terms:[],saved:[],cases:[],simDone:{},name:"",dailyDone:{},version:3};
let state=loadLocalState();
let session=null;
let activeModule="all";
let activeSimulator="coffee";
let sim=null;
let coachMode="idea";
let cloudTimer=null;
let syncBusy=false;

function loadLocalState(){
  try{
    const v3=JSON.parse(localStorage.getItem("forge_v3_state")||"null");
    if(v3) return {...DEFAULT_STATE,...v3,simDone:v3.simDone||{},dailyDone:v3.dailyDone||{}};
    const v2=JSON.parse(localStorage.getItem("forgeState")||"null");
    if(v2) return {...DEFAULT_STATE,...v2,simDone:typeof v2.simDone==="object"?v2.simDone:{coffee:!!v2.simDone},version:3};
    const old=JSON.parse(localStorage.getItem("ventureState")||"null");
    if(old) return {...DEFAULT_STATE,onboarded:!!old.onboarded,goal:normalizeGoal(old.goal),xp:old.xp||0,streak:old.streak||1,terms:old.terms||[],name:"Максим",version:3};
  }catch(e){}
  return {...DEFAULT_STATE};
}
function normalizeGoal(g){
  if(["first","run","mind","curious"].includes(g)) return g;
  if((g||"").toLowerCase().includes("начина")) return "first";
  if((g||"").toLowerCase().includes("веду")) return "run";
  if((g||"").toLowerCase().includes("мышлен")) return "mind";
  return "curious";
}
function todayKey(){return new Date().toISOString().slice(0,10)}
function localSave(sync=true){
  state.lastVisit=todayKey();
  localStorage.setItem("forge_v3_state",JSON.stringify(state));
  renderAll();
  if(sync&&session) scheduleCloudSync();
}
function scheduleCloudSync(){
  clearTimeout(cloudTimer);
  setSyncStatus("Синхронизация…",false);
  cloudTimer=setTimeout(pushCloud,550);
}
function setSyncStatus(text,on){
  const dot=document.getElementById("syncDot"),label=document.getElementById("syncText");
  if(dot) dot.classList.toggle("on",!!on);
  if(label) label.textContent=text;
}

async function initAuth(){
  const {data:{session:s}}=await sb.auth.getSession();
  session=s;
  sb.auth.onAuthStateChange(async(event,sess)=>{
    session=sess;
    renderAuthState();
    if(sess&&(event==="SIGNED_IN"||event==="INITIAL_SESSION"||event==="TOKEN_REFRESHED")){
      await mergeCloud();
    }
    if(event==="SIGNED_OUT"){
      setSyncStatus("Локальный режим",false);
      renderAll();
    }
  });
  renderAuthState();
  if(session) await mergeCloud();
}
async function registerUser(){
  const email=document.getElementById("authEmail").value.trim();
  const password=document.getElementById("authPassword").value;
  const name=document.getElementById("authName").value.trim()||state.name||"Пользователь";
  const status=document.getElementById("authStatus");
  if(password.length<6){status.textContent="Пароль должен быть минимум 6 символов.";return}
  status.textContent="Создаю аккаунт…";
  const {data,error}=await sb.auth.signUp({
    email,password,
    options:{data:{display_name:name},emailRedirectTo:location.origin+location.pathname}
  });
  if(error){status.textContent=error.message;return}
  state.name=name; localSave(false);
  if(data.session){
    session=data.session; status.textContent="Аккаунт создан и вход выполнен."; await mergeCloud(); closeAuth();
  }else{
    status.textContent="Аккаунт создан. Проверь почту и подтверди email, затем войди.";
  }
}
async function signInUser(){
  const email=document.getElementById("authEmail").value.trim();
  const password=document.getElementById("authPassword").value;
  const status=document.getElementById("authStatus");
  status.textContent="Вхожу…";
  const {data,error}=await sb.auth.signInWithPassword({email,password});
  if(error){status.textContent=error.message;return}
  session=data.session; status.textContent="Вход выполнен."; await mergeCloud(); closeAuth();
}
async function signOutUser(){
  await sb.auth.signOut();
  session=null;
  renderAuthState();
}
function renderAuthState(){
  const btn=document.getElementById("accountButton");
  if(!btn)return;
  if(session){
    btn.textContent="☁ "+(session.user.email||"Аккаунт");
    btn.onclick=()=>go("profile");
  }else{
    btn.textContent="Войти / синхронизация";
    btn.onclick=openAuth;
  }
  setSyncStatus(session?"Облако подключено":"Локальный режим",!!session);
}

async function mergeCloud(){
  if(!session||syncBusy)return;
  syncBusy=true; setSyncStatus("Загружаю облако…",false);
  const uid=session.user.id;
  try{
    const [p,l,t,c,s]=await Promise.all([
      sb.from("profiles").select("*").eq("user_id",uid).maybeSingle(),
      sb.from("lesson_progress").select("lesson_id").eq("user_id",uid),
      sb.from("term_progress").select("term_id,learned,saved").eq("user_id",uid),
      sb.from("case_progress").select("case_id").eq("user_id",uid),
      sb.from("simulator_runs").select("simulator_id").eq("user_id",uid)
    ]);
    const remote=p.data;
    if(remote){
      state.name=remote.display_name||state.name||session.user.user_metadata?.display_name||"Пользователь";
      state.goal=remote.learning_path||state.goal||"curious";
      state.onboarded=true;
      state.xp=Math.max(state.xp||0,remote.xp||0);
      state.streak=Math.max(state.streak||1,remote.streak||1);
    }else{
      state.name=state.name||session.user.user_metadata?.display_name||"Пользователь";
      state.goal=state.goal||"curious";
      state.onboarded=true;
    }
    state.lessons=[...new Set([...(state.lessons||[]),...(l.data||[]).map(x=>x.lesson_id)])];
    state.terms=[...new Set([...(state.terms||[]),...(t.data||[]).filter(x=>x.learned).map(x=>x.term_id)])];
    state.saved=[...new Set([...(state.saved||[]),...(t.data||[]).filter(x=>x.saved).map(x=>x.term_id)])];
    state.cases=[...new Set([...(state.cases||[]),...(c.data||[]).map(x=>x.case_id)])];
    const simMap={...(state.simDone||{})}; (s.data||[]).forEach(x=>simMap[x.simulator_id]=true); state.simDone=simMap;
    await updateCloudStreak();
    await pushCloud(true);
    localStorage.setItem("forge_v3_state",JSON.stringify(state));
    renderAll(); setSyncStatus("Синхронизировано",true);
  }catch(e){setSyncStatus("Ошибка синхронизации",false);console.error(e)}
  syncBusy=false;
}
async function updateCloudStreak(){
  if(!session)return;
  const uid=session.user.id,today=todayKey();
  await sb.from("daily_activity").upsert({user_id:uid,activity_date:today,xp_earned:0},{onConflict:"user_id,activity_date"});
  const {data}=await sb.from("daily_activity").select("activity_date").eq("user_id",uid).order("activity_date",{ascending:false}).limit(90);
  if(!data?.length)return;
  const dates=new Set(data.map(x=>x.activity_date));
  let d=new Date(today+"T00:00:00Z"),count=0;
  while(dates.has(d.toISOString().slice(0,10))){count++;d.setUTCDate(d.getUTCDate()-1)}
  state.streak=Math.max(1,count);
}
async function pushCloud(force=false){
  if(!session||(!force&&syncBusy))return;
  const uid=session.user.id;
  setSyncStatus("Сохраняю…",false);
  try{
    await sb.from("profiles").upsert({
      user_id:uid,display_name:state.name||"Пользователь",learning_path:state.goal||"curious",
      xp:state.xp||0,streak:state.streak||1,last_active_date:todayKey(),
      simulator_finished:Object.values(state.simDone||{}).some(Boolean),updated_at:new Date().toISOString()
    },{onConflict:"user_id"});
    if(state.lessons.length) await sb.from("lesson_progress").upsert(state.lessons.map(id=>({user_id:uid,lesson_id:id})),{onConflict:"user_id,lesson_id"});
    const termIds=[...new Set([...(state.terms||[]),...(state.saved||[])])];
    if(termIds.length) await sb.from("term_progress").upsert(termIds.map(id=>({user_id:uid,term_id:id,learned:state.terms.includes(id),saved:state.saved.includes(id),updated_at:new Date().toISOString()})),{onConflict:"user_id,term_id"});
    if(state.cases.length) await sb.from("case_progress").upsert(state.cases.map(id=>({user_id:uid,case_id:id})),{onConflict:"user_id,case_id"});
    const simRows=Object.keys(state.simDone||{}).filter(id=>state.simDone[id]).map(id=>({user_id:uid,simulator_id:id,result:{completed:true}}));
    if(simRows.length) await sb.from("simulator_runs").upsert(simRows,{onConflict:"user_id,simulator_id"});
    await sb.from("daily_activity").upsert({user_id:uid,activity_date:todayKey(),xp_earned:0},{onConflict:"user_id,activity_date"});
    setSyncStatus("Синхронизировано",true);
  }catch(e){setSyncStatus("Ошибка облака",false);console.error(e)}
}

function level(){
  let cur=LEVELS[0],next=LEVELS[1];
  for(let i=0;i<LEVELS.length;i++){if(state.xp>=LEVELS[i][1]){cur=LEVELS[i];next=LEVELS[i+1]||LEVELS[i]}}
  const pct=next[1]===cur[1]?100:Math.max(0,Math.min(100,(state.xp-cur[1])/(next[1]-cur[1])*100));
  return {name:cur[0],pct};
}
function pathObj(){return C.paths.find(p=>p.id===state.goal)||C.paths[3]}
function rub(n){return Math.round(n).toLocaleString("ru-RU")+" ₽"}
function modal(html,small=false){document.getElementById("modalBody").innerHTML=html;document.getElementById("modalDialog").classList.toggle("small",small);document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function openAuth(){document.getElementById("auth").classList.remove("hidden")}
function closeAuth(){document.getElementById("auth").classList.add("hidden")}

function buildNav(){
  const desk=document.getElementById("desktopNav"),mobile=document.getElementById("mobileNav");
  desk.innerHTML=NAV.map((n,i)=>`<button class="${i===0?"active":""}" data-page="${n[0]}"><span>${n[1]}</span><span>${n[2]}</span></button>`).join("");
  mobile.innerHTML=NAV.filter(n=>["dashboard","learn","dictionary","simulator","profile"].includes(n[0])).map((n,i)=>`<button class="${i===0?"active":""}" data-page="${n[0]}"><span>${n[1]}</span><span>${n[2]}</span></button>`).join("");
  document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>go(b.dataset.page));
}
function go(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===page));
  document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  const meta={
    dashboard:["Dashboard","Твой ежедневный бизнес-тренажёр."],
    learn:["Обучение","56 коротких уроков, адаптированных под твою траекторию."],
    dictionary:["Business Dictionary","Термины с примерами, поиском и избранным."],
    cases:["Бизнес-кейсы","32 ситуации для тренировки решений."],
    simulator:["Business Simulator","Четыре бизнеса, где решения меняют экономику."],
    coach:["AI Business Coach","Интерактивный тренер: идея, финансы, маркетинг и сложные кейсы."],
    profile:["Профиль и синхронизация","Смена пути, аккаунт, backup и прогресс."]
  };
  document.getElementById("pageTitle").textContent=meta[page][0];document.getElementById("pageSub").textContent=meta[page][1];
  scrollTo({top:0,behavior:"smooth"});
}

function renderOnboarding(){
  document.getElementById("goalGrid").innerHTML=C.paths.map(p=>`<div class="goal" onclick="choosePath('${p.id}',true)"><b>${p.title}</b><div class="copy">${p.subtitle}</div></div>`).join("");
  document.getElementById("onboard").classList.toggle("hidden",!!state.onboarded);
}
function choosePath(id,first=false){
  state.goal=id;state.onboarded=true;
  if(first&&state.xp===0)state.xp+=25;
  localSave();
  document.getElementById("onboard").classList.add("hidden");
  if(!first)closeModal();
}
function changePath(){
  modal(`<div class="label">СМЕНИТЬ ТРАЕКТОРИЮ</div><h2>Выбери новый путь</h2><div class="copy">Прогресс, XP, изученные термины и кейсы не сбрасываются. Меняются рекомендации и порядок контента.</div><div class="goals">${C.paths.map(p=>`<div class="goal ${state.goal===p.id?"selected":""}" onclick="choosePath('${p.id}',false)"><b>${p.title}</b><div class="copy">${p.subtitle}</div></div>`).join("")}</div>`);
}

function renderStats(){
  const l=level(),path=pathObj();
  document.getElementById("sideLevel").textContent=l.name;document.getElementById("sideProgress").style.width=l.pct+"%";
  document.getElementById("sideXp").textContent=state.xp;document.getElementById("sideStreak").textContent=state.streak;
  document.getElementById("hello").textContent="👋 "+(state.name||"Гость");
  document.getElementById("streak").textContent="🔥 "+state.streak+" дн.";
  document.getElementById("goalPill").textContent="🎯 "+path.title;
  document.getElementById("stats").innerHTML=[
    ["Level",l.name,"Текущий уровень"],["XP",state.xp,"Игровой прогресс"],
    ["Уроки",state.lessons.length+"/56","Завершено"],["Кейсы",state.cases.length+"/32","Решено"]
  ].map((s,i)=>`<div class="card metric"><div class="tiny">${s[0]}</div><b>${s[1]}</b><div class="tiny">${s[2]}</div>${i===0?`<div class="progress" style="margin-top:10px"><span style="width:${l.pct}%"></span></div>`:""}</div>`).join("");
}
function renderDashboard(){
  const p=pathObj(),recommended=p.recommended.slice(0,3).map(id=>C.modules.find(m=>m.id===id)).filter(Boolean);
  document.getElementById("pathSummary").innerHTML=`<div class="label">ТВОЯ ТРАЕКТОРИЯ</div><h3>${p.title}</h3><div class="copy">${p.subtitle}</div><div class="btnrow"><button class="btn ghost" onclick="changePath()">Сменить путь</button></div>`;
  document.getElementById("recommended").innerHTML=recommended.map(m=>`<div class="card item"><div style="font-size:25px">${m.icon}</div><h3>${m.title}</h3><div class="copy">${m.description}</div><div class="btnrow"><button class="btn ghost" onclick="activeModule='${m.id}';go('learn');renderLessons()">Открыть</button></div></div>`).join("");
  const tasks=[
    ["Урок дня",state.lessons.length?"Продолжи следующий непройденный урок":"Начни первый урок",()=>go("learn")],
    ["Кейс дня",state.cases.length+"/32 решено",()=>go("cases")],
    ["Симуляция","Прими 3 управленческих решения",()=>go("simulator")],
    ["Coach","Разбери одну бизнес-гипотезу",()=>go("coach")]
  ];
  document.getElementById("daily").innerHTML=tasks.map((t,i)=>`<div class="card item"><div class="tiny">DAILY ${i+1}</div><h3>${t[0]}</h3><div class="copy">${t[1]}</div><div class="btnrow"><button class="btn ghost" onclick="${["go('learn')","go('cases')","go('simulator')","go('coach')"][i]}">Выполнить</button></div></div>`).join("");
}

function moduleOrder(){
  const p=pathObj();
  return [...C.modules].sort((a,b)=>p.recommended.indexOf(b.id)-p.recommended.indexOf(a.id));
}
function renderLessons(){
  const modules=moduleOrder();
  document.getElementById("moduleBar").innerHTML=`<button class="modulechip ${activeModule==="all"?"active":""}" onclick="activeModule='all';renderLessons()">Все 56</button>`+modules.map(m=>`<button class="modulechip ${activeModule===m.id?"active":""}" onclick="activeModule='${m.id}';renderLessons()">${m.icon} ${m.title}</button>`).join("");
  const lessons=modules.flatMap(m=>m.lessons.map(l=>({m,l}))).filter(x=>activeModule==="all"||x.m.id===activeModule);
  document.getElementById("lessons").innerHTML=lessons.map(({m,l})=>{
    const done=state.lessons.includes(l[0]);
    return `<div class="card item"><div class="label">${m.icon} ${m.title}</div><h3>${l[1]}</h3><div class="copy">${l[2]}</div><div class="meta"><span>3–5 мин</span><span>${done?"✓ завершено":"+"+l[6]+" XP"}</span></div><div class="btnrow"><button class="btn ${done?"secondary":"ghost"}" onclick="openLesson('${l[0]}')">${done?"Повторить":"Открыть урок"}</button></div></div>`;
  }).join("");
}
function findLesson(id){for(const m of C.modules){const l=m.lessons.find(x=>x[0]===id);if(l)return{m,l}}}
function openLesson(id){
  const {m,l}=findLesson(id),done=state.lessons.includes(id);
  modal(`<div class="label">${m.icon} ${m.title}</div><h2>${l[1]}</h2><div class="copy">${l[2]}</div><div class="card soft section"><div class="tiny">КЛЮЧЕВАЯ МЫСЛЬ</div><div class="copy" style="margin-top:7px">${l[3]}</div></div><div class="card soft section"><div class="tiny">ПРИМЕР</div><div class="copy" style="margin-top:7px">${l[4]}</div></div><div class="card soft section"><div class="tiny">ПРАКТИЧЕСКИЙ ВЫВОД</div><div class="copy" style="margin-top:7px">${l[5]}</div></div><div class="btnrow"><button class="btn primary" onclick="completeLesson('${id}')">${done?"Уже завершено":"Завершить • +"+l[6]+" XP"}</button></div>`);
}
function completeLesson(id){
  const {l}=findLesson(id);if(!state.lessons.includes(id)){state.lessons.push(id);state.xp+=l[6];localSave()}closeModal();
}

function renderTerms(){
  const q=(document.getElementById("termSearch").value||"").toLowerCase(),f=document.getElementById("termFilter").value;
  const list=C.terms.filter(t=>(f==="all"||t[1]===f)&&t.join(" ").toLowerCase().includes(q));
  document.getElementById("terms").innerHTML=list.map(t=>{
    const learned=state.terms.includes(t[0]),saved=state.saved.includes(t[0]);
    return `<div class="card item"><div class="termhead"><div><div class="termname">${t[0]}</div><div class="tiny">${t[2]}</div></div><button class="star ${saved?"on":""}" onclick="toggleSave('${t[0]}')">${saved?"★":"☆"}</button></div><div class="copy" style="margin-top:10px">${t[3]}</div><div class="meta"><span>Связано: ${t[6]}</span><span>${learned?"✓ изучено":"+25 XP"}</span></div><div class="btnrow"><button class="btn ghost" onclick="openTerm('${t[0]}')">Открыть</button><button class="btn ${learned?"secondary":"primary"}" onclick="learnTerm('${t[0]}')">${learned?"Понял":"Понял • +25 XP"}</button></div></div>`;
  }).join("");
}
function openTerm(name){
  const t=C.terms.find(x=>x[0]===name);
  modal(`<div class="label">${t[2]}</div><h2>${t[0]}</h2><div class="card soft section"><div class="tiny">ПО-ПРОСТОМУ</div><div class="copy" style="margin-top:7px">${t[3]}</div></div><div class="card soft section"><div class="tiny">ЗАЧЕМ ПРЕДПРИНИМАТЕЛЮ</div><div class="copy" style="margin-top:7px">${t[4]}</div></div><div class="card soft section"><div class="tiny">ПРИМЕР</div><div class="copy" style="margin-top:7px">${t[5]}</div></div><div class="btnrow"><button class="btn primary" onclick="learnTerm('${t[0]}');closeModal()">Понял • +25 XP</button></div>`);
}
function learnTerm(name){if(!state.terms.includes(name)){state.terms.push(name);state.xp+=25;localSave()}}
function toggleSave(name){state.saved=state.saved.includes(name)?state.saved.filter(x=>x!==name):[...state.saved,name];localSave()}

function renderCases(){
  const q=(document.getElementById("caseSearch").value||"").toLowerCase();
  const list=C.cases.filter(c=>(c.title+" "+c.copy+" "+c.tag).toLowerCase().includes(q));
  document.getElementById("caseGrid").innerHTML=list.map(c=>{
    const done=state.cases.includes(c.id);
    return `<div class="card item"><div class="label">${c.tag}</div><h3>${c.title}</h3><div class="copy">${c.copy}</div><div class="meta"><span>${c.category}</span><span>${done?"✓ решено":"+"+c.xp+" XP"}</span></div><div class="btnrow"><button class="btn ${done?"secondary":"ghost"}" onclick="openCase('${c.id}')">${done?"Разобрать снова":"Открыть кейс"}</button></div></div>`;
  }).join("");
}
function openCase(id){
  const c=C.cases.find(x=>x.id===id);
  modal(`<div class="label">CASE • ${c.tag}</div><h2>${c.title}</h2><div class="copy">${c.copy}</div><div id="caseChoices" class="section">${c.choices.map((ch,i)=>`<button class="choice" onclick="answerCase('${id}',${i},this)">${ch.text}</button>`).join("")}</div><div id="caseFeedback" class="feedback"></div>`);
}
function answerCase(id,i,el){
  const c=C.cases.find(x=>x.id===id),ch=c.choices[i];
  document.querySelectorAll("#caseChoices .choice").forEach(b=>b.disabled=true);el.classList.add(ch.correct?"good":"bad");
  const f=document.getElementById("caseFeedback");f.textContent=ch.feedback+(ch.correct?" +"+c.xp+" XP":"");f.classList.add("show");
  if(ch.correct&&!state.cases.includes(id)){state.cases.push(id);state.xp+=c.xp;localSave()}
}

function selectSimulator(id){activeSimulator=id;resetSimulator(false);renderSimulator()}
function resetSimulator(render=true){
  const s=C.simulators[activeSimulator];sim={...s.start,step:0};if(render)renderSimulator();
}
function renderSimulator(){
  const sims=Object.values(C.simulators);
  document.getElementById("simSelect").innerHTML=sims.map(s=>`<div class="card simtile ${s.id===activeSimulator?"active":""}" onclick="selectSimulator('${s.id}')"><div style="font-size:25px">${s.icon}</div><h3>${s.title}</h3><div class="copy">${s.description}</div><div class="meta"><span>3 решения</span><span>${state.simDone[s.id]?"✓ завершено":""}</span></div></div>`).join("");
  if(!sim)resetSimulator(false);
  const s=C.simulators[activeSimulator];
  document.getElementById("simTitleMain").textContent=s.icon+" "+s.title;
  document.getElementById("simStats").innerHTML=[["Cash",rub(sim.cash)],["Revenue / мес",rub(sim.revenue)],["Profit / мес",rub(sim.profit)],["Customers",Math.round(sim.customers).toLocaleString("ru-RU")]].map(x=>`<div class="simstat"><div class="tiny">${x[0]}</div><b>${x[1]}</b></div>`).join("");
  const fb=document.getElementById("simFeedback");fb.classList.remove("show");
  if(sim.step>=s.steps.length){
    document.getElementById("simStep").textContent="ФИНАЛ";
    document.getElementById("simEvent").textContent="Сценарий завершён";
    document.getElementById("simText").textContent="Ты увидел trade-offs на цифрах. Сильный основатель не ищет магическую кнопку — он управляет системой.";
    document.getElementById("simChoices").innerHTML=`<div class="card soft section"><div class="copy">Итог: ${rub(sim.cash)} cash • ${rub(sim.revenue)} revenue • ${rub(sim.profit)} profit</div></div>`;
    if(!state.simDone[s.id]){state.simDone[s.id]=true;state.xp+=120;localSave()}
    return;
  }
  const step=s.steps[sim.step];document.getElementById("simStep").textContent="Шаг "+(sim.step+1)+" / "+s.steps.length;document.getElementById("simEvent").textContent=step[0];document.getElementById("simText").textContent=step[1];
  document.getElementById("simChoices").innerHTML=step[2].map((o,i)=>`<button class="choice" onclick="chooseSim(${i},this)">${o[0]}</button>`).join("");
}
function chooseSim(i,el){
  const s=C.simulators[activeSimulator],o=s.steps[sim.step][2][i],d=o[1];
  sim.cash+=d.cash||0;sim.revenue+=d.revenue||0;sim.profit+=d.profit||0;sim.customers+=d.customers||0;
  document.querySelectorAll("#simChoices .choice").forEach(b=>b.disabled=true);el.classList.add(o[3]?"good":"bad");
  const f=document.getElementById("simFeedback");f.textContent=o[2]+" +50 XP";f.classList.add("show");state.xp+=50;localSave();
  setTimeout(()=>{sim.step++;renderSimulator()},850);
}

function renderCoach(){
  document.getElementById("coachModes").innerHTML=C.coach.map(m=>`<div class="card coach-mode ${m.id===coachMode?"active":""}" onclick="setCoachMode('${m.id}')"><h3>${m.title}</h3><div class="copy">${m.prompt}</div></div>`).join("");
  if(!document.getElementById("messages").children.length)resetCoach();
}
function setCoachMode(id){coachMode=id;renderCoach();resetCoach()}
function resetCoach(){
  const m=C.coach.find(x=>x.id===coachMode),box=document.getElementById("messages");
  box.innerHTML=`<div class="msg bot"><b>${m.title}</b><br>${m.prompt}</div>`;box.dataset.step="0";
}
function sendCoach(){
  const input=document.getElementById("coachInput"),text=input.value.trim();if(!text)return;
  const box=document.getElementById("messages"),m=C.coach.find(x=>x.id===coachMode),step=Number(box.dataset.step||0);
  box.insertAdjacentHTML("beforeend",`<div class="msg user">${escapeHtml(text)}</div>`);
  const next=m.follow[Math.min(step,m.follow.length-1)];
  let insight="";
  if(coachMode==="idea"&&step===0) insight=" Хорошо. Теперь не расширяй идею — сузь клиента.";
  if(coachMode==="finance"&&step===0) insight=" Смотри на contribution margin, а не только на выручку.";
  if(coachMode==="marketing"&&step===0) insight=" Канал без CAC и retention — просто поток цифр.";
  box.insertAdjacentHTML("beforeend",`<div class="msg bot">${insight}${next}</div>`);
  box.dataset.step=String(step+1);input.value="";box.scrollTop=box.scrollHeight;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]))}

function renderProfile(){
  const l=level(),p=pathObj();
  document.getElementById("profileLevel").textContent=l.name;document.getElementById("profileProgress").style.width=l.pct+"%";
  document.getElementById("profileXp").textContent=state.xp;document.getElementById("profileStreak").textContent=state.streak;document.getElementById("profileLessons").textContent=state.lessons.length;document.getElementById("profileTerms").textContent=state.terms.length;
  document.getElementById("profileName").textContent=state.name||"Гость";
  document.getElementById("profilePath").textContent=p.title;
  document.getElementById("accountInfo").innerHTML=session?`<div class="tiny good">● Облачная синхронизация включена</div><div style="margin-top:7px">${session.user.email}</div><div class="btnrow"><button class="btn secondary" onclick="pushCloud(true)">Синхронизировать сейчас</button><button class="btn danger" onclick="signOutUser()">Выйти</button></div>`:`<div class="tiny warn">● Сейчас прогресс хранится только на этом устройстве.</div><div class="btnrow"><button class="btn primary" onclick="openAuth()">Создать аккаунт / войти</button></div>`;
  const ach=[
    ["Первый рывок","100 XP",state.xp>=100],["Терминатор","10 терминов",state.terms.length>=10],["Практик","5 кейсов",state.cases.length>=5],
    ["Дисциплина","10 уроков",state.lessons.length>=10],["Оператор","2 симулятора",Object.values(state.simDone).filter(Boolean).length>=2],["Titan track","3000 XP",state.xp>=3000]
  ];
  document.getElementById("achievements").innerHTML=ach.map(a=>`<div class="achievement"><b>${a[2]?"✅":"🔒"} ${a[0]}</b><div class="tiny" style="margin-top:5px">${a[1]}</div></div>`).join("");
}
function editName(){
  modal(`<div class="label">ПРОФИЛЬ</div><h2>Как тебя показывать в FORGE?</h2><input id="nameEdit" class="input" value="${escapeHtml(state.name||"")}"><div class="btnrow"><button class="btn primary" onclick="saveName()">Сохранить</button></div>`,true);
}
function saveName(){state.name=document.getElementById("nameEdit").value.trim()||"Пользователь";localSave();closeModal()}
function exportProgress(){
  const blob=new Blob([JSON.stringify({forge_version:3,exported_at:new Date().toISOString(),state},null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="forge-progress.json";a.click();URL.revokeObjectURL(a.href);
}
function importProgressFile(ev){
  const file=ev.target.files[0];if(!file)return;const reader=new FileReader();
  reader.onload=()=>{try{const data=JSON.parse(reader.result);const incoming=data.state||data;state={...DEFAULT_STATE,...incoming,simDone:incoming.simDone||{},dailyDone:incoming.dailyDone||{}};localSave();alert("Прогресс импортирован.");}catch(e){alert("Не удалось прочитать backup.")}};
  reader.readAsText(file);ev.target.value="";
}

function renderAll(){
  renderStats();renderDashboard();renderLessons();renderTerms();renderCases();renderSimulator();renderCoach();renderProfile();renderAuthState();
  localStorage.setItem("forge_v3_state",JSON.stringify(state));
}
document.addEventListener("DOMContentLoaded",async()=>{
  buildNav();renderOnboarding();
  document.getElementById("termSearch").oninput=renderTerms;document.getElementById("termFilter").onchange=renderTerms;
  document.getElementById("caseSearch").oninput=renderCases;
  document.getElementById("coachInput").addEventListener("keydown",e=>{if(e.key==="Enter")sendCoach()});
  resetSimulator(false);renderAll();await initAuth();
});
