const SUPABASE_URL="https://qmjtmhtmbaseykmwttvn.supabase.co";
const SUPABASE_KEY="sb_publishable_CD-9o4mQVn0j6tltKgRRZA_IsUUq_iJ";
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const PREFS=window.BIZONIQ_PREFS||{lang:"ru",currency:"RUB",money:n=>Math.round(n).toLocaleString("ru-RU")+" ₽",price:()=>"",priceSummary:()=>""};
const LANG=PREFS.lang||"ru";
const C=(LANG==="en"&&window.BIZONIQ_CONTENT_EN)?window.BIZONIQ_CONTENT_EN:window.FORGE_CONTENT;
const L=(ru,en)=>LANG==="en"?en:ru;
const T=(text)=>PREFS.t?PREFS.t(text):text;
let localizeQueued=false;
function localizeUI(){
  if(LANG!=="en"||localizeQueued)return;
  localizeQueued=true;
  const run=()=>{
    localizeQueued=false;
    PREFS.refreshUI?.(document.body);
  };
  if(typeof requestAnimationFrame==="function")requestAnimationFrame(run);
  else setTimeout(run,0);
}

const NAV=[
  ["dashboard","home",L("Главная","Home")],
  ["practice","practice",L("Практика","Practice")],
  ["cases","cases",L("Кейсы","Cases")],
  ["simulator","simulator",L("Симулятор","Simulator")],
  ["coach","coach",L("AI Coach","AI Coach")],
  ["learn","learn",L("База знаний","Learn")],
  ["dictionary","dictionary",L("Словарь","Dictionary")],
  ["certificates","certificate",L("Сертификаты","Certificates")],
  ["pricing","pro","Pro"],
  ["profile","profile",L("Профиль","Profile")]
];
const MOBILE_NAV=[
  ["dashboard","home",L("Главная","Home")],
  ["practice","practice",L("Практика","Practice")],
  ["coach","coach",L("AI Coach","AI Coach")],
  ["learn","learn",L("Учёба","Learn")],
  ["profile","profile",L("Профиль","Profile")]
];
const ICONS={
  home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/></svg>',
  learn:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5h6.8c1.1 0 1.7.5 1.7 1.5v12c0-1-.6-1.5-1.7-1.5H3.5z"/><path d="M20.5 5.5h-6.8c-1.1 0-1.7.5-1.7 1.5v12c0-1 .6-1.5 1.7-1.5h6.8z"/></svg>',
  dictionary:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.5h11a3 3 0 0 1 3 3V20H7a3 3 0 0 1-3-3z"/><path d="M7 4.5V20"/><path d="M10 9h5M10 13h5"/></svg>',
  practice:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"/><rect x="3" y="7" width="18" height="13" rx="3"/><path d="M3 12.5c5 2.5 13 2.5 18 0"/><path d="M10 13h4"/></svg>',
  cases:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></svg>',
  simulator:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/><path d="M2 19h20"/></svg>',
  coach:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></svg>',
  certificate:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="5"/><path d="m9 13-1 8 4-2 4 2-1-8"/></svg>',
  pro:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 8 4 4 4-7 4 7 4-4-2 11H6z"/></svg>',
  profile:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>'
};
function iconSvg(id){return '<span class="nav-svg">'+(ICONS[id]||ICONS.practice)+'</span>'}

const PRACTICE_ICONS={
  cases:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h7l5 5v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M14 4v5h5"/><path d="M9 13h6M9 16h4"/></svg>',
  simulator:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4.5" width="16" height="15" rx="3"/><path d="M8 15l3-3 2.2 2.2L17 9.5"/><path d="M8 8.5h.01"/></svg>',
  coach:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l1.7 4.3 4.3 1.7-4.3 1.7-1.7 4.3-1.7-4.3L6 9.5l4.3-1.7z"/><path d="M18.5 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>',
  certificates:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="16" rx="2.5"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/><path d="M15.2 16.2l1.1.55 1.2-.55-.2 1.3.9.9-1.3.2-.6 1.2-.6-1.2-1.3-.2.9-.9z"/></svg>'
};

const PRACTICE_CARDS=[
  {id:"cases",title:L("Бизнес-кейсы","Business cases"),desc:L("32 ситуации и разбор решений","32 situations with decision breakdowns")},
  {id:"simulator",title:L("Симуляторы","Simulations"),desc:L("Управляй цифрами и последствиями","Manage numbers and consequences")},
  {id:"coach",title:"Business Coach",desc:L("Структурируй идею и решения","Structure an idea and decisions")},
  {id:"certificates",title:L("Сертификаты","Certificates"),desc:L("Проверяемые достижения BIZONIQ","Verifiable BIZONIQ achievements")}
];
const LEVELS=[
  {name:"Apprentice",xp:0,cases:0,sims:0,lessons:0},
  {name:"Builder",xp:250,cases:3,sims:0,lessons:2},
  {name:"Operator",xp:700,cases:8,sims:1,lessons:5},
  {name:"Founder",xp:1400,cases:15,sims:2,lessons:10},
  {name:"Scaler",xp:2600,cases:22,sims:3,lessons:16},
  {name:"Visionary",xp:4200,cases:28,sims:4,lessons:24},
  {name:"Titan",xp:6500,cases:32,sims:4,lessons:32}
];
const DEFAULT_STATE={onboarded:false,goal:"",xp:0,streak:1,lastVisit:"",lessons:[],terms:[],saved:[],cases:[],simDone:{},name:"",dailyDone:{},version:9,
  diagnostic:{completed:false,answers:[],recommended:""},
  challenge:{started:false,startDate:"",completedDays:[]},
  duel:{date:"",answered:false,choice:null},
  weekly:{weekKey:"",xpStart:0,target:400},
  adaptive:{
    level:0,
    recent:[],
    recentDifficulty:[],
    caseResults:{},
    caseRatings:{}
  }
};
let state=loadLocalState();
let session=null;
let authMode="login";
let activeModule="all";
let caseMode="adaptive";
let activeSimulator="coffee";
let sim=null;
let coachMode="idea";
let cloudTimer=null;
let syncBusy=false;
let userCertificates=[];
let userSubscription=null;
let userEntitlement=null;
let creatorAccount=null;
let paddleInitialized=false;
let paddleLoadPromise=null;
let pendingCheckoutPlan=null;
const CERTIFICATE_TYPES=[
  {id:"foundation",title:"Business Foundations",desc:L("База предпринимательства и первые решения.","Business foundations and first decisions."),modules:["basics"],minCases:3,minSims:0},
  {id:"finance",title:"Business Finance",desc:L("Cash flow, маржа, unit economics и финансовая дисциплина.","Cash flow, margin, unit economics and financial discipline."),modules:["finance"],minCases:5,minSims:1},
  {id:"growth",title:"Growth: Marketing & Sales",desc:L("Привлечение, удержание, продажи и переговоры.","Acquisition, retention, sales and negotiation."),modules:["marketing","sales"],minCases:8,minSims:1},
  {id:"operator",title:"Business Operations",desc:L("Финансы + менеджмент + операционные решения.","Finance + management and operating decisions."),modules:["finance","management"],minCases:12,minSims:2},
  {id:"mastery",title:"Business Decision Mastery",desc:L("Главный сертификат BIZONIQ за комплексное прохождение.","The flagship BIZONIQ certificate for comprehensive completion."),modules:["*"],minCases:24,minSims:4}
];

function loadLocalState(){
  try{
    const v3=JSON.parse(localStorage.getItem("forge_v3_state")||"null");
    if(v3) return normalizeGrowthState({...DEFAULT_STATE,...v3,simDone:v3.simDone||{},dailyDone:v3.dailyDone||{}});
    const v2=JSON.parse(localStorage.getItem("forgeState")||"null");
    if(v2) return normalizeGrowthState({...DEFAULT_STATE,...v2,simDone:typeof v2.simDone==="object"?v2.simDone:{coffee:!!v2.simDone},version:5});
    const old=JSON.parse(localStorage.getItem("ventureState")||"null");
    if(old) return normalizeGrowthState({...DEFAULT_STATE,onboarded:!!old.onboarded,goal:normalizeGoal(old.goal),xp:old.xp||0,streak:old.streak||1,terms:old.terms||[],name:"Максим",version:5});
  }catch(e){}
  return normalizeGrowthState({...DEFAULT_STATE});
}
function normalizeGrowthState(s){
  s.diagnostic={...DEFAULT_STATE.diagnostic,...(s.diagnostic||{})};
  s.challenge={...DEFAULT_STATE.challenge,...(s.challenge||{}),completedDays:[...new Set((s.challenge&&s.challenge.completedDays)||[])]};
  s.duel={...DEFAULT_STATE.duel,...(s.duel||{})};
  s.weekly={...DEFAULT_STATE.weekly,...(s.weekly||{})};
  s.adaptive={...DEFAULT_STATE.adaptive,...(s.adaptive||{})};
  s.adaptive.recent=[...(s.adaptive.recent||[])];
  s.adaptive.recentDifficulty=[...(s.adaptive.recentDifficulty||[])];
  s.adaptive.caseResults={...(s.adaptive.caseResults||{})};
  s.adaptive.caseRatings={...(s.adaptive.caseRatings||{})};
  if(!s.adaptive.level)s.adaptive.level=initialAdaptiveLevel(s.goal);
  resetWeeklyIfNeeded(s);
  return s;
}
function weekKeyNow(){
  const d=new Date(),day=(d.getDay()+6)%7;
  const monday=new Date(d);monday.setDate(d.getDate()-day);monday.setHours(0,0,0,0);
  return monday.toISOString().slice(0,10);
}
function resetWeeklyIfNeeded(s=state){
  const wk=weekKeyNow();
  if(s.weekly.weekKey!==wk){s.weekly={weekKey:wk,xpStart:s.xp||0,target:s.weekly.target||400};}
}
function initialAdaptiveLevel(goal){
  if(goal==="run"||goal==="mind")return 2;
  return 1;
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
  setSyncStatus(L("Синхронизация…","Syncing…"),false);
  cloudTimer=setTimeout(pushCloud,550);
}
function setSyncStatus(text,on){
  const dot=document.getElementById("syncDot"),label=document.getElementById("syncText");
  if(dot) dot.classList.toggle("on",!!on);
  if(label) label.textContent=T(text);
}

function authErrorMessage(error,context="login"){
  const code=String(error?.code||"").toLowerCase();
  const msg=String(error?.message||"").toLowerCase();
  if(code.includes("invalid_credentials")||msg.includes("invalid login credentials")){
    return L("Почта или пароль введены неверно. Проверь данные или восстанови пароль.","Email or password is incorrect. Check your details or reset your password.");
  }
  if(code.includes("email_exists")||code.includes("user_already_exists")||msg.includes("already registered")||msg.includes("already exists")){
    return L("Эта почта уже используется. Войди в аккаунт или восстанови пароль.","This email is already in use. Sign in or reset your password.");
  }
  if(code.includes("weak_password")||msg.includes("password")){
    return context==="register"
      ? L("Пароль не подходит. Используй минимум 10 символов.","Password is not accepted. Use at least 10 characters.")
      : L("Не удалось изменить пароль. Используй минимум 10 символов и попробуй ещё раз.","Could not update the password. Use at least 10 characters and try again.");
  }
  if(code.includes("over_email_send_rate_limit")||msg.includes("rate limit")){
    return L("Слишком много попыток. Подожди немного и попробуй ещё раз.","Too many attempts. Please try again a little later.");
  }
  return context==="register"
    ? L("Не удалось создать аккаунт. Проверь данные и попробуй ещё раз.","Could not create the account. Check your details and try again.")
    : L("Не удалось выполнить вход. Проверь данные и попробуй ещё раз.","Could not sign in. Check your details and try again.");
}

function setAuthMode(mode="login"){
  authMode=mode;
  const login=document.getElementById("authLoginPanel"),register=document.getElementById("authRegisterPanel"),recovery=document.getElementById("authRecoveryPanel"),newPass=document.getElementById("authNewPasswordPanel");
  if(login)login.classList.toggle("hidden",mode!=="login");
  if(register)register.classList.toggle("hidden",mode!=="register");
  if(recovery)recovery.classList.toggle("hidden",mode!=="recovery");
  if(newPass)newPass.classList.toggle("hidden",mode!=="new-password");
  document.getElementById("authTabs")?.classList.toggle("hidden",mode==="recovery"||mode==="new-password");
  document.getElementById("authLoginTab")?.classList.toggle("active",mode==="login");
  document.getElementById("authRegisterTab")?.classList.toggle("active",mode==="register");
  const status=document.getElementById("authStatus");if(status)status.textContent="";
  const title=document.getElementById("authTitle"),intro=document.getElementById("authIntro");
  if(title)title.textContent=mode==="register"?L("Создание аккаунта","Create account"):mode==="recovery"?L("Восстановление аккаунта","Account recovery"):mode==="new-password"?L("Новый пароль","New password"):L("Вход в аккаунт","Sign in");
  if(intro)intro.textContent=mode==="register"
    ?L("Создай аккаунт, чтобы сохранять и синхронизировать прогресс.","Create an account to save and sync your progress.")
    :mode==="recovery"
      ?L("Мы отправим безопасную ссылку для создания нового пароля.","We will send a secure link to create a new password.")
      :mode==="new-password"
        ?L("Установи новый пароль для своего аккаунта.","Set a new password for your account.")
        :L("Войди, чтобы синхронизировать прогресс между устройствами.","Sign in to sync your progress across devices.");
  const loginEmail=document.getElementById("loginEmail")?.value?.trim();
  const registerEmail=document.getElementById("registerEmail")?.value?.trim();
  if(mode==="recovery"&&!document.getElementById("recoveryEmail")?.value){
    const el=document.getElementById("recoveryEmail");if(el)el.value=loginEmail||registerEmail||"";
  }
  localizeUI(document.getElementById("auth"));
}

async function initAuth(){
  const {data:{session:s}}=await sb.auth.getSession();
  session=s;
  sb.auth.onAuthStateChange(async(event,sess)=>{
    session=sess;
    renderAuthState();
    if(event==="PASSWORD_RECOVERY"){
      openAuth("new-password");
      return;
    }
    if(sess&&(event==="SIGNED_IN"||event==="INITIAL_SESSION"||event==="TOKEN_REFRESHED")){
      await mergeCloud(); await Promise.all([loadCertificates(),loadSubscription()]);
    }
    if(event==="SIGNED_OUT"){
      userCertificates=[];
      userSubscription=null;
      userEntitlement=null;
      creatorAccount=null;
      setSyncStatus(L("Локальный режим","Local mode"),false);
      renderAll();
    }
  });
  renderAuthState();
  if(new URLSearchParams(location.search).get("recovery")==="1"&&session)openAuth("new-password");
  if(session){ await mergeCloud(); await Promise.all([loadCertificates(),loadSubscription()]); }
}

