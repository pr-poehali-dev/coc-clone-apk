import Icon from "@/components/ui/icon";

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

const BATTLES = [
  { id: 1, enemy: "Клан Теней", result: "Победа", trophy: "+48", time: "2 мин назад", power: 7800 },
  { id: 2, enemy: "Железный Форт", result: "Победа", trophy: "+32", time: "1 час назад", power: 6200 },
  { id: 3, enemy: "Северный Орден", result: "Поражение", trophy: "-15", time: "3 часа назад", power: 11400 },
  { id: 4, enemy: "Клан Огня", result: "Победа", trophy: "+56", time: "5 часов назад", power: 8100 },
];

const SKINS = ["Базовый", "Владыка Пепла", "Ледяная крепость", "Дракон"];

interface GamePageProps {
  gameTab: "heroes" | "village" | "battle";
  setGameTab: (t: "heroes" | "village" | "battle") => void;
  selectedHero: typeof HEROES[0];
  setSelectedHero: (h: typeof HEROES[0]) => void;
  selectedBuilding: typeof VILLAGE_BUILDINGS[0] | null;
  setSelectedBuilding: (b: typeof VILLAGE_BUILDINGS[0] | null) => void;
  skinIndex: number;
  setSkinIndex: (i: number) => void;
}

export default function GamePage({
  gameTab,
  setGameTab,
  selectedHero,
  setSelectedHero,
  selectedBuilding,
  setSelectedBuilding,
  skinIndex,
  setSkinIndex,
}: GamePageProps) {
  return (
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
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white">{u.name}</span>
                        <span className="text-[10px] text-muted-foreground">Тир {u.tier}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mb-1.5">{u.type} · ⚡ {u.power}</div>
                      <div className="stat-bar">
                        <div className="stat-fill" style={{width: `${(u.count/u.max)*100}%`}} />
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">{u.count}/{u.max} юнитов</div>
                    </div>
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
            <div className="card-dark rounded-2xl overflow-hidden relative"
              style={{height: '460px', background: 'linear-gradient(160deg, #0d1f0a 0%, #0a1a08 40%, #081508 100%)'}}>
              <div className="absolute inset-0 opacity-30"
                style={{backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(34,85,20,0.6) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(20,60,12,0.5) 0%, transparent 50%)'}} />
              <div className="absolute inset-0 overflow-hidden">
                {["🌿","🌱","🍃","🌿","🌱"].map((e, i) => (
                  <span key={i} className="absolute text-lg opacity-20"
                    style={{left: `${10 + i * 20}%`, top: `${60 + (i % 3) * 10}%`}}>{e}</span>
                ))}
              </div>
              {VILLAGE_BUILDINGS.map(b => (
                <button key={b.id}
                  onClick={() => setSelectedBuilding(selectedBuilding?.id === b.id ? null : b)}
                  className={`absolute flex flex-col items-center gap-0.5 group transition-transform hover:scale-110
                    ${selectedBuilding?.id === b.id ? "scale-110" : ""}`}
                  style={{left: b.x, top: b.y, transform: 'translate(-50%, -50%)'}}>
                  <div className={`text-3xl drop-shadow-lg ${selectedBuilding?.id === b.id ? "animate-float" : ""}`}>
                    {b.icon}
                  </div>
                  <div className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                    style={{background: 'rgba(0,0,0,0.7)', color: selectedBuilding?.id === b.id ? '#f5d170' : '#a0a0b0'}}>
                    {b.name}
                  </div>
                  <div className="text-[8px] font-bold" style={{color: '#f5d170'}}>Ур.{b.level}</div>
                </button>
              ))}
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
  );
}
