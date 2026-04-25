import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "home" | "game" | "profile" | "shop" | "support";

const HEROES = [
  { id: 1, name: "Торн Железный", class: "Воин", rarity: "legendary", level: 24, power: 8420, atk: 85, def: 72, hp: 91, icon: "⚔️", color: "#ff9020" },
  { id: 2, name: "Эйлин Тени", class: "Лучница", rarity: "epic", level: 18, power: 6150, atk: 92, def: 45, hp: 63, icon: "🏹", color: "#b060ff" },
  { id: 3, name: "Магнус Руна", class: "Маг", rarity: "epic", level: 20, power: 7200, atk: 96, def: 38, hp: 55, icon: "🔮", color: "#b060ff" },
  { id: 4, name: "Брок Камень", class: "Страж", rarity: "rare", level: 14, power: 4800, atk: 62, def: 88, hp: 94, icon: "🛡️", color: "#4a9eff" },
];

const UNITS = [
  { id: 1, name: "Мечник", type: "Пехота", count: 85, max: 100, icon: "⚔️", power: 420, tier: 3 },
  { id: 2, name: "Арбалетчик", type: "Дальний бой", count: 40, max: 60, icon: "🏹", power: 380, tier: 2 },
  { id: 3, name: "Рыцарь", type: "Тяжёлая кавалерия", count: 12, max: 20, icon: "🐴", power: 890, tier: 4 },
  { id: 4, name: "Катапульта", type: "Осадное", count: 3, max: 5, icon: "💣", power: 1400, tier: 4 },
  { id: 5, name: "Горный тролль", type: "Гигант", count: 2, max: 4, icon: "👹", power: 2100, tier: 5 },
];

const VILLAGE_BUILDINGS = [
  { id: 1, name: "Ратуша", level: 8, icon: "🏰", x: "40%", y: "35%", desc: "Центр управления деревней" },
  { id: 2, name: "Казарма", level: 6, icon: "⚔️", x: "20%", y: "55%", desc: "Тренировка боевых юнитов" },
  { id: 3, name: "Кузница", level: 5, icon: "🔨", x: "65%", y: "60%", desc: "Улучшение снаряжения" },
  { id: 4, name: "Таверна", level: 3, icon: "🍺", x: "25%", y: "30%", desc: "Найм героев" },
  { id: 5, name: "Магическая башня", level: 4, icon: "🔮", x: "75%", y: "30%", desc: "Исследование заклинаний" },
  { id: 6, name: "Рынок", level: 2, icon: "🏪", x: "60%", y: "80%", desc: "Торговля ресурсами" },
  { id: 7, name: "Лесопилка", level: 4, icon: "🌲", x: "10%", y: "75%", desc: "Добыча дерева" },
  { id: 8, name: "Шахта", level: 3, icon: "⛏️", x: "85%", y: "65%", desc: "Добыча золота" },
];

const SHOP_ITEMS = [
  { id: 1, name: "Набор Легенды", desc: "10 призывов + гарантированный легендарный герой", price: "990 💎", old_price: "1490 💎", icon: "👑", hot: true, category: "призыв" },
  { id: 2, name: "Скин «Дракон»", desc: "Эксклюзивный облик для любого воина", price: "450 💎", old_price: null, icon: "🐉", hot: false, category: "скин" },
  { id: 3, name: "Мешок золота", desc: "500 000 монет мгновенно", price: "199 ₽", old_price: null, icon: "💰", hot: false, category: "ресурсы" },
  { id: 4, name: "Кристаллы ×1000", desc: "Премиумная валюта для покупок", price: "749 ₽", old_price: "999 ₽", icon: "💎", hot: true, category: "валюта" },
  { id: 5, name: "Боевой пропуск", desc: "Эксклюзивные награды на 30 дней", price: "299 ₽", old_price: null, icon: "⚡", hot: false, category: "пропуск" },
  { id: 6, name: "Скин деревни «Ледяная крепость»", desc: "Полный облик деревни со снегом и льдом", price: "799 💎", old_price: "1200 💎", icon: "❄️", hot: false, category: "скин" },
];

