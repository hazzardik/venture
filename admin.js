const SUPABASE_URL="https://qmjtmhtmbaseykmwttvn.supabase.co";
const SUPABASE_KEY="sb_publishable_CD-9o4mQVn0j6tltKgRRZA_IsUUq_iJ";
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const ADMIN_PREFS=window.BIZONIQ_PREFS||{lang:"ru",currency:"RUB"};
const ADMIN_LANG=ADMIN_PREFS.lang||"ru";
const AL=(ru,en)=>ADMIN_LANG==="en"?en:ru;
const ADMIN_STATIC_EN={
  "← Приложение":"← App",
  "Выйти":"Sign out",
  "Вход создателя":"Creator sign in",
  "Войди тем же аккаунтом BIZONIQ. Creator Console откроется только аккаунтам с ролью создателя.":"Sign in with the same BIZONIQ account. Creator Console is available only to accounts with creator access.",
  "Пароль":"Password",
  "Войти":"Sign in",
  "Активировать Creator-доступ":"Activate Creator access",
  "Аккаунт":"Account",
  "ещё не имеет роли создателя. Введи одноразовый код. После активации код больше не работает.":"does not have creator access yet. Enter a one-time code. The code becomes invalid after activation.",
  "Аккаунт ещё не имеет роли создателя. Введи одноразовый код. После активации код больше не работает.":"This account does not have creator access yet. Enter a one-time code. The code becomes invalid after activation.",
  "Имя создателя":"Creator name",
  "Активировать":"Activate",
  "Смотри на поведение пользователей, а не на догадки. Управляй Pro-доступом без изменения базы вручную.":"Use real user behavior instead of guesses. Manage Pro access without editing the database manually.",
  "Экспорт метрик":"Export metrics",
  "Обновить":"Refresh",
  "Три метрики, которые сейчас важнее количества функций.":"Three metrics that matter more than feature count right now.",
  "Траектории пользователей":"User paths",
  "Кто приходит в BIZONIQ и зачем.":"Who comes to BIZONIQ and why.",
  "Выдать Pro вручную":"Grant Pro manually",
  "По email. Продлевает уже действующий ручной Pro; бессрочный доступ не сокращается кодами.":"By email. Extends existing manual Pro; lifetime access is not shortened by codes.",
  "Email пользователя":"User email",
  "Срок":"Duration",
  "7 дней":"7 days",
  "30 дней":"30 days",
  "90 дней":"90 days",
  "365 дней":"365 days",
  "Комментарий":"Note",
  "Например: beta tester":"For example: beta tester",
  "Бессрочный Pro":"Lifetime Pro",
  "Выдать Pro":"Grant Pro",
  "Отозвать ручной Pro":"Revoke manual Pro",
  "Управление создателями":"Creator management",
  "Только owner может выдавать одноразовый доступ новым создателям. Приглашение действует 7 дней, срабатывает один раз, а в базе хранится только его hash.":"Only the owner can issue one-time access to new creators. The invite lasts 7 days, works once, and only its hash is stored.",
  "Создавай новый invite в любой момент, когда хочешь добавить человека в Creator Console. После первой успешной активации этот код больше не работает.":"Create a new invite whenever you want to add someone to Creator Console. After the first successful activation, the code stops working.",
  "Создать одноразовый invite • 7 дней":"Create one-time invite • 7 days",
  "ПОКАЗЫВАЕТСЯ ПОЛНОСТЬЮ ТОЛЬКО СЕЙЧАС":"SHOWN IN FULL ONLY ONCE",
  "Скопировать":"Copy",
  "Генератор Pro-кодов":"Pro code generator",
  "Можно сделать код на 7/30/90/365 дней, одноразовый или для нескольких пользователей.":"Create a 7/30/90/365-day code for one or multiple users.",
  "Pro на":"Pro duration",
  "Максимум активаций":"Maximum redemptions",
  "Код истекает через":"Code expires in",
  "Без срока активации":"No activation expiry",
  "Партнёр / beta / подарок":"Partner / beta / gift",
  "Создать код":"Create code",
  "Активные и прошлые коды":"Active and previous codes",
  "В целях безопасности полный код после создания не хранится — только hash и последние 6 символов.":"For security, the full code is not stored after creation — only its hash and last 6 characters.",
  "Последние пользователи":"Recent users",
  "Быстрая выдача Pro и проверка ранней аудитории.":"Quick Pro grants and early audience review.",
  "Поиск по имени или email":"Search by name or email",
  "Пользователь":"User",
  "Путь":"Path",
  "Создан":"Created",
  "Последний вход":"Last sign-in",
  "Доступ":"Access",
  "Действие":"Action",
  "Не «лайки», а конкретные ответы реальных пользователей.":"Not likes — concrete answers from real users.",
  "Популярные уроки":"Popular lessons",
  "По фактическим завершениям.":"Based on actual completions.",
  "Популярные кейсы":"Popular cases",
  "По фактическим успешным прохождениям.":"Based on actual successful completions.",
  "Самые сложные кейсы":"Hardest cases",
  "Accuracy первых попыток. Появляется по мере накопления v9 analytics.":"First-attempt accuracy. Appears as v9 analytics accumulates.",
  "Просмотры разделов":"Page views",
  "За последние 30 дней.":"Last 30 days.",
  "Все выдачи Pro, генерации и отключения кодов фиксируются.":"All Pro grants, code creation and code deactivation are logged."
};
function adminTranslateTree(root=document.body){
  if(ADMIN_LANG!=="en"||!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    const raw=node.nodeValue||"",trim=raw.trim(),out=ADMIN_STATIC_EN[trim];
    if(!out)return;
    const before=raw.match(/^\s*/)?.[0]||"",after=raw.match(/\s*$/)?.[0]||"";
    node.nodeValue=before+out+after;
  });
  root.querySelectorAll?.("[placeholder]").forEach(el=>{
    const out=ADMIN_STATIC_EN[el.getAttribute("placeholder")];
    if(out)el.setAttribute("placeholder",out);
  });
}
let session=null,creator=null,dashboard=null;

