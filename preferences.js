(function(){
  const qs=new URLSearchParams(location.search);
  const storedLang=localStorage.getItem("bizoniq_lang");
  const storedCurrency=localStorage.getItem("bizoniq_currency");
  const browserLang=(navigator.language||"ru").toLowerCase().startsWith("ru")?"ru":"en";
  const lang=["ru","en"].includes(qs.get("lang"))?qs.get("lang"):(storedLang||browserLang);
  const currency=["RUB","USD"].includes(qs.get("currency"))?qs.get("currency"):(storedCurrency||"RUB");
  localStorage.setItem("bizoniq_lang",lang);
  localStorage.setItem("bizoniq_currency",currency);
  document.documentElement.lang=lang;

  const prices={
    RUB:{monthly:99,yearly:799,symbol:"₽",locale:"ru-RU",monthlySave:389,monthlyEquivalent:67},
    USD:{monthly:1.49,yearly:11.99,symbol:"$",locale:"en-US",monthlySave:5.89,monthlyEquivalent:1.00}
  };

  const STATIC_EN={
    "BIZONIQ — тренажёр бизнес-мышления":"BIZONIQ — Business Thinking Trainer",
    "Выбери свою траекторию.":"Choose your path.",
    "BIZONIQ адаптирует обучение под твой уровень и цель. Траекторию можно менять в любой момент без потери прогресса.":"BIZONIQ adapts learning to your level and goal. You can change your path anytime without losing progress.",
    "Пройти диагностику • 60 сек":"Take diagnostic • 60 sec",
    "Или выбери путь вручную:":"Or choose a path manually:",
    "Сохраняй прогресс между устройствами":"Keep progress across devices",
    "Без аккаунта BIZONIQ сохраняет прогресс локально. С аккаунтом обучение синхронизируется через Supabase между iPhone и ПК.":"Without an account, BIZONIQ stores progress locally. With an account, learning syncs through Supabase across phone and desktop.",
    "Войти":"Sign in",
    "Создать аккаунт":"Create account",
    "Текущий уровень":"Current level",
    "Твой ежедневный бизнес-тренажёр.":"Your daily business-thinking workout.",
    "👋 Гость":"👋 Guest",
    "🔥 1 день":"🔥 1 day",
    "🎯 Траектория":"🎯 Path",
    "Войти / синхронизация":"Sign in / sync",
    "Учись не запоминать бизнес, а принимать решения.":"Learn to make business decisions, not memorize theory.",
    "BIZONIQ объединяет обучение, практику и бизнес-симуляции в одну систему: 56 уроков, 32 кейса, 4 симулятора и облачный прогресс.":"BIZONIQ combines learning, practice and simulations in one system: 56 lessons, 32 cases, 4 simulations and cloud progress.",
    "Продолжить путь":"Continue path",
    "Открыть симулятор":"Open simulator",
    "Твой план на сегодня":"Your plan for today",
    "BIZONIQ сам подбирает следующий шаг по слабым навыкам и текущей сложности.":"BIZONIQ picks the next step based on weaker skills and your current difficulty.",
    "Рекомендуемые направления":"Recommended areas",
    "Сначала то, что даст тебе максимальную отдачу на текущем уровне.":"Start with what gives you the highest return at your current level.",
    "Прогресс по ключевым предпринимательским навыкам.":"Progress across key business skills.",
    "Skill Score — внутренний игровой показатель прогресса BIZONIQ, а не объективная оценка предпринимательских способностей.":"Skill Score is an internal BIZONIQ progress metric, not an objective measure of entrepreneurial ability.",
    "Слабые места":"Weak areas",
    "Навыки с самым низким текущим Skill Score.":"Skills with the lowest current Skill Score.",
    "Механики, ради которых хочется вернуться завтра.":"Mechanics designed to bring you back tomorrow.",
    "Четыре коротких действия вместо бесконечного чтения.":"Four short actions instead of endless reading.",
    "BETA • НАМ НУЖНА КРИТИКА":"BETA • WE NEED CRITICISM",
    "Помоги сделать BIZONIQ полезнее.":"Help make BIZONIQ more useful.",
    "У нас уже есть первые реальные пользователи. Ответь на один вопрос — это сильнее влияет на продукт, чем ещё десять случайных функций.":"We already have real early users. One honest answer can improve the product more than ten random features.",
    "Где непонятно?":"What is confusing?",
    "Что бесполезно?":"What feels useless?",
    "Что вернёт завтра?":"What would bring you back?",
    "За что дал бы 99 ₽?":"What would you pay for?",
    "56 коротких уроков":"56 short lessons",
    "Финансы, маркетинг, продажи, стратегия, стартапы, менеджмент и экономика.":"Finance, marketing, sales, strategy, startups, management and economics.",
    "Термин → смысл → зачем нужен → пример.":"Term → meaning → why it matters → example.",
    "Все категории":"All categories",
    "★ Избранные":"★ Favorites",
    "Финансы":"Finance",
    "Маркетинг":"Marketing",
    "Стартапы":"Startups",
    "Стратегия":"Strategy",
    "Экономика":"Economics",
    "Практика":"Practice",
    "Кейсы, симуляторы, Coach и сертификаты — в одном месте.":"Cases, simulations, Coach and certificates in one place.",
    "Бизнес-кейсы":"Business cases",
    "32 ситуации и разбор решений":"32 situations with decision breakdowns",
    "Симуляторы":"Simulations",
    "Управляй цифрами и последствиями":"Manage numbers and consequences",
    "Структурируй идею и решения":"Structure an idea and decisions",
    "Сертификаты":"Certificates",
    "Проверяемые достижения BIZONIQ":"Verifiable BIZONIQ achievements",
    "32 бизнес-кейса":"32 business cases",
    "Тренировка решений на финансах, маркетинге, продажах, стратегии и команде.":"Decision practice across finance, marketing, sales, strategy and teams.",
    "Выбери бизнес":"Choose a business",
    "Каждый сценарий — три последовательных решения с изменением метрик.":"Each scenario has three sequential decisions that change the metrics.",
    "Смотри не на одну красивую цифру, а на систему: cash, revenue, profit и клиентов.":"Look at the system, not one pretty number: cash, revenue, profit and customers.",
    "Шаг 1":"Step 1",
    "Начать заново":"Restart",
    "Интерактивный бизнес-наставник: помогает разбирать идею, экономику, маркетинг и сложные решения пошагово.":"Interactive business coach for ideas, economics, marketing and difficult decisions.",
    "Отправить":"Send",
    "Начать сценарий заново":"Restart scenario",
    "Сертификаты выдаются только после выполнения проверяемых критериев. Каждый имеет уникальный ID и публичную проверку.":"Certificates are issued only after verified requirements are met. Each has a unique ID and public verification.",
    "Не картинка ради галочки.":"Not just a badge image.",
    "Выдача подтверждается сервером по твоему прогрессу. Сертификат можно открыть, распечатать в PDF и проверить по уникальному коду.":"Issuance is verified server-side against your progress. You can open, print to PDF and verify a certificate by its unique code.",
    "Важно":"Important",
    "Сертификаты BIZONIQ подтверждают прохождение учебных модулей внутри платформы. Они не являются государственным дипломом, лицензией или аккредитованной профессиональной квалификацией.":"BIZONIQ certificates confirm completion inside the platform. They are not government diplomas, licenses or accredited professional qualifications.",
    "Один простой тариф. Без дорогого входа и лишних уровней подписки.":"One simple plan. No expensive entry point or unnecessary tiers.",
    "навсегда":"forever",
    "Чтобы понять продукт и начать учиться без карты.":"Explore the product and start learning without a card.",
    "16 базовых уроков":"16 foundation lessons",
    "8 бесплатных кейсов":"8 free cases",
    "Симулятор кофейни":"Coffee Shop simulator",
    "1 режим Business Coach":"1 Business Coach mode",
    "Продолжить бесплатно":"Continue free",
    "/ месяц":"/ month",
    "Полный доступ ко всей практике и обучению.":"Full access to all practice and learning.",
    "Все 56 уроков":"All 56 lessons",
    "Все 32 кейса":"All 32 cases",
    "Все 4 бизнес-симулятора":"All 4 business simulations",
    "Все сценарии Business Coach":"All Business Coach scenarios",
    "Система сертификатов":"Certificate system",
    "Расширенный прогресс":"Advanced progress",
    "ЛУЧШАЯ ЦЕНА":"BEST VALUE",
    "/ год":"/ year",
    "Тот же Pro, но заметно дешевле при оплате за год.":"The same Pro access at a lower annual price.",
    "Всё из BIZONIQ Pro":"Everything in BIZONIQ Pro",
    "12 месяцев полного доступа":"12 months of full access",
    "Оплата":"Payments",
    "Планируем использовать Paddle как Merchant of Record: платежи, подписки, налоги и управление оплатой обрабатываются платёжной платформой. Для запуска реальных платежей аккаунт продавца всё равно должен пройти проверку Paddle.":"We plan to use Paddle as Merchant of Record. Payments, subscriptions, taxes and billing management are handled by the payment platform. A merchant account still needs Paddle verification before live payments.",
    "Профиль":"Profile",
    "Гость":"Guest",
    "Изменить имя":"Edit name",
    "Сменить путь обучения":"Change learning path",
    "Мои сертификаты":"My certificates",
    "УРОВЕНЬ":"LEVEL",
    "УРОКИ":"LESSONS",
    "ТЕРМИНЫ":"TERMS",
    "Аккаунт и сохранение":"Account & saving",
    "Активировать Pro-код":"Activate Pro code",
    "Если создатель выдал тебе Pro-код, введи его здесь. Новый формат: BZQ-PRO-XXXXXX-XXXXXX. Старые коды тоже поддерживаются.":"If a creator gave you a Pro code, enter it here. New format: BZQ-PRO-XXXXXX-XXXXXX. Legacy codes are still supported.",
    "Активировать":"Activate",
    "СТАТУС":"STATUS",
    "Локальный режим":"Local mode",
    "Резервная копия":"Backup",
    "Можно сохранить прогресс в JSON и потом импортировать его на другом устройстве.":"Export progress to JSON and import it on another device later.",
    "Экспортировать":"Export",
    "Импортировать":"Import",
    "Достижения":"Achievements",
    "Учебный профиль строится только по твоим действиям внутри BIZONIQ — это не тест личности.":"Your learning profile is based only on actions inside BIZONIQ — it is not a personality test.",
    "Проверить сертификат":"Verify certificate",
    "Создатели:":"Creators:",
    "Аккаунты и учебный прогресс защищены Supabase Auth и политиками Row Level Security (RLS). Абсолютная безопасность любой онлайн-системы не может быть гарантирована.":"Accounts and learning progress use Supabase Auth and Row Level Security (RLS). No online system can guarantee absolute security.",
    "Главная":"Home",
    "Учёба":"Learn",
    "Курсы":"Courses",
    "Словарь":"Dictionary",
    "Кейсы":"Cases",
    "Симулятор":"Simulator",
    "Профиль и синхронизация":"Profile & sync",
    "Смена пути, аккаунт, backup и прогресс.":"Path, account, backup and progress.",
    "Полный доступ за 99 ₽/мес или 799 ₽/год.":"Full access with monthly or yearly Pro.",
    "Обучение":"Learning",
    "56 коротких уроков, адаптированных под твою траекторию.":"56 short lessons adapted to your path.",
    "Термины с примерами, поиском и избранным.":"Terms with examples, search and favorites.",
    "Четыре бизнеса, где решения меняют экономику.":"Four businesses where decisions change the economics.",
    "Проверяемые сертификаты прохождения с уникальным ID.":"Verifiable completion certificates with unique IDs."
  };

  const REPLACERS_EN=[
    [/^(\d+) дн\.$/,"$1 d."],
    [/^(\d+) дней$/,"$1 days"],
    [/^(\d+) кейсов правильно$/,"$1 cases correct"],
    [/^(\d+)\/56 уроков$/,"$1/56 lessons"],
    [/^(\d+)\/32 решено$/,"$1/32 solved"],
    [/^до (.+)$/,"until $1"],
    [/^Шаг (\d+)$/,"Step $1"],
    [/^\+(\d+) XP$/,"+$1 XP"]
  ];

  function money(value,opts={}){
    const n=Number(value)||0;
    if(currency==="USD"){
      const converted=opts.subscription?n:(n/80);
      return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:Math.abs(converted)<100?2:0}).format(converted);
    }
    return new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB",maximumFractionDigits:0}).format(n);
  }
  function price(plan){
    const p=prices[currency];
    const v=plan==="yearly"?p.yearly:p.monthly;
    return currency==="USD"?("$"+v.toFixed(2)):(Math.round(v).toLocaleString("ru-RU")+" ₽");
  }
  function priceSummary(){
    return price("monthly")+(lang==="en"?"/mo":"/мес")+" · "+price("yearly")+(lang==="en"?"/yr":"/год");
  }
  function yearlySaving(){
    const p=prices[currency];
    if(currency==="USD")return "$"+p.monthlyEquivalent.toFixed(2)+"/mo · save $"+p.monthlySave.toFixed(2);
    return "≈ "+p.monthlyEquivalent+" ₽/мес · экономия "+p.monthlySave+" ₽";
  }

  function setLang(next){
    if(!["ru","en"].includes(next)||next===lang)return;
    localStorage.setItem("bizoniq_lang",next);
    const u=new URL(location.href);u.searchParams.set("lang",next);location.href=u.toString();
  }
  function setCurrency(next){
    if(!["RUB","USD"].includes(next)||next===currency)return;
    localStorage.setItem("bizoniq_currency",next);
    const u=new URL(location.href);u.searchParams.set("currency",next);location.href=u.toString();
  }

  function translateTextNode(node){
    if(lang!=="en"||!node||node.nodeType!==Node.TEXT_NODE)return;
    const raw=node.nodeValue;
    const trimmed=raw.trim();
    if(!trimmed)return;
    let out=STATIC_EN[trimmed];
    if(!out){
      for(const [re,repl] of REPLACERS_EN){if(re.test(trimmed)){out=trimmed.replace(re,repl);break}}
    }
    if(out){
      const before=raw.match(/^\s*/)?.[0]||"",after=raw.match(/\s*$/)?.[0]||"";
      node.nodeValue=before+out+after;
    }
  }
  function translateElement(el){
    if(lang!=="en"||!el||el.nodeType!==1)return;
    const ph=el.getAttribute?.("placeholder");
    if(ph){
      const map={
        "Поиск по урокам...":"Search lessons...",
        "CAC, EBITDA, Burn Rate...":"CAC, EBITDA, Burn Rate...",
        "Найти кейс: cash flow, pricing, retention...":"Find a case: cash flow, pricing, retention...",
        "Напиши ответ...":"Write your answer...",
        "Имя":"Name",
        "Email":"Email",
        "Пароль (для нового аккаунта — минимум 10 символов)":"Password (10+ characters for a new account)",
        "BZQ-PRO-XXXXXX-XXXXXX":"BZQ-PRO-XXXXXX-XXXXXX"
      };
      if(map[ph])el.setAttribute("placeholder",map[ph]);
    }
  }
  function translateTree(root=document.body){
    if(lang!=="en"||!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
    if(root.querySelectorAll){translateElement(root);root.querySelectorAll("input,textarea,select").forEach(translateElement)}
  }
  function updatePricingUI(){
    document.querySelectorAll("[data-price-monthly]").forEach(el=>el.textContent=price("monthly"));
    document.querySelectorAll("[data-price-yearly]").forEach(el=>el.textContent=price("yearly"));
    document.querySelectorAll("[data-price-summary]").forEach(el=>el.textContent=priceSummary());
    document.querySelectorAll("[data-yearly-saving]").forEach(el=>el.textContent=yearlySaving());
    document.querySelectorAll("[data-pro-monthly-button]").forEach(el=>el.textContent=(lang==="en"?"Get Pro • ":"Получить Pro • ")+price("monthly"));
    document.querySelectorAll("[data-pro-yearly-button]").forEach(el=>el.textContent=(lang==="en"?"Yearly Pro • ":"Pro на год • ")+price("yearly"));
  }
  function injectControls(){
    if(document.getElementById("bizPrefs"))return;
    const host=document.querySelector(".pills,.public-actions,.help-nav,.privacy-nav .btnrow,.console-actions,.verify-head,.actions");
    if(!host)return;
    const wrap=document.createElement("div");wrap.id="bizPrefs";wrap.className="biz-prefs";
    wrap.innerHTML='<button type="button" class="pref-btn'+(lang==="ru"?" active":"")+'" data-lang="ru">RU</button><button type="button" class="pref-btn'+(lang==="en"?" active":"")+'" data-lang="en">EN</button><span class="pref-sep"></span><button type="button" class="pref-btn'+(currency==="RUB"?" active":"")+'" data-currency="RUB">₽</button><button type="button" class="pref-btn'+(currency==="USD"?" active":"")+'" data-currency="USD">$</button>';
    host.appendChild(wrap);
    wrap.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
    wrap.querySelectorAll("[data-currency]").forEach(b=>b.onclick=()=>setCurrency(b.dataset.currency));
  }

  window.BIZONIQ_PREFS={lang,currency,prices,money,price,priceSummary,yearlySaving,setLang,setCurrency,translateTree,updatePricingUI,injectControls};
  window.bizLang=lang;window.bizCurrency=currency;

  document.addEventListener("DOMContentLoaded",()=>{
    injectControls();translateTree();updatePricingUI();
    if(lang==="en"){
      const obs=new MutationObserver(muts=>{
        for(const m of muts)for(const n of m.addedNodes){
          if(n.nodeType===Node.TEXT_NODE)translateTextNode(n);
          else if(n.nodeType===1)translateTree(n);
        }
        updatePricingUI();
      });
      obs.observe(document.body,{childList:true,subtree:true});
    }
  });
})();