async function registerUser(){
  const first=cleanPlainText(document.getElementById("registerFirstName").value,50);
  const last=cleanPlainText(document.getElementById("registerLastName").value,60);
  const email=document.getElementById("registerEmail").value.trim().toLowerCase();
  const password=document.getElementById("registerPassword").value;
  const status=document.getElementById("authStatus");
  if(!first||!last){status.textContent=L("Укажи имя и фамилию.","Enter your first and last name.");return}
  if(!email||!email.includes("@")){status.textContent=L("Укажи корректную почту.","Enter a valid email address.");return}
  if(password.length<10){status.textContent=L("Пароль должен содержать минимум 10 символов.","Password must contain at least 10 characters.");return}
  const name=(first+" "+last).trim();
  status.textContent=L("Создаю аккаунт…","Creating account…");
  const {data,error}=await sb.auth.signUp({
    email,password,
    options:{data:{display_name:name,first_name:first,last_name:last,language:LANG},emailRedirectTo:new URL("./",location.href).href}
  });
  if(error){status.textContent=authErrorMessage(error,"register");return}
  if(data?.user?.identities&&data.user.identities.length===0){
    status.textContent=L("Эта почта уже используется. Войди в аккаунт или восстанови пароль.","This email is already in use. Sign in or reset your password.");
    return;
  }
  state.name=name; localSave(false);
  if(data.session){
    session=data.session; status.textContent=L("Аккаунт создан и вход выполнен.","Account created and signed in."); await mergeCloud(); closeAuth();
  }else{
    status.textContent=L("Аккаунт создан. Проверь почту и подтверди email, затем войди.","Account created. Check your email, confirm it, then sign in.");
  }
}

async function signInUser(){
  const email=document.getElementById("loginEmail").value.trim().toLowerCase();
  const password=document.getElementById("loginPassword").value;
  const status=document.getElementById("authStatus");
  if(!email||!password){status.textContent=L("Введи почту и пароль.","Enter your email and password.");return}
  status.textContent=L("Вхожу…","Signing in…");
  const {data,error}=await sb.auth.signInWithPassword({email,password});
  if(error){status.textContent=authErrorMessage(error,"login");return}
  session=data.session; status.textContent=L("Вход выполнен.","Signed in."); await mergeCloud(); closeAuth();
}

async function sendPasswordReset(){
  const email=document.getElementById("recoveryEmail").value.trim().toLowerCase();
  const status=document.getElementById("authStatus");
  if(!email||!email.includes("@")){status.textContent=L("Укажи корректную почту.","Enter a valid email address.");return}
  status.textContent=L("Отправляю ссылку…","Sending reset link…");
  const redirect=new URL("./?recovery=1",location.href).href;
  const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:redirect});
  if(error){status.textContent=authErrorMessage(error,"recovery");return}
  status.textContent=L("Если аккаунт с этой почтой существует, ссылка для восстановления уже отправлена. Проверь также папку «Спам».","If an account with this email exists, the recovery link has been sent. Check your spam folder too.");
}

async function updateRecoveredPassword(){
  const p1=document.getElementById("recoveryNewPassword").value;
  const p2=document.getElementById("recoveryNewPassword2").value;
  const status=document.getElementById("authStatus");
  if(p1.length<10){status.textContent=L("Новый пароль должен содержать минимум 10 символов.","The new password must contain at least 10 characters.");return}
  if(p1!==p2){status.textContent=L("Пароли не совпадают.","Passwords do not match.");return}
  status.textContent=L("Сохраняю новый пароль…","Saving new password…");
  const {error}=await sb.auth.updateUser({password:p1});
  if(error){status.textContent=authErrorMessage(error,"recovery");return}
  document.getElementById("recoveryNewPassword").value="";
  document.getElementById("recoveryNewPassword2").value="";
  status.textContent=L("Пароль изменён. Аккаунт восстановлен — можно продолжать работу.","Password updated. Account recovered — you can continue.");
  const u=new URL(location.href);u.searchParams.delete("recovery");history.replaceState(null,"",u.pathname+u.search+u.hash);
  renderAuthState();
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
    btn.textContent=L("☁ Аккаунт","☁ Account");
    btn.onclick=()=>go("profile");
  }else{
    btn.textContent=L("Войти","Sign in");
    btn.onclick=openAuth;
  }
  setSyncStatus(session?"Облако подключено":"Локальный режим",!!session);
}

function authFullDisplayName(){
  const md=session?.user?.user_metadata||{};
  const first=cleanPlainText(md.first_name||"",50);
  const last=cleanPlainText(md.last_name||"",60);
  const full=(first+" "+last).trim();
  return full||cleanPlainText(md.display_name||"",110);
}
async function mergeCloud(){
  if(!session||syncBusy)return;
  syncBusy=true; setSyncStatus(L("Загружаю облако…","Loading cloud data…"),false);
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
    const authName=authFullDisplayName();
    if(remote){
      const remoteName=cleanPlainText(remote.display_name||"",110);
      const authHasFullName=authName.split(/\s+/).filter(Boolean).length>=2;
      const remoteHasFullName=remoteName.split(/\s+/).filter(Boolean).length>=2;
      state.name=(authHasFullName&&!remoteHasFullName)?authName:(remoteName||state.name||authName||L("Пользователь","User"));
      state.goal=remote.learning_path||state.goal||"curious";
      state.onboarded=true;
      state.xp=Math.max(state.xp||0,remote.xp||0);
      state.streak=Math.max(state.streak||1,remote.streak||1);
      if(remote.extras&&typeof remote.extras==="object"){
        state.diagnostic={...state.diagnostic,...(remote.extras.diagnostic||{})};
        state.challenge={...state.challenge,...(remote.extras.challenge||{}),completedDays:[...new Set([...(state.challenge.completedDays||[]),...((remote.extras.challenge||{}).completedDays||[])])]};
        state.duel={...state.duel,...(remote.extras.duel||{})};
        state.weekly={...state.weekly,...(remote.extras.weekly||{})};
        if(remote.extras.adaptive){
          const ra=remote.extras.adaptive;
          state.adaptive={
            ...state.adaptive,...ra,
            caseResults:{...(state.adaptive.caseResults||{}),...(ra.caseResults||{})},
            caseRatings:{...(state.adaptive.caseRatings||{}),...(ra.caseRatings||{})},
            recent:[...(ra.recent||state.adaptive.recent||[])],
            recentDifficulty:[...(ra.recentDifficulty||state.adaptive.recentDifficulty||[])]
          };
        }
      }
    }else{
      state.name=authName||state.name||L("Пользователь","User");
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
    renderAll(); setSyncStatus(L("Синхронизировано","Synced"),true);
  }catch(e){setSyncStatus(L("Ошибка синхронизации","Sync error"),false);console.error(e)}
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
  setSyncStatus(L("Сохраняю…","Saving…"),false);
  try{
    await sb.from("profiles").upsert({
      user_id:uid,display_name:state.name||L("Пользователь","User"),learning_path:state.goal||"curious",
      xp:state.xp||0,streak:state.streak||1,last_active_date:todayKey(),
      simulator_finished:Object.values(state.simDone||{}).some(Boolean),
      extras:{diagnostic:state.diagnostic,challenge:state.challenge,duel:state.duel,weekly:state.weekly,adaptive:state.adaptive},
      updated_at:new Date().toISOString()
    },{onConflict:"user_id"});
    if(state.lessons.length) await sb.from("lesson_progress").upsert(state.lessons.map(id=>({user_id:uid,lesson_id:id})),{onConflict:"user_id,lesson_id"});
    const termIds=[...new Set([...(state.terms||[]),...(state.saved||[])])];
    if(termIds.length) await sb.from("term_progress").upsert(termIds.map(id=>({user_id:uid,term_id:id,learned:state.terms.includes(id),saved:state.saved.includes(id),updated_at:new Date().toISOString()})),{onConflict:"user_id,term_id"});
    if(state.cases.length) await sb.from("case_progress").upsert(state.cases.map(id=>({user_id:uid,case_id:id})),{onConflict:"user_id,case_id"});
    const simRows=Object.keys(state.simDone||{}).filter(id=>state.simDone[id]).map(id=>({user_id:uid,simulator_id:id,result:{completed:true}}));
    if(simRows.length) await sb.from("simulator_runs").upsert(simRows,{onConflict:"user_id,simulator_id"});
    await sb.from("daily_activity").upsert({user_id:uid,activity_date:todayKey(),xp_earned:0},{onConflict:"user_id,activity_date"});
    setSyncStatus(L("Синхронизировано","Synced"),true);
  }catch(e){setSyncStatus(L("Ошибка облака","Cloud error"),false);console.error(e)}
}

function manualProActive(){
  if(!userEntitlement||userEntitlement.status!=="active")return false;
  return !userEntitlement.ends_at || new Date(userEntitlement.ends_at)>new Date();
}
function isPro(){
  return (!!userSubscription && ["active","trialing"].includes(userSubscription.status)) || manualProActive();
}
function proAccess(){
  return !billingConfigured() || isPro();
}
function proLabel(){
  if(manualProActive())return userEntitlement.source==="code"?L("Pro • код доступа","Pro • access code"):L("Pro • выдан создателем","Pro • creator granted");
  if(userSubscription&&["active","trialing"].includes(userSubscription.status)) return userSubscription.plan_id==="pro_yearly" ? "Pro Yearly" : "Pro Monthly";
  if(userSubscription?.status==="past_due") return L("Pro • проблема с оплатой","Pro • payment issue");
  if(userSubscription?.status==="paused") return L("Pro • приостановлена","Pro • paused");
  return "Free";
}
async function loadSubscription(){
  if(!session){userSubscription=null;userEntitlement=null;creatorAccount=null;renderPricing();renderProfile();return}
  const [subsQ,entQ,creatorQ]=await Promise.all([
    sb.from("subscriptions").select("*").order("updated_at",{ascending:false}).limit(5),
    sb.from("manual_entitlements").select("*").eq("user_id",session.user.id).maybeSingle(),
    sb.from("creator_accounts").select("*").eq("user_id",session.user.id).maybeSingle()
  ]);
  if(!subsQ.error){
    const rows=subsQ.data||[];
    userSubscription=rows.find(x=>["active","trialing"].includes(x.status))||rows[0]||null;
  }
  userEntitlement=entQ.error?null:entQ.data;
  creatorAccount=creatorQ.error?null:creatorQ.data;
  renderPricing();
  renderProfile();
  renderAllProtected();
}

function trackEvent(event_name,properties={}){
  try{
    sb.functions.invoke("submit-analytics",{body:{event_name,properties:{
      ...properties,path:state.goal,adaptive_level:state.adaptive?.level||1
    }}}).catch(()=>{});
  }catch{}
}
async function redeemAccessCode(){
  if(!session){openAuth();return}
  const input=document.getElementById("accessCodeInput"),status=document.getElementById("accessCodeStatus");
  const code=(input?.value||"").trim().toUpperCase();
  if(!code){if(status)status.textContent=L("Введи код.","Enter a code.");return}
  if(status)status.textContent=L("Проверяю код…","Checking code…");
  const {data,error}=await sb.functions.invoke("redeem-access-code",{body:{code}});
  if(error||!data?.ok){
    if(status)status.textContent=data?.error||L("Код не активирован. Проверь его или попробуй позже.","Code was not activated. Check it or try again later.");
    return;
  }
  if(status)status.textContent=data.already_lifetime?L("У тебя уже бессрочный Pro.","You already have lifetime Pro."):L("Готово. Pro продлён на ","Done. Pro extended by ")+(data.duration_days||0)+L(" дней."," days.");
  if(input)input.value="";
  await loadSubscription();
}

function renderAllProtected(){
  renderLessons();renderCases();renderSimulator();renderCoach();renderCertificates();
}
function paywall(featureRu="Эта функция",featureEn="This feature"){
  const feature=LANG==="en"?featureEn:featureRu;
  modal(`<div class="label">BIZONIQ PRO</div><h2>${LANG==="en"?feature+" requires Pro":feature+" доступна в Pro"}</h2><div class="copy">${LANG==="en"?"Full access: ":"Полный доступ: "}${proPriceSummary()}.</div><div class="btnrow"><button class="btn primary" onclick="closeModal();go('pricing')">${L("Посмотреть Pro","View Pro")}</button><button class="btn ghost" onclick="closeModal()">${L("Позже","Later")}</button></div>`,true);
}
function lessonIsPremium(module,lesson){
  return module.lessons.findIndex(x=>x[0]===lesson[0])>=2;
}
function caseIsPremium(c){
  return C.cases.findIndex(x=>x.id===c.id)>=8;
}
async function ensurePaddleLoaded(){
  if(window.Paddle)return true;
  if(!billingConfigured())return false;
  if(!paddleLoadPromise){
    paddleLoadPromise=new Promise(resolve=>{
      const script=document.createElement("script");
      script.src="https://cdn.paddle.com/paddle/v2/paddle.js";
      script.async=true;
      script.crossOrigin="anonymous";
      script.referrerPolicy="strict-origin-when-cross-origin";
      script.onload=()=>resolve(!!window.Paddle);
      script.onerror=()=>resolve(false);
      document.head.appendChild(script);
    });
  }
  return await paddleLoadPromise;
}
async function initPaddle(){
  const cfg=window.BIZONIQ_BILLING||{};
  if(paddleInitialized)return true;
  if(!cfg.clientToken)return false;
  if(!(await ensurePaddleLoaded()))return false;
  try{
    if(cfg.environment==="sandbox")Paddle.Environment.set("sandbox");
    Paddle.Initialize({
      token:cfg.clientToken,
      checkout:{settings:{displayMode:"overlay",theme:"dark"}},
      eventCallback:function(ev){
        if(ev?.name==="checkout.completed")setTimeout(()=>loadSubscription(),1800);
      }
    });
    paddleInitialized=true;
    return true;
  }catch(e){console.error(e);return false}
}
function billingConfigured(){
  const cfg=window.BIZONIQ_BILLING||{};
  const cur=PREFS.currency||"RUB";
  const prices=cfg.priceIds?.[cur]||{};
  return !!(cfg.clientToken&&prices.monthly&&prices.yearly);
}
async function startPaddleCheckout(plan){
  pendingCheckoutPlan=plan;
  trackEvent("pro_clicked",{plan,source:"pricing"});
  if(!session){openAuth();return}
  if(isPro()){
    modal(`<div class="label">BIZONIQ PRO</div><h2>${L("Pro уже активен","Pro is already active")}</h2><div class="copy">${L("Управлять оплатой или отменой можно через Paddle Customer Portal.","Manage billing or cancellation through the Paddle Customer Portal.")}</div><div class="btnrow"><button class="btn primary" onclick="closeModal();openBillingPortal()">${L("Управлять подпиской","Manage subscription")}</button></div>`,true);
    return;
  }
  const cfg=window.BIZONIQ_BILLING||{};
  if(!billingConfigured()||!(await initPaddle())){
    modal(`<div class="label">${L("ОПЛАТА","BILLING")}</div><h2>${L("Онлайн-оплата ещё не включена","Online payments are not enabled yet")}</h2><div class="copy">${L("Тарифы и серверная часть уже готовы. До подключения Paddle текущая beta-версия остаётся доступной без платёжной блокировки.","Pricing and backend are ready. Until Paddle is connected, the current beta remains available without payment blocking.")}</div>`,true);
    return;
  }
  const cur=PREFS.currency||"RUB";
  const priceSet=cfg.priceIds?.[cur]||{};
  const priceId=plan==="pro_yearly"?priceSet.yearly:priceSet.monthly;
  Paddle.Checkout.open({
    items:[{priceId,quantity:1}],
    customer:{email:session.user.email},
    customData:{supabase_user_id:session.user.id,plan_id:plan,currency:cur},
    settings:{displayMode:"overlay",theme:"dark"}
  });
}
async function openBillingPortal(){
  if(!session){openAuth();return}
  const {data,error}=await sb.functions.invoke("paddle-portal",{body:{}});
  if(error||!data?.management_urls){
    modal(`<div class="label">BILLING</div><h2>${L("Портал оплаты пока не подключён","Billing portal is not connected yet")}</h2><div class="copy">${L("Для Customer Portal нужен Paddle API key в секретах Supabase. Backend уже подготовлен.","The Customer Portal requires a Paddle API key in Supabase secrets. The backend is already prepared.")}</div>`,true);
    return;
  }
  const u=data.management_urls;
  modal(`<div class="label">PADDLE CUSTOMER PORTAL</div><h2>${L("Управление подпиской","Manage subscription")}</h2><div class="copy">${L("Платёжные данные обрабатываются на стороне Paddle.","Payment details are processed by Paddle.")}</div><div class="btnrow">${u.update_payment_method?`<button class="btn secondary" onclick="window.open('${u.update_payment_method}','_blank')">${L("Изменить оплату","Update payment")}</button>`:""}${u.cancel?`<button class="btn danger" onclick="window.open('${u.cancel}','_blank')">${L("Отменить подписку","Cancel subscription")}</button>`:""}</div>`,true);
}
function renderPricing(){
  const el=document.getElementById("pricingStatus");if(!el)return;
  if(isPro()){
    const manual=manualProActive();
    const end=manual
      ? (userEntitlement?.ends_at?new Date(userEntitlement.ends_at).toLocaleDateString(LANG==="en"?"en-US":"ru-RU"):"")
      : (userSubscription?.current_period_end?new Date(userSubscription.current_period_end).toLocaleDateString(LANG==="en"?"en-US":"ru-RU"):"");
    el.innerHTML=`<div class="pricing-status-row"><div><div class="tiny good">● PRO ACTIVE</div><h3>${proLabel()}</h3><div class="copy">${L("Доступ активен","Access is active")}${end?(LANG==="en"?" until ":" до ")+end:""}.</div></div>${!manual&&userSubscription?`<button class="btn secondary" onclick="openBillingPortal()">${L("Управлять подпиской","Manage subscription")}</button>`:""}</div>`;
  }else{
    el.innerHTML=`<div class="pricing-status-row"><div><div class="tiny">CURRENT PLAN</div><h3>Free</h3><div class="copy">${L("Базовый доступ остаётся бесплатным.","Core access stays free.")}</div></div><span class="pill" data-price-summary>${proPriceSummary()}</span></div>`;
  }
  localizeUI(el);
}