function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]))}
function fmtDate(s){if(!s)return"—";return new Date(s).toLocaleDateString(ADMIN_LANG==="en"?"en-US":"ru-RU",{day:"2-digit",month:"short",year:"numeric"})}
function fmtDateTime(s){if(!s)return"—";return new Date(s).toLocaleString(ADMIN_LANG==="en"?"en-US":"ru-RU",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}
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
  const el=document.getElementById("loginStatus");el.textContent=AL("Вхожу…","Signing in…");
  const {error}=await sb.auth.signInWithPassword({email,password});
  el.textContent=error?error.message:"";
}
async function logout(){await sb.auth.signOut()}
async function activateCreator(){
  const code=document.getElementById("creatorCode").value.trim(),display_name=document.getElementById("creatorName").value.trim();
  const el=document.getElementById("creatorStatus");el.textContent=AL("Активирую доступ…","Activating access…");
  const {data,error}=await sb.functions.invoke("creator-bootstrap",{body:{code,display_name}});
  if(error||!data?.ok){el.textContent=data?.error||AL("Не удалось активировать Creator-доступ.","Could not activate Creator access.");return}
  el.textContent=AL("Готово.","Done.");
  await route();
}
async function loadDashboard(){
  status(AL("Обновляю данные…","Refreshing data…"));
  const {data,error}=await sb.functions.invoke("creator-dashboard",{body:{}});
  if(error||!data?.ok){status(data?.error||AL("Не удалось загрузить Creator Console.","Could not load Creator Console."),"bad");return}
  dashboard=data;
  status(AL("Данные обновлены · ","Updated · ")+new Date().toLocaleTimeString(ADMIN_LANG==="en"?"en-US":"ru-RU",{hour:"2-digit",minute:"2-digit"}),"good");
  renderAll();
}
function metricCard(label,value,sub,accent=""){
  return '<div class="metric-card '+accent+'"><div class="metric-label">'+esc(label)+'</div><div class="metric-value">'+esc(value)+'</div><div class="metric-sub">'+esc(sub)+'</div></div>';
}
function renderAll(){
  const m=dashboard.metrics||{};
  const ownerTools=document.getElementById("ownerTools");
  if(ownerTools)ownerTools.classList.toggle("hidden",dashboard.creator?.role!=="owner");
  document.getElementById("metricGrid").innerHTML=[
    metricCard(AL("Пользователи","Users"),m.users||0,AL("всего аккаунтов","total accounts"),""),
    metricCard(AL("Активны сегодня","Active today"),m.active_today||0,AL("уникальных пользователей","unique users"),"good"),
    metricCard(AL("Активны 7 дней","Active 7 days"),m.active_7d||0,AL("уникальных пользователей","unique users"),""),
    metricCard(AL("Новые 7 дней","New 7 days"),m.new_7d||0,AL("новых аккаунтов","new accounts"),""),
    metricCard("Activation",String(m.activation_rate||0)+"%",AL("начали проходить уроки","started lessons"),"good"),
    metricCard("Practice",String(m.practice_rate||0)+"%",AL("дошли до кейсов","reached cases"),""),
    metricCard("Pro intent",String(m.pro_click_rate||0)+"%",AL("клики Pro / просмотры Pricing","Pro clicks / Pricing views"),""),
    metricCard("Pro users",(m.manual_pro||0)+(m.paddle_pro||0),"manual "+(m.manual_pro||0)+" · Paddle "+(m.paddle_pro||0),"pro")
  ].join("");
  renderProductHealth();
  renderPaths();
  renderTopList("topLessons",dashboard.top_lessons||[],AL("Урок","Lesson"),AL("завершений","completions"));
  renderTopList("topCases",dashboard.top_cases||[],AL("Кейс","Case"),AL("решений","solutions"));
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
    ["Activation rate",m.activation_rate||0,AL("Доля зарегистрированных, начавших хотя бы один урок.","Share of registered users who started at least one lesson.")],
    ["Practice rate",m.practice_rate||0,AL("Доля зарегистрированных, решивших хотя бы один кейс.","Share of registered users who solved at least one case.")],
    ["Pro click rate",m.pro_click_rate||0,AL("Доля кликов Pro от просмотров страницы тарифов за 30 дней.","Share of Pro clicks from Pricing page views over 30 days.")]
  ];
  document.getElementById("healthBars").innerHTML=items.map(x=>'<div class="health-row"><div class="health-head"><b>'+esc(x[0])+'</b><span>'+pct(x[1])+'%</span></div><div class="bar"><span style="width:'+pct(x[1])+'%"></span></div><div class="mini">'+esc(x[2])+'</div></div>').join("");
  document.getElementById("volumeStats").innerHTML=[
    [AL("Уроков завершено","Lessons completed"),m.lessons_completed||0],[AL("Кейсов решено","Cases solved"),m.cases_completed||0],[AL("Сертификатов","Certificates"),m.certificates||0],
    [AL("Pricing views / 30д","Pricing views / 30d"),m.pricing_views_30d||0],[AL("Pro clicks / 30д","Pro clicks / 30d"),m.pro_clicks_30d||0]
  ].map(x=>'<div class="volume"><span>'+esc(x[0])+'</span><b>'+esc(x[1])+'</b></div>').join("");
}
function renderPaths(){
  const names=ADMIN_LANG==="en"?{first:"Beginner / first business",run:"Active entrepreneur",mind:"Business thinking",curious:"Just exploring",unknown:"Not selected"}:{first:"Новичок / первый бизнес",run:"Действующий предприниматель",mind:"Бизнес-мышление",curious:"Просто интересуюсь",unknown:"Не выбрано"};
  const arr=dashboard.learning_paths||[],max=Math.max(1,...arr.map(x=>Number(x.count)||0));
  document.getElementById("paths").innerHTML=arr.length?arr.map(x=>'<div class="rank-row"><div><b>'+esc(names[x.path]||x.path)+'</b></div><div class="rank-bar"><span style="width:'+Math.round((x.count/max)*100)+'%"></span></div><strong>'+esc(x.count)+'</strong></div>').join(""):'<div class="empty">'+AL("Пока нет данных.","No data yet.")+'</div>';
}
function renderTopList(id,arr,label,countLabel){
  const max=Math.max(1,...arr.map(x=>Number(x.count)||0));
  document.getElementById(id).innerHTML=arr.length?arr.map((x,i)=>'<div class="rank-row"><span class="rank-index">'+String(i+1).padStart(2,"0")+'</span><div><b>'+esc(x.id)+'</b><div class="mini">'+esc(label)+'</div></div><div class="rank-bar"><span style="width:'+Math.round((x.count/max)*100)+'%"></span></div><strong>'+esc(x.count)+' '+esc(countLabel)+'</strong></div>').join(""):'<div class="empty">'+AL("Данных пока мало.","Not enough data yet.")+'</div>';
}
function renderHardest(){
  const arr=dashboard.hardest_cases||[];
  document.getElementById("hardestCases").innerHTML=arr.length?arr.map(x=>'<div class="rank-row"><div><b>'+esc(x.id)+'</b><div class="mini">'+esc(x.attempts)+AL(" первых попыток"," first attempts")+'</div></div><div class="accuracy '+(x.accuracy<50?"danger":"")+'">'+esc(x.accuracy)+'%</div></div>').join(""):'<div class="empty">'+AL("Нужно минимум 2 отслеженных попытки на кейс. Данные начнут появляться после использования v8.","At least 2 tracked attempts per case are required. Data will appear as analytics accumulates.")+'</div>';
}
function renderPageViews(){
  const arr=dashboard.page_views||[],max=Math.max(1,...arr.map(x=>Number(x.count)||0));
  document.getElementById("pageViews").innerHTML=arr.length?arr.map(x=>'<div class="rank-row"><div><b>'+esc(x.page)+'</b></div><div class="rank-bar"><span style="width:'+Math.round((x.count/max)*100)+'%"></span></div><strong>'+esc(x.count)+'</strong></div>').join(""):'<div class="empty">'+AL("Аналитика страниц собирается с v9.","Page analytics is collected from v9 onward.")+'</div>';
}
const feedbackNames=ADMIN_LANG==="en"
  ?{confusing:"Confusing",useless:"Feels useless",return:"Would bring back",willing_to_pay:"Would pay for",general:"General"}
  :{confusing:"Где непонятно",useless:"Что бесполезно",return:"Что вернёт завтра",willing_to_pay:"За что готов платить",general:"Общее"};
