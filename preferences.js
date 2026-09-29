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
    "Смотри не на одну красивую цифру, а на систему: деньги, выручку, прибыль и клиентов.":"Look at the system, not one pretty number: cash, revenue, profit and customers.",
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
    "Лобов Максим":"Maksim Lobov",
    "Сагал Сергей":"Sergey Sagal",
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

  Object.assign(STATIC_EN,{
    "Вход в аккаунт":"Sign in",
    "Войди, чтобы синхронизировать прогресс между устройствами.":"Sign in to sync your progress across devices.",
    "Регистрация":"Register",
    "Забыли пароль?":"Forgot password?",
    "Создать аккаунт":"Create account",
    "Укажи почту аккаунта — мы отправим ссылку для создания нового пароля.":"Enter your account email — we’ll send a link to create a new password.",
    "Отправить ссылку":"Send reset link",
    "Назад ко входу":"Back to sign in",
    "Придумай новый пароль для аккаунта.":"Create a new password for your account.",
    "Сохранить новый пароль":"Save new password",
    "Имя":"First name",
    "Фамилия":"Last name",
    "За что готов платить?":"What would you pay for?",
    "Экономия ≈ 33% против помесячной оплаты":"About 33% cheaper than monthly billing",
    "Начни бесплатно. Если нужен полный доступ — выбери месячный или годовой Pro.":"Start free. Upgrade with monthly or yearly Pro when you want full access.",
    "8 кейсов":"8 cases",
    "Планируемая цена:":"Planned price:",
    "в месяц или":"per month or",
    "в год.":"per year.",
    "BIZONIQ находится в beta. Архитектура регулярно усиливается, но отсутствие найденной уязвимости не означает её принципиальную невозможность. Для коммерческого запуска с большим количеством пользователей дополнительно нужны независимый penetration test, формальные Privacy Policy / Terms с учётом юрисдикций пользователей и процесс обработки запросов на удаление/экспорт персональных данных.":"BIZONIQ is in beta. The architecture is being hardened continuously, but not finding a vulnerability does not mean one cannot exist. Before a large commercial launch, the product should also have an independent penetration test, formal Privacy Policy / Terms appropriate to user jurisdictions, and a process for data deletion/export requests.",
    "Created by Лобов Максим · Сагал Сергей":"Created by Maksim Lobov · Sergey Sagal",
    "3–5 мин":"3–5 min",
    "✓ завершено":"✓ completed",
    "Открыть с Pro":"Unlock with Pro",
    "Повторить":"Review",
    "Открыть урок":"Open lesson",
    "КЛЮЧЕВАЯ МЫСЛЬ":"KEY IDEA",
    "ПРИМЕР":"EXAMPLE",
    "ПРАКТИЧЕСКИЙ ВЫВОД":"PRACTICAL TAKEAWAY",
    "Уже завершено":"Completed",
    "Связано:":"Related:",
    "✓ изучено":"✓ learned",
    "Открыть":"Open",
    "Понял":"Got it",
    "ПО-ПРОСТОМУ":"IN SIMPLE TERMS",
    "ЗАЧЕМ ПРЕДПРИНИМАТЕЛЮ":"WHY IT MATTERS",
    "ТВОЙ УРОВЕНЬ КЕЙСОВ":"YOUR CASE LEVEL",
    "Для меня":"For me",
    "Все 32":"All 32",
    "Для тебя":"Recommended",
    "✓ решено":"✓ solved",
    "Разобрать снова":"Review again",
    "Открыть кейс":"Open case",
    "КАК БЫЛО ПО СЛОЖНОСТИ?":"HOW DID THE DIFFICULTY FEEL?",
    "Слишком легко":"Too easy",
    "Нормально":"About right",
    "Сложно":"Hard",
    "3 решения":"3 decisions",
    "Revenue / мес":"Revenue / mo",
    "Profit / мес":"Profit / mo",
    "ФИНАЛ":"FINISH",
    "Сценарий завершён":"Scenario complete",
    "Ты увидел trade-offs на цифрах. Сильный основатель не ищет магическую кнопку — он управляет системой.":"You saw the trade-offs in the numbers. Strong founders do not look for a magic button — they manage the system.",
    "Этот режим Business Coach":"This Business Coach mode",
    "Открыть сертификат":"Open certificate",
    "Скопировать ссылку":"Copy link",
    "Доступно в Pro":"Available in Pro",
    "Получить сертификат":"Claim certificate",
    "Сначала выполни критерии":"Complete the requirements first",
    "ПРОФИЛЬ ОБУЧЕНИЯ":"LEARNING PROFILE",
    "СЛОЖНОСТЬ КЕЙСОВ":"CASE DIFFICULTY",
    "Поделиться профилем":"Share profile",
    "Тариф":"Plan",
    "Управлять":"Manage",
    "Управлять подпиской":"Manage subscription",
    "Открыть панель":"Open console",
    "Синхронизировать сейчас":"Sync now",
    "Создать аккаунт / войти":"Create account / sign in",
    "Первый рывок":"First momentum",
    "Терминатор":"Term learner",
    "10 терминов":"10 terms",
    "Практик":"Practitioner",
    "5 кейсов":"5 cases",
    "Дисциплина":"Discipline",
    "10 уроков":"10 lessons",
    "Оператор":"Operator",
    "2 симулятора":"2 simulations",
    "Сохранить":"Save",
    "Закрыть":"Close",
    "Позже":"Later",
    "Посмотреть Pro":"View Pro",
    "Сменить путь":"Change path",
    "Выполнить":"Do it",
    "Все 56":"All 56",
    "ТВОЯ ТРАЕКТОРИЯ":"YOUR PATH",
    "Урок дня":"Lesson of the day",
    "Кейс дня":"Case of the day",
    "Симуляция":"Simulation",
    "Продолжи следующий непройденный урок":"Continue your next incomplete lesson",
    "Начни первый урок":"Start your first lesson",
    "Прими 3 управленческих решения":"Make 3 management decisions",
    "Разбери одну бизнес-гипотезу":"Break down one business hypothesis",
    "Путь уже рассчитан":"Path already calculated",
    "Найди свою траекторию":"Find your path",
    "Пройти заново":"Retake",
    "Начать":"Start",
    "Продолжить":"Continue",
    "Войти в челлендж":"Join challenge",
    "изменить":"change",
    "Посмотреть":"View",
    "Принять вызов":"Take challenge",
    "Один новый управленческий выбор каждый день.":"One new management decision every day.",
    "60 секунд на бизнес-решение":"60 seconds for a business decision",
    "6 вопросов → рекомендация учебного пути. Можно изменить вручную.":"6 questions → a recommended learning path. You can change it manually.",
    "BIZONIQ на главном экране":"BIZONIQ on your home screen",
    "Установить":"Install",
    "Добавь приложение на экран":"Add the app to your home screen",
    "Открыть приложение":"Open app",
    "Бизнес-практика по цене кофе.":"Business practice for the price of a coffee.",
    "Начни бесплатно. Если нужен полный доступ — 99 ₽ в месяц или 799 ₽ за год.":"Start free. Upgrade only if you want full access.",
    "Начать бесплатно":"Start free",
    "Все 4 симулятора":"All 4 simulations",
    "Все режимы Business Coach":"All Business Coach modes",
    "Выбрать 99 ₽/мес":"Choose monthly Pro",
    "Всё из Pro":"Everything in Pro",
    "12 месяцев доступа":"12 months of access",
    "≈ 33% дешевле помесячной оплаты":"About 33% cheaper than monthly billing",
    "Выбрать 799 ₽/год":"Choose yearly Pro",
    "Платёжный запуск":"Payment launch",
    "Checkout и подписочная архитектура подготовлены под Paddle. Реальные списания включатся только после merchant verification и добавления Paddle client token/Price ID. До этого доступ к текущему beta-контенту не блокируется.":"Checkout and subscription infrastructure are prepared for Paddle. Live charges will start only after merchant verification and Paddle Price IDs are connected. Until then, beta content is not blocked.",
    "← В приложение":"← Back to app",
    "Короткие и честные ответы о BIZONIQ, прогрессе, аккаунтах, сертификатах и данных.":"Short, direct answers about BIZONIQ, progress, accounts, certificates and data.",
    "О платформе":"About the platform",
    "Что такое BIZONIQ?":"What is BIZONIQ?",
    "BIZONIQ — интерактивный тренажёр бизнес-мышления. Внутри есть короткие уроки, бизнес-термины, кейсы, симуляторы, ежедневные задания и система прогресса.":"BIZONIQ is an interactive business-thinking trainer with short lessons, business terms, cases, simulations, daily challenges and progress tracking.",
    "Для кого он подходит?":"Who is it for?",
    "Для новичков, людей с первым проектом, действующих предпринимателей и тех, кто хочет лучше понимать финансы, маркетинг, продажи, стратегию и управление.":"For beginners, first-time founders, active entrepreneurs and anyone who wants a stronger grasp of finance, marketing, sales, strategy and management.",
    "Можно ли поменять путь обучения?":"Can I change my learning path?",
    "Да. Траекторию можно менять в профиле в любой момент. Уже набранные XP, уроки, кейсы и сертификаты при этом не сбрасываются.":"Yes. Change your path in Profile at any time. XP, lessons, cases and certificates are preserved.",
    "Business Coach — это настоящий AI?":"Is Business Coach real AI?",
    "Сейчас Coach работает как интерактивный тренажёр с продуманными сценариями и вопросами. Он не имитирует подключение к генеративному AI, которого нет.":"Right now Coach is a structured interactive trainer with designed scenarios and questions. It does not pretend to use generative AI when no AI connection exists.",
    "Как получить сертификат?":"How do I earn a certificate?",
    "Нужно выполнить критерии конкретного сертификата: пройти нужные модули, решить минимальное количество кейсов и, для продвинутых сертификатов, завершить бизнес-симуляторы. Проверка выполняется на сервере, а не только в браузере.":"Meet the requirements for that certificate: complete the required modules, enough cases and, for advanced certificates, business simulations. Eligibility is checked server-side.",
    "Можно ли подделать сертификат, изменив данные в браузере?":"Can a certificate be faked by changing browser data?",
    "Клиентский интерфейс сам по себе не выдаёт сертификат. Перед выдачей сервер сверяет прогресс в Supabase. У каждого выданного сертификата есть уникальный код.":"The client UI cannot issue a certificate by itself. The server checks progress in Supabase before issuance. Every certificate has a unique code.",
    "Как проверить сертификат?":"How do I verify a certificate?",
    "Открой страницу «Проверить сертификат» и введи уникальный код сертификата вида BZQ-2026-FND-…. Новые сертификаты используют более длинный случайный идентификатор. Публичная проверка показывает имя владельца, название сертификата, дату выдачи и версию критериев.":"Open Certificate Verification and enter the unique BZQ certificate code. Public verification shows the holder name, certificate title, issue date and criteria version.",
    "Это официальный диплом или государственная квалификация?":"Is this an accredited diploma or official qualification?",
    "Нет. Сертификат BIZONIQ подтверждает прохождение программы внутри платформы. Он не является государственным дипломом, лицензией, образовательной аккредитацией или профессиональным допуском.":"No. A BIZONIQ certificate confirms completion inside the platform. It is not a government diploma, license, educational accreditation or professional authorization.",
    "Аккаунт и безопасность данных":"Account & data security",
    "Где хранится прогресс без аккаунта?":"Where is progress stored without an account?",
    "В гостевом режиме прогресс сохраняется локально в браузере на текущем устройстве. Очистка данных браузера может удалить этот прогресс, поэтому доступен экспорт резервной копии.":"In guest mode, progress is stored locally in the browser on the current device. Clearing browser data can remove it, so backup export is available.",
    "Что меняется после регистрации?":"What changes after registration?",
    "При входе прогресс синхронизируется с Supabase и может быть доступен на другом устройстве после входа в тот же аккаунт.":"After sign-in, progress syncs through Supabase and can be restored on another device using the same account.",
    "Как защищены данные?":"How is data protected?",
    "Для аккаунтов используется Supabase Auth, а таблицы прогресса защищены Row Level Security: запросы обычного пользователя ограничены его собственными записями. Пароль обрабатывается системой аутентификации Supabase и не хранится в коде сайта. При этом ни одна онлайн-система не может честно гарантировать абсолютную безопасность.":"Accounts use Supabase Auth and progress tables use Row Level Security so normal users are limited to their own rows. Passwords are handled by Supabase Auth and are not stored in site code. No online system can honestly guarantee absolute security.",
    "Какие данные становятся публичными через сертификат?":"What becomes public through certificate verification?",
    "Только если кто-то знает уникальный код сертификата, публичная проверка может показать имя, указанное в профиле, название сертификата, код и дату выдачи. Остальной учебный прогресс через страницу проверки не раскрывается.":"Only someone with the unique certificate code can query public verification, which can show the profile name, certificate title, code and issue date. Other learning progress is not exposed there.",
    "Содержание и ответственность":"Content & responsibility",
    "Можно ли принимать финансовые решения только по материалам BIZONIQ?":"Should financial decisions rely only on BIZONIQ content?",
    "Нет. Материалы предназначены для обучения и тренировки мышления и не являются персональной финансовой, инвестиционной, юридической или налоговой консультацией.":"No. Materials are for education and decision practice, not personalized financial, investment, legal or tax advice.",
    "Кто создал BIZONIQ?":"Who created BIZONIQ?",
    "Создатели проекта: Лобов Максим и Сагал Сергей.":"Created by Lobov Maksim and Sagal Sergey.",
    "Сколько стоит BIZONIQ Pro?":"How much is BIZONIQ Pro?",
    "Оплата уже работает?":"Are live payments available now?",
    "Инфраструктура подписок и тарифы уже подготовлены, но реальные списания включатся только после подключения и проверки merchant-аккаунта Paddle. До этого платные ограничения не блокируют текущий контент.":"Subscription infrastructure is ready, but real charges will start only after the Paddle merchant account is connected and verified. Until then, paid restrictions do not block current beta content.",
    "Можно ли активировать Pro кодом?":"Can I activate Pro with a code?",
    "Да. Создатели BIZONIQ могут выдавать коды формата BZQ-PRO-XXXXXX-XXXXXX на определённый срок. После входа введи код в профиле — срок Pro добавится к уже действующему ручному доступу.":"Yes. BIZONIQ creators can issue BZQ-PRO-XXXXXX-XXXXXX access codes for a set duration. Sign in and redeem the code in Profile; the duration is added to existing manual Pro access.",
    "Открыть BIZONIQ":"Open BIZONIQ",
    "Понятно о данных.":"Data, explained clearly.",
    "Здесь без формулировок «мы защищаем всё на 100%». Ни одна онлайн-система не может дать такую гарантию. Ниже — какие данные использует BIZONIQ и какие меры защиты уже включены.":"No “100% secure” claims here. No online system can guarantee that. Below is what BIZONIQ uses and which protections are already in place.",
    "Учебные данные разделены между пользователями с помощью Supabase Row Level Security.":"Learning data is isolated between users with Supabase Row Level Security.",
    "Без аккаунта":"Without an account",
    "Прогресс хранится локально в браузере устройства. Очистка данных браузера может его удалить.":"Progress stays in the device browser. Clearing browser data can remove it.",
    "С аккаунтом":"With an account",
    "Email и вход обрабатывает Supabase Auth. Учебный прогресс синхронизируется с базой BIZONIQ.":"Email and sign-in are handled by Supabase Auth. Learning progress syncs to the BIZONIQ database.",
    "Платёжные данные":"Payment data",
    "BIZONIQ не хранит номера банковских карт. Онлайн-оплата пока не запущена; после запуска её планируется обрабатывать через Paddle.":"BIZONIQ does not store bank-card numbers. Live online payments are not launched yet; Paddle is planned to process them.",
    "Публичная проверка":"Public verification",
    "Если человек знает уникальный код сертификата, страница проверки показывает имя владельца, название сертификата, дату и версию критериев.":"If someone knows a unique certificate code, verification shows the holder name, certificate title, date and criteria version.",
    "Какие данные используются":"What data is used",
    "Аккаунт":"Account",
    "Email, идентификатор аккаунта и отображаемое имя. Пароль не хранится в коде BIZONIQ и обрабатывается системой Supabase Auth.":"Email, account ID and display name. Passwords are not stored in BIZONIQ code and are handled by Supabase Auth.",
    "Учебный прогресс":"Learning progress",
    "Пройденные уроки, изученные термины, решённые кейсы, симуляторы, XP, streak, выбранная траектория и адаптивная сложность.":"Completed lessons, studied terms, solved cases, simulations, XP, streak, selected path and adaptive difficulty.",
    "Продуктовая аналитика":"Product analytics",
    "BIZONIQ записывает ограниченные события вроде открытия раздела, урока или кейса и клика на Pro. Это нужно, чтобы понимать, где продукт непонятен или бесполезен. Платформа не записывает содержимое паролей или банковские данные в продуктовую аналитику.":"BIZONIQ records limited events such as opening a section, lesson or case and clicking Pro. This helps identify confusing or low-value areas. Password contents and banking data are not recorded in product analytics.",
    "Ответ, который пользователь сам отправил через форму обратной связи. Если пользователь авторизован, отзыв может быть связан с его аккаунтом.":"Feedback that a user explicitly submits. If the user is signed in, the feedback may be associated with the account.",
    "Что могут видеть создатели":"What creators can see",
    "Авторизованные создатели могут видеть email зарегистрированного пользователя, его отображаемое имя, выбранный путь, XP, агрегированный прогресс, статус Pro и отправленный beta-feedback. Это используется для поддержки и развития продукта.":"Authorized creators can see a registered user’s email, display name, selected path, XP, aggregated progress, Pro status and submitted beta feedback. This is used for support and product development.",
    "Админ-действия":"Admin actions",
    "Выдача ручного Pro, создание и отключение Pro-кодов фиксируются в audit log. Обычный пользователь не имеет доступа к этим административным таблицам.":"Manual Pro grants and Pro-code creation/deactivation are recorded in an audit log. Normal users cannot access these admin tables.",
    "Что сделано для защиты":"Security measures",
    "Запросы обычного аккаунта к таблицам прогресса ограничены строками этого же пользователя.":"Normal-account queries to progress tables are limited to that user’s own rows.",
    "Минимальные права":"Least privilege",
    "Публичному клиенту не выдаются secret/service-role ключи. Для пользовательских таблиц убраны лишние SQL-привилегии; административные операции выполняются серверными Edge Functions.":"Secret/service-role keys are never exposed to the public client. Extra SQL privileges were removed and admin operations run through server-side Edge Functions.",
    "Rate limiting и валидация":"Rate limiting & validation",
    "Публичные feedback/analytics endpoints и чувствительные операции ограничены по частоте и размеру запросов. Pro-коды активируются атомарно на сервере.":"Public feedback/analytics endpoints and sensitive operations are rate-limited and size-validated. Pro-code redemption is atomic on the server.",
    "Коды":"Codes",
    "Pro-коды и Creator-коды не хранятся в базе в открытом виде: сохраняются криптографические хэши. Новые сертификаты используют более длинные случайные идентификаторы.":"Pro codes and Creator codes are stored as cryptographic hashes, not plaintext. New certificates use longer random identifiers.",
    "Локальное хранение и резервные копии":"Local storage & backups",
    "BIZONIQ использует локальное хранилище браузера для гостевого прогресса и пользовательской сессии Supabase. Поэтому защита от XSS особенно важна. Импорт backup ограничен по размеру и проверяется перед применением. Не загружай JSON-файлы прогресса из неизвестных источников.":"BIZONIQ uses browser local storage for guest progress and the Supabase user session. That makes XSS protection especially important. Backup imports are size-limited and validated before use. Do not import progress JSON from unknown sources.",
    "Ограничения":"Limitations",
    "Открыть BIZONIQ":"Open BIZONIQ",
    "Последнее обновление: 28 сентября 2026.":"Last updated: September 28, 2026.",
    "← Приложение":"← App",
    "Выйти":"Sign out",
    "Вход создателя":"Creator sign-in",
    "Войди тем же аккаунтом BIZONIQ. Creator Console откроется только аккаунтам с ролью создателя.":"Sign in with the same BIZONIQ account. Creator Console opens only for accounts with a creator role.",
    "Активировать Creator-доступ":"Activate Creator access",
    "ещё не имеет роли создателя. Введи одноразовый код. После активации код больше не работает.":"does not have a creator role yet. Enter a one-time invite code; it becomes invalid after activation.",
    "Смотри на поведение пользователей, а не на догадки. Управляй Pro-доступом без изменения базы вручную.":"Use real user behavior instead of guesses. Manage Pro access without editing the database manually.",
    "Экспорт метрик":"Export metrics",
    "Обновить":"Refresh",
    "Три метрики, которые сейчас важнее количества функций.":"Three metrics that matter more than feature count right now.",
    "Траектории пользователей":"User paths",
    "Кто приходит в BIZONIQ и зачем.":"Who comes to BIZONIQ and why.",
    "Выдать Pro вручную":"Grant Pro manually",
    "По email. Продлевает уже действующий ручной Pro; бессрочный доступ не сокращается кодами.":"By email. Extends existing manual Pro; lifetime access is never shortened by codes.",
    "Email пользователя":"User email",
    "Срок":"Duration",
    "7 дней":"7 days",
    "30 дней":"30 days",
    "90 дней":"90 days",
    "365 дней":"365 days",
    "Комментарий":"Note",
    "Бессрочный Pro":"Lifetime Pro",
    "Выдать Pro":"Grant Pro",
    "Отозвать ручной Pro":"Revoke manual Pro",
    "Управление создателями":"Creator access",
    "Только owner может выдавать одноразовый доступ новым создателям. Приглашение действует 7 дней, срабатывает один раз, а в базе хранится только его hash.":"Only the owner can issue one-time access to new creators. An invite lasts 7 days, works once and is stored only as a hash.",
    "Создавай новый invite в любой момент, когда хочешь добавить человека в Creator Console. После первой успешной активации этот код больше не работает.":"Create a new invite whenever you want to add someone to Creator Console. After the first successful activation, the code no longer works.",
    "Создать одноразовый invite • 7 дней":"Create one-time invite • 7 days",
    "ПОКАЗЫВАЕТСЯ ПОЛНОСТЬЮ ТОЛЬКО СЕЙЧАС":"SHOWN IN FULL ONLY NOW",
    "Скопировать":"Copy",
    "Генератор Pro-кодов":"Pro code generator",
    "Можно сделать код на 7/30/90/365 дней, одноразовый или для нескольких пользователей.":"Create 7/30/90/365-day codes, single-use or multi-use.",
    "Pro на":"Pro duration",
    "Максимум активаций":"Max redemptions",
    "Код истекает через":"Code expires in",
    "Без срока активации":"No redemption expiry",
    "Создать код":"Create code",
    "Активные и прошлые коды":"Active & previous codes",
    "В целях безопасности полный код после создания не хранится — только hash и последние 6 символов.":"For security, the full code is not stored after creation — only its hash and last 6 characters.",
    "Последние пользователи":"Recent users",
    "Быстрая выдача Pro и проверка ранней аудитории.":"Quick Pro grants and early-audience review.",
    "Пользователь":"User",
    "Путь":"Path",
    "Создан":"Created",
    "Последний вход":"Last sign-in",
    "Доступ":"Access",
    "Действие":"Action",
    "Не «лайки», а конкретные ответы реальных пользователей.":"Concrete feedback from real users, not vanity likes.",
    "Популярные уроки":"Popular lessons",
    "По фактическим завершениям.":"Based on real completions.",
    "Популярные кейсы":"Popular cases",
    "По фактическим успешным прохождениям.":"Based on actual solved cases.",
    "Самые сложные кейсы":"Hardest cases",
    "Accuracy первых попыток. Появляется по мере накопления v9 analytics.":"First-attempt accuracy. Improves as analytics data accumulates.",
    "Просмотры разделов":"Section views",
    "За последние 30 дней.":"Last 30 days.",
    "Все выдачи Pro, генерации и отключения кодов фиксируются.":"All Pro grants and code creation/deactivation are logged.",
    "Проверь сертификат":"Verify a certificate",
    "Введи уникальный ID сертификата. Проверка идёт через сервер BIZONIQ.":"Enter the unique certificate ID. Verification runs through the BIZONIQ server.",
    "Проверить":"Verify",
    "Сертификат BIZONIQ подтверждает завершение программы внутри платформы и не является государственным дипломом или аккредитованной квалификацией.":"A BIZONIQ certificate confirms completion inside the platform and is not a government diploma or accredited qualification.",
    "Сохранить / PDF":"Save / PDF",
    "Проверяю сертификат…":"Verifying certificate…"
  });

  Object.assign(STATIC_EN,{
    "Проверь, как ты принимаешь бизнес-решения.":"Test how you make business decisions.",
    "Сначала два вопроса о тебе, затем реальные мини-задачи по финансам, маркетингу, стратегии и экономике. BIZONIQ построит стартовую траекторию по ответам.":"First, two questions about you, then real mini-tasks in finance, marketing, strategy and economics. BIZONIQ will build your starting path from your answers.",
    "Пройти диагностику • 2 мин":"Take diagnostic • 2 min",
    "Тренируй решения, а не запоминай бизнес-термины.":"Train decisions instead of memorizing business terms.",
    "Главное в BIZONIQ — реальные выборы и последствия: бизнес-кейсы, многоходовые симуляции и AI Coach, который разбирает именно твои аргументы и ошибки.":"BIZONIQ is built around real choices and consequences: business cases, multi-step simulations and an AI Coach that analyzes your own arguments and mistakes.",
    "Решить кейс":"Solve a case",
    "Запустить симуляцию":"Run a simulation",
    "Открыть AI Coach":"Open AI Coach",
    "Decision Skill Map":"Decision Skill Map",
    "Навыки оцениваются по сочетанию практических решений, сложности кейсов и освоенной базы.":"Skills are estimated from your practical decisions, case difficulty and the knowledge you have covered.",
    "Skill Score — внутренняя оценка активности в BIZONIQ. Это не профессиональная квалификация и не обещание реальной бизнес-эффективности.":"Skill Score is an internal estimate based on your BIZONIQ activity. It is not a professional qualification or a promise of real-world business performance.",
    "База знаний • 56 микро-уроков":"Knowledge Base • 56 micro-lessons",
    "Теория здесь не цель: бери понятие, понимай механику и сразу применяй её в кейсе.":"Theory is not the goal here: learn the concept, understand the mechanism and apply it immediately in a case.",
    "Справочник терминов остаётся доступным, но не занимает место главного продукта.":"The term reference stays available without taking over the core product.",
    "Открыть словарь":"Open dictionary",
    "Decision Cases • 32 ситуации":"Decision Cases • 32 situations",
    "Не тест на память: оценивай trade-offs, выбирай сильнейший вариант и смотри, какую метрику решение меняет.":"Not a memory test: evaluate trade-offs, choose the strongest option and see which metric the decision changes.",
    "Business Simulations":"Business Simulations",
    "Каждый бизнес — серия взаимосвязанных решений. Можно вырасти, попасть в кассовый разрыв или разрушить экономику неправильным масштабированием.":"Each business is a chain of connected decisions. You can grow, hit a cash-flow wall or break the economics by scaling badly.",
    "BIZONIQ AI Coach":"BIZONIQ AI Coach",
    "Настоящий AI-разбор: Coach читает твой ответ, учитывает прогресс и задаёт вопросы по слабым местам вместо заранее прописанного сценария.":"Real AI analysis: Coach reads your answer, uses your progress as context and challenges weak areas instead of following a canned script.",
    "Новый разбор":"New analysis",
    "AI Coach может ошибаться. Для финансовых, юридических и налоговых решений проверяй критичные факты отдельно.":"AI Coach can make mistakes. Verify critical facts separately for financial, legal and tax decisions.",
    "AI Coach • до 12 сообщений в день":"AI Coach • up to 12 messages per day",
    "Все режимы AI Coach • расширенный лимит":"All AI Coach modes • higher daily limit",
    "Тренажёр бизнес-решений":"Business Decision Trainer",
    "Business Dictionary":"Business Dictionary",
    "Твой план на сегодня":"Your plan for today",
    "Слабые места":"Weak areas",
    "Навыки с самым низким текущим Skill Score.":"Skills with the lowest current Skill Score.",
    "Один короткий выбор + сравнение с решениями других пользователей.":"One short decision plus comparison with other users.",
    "Откроется после 3 кейсов":"Unlocks after 3 cases",
    "Сначала практика":"Practice first"
  });

  Object.assign(STATIC_EN,{
    "BIZONIQ — тренажёр бизнес-решений. Ядро продукта — интерактивные кейсы, многоходовые бизнес-симуляции, AI Coach и персональная карта навыков; микро-уроки и словарь поддерживают практику.":"BIZONIQ is a business decision trainer. The core product is interactive cases, multi-step business simulations, AI Coach and a personalized skill map; micro-lessons and the dictionary support practice.",
    "AI Coach — это настоящий AI?":"Is AI Coach real AI?",
    "Да. BIZONIQ AI Coach работает через серверную Edge Function и модель openai/gpt-oss-120b через Groq. Ключ модели не хранится в браузере. Coach учитывает текущий режим, историю диалога и учебный контекст пользователя. При этом AI может ошибаться, поэтому критичные финансовые, юридические и налоговые факты нужно проверять отдельно.":"Yes. BIZONIQ AI Coach runs through a server-side Edge Function and the openai/gpt-oss-120b model served through Groq. The model key is not stored in the browser. Coach uses the current mode, conversation history and the user's learning context. AI can still make mistakes, so critical financial, legal and tax facts should be verified separately.",
    "Когда авторизованный пользователь отправляет сообщение в AI Coach, текст сообщения и ограниченный учебный контекст (например, выбранная траектория, прогресс и слабые навыки) передаются через серверную Edge Function провайдеру Groq, который запускает модель openai/gpt-oss-120b для генерации ответа. API-ключ хранится только в серверных secrets и не передаётся в браузер. История AI Coach сохраняется в Supabase, чтобы поддерживать контекст между устройствами.":"When a signed-in user sends a message to AI Coach, the message text and limited learning context (such as the selected path, progress and weaker skills) are sent through a server-side Edge Function to Groq, which serves the openai/gpt-oss-120b model. The API key is stored only in server-side secrets and is never sent to the browser. AI Coach history is stored in Supabase to preserve context across devices.",
    "AI-ключи и серверный вызов":"AI keys and server-side calls",
    "Groq API key не размещается в JavaScript сайта. Запросы к модели идут через Supabase Edge Function с проверкой авторизации, дневными лимитами и ограничением размера сообщений.":"The Groq API key is never placed in the site's JavaScript. Model requests go through a Supabase Edge Function with authentication checks, daily limits and message-size limits."
  });

  Object.assign(STATIC_EN,{
    "Симулятор кофейни • 10 решений":"Coffee Shop simulator • 10 decisions",
    "16 микро-уроков":"16 micro-lessons",
    "Все 4 симулятора • по 10 решений":"All 4 simulations • 10 decisions each",
    "Все режимы AI Coach • до 50 сообщений в день":"All AI Coach modes • up to 50 messages per day",
    "Все 56 микро-уроков":"All 56 micro-lessons"
  });

  Object.assign(STATIC_EN,{
    "Бизнес-симуляции":"Business Simulations",
    "Режим решений":"Decision mode",
    "Не тест на память: оценивай компромиссы, выбирай сильнейший вариант и смотри, какую метрику решение меняет.":"Not a memory test: evaluate trade-offs, choose the strongest option and see which metric the decision changes."
  });

  Object.assign(STATIC_EN,{
    "Пригласить друзей":"Invite friends",
    "Делись персональной ссылкой. Новый пользователь получает Pro-бонус, а ты открываешь награды за приглашения.":"Share your personal link. A new user gets a Pro bonus, and you unlock referral rewards."
  });

  const REPLACERS_EN=[
    [/^Завершить • \+(\d+) XP$/,"Complete • +$1 XP"],
    [/^Связано: (.+)$/,"Related: $1"],
    [/^Шаг (\d+) \/ (\d+)$/,"Step $1 / $2"],
    [/^(\d+) уроков · (\d+) кейсов$/,"$1 lessons · $2 cases"],
    [/^(\d+)\/(\d+) кейсов правильно$/,"$1/$2 cases correct"],
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

  function t(text){
    if(lang!=="en"||typeof text!=="string")return text;
    const trimmed=text.trim();
    if(!trimmed)return text;
    let out=STATIC_EN[trimmed];
    if(!out){
      for(const [re,repl] of REPLACERS_EN){if(re.test(trimmed)){out=trimmed.replace(re,repl);break}}
    }
    if(!out)return text;
    const before=text.match(/^\s*/)?.[0]||"",after=text.match(/\s*$/)?.[0]||"";
    return before+out+after;
  }
  function translateTextNode(node){
    if(lang!=="en"||!node||node.nodeType!==Node.TEXT_NODE)return;
    const out=t(node.nodeValue);
    if(out!==node.nodeValue)node.nodeValue=out;
  }
  function translateElement(el){
    if(lang!=="en"||!el||el.nodeType!==1)return;
    const ph=el.getAttribute?.("placeholder");
    if(ph){
      const map={
        "Поиск по урокам...":"Search lessons...",
        "CAC, EBITDA, Burn Rate...":"CAC, EBITDA, Burn Rate...",
        "Найти кейс: денежный поток, ценообразование, удержание...":"Find a case: cash flow, pricing, retention...",
        "Напиши ответ...":"Write your answer...",
        "Опиши решение, идею или цифры...":"Describe a decision, idea or numbers...",
        "Имя":"First name",
        "Фамилия":"Last name",
        "Email":"Email",
        "Пароль":"Password",
        "Пароль — минимум 10 символов":"Password — at least 10 characters",
        "Новый пароль — минимум 10 символов":"New password — at least 10 characters",
        "Повтори новый пароль":"Repeat new password",
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
  function setTextIfChanged(el,value){
    if(el.textContent!==value)el.textContent=value;
  }
  function updatePricingUI(){
    document.querySelectorAll("[data-price-monthly]").forEach(el=>setTextIfChanged(el,price("monthly")));
    document.querySelectorAll("[data-price-yearly]").forEach(el=>setTextIfChanged(el,price("yearly")));
    document.querySelectorAll("[data-price-summary]").forEach(el=>setTextIfChanged(el,priceSummary()));
    document.querySelectorAll("[data-yearly-saving]").forEach(el=>setTextIfChanged(el,yearlySaving()));
    document.querySelectorAll("[data-pro-monthly-button]").forEach(el=>setTextIfChanged(el,(lang==="en"?"Get Pro • ":"Получить Pro • ")+price("monthly")));
    document.querySelectorAll("[data-pro-yearly-button]").forEach(el=>setTextIfChanged(el,(lang==="en"?"Yearly Pro • ":"Pro на год • ")+price("yearly")));
  }
  function injectControls(){
    if(document.getElementById("bizPrefs"))return;
    const host=document.querySelector(".pills,.public-actions,.help-nav,.privacy-nav,.console-actions,.verify-head,.actions");
    if(!host)return;
    const wrap=document.createElement("div");wrap.id="bizPrefs";wrap.className="biz-prefs";
    wrap.innerHTML='<button type="button" class="pref-btn'+(lang==="ru"?" active":"")+'" data-lang="ru">RU</button><button type="button" class="pref-btn'+(lang==="en"?" active":"")+'" data-lang="en">EN</button><span class="pref-sep"></span><button type="button" class="pref-btn'+(currency==="RUB"?" active":"")+'" data-currency="RUB">₽</button><button type="button" class="pref-btn'+(currency==="USD"?" active":"")+'" data-currency="USD">$</button>';
    host.appendChild(wrap);
    wrap.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
    wrap.querySelectorAll("[data-currency]").forEach(b=>b.onclick=()=>setCurrency(b.dataset.currency));
  }

  const titleMap={
    "/venture/":lang==="en"?"BIZONIQ — Business Decision Trainer":"BIZONIQ — тренажёр бизнес-решений",
    "/venture/index.html":lang==="en"?"BIZONIQ — Business Decision Trainer":"BIZONIQ — тренажёр бизнес-решений",
    "/venture/pricing.html":lang==="en"?"BIZONIQ Pro — Pricing":"BIZONIQ Pro — Тарифы",
    "/venture/faq.html":"FAQ — BIZONIQ",
    "/venture/privacy.html":"Privacy & Security — BIZONIQ",
    "/venture/admin.html":"BIZONIQ Creator Console",
    "/venture/verify.html":lang==="en"?"Certificate Verification — BIZONIQ":"Проверка сертификата — BIZONIQ",
    "/venture/certificate.html":"Certificate — BIZONIQ"
  };
  if(titleMap[location.pathname])document.title=titleMap[location.pathname];
  if(lang==="en"){
    const meta=document.querySelector('meta[name="description"]');
    if(meta&&location.pathname.endsWith("/venture/"))meta.setAttribute("content","BIZONIQ is a business decision trainer with interactive cases, multi-step simulations, AI Coach and personalized skill tracking.");
  }

  function refreshUI(root=document.body){
    translateTree(root);
    updatePricingUI();
  }

  window.BIZONIQ_PREFS={lang,currency,prices,money,price,priceSummary,yearlySaving,t,setLang,setCurrency,translateTree,updatePricingUI,refreshUI,injectControls};
  window.bizLang=lang;window.bizCurrency=currency;

  document.addEventListener("DOMContentLoaded",()=>{
    const manifest=document.querySelector('link[rel="manifest"]');
    if(manifest)manifest.setAttribute("href",lang==="en"?"./manifest-en.webmanifest":"./manifest.webmanifest");
    injectControls();
    refreshUI();
  });
})();