function levelRequirementsMet(l){
  const sims=Object.values(state.simDone||{}).filter(Boolean).length;
  return state.xp>=l.xp&&state.cases.length>=l.cases&&sims>=l.sims&&state.lessons.length>=l.lessons;
}
function level(){
  let idx=0;
  for(let i=0;i<LEVELS.length;i++){if(levelRequirementsMet(LEVELS[i]))idx=i}
  const cur=LEVELS[idx],next=LEVELS[Math.min(idx+1,LEVELS.length-1)];
  if(cur===next)return {name:cur.name,pct:100,next:null,requirements:cur};
  const sims=Object.values(state.simDone||{}).filter(Boolean).length;
  const ratios=[
    next.xp?state.xp/next.xp:1,
    next.cases?state.cases.length/next.cases:1,
    next.sims?sims/next.sims:1,
    next.lessons?state.lessons.length/next.lessons:1
  ].map(x=>Math.max(0,Math.min(1,x)));
  const pct=Math.round(ratios.reduce((a,b)=>a+b,0)/ratios.length*100);
  return {name:cur.name,pct,next:next.name,requirements:next};
}
function lessonXp(l){return Math.max(10,Math.min(20,Math.round((Number(l?.[6])||30)*0.35)))}
function termXp(){return 5}
function pathObj(){return C.paths.find(p=>p.id===state.goal)||C.paths[3]}
function rub(n){return PREFS.money?PREFS.money(n):Math.round(n).toLocaleString("ru-RU")+" ₽"}
function proPrice(plan){return PREFS.price?PREFS.price(plan):(plan==="yearly"?"799 ₽":"99 ₽")}
function proPriceSummary(){return PREFS.priceSummary?PREFS.priceSummary():"99 ₽/мес · 799 ₽/год"}
function modal(html,small=false){
  const body=document.getElementById("modalBody");
  body.innerHTML=html;
  document.getElementById("modalDialog").classList.toggle("small",small);
  document.getElementById("modal").classList.remove("hidden");
  localizeUI(body);
}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function openAuth(mode="login"){document.getElementById("auth").classList.remove("hidden");setAuthMode(mode)}
function closeAuth(){document.getElementById("auth").classList.add("hidden")}

function buildNav(){
  const desk=document.getElementById("desktopNav"),mobile=document.getElementById("mobileNav");
  desk.innerHTML=NAV.map((n,i)=>`<button class="${i===0?"active":""}" data-page="${n[0]}" aria-label="${n[2]}" title="${n[2]}">${iconSvg(n[1])}<span>${n[2]}</span></button>`).join("");
  mobile.innerHTML=MOBILE_NAV.map((n,i)=>`<button class="${i===0?"active":""}" data-page="${n[0]}" aria-label="${n[2]}">${iconSvg(n[1])}<span>${n[2]}</span></button>`).join("");
  document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>go(b.dataset.page));
}
function go(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===page));
  document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  const meta={
    dashboard:[L("Главная","Home"),L("Следующий шаг, прогресс и практика — без лишних поисков.","Your next step, progress and practice — without unnecessary searching.")],
    learn:[L("Обучение","Courses"),L("56 коротких уроков, адаптированных под твою траекторию.","56 short lessons adapted to your learning path.")],
    dictionary:["Business Dictionary",L("Термины с примерами, поиском и избранным.","Terms with examples, search and favorites.")],
    practice:[L("Практика","Practice"),L("Кейсы, симуляторы, Coach и сертификаты.","Cases, simulations, Coach and certificates.")],
    cases:[L("Бизнес-кейсы","Business cases"),L("32 ситуации для тренировки решений.","32 situations for decision-making practice.")],
    simulator:["Business Simulator",L("Четыре бизнеса, где решения меняют экономику.","Four businesses where your decisions change the economics.")],
    coach:["Business Coach",L("Интерактивный тренер: идея, финансы, маркетинг и сложные кейсы.","Interactive coaching for ideas, finance, marketing and difficult cases.")],
    certificates:[L("Сертификаты","Certificates"),L("Проверяемые сертификаты прохождения с уникальным ID.","Verifiable completion certificates with a unique ID.")],
    pricing:["BIZONIQ Pro",L("Полный доступ по месячному или годовому тарифу.","Full access with monthly or yearly billing.")],
    profile:[L("Профиль и синхронизация","Profile & sync"),L("Смена пути, аккаунт, backup и прогресс.","Learning path, account, backup and progress.")]
  };
  document.getElementById("pageTitle").textContent=T(meta[page][0]);
  document.getElementById("pageSub").textContent=T(meta[page][1]);
  localizeUI(document.querySelector(".topbar")||document.body);
  trackEvent("page_view",{page});
  if(page==="pricing")trackEvent("pricing_viewed",{source:"navigation"});
  scrollTo({top:0,behavior:"smooth"});
}

function renderPractice(){
  const title=document.getElementById("practiceSectionTitle");
  const copy=document.getElementById("practiceSectionCopy");
  const wrap=document.getElementById("practiceCards");
  if(title)title.textContent=L("Практика","Practice");
  if(copy)copy.textContent=L("Кейсы, симуляторы, Coach и сертификаты — в одном месте.","Cases, simulations, Coach and certificates — all in one place.");
  if(!wrap)return;
  wrap.innerHTML=PRACTICE_CARDS.map(card=>`
    <button class="card practice-card" onclick="go('${card.id}')">
      <span class="practice-icon">${PRACTICE_ICONS[card.id]||PRACTICE_ICONS.cases}</span>
      <span class="practice-card-copy"><b>${card.title}</b><small>${card.desc}</small></span>
      <span class="practice-arrow" aria-hidden="true">→</span>
    </button>
  `).join("");
}

function renderOnboarding(){
  document.getElementById("goalGrid").innerHTML=C.paths.map(p=>`<div class="goal" onclick="choosePath('${p.id}',true)"><b>${p.title}</b><div class="copy">${p.subtitle}</div></div>`).join("");
  document.getElementById("onboard").classList.toggle("hidden",!!state.onboarded);
}
function choosePath(id,first=false){
  const hadCases=Object.keys(state.adaptive?.caseResults||{}).length>0;
  state.goal=id;state.onboarded=true;
  if(!hadCases||first)state.adaptive.level=initialAdaptiveLevel(id);
  if(first&&state.xp===0)state.xp+=25;
  localSave();
  document.getElementById("onboard").classList.add("hidden");
  if(!first)closeModal();
}
function changePath(){
  modal(`<div class="label">${L("СМЕНИТЬ ТРАЕКТОРИЮ","CHANGE PATH")}</div><h2>${L("Выбери новый путь","Choose a new path")}</h2><div class="copy">${L("Прогресс, XP, изученные термины и кейсы не сбрасываются. Меняются рекомендации и порядок контента.","Progress, XP, learned terms and cases are preserved. Recommendations and content order will change.")}</div><div class="goals">${C.paths.map(p=>`<div class="goal ${state.goal===p.id?"selected":""}" onclick="choosePath('${p.id}',false)"><b>${p.title}</b><div class="copy">${p.subtitle}</div></div>`).join("")}</div>`);
}