function renderFeedback(){
  const arr=dashboard.feedback||[];
  document.getElementById("feedbackList").innerHTML=arr.length?arr.map(x=>'<article class="feedback-card"><div class="feedback-meta"><span class="tag">'+esc(feedbackNames[x.category]||x.category)+'</span><span>'+fmtDateTime(x.created_at)+'</span></div><div class="feedback-text">'+esc(x.message)+'</div><div class="mini">'+AL("Путь: ","Path: ")+esc(x.context?.path||"—")+' · '+AL("Уровень: ","Level: ")+esc(x.context?.adaptive_level||"—")+' · XP: '+esc(x.context?.xp||0)+'</div></article>').join(""):'<div class="empty">'+AL("Отзывов пока нет.","No feedback yet.")+'</div>';
}
function renderCodes(){
  const arr=dashboard.codes||[];
  document.getElementById("codesList").innerHTML=arr.length?arr.map(x=>{
    const state=!x.is_active?"disabled":x.expires_at&&new Date(x.expires_at)<new Date()?"expired":"active";
    return '<div class="code-row"><div><div class="code-name">BZQ-PRO-••••••-'+esc(x.code_hint)+'</div><div class="mini">'+esc(x.duration_days)+AL(" дней Pro · "," days Pro · ")+esc(x.redemption_count)+'/'+esc(x.max_redemptions)+AL(" активаций"," redemptions")+(x.note?" · "+esc(x.note):"")+'</div></div><span class="state '+state+'">'+(state==="active"?"ACTIVE":state.toUpperCase())+'</span><div class="code-actions">'+(x.is_active?'<button class="small-btn danger-btn" onclick="deactivateCode(\''+x.id+'\')">'+AL("Отключить","Disable")+'</button>':"")+'</div></div>';
  }).join(""):'<div class="empty">'+AL("Кодов ещё нет.","No codes yet.")+'</div>';
}
function renderUsers(){
  const arr=dashboard.recent_users||[];
  document.getElementById("usersBody").innerHTML=arr.length?arr.map(u=>{
    const p=u.profile||{};
    return '<tr data-search="'+esc(((u.email||"")+" "+(p.display_name||"")).toLowerCase())+'"><td><b>'+esc(p.display_name||"—")+'</b><div class="mini">'+esc(u.email||"—")+'</div></td><td>'+esc(p.learning_path||"—")+'</td><td>'+esc(p.xp||0)+'</td><td>'+fmtDate(u.created_at)+'</td><td>'+fmtDateTime(u.last_sign_in_at)+'</td><td>'+(u.pro?'<span class="state active">PRO'+(u.pro_until?' · '+fmtDate(u.pro_until):'')+'</span>':'<span class="state">FREE</span>')+'</td><td><button class="small-btn" onclick="quickGrant(\''+esc(u.email||"")+'\',30)">Pro 30'+AL("д","d")+'</button></td></tr>';
  }).join(""):'<tr><td colspan="7" class="empty">'+AL("Пользователей пока нет.","No users yet.")+'</td></tr>';
}
function filterUsers(){
  const q=document.getElementById("userSearch").value.trim().toLowerCase();
  document.querySelectorAll("#usersBody tr[data-search]").forEach(tr=>tr.style.display=tr.dataset.search.includes(q)?"":"none");
}
const auditNames=ADMIN_LANG==="en"
  ?{creator_access_activated:"Creator access",creator_invite_generated:"Creator invite created",access_code_generated:"Code created",access_code_deactivated:"Code disabled",manual_pro_granted:"Pro granted",manual_pro_revoked:"Pro revoked"}
  :{creator_access_activated:"Creator access",creator_invite_generated:"Creator invite создан",access_code_generated:"Код создан",access_code_deactivated:"Код отключён",manual_pro_granted:"Pro выдан",manual_pro_revoked:"Pro отозван"};
