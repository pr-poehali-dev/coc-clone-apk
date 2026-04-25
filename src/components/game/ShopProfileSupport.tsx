import Icon from "@/components/ui/icon";

type Tab = "home" | "game" | "profile" | "shop" | "support";

const SHOP_ITEMS = [
  { id: 1, name: "Набор Легенды", desc: "10 призывов + гарантированный легендарный герой", price: "990 💎", old_price: "1490 💎", icon: "👑", hot: true, category: "призыв" },
  { id: 2, name: "Скин «Дракон»", desc: "Эксклюзивный облик для любого воина", price: "450 💎", old_price: null, icon: "🐉", hot: false, category: "скин" },
  { id: 3, name: "Мешок золота", desc: "500 000 монет мгновенно", price: "199 ₽", old_price: null, icon: "💰", hot: false, category: "ресурсы" },
  { id: 4, name: "Кристаллы ×1000", desc: "Премиумная валюта для покупок", price: "749 ₽", old_price: "999 ₽", icon: "💎", hot: true, category: "валюта" },
  { id: 5, name: "Боевой пропуск", desc: "Эксклюзивные награды на 30 дней", price: "299 ₽", old_price: null, icon: "⚡", hot: false, category: "пропуск" },
  { id: 6, name: "Скин деревни «Ледяная крепость»", desc: "Полный облик деревни со снегом и льдом", price: "799 💎", old_price: "1200 💎", icon: "❄️", hot: false, category: "скин" },
];

const FAQ = [
  { q: "Как получить героев?", a: "Героев можно получить через призыв в Таверне, за боевые награды, или купить в Магазине. Легендарные герои выпадают с шансом 0.5% или гарантированно каждые 90 призывов." },
  { q: "Как кастомизировать деревню?", a: "Перейдите в раздел «Игра» → вкладку «Деревня». Нажмите на любое здание для улучшения или смены внешнего вида. Скины деревни доступны в Магазине." },
  { q: "Что такое Боевой пропуск?", a: "Боевой пропуск — ежемесячная подписка, дающая доступ к эксклюзивным наградам, скинам и бонусным ресурсам. Доступен за 299 ₽ в месяц." },
  { q: "Как улучшить боевых юнитов?", a: "Юниты улучшаются в Казарме и Кузнице. Для улучшения нужны ресурсы и время. Максимальный тир юнитов — 5-й." },
  { q: "Потеряю ли я прогресс?", a: "Нет! Весь прогресс сохраняется в облаке. Привяжите аккаунт через Профиль, чтобы играть на нескольких устройствах." },
];

interface ShopProfileSupportProps {
  tab: Tab;
  setTab: (t: Tab) => void;
  shopCategory: string;
  setShopCategory: (c: string) => void;
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
}