const SKILL_LABELS={
  basics:L("Бизнес-база","Business foundations"),finance:L("Финансы","Finance"),marketing:L("Маркетинг","Marketing"),sales:L("Продажи","Sales"),
  strategy:L("Стратегия","Strategy"),startup:L("Стартапы","Startups"),management:L("Менеджмент","Management"),economics:L("Экономика","Economics")
};
function difficultyName(level=state.adaptive.level){
  return level===3?"Advanced":level===2?"Intermediate":"Beginner";
}
function difficultyRu(level){
  return level===3?"Продвинутый":level===2?"Средний":"Начальный";
}
function skillScores(){
  const out={};
  const seeds=state.diagnostic?.skillSeed||{};
  C.modules.forEach(m=>{
    const done=m.lessons.filter(l=>state.lessons.includes(l[0])).length;
    const lessonScore=done/m.lessons.length*100;
    const results=Object.values(state.adaptive.caseResults||{}).filter(r=>r.category===m.id);
    const weightedTotal=results.reduce((s,r)=>s+(Number(r.difficulty)||1),0);
    const weightedCorrect=results.reduce((s,r)=>s+(r.correct?(Number(r.difficulty)||1):0),0);
    const caseScore=weightedTotal?weightedCorrect/weightedTotal*100:lessonScore;
    const coverage=Math.min(100,results.length/4*100);
    const seed=Number(seeds[m.id]??50);
    const score=results.length
      ?Math.round(lessonScore*.25+caseScore*.45+coverage*.20+seed*.10)
      :Math.round(lessonScore*.55+seed*.45);
    out[m.id]={id:m.id,label:SKILL_LABELS[m.id]||m.title,icon:m.icon,score,lessons:done,total:m.lessons.length,attempts:results.length,correct:results.filter(r=>r.correct).length,caseScore:Math.round(caseScore),coverage:Math.round(coverage)};
  });
  return out;
}
function weakSkills(){
  const scores=Object.values(skillScores());
  const preferred=pathObj().recommended;
  return scores.sort((a,b)=>{
    const ap=preferred.includes(a.id)?-8:0,bp=preferred.includes(b.id)?-8:0;
    return (a.score+ap)-(b.score+bp);
  });
}
function recordCaseAttempt(c,correct){
  if(state.adaptive.caseResults[c.id])return;
  state.adaptive.caseResults[c.id]={correct:!!correct,category:c.category,difficulty:c.difficulty,at:new Date().toISOString()};
  state.adaptive.recent=[...(state.adaptive.recent||[]),!!correct].slice(-5);
  const r=state.adaptive.recent;
  if(r.length>=5){
    const correctCount=r.filter(Boolean).length;
    if(correctCount>=4&&state.adaptive.level<3){state.adaptive.level++;state.adaptive.recent=[];}
    else if(correctCount<=1&&state.adaptive.level>1){state.adaptive.level--;state.adaptive.recent=[];}
  }
}
function rateCaseDifficulty(id,rating){
  if(state.adaptive.caseRatings[id])return;
  state.adaptive.caseRatings[id]=rating;
  state.adaptive.recentDifficulty=[...(state.adaptive.recentDifficulty||[]),rating].slice(-3);
  const last=state.adaptive.recentDifficulty;
  if(last.length>=2&&last.slice(-2).every(x=>x==="easy")&&state.adaptive.level<3){
    state.adaptive.level++;state.adaptive.recentDifficulty=[];
  }else if(last.length>=2&&last.slice(-2).every(x=>x==="hard")&&state.adaptive.level>1){
    state.adaptive.level--;state.adaptive.recentDifficulty=[];
  }
  localSave();
  const box=document.getElementById("caseRating");
  if(box)box.innerHTML=`<div class="tiny good">${L("Спасибо. Следующие кейсы будут учитывать эту оценку.","Thanks. Future cases will take this rating into account.")}</div>`;
}
function adaptiveCasePool(){
  const level=state.adaptive.level||initialAdaptiveLevel(state.goal);
  let pool=C.cases.filter(c=>c.paths.includes(state.goal)&&c.difficulty===level);
  if(pool.length<6)pool=C.cases.filter(c=>c.paths.includes(state.goal)&&Math.abs(c.difficulty-level)<=1);
  if(pool.length<6)pool=C.cases.filter(c=>Math.abs(c.difficulty-level)<=1);
  return [...pool].sort((a,b)=>{
    const ad=state.cases.includes(a.id)?1:0,bd=state.cases.includes(b.id)?1:0;
    if(ad!==bd)return ad-bd;
    return Math.abs(a.difficulty-level)-Math.abs(b.difficulty-level);
  });
}
function nextAdaptiveCase(category=null){
  let pool=adaptiveCasePool();
  if(category){
    const same=pool.filter(c=>c.category===category&&!state.cases.includes(c.id));
    if(same.length)return same[0];
  }
  return pool.find(c=>!state.cases.includes(c.id))||pool[0]||C.cases[0];
}
function nextLessonForSkill(skillId){
  const m=C.modules.find(x=>x.id===skillId);
  if(!m)return null;
  const l=m.lessons.find(x=>!state.lessons.includes(x[0]));
  return l?{m,l}:null;
}
function renderTodayPlan(){
  const target=document.getElementById("todayPlan");if(!target)return;
  const weak=weakSkills()[0]||{id:"basics",label:L("Бизнес-база","Business foundations")};
  const lesson=nextLessonForSkill(weak.id)||moduleOrder().flatMap(m=>m.lessons.map(l=>({m,l}))).find(x=>!state.lessons.includes(x.l[0]));
  const c=nextAdaptiveCase(weak.id);
  target.innerHTML=`
    <div class="card today-card primary-plan">
      <div class="tiny">1 · ${L("РЕШЕНИЕ","DECISION")}</div>
      <h3>${c?c.title:L("Адаптивный кейс","Adaptive case")}</h3>
      <div class="copy">${c?difficultyName(c.difficulty)+" · "+(SKILL_LABELS[c.category]||c.category):L("Подберём кейс по твоему уровню.","We’ll select a case for your level.")}</div>
      <div class="btnrow"><button class="btn primary" onclick="${c?`go('cases');setTimeout(()=>openCase('${c.id}'),100)`:"go('cases')"}">${L("Принять решение","Make a decision")}</button></div>
    </div>
    <div class="card today-card">
      <div class="tiny">2 · ${L("МИКРО-УРОК","MICRO LESSON")}</div>
      <h3>${lesson?lesson.l[1]:L("База пройдена","Knowledge base completed")}</h3>
      <div class="copy">${lesson?L("Точечно подтяни слабый навык: ","Patch the weak skill: ")+(SKILL_LABELS[lesson.m.id]||lesson.m.title):L("Теория больше не блокирует практику.","Theory no longer blocks practice.")}</div>
      <div class="btnrow"><button class="btn ghost" onclick="${lesson?`activeModule='${lesson.m.id}';go('learn');setTimeout(()=>openLesson('${lesson.l[0]}'),100)`:"go('cases')"}">${L("Разобрать","Review")}</button></div>
    </div>
    <div class="card today-card">
      <div class="tiny">3 · DAILY DUEL</div>
      <h3>${state.duel.date===todayKey()&&state.duel.answered?L("Сегодня выполнено ✓","Completed today ✓"):L("60 секунд на решение","60 seconds to decide")}</h3>
      <div class="copy">${L("Один короткий выбор + сравнение с решениями других пользователей.","One short decision + comparison with other users.")}</div>
      <div class="btnrow"><button class="btn ghost" onclick="dailyDuel()">${L("Открыть","Open")}</button></div>
    </div>`;
}
function renderWeakAreas(){
  const el=document.getElementById("weakAreas");if(!el)return;
  const weak=weakSkills().slice(0,3);
  el.innerHTML=weak.map((s,i)=>{const next=nextAdaptiveCase(s.id);return `<div class="weak-row"><div><span class="weak-rank">0${i+1}</span><b>${s.icon} ${s.label}</b><div class="tiny">${s.attempts?`${s.correct}/${s.attempts} ${L("сильных решений","strong decisions")} · ${L("покрытие","coverage")} ${s.coverage}%`:L("Нужно больше практических решений для точной оценки","More real decisions are needed for an accurate score")}</div></div><div class="weak-score">${s.score}</div><button class="btn ghost" onclick="${next?`go('cases');setTimeout(()=>openCase('${next.id}'),100)`:`activeModule='${s.id}';go('learn');renderLessons()`}">${L("Тренировать","Train")}</button></div>`}).join("");
}
function openBetaFeedback(category){
  trackEvent("feedback_opened",{category});
  const prompts={
    confusing:L("В какой момент ты не понимал, что делать дальше?","At what point did you not know what to do next?"),
    useless:L("Что в BIZONIQ показалось бесполезным?","What felt useless in BIZONIQ?"),
    return:L("Что реально заставило бы тебя зайти завтра?","What would genuinely make you come back tomorrow?"),
    willing_to_pay:L("За какую конкретно функцию ты был бы готов платить?","Which specific feature would you pay for?"),
    general:L("Что нам обязательно нужно улучшить?","What must we improve?")
  };
  modal(`<div class="label">BETA FEEDBACK</div><h2>${prompts[category]||prompts.general}</h2><div class="copy">${L("Пиши прямо. Нам сейчас полезнее критика, чем «всё классно».","Be direct. Criticism is more useful to us right now than “everything is great”.")}</div><textarea id="betaFeedbackText" class="textarea" maxlength="1500" placeholder="${L("Твой ответ...","Your answer...")}"></textarea><div id="betaFeedbackStatus" class="auth-status"></div><div class="btnrow"><button class="btn primary" onclick="submitBetaFeedback('${category}')">${L("Отправить","Send")}</button><button class="btn ghost" onclick="closeModal()">${L("Закрыть","Close")}</button></div>`,true);
}
async function submitBetaFeedback(category){
  const input=document.getElementById("betaFeedbackText"),status=document.getElementById("betaFeedbackStatus");
  const message=(input?.value||"").trim();
  if(message.length<2){status.textContent=L("Напиши хотя бы пару слов.","Write at least a couple of words.");return}
  status.textContent=L("Сохраняю…","Saving…");
  const {data,error}=await sb.functions.invoke("submit-feedback",{body:{category,message,context:{path:state.goal,adaptive_level:state.adaptive.level,xp:state.xp,lessons:state.lessons.length,cases:state.cases.length}}});
  if(error||!data?.ok){status.textContent=L("Не получилось отправить. Попробуй ещё раз.","Could not send it. Try again.");return}
  status.textContent=L("Спасибо. Отзыв сохранён.","Thanks. Feedback saved.");
  setTimeout(closeModal,700);
}