const BATTLES = [
  { id: 1, enemy: "Клан Теней", result: "Победа", trophy: "+48", time: "2 мин назад", power: 7800 },
  { id: 2, enemy: "Железный Форт", result: "Победа", trophy: "+32", time: "1 час назад", power: 6200 },
  { id: 3, enemy: "Северный Орден", result: "Поражение", trophy: "-15", time: "3 часа назад", power: 11400 },
  { id: 4, enemy: "Клан Огня", result: "Победа", trophy: "+56", time: "5 часов назад", power: 8100 },
];

const FAQ = [
  { q: "Как получить героев?", a: "Героев можно получить через призыв в Таверне, за боевые награды, или купить в Магазине. Легендарные герои выпадают с шансом 0.5% или гарантированно каждые 90 призывов." },
  { q: "Как кастомизировать деревню?", a: "Перейдите в раздел «Игра» → вкладку «Деревня». Нажмите на любое здание для улучшения или смены внешнего вида. Скины деревни доступны в Магазине." },
  { q: "Что такое Боевой пропуск?", a: "Боевой пропуск — ежемесячная подписка, дающая доступ к эксклюзивным наградам, скинам и бонусным ресурсам. Доступен за 299 ₽ в месяц." },
  { q: "Как улучшить боевых юнитов?", a: "Юниты улучшаются в Казарме и Кузнице. Для улучшения нужны ресурсы и время. Максимальный тир юнитов — 5-й." },
  { q: "Потеряю ли я прогресс?", a: "Нет! Весь прогресс сохраняется в облаке. Привяжите аккаунт через Профиль, чтобы играть на нескольких устройствах." },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [selectedHero, setSelectedHero] = useState(HEROES[0]);
  const [gameTab, setGameTab] = useState<"heroes" | "village" | "battle">("heroes");
  const [selectedBuilding, setSelectedBuilding] = useState<typeof VILLAGE_BUILDINGS[0] | null>(null);
  const [shopCategory, setShopCategory] = useState("все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [skinIndex, setSkinIndex] = useState(0);

  const SKINS = ["Базовый", "Владыка Пепла", "Ледяная крепость", "Дракон"];

  return (
    <div className="min-h-screen bg-background relative">
      {/* NAVBAR */}
      <nav className="nav-bg fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-flame">🔥</span>
            <div>
              <h1 className="font-['Cinzel_Decorative'] text-sm font-bold gold-text leading-tight">LEGENDS OF WAR</h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Битва за Королевство</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {(["home","game","profile","shop","support"] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded text-xs font-['Cinzel'] font-semibold tracking-wide uppercase transition-all duration-200
                  ${tab === t ? "btn-gold" : "btn-dark"}`}>
                {{ home: "Главная", game: "Игра", profile: "Профиль", shop: "Магазин", support: "Поддержка" }[t]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 card-dark px-3 py-1.5 rounded">
              <span className="text-sm">💎</span>
              <span className="text-xs font-bold" style={{color: '#4a9eff'}}>2,450</span>
            </div>
            <div className="flex items-center gap-2 card-dark px-3 py-1.5 rounded">
              <span className="text-sm">⚡</span>
              <span className="text-xs font-bold" style={{color:'#f5d170'}}>85/100</span>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="pt-16 pb-20 md:pb-0">

        {/* ===== HOME ===== */}
        {tab === "home" && (
          <div>
            <div className="hero-bg flex items-center justify-center relative particles-bg">
              <div className="text-center px-6 py-20 max-w-3xl mx-auto animate-fade-in-up">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                  style={{background: 'rgba(232,160,32,0.15)', border: '1px solid rgba(232,160,32,0.3)', color: '#f5d170'}}>
                  🏆 Сезон 12 · Война Королей
                </div>
                <h1 className="text-4xl md:text-7xl font-['Cinzel_Decorative'] font-black mb-4 leading-tight">
                  <span className="gold-text">LEGENDS</span><br />
                  <span className="text-white/90">OF WAR</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                  Собирай легендарных героев, строй неприступную деревню и веди армию к победе
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => setTab("game")} className="btn-gold px-8 py-3.5 rounded-lg text-sm animate-pulse-glow">
                    ⚔️ Играть сейчас
                  </button>
                  <button onClick={() => setTab("shop")} className="btn-dark px-8 py-3.5 rounded-lg text-sm">
                    💎 Магазин
                  </button>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 md:gap-12">
                {[{ v: "2.4M+", l: "Игроков" }, { v: "48K", l: "Онлайн" }, { v: "12", l: "Сезон" }].map(s => (
                  <div key={s.l} className="text-center">
                    <div className="text-xl font-['Cinzel'] font-bold gold-text">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-['Cinzel'] font-bold gold-text mb-3">Особенности игры</h2>
                <div className="divider-gold w-32 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: "👑", title: "Легендарные герои", desc: "60+ уникальных героев с редкими способностями и коллекционными скинами. Собери всех!", color: "#ff9020" },
                  { icon: "🏰", title: "Деревня без границ", desc: "Строй и кастомизируй своё поселение. Выбирай архитектуру, декор и скины зданий.", color: "#b060ff" },
                  { icon: "⚔️", title: "Эпические битвы", desc: "PvP и PvE сражения с тактическим управлением юнитами и заклинаниями в реальном времени.", color: "#4a9eff" },
                ].map(f => (
                  <div key={f.title} className="card-dark rounded-xl p-6 unit-card">
                    <div className="text-4xl mb-4">{f.icon}</div>
                    <h3 className="font-['Cinzel'] font-bold text-base mb-2" style={{color: f.color}}>{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-3xl font-['Cinzel'] font-bold gold-text">Герои Легенды</h2>
                <button onClick={() => { setTab("game"); setGameTab("heroes"); }} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                  Все герои <Icon name="ChevronRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {HEROES.map((h) => (
                  <div key={h.id} className="card-dark rounded-xl overflow-hidden unit-card cursor-pointer"
                    onClick={() => { setTab("game"); setGameTab("heroes"); setSelectedHero(h); }}>
                    <div className="h-28 relative flex items-center justify-center"
                      style={{background: `linear-gradient(135deg, ${h.color}20, rgba(8,10,18,0.9))`}}>
                      <span className="text-5xl animate-float">{h.icon}</span>
                      <div className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded font-semibold rarity-${h.rarity}`}
                        style={{background: 'rgba(0,0,0,0.6)'}}>
                        {h.rarity === "legendary" ? "⭐ Легенда" : h.rarity === "epic" ? "💜 Эпик" : "🔵 Редкий"}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-['Cinzel'] font-semibold text-xs text-white mb-0.5">{h.name}</h4>
                      <p className="text-[10px] text-muted-foreground mb-2">{h.class} · Ур. {h.level}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-muted-foreground">⚡</span>
                        <span className="text-xs font-bold" style={{color: h.color}}>{h.power.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="village-bg py-16 relative">
              <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-4xl font-['Cinzel'] font-bold text-white mb-4">
                      Твоя <span className="gold-text">деревня</span>
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Строй уникальные здания, украшай деревню скинами и создавай самое мощное поселение королевства
                    </p>
                    <button onClick={() => { setTab("game"); setGameTab("village"); }} className="btn-gold px-6 py-3 rounded-lg text-sm">
                      🏰 Открыть деревню
                    </button>
                  </div>
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    {VILLAGE_BUILDINGS.slice(0, 8).map(b => (
                      <div key={b.id} className="card-dark rounded-lg p-3 text-center unit-card">
                        <div className="text-2xl mb-1">{b.icon}</div>
                        <div className="text-[10px] text-muted-foreground">{b.name}</div>
                        <div className="text-[10px]" style={{color: '#f5d170'}}>Ур.{b.level}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="rounded-2xl overflow-hidden relative" style={{background: 'linear-gradient(135deg, rgba(232,160,32,0.08), rgba(180,60,20,0.12))'}}>
                <div className="absolute inset-0" style={{border: '1px solid rgba(232,160,32,0.2)', borderRadius: '1rem'}} />
                <div className="px-8 py-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="text-6xl animate-float">🏆</div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Текущий сезон</div>
                    <h3 className="font-['Cinzel'] text-2xl font-bold gold-text mb-2">Война Королей · Сезон 12</h3>
                    <p className="text-sm text-muted-foreground">Осталось 18 дней · Борись за Трон и получи легендарного героя</p>
                  </div>
                  <button onClick={() => setTab("shop")} className="btn-gold px-6 py-3 rounded-lg text-sm whitespace-nowrap">
                    🔥 Боевой пропуск
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== GAME ===== */}
        {tab === "game" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <h2 className="text-2xl font-['Cinzel'] font-bold gold-text">Игра</h2>
              <div className="flex gap-1">
                {(["heroes","village","battle"] as const).map(t => (
                  <button key={t} onClick={() => setGameTab(t)}
                    className={`px-3 py-2 rounded text-xs font-['Cinzel'] font-semibold uppercase transition-all
                      ${gameTab === t ? "btn-gold" : "btn-dark"}`}>
                    {{ heroes: "⚔️ Герои", village: "🏰 Деревня", battle: "💥 Битвы" }[t]}
                  </button>
                ))}
              </div>
            </div>

            {gameTab === "heroes" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-1 space-y-3">
                  <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Мои герои ({HEROES.length})</div>
                  {HEROES.map(h => (
                    <div key={h.id} onClick={() => setSelectedHero(h)}
                      className={`card-dark rounded-xl p-4 flex items-center gap-3 cursor-pointer unit-card
                        ${selectedHero.id === h.id ? "selected-ring" : ""}`}>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                        style={{background: `${h.color}20`}}>
                        {h.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-['Cinzel'] font-semibold text-xs text-white truncate">{h.name}</div>
                        <div className={`text-[10px] rarity-${h.rarity}`}>{h.class} · Ур. {h.level}</div>
                        <div className="text-[10px] text-muted-foreground">⚡ {h.power.toLocaleString()}</div>
                      </div>
                      {selectedHero.id === h.id && <Icon name="ChevronRight" size={14} className="text-primary flex-shrink-0" />}
                    </div>
                  ))}
                  <button className="w-full btn-dark rounded-xl p-4 text-xs font-['Cinzel'] flex items-center justify-center gap-2">
                    <Icon name="Plus" size={14} /> Призвать героя
                  </button>
                </div>

                <div className="lg:col-span-2">
                  <div className="card-dark rounded-2xl overflow-hidden">
                    <div className="h-48 relative flex items-center justify-center"
                      style={{background: `linear-gradient(135deg, ${selectedHero.color}25, rgba(8,10,18,0.95))`}}>
                      <span className="text-8xl animate-float">{selectedHero.icon}</span>
                      <div className="absolute top-4 left-4">
                        <div className={`text-xs px-3 py-1 rounded-full font-semibold rarity-${selectedHero.rarity}`}
                          style={{background: 'rgba(0,0,0,0.7)'}}>
                          {selectedHero.rarity === "legendary" ? "⭐ Легендарный" : selectedHero.rarity === "epic" ? "💜 Эпический" : "🔵 Редкий"}
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 text-right">
                        <div className="text-2xl font-['Cinzel'] font-bold" style={{color: selectedHero.color}}>
                          {selectedHero.power.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Боевая мощь</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-['Cinzel'] font-bold text-lg text-white">{selectedHero.name}</h3>
                          <p className="text-sm text-muted-foreground">{selectedHero.class} · Уровень {selectedHero.level}</p>
                        </div>
                        <button className="btn-gold px-4 py-2 rounded-lg text-xs">Прокачать</button>
                      </div>
                      <div className="space-y-3 mb-6">
                        {[
                          { label: "Атака", val: selectedHero.atk, color: "#ff6040" },
                          { label: "Защита", val: selectedHero.def, color: "#4a9eff" },
                          { label: "HP", val: selectedHero.hp, color: "#40cc80" },
                        ].map(s => (
                          <div key={s.label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">{s.label}</span>
                              <span className="font-semibold text-white">{s.val}/100</span>
                            </div>
                            <div className="stat-bar">
                              <div className="stat-fill" style={{width: `${s.val}%`, background: `linear-gradient(90deg, ${s.color}80, ${s.color})`}} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">Скин</div>
                        <div className="flex gap-2 flex-wrap">
                          {SKINS.map((s, i) => (
                            <button key={s} onClick={() => setSkinIndex(i)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${skinIndex === i ? "btn-gold" : "btn-dark"}`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-['Cinzel'] font-semibold text-sm text-white mb-3">⚔️ Боевые юниты</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {UNITS.map(u => (
                        <div key={u.id} className="card-dark rounded-xl p-4 flex items-center gap-3 unit-card">
                          <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
                            style={{background: 'rgba(232,160,32,0.1)'}}>
                            {u.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-['Cinzel'] font-semibold text-white">{u.name}</span>
                              <span className="text-[10px]" style={{color:'#f5d170'}}>Тир {u.tier}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground mb-1">{u.type} · ⚡ {u.power}</div>
                            <div className="flex items-center gap-2">
                              <div className="stat-bar flex-1">
                                <div className="stat-fill" style={{width: `${(u.count/u.max)*100}%`}} />
                              </div>
                              <span className="text-[10px] text-muted-foreground">{u.count}/{u.max}</span>
                            </div>
                          </div>
                          <button className="text-[10px] btn-dark px-2 py-1 rounded">+</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {gameTab === "village" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <div className="card-dark rounded-2xl overflow-hidden">
                    <div className="village-bg relative" style={{minHeight: '420px'}}>
                      <div className="relative w-full" style={{minHeight: '420px'}}>
                        {VILLAGE_BUILDINGS.map(b => (
                          <button key={b.id}
                            onClick={() => setSelectedBuilding(selectedBuilding?.id === b.id ? null : b)}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{left: b.x, top: b.y}}>
                            <div className={`flex flex-col items-center gap-1 transition-all ${selectedBuilding?.id === b.id ? "scale-110" : "hover:scale-105"}`}>
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all
                                ${selectedBuilding?.id === b.id ? "selected-ring" : ""}`}
                                style={{background: 'rgba(8,10,18,0.85)', border: '1px solid rgba(232,160,32,0.3)'}}>
                                {b.icon}
                              </div>
                              <div className="text-[9px] font-semibold text-white/80 bg-black/60 px-1.5 py-0.5 rounded whitespace-nowrap">
                                {b.name} {b.level}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">🏰 Нажми на здание для управления</div>
                      <button className="btn-gold px-4 py-2 rounded-lg text-xs">+ Построить</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedBuilding ? (
                    <div className="card-dark rounded-2xl p-5 animate-fade-in-up">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{selectedBuilding.icon}</span>
                        <div>
                          <h3 className="font-['Cinzel'] font-bold text-sm text-white">{selectedBuilding.name}</h3>
                          <p className="text-[10px] text-muted-foreground">Уровень {selectedBuilding.level}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">{selectedBuilding.desc}</p>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">До следующего уровня</span>
                        <span style={{color:'#f5d170'}}>75%</span>
                      </div>
                      <div className="stat-bar mb-4">
                        <div className="stat-fill" style={{width: '75%'}} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="btn-gold py-2 rounded-lg text-xs">Улучшить</button>
                        <button className="btn-dark py-2 rounded-lg text-xs">Сменить скин</button>
                      </div>
                    </div>
                  ) : (
                    <div className="card-dark rounded-2xl p-5 text-center">
                      <span className="text-4xl block mb-3">🏰</span>
                      <p className="text-xs text-muted-foreground">Выбери здание на карте для управления</p>
                    </div>
                  )}

                  <div className="card-dark rounded-2xl p-4">
                    <div className="text-xs font-['Cinzel'] font-semibold text-white mb-3">Ресурсы</div>
                    <div className="space-y-3">
                      {[
                        { icon: "💰", name: "Золото", val: 485200, max: 600000, color: "#f5d170" },
                        { icon: "🌲", name: "Дерево", val: 120500, max: 200000, color: "#40cc80" },
                        { icon: "⛏️", name: "Камень", val: 74300, max: 150000, color: "#a0a0b0" },
                      ].map(r => (
                        <div key={r.name}>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-muted-foreground">{r.icon} {r.name}</span>
                            <span style={{color: r.color}}>{r.val.toLocaleString()}</span>
                          </div>
                          <div className="stat-bar">
                            <div className="stat-fill" style={{width: `${(r.val/r.max)*100}%`, background: r.color}} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-dark rounded-2xl p-4">
                    <div className="text-xs font-['Cinzel'] font-semibold text-white mb-3">Скины деревни</div>
                    <div className="space-y-2">
                      {[
                        { name: "Стандартный", active: true, icon: "🏡" },
                        { name: "Ледяная крепость", active: false, icon: "❄️" },
                        { name: "Огненная твердыня", active: false, icon: "🔥" },
                      ].map(s => (
                        <div key={s.name} className="flex items-center justify-between p-2.5 rounded-lg"
                          style={{background: s.active ? 'rgba(232,160,32,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${s.active ? 'rgba(232,160,32,0.3)' : 'transparent'}`}}>
                          <div className="flex items-center gap-2">
                            <span>{s.icon}</span>
                            <span className="text-xs text-white">{s.name}</span>
                          </div>
                          {s.active
                            ? <span className="text-[10px] font-semibold" style={{color:'#40cc80'}}>✓ Активен</span>
                            : <button className="text-[10px] btn-dark px-2 py-1 rounded">Купить</button>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {gameTab === "battle" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-dark rounded-2xl overflow-hidden">
                    <div className="hero-bg flex items-center justify-between p-6" style={{minHeight: '160px'}}>
                      <div>
                        <h3 className="font-['Cinzel'] font-bold text-xl text-white mb-1">Найти врага</h3>
                        <p className="text-sm text-muted-foreground">Твоя мощь: <span className="font-bold" style={{color:'#f5d170'}}>9,450</span></p>
                      </div>
                      <button className="btn-gold px-8 py-4 rounded-xl text-base animate-pulse-glow ember-glow">
                        ⚔️ Атаковать
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-['Cinzel'] font-semibold text-white mb-3">История битв</div>
                    <div className="space-y-2">
                      {BATTLES.map(b => (
                        <div key={b.id} className="card-dark rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                              ${b.result === "Победа" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                              {b.result === "Победа" ? "✓" : "✗"}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">{b.enemy}</div>
                              <div className="text-[10px] text-muted-foreground">{b.time} · ⚡ {b.power.toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-bold ${b.result === "Победа" ? "text-green-400" : "text-red-400"}`}>{b.result}</div>
                            <div className={`text-xs font-semibold ${b.trophy.startsWith("+") ? "text-yellow-400" : "text-red-400"}`}>🏆 {b.trophy}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="card-dark rounded-2xl p-4">
                    <div className="text-xs font-['Cinzel'] font-semibold text-white mb-3">Боевая статистика</div>
                    <div className="space-y-3">
                      {[
                        { label: "Победы", val: 142, icon: "🏆", color: "#f5d170" },
                        { label: "Поражения", val: 38, icon: "💀", color: "#ff6040" },
                        { label: "Серия побед", val: 7, icon: "🔥", color: "#ff9020" },
                        { label: "Кубки", val: 4820, icon: "👑", color: "#b060ff" },
                      ].map(s => (
                        <div key={s.label} className="flex items-center justify-between p-2.5 rounded-lg"
                          style={{background: 'rgba(255,255,255,0.03)'}}>
                          <span className="text-xs text-muted-foreground">{s.icon} {s.label}</span>
                          <span className="text-sm font-bold" style={{color: s.color}}>{s.val.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-dark rounded-2xl p-4">
                    <div className="text-xs font-['Cinzel'] font-semibold text-white mb-3">Рейтинг</div>
                    <div className="text-center py-3">
                      <div className="text-5xl mb-2">👑</div>
                      <div className="font-['Cinzel'] text-xl font-bold gold-text">Золотая Лига</div>
                      <div className="text-xs text-muted-foreground mt-1">Топ 5% игроков</div>
                      <div className="mt-3 stat-bar">
                        <div className="stat-fill" style={{width: '72%'}} />
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">72% до Платины</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
                { icon: "📱", title: "Telegram", desc: "@LegendsSupportBot", action: "Перейти", color: "#b060ff" },
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
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="mobile-nav fixed bottom-0 left-0 right-0 z-50 md:hidden flex">
        {([
          { t: "home" as Tab, icon: "Home", label: "Главная" },
          { t: "game" as Tab, icon: "Sword", label: "Игра" },
          { t: "profile" as Tab, icon: "User", label: "Профиль" },
          { t: "shop" as Tab, icon: "ShoppingBag", label: "Магазин" },
          { t: "support" as Tab, icon: "HelpCircle", label: "Помощь" },
        ]).map(item => (
          <button key={item.t} onClick={() => setTab(item.t)}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-all ${tab === item.t ? "" : "opacity-50"}`}>
            <Icon name={item.icon} size={20} className={tab === item.t ? "text-primary" : "text-muted-foreground"} />
            <span className={`text-[9px] font-semibold ${tab === item.t ? "text-primary" : "text-muted-foreground"}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
