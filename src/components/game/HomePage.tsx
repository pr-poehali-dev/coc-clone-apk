type Tab = "home" | "game" | "profile" | "shop" | "support";

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

interface HomePageProps {
  setTab: (t: Tab) => void;
  setGameTab: (t: "heroes" | "village" | "battle") => void;
}

export default function HomePage({ setTab, setGameTab }: HomePageProps) {
  return (
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
        <div className="text-center mb-10">
          <h2 className="font-['Cinzel'] text-2xl font-bold gold-text mb-2">Почему Legends of War?</h2>
          <p className="text-sm text-muted-foreground">Тысячи игроков уже строят свои империи</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: "⚔️", title: "Эпические герои", desc: "Более 120 уникальных героев с особыми способностями. Легендарные, эпические, редкие классы." },
            { icon: "🏰", title: "Строй деревню", desc: "Возводи здания, улучшай инфраструктуру, защищай свои владения от атак врагов." },
            { icon: "💥", title: "Клановые войны", desc: "Объединяйся с союзниками, участвуй в клановых войнах и штурмуй замки противника." },
          ].map(f => (
            <div key={f.title} className="card-dark rounded-2xl p-6 unit-card text-center">
              <div className="text-4xl mb-4 animate-float inline-block">{f.icon}</div>
              <h3 className="font-['Cinzel'] font-bold text-sm text-white mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="card-dark rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Твоя база</div>
              <h2 className="font-['Cinzel'] text-xl font-bold gold-text mb-2">Деревня WarLord_Supreme</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Ратуша уровня 8 · 8 зданий · Сила защиты: 9,450
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
  );
}