function renderStats(){
  const l=level(),path=pathObj();
  document.getElementById("sideLevel").textContent=l.name;document.getElementById("sideProgress").style.width=l.pct+"%";
  document.getElementById("sideXp").textContent=state.xp;document.getElementById("sideStreak").textContent=state.streak;
  document.getElementById("hello").textContent="👋 "+(state.name||L("Гость","Guest"));
  document.getElementById("streak").textContent="🔥 "+state.streak+L(" дн."," d.");
  document.getElementById("goalPill").textContent="🎯 "+path.title;
  const simsDone=Object.values(state.simDone||{}).filter(Boolean).length;
  const levelSub=l.next
    ?L("До ","To ")+l.next+": "+state.xp+"/"+l.requirements.xp+" XP · "+state.cases.length+"/"+l.requirements.cases+" "+L("кейсов","cases")+" · "+simsDone+"/"+l.requirements.sims+" "+L("сим.","sims")
    :L("Максимальный уровень внутри текущей системы","Maximum level in the current system");
  document.getElementById("stats").innerHTML=[
    ["Level",l.name,levelSub],["Case Level",difficultyName(),L("Адаптивная сложность","Adaptive difficulty")],
    [L("Решения","Decisions"),state.cases.length+"/32",L("Сильные кейсы","Decision cases")],[L("Симуляции","Simulations"),simsDone+"/4",L("Завершено","Completed")]
  ].map((s,i)=>`<div class="card metric"><div class="tiny">${s[0]}</div><b>${s[1]}</b><div class="tiny">${s[2]}</div>${i===0?`<div class="progress" style="margin-top:10px"><span style="width:${l.pct}%"></span></div>`:""}</div>`).join("");
}
function continueLearning(){
  const nextCase=nextAdaptiveCase(weakSkills()[0]?.id||null);
  if(nextCase){go("cases");setTimeout(()=>openCase(nextCase.id),120);return}
  const ordered=moduleOrder().flatMap(m=>m.lessons.map(l=>({m,l})));
  const next=ordered.find(x=>!state.lessons.includes(x.l[0]));
  if(next){activeModule=next.m.id;go("learn");renderLessons();setTimeout(()=>openLesson(next.l[0]),120);}
}
const DUELS=LANG==="en"?[
  {q:"Revenue grew 40%, but cash in the bank fell. What do you check first?",opts:["Follower count","Receivables and payment timing","Ad creative colors"],correct:1,why:"Sales growth can consume cash when money gets trapped in receivables or working capital."},
  {q:"CAC rises 35% while retention falls. What is the best move?",opts:["Double ad spend","Fix retention and unit economics first","Cut prices for everyone"],correct:1,why:"Expensive traffic into a product with weak retention scales the problem."},
  {q:"The team runs nine priorities at once. What is the most likely risk?",opts:["Too much data","Diluted focus and weak execution","Margin is too high"],correct:1,why:"Strategy requires choices. Nine priorities usually means there is no real priority."},
  {q:"A customer says “too expensive.” What is the strongest first step?",opts:["Give a discount","Clarify value, comparison and expected outcome","Say competitors are worse"],correct:1,why:"“Too expensive” often means value or risk is not clear enough, not that the numeric price is objectively wrong."},
  {q:"A SaaS product has strong signup growth but 10% monthly churn. What is most dangerous?",opts:["Weak retention","Too few logos on the website","An onboarding email that is too short"],correct:0,why:"High churn forces the company to constantly replace lost customers and destroys compounding growth."}
]:[
  {q:"Выручка выросла на 40%, а cash на счёте упал. Что проверишь первым?",opts:["Количество подписчиков","Дебиторку и сроки платежей","Цвет рекламных креативов"],correct:1,why:"Рост продаж может съедать cash, если деньги зависают в дебиторке или оборотном капитале."},
  {q:"CAC вырос на 35%, retention одновременно падает. Лучшее действие?",opts:["Удвоить рекламный бюджет","Сначала чинить удержание и unit economics","Сразу снизить цену всем"],correct:1,why:"Дорогой трафик в продукт со слабым удержанием масштабирует проблему."},
  {q:"Команда одновременно ведёт 9 приоритетов. Какой риск самый вероятный?",opts:["Слишком много данных","Размытый фокус и слабое исполнение","Слишком высокая маржа"],correct:1,why:"Стратегия требует отказа. Девять приоритетов почти всегда означают, что настоящего приоритета нет."},
  {q:"Клиент говорит «дорого». Что сильнее всего сделать первым?",opts:["Дать скидку","Уточнить ценность, сравнение и ожидаемый результат","Сказать, что конкуренты хуже"],correct:1,why:"«Дорого» часто означает не цену как таковую, а недостаточно понятную ценность или риск."},
  {q:"У SaaS высокий рост новых регистраций, но churn 10% в месяц. Что опаснее?",opts:["Слабое удержание","Мало логотипов на сайте","Слишком короткий onboarding email"],correct:0,why:"Высокий churn заставляет постоянно заменять ушедших клиентов и разрушает compounding роста."}
]
function dailyDuelIndex(){
  const day=Math.floor(new Date(todayKey()+"T00:00:00Z").getTime()/86400000);
  return ((day%DUELS.length)+DUELS.length)%DUELS.length;
}
function duelCommunityText(stats,choice){
  if(!stats||!stats.total)return L("Пока нет общей статистики.","No community stats yet.");
  if(stats.total===1)return L("Ты первый участник сегодняшней дуэли.","You are the first participant in today’s duel.");
  const count=Number(stats.choices?.[choice]||0);
  const pct=Math.round(count/stats.total*100);
  return LANG==="en"
    ?`${pct}% of ${stats.total} participants chose the same option as you.`
    :`${pct}% из ${stats.total} участников выбрали тот же вариант, что и ты.`;
}
function renderDuelCommunity(stats,choice){
  const el=document.getElementById("duelCommunity");if(!el)return;
  el.innerHTML=`<div class="duel-community-title">${L("Решения сообщества","Community decisions")}</div><div class="copy">${escapeHtml(duelCommunityText(stats,choice))}</div>`;
}
async function loadDuelCommunity(choice=state.duel.choice){
  if(!session||choice==null)return;
  const {data,error}=await sb.functions.invoke("duel-stats",{body:{duel_index:dailyDuelIndex(),duel_date:todayKey()}});
  if(!error&&data?.ok)renderDuelCommunity(data,choice);
}
function dailyDuel(){
  const d=DUELS[dailyDuelIndex()],done=state.duel.date===todayKey()&&state.duel.answered;
  modal(`<div class="label">DAILY BUSINESS DUEL</div><h2>${d.q}</h2><div class="copy">${L("Один вопрос в день. Здесь ищем не «школьно правильный» ответ, а сильнейшее решение при заданных условиях.","One question per day. The goal is not a school-style correct answer, but the strongest decision under the stated assumptions.")}</div><div id="duelChoices" class="section">${d.opts.map((o,i)=>`<button class="choice" ${done?"disabled":""} onclick="answerDuel(${i},this)">${o}</button>`).join("")}</div><div id="duelFeedback" class="feedback ${done?"show":""}">${done?L("Сегодняшнее решение уже зафиксировано.","Today’s decision is already recorded."):""}</div><div id="duelCommunity" class="duel-community"></div><div class="btnrow"><button class="btn ghost" onclick="shareTyqon('duel')">${L("Поделиться BIZONIQ","Share BIZONIQ")}</button></div>`);
  if(done)loadDuelCommunity();
}
async function answerDuel(i,el){
  const d=DUELS[dailyDuelIndex()];
  if(state.duel.date===todayKey()&&state.duel.answered)return;
  const strongest=i===d.correct;
  document.querySelectorAll("#duelChoices .choice").forEach(b=>b.disabled=true);
  el.classList.add(strongest?"good":"bad");
  const xp=strongest?75:20;
  const f=document.getElementById("duelFeedback");
  f.innerHTML=`<div class="decision-verdict ${strongest?"good-text":"warn-text"}">${strongest?L("Сильнейший вариант","Strongest option"):L("Более слабый вариант","Weaker option")}</div><div class="copy">${escapeHtml(d.why)}</div><div class="tiny" style="margin-top:8px">+${xp} XP</div>`;
  f.classList.add("show");
  state.duel={date:todayKey(),answered:true,choice:i};
  state.xp+=xp;
  if(state.challenge.started&&!state.challenge.completedDays.includes(todayKey()))state.challenge.completedDays.push(todayKey());
  localSave();
  if(session){
    const {data,error}=await sb.functions.invoke("duel-stats",{body:{duel_index:dailyDuelIndex(),duel_date:todayKey(),choice:i,is_best:strongest}});
    if(!error&&data?.ok)renderDuelCommunity(data,i);
  }else{
    const community=document.getElementById("duelCommunity");
    if(community)community.innerHTML=`<div class="copy">${L("Войди в аккаунт, чтобы сравнить решение с другими пользователями.","Sign in to compare your decision with other users.")}</div>`;
  }
}
const DIAG=LANG==="en"?[
  {kind:"profile",q:"What is your current experience?",opts:["Just starting","I have launched projects","I already run a business","Learning for general understanding"]},
  {kind:"profile",q:"Main goal for the next 90 days?",opts:["Launch something","Find growth","Build a stronger system","Improve business judgment"]},
  {kind:"skill",skill:"finance",q:"A company is profitable on the P&L, but customers pay in 60 days while payroll is due every 30. What is the main risk?",opts:["Low brand awareness","A cash-flow gap","Too little social media content"],correct:1},
  {kind:"skill",skill:"marketing",q:"A channel brings 100 customers for $5,000. What should you calculate first before scaling?",opts:["CAC and contribution margin","Follower growth","Number of ad creatives"],correct:0},
  {kind:"skill",skill:"strategy",q:"A team has nine 'top priorities' at the same time. What is the strongest diagnosis?",opts:["The team needs more meetings","There is no real prioritization","The company should hire faster"],correct:1},
  {kind:"skill",skill:"economics",q:"A project promises a 20% return, but blocks the team from a safer project returning 35%. What concept matters most?",opts:["Brand equity","Churn","Opportunity cost"],correct:2}
]:[
  {kind:"profile",q:"Твой опыт сейчас?",opts:["Только начинаю","Уже запускал проекты","Уже управляю бизнесом","Изучаю для общего развития"]},
  {kind:"profile",q:"Главная цель на 90 дней?",opts:["Что-то запустить","Найти рост","Навести систему","Стать сильнее в бизнес-мышлении"]},
  {kind:"skill",skill:"finance",q:"Компания прибыльна по P&L, но клиенты платят через 60 дней, а зарплаты — каждые 30. Главный риск?",opts:["Слабая узнаваемость бренда","Кассовый разрыв","Слишком мало контента в соцсетях"],correct:1},
  {kind:"skill",skill:"marketing",q:"Канал привёл 100 клиентов за 500 000 ₽. Что нужно посчитать первым перед масштабированием?",opts:["CAC и contribution margin","Рост подписчиков","Количество рекламных креативов"],correct:0},
  {kind:"skill",skill:"strategy",q:"У команды одновременно девять «главных приоритетов». Какой диагноз сильнее?",opts:["Нужно больше совещаний","Настоящей приоритизации нет","Нужно быстрее нанимать людей"],correct:1},
  {kind:"skill",skill:"economics",q:"Проект обещает 20% доходности, но занимает команду вместо более надёжного проекта с 35%. Какое понятие важнее?",opts:["Brand equity","Churn","Opportunity cost"],correct:2}
];
function startDiagnostic(){
  state.diagnostic.answers=[];state.diagnostic.skillSeed={};renderDiagStep(0);
}
function renderDiagStep(step){
  const q=DIAG[step];
  if(!q){finishDiagnostic();return;}
  const isTask=q.kind==="skill";
  modal(`<div class="label">BIZONIQ DIAGNOSTIC • ${step+1}/${DIAG.length}</div><h2>${q.q}</h2><div class="copy">${isTask?L("Это уже не анкета — выбери решение, которое считаешь сильнее.","This is a real decision task — choose the strongest answer."):L("Сначала два коротких вопроса о твоём опыте и цели.","First, two short questions about your experience and goal.")}</div><div class="section">${q.opts.map((o,i)=>`<button class="choice" onclick="pickDiag(${step},${i})">${o}</button>`).join("")}</div>`);
}
function pickDiag(step,i){state.diagnostic.answers[step]=i;renderDiagStep(step+1)}
function finishDiagnostic(){
  const a=state.diagnostic.answers;
  const skillSeed={basics:45,startup:45,finance:45,marketing:45,sales:45,strategy:45,management:45,economics:45};
  let correct=0,total=0;
  DIAG.forEach((q,i)=>{
    if(q.kind!=="skill")return;
    total++;
    const ok=a[i]===q.correct;if(ok)correct++;
    skillSeed[q.skill]=ok?78:32;
    if(q.skill==="marketing")skillSeed.sales=ok?68:38;
    if(q.skill==="strategy")skillSeed.management=ok?66:40;
  });
  const experience=Number(a[0]??0),goal=Number(a[1]??0);
  let rec="first";
  if(experience===3&&goal===3)rec="curious";
  else if(goal===1||goal===2||experience>=1)rec="run";
  if((correct>=3&&goal===3)||(correct===total&&experience>=1))rec="mind";
  if(goal===0&&experience===0&&correct<=2)rec="first";
  skillSeed.basics=experience===0?38:experience===1?58:experience===2?72:50;
  skillSeed.startup=goal===0?70:experience>=1?60:45;
  state.diagnostic={completed:true,answers:a,recommended:rec,knowledgeScore:correct,knowledgeTotal:total,skillSeed};
  localSave();
  const p=C.paths.find(x=>x.id===rec);
  modal(`<div class="label">${L("РЕЗУЛЬТАТ ДИАГНОСТИКИ","DIAGNOSTIC RESULT")}</div><h2>${p.title}</h2><div class="copy">${p.subtitle}</div><div class="diagnostic-result"><b>${correct}/${total}</b><span>${L("практических задач решено сильным вариантом","decision tasks answered with the strongest option")}</span></div><div class="btnrow"><button class="btn primary" onclick="choosePath('${rec}',false)">${L("Начать по этому пути","Start this path")}</button><button class="btn ghost" onclick="changePath()">${L("Выбрать вручную","Choose manually")}</button></div>`);
}
function startChallenge(){
  if(state.cases.length<3){
    modal(`<div class="label">30-DAY FOUNDER CHALLENGE</div><h2>${L("Сначала получи первый реальный результат.","Get your first real result first.")}</h2><div class="copy">${L("Реши минимум 3 бизнес-кейса. После этого откроется 30-дневный челлендж — так он не превращается в пустую геймификацию.","Solve at least 3 business cases. Then the 30-day challenge unlocks, so it starts after you have experienced the core product.")}</div><div class="btnrow"><button class="btn primary" onclick="closeModal();go('cases')">${L("Решить кейсы","Solve cases")}</button></div>`,true);
    return;
  }
  if(!state.challenge.started){state.challenge={started:true,startDate:todayKey(),completedDays:[]};}
  if(state.duel.date===todayKey()&&state.duel.answered&&!state.challenge.completedDays.includes(todayKey()))state.challenge.completedDays.push(todayKey());
  localSave();
  modal(`<div class="label">30-DAY FOUNDER CHALLENGE</div><h2>${L("30 дней решений, а не мотивации.","30 days of decisions, not motivation.")}</h2><div class="copy">${L("Каждый день решай Business Duel. День засчитывается автоматически после ответа.","Complete one Business Duel every day. The day is counted automatically after your answer.")}</div><div class="progress" style="margin-top:18px"><span style="width:${Math.min(100,state.challenge.completedDays.length/30*100)}%"></span></div><div class="meta"><span>${state.challenge.completedDays.length}/30 ${L("дней","days")}</span><span>${L("Старт","Start")}: ${state.challenge.startDate||"—"}</span></div><div class="btnrow"><button class="btn primary" onclick="closeModal();dailyDuel()">${L("Сегодняшняя дуэль","Today’s duel")}</button><button class="btn ghost" onclick="shareTyqon('challenge')">${L("Поделиться","Share")}</button></div>`);
}
function learningArchetype(){
  const counts={};
  C.modules.forEach(m=>counts[m.id]=m.lessons.filter(l=>state.lessons.includes(l[0])).length);
  const groups=[
    ["Strategist",(counts.strategy||0)+(counts.economics||0),L("Сильнее всего развиваешь стратегию и решения.","Your strongest focus is strategy and decision-making.")],
    ["Operator",(counts.management||0)+(counts.finance||0),L("Фокус на системе, цифрах и управлении.","Your focus is systems, numbers and management.")],
    ["Growth Builder",(counts.marketing||0)+(counts.sales||0),L("Фокус на клиентах, продажах и росте.","Your focus is customers, sales and growth.")],
    ["Venture Mind",(counts.startup||0)+(counts.basics||0),L("Фокус на запуске, гипотезах и бизнес-модели.","Your focus is launching, hypotheses and business models.")]
  ].sort((x,y)=>y[1]-x[1]);
  return groups[0][1]>0?groups[0]:["Explorer",0,L("Ты только начинаешь собирать свой учебный профиль.","You are just starting to build your learning profile.")];
}
async function shareTyqon(type="app"){
  const arch=learningArchetype()[0];
  const text=type==="challenge"
    ?L(`Я прохожу 30-Day Founder Challenge в BIZONIQ: ${state.challenge.completedDays.length}/30 дней.`,`I’m taking the 30-Day Founder Challenge in BIZONIQ: ${state.challenge.completedDays.length}/30 days.`)
    :type==="duel"
      ?L(`Я прошёл сегодняшнюю Business Duel в BIZONIQ. Мой учебный профиль: ${arch}.`,`I completed today’s Business Duel in BIZONIQ. My learning profile: ${arch}.`)
      :L(`BIZONIQ — бизнес-тренажёр с кейсами и симуляциями. Мой учебный профиль: ${arch}.`,`BIZONIQ is a business-thinking trainer with cases and simulations. My learning profile: ${arch}.`);
  const data={title:"BIZONIQ",text,url:location.origin+location.pathname};
  try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(text+" "+data.url);alert(L("Ссылка скопирована.","Link copied."));}}catch(e){}
}
function weeklyProgress(){
  resetWeeklyIfNeeded();return Math.max(0,state.xp-state.weekly.xpStart);
}
function setWeeklyTarget(){
  const val=Number(prompt(L("Цель XP на неделю","Weekly XP target"),state.weekly.target||400));if(val>=100&&val<=5000){state.weekly.target=val;localSave();}
}
function renderGrowthHub(){
  const arch=learningArchetype(),wp=weeklyProgress(),target=state.weekly.target||400,pct=Math.min(100,wp/target*100),challenge=state.challenge.completedDays.length;
  document.getElementById("growthHub").innerHTML=`
    <div class="card growth-card duel-card"><div class="growth-icon">⚔️</div><div class="label">DAILY DUEL</div><h3>${L("60 секунд на бизнес-решение","60 seconds for a business decision")}</h3><div class="copy">${L("Один новый управленческий выбор каждый день.","One new management decision every day.")}</div><div class="btnrow"><button class="btn primary" onclick="dailyDuel()">${state.duel.date===todayKey()&&state.duel.answered?L("Посмотреть","View"):L("Принять вызов","Take the challenge")}</button></div></div>
    <div class="card growth-card"><div class="growth-icon">🧭</div><div class="label">PATH DIAGNOSTIC</div><h3>${state.diagnostic.completed?L("Путь уже рассчитан","Your path is ready"):L("Найди свою траекторию","Find your path")}</h3><div class="copy">${L("6 вопросов → рекомендация учебного пути. Можно изменить вручную.","6 questions → a recommended learning path. You can change it manually.")}</div><div class="btnrow"><button class="btn ghost" onclick="startDiagnostic()">${state.diagnostic.completed?L("Пройти заново","Retake"):L("Начать","Start")}</button></div></div>
    <div class="card growth-card ${state.cases.length<3?"challenge-locked":""}"><div class="growth-icon">🔥</div><div class="label">30-DAY CHALLENGE</div><h3>${state.cases.length<3?L("Откроется после 3 кейсов","Unlocks after 3 cases"):challenge+"/30 "+L("дней","days")}</h3><div class="progress"><span style="width:${state.cases.length<3?Math.min(100,state.cases.length/3*100):Math.min(100,challenge/30*100)}%"></span></div><div class="btnrow"><button class="btn ghost" onclick="startChallenge()">${state.cases.length<3?L("Сначала практика","Practice first"):state.challenge.started?L("Продолжить","Continue"):L("Войти в челлендж","Join challenge")}</button></div></div>
    <div class="card growth-card"><div class="growth-icon">◈</div><div class="label">WEEKLY TARGET</div><h3>${wp}/${target} XP</h3><div class="progress"><span style="width:${pct}%"></span></div><div class="meta"><span>${Math.round(pct)}%</span><button class="linkbtn" onclick="setWeeklyTarget()">${L("изменить","change")}</button></div></div>
  `;
}
let deferredInstallPrompt=null;
function setupInstall(){
  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstallPrompt=e;renderInstallButton()});
  renderInstallButton();
}
function renderInstallButton(){
  const el=document.getElementById("installCta");if(!el)return;
  const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
  el.innerHTML=`<div class="label">MOBILE APP</div><h3>${L("BIZONIQ на главном экране","BIZONIQ on your Home Screen")}</h3><div class="copy">${isiOS?L("Safari → Поделиться → На экран «Домой»","Safari → Share → Add to Home Screen"):L("Установи PWA и запускай BIZONIQ как отдельное приложение.","Install the PWA and launch BIZONIQ like a standalone app.")}</div><div class="btnrow"><button class="btn ghost" onclick="installTyqon()">${L("Установить","Install")}</button></div>`;
}
async function installTyqon(){
  if(deferredInstallPrompt){deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;return;}
  modal(`<div class="label">${L("УСТАНОВКА BIZONIQ","INSTALL BIZONIQ")}</div><h2>${L("Добавь приложение на экран","Add the app to your screen")}</h2><div class="copy">${L("На iPhone открой сайт в Safari → «Поделиться» → «На экран Домой». На поддерживаемых браузерах используй пункт «Установить приложение».","On iPhone, open the site in Safari → Share → Add to Home Screen. In supported browsers, use Install app.")}</div>`);
}
function renderDashboard(){
  const p=pathObj(),recommended=p.recommended.slice(0,3).map(id=>C.modules.find(m=>m.id===id)).filter(Boolean);
  document.getElementById("pathSummary").innerHTML=`<div class="label">${L("ТВОЯ ТРАЕКТОРИЯ","YOUR PATH")}</div><h3>${p.title}</h3><div class="copy">${p.subtitle}</div><div class="btnrow"><button class="btn ghost" onclick="changePath()">${L("Сменить путь","Change path")}</button></div>`;
  document.getElementById("recommended").innerHTML=recommended.map(m=>`<div class="card item"><div style="font-size:25px">${m.icon}</div><h3>${m.title}</h3><div class="copy">${m.description}</div><div class="btnrow"><button class="btn ghost" onclick="activeModule='${m.id}';go('learn');renderLessons()">${L("Открыть","Open")}</button></div></div>`).join("");
  const tasks=[
    [L("Кейс дня","Case of the day"),state.cases.length+"/32 "+L("решено","solved"),()=>go("cases")],
    [L("Симуляция","Simulation"),L("Прими серию взаимосвязанных решений","Make a chain of connected decisions"),()=>go("simulator")],
    ["AI Coach",L("Разбери один аргумент, гипотезу или цифры","Analyze one argument, hypothesis or set of numbers"),()=>go("coach")],
    [L("Микро-урок","Micro lesson"),L("Теория только под конкретный слабый навык","Theory only for a specific weak skill"),()=>go("learn")]
  ];
  const scores=skillScores();
  document.getElementById("skillMap").innerHTML=C.modules.map(m=>{
    const x=scores[m.id];
    return `<div class="card skill-card"><div class="skill-top"><span>${m.icon} ${m.title}</span><b>${x.score}</b></div><div class="progress"><span style="width:${x.score}%"></span></div><div class="tiny" style="margin-top:8px">Skill Score · ${x.lessons}/${x.total} ${L("уроков","lessons")} · ${x.attempts} ${L("кейсов","cases")}</div></div>`;
  }).join("");
  renderTodayPlan();
  renderWeakAreas();
  renderGrowthHub();
  document.getElementById("daily").innerHTML=tasks.map((t,i)=>`<div class="card item"><div class="tiny">DAILY ${i+1}</div><h3>${t[0]}</h3><div class="copy">${t[1]}</div><div class="btnrow"><button class="btn ghost" onclick="${["go('cases')","go('simulator')","go('coach')","go('learn')"][i]}">${L("Выполнить","Do it")}</button></div></div>`).join("");
}