export default function ShopProfileSupport({
  tab,
  setTab,
  shopCategory,
  setShopCategory,
  openFaq,
  setOpenFaq,
}: ShopProfileSupportProps) {
  return (
    <>
      {/* ===== PROFILE ===== */}
      {tab === "profile" && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              <div className="card-dark rounded-2xl p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto"
                    style={{background: 'linear-gradient(135deg, rgba(232,160,32,0.2), rgba(180,60,20,0.2))', border: '2px solid rgba(232,160,32,0.4)'}}>
                    ⚔️
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full btn-gold flex items-center justify-center text-xs">
                    <Icon name="Pencil" size={12} />
                  </button>
                </div>
                <h2 className="font-['Cinzel'] font-bold text-lg gold-text mb-1">WarLord_Supreme</h2>
                <p className="text-xs text-muted-foreground mb-3">ID: #482901 · Уровень 47</p>
                <div className="stat-bar mb-1">
                  <div className="stat-fill" style={{width: '68%'}} />
                </div>
                <p className="text-[10px] text-muted-foreground">68% до уровня 48</p>
                <div className="divider-gold my-4" />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "🏆", val: "4,820", label: "Кубки" },
                    { icon: "⚔️", val: "142", label: "Победы" },
                    { icon: "👑", val: "Золото", label: "Лига" },
                    { icon: "💀", val: "38", label: "Поражений" },
                  ].map(s => (
                    <div key={s.label} className="rounded-lg p-2" style={{background: 'rgba(255,255,255,0.03)'}}>
                      <div className="text-lg">{s.icon}</div>
                      <div className="font-bold text-sm text-white">{s.val}</div>
                      <div className="text-[10px] text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="card-dark rounded-2xl p-5">
                <h3 className="font-['Cinzel'] font-semibold text-sm text-white mb-4">Персональные данные</h3>
                <div className="space-y-3">
                  {[
                    { label: "Имя игрока", val: "WarLord_Supreme", icon: "👤" },
                    { label: "Email", val: "player@email.com", icon: "📧" },
                    { label: "Регион", val: "Россия · Сервер 3", icon: "🌍" },
                    { label: "Дата регистрации", val: "15 марта 2023", icon: "📅" },
                  ].map(f => (
                    <div key={f.label} className="flex items-center justify-between p-3 rounded-lg"
                      style={{background: 'rgba(255,255,255,0.03)'}}>
                      <div className="flex items-center gap-2">
                        <span>{f.icon}</span>
                        <span className="text-xs text-muted-foreground">{f.label}</span>
                      </div>
                      <span className="text-xs text-white font-medium">{f.val}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-gold w-full py-2.5 rounded-lg text-xs mt-4">✏️ Редактировать профиль</button>
              </div>

              <div className="card-dark rounded-2xl p-5">
                <h3 className="font-['Cinzel'] font-semibold text-sm text-white mb-4">Достижения</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { icon: "🔥", title: "Серия огня", desc: "10 побед подряд", done: true },
                    { icon: "🏰", title: "Строитель", desc: "Все здания Ур.5+", done: true },
                    { icon: "⭐", title: "Коллекционер", desc: "10 героев", done: true },
                    { icon: "💎", title: "Элита", desc: "Платиновая лига", done: false },
                    { icon: "🐉", title: "Охотник", desc: "Убить 100 боссов", done: false },
                    { icon: "👑", title: "Легенда", desc: "Сезонный чемпион", done: false },
                  ].map(a => (
                    <div key={a.title} className={`rounded-xl p-3 text-center ${a.done ? "" : "opacity-40"}`}
                      style={{background: a.done ? 'rgba(232,160,32,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${a.done ? 'rgba(232,160,32,0.25)' : 'rgba(255,255,255,0.05)'}`}}>
                      <div className="text-2xl mb-1">{a.icon}</div>
                      <div className="text-[10px] font-semibold text-white">{a.title}</div>
                      <div className="text-[9px] text-muted-foreground">{a.desc}</div>
                      {a.done && <div className="text-[9px] mt-1" style={{color:'#40cc80'}}>✓ Выполнено</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== SHOP ===== */}
      {tab === "shop" && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-['Cinzel'] font-bold gold-text">Магазин</h2>
            <div className="flex items-center gap-3">
              <div className="card-dark px-3 py-1.5 rounded flex items-center gap-2">
                <span>💎</span>
                <span className="text-xs font-bold" style={{color:'#4a9eff'}}>2,450</span>
                <button className="text-[10px] btn-gold px-2 py-0.5 rounded ml-1">+</button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-6">
            {["все", "призыв", "скин", "ресурсы", "валюта", "пропуск"].map(c => (
              <button key={c} onClick={() => setShopCategory(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all
                  ${shopCategory === c ? "btn-gold" : "btn-dark"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHOP_ITEMS.filter(i => shopCategory === "все" || i.category === shopCategory).map(item => (
              <div key={item.id} className="card-dark rounded-2xl overflow-hidden unit-card relative">
                {item.hot && (
                  <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full z-10"
                    style={{background: 'rgba(230,120,30,0.95)', color: 'white'}}>
                    🔥 ХИТ
                  </div>
                )}
                <div className="h-32 flex items-center justify-center"
                  style={{background: 'linear-gradient(135deg, rgba(232,160,32,0.08), rgba(180,60,20,0.12))'}}>
                  <span className="text-6xl animate-float">{item.icon}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-['Cinzel'] font-bold text-sm text-white mb-1">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-base" style={{color:'#f5d170'}}>{item.price}</span>
                      {item.old_price && <span className="text-xs text-muted-foreground line-through ml-2">{item.old_price}</span>}
                    </div>
                    <button className="btn-gold px-4 py-2 rounded-lg text-xs">Купить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== SUPPORT ===== */}
      {tab === "support" && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-['Cinzel'] font-bold gold-text mb-2">Поддержка</h2>
          <p className="text-sm text-muted-foreground mb-8">Мы всегда готовы помочь. Среднее время ответа: 2 часа</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { icon: "💬", title: "Онлайн-чат", desc: "Сейчас активен", action: "Открыть чат", color: "#40cc80" },
              { icon: "📧", title: "Email", desc: "support@legendsofwar.ru", action: "Написать", color: "#4a9eff" },
              { icon: "📖", title: "База знаний", desc: "500+ статей и гайдов", action: "Открыть", color: "#f5d170" },
            ].map(c => (
              <div key={c.title} className="card-dark rounded-2xl p-5 text-center unit-card">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h4 className="font-['Cinzel'] font-semibold text-xs text-white mb-1">{c.title}</h4>
                <p className="text-[10px] text-muted-foreground mb-3">{c.desc}</p>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg btn-dark">{c.action}</button>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="font-['Cinzel'] font-bold text-lg text-white mb-4">Частые вопросы</h3>
            <div className="space-y-2">
              {FAQ.map((f, i) => (
                <div key={i} className="card-dark rounded-xl overflow-hidden">
                  <button className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-sm font-semibold text-white">{f.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground flex-shrink-0 ml-2" />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 animate-fade-in-up">
                      <div className="divider-gold mb-3" />
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark rounded-2xl p-6">
            <h3 className="font-['Cinzel'] font-bold text-base text-white mb-4">Создать обращение</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Тема</label>
                <select className="w-full rounded-lg px-3 py-2 text-sm text-white"
                  style={{background: 'rgba(255,255,255,0.05)', border: '1px solid hsl(220,20%,22%)'}}>
                  <option value="">Выбери категорию</option>
                  <option>Технические проблемы</option>
                  <option>Платёжные вопросы</option>
                  <option>Жалоба на игрока</option>
                  <option>Баг в игре</option>
                  <option>Другое</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Описание</label>
                <textarea rows={4} placeholder="Опиши проблему подробно..."
                  className="w-full rounded-lg px-3 py-2 text-sm text-white resize-none"
                  style={{background: 'rgba(255,255,255,0.05)', border: '1px solid hsl(220,20%,22%)'}} />
              </div>
              <button className="btn-gold w-full py-3 rounded-lg text-sm">📨 Отправить обращение</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
