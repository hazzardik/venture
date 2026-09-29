(()=>{
  const ru={
    coffee:[
      ["Очереди в часы пик выросли","Как снять перегрузку?",[
        ["Сразу нанимаю двух людей на полный день",{cash:-120000,revenue:70000,profit:-45000,customers:80},"Пропускная способность выросла, но fixed costs появились до проверки нагрузки.",0],
        ["Меняю график и добавляю part-time на пики",{cash:-45000,revenue:85000,profit:28000,customers:130},"Ты купил пропускную способность именно там, где она нужна, без лишнего постоянного коста.",1],
        ["Ничего не меняю — очередь создаёт ажиотаж",{cash:0,revenue:-70000,profit:-42000,customers:-170},"Ожидание стало потерянным спросом и ударило по повторным визитам.",0]
      ]],
      ["Агрегатор доставки предлагает подключение за 30% комиссии","Как тестируешь канал?",[
        ["Подключаю всё меню без изменения цен",{cash:-20000,revenue:120000,profit:-55000,customers:190},"Выручка выросла, но комиссия съела экономику части заказов.",0],
        ["Запускаю пилот на высокомаржинальном меню и считаю contribution margin",{cash:-30000,revenue:95000,profit:32000,customers:120},"Ты проверил спрос и экономику канала до масштабирования.",1],
        ["Отказываюсь навсегда без теста",{cash:0,revenue:-25000,profit:-8000,customers:-35},"Ты сохранил маржу, но не узнал, мог ли канал быть прибыльным.",0]
      ]],
      ["Арендодатель повышает ставку на 22%","Что делаешь?",[
        ["Сразу переезжаю в более дешёвое место",{cash:-320000,revenue:-140000,profit:-90000,customers:-260},"Экономия на аренде не компенсировала стоимость переезда и потерю трафика.",0],
        ["Пересчитываю unit economics и торгуюсь за ставку/срок",{cash:-20000,revenue:10000,profit:25000,customers:0},"Сначала ты понял допустимый уровень аренды и снизил риск резкого решения.",1],
        ["Просто принимаю новую ставку",{cash:0,revenue:0,profit:-85000,customers:0},"Рост fixed costs начал системно съедать прибыль.",0]
      ]],
      ["Появилось место под вторую точку","Как принимаешь решение?",[
        ["Подписываю аренду сегодня — окно закроется",{cash:-650000,revenue:260000,profit:-120000,customers:430},"Ты купил рост до доказательства экономики второй локации.",0],
        ["Тестирую район pop-up форматом и считаю спрос",{cash:-120000,revenue:170000,profit:52000,customers:210},"Дешёвый тест дал данные до большого необратимого вложения.",1],
        ["Никогда не открываю вторую точку",{cash:0,revenue:-45000,profit:-18000,customers:-40},"Ты убрал риск, но вместе с ним и потенциально хороший рост.",0]
      ]],
      ["Рейтинг упал из-за жалоб на вечернюю смену","Первое действие?",[
        ["Запускаю скидку 25% на вечер",{cash:-20000,revenue:45000,profit:-50000,customers:100},"Скидка привела трафик в процесс, который всё ещё производит плохой опыт.",0],
        ["Разбираю смену, стандарты и контроль качества",{cash:-35000,revenue:30000,profit:18000,customers:95},"Ты лечишь первопричину и защищаешь повторные покупки.",1],
        ["Спорю с отзывами и прошу удалить негатив",{cash:0,revenue:-55000,profit:-25000,customers:-120},"Репутационная проблема усилилась, а операционная причина осталась.",0]
      ]],
      ["Поставщик даёт скидку 8% за предоплату на квартал","Что выбираешь?",[
        ["Предоплачиваю максимальный объём",{cash:-340000,revenue:0,profit:45000,customers:0},"Маржа улучшилась, но ликвидность слишком сильно ушла в запас.",0],
        ["Предоплачиваю часть, сохраняя cash buffer",{cash:-150000,revenue:0,profit:30000,customers:0},"Ты получил часть скидки и не уничтожил финансовый запас.",1],
        ["Игнорирую предложение, не считая стоимость капитала",{cash:0,revenue:0,profit:-18000,customers:0},"Без расчёта ты не знаешь, действительно ли отказ был выгоднее.",0]
      ]],
      ["Через месяц сезонный спад спроса","Как готовишься?",[
        ["Заливаю весь свободный cash в рекламу заранее",{cash:-260000,revenue:110000,profit:-130000,customers:180},"Ты купил объём без доказательства окупаемости в слабый сезон.",0],
        ["Создаю cash buffer и тестирую сезонные офферы малыми бюджетами",{cash:-50000,revenue:90000,profit:38000,customers:110},"Ты сохранил runway и возможность масштабировать только рабочий оффер.",1],
        ["Закупаю большой запас сырья на всякий случай",{cash:-240000,revenue:0,profit:-35000,customers:0},"Cash ушёл в запасы именно перед падением спроса.",0]
      ]]
    ],
    saas:[
      ["Пользователи жалуются на цену после роста продукта","Что проверяешь?",[
        ["Снижаю цену всем на 30%",{cash:-20000,revenue:-210000,profit:-180000,customers:90},"Ты снизил ARPU, не поняв, у какого сегмента реально нет ценности.",0],
        ["Сегментирую usage и willingness to pay, тестирую упаковку",{cash:-60000,revenue:160000,profit:70000,customers:35},"Pricing стал гипотезой по сегментам, а не панической скидкой.",1],
        ["Игнорирую обратную связь полностью",{cash:0,revenue:-90000,profit:-45000,customers:-55},"Часть клиентов ушла, а причина осталась неизвестной.",0]
      ]],
      ["Enterprise pipeline растёт, но цикл продажи 90 дней","Куда вкладываться?",[
        ["Полностью бросаю self-serve",{cash:-180000,revenue:260000,profit:-60000,customers:12},"Enterprise растёт, но ты слишком рано отключил второй двигатель.",0],
        ["Выделяю небольшой sales-подход и сравниваю CAC/payback сегментов",{cash:-120000,revenue:300000,profit:60000,customers:24},"Ты проверяешь экономику enterprise без разрушения PLG-канала.",1],
        ["Нанимаю 12 sales сразу",{cash:-700000,revenue:350000,profit:-420000,customers:30},"Fixed costs выросли быстрее доказанной производительности sales-команды.",0]
      ]],
      ["Сервис недоступен 3 часа","Как реагируешь?",[
        ["Молчу, пока всё не починим",{cash:0,revenue:-130000,profit:-70000,customers:-80},"Технический сбой превратился ещё и в кризис доверия.",0],
        ["Открыто сообщаю статус, чиню причину и делаю postmortem",{cash:-90000,revenue:-40000,profit:-60000,customers:-20},"Ты потерял часть денег, но сохранил доверие и снизил шанс повторения.",1],
        ["Даём всем месяц бесплатно без анализа ущерба",{cash:0,revenue:-420000,profit:-350000,customers:40},"Компенсация оказалась дороже самого инцидента.",0]
      ]],
      ["Клиенты готовы платить за год вперёд со скидкой","Что делать?",[
        ["Скидка 40% всем за annual",{cash:850000,revenue:-190000,profit:-120000,customers:50},"Cash пришёл быстрее, но слишком большая скидка разрушила LTV.",0],
        ["Тестирую annual с умеренной скидкой и считаю retention/payback",{cash:620000,revenue:140000,profit:120000,customers:35},"Ты улучшил cash flow, сохранив разумную экономику.",1],
        ["Оставляю только помесячную оплату",{cash:-120000,revenue:0,profit:-25000,customers:-8},"Ты отказался от дешёвого способа улучшить cash conversion.",0]
      ]],
      ["Ключевой инженер уходит","Как действовать?",[
        ["Сразу удваиваю зарплату любому кандидату",{cash:-300000,revenue:0,profit:-220000,customers:0},"Ты решаешь срочность ценой структуры компенсаций и без снижения bus factor.",0],
        ["Документирую критичные зоны, перераспределяю ownership и нанимаю по gap",{cash:-140000,revenue:20000,profit:-70000,customers:0},"Ты снизил зависимость от одного человека и закрыл конкретный gap.",1],
        ["Раздаю его задачи всей команде без приоритетов",{cash:0,revenue:-120000,profit:-80000,customers:-45},"Скрытая перегрузка превратилась в замедление всего продукта.",0]
      ]],
      ["Конкурент запускает бесплатный тариф","Твоя реакция?",[
        ["Копирую free plan за неделю",{cash:-130000,revenue:-160000,profit:-140000,customers:160},"Ты скопировал механику, не доказав, что она подходит твоей воронке.",0],
        ["Разбираю сегмент, activation и причины выбора конкурента, затем тестирую entry offer",{cash:-70000,revenue:120000,profit:50000,customers:100},"Решение опирается на поведение клиентов, а не на страх.",1],
        ["Публично высмеиваю бесплатный продукт",{cash:0,revenue:-60000,profit:-30000,customers:-50},"Маркетинговый шум не усилил ценность твоего продукта.",0]
      ]],
      ["Runway осталось 5 месяцев, инвестор предлагает жёсткие условия","Что делаешь?",[
        ["Подписываю первое предложение сегодня",{cash:2600000,revenue:0,profit:-50000,customers:0},"Ты снял риск cash, но принял необратимые условия без альтернатив.",0],
        ["Параллельно режу burn, строю несколько вариантов финансирования и ставлю deadline",{cash:1400000,revenue:-40000,profit:230000,customers:-5},"Ты увеличил переговорную силу и продлил время на решение.",1],
        ["Отказываюсь от любых инвестиций и ничего не меняю",{cash:-700000,revenue:0,profit:-350000,customers:0},"Идеологическое решение сократило оставшийся runway.",0]
      ]]
    ],
    ecommerce:[
      ["Return rate вырос с 8% до 18%","Что проверяешь?",[
        ["Сразу запрещаю возвраты",{cash:0,revenue:-220000,profit:-100000,customers:-170},"Ты снизил возвраты формально, но ударил по доверию и конверсии.",0],
        ["Разбираю причины по SKU, креативам и ожиданиям клиента",{cash:-60000,revenue:90000,profit:55000,customers:40},"Ты ищешь источник возврата и можешь исправить конкретную причину.",1],
        ["Добавляю больше рекламы",{cash:-180000,revenue:130000,profit:-90000,customers:150},"Новый трафик масштабировал проблему качества заказа.",0]
      ]],
      ["70% товара приходит от одного поставщика","Как снизить риск?",[
        ["Делаю ещё больший заказ ради скидки",{cash:-650000,revenue:220000,profit:65000,customers:120},"Маржа улучшилась, но концентрационный риск стал ещё выше.",0],
        ["Квалифицирую второго поставщика и постепенно распределяю объём",{cash:-120000,revenue:70000,profit:25000,customers:20},"Ты покупаешь устойчивость без резкого разрушения текущей экономики.",1],
        ["Меняю поставщика за один день",{cash:-350000,revenue:-170000,profit:-110000,customers:-100},"Ты заменил один риск операционным шоком.",0]
      ]],
      ["Маркетплейс повышает комиссию на 6 п.п.","Решение?",[
        ["Оставляю всё как есть",{cash:0,revenue:0,profit:-125000,customers:0},"Канал остался большим, но contribution margin резко ухудшился.",0],
        ["Пересчитываю SKU economics и перевожу часть повторных клиентов в direct channel",{cash:-80000,revenue:110000,profit:70000,customers:45},"Ты диверсифицировал канал и сохранил прибыльные SKU.",1],
        ["Полностью ухожу с маркетплейса",{cash:0,revenue:-420000,profit:-120000,customers:-280},"Резкий отказ уничтожил объём до готовности альтернативного канала.",0]
      ]],
      ["Конкурент запускает постоянную скидку 25%","Что делаешь?",[
        ["Сразу даю 30% скидку",{cash:-50000,revenue:210000,profit:-180000,customers:230},"Ты выиграл объём, но начал ценовую войну с плохой экономикой.",0],
        ["Усиливаю bundle/value и тестирую точечные промо по сегментам",{cash:-70000,revenue:190000,profit:85000,customers:130},"Ты защищаешь ценность и используешь скидку там, где она окупается.",1],
        ["Игнорирую все изменения рынка",{cash:0,revenue:-130000,profit:-55000,customers:-100},"Часть аудитории ушла, а ты не проверил причину.",0]
      ]],
      ["Склад работает на пределе","Как расширяться?",[
        ["Сразу арендую вдвое больший склад на год",{cash:-520000,revenue:140000,profit:-190000,customers:90},"Ты купил capacity до доказательства устойчивого спроса.",0],
        ["Сначала оптимизирую процессы и беру гибкое дополнительное пространство",{cash:-180000,revenue:210000,profit:90000,customers:150},"Ты добавил capacity по мере необходимости и сохранил опциональность.",1],
        ["Продолжаю работать в перегрузе",{cash:0,revenue:-190000,profit:-100000,customers:-150},"Ошибки и задержки начали превращать спрос в негативный опыт.",0]
      ]],
      ["До сезона продаж два месяца","Как планируешь закупки?",[
        ["Покупаю максимум по прошлогоднему пику",{cash:-900000,revenue:500000,profit:90000,customers:260},"Ты поймал часть спроса, но слишком много cash оказалось в рисковом запасе.",0],
        ["Строю несколько сценариев спроса, резервирую поставки и ставлю reorder-триггеры",{cash:-420000,revenue:460000,profit:180000,customers:240},"Ты сохранил шанс на рост и ограничил риск непроданного остатка.",1],
        ["Почти ничего не закупаю",{cash:-50000,revenue:-350000,profit:-100000,customers:-230},"Ликвидность сохранилась, но stockout уничтожил сезонный спрос.",0]
      ]],
      ["Продажи растут, но cash снова падает","Первый приоритет?",[
        ["Увеличить рекламный бюджет",{cash:-300000,revenue:240000,profit:-120000,customers:230},"Рост ещё сильнее потребовал working capital.",0],
        ["Разложить cash conversion cycle: запасы, оплаты поставщикам и возвраты",{cash:180000,revenue:30000,profit:70000,customers:10},"Ты нашёл финансовое ограничение роста и освободил ликвидность.",1],
        ["Считать только выручку и ждать",{cash:-220000,revenue:0,profit:-40000,customers:0},"Проблема ликвидности не исчезла от хорошей выручки.",0]
      ]]
    ],
    agency:[
      ["Все ключевые продажи и согласования проходят через основателя","Что менять?",[
        ["Продолжаю контролировать всё лично",{cash:0,revenue:70000,profit:-30000,customers:1},"Качество кажется контролируемым, но founder bottleneck ограничивает throughput.",0],
        ["Стандартизирую qualification и decision rights команды",{cash:-70000,revenue:170000,profit:80000,customers:2},"Ты снял узкое место, не отдавая критичные решения без правил.",1],
        ["Полностью ухожу из продаж завтра",{cash:0,revenue:-190000,profit:-90000,customers:-2},"Резкий уход разрушил процесс до того, как система стала самостоятельной.",0]
      ]],
      ["Проекты регулярно выходят за scope","Как защищать маржу?",[
        ["Доделываем бесплатно ради отношений",{cash:-80000,revenue:0,profit:-150000,customers:1},"Отношения сохраняются ценой систематического уничтожения маржи.",0],
        ["Фиксирую scope, change requests и критерии приёмки",{cash:-30000,revenue:90000,profit:85000,customers:0},"Ты сделал дополнительную работу видимой и управляемой.",1],
        ["Сразу конфликтую по каждому мелкому изменению",{cash:0,revenue:-70000,profit:-30000,customers:-1},"Жёсткость без нормального процесса ухудшила отношения.",0]
      ]],
      ["Нужно увеличить delivery capacity","Кого нанимать?",[
        ["Сразу пятерых junior",{cash:-280000,revenue:180000,profit:-90000,customers:3},"Headcount вырос, но management load и качество стали новым bottleneck.",0],
        ["Нанимаю одного сильного senior под конкретный bottleneck и измеряю загрузку",{cash:-170000,revenue:250000,profit:95000,customers:2},"Ты добавил leverage там, где система реально ограничена.",1],
        ["Никого — команда должна просто работать быстрее",{cash:0,revenue:-130000,profit:-70000,customers:-2},"Перегрузка не исчезла, а качество и retention начали падать.",0]
      ]],
      ["Рынок просит всё подряд, но продажи нестабильны","Как позиционироваться?",[
        ["Берём любой проект для любого клиента",{cash:80000,revenue:210000,profit:25000,customers:4},"Краткосрочная выручка выросла, но delivery становится всё менее повторяемым.",0],
        ["Выбираю сегмент, где есть повторяемая боль и лучшие unit economics",{cash:-50000,revenue:230000,profit:125000,customers:2},"Специализация улучшила win rate, delivery и возможность повышать цену.",1],
        ["Выбираю нишу только по красивому тренду",{cash:-60000,revenue:60000,profit:-30000,customers:1},"Ниша без доказанного спроса не создаёт позиционирование.",0]
      ]],
      ["Второй по размеру клиент хочет уйти","Что делаешь?",[
        ["Даю бессрочную скидку 35%",{cash:0,revenue:-180000,profit:-180000,customers:0},"Ты сохранил клиента ценой плохой долгосрочной экономики.",0],
        ["Провожу exit-интервью, разбираю ценность и предлагаю решение только если причина исправима",{cash:-25000,revenue:-30000,profit:20000,customers:0},"Ты отделил реальную проблему продукта от клиента, которого невыгодно удерживать.",1],
        ["Угрожаю контрактом и ничего не меняю",{cash:0,revenue:-240000,profit:-120000,customers:-1},"Юридическое удержание не исправляет потерю ценности и репутационный риск.",0]
      ]],
      ["Часть услуг стала повторяемой","Следующий шаг?",[
        ["Каждый раз всё делаю кастомно",{cash:0,revenue:90000,profit:10000,customers:2},"Выручка есть, но leverage не появляется.",0],
        ["Пакетирую повторяемую часть в productized service с чётким scope и ценой",{cash:-90000,revenue:280000,profit:150000,customers:4},"Ты повысил повторяемость, скорость продажи и управляемость маржи.",1],
        ["Строю полноценный SaaS немедленно",{cash:-650000,revenue:30000,profit:-420000,customers:1},"Ты прыгнул из сервиса в продукт без доказательства, что клиентам нужен software.",0]
      ]],
      ["Экономика замедляется, pipeline проседает","Как защищаешь бизнес?",[
        ["Режу цены всем до минимума",{cash:0,revenue:120000,profit:-190000,customers:3},"Объём вырос ненадолго, но маржа и позиционирование ухудшились.",0],
        ["Делаю cash-сценарии, усиливаю сегменты с доказанным ROI и сокращаю низкоценную работу",{cash:140000,revenue:80000,profit:180000,customers:-1},"Ты защищаешь ликвидность и концентрируешь команду на ценности, за которую платят даже в слабом рынке.",1],
        ["Ничего не меняю до кризиса",{cash:-210000,revenue:-220000,profit:-160000,customers:-3},"Запоздалая реакция съела запас времени для мягкой перестройки.",0]
      ]]
    ]
  };

  const en={
    coffee:[
      ["Peak-hour queues keep growing","How do you remove the bottleneck?",[
        ["Hire two full-time employees immediately",{cash:-120000,revenue:70000,profit:-45000,customers:80},"Capacity rises, but fixed costs appear before peak demand is properly tested.",0],
        ["Redesign shifts and add part-time coverage for peaks",{cash:-45000,revenue:85000,profit:28000,customers:130},"You buy capacity exactly where it is needed without unnecessary permanent cost.",1],
        ["Do nothing — the queue creates buzz",{cash:0,revenue:-70000,profit:-42000,customers:-170},"Waiting becomes lost demand and hurts repeat visits.",0]
      ]],
      ["A delivery aggregator charges a 30% commission","How do you test the channel?",[
        ["List the full menu without changing prices",{cash:-20000,revenue:120000,profit:-55000,customers:190},"Revenue rises, but commission destroys the economics of part of the menu.",0],
        ["Pilot a high-margin menu and measure contribution margin",{cash:-30000,revenue:95000,profit:32000,customers:120},"You validate both demand and channel economics before scaling.",1],
        ["Reject the channel permanently without a test",{cash:0,revenue:-25000,profit:-8000,customers:-35},"You protect margin but never learn whether the channel could be profitable.",0]
      ]],
      ["The landlord raises rent by 22%","What do you do?",[
        ["Move immediately to a cheaper location",{cash:-320000,revenue:-140000,profit:-90000,customers:-260},"Rent savings do not cover relocation cost and lost traffic.",0],
        ["Recalculate unit economics and negotiate rate or term",{cash:-20000,revenue:10000,profit:25000,customers:0},"You learn what rent the business can support and avoid a rushed irreversible move.",1],
        ["Simply accept the new rent",{cash:0,revenue:0,profit:-85000,customers:0},"Higher fixed cost starts systematically eating profit.",0]
      ]],
      ["A second-location opportunity appears","How do you decide?",[
        ["Sign the lease today before it disappears",{cash:-650000,revenue:260000,profit:-120000,customers:430},"You buy growth before proving the economics of the second location.",0],
        ["Test the area with a pop-up and measure demand",{cash:-120000,revenue:170000,profit:52000,customers:210},"A cheap test gives evidence before a large irreversible investment.",1],
        ["Never open a second location",{cash:0,revenue:-45000,profit:-18000,customers:-40},"You remove risk, but also potentially attractive growth.",0]
      ]],
      ["Ratings fall because of evening-shift quality complaints","First move?",[
        ["Run a 25% evening discount",{cash:-20000,revenue:45000,profit:-50000,customers:100},"The discount sends more traffic into a process that still creates a bad experience.",0],
        ["Investigate the shift, standards and quality control",{cash:-35000,revenue:30000,profit:18000,customers:95},"You fix the root cause and protect repeat purchases.",1],
        ["Argue with reviewers and ask them to delete criticism",{cash:0,revenue:-55000,profit:-25000,customers:-120},"The reputation problem grows while the operational cause remains.",0]
      ]],
      ["A supplier offers 8% off for quarterly prepayment","What do you choose?",[
        ["Prepay the maximum possible volume",{cash:-340000,revenue:0,profit:45000,customers:0},"Margin improves, but too much liquidity gets trapped in inventory.",0],
        ["Prepay part while preserving a cash buffer",{cash:-150000,revenue:0,profit:30000,customers:0},"You capture some discount without destroying your financial buffer.",1],
        ["Ignore the offer without calculating cost of capital",{cash:0,revenue:0,profit:-18000,customers:0},"Without the calculation, you do not know whether rejecting it was actually better.",0]
      ]],
      ["A seasonal slowdown is one month away","How do you prepare?",[
        ["Put all free cash into ads before the slowdown",{cash:-260000,revenue:110000,profit:-130000,customers:180},"You buy volume without proving payback in a weak season.",0],
        ["Build a cash buffer and test seasonal offers with small budgets",{cash:-50000,revenue:90000,profit:38000,customers:110},"You preserve runway and keep the option to scale only a working offer.",1],
        ["Buy a huge amount of raw materials just in case",{cash:-240000,revenue:0,profit:-35000,customers:0},"Cash goes into inventory immediately before demand falls.",0]
      ]]
    ],
    saas:[
      ["Users complain about pricing as the product grows","What do you test?",[
        ["Cut the price 30% for everyone",{cash:-20000,revenue:-210000,profit:-180000,customers:90},"You reduce ARPU without learning which segment actually lacks value.",0],
        ["Segment usage and willingness to pay, then test packaging",{cash:-60000,revenue:160000,profit:70000,customers:35},"Pricing becomes a segmented hypothesis instead of a panic discount.",1],
        ["Ignore the feedback completely",{cash:0,revenue:-90000,profit:-45000,customers:-55},"Some customers leave while the reason remains unknown.",0]
      ]],
      ["Enterprise pipeline grows, but the sales cycle is 90 days","Where do you invest?",[
        ["Abandon self-serve completely",{cash:-180000,revenue:260000,profit:-60000,customers:12},"Enterprise grows, but you shut down the second engine too early.",0],
        ["Build a small sales motion and compare CAC/payback by segment",{cash:-120000,revenue:300000,profit:60000,customers:24},"You test enterprise economics without destroying the PLG channel.",1],
        ["Hire 12 salespeople immediately",{cash:-700000,revenue:350000,profit:-420000,customers:30},"Fixed costs grow faster than proven sales productivity.",0]
      ]],
      ["The service is down for three hours","How do you respond?",[
        ["Stay silent until everything is fixed",{cash:0,revenue:-130000,profit:-70000,customers:-80},"A technical outage becomes a trust crisis too.",0],
        ["Communicate status openly, fix the cause and publish a postmortem",{cash:-90000,revenue:-40000,profit:-60000,customers:-20},"You lose some money but preserve trust and reduce recurrence risk.",1],
        ["Give everyone a free month without estimating impact",{cash:0,revenue:-420000,profit:-350000,customers:40},"The compensation becomes more expensive than the incident itself.",0]
      ]],
      ["Customers will prepay annually for a discount","What do you do?",[
        ["Offer 40% off annual to everyone",{cash:850000,revenue:-190000,profit:-120000,customers:50},"Cash arrives faster, but the discount destroys too much LTV.",0],
        ["Test annual billing with a moderate discount and measure retention/payback",{cash:620000,revenue:140000,profit:120000,customers:35},"You improve cash flow while preserving reasonable economics.",1],
        ["Keep monthly billing only",{cash:-120000,revenue:0,profit:-25000,customers:-8},"You reject a relatively cheap way to improve cash conversion.",0]
      ]],
      ["A key engineer leaves","How do you react?",[
        ["Immediately double compensation for any replacement",{cash:-300000,revenue:0,profit:-220000,customers:0},"You solve urgency at the cost of compensation structure and keep the bus-factor problem.",0],
        ["Document critical areas, redistribute ownership and hire for the specific gap",{cash:-140000,revenue:20000,profit:-70000,customers:0},"You reduce single-person dependency and fill the actual gap.",1],
        ["Spread their tasks across the team without prioritizing",{cash:0,revenue:-120000,profit:-80000,customers:-45},"Hidden overload slows the entire product.",0]
      ]],
      ["A competitor launches a free tier","Your response?",[
        ["Copy a free plan within a week",{cash:-130000,revenue:-160000,profit:-140000,customers:160},"You copy a mechanic without proving it fits your funnel.",0],
        ["Study the segment, activation and why customers choose them, then test an entry offer",{cash:-70000,revenue:120000,profit:50000,customers:100},"The response is based on customer behavior rather than fear.",1],
        ["Publicly mock the free product",{cash:0,revenue:-60000,profit:-30000,customers:-50},"Marketing noise does not improve your product's value.",0]
      ]],
      ["Runway is five months and an investor offers harsh terms","What do you do?",[
        ["Sign the first offer today",{cash:2600000,revenue:0,profit:-50000,customers:0},"You remove cash risk but accept irreversible terms without alternatives.",0],
        ["Cut burn in parallel, build several funding options and set a deadline",{cash:1400000,revenue:-40000,profit:230000,customers:-5},"You improve negotiating power and buy time for the decision.",1],
        ["Reject all investment and change nothing",{cash:-700000,revenue:0,profit:-350000,customers:0},"An ideological decision shortens the remaining runway.",0]
      ]]
    ],
    ecommerce:[
      ["Return rate rises from 8% to 18%","What do you investigate?",[
        ["Ban returns immediately",{cash:0,revenue:-220000,profit:-100000,customers:-170},"You reduce returns on paper but damage trust and conversion.",0],
        ["Analyze causes by SKU, creative and customer expectation",{cash:-60000,revenue:90000,profit:55000,customers:40},"You identify the source of returns and can fix a specific cause.",1],
        ["Buy more advertising",{cash:-180000,revenue:130000,profit:-90000,customers:150},"New traffic scales the order-quality problem.",0]
      ]],
      ["70% of products come from one supplier","How do you reduce risk?",[
        ["Place an even larger order for a discount",{cash:-650000,revenue:220000,profit:65000,customers:120},"Margin improves, but concentration risk becomes even higher.",0],
        ["Qualify a second supplier and gradually split volume",{cash:-120000,revenue:70000,profit:25000,customers:20},"You buy resilience without abruptly breaking current economics.",1],
        ["Switch suppliers in one day",{cash:-350000,revenue:-170000,profit:-110000,customers:-100},"You replace one risk with an operational shock.",0]
      ]],
      ["A marketplace raises its fee by 6 percentage points","Decision?",[
        ["Keep everything unchanged",{cash:0,revenue:0,profit:-125000,customers:0},"The channel remains large, but contribution margin deteriorates sharply.",0],
        ["Recalculate SKU economics and move repeat demand partly to a direct channel",{cash:-80000,revenue:110000,profit:70000,customers:45},"You diversify the channel and preserve profitable SKUs.",1],
        ["Leave the marketplace completely",{cash:0,revenue:-420000,profit:-120000,customers:-280},"A sudden exit destroys volume before an alternative channel is ready.",0]
      ]],
      ["A competitor launches a permanent 25% discount","What do you do?",[
        ["Immediately offer 30% off",{cash:-50000,revenue:210000,profit:-180000,customers:230},"You win volume but start a price war with bad economics.",0],
        ["Strengthen bundles/value and test targeted promotions by segment",{cash:-70000,revenue:190000,profit:85000,customers:130},"You defend value and use discounts only where they pay back.",1],
        ["Ignore every market change",{cash:0,revenue:-130000,profit:-55000,customers:-100},"Part of the audience leaves and you never test why.",0]
      ]],
      ["The warehouse is at its limit","How do you expand?",[
        ["Lease a warehouse twice the size for a full year",{cash:-520000,revenue:140000,profit:-190000,customers:90},"You buy capacity before proving sustained demand.",0],
        ["Optimize processes first and add flexible overflow space",{cash:-180000,revenue:210000,profit:90000,customers:150},"You add capacity as needed and preserve optionality.",1],
        ["Keep operating in overload",{cash:0,revenue:-190000,profit:-100000,customers:-150},"Errors and delays turn demand into a bad experience.",0]
      ]],
      ["Peak season is two months away","How do you plan inventory?",[
        ["Buy the maximum based on last year's peak",{cash:-900000,revenue:500000,profit:90000,customers:260},"You capture some demand but put too much cash into risky inventory.",0],
        ["Build several demand scenarios, reserve supply and set reorder triggers",{cash:-420000,revenue:460000,profit:180000,customers:240},"You preserve upside while limiting leftover inventory risk.",1],
        ["Buy almost nothing",{cash:-50000,revenue:-350000,profit:-100000,customers:-230},"Liquidity stays safe, but stockouts destroy seasonal demand.",0]
      ]],
      ["Sales grow, but cash falls again","First priority?",[
        ["Increase the advertising budget",{cash:-300000,revenue:240000,profit:-120000,customers:230},"Growth demands even more working capital.",0],
        ["Break down the cash conversion cycle: inventory, supplier terms and returns",{cash:180000,revenue:30000,profit:70000,customers:10},"You identify the financial constraint on growth and release liquidity.",1],
        ["Track revenue only and wait",{cash:-220000,revenue:0,profit:-40000,customers:0},"Liquidity problems do not disappear because revenue looks good.",0]
      ]]
    ],
    agency:[
      ["Every important sale and approval goes through the founder","What changes?",[
        ["Keep controlling everything personally",{cash:0,revenue:70000,profit:-30000,customers:1},"Quality feels controlled, but the founder bottleneck limits throughput.",0],
        ["Standardize qualification and decision rights for the team",{cash:-70000,revenue:170000,profit:80000,customers:2},"You remove the bottleneck without delegating critical decisions without rules.",1],
        ["Leave sales completely tomorrow",{cash:0,revenue:-190000,profit:-90000,customers:-2},"A sudden exit breaks the process before the system can operate independently.",0]
      ]],
      ["Projects regularly move beyond scope","How do you protect margin?",[
        ["Do extra work for free to preserve the relationship",{cash:-80000,revenue:0,profit:-150000,customers:1},"Relationships survive at the cost of systematically destroying margin.",0],
        ["Define scope, change requests and acceptance criteria",{cash:-30000,revenue:90000,profit:85000,customers:0},"You make extra work visible and manageable.",1],
        ["Fight every small change immediately",{cash:0,revenue:-70000,profit:-30000,customers:-1},"Rigidity without a good process damages the relationship.",0]
      ]],
      ["You need more delivery capacity","Who do you hire?",[
        ["Hire five juniors immediately",{cash:-280000,revenue:180000,profit:-90000,customers:3},"Headcount rises, but management load and quality become the next bottleneck.",0],
        ["Hire one strong senior for the specific bottleneck and measure utilization",{cash:-170000,revenue:250000,profit:95000,customers:2},"You add leverage exactly where the system is constrained.",1],
        ["Hire nobody — the team should simply work faster",{cash:0,revenue:-130000,profit:-70000,customers:-2},"Overload remains and quality plus retention begin to fall.",0]
      ]],
      ["The market asks for everything and sales are unstable","How do you position?",[
        ["Take any project for any customer",{cash:80000,revenue:210000,profit:25000,customers:4},"Short-term revenue rises, but delivery becomes less repeatable.",0],
        ["Choose a segment with repeatable pain and the best unit economics",{cash:-50000,revenue:230000,profit:125000,customers:2},"Specialization improves win rate, delivery and pricing power.",1],
        ["Choose a niche only because it is fashionable",{cash:-60000,revenue:60000,profit:-30000,customers:1},"A niche without proven demand is not positioning.",0]
      ]],
      ["Your second-largest client wants to leave","What do you do?",[
        ["Give them a permanent 35% discount",{cash:0,revenue:-180000,profit:-180000,customers:0},"You retain the client with poor long-term economics.",0],
        ["Run an exit interview, diagnose value and fix only an addressable cause",{cash:-25000,revenue:-30000,profit:20000,customers:0},"You separate a real value problem from a customer who may not be worth retaining.",1],
        ["Threaten them with the contract and change nothing",{cash:0,revenue:-240000,profit:-120000,customers:-1},"Legal retention does not repair lost value or reputation risk.",0]
      ]],
      ["Part of the service has become repeatable","Next step?",[
        ["Keep making everything custom",{cash:0,revenue:90000,profit:10000,customers:2},"Revenue exists, but leverage never appears.",0],
        ["Package the repeatable work into a productized service with clear scope and price",{cash:-90000,revenue:280000,profit:150000,customers:4},"You improve repeatability, sales speed and margin control.",1],
        ["Build a full SaaS product immediately",{cash:-650000,revenue:30000,profit:-420000,customers:1},"You jump from services to software without proving customers need the product.",0]
      ]],
      ["The economy slows and pipeline drops","How do you protect the business?",[
        ["Cut prices for everyone to the minimum",{cash:0,revenue:120000,profit:-190000,customers:3},"Volume rises briefly while margin and positioning deteriorate.",0],
        ["Build cash scenarios, focus on segments with proven ROI and cut low-value work",{cash:140000,revenue:80000,profit:180000,customers:-1},"You protect liquidity and focus the team on value customers still pay for in a weak market.",1],
        ["Change nothing until there is a crisis",{cash:-210000,revenue:-220000,profit:-160000,customers:-3},"Late reaction burns the time buffer needed for a controlled adjustment.",0]
      ]]
    ]
  };

  function extend(content,extra){
    if(!content?.simulators)return;
    for(const [id,steps] of Object.entries(extra)){
      const sim=content.simulators[id];
      if(!sim||sim.steps.length>=10)continue;
      sim.steps.push(...steps);
    }
  }
  extend(window.FORGE_CONTENT,ru);
  extend(window.BIZONIQ_CONTENT_EN,en);
})();