function moduleOrder(){
  const p=pathObj();
  return [...C.modules].sort((a,b)=>p.recommended.indexOf(b.id)-p.recommended.indexOf(a.id));
}
function renderLessons(){
  const modules=moduleOrder();
  document.getElementById("moduleBar").innerHTML=`<button class="modulechip ${activeModule==="all"?"active":""}" onclick="activeModule='all';renderLessons()">${L("Все 56","All 56")}</button>`+modules.map(m=>`<button class="modulechip ${activeModule===m.id?"active":""}" onclick="activeModule='${m.id}';renderLessons()">${m.icon} ${m.title}</button>`).join("");
  const lessons=modules.flatMap(m=>m.lessons.map(l=>({m,l}))).filter(x=>activeModule==="all"||x.m.id===activeModule);
  document.getElementById("lessons").innerHTML=lessons.map(({m,l})=>{
    const done=state.lessons.includes(l[0]);
    const locked=lessonIsPremium(m,l)&&!proAccess();
    return `<div class="card item ${locked?"pro-locked":""}"><div class="label">${m.icon} ${m.title}</div>${locked?'<span class="pro-badge">PRO</span>':""}<h3>${l[1]}</h3><div class="copy">${l[2]}</div><div class="meta"><span>3–5 ${L("мин","min")}</span><span>${locked?"Pro":done?L("✓ завершено","✓ completed"):"+"+lessonXp(l)+" XP"}</span></div><div class="btnrow"><button class="btn ${locked?"secondary":done?"secondary":"ghost"}" onclick="openLesson('${l[0]}')">${locked?L("Открыть с Pro","Unlock with Pro"):done?L("Повторить","Review"):L("Открыть урок","Open lesson")}</button></div></div>`;
  }).join("");
  localizeUI(document.getElementById("learn"));
}
function findLesson(id){for(const m of C.modules){const l=m.lessons.find(x=>x[0]===id);if(l)return{m,l}}}
function relatedTermsForLesson(m,l){
  const hay=[l[1],l[2],l[3],l[4],l[5]].join(" ").toLowerCase();
  let terms=C.terms.filter(t=>t[1]===m.id||hay.includes(String(t[0]).toLowerCase())).slice(0,3);
  if(!terms.length)terms=C.terms.filter(t=>t[1]===m.id).slice(0,3);
  if(!terms.length)return "";
  return `<div class="lesson-related"><div class="tiny">${L("СВЯЗАННЫЕ ТЕРМИНЫ","RELATED TERMS")}</div><div class="term-chips">${terms.map(t=>`<button class="modulechip" onclick="openTerm(decodeURIComponent('${encodeURIComponent(t[0])}'))">${escapeHtml(t[0])}</button>`).join("")}</div></div>`;
}
function practiceSkill(skill){
  closeModal();
  const next=nextAdaptiveCase(skill);
  go("cases");
  if(next)setTimeout(()=>openCase(next.id),120);
}
function openLesson(id){
  const {m,l}=findLesson(id),done=state.lessons.includes(id);
  trackEvent("lesson_opened",{lesson_id:id,module:m.id});
  if(lessonIsPremium(m,l)&&!proAccess()){paywall("Этот урок","This lesson");return}
  modal(`<div class="label">${m.icon} ${m.title}</div><h2>${l[1]}</h2><div class="copy">${l[2]}</div><div class="card soft section"><div class="tiny">${L("КЛЮЧЕВАЯ МЫСЛЬ","KEY IDEA")}</div><div class="copy" style="margin-top:7px">${l[3]}</div></div><div class="card soft section"><div class="tiny">${L("ПРИМЕР","EXAMPLE")}</div><div class="copy" style="margin-top:7px">${l[4]}</div></div><div class="card soft section"><div class="tiny">${L("ПРАКТИЧЕСКИЙ ВЫВОД","PRACTICAL TAKEAWAY")}</div><div class="copy" style="margin-top:7px">${l[5]}</div></div>${relatedTermsForLesson(m,l)}<div class="btnrow"><button class="btn primary" onclick="completeLesson('${id}')">${done?L("Уже завершено","Completed"):L("Завершить","Complete")+" • +"+lessonXp(l)+" XP"}</button><button class="btn ghost" onclick="practiceSkill('${m.id}')">${L("Применить в кейсе","Apply in a case")} →</button></div>`);
}
function completeLesson(id){
  const {m,l}=findLesson(id),xp=lessonXp(l);
  if(!state.lessons.includes(id)){state.lessons.push(id);state.xp+=xp;trackEvent("lesson_completed",{lesson_id:id,module:m.id,xp});localSave()}
  closeModal();
}

function renderTerms(){
  const q=(document.getElementById("termSearch").value||"").toLowerCase(),f=document.getElementById("termFilter").value;
  const list=C.terms.filter(t=>{
    const byFilter=f==="all"||(f==="saved"&&state.saved.includes(t[0]))||t[1]===f;
    return byFilter&&t.join(" ").toLowerCase().includes(q);
  });
  document.getElementById("terms").innerHTML=list.map(t=>{
    const learned=state.terms.includes(t[0]),saved=state.saved.includes(t[0]);
    return `<div class="card item"><div class="termhead"><div><div class="termname">${t[0]}</div><div class="tiny">${t[2]}</div></div><button class="star ${saved?"on":""}" onclick="toggleSave('${t[0]}')">${saved?"★":"☆"}</button></div><div class="copy" style="margin-top:10px">${t[3]}</div><div class="meta"><span>${L("Связано:","Related:")} ${t[6]}</span><span>${learned?L("✓ изучено","✓ learned"):"+"+termXp()+" XP"}</span></div><div class="btnrow"><button class="btn ghost" onclick="openTerm('${t[0]}')">${L("Открыть","Open")}</button><button class="btn ${learned?"secondary":"primary"}" onclick="learnTerm('${t[0]}')">${learned?L("Понял","Got it"):L("Понял","Got it")+" • +"+termXp()+" XP"}</button></div></div>`;
  }).join("");
  localizeUI(document.getElementById("dictionary"));
}
function openTerm(name){
  const t=C.terms.find(x=>x[0]===name);
  modal(`<div class="label">${t[2]}</div><h2>${t[0]}</h2><div class="card soft section"><div class="tiny">${L("ПО-ПРОСТОМУ","IN SIMPLE TERMS")}</div><div class="copy" style="margin-top:7px">${t[3]}</div></div><div class="card soft section"><div class="tiny">${L("ЗАЧЕМ ПРЕДПРИНИМАТЕЛЮ","WHY IT MATTERS")}</div><div class="copy" style="margin-top:7px">${t[4]}</div></div><div class="card soft section"><div class="tiny">${L("ПРИМЕР","EXAMPLE")}</div><div class="copy" style="margin-top:7px">${t[5]}</div></div><div class="btnrow"><button class="btn primary" onclick="learnTerm('${t[0]}');closeModal()">${L("Понял","Got it")} • +${termXp()} XP</button></div>`);
}
function learnTerm(name){if(!state.terms.includes(name)){state.terms.push(name);state.xp+=termXp();localSave()}}
function toggleSave(name){state.saved=state.saved.includes(name)?state.saved.filter(x=>x!==name):[...state.saved,name];localSave()}

function renderCases(){
  const search=document.getElementById("caseSearch");
  const q=(search?.value||"").toLowerCase();
  const info=document.getElementById("caseAdaptiveInfo");
  if(info)info.innerHTML=`
    <div><div class="tiny">${L("ТВОЙ УРОВЕНЬ КЕЙСОВ","YOUR CASE LEVEL")}</div><b>${difficultyName()}</b><span class="adaptive-path"> · ${pathObj().title}</span></div>
    <div class="adaptive-actions">
      <button class="modulechip ${caseMode==="adaptive"?"active":""}" onclick="caseMode='adaptive';renderCases()">${L("Для меня","For me")}</button>
      <button class="modulechip ${caseMode==="all"?"active":""}" onclick="caseMode='all';renderCases()">${L("Все 32","All 32")}</button>
    </div>`;
  let list=q?C.cases.filter(c=>(c.title+" "+c.copy+" "+c.tag).toLowerCase().includes(q)):(caseMode==="adaptive"?adaptiveCasePool():[...C.cases]);
  document.getElementById("caseGrid").innerHTML=list.map(c=>{
    const done=state.cases.includes(c.id);
    const locked=caseIsPremium(c)&&!proAccess();
    const recommended=c.paths.includes(state.goal)&&c.difficulty===state.adaptive.level;
    return `<div class="card item case-card ${locked?"pro-locked":""}"><div class="case-badges"><span class="label">${c.tag}</span><span class="difficulty d${c.difficulty}">${difficultyName(c.difficulty)}</span>${recommended?`<span class="recommended-badge">${L("Для тебя","For you")}</span>`:""}</div>${locked?'<span class="pro-badge">PRO</span>':""}<h3>${c.title}</h3><div class="copy">${c.copy}</div><div class="meta"><span>${SKILL_LABELS[c.category]||c.category}</span><span>${locked?"Pro":done?L("✓ решено","✓ solved"):"+"+c.xp+" XP"}</span></div><div class="btnrow"><button class="btn ${locked?"secondary":done?"secondary":"ghost"}" onclick="openCase('${c.id}')">${locked?L("Открыть с Pro","Unlock with Pro"):done?L("Разобрать снова","Review again"):L("Открыть кейс","Open case")}</button></div></div>`;
  }).join("");
  localizeUI(document.getElementById("cases"));
}
function openCase(id){
  const c=C.cases.find(x=>x.id===id);
  trackEvent("case_opened",{case_id:id,category:c.category,difficulty:c.difficulty});
  if(caseIsPremium(c)&&!proAccess()){paywall("Этот кейс","This case");return}
  modal(`<div class="case-badges"><span class="label">CASE • ${c.tag}</span><span class="difficulty d${c.difficulty}">${difficultyName(c.difficulty)}</span></div><h2>${c.title}</h2><div class="copy">${c.copy}</div><div id="caseChoices" class="section">${c.choices.map((ch,i)=>`<button class="choice" onclick="answerCase('${id}',${i},this)">${ch.text}</button>`).join("")}</div><div id="caseFeedback" class="feedback"></div><div id="caseRating"></div>`);
}
const CASE_REVIEW={
  basics:{metric:{ru:"поведенческий сигнал / конверсия в действие",en:"behavioral signal / action conversion"},trade:{ru:"скорость проверки против качества доказательства спроса",en:"speed of validation vs quality of demand evidence"}},
  startup:{metric:{ru:"скорость эксперимента / willingness to pay",en:"experiment velocity / willingness to pay"},trade:{ru:"скорость запуска против риска строить без спроса",en:"launch speed vs building without demand"}},
  finance:{metric:{ru:"cash flow / contribution margin / payback",en:"cash flow / contribution margin / payback"},trade:{ru:"рост против ликвидности и маржи",en:"growth vs liquidity and margin"}},
  marketing:{metric:{ru:"CAC / conversion / retention",en:"CAC / conversion / retention"},trade:{ru:"объём трафика против качества и окупаемости",en:"traffic volume vs quality and payback"}},
  sales:{metric:{ru:"win rate / sales cycle / contribution margin",en:"win rate / sales cycle / contribution margin"},trade:{ru:"скорость закрытия против скидок и качества сделки",en:"closing speed vs discounts and deal quality"}},
  strategy:{metric:{ru:"фокус / opportunity cost / стратегический риск",en:"focus / opportunity cost / strategic risk"},trade:{ru:"опциональность против концентрации ресурсов",en:"optionality vs resource concentration"}},
  management:{metric:{ru:"cycle time / загрузка / ответственность",en:"cycle time / utilization / ownership"},trade:{ru:"скорость исполнения против качества системы",en:"execution speed vs system quality"}},
  economics:{metric:{ru:"предельная отдача / opportunity cost",en:"marginal return / opportunity cost"},trade:{ru:"текущая выгода против лучшей альтернативы",en:"current payoff vs the best alternative"}}
};
function caseReview(c,ch,strongest){
  const cfg=CASE_REVIEW[c.category]||CASE_REVIEW.basics;
  const metric=LANG==="en"?cfg.metric.en:cfg.metric.ru;
  const trade=LANG==="en"?cfg.trade.en:cfg.trade.ru;
  return `<div class="case-review">
    <div class="decision-verdict ${strongest?"good-text":"warn-text"}">${strongest?L("Сильнейший вариант при данных условиях","Strongest option under these assumptions"):L("Не самый сильный вариант","Not the strongest option")}</div>
    <div class="copy"><b>${L("Почему:","Why:")}</b> ${escapeHtml(ch.feedback)}</div>
    <div class="review-grid">
      <div><span>${L("Trade-off","Trade-off")}</span><b>${escapeHtml(trade)}</b></div>
      <div><span>${L("Следить за метрикой","Metric to watch")}</span><b>${escapeHtml(metric)}</b></div>
    </div>
    <div class="tiny">${L("В реальном бизнесе контекст может изменить сильнейшее решение. Здесь оценивается логика при условиях кейса.","In a real business, context can change the strongest decision. This case evaluates reasoning under the stated assumptions.")}</div>
  </div>`;
}
function answerCase(id,i,el){
  const c=C.cases.find(x=>x.id===id),ch=c.choices[i];
  document.querySelectorAll("#caseChoices .choice").forEach(b=>b.disabled=true);el.classList.add(ch.correct?"good":"bad");
  const firstAttempt=!state.adaptive.caseResults[id];
  if(firstAttempt){
    recordCaseAttempt(c,ch.correct);
    trackEvent("case_answered",{case_id:id,category:c.category,difficulty:c.difficulty,correct:!!ch.correct,first_attempt:true});
  }
  const f=document.getElementById("caseFeedback");
  const earned=ch.correct&&!state.cases.includes(id)?c.xp:0;
  f.innerHTML=caseReview(c,ch,!!ch.correct)+(earned?`<div class="tiny case-xp">+${earned} XP</div>`:"");f.classList.add("show");
  if(ch.correct&&!state.cases.includes(id)){state.cases.push(id);state.xp+=c.xp}
  const rating=document.getElementById("caseRating");
  if(rating&&!state.adaptive.caseRatings[id])rating.innerHTML=`<div class="difficulty-rating"><div class="tiny">${L("КАК БЫЛО ПО СЛОЖНОСТИ?","HOW DID THE DIFFICULTY FEEL?")}</div><div class="btnrow"><button class="btn ghost" onclick="rateCaseDifficulty('${id}','easy')">${L("Слишком легко","Too easy")}</button><button class="btn ghost" onclick="rateCaseDifficulty('${id}','normal')">${L("Нормально","About right")}</button><button class="btn ghost" onclick="rateCaseDifficulty('${id}','hard')">${L("Сложно","Hard")}</button></div></div>`;
  localSave();
}

