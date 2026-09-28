const SUPABASE_URL="https://qmjtmhtmbaseykmwttvn.supabase.co";
const SUPABASE_KEY="sb_publishable_CD-9o4mQVn0j6tltKgRRZA_IsUUq_iJ";
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
let session=null,creator=null,dashboard=null;

function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]))}
function fmtDate(s){if(!s)return"—";return new Date(s).toLocaleDateString("ru-RU",{day:"2-digit",month:"short",year:"numeric"})}
function fmtDateTime(s){if(!s)return"—";return new Date(s).toLocaleString("ru-RU",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}
function pct(n){return Math.max(0,Math.min(100,Number(n)||0))}
function status(msg,type=""){const el=document.getElementById("globalStatus");if(!el)return;el.textContent=msg;el.className="console-status "+type}
function show(id){["loginGate","activateGate","consoleApp"].forEach(x=>document.getElementById(x)?.classList.toggle("hidden",x!==id))}

async function init(){
  const {data:{session:s}}=await sb.auth.getSession();session=s;
  sb.auth.onAuthStateChange(async(_,sess)=>{session=sess;await route()});
  await route();
}
async function route(){
  if(!session){creator=null;show("loginGate");return}
  const {data}=await sb.from("creator_accounts").select("*").eq("user_id",session.user.id).maybeSingle();
  creator=data||null;
  if(!creator){
    show("activateGate");
    document.getElementById("creatorEmail").textContent=session.user.email||"";
    return;
  }
  show("consoleApp");
  document.getElementById("creatorIdentity").textContent=(creator.display_name||"Creator")+" · "+(session.user.email||"");
  await loadDashboard();
}
async function login(){
  const email=document.getElementById("adminEmail").value.trim(),password=document.getElementById("adminPassword").value;
  const el=document.getElementById("loginStatus");el.textContent="Вхожу…";
  const {error}=await sb.auth.signInWithPassword({email,password});
  el.textContent=error?error.message:"";
}
async function logout(){await sb.auth.signOut()}
async function activateCreator(){
  const code=document.getElementById("creatorCode").value.trim(),display_name=document.getElementById("creatorName").value.trim();
  const el=document.getElementById("creatorStatus");el.textContent="Активирую доступ…";
  const {data,error}=await sb.functions.invoke("creator-bootstrap",{body:{code,display_name}});
  if(error||!data?.ok){el.textContent=data?.error||"Не удалось активировать Creator-доступ.";return}
  el.textContent="Готово.";
  await route();
}
async function loadDashboard(){
  status("Обновляю данные…");
  const {data,error}=await sb.functions.invoke("creator-dashboard",{body:{}});
  if(error||!data?.ok){status(data?.error||"Не удалось загрузить Creator Console.","bad");return}
  dashboard=data;
  status("Данные обновлены · "+new Date().toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"}),"good");
  renderAll();
}
function metricCard(label,value,sub,accent=""){
  return '<div class="metric-card '+accent+'"><div class="metric-label">'+esc(label)+'</div><div class="metric-value">'+esc(value)+'</div><div class="metric-sub">'+esc(sub)+'</div></div>';
}
function renderAll(){
  const m=dashboard.metrics||{};
  document.getElementById("metricGrid").innerHTML=[
    metricCard("Пользователи",m.users||0,"всего аккаунтов",""),
    metricCard("Активны сегодня",m.active_today||0,"уникальных пользователей","good"),
    metricCard("Активны 7 дней",m.active_7d||0,"уникальных пользователей",""),
    metricCard("Новые 7 дней",m.new_7d||0,"новых аккаунтов",""),
    metricCard("Activation",String(m.activation_rate||0)+"%","начали проходить уроки","good"),
    metricCard("Practice",String(m.practice_rate||0)+"%","дошли до кейсов",""),
    metricCard("Pro intent",String(m.pro_click_rate||0)+"%","клики Pro / просмотры Pricing",""),
    metricCard("Pro users",(m.manual_pro||0)+(m.paddle_pro||0),"manual "+(m.manual_pro||0)+" · Paddle "+(m.paddle_pro||0),"pro")
  ].join("");
  renderProductHealth();
  renderPaths();
  renderTopList("topLessons",dashboard.top_lessons||[],"Урок","завершений");
  renderTopList("topCases",dashboard.top_cases||[],"Кейс","решений");
  renderHardest();
  renderPageViews();
  renderFeedback();
  renderCodes();
  renderUsers();
  renderAudit();
}
function renderProductHealth(){
  const m=dashboard.metrics||{};
  const items=[
    ["Activation rate",m.activation_rate||0,"Доля зарегистрированных, начавших хотя бы один урок."],
    ["Practice rate",m.practice_rate||0,"Доля зарегистрированных, решивших хотя бы один кейс."],
    ["Pro click rate",m.pro_click_rate||0,"Доля кликов Pro от просмотров страницы тарифов за 30 дней."]
  ];
  document.getElementById("healthBars").innerHTML=items.map(x=>'<div class="health-row"><div class="health-head"><b>'+esc(x[0])+'</b><span>'+pct(x[1])+'%</span></div><div class="bar"><span style="width:'+pct(x[1])+'%"></span></div><div class="mini">'+esc(x[2])+'</div></div>').join("");
  document.getElementById("volumeStats").innerHTML=[
    ["Уроков завершено",m.lessons_completed||0],["Кейсов решено",m.cases_completed||0],["Сертификатов",m.certificates||0],
    ["Pricing views / 30д",m.pricing_views_30d||0],["Pro clicks / 30д",m.pro_clicks_30d||0]
  ].map(x=>'<div class="volume"><span>'+esc(x[0])+'</span><b>'+esc(x[1])+'</b></div>').join("");
}
function renderPaths(){
  const names={first:"Новичок / первый бизнес",run:"Действующий предприниматель",mind:"Бизнес-мышление",curious:"Просто интересуюсь",unknown:"Не выбрано"};
  const arr=dashboard.learning_paths||[],max=Math.max(1,...arr.map(x=>Number(x.count)||0));
  document.getElementById("paths").innerHTML=arr.length?arr.map(x=>'<div class="rank-row"><div><b>'+esc(names[x.path]||x.path)+'</b></div><div class="rank-bar"><span style="width:'+Math.round((x.count/max)*100)+'%"></span></div><strong>'+esc(x.count)+'</strong></div>').join(""):'<div class="empty">Пока нет данных.</div>';
}
function renderTopList(id,arr,label,countLabel){
  const max=Math.max(1,...arr.map(x=>Number(x.count)||0));
  document.getElementById(id).innerHTML=arr.length?arr.map((x,i)=>'<div class="rank-row"><span class="rank-index">'+String(i+1).padStart(2,"0")+'</span><div><b>'+esc(x.id)+'</b><div class="mini">'+esc(label)+'</div></div><div class="rank-bar"><span style="width:'+Math.round((x.count/max)*100)+'%"></span></div><strong>'+esc(x.count)+' '+esc(countLabel)+'</strong></div>').join(""):'<div class="empty">Данных пока мало.</div>';
}
function renderHardest(){
  const arr=dashboard.hardest_cases||[];
  document.getElementById("hardestCases").innerHTML=arr.length?arr.map(x=>'<div class="rank-row"><div><b>'+esc(x.id)+'</b><div class="mini">'+esc(x.attempts)+' первых попыток</div></div><div class="accuracy '+(x.accuracy<50?"danger":"")+'">'+esc(x.accuracy)+'%</div></div>').join(""):'<div class="empty">Нужно минимум 2 отслеженных попытки на кейс. Данные начнут появляться после использования v8.</div>';
}
function renderPageViews(){
  const arr=dashboard.page_views||[],max=Math.max(1,...arr.map(x=>Number(x.count)||0));
  document.getElementById("pageViews").innerHTML=arr.length?arr.map(x=>'<div class="rank-row"><div><b>'+esc(x.page)+'</b></div><div class="rank-bar"><span style="width:'+Math.round((x.count/max)*100)+'%"></span></div><strong>'+esc(x.count)+'</strong></div>').join(""):'<div class="empty">Аналитика страниц собирается с v9.</div>';
}
const feedbackNames={confusing:"Где непонятно",useless:"Что бесполезно",return:"Что вернёт завтра",willing_to_pay:"За что готов платить",general:"Общее"};
function renderFeedback(){
  const arr=dashboard.feedback||[];
  document.getElementById("feedbackList").innerHTML=arr.length?arr.map(x=>'<article class="feedback-card"><div class="feedback-meta"><span class="tag">'+esc(feedbackNames[x.category]||x.category)+'</span><span>'+fmtDateTime(x.created_at)+'</span></div><div class="feedback-text">'+esc(x.message)+'</div><div class="mini">Путь: '+esc(x.context?.path||"—")+' · Уровень: '+esc(x.context?.adaptive_level||"—")+' · XP: '+esc(x.context?.xp||0)+'</div></article>').join(""):'<div class="empty">Отзывов пока нет.</div>';
}
function renderCodes(){
  const arr=dashboard.codes||[];
  document.getElementById("codesList").innerHTML=arr.length?arr.map(x=>{
    const state=!x.is_active?"disabled":x.expires_at&&new Date(x.expires_at)<new Date()?"expired":"active";
    return '<div class="code-row"><div><div class="code-name">BZQ-PRO-••••-'+esc(x.code_hint)+'</div><div class="mini">'+esc(x.duration_days)+' дней Pro · '+esc(x.redemption_count)+'/'+esc(x.max_redemptions)+' активаций'+(x.note?" · "+esc(x.note):"")+'</div></div><span class="state '+state+'">'+(state==="active"?"ACTIVE":state.toUpperCase())+'</span><div class="code-actions">'+(x.is_active?'<button class="small-btn danger-btn" onclick="deactivateCode(\''+x.id+'\')">Отключить</button>':"")+'</div></div>';
  }).join(""):'<div class="empty">Кодов ещё нет.</div>';
}
function renderUsers(){
  const arr=dashboard.recent_users||[];
  document.getElementById("usersBody").innerHTML=arr.length?arr.map(u=>{
    const p=u.profile||{};
    return '<tr data-search="'+esc(((u.email||"")+" "+(p.display_name||"")).toLowerCase())+'"><td><b>'+esc(p.display_name||"—")+'</b><div class="mini">'+esc(u.email||"—")+'</div></td><td>'+esc(p.learning_path||"—")+'</td><td>'+esc(p.xp||0)+'</td><td>'+fmtDate(u.created_at)+'</td><td>'+fmtDateTime(u.last_sign_in_at)+'</td><td>'+(u.pro?'<span class="state active">PRO'+(u.pro_until?' · '+fmtDate(u.pro_until):'')+'</span>':'<span class="state">FREE</span>')+'</td><td><button class="small-btn" onclick="quickGrant(\''+esc(u.email||"")+'\',30)">Pro 30д</button></td></tr>';
  }).join(""):'<tr><td colspan="7" class="empty">Пользователей пока нет.</td></tr>';
}
function filterUsers(){
  const q=document.getElementById("userSearch").value.trim().toLowerCase();
  document.querySelectorAll("#usersBody tr[data-search]").forEach(tr=>tr.style.display=tr.dataset.search.includes(q)?"":"none");
}
const auditNames={creator_access_activated:"Creator access",access_code_generated:"Код создан",access_code_deactivated:"Код отключён",manual_pro_granted:"Pro выдан",manual_pro_revoked:"Pro отозван"};
function renderAudit(){
  const arr=dashboard.audit||[];
  document.getElementById("auditList").innerHTML=arr.length?arr.map(x=>'<div class="audit-row"><div><b>'+esc(auditNames[x.action]||x.action)+'</b><div class="mini">'+fmtDateTime(x.created_at)+'</div></div><code>'+esc(JSON.stringify(x.metadata||{}))+'</code></div>').join(""):'<div class="empty">Audit log пуст.</div>';
}
async function generateCode(){
  const duration=Number(document.getElementById("codeDuration").value),max=Number(document.getElementById("codeMax").value),expiry=document.getElementById("codeExpiry").value,note=document.getElementById("codeNote").value.trim();
  status("Генерирую код…");
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"generate_code",duration_days:duration,max_redemptions:max,expires_in_days:expiry?Number(expiry):null,note}});
  if(error||!data?.ok){status(data?.error||"Не удалось создать код.","bad");return}
  document.getElementById("newCodeBox").classList.remove("hidden");
  document.getElementById("newCodeValue").textContent=data.code;
  status("Код создан. Скопируй его сейчас — потом в панели останется только последние 4 символа.","good");
  await loadDashboard();
}
async function copyNewCode(){
  const code=document.getElementById("newCodeValue").textContent;
  try{await navigator.clipboard.writeText(code);status("Код скопирован.","good")}catch{prompt("Скопируй код:",code)}
}
async function deactivateCode(id){
  if(!confirm("Отключить этот код? Уже активированные подписки останутся у пользователей."))return;
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"deactivate_code",code_id:id}});
  if(error||!data?.ok){status(data?.error||"Не удалось отключить код.","bad");return}
  status("Код отключён.","good");await loadDashboard();
}
async function grantPro(){
  const email=document.getElementById("grantEmail").value.trim(),days=Number(document.getElementById("grantDays").value),lifetime=document.getElementById("grantLifetime").checked,note=document.getElementById("grantNote").value.trim();
  if(!email){status("Укажи email пользователя.","bad");return}
  status("Выдаю Pro…");
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"grant_pro",email,duration_days:days,lifetime,note}});
  if(error||!data?.ok){status(data?.error||"Не удалось выдать Pro.","bad");return}
  status("Pro выдан: "+data.email+(lifetime?" · бессрочно":" · "+days+" дней"),"good");
  await loadDashboard();
}
async function quickGrant(email,days){
  if(!confirm("Выдать "+email+" Pro на "+days+" дней?"))return;
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"grant_pro",email,duration_days:days,lifetime:false,note:"Quick grant from Creator Console"}});
  if(error||!data?.ok){status(data?.error||"Не удалось выдать Pro.","bad");return}
  status("Pro выдан "+email+" на "+days+" дней.","good");await loadDashboard();
}
async function revokePro(){
  const email=document.getElementById("grantEmail").value.trim();if(!email){status("Укажи email пользователя.","bad");return}
  if(!confirm("Отозвать ручной Pro у "+email+"? Paddle-подписку это не отменяет."))return;
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"revoke_pro",email,note:"Revoked from Creator Console"}});
  if(error||!data?.ok){status(data?.error||"Не удалось отозвать Pro.","bad");return}
  status("Ручной Pro отозван у "+data.email+".","good");await loadDashboard();
}
function exportDashboard(){
  if(!dashboard)return;
  const blob=new Blob([JSON.stringify({exported_at:new Date().toISOString(),dashboard},null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="bizoniq-creator-dashboard.json";a.click();URL.revokeObjectURL(a.href);
}

document.addEventListener("DOMContentLoaded",init);