function renderAudit(){
  const arr=dashboard.audit||[];
  document.getElementById("auditList").innerHTML=arr.length?arr.map(x=>'<div class="audit-row"><div><b>'+esc(auditNames[x.action]||x.action)+'</b><div class="mini">'+fmtDateTime(x.created_at)+'</div></div><code>'+esc(JSON.stringify(x.metadata||{}))+'</code></div>').join(""):'<div class="empty">'+AL("Audit log пуст.","Audit log is empty.")+'</div>';
}
async function generateCreatorInvite(){
  if(dashboard?.creator?.role!=="owner"){status(AL("Только owner может приглашать новых создателей.","Only the owner can invite new creators."),"bad");return}
  status(AL("Создаю одноразовый Creator Invite…","Creating one-time Creator Invite…"));
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"generate_creator_invite",expires_in_days:7}});
  if(error||!data?.ok){status(data?.error||AL("Не удалось создать invite.","Could not create the invite."),"bad");return}
  const box=document.getElementById("creatorInviteBox"),value=document.getElementById("creatorInviteValue"),expiry=document.getElementById("creatorInviteExpiry");
  box.classList.remove("hidden");value.textContent=data.code;expiry.textContent=AL("Действует до ","Valid until ")+fmtDateTime(data.expires_at)+AL(" и только для одной активации."," and valid for one activation only.");
  status(AL("Creator Invite создан. Передай код человеку, которому хочешь выдать доступ создателя. После первой активации код станет недействительным.","Creator Invite created. Send it to the person you want to add as a creator. It becomes invalid after the first activation."),"good");
  await loadDashboard();
}
async function copyCreatorInvite(){
  const code=document.getElementById("creatorInviteValue").textContent;
  try{await navigator.clipboard.writeText(code);status(AL("Creator Invite скопирован.","Creator Invite copied."),"good")}catch{prompt(AL("Скопируй invite:","Copy invite:"),code)}
}