function selectSimulator(id){
  if(id!=="coffee"&&!proAccess()){paywall("Этот бизнес-симулятор","This business simulator");return}
  trackEvent("simulator_opened",{simulator_id:id});
  activeSimulator=id;resetSimulator(false);renderSimulator()
}
function resetSimulator(render=true){
  const s=C.simulators[activeSimulator];sim={...s.start,step:0,strong:0,decisions:[]};if(render)renderSimulator();
}
function simulatorOutcome(sim,s){
  const ratio=s.steps.length?sim.strong/s.steps.length:0;
  if(sim.cash<0)return {label:L("Кассовый кризис","Cash crisis"),copy:L("Рост или выручка не спасли бизнес от отрицательного cash. Нужно перестраивать темп и оборотный капитал.","Growth or revenue did not protect the business from negative cash. Pace and working capital need restructuring.")};
  if(ratio>=.7&&sim.profit>0)return {label:L("Сильная система решений","Strong decision system"),copy:L("Большинство решений сохраняли экономику и не жертвовали системой ради одной красивой метрики.","Most decisions protected the economics instead of sacrificing the system for one attractive metric.")};
  if(ratio>=.5)return {label:L("Рабочая, но хрупкая модель","Viable but fragile"),copy:L("Бизнес остаётся жизнеспособным, но несколько решений создали риски, которые могут проявиться позже.","The business remains viable, but several decisions created risks that may surface later.")};
  return {label:L("Нужна реструктуризация решений","Decision system needs restructuring"),copy:L("Слишком много локально привлекательных решений ухудшили общую систему. Посмотри на trade-offs ещё раз.","Too many locally attractive choices weakened the overall system. Review the trade-offs.")};
}
function renderSimulator(){
  const sims=Object.values(C.simulators);
  document.getElementById("simSelect").innerHTML=sims.map(s=>{const locked=s.id!=="coffee"&&!proAccess();return `<div class="card simtile ${s.id===activeSimulator?"active":""} ${locked?"pro-locked":""}" onclick="selectSimulator('${s.id}')"><div style="font-size:25px">${s.icon}</div>${locked?'<span class="pro-badge">PRO</span>':""}<h3>${s.title}</h3><div class="copy">${s.description}</div><div class="meta"><span>${s.steps.length} ${L("решений","decisions")}</span><span>${locked?"Pro":state.simDone[s.id]?L("✓ завершено","✓ completed"):""}</span></div></div>`}).join("");
  if(!sim)resetSimulator(false);
  const s=C.simulators[activeSimulator];
  document.getElementById("simTitleMain").textContent=s.icon+" "+s.title;
  document.getElementById("simStats").innerHTML=[["Cash",rub(sim.cash)],[L("Revenue / мес","Revenue / mo"),rub(sim.revenue)],[L("Profit / мес","Profit / mo"),rub(sim.profit)],["Customers",Math.round(sim.customers).toLocaleString(LANG==="en"?"en-US":"ru-RU")]].map(x=>`<div class="simstat"><div class="tiny">${x[0]}</div><b>${x[1]}</b></div>`).join("");
  const fb=document.getElementById("simFeedback");fb.classList.remove("show");
  if(sim.step>=s.steps.length){
    document.getElementById("simStep").textContent=L("ФИНАЛ","FINISH");
    const outcome=simulatorOutcome(sim,s);
    document.getElementById("simEvent").textContent=outcome.label;
    document.getElementById("simText").textContent=outcome.copy;
    document.getElementById("simChoices").innerHTML=`<div class="card soft section sim-result"><div class="sim-result-score"><b>${sim.strong}/${s.steps.length}</b><span>${L("сильных решений","strong decisions")}</span></div><div class="copy">${L("Итог","Result")}: ${rub(sim.cash)} cash • ${rub(sim.revenue)} revenue • ${rub(sim.profit)} profit</div></div>`;
    if(!state.simDone[s.id]){state.simDone[s.id]=true;state.xp+=120;trackEvent("simulator_completed",{simulator_id:s.id,strong:sim.strong,total:s.steps.length,cash:sim.cash,profit:sim.profit});localSave()}
    localizeUI(document.getElementById("simulator"));
    return;
  }
  const step=s.steps[sim.step];document.getElementById("simStep").textContent=L("Шаг ","Step ")+(sim.step+1)+" / "+s.steps.length;document.getElementById("simEvent").textContent=step[0];document.getElementById("simText").textContent=step[1];
  document.getElementById("simChoices").innerHTML=step[2].map((o,i)=>`<button class="choice" onclick="chooseSim(${i},this)">${o[0]}</button>`).join("");
  localizeUI(document.getElementById("simulator"));
}
function chooseSim(i,el){
  const s=C.simulators[activeSimulator],o=s.steps[sim.step][2][i],d=o[1],strong=!!o[3];
  sim.cash+=d.cash||0;sim.revenue+=d.revenue||0;sim.profit+=d.profit||0;sim.customers+=d.customers||0;
  if(strong)sim.strong=(sim.strong||0)+1;
  sim.decisions=[...(sim.decisions||[]),{step:sim.step,choice:i,strong}];
  document.querySelectorAll("#simChoices .choice").forEach(b=>b.disabled=true);el.classList.add(strong?"good":"bad");
  const xp=25;
  const f=document.getElementById("simFeedback");f.innerHTML=`<div class="decision-verdict ${strong?"good-text":"warn-text"}">${strong?L("Сильный выбор","Strong choice"):L("Рискованный trade-off","Risky trade-off")}</div><div class="copy">${escapeHtml(o[2])}</div><div class="tiny">+${xp} XP</div>`;f.classList.add("show");state.xp+=xp;localSave();
  setTimeout(()=>{sim.step++;renderSimulator()},1100);
}

let coachHistoryMode="";
let coachBusy=false;

function coachInitialPrompt(){
  const m=C.coach.find(x=>x.id===coachMode);
  return m?.prompt||L("Опиши ситуацию, которую хочешь разобрать.","Describe the business situation you want to analyze.");
}
function renderCoach(){
  document.getElementById("coachModes").innerHTML=C.coach.map((m,i)=>{
    const locked=i>0&&!proAccess();
    return `<div class="card coach-mode ${m.id===coachMode?"active":""} ${locked?"pro-locked":""}" onclick="setCoachMode('${m.id}')">${locked?'<span class="pro-badge">PRO</span>':""}<div class="coach-mode-kicker">${m.id==="hardcase"?"CASE":m.id.toUpperCase()}</div><h3>${m.title}</h3><div class="copy">${m.prompt}</div></div>`
  }).join("");
  const status=document.getElementById("coachAiStatus");
  if(status)status.textContent=session?L("● AI AGENT • контекст включён","● AI AGENT • context enabled"):L("● Войди для AI Coach","● Sign in for AI Coach");
  if(coachHistoryMode!==coachMode)loadCoachHistory();
  localizeUI();
}
function setCoachMode(id){
  const i=C.coach.findIndex(x=>x.id===id);
  if(i>0&&!proAccess()){paywall("Этот режим AI Coach","This AI Coach mode");return}
  coachMode=id;coachHistoryMode="";renderCoach();
}
async function loadCoachHistory(){
  const box=document.getElementById("messages");if(!box)return;
  coachHistoryMode=coachMode;
  if(!session){
    box.innerHTML=`<div class="msg bot"><b>BIZONIQ AI Coach</b><br>${L("Войди в аккаунт, чтобы Coach мог анализировать твои ответы и помнить контекст между устройствами.","Sign in so Coach can analyze your answers and remember context across devices.")}</div>`;
    return;
  }
  box.innerHTML=`<div class="msg bot loading-msg">${L("Загружаю контекст…","Loading context…")}</div>`;
  const {data,error}=await sb.from("ai_coach_messages").select("role,content,metadata,created_at").eq("user_id",session.user.id).eq("mode",coachMode).order("created_at",{ascending:true}).limit(30);
  if(error){box.innerHTML=`<div class="msg bot">${L("Не удалось загрузить историю. Можно начать новый разбор.","Could not load history. You can start a new analysis.")}</div>`;return}
  if(coachHistoryMode!==coachMode)return;
  if(!data?.length){
    box.innerHTML=`<div class="msg bot"><b>${C.coach.find(x=>x.id===coachMode)?.title||"AI Coach"}</b><br>${coachInitialPrompt()}</div>`;
  }else{
    box.innerHTML=data.map(row=>{
      const meta=row.metadata||{};
      const extra=row.role==="assistant"&&meta.next_action
        ?`<div class="coach-next"><b>${L("Следующий шаг","Next action")}:</b> ${escapeHtml(meta.next_action)}</div>`
        :"";
      const training=row.role==="assistant"?coachTrainingCta(meta.skill,meta.training_action):"";
      return `<div class="msg ${row.role==="user"?"user":"bot"}">${escapeHtml(row.content)}${extra}${training}</div>`;
    }).join("");
  }
  box.scrollTop=box.scrollHeight;
}
function coachOpenTraining(skill,action){
  closeModal?.();
  if(action==="case"){
    const next=nextAdaptiveCase(skill==="general"?null:skill);
    go("cases");
    if(next)setTimeout(()=>openCase(next.id),120);
    return;
  }
  if(action==="lesson"){
    const target=skill==="general"?(weakSkills()[0]?.id||"basics"):skill;
    const next=nextLessonForSkill(target);
    if(next){
      activeModule=next.m.id;go("learn");renderLessons();setTimeout(()=>openLesson(next.l[0]),120);
    }else go("learn");
  }
}
function coachTrainingCta(skill,action){
  if(!["case","lesson"].includes(action))return "";
  const label=action==="case"?L("Перейти к кейсу","Open recommended case"):L("Открыть микро-урок","Open micro-lesson");
  return `<button class="btn ghost coach-training-btn" onclick="coachOpenTraining('${escapeHtml(skill||"general")}','${action}')">${label} →</button>`;
}

async function clearCoachConversation(){
  if(!session){openAuth();return}
  if(coachBusy)return;
  const {error}=await sb.from("ai_coach_messages").delete().eq("user_id",session.user.id).eq("mode",coachMode);
  if(error){alert(L("Не удалось очистить историю.","Could not clear history."));return}
  coachHistoryMode="";
  await loadCoachHistory();
}
function resetCoach(){coachHistoryMode="";loadCoachHistory()}
function coachContext(){
  return {
    learning_path:state.goal,
    xp:state.xp,
    streak:state.streak,
    adaptive_level:state.adaptive?.level||1,
    weak_skills:weakSkills().slice(0,4).map(x=>({skill:x.id,label:x.label,score:x.score})),
    lessons_completed:state.lessons.length,
    cases_completed:state.cases.length,
    simulators_completed:Object.values(state.simDone||{}).filter(Boolean).length
  };
}
async function sendCoach(){
  const input=document.getElementById("coachInput"),text=(input?.value||"").trim();
  if(!text||coachBusy)return;
  if(!session){openAuth();return}
  const box=document.getElementById("messages"),send=document.getElementById("coachSendButton"),status=document.getElementById("coachAiStatus");
  coachBusy=true;
  if(input)input.disabled=true;if(send)send.disabled=true;
  box.insertAdjacentHTML("beforeend",`<div class="msg user">${escapeHtml(text)}</div><div id="coachThinking" class="msg bot thinking">${L("Анализирую решение и контекст…","Analyzing your decision and context…")}</div>`);
  if(input)input.value="";box.scrollTop=box.scrollHeight;
  if(status)status.textContent=L("● AI AGENT • анализ","● AI AGENT • analyzing");
  try{
    const {data,error}=await sb.functions.invoke("ai-coach",{body:{message:text,mode:coachMode,lang:LANG,context:coachContext()}});
    let payload=data;
    if(error?.context){
      try{payload=await error.context.clone().json()}catch{}
    }
    document.getElementById("coachThinking")?.remove();
    if(error||!payload?.ok){
      const code=payload?.error||"";
      const msg=code==="AI_NOT_CONFIGURED"
        ?L("AI Coach подготовлен, но в Supabase ещё не добавлен OPENAI_API_KEY.","AI Coach is ready, but OPENAI_API_KEY has not been added to Supabase yet.")
        :code==="AI_DAILY_LIMIT"
          ?L("Лимит AI Coach на сегодня достигнут.","You have reached today's AI Coach limit.")
          :L("AI Coach сейчас недоступен. Попробуй ещё раз.","AI Coach is unavailable right now. Try again.");
      box.insertAdjacentHTML("beforeend",`<div class="msg bot error-msg">${escapeHtml(msg)}</div>`);
      if(status)status.textContent=L("● AI AGENT • недоступен","● AI AGENT • unavailable");
      return;
    }
    const insight=payload.insight?`<div class="coach-insight"><b>${L("Insight","Insight")}:</b> ${escapeHtml(payload.insight)}</div>`:"";
    const next=payload.next_action?`<div class="coach-next"><b>${L("Следующий шаг","Next action")}:</b> ${escapeHtml(payload.next_action)}</div>`:"";
    const training=coachTrainingCta(payload.skill,payload.training_action);
    box.insertAdjacentHTML("beforeend",`<div class="msg bot">${escapeHtml(payload.reply)}${insight}${next}${training}</div>`);
    const usage=document.getElementById("coachUsage");
    if(usage&&payload.usage)usage.textContent=`${payload.usage.used}/${payload.usage.limit} ${L("AI сообщений сегодня","AI messages today")}`;
    if(status)status.textContent=L("● AI AGENT • контекст включён","● AI AGENT • context enabled");
    trackEvent("ai_coach_message",{mode:coachMode,skill:payload.skill,confidence:payload.confidence,training_action:payload.training_action});
    coachHistoryMode=coachMode;
  }catch(e){
    document.getElementById("coachThinking")?.remove();
    box.insertAdjacentHTML("beforeend",`<div class="msg bot error-msg">${L("Ошибка соединения с AI Coach.","AI Coach connection error.")}</div>`);
  }finally{
    coachBusy=false;if(input)input.disabled=false;if(send)send.disabled=false;if(input)input.focus();box.scrollTop=box.scrollHeight;
  }
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]))}


function certificateProgress(def){
  const requiredLessons=def.modules[0]==="*" ? C.modules.flatMap(m=>m.lessons.map(l=>l[0])) :
    C.modules.filter(m=>def.modules.includes(m.id)).flatMap(m=>m.lessons.map(l=>l[0]));
  const lessonDone=requiredLessons.filter(id=>state.lessons.includes(id)).length;
  const simDone=Object.values(state.simDone||{}).filter(Boolean).length;
  const parts=[
    {label:L("Уроки","Lessons"),value:lessonDone,need:requiredLessons.length},
    {label:L("Кейсы","Cases"),value:state.cases.length,need:def.minCases},
    {label:L("Симуляторы","Simulators"),value:simDone,need:def.minSims}
  ];
  return {eligible:parts.every(x=>x.value>=x.need),parts};
}
async function loadCertificates(){
  if(!session){userCertificates=[];renderCertificates();return}
  const {data,error}=await sb.from("certificates").select("*").order("issued_at",{ascending:false});
  if(!error) userCertificates=data||[];
  renderCertificates();
}
function renderCertificates(){
  const grid=document.getElementById("certificateGrid");if(!grid)return;
  grid.innerHTML=CERTIFICATE_TYPES.map(def=>{
    const cert=userCertificates.find(c=>c.certificate_type===def.id);
    const p=certificateProgress(def);
    const proRequired=!cert&&!proAccess();
    const detail=p.parts.map(x=>`<span>${x.label}: <b>${Math.min(x.value,x.need)}/${x.need}</b></span>`).join("");
    return `<div class="card certificate-card ${cert?"issued":p.eligible?"eligible":""}">
      <div class="cert-top"><div class="certificate-mini-seal">B/IQ</div><div><div class="label">${cert?"ISSUED":proRequired?"PRO":p.eligible?"READY":"IN PROGRESS"}</div><h3>${def.title}</h3></div></div>
      <div class="copy">${def.desc}</div>
      <div class="cert-progress">${detail}</div>
      ${cert?
        `<div class="certificate-code">${cert.certificate_code}</div><div class="btnrow"><button class="btn primary" onclick="openCertificate('${cert.certificate_code}')">${L("Открыть сертификат","Open certificate")}</button><button class="btn ghost" onclick="copyCertificateLink('${cert.certificate_code}')">${L("Скопировать ссылку","Copy link")}</button></div>`:
        `<div class="btnrow"><button class="btn ${proRequired?"secondary":p.eligible?"primary":"secondary"}" ${(!proRequired&&p.eligible)?"":"disabled"} onclick="claimCertificate('${def.id}')">${proRequired?L("Доступно в Pro","Available in Pro"):p.eligible?L("Получить сертификат","Claim certificate"):L("Сначала выполни критерии","Complete the requirements first")}</button>${proRequired?`<button class="btn ghost" onclick="go('pricing')">${L("Посмотреть Pro","View Pro")}</button>`:""}</div>`}
    </div>`;
  }).join("");
  localizeUI(grid);
}
async function claimCertificate(type){
  if(!proAccess()){paywall("Выдача сертификатов","Certificate issuing");return}
  if(!session){openAuth();return}
  await pushCloud(true);
  const {data,error}=await sb.functions.invoke("issue-certificate",{body:{type}});
  if(error){alert(L("Не удалось выдать сертификат. Проверь прогресс и попробуй ещё раз.","Could not issue the certificate. Check your progress and try again."));return}
  if(data?.certificate){await loadCertificates();openCertificate(data.certificate.certificate_code)}
}
function openCertificate(code){
  trackEvent("certificate_opened",{code_suffix:String(code).slice(-4)});
  window.open("./certificate.html?code="+encodeURIComponent(code)+"&lang="+encodeURIComponent(LANG),"_blank","noopener");
}
async function copyCertificateLink(code){
  const url=new URL("./certificate.html?code="+encodeURIComponent(code)+"&lang="+encodeURIComponent(LANG),location.href).href;
  try{await navigator.clipboard.writeText(url);alert(L("Ссылка на сертификат скопирована.","Certificate link copied."));}catch{prompt(L("Скопируй ссылку:","Copy this link:"),url)}
}

function renderProfile(){
  const l=level(),p=pathObj();
  document.getElementById("profileLevel").textContent=l.name;document.getElementById("profileProgress").style.width=l.pct+"%";
  document.getElementById("profileXp").textContent=state.xp;document.getElementById("profileStreak").textContent=state.streak;document.getElementById("profileLessons").textContent=state.lessons.length;document.getElementById("profileTerms").textContent=state.terms.length;
  document.getElementById("profileName").textContent=state.name||L("Гость","Guest");
  document.getElementById("profilePath").textContent=p.title;
  const arch=learningArchetype();
  const badge=document.getElementById("archetypeBadge");
  const adaptive=document.getElementById("adaptiveProfile");
  if(adaptive)adaptive.innerHTML=`<div class="label">${L("СЛОЖНОСТЬ КЕЙСОВ","CASE DIFFICULTY")}</div><div class="adaptive-profile-level">${difficultyName()}</div><div class="copy">${L("BIZONIQ меняет сложность по первым попыткам и твоим оценкам кейсов.","BIZONIQ adjusts case difficulty based on your first attempts and difficulty ratings.")}</div>`;
  if(badge)badge.innerHTML=`<div class="label">${L("ПРОФИЛЬ ОБУЧЕНИЯ","LEARNING PROFILE")}</div><div style="font-size:22px;font-weight:900;margin-top:8px">${arch[0]}</div><div class="copy" style="margin-top:5px">${arch[2]}</div><div class="btnrow"><button class="btn ghost" onclick="shareTyqon()">${L("Поделиться профилем","Share profile")}</button></div>`;
  const subscriptionPanel=document.getElementById("subscriptionPanel");
  if(subscriptionPanel){
    if(isPro()){
      const manual=manualProActive();
      const end=manual&&userEntitlement.ends_at?new Date(userEntitlement.ends_at).toLocaleDateString(LANG==="en"?"en-US":"ru-RU"):null;
      subscriptionPanel.innerHTML=`<div class="subscription-active"><div><div class="tiny good">● BIZONIQ PRO</div><b>${proLabel()}</b>${end?`<div class="tiny">${L("до","until")} ${end}</div>`:""}</div>${!manual&&userSubscription?`<button class="btn ghost" onclick="openBillingPortal()">${L("Управлять","Manage")}</button>`:""}</div>`;
    }else{
      subscriptionPanel.innerHTML=`<div class="subscription-free"><div><div class="tiny">${L("Тариф","Plan")}</div><b>Free</b></div><button class="btn primary" onclick="go('pricing')">Pro · ${proPrice("monthly")}${L("/мес","/mo")}</button></div>`;
    }
  }
  const creatorBox=document.getElementById("creatorPanelLink");
  if(creatorBox){
    creatorBox.classList.toggle("hidden",!creatorAccount);
    if(creatorAccount)creatorBox.innerHTML=`<div><div class="tiny good">● CREATOR ACCESS</div><b>Creator Console</b><div class="copy">${L("Пользователи, аналитика, Pro-коды и beta-feedback.","Users, analytics, Pro codes and beta feedback.")}</div></div><a class="btn primary" href="./admin.html">${L("Открыть панель","Open console")}</a>`;
  }
  document.getElementById("accountInfo").innerHTML=session?`<div class="tiny good">● ${L("Облачная синхронизация включена","Cloud sync is active")}</div><div style="margin-top:7px">${escapeHtml(session.user.email||"")}</div><div class="btnrow"><button class="btn secondary" onclick="pushCloud(true)">${L("Синхронизировать сейчас","Sync now")}</button><button class="btn danger" onclick="signOutUser()">${L("Выйти","Sign out")}</button></div>`:`<div class="tiny warn">● ${L("Сейчас прогресс хранится только на этом устройстве.","Progress is currently stored only on this device.")}</div><div class="btnrow"><button class="btn primary" onclick="openAuth()">${L("Создать аккаунт / войти","Create account / sign in")}</button></div>`;
  const ach=[
    [L("Первый рывок","First momentum"),"100 XP",state.xp>=100],[L("Терминатор","Term learner"),L("10 терминов","10 terms"),state.terms.length>=10],[L("Практик","Practitioner"),L("5 кейсов","5 cases"),state.cases.length>=5],
    [L("Дисциплина","Discipline"),L("10 уроков","10 lessons"),state.lessons.length>=10],[L("Оператор","Operator"),L("2 симулятора","2 simulators"),Object.values(state.simDone).filter(Boolean).length>=2],["Titan track","3000 XP",state.xp>=3000]
  ];
  document.getElementById("achievements").innerHTML=ach.map(a=>`<div class="achievement"><b>${a[2]?"✅":"🔒"} ${a[0]}</b><div class="tiny" style="margin-top:5px">${a[1]}</div></div>`).join("");
}
function editName(){
  modal(`<div class="label">${L("ПРОФИЛЬ","PROFILE")}</div><h2>${L("Как тебя показывать в BIZONIQ?","How should BIZONIQ display your name?")}</h2><input id="nameEdit" class="input" value="${escapeHtml(state.name||"")}"><div class="btnrow"><button class="btn primary" onclick="saveName()">${L("Сохранить","Save")}</button></div>`,true);
}
function cleanPlainText(value,max=80){
  return String(value??"").replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim().slice(0,max);
}
function saveName(){state.name=cleanPlainText(document.getElementById("nameEdit").value,80)||L("Пользователь","User");localSave();closeModal()}
function exportProgress(){
  const blob=new Blob([JSON.stringify({bizoniq_version:10,exported_at:new Date().toISOString(),state},null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="bizoniq-progress.json";a.click();URL.revokeObjectURL(a.href);
}
function sanitizeImportedState(raw){
  if(!raw||typeof raw!=="object"||Array.isArray(raw))throw new Error("Invalid state");
  const lessonIds=new Set(C.modules.flatMap(m=>m.lessons.map(l=>l[0])));
  const termIds=new Set(C.terms.map(t=>t[0]));
  const caseIds=new Set(C.cases.map(c=>c.id));
  const simIds=new Set(Object.keys(C.simulators));
  const uniqAllowed=(value,set,max)=>[...new Set(Array.isArray(value)?value:[])].filter(x=>typeof x==="string"&&set.has(x)).slice(0,max);
  const clean={...DEFAULT_STATE};
  clean.onboarded=!!raw.onboarded;
  clean.goal=normalizeGoal(cleanPlainText(raw.goal,30));
  clean.xp=Math.max(0,Math.min(10000000,Math.floor(Number(raw.xp)||0)));
  clean.streak=Math.max(1,Math.min(3650,Math.floor(Number(raw.streak)||1)));
  clean.name=cleanPlainText(raw.name,80);
  clean.lessons=uniqAllowed(raw.lessons,lessonIds,56);
  clean.terms=uniqAllowed(raw.terms,termIds,C.terms.length);
  clean.saved=uniqAllowed(raw.saved,termIds,C.terms.length);
  clean.cases=uniqAllowed(raw.cases,caseIds,32);
  clean.simDone={};
  if(raw.simDone&&typeof raw.simDone==="object"){
    for(const id of simIds)if(raw.simDone[id]===true)clean.simDone[id]=true;
  }
  clean.dailyDone={};
  clean.diagnostic={...DEFAULT_STATE.diagnostic,completed:!!raw.diagnostic?.completed,recommended:normalizeGoal(raw.diagnostic?.recommended),answers:Array.isArray(raw.diagnostic?.answers)?raw.diagnostic.answers.slice(0,8).map(x=>Math.max(0,Math.min(3,Number(x)||0))):[]};
  clean.challenge={...DEFAULT_STATE.challenge,started:!!raw.challenge?.started,startDate:cleanPlainText(raw.challenge?.startDate,10),completedDays:Array.isArray(raw.challenge?.completedDays)?raw.challenge.completedDays.filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(String(x))).slice(0,366):[]};
  clean.duel={...DEFAULT_STATE.duel,date:cleanPlainText(raw.duel?.date,10),answered:!!raw.duel?.answered,choice:Number.isFinite(Number(raw.duel?.choice))?Math.max(0,Math.min(5,Number(raw.duel.choice))):null};
  clean.weekly={...DEFAULT_STATE.weekly,weekKey:cleanPlainText(raw.weekly?.weekKey,10),xpStart:Math.max(0,Math.min(10000000,Number(raw.weekly?.xpStart)||0)),target:Math.max(100,Math.min(5000,Number(raw.weekly?.target)||400))};
  const ad=raw.adaptive&&typeof raw.adaptive==="object"?raw.adaptive:{};
  clean.adaptive={...DEFAULT_STATE.adaptive,level:Math.max(1,Math.min(3,Number(ad.level)||initialAdaptiveLevel(clean.goal))),recent:Array.isArray(ad.recent)?ad.recent.slice(-5).map(Boolean):[],recentDifficulty:Array.isArray(ad.recentDifficulty)?ad.recentDifficulty.slice(-3).filter(x=>["easy","normal","hard"].includes(x)):[],caseResults:{},caseRatings:{}};
  for(const [id,r] of Object.entries(ad.caseResults||{})){
    if(caseIds.has(id)&&r&&typeof r==="object")clean.adaptive.caseResults[id]={correct:!!r.correct,category:cleanPlainText(r.category,30),difficulty:Math.max(1,Math.min(3,Number(r.difficulty)||1)),at:cleanPlainText(r.at,40)};
  }
  for(const [id,rating] of Object.entries(ad.caseRatings||{}))if(caseIds.has(id)&&["easy","normal","hard"].includes(rating))clean.adaptive.caseRatings[id]=rating;
  return normalizeGrowthState(clean);
}
function importProgressFile(ev){
  const file=ev.target.files[0];if(!file)return;
  if(file.size>1024*1024){alert(L("Backup слишком большой. Максимум 1 МБ.","Backup is too large. Maximum size is 1 MB."));ev.target.value="";return}
  const reader=new FileReader();
  reader.onload=()=>{try{const data=JSON.parse(reader.result);state=sanitizeImportedState(data.state||data);localSave();alert(L("Прогресс импортирован.","Progress imported."));}catch(e){alert(L("Backup повреждён или имеет неподдерживаемый формат.","The backup is damaged or has an unsupported format."))}};
  reader.readAsText(file);ev.target.value="";
}

function renderAll(){
  renderStats();renderDashboard();renderPractice();renderLessons();renderTerms();renderCases();renderSimulator();renderCoach();renderCertificates();renderPricing();renderProfile();renderAuthState();renderInstallButton();
  localStorage.setItem("forge_v3_state",JSON.stringify(state));
  localizeUI();
}
document.addEventListener("DOMContentLoaded",async()=>{
  buildNav();renderOnboarding();
  document.getElementById("termSearch").oninput=renderTerms;document.getElementById("termFilter").onchange=renderTerms;
  document.getElementById("caseSearch").oninput=renderCases;
  document.getElementById("coachInput").addEventListener("keydown",e=>{if(e.key==="Enter")sendCoach()});
  document.getElementById("loginPassword")?.addEventListener("keydown",e=>{if(e.key==="Enter")signInUser()});
  document.getElementById("registerPassword")?.addEventListener("keydown",e=>{if(e.key==="Enter")registerUser()});
  document.getElementById("recoveryEmail")?.addEventListener("keydown",e=>{if(e.key==="Enter")sendPasswordReset()});
  document.getElementById("recoveryNewPassword2")?.addEventListener("keydown",e=>{if(e.key==="Enter")updateRecoveredPassword()});
  resetSimulator(false);renderAll();setupInstall();PREFS.injectControls?.();localizeUI();await initAuth();
  trackEvent("page_view",{page:"dashboard",initial:true});
  const requested=new URLSearchParams(location.search).get("page");
  if(["dashboard","learn","dictionary","practice","cases","simulator","coach","certificates","pricing","profile"].includes(requested))go(requested);
});