async function generateCode(){
  const duration=Number(document.getElementById("codeDuration").value),max=Number(document.getElementById("codeMax").value),expiry=document.getElementById("codeExpiry").value,note=document.getElementById("codeNote").value.trim();
  status(AL("Генерирую код…","Generating code…"));
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"generate_code",duration_days:duration,max_redemptions:max,expires_in_days:expiry?Number(expiry):null,note}});
  if(error||!data?.ok){status(data?.error||AL("Не удалось создать код.","Could not create the code."),"bad");return}
  document.getElementById("newCodeBox").classList.remove("hidden");
  document.getElementById("newCodeValue").textContent=data.code;
  status(AL("Код создан. Скопируй его сейчас — потом в панели останутся только последние 6 символов.","Code created. Copy it now — later the console will show only the last 6 characters."),"good");
  await loadDashboard();
}
async function copyNewCode(){
  const code=document.getElementById("newCodeValue").textContent;
  try{await navigator.clipboard.writeText(code);status(AL("Код скопирован.","Code copied."),"good")}catch{prompt(AL("Скопируй код:","Copy code:"),code)}
}
async function deactivateCode(id){
  if(!confirm(AL("Отключить этот код? Уже активированные подписки останутся у пользователей.","Disable this code? Existing activated subscriptions will remain active.")))return;
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"deactivate_code",code_id:id}});
  if(error||!data?.ok){status(data?.error||AL("Не удалось отключить код.","Could not disable the code."),"bad");return}
  status(AL("Код отключён.","Code disabled."),"good");await loadDashboard();
}
async function grantPro(){
  const email=document.getElementById("grantEmail").value.trim(),days=Number(document.getElementById("grantDays").value),lifetime=document.getElementById("grantLifetime").checked,note=document.getElementById("grantNote").value.trim();
  if(!email){status(AL("Укажи email пользователя.","Enter the user's email."),"bad");return}
  status(AL("Выдаю Pro…","Granting Pro…"));
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"grant_pro",email,duration_days:days,lifetime,note}});
  if(error||!data?.ok){status(data?.error||AL("Не удалось выдать Pro.","Could not grant Pro."),"bad");return}
  status(AL("Pro выдан: ","Pro granted: ")+data.email+(lifetime?AL(" · бессрочно"," · lifetime"):" · "+days+AL(" дней"," days")),"good");
  await loadDashboard();
}
async function quickGrant(email,days){
  if(!confirm(AL("Выдать ","Grant ")+email+AL(" Pro на "," Pro for ")+days+AL(" дней?"," days?")))return;
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"grant_pro",email,duration_days:days,lifetime:false,note:"Quick grant from Creator Console"}});
  if(error||!data?.ok){status(data?.error||AL("Не удалось выдать Pro.","Could not grant Pro."),"bad");return}
  status(AL("Pro выдан ","Pro granted to ")+email+AL(" на "," for ")+days+AL(" дней."," days."),"good");await loadDashboard();
}
async function revokePro(){
  const email=document.getElementById("grantEmail").value.trim();if(!email){status(AL("Укажи email пользователя.","Enter the user's email."),"bad");return}
  if(!confirm(AL("Отозвать ручной Pro у ","Revoke manual Pro from ")+email+AL("? Paddle-подписку это не отменяет.","? This does not cancel a Paddle subscription.")))return;
  const {data,error}=await sb.functions.invoke("creator-admin",{body:{action:"revoke_pro",email,note:"Revoked from Creator Console"}});
  if(error||!data?.ok){status(data?.error||AL("Не удалось отозвать Pro.","Could not revoke Pro."),"bad");return}
  status(AL("Ручной Pro отозван у ","Manual Pro revoked from ")+data.email+".","good");await loadDashboard();
}
function exportDashboard(){
  if(!dashboard)return;
  const safeExport={
    exported_at:new Date().toISOString(),
    metrics:dashboard.metrics||{},
    learning_paths:dashboard.learning_paths||[],
    top_lessons:dashboard.top_lessons||[],
    top_cases:dashboard.top_cases||[],
    hardest_cases:dashboard.hardest_cases||[],
    page_views:dashboard.page_views||[]
  };
  const blob=new Blob([JSON.stringify(safeExport,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="bizoniq-product-metrics.json";a.click();URL.revokeObjectURL(a.href);
}

document.addEventListener("DOMContentLoaded",()=>{document.documentElement.lang=ADMIN_LANG;adminTranslateTree(document.body);init()});