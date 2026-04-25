import Icon from "@/components/ui/icon";

type Tab = "home" | "game" | "profile" | "shop" | "support";

interface NavbarProps {
  tab: Tab;
  setTab: (t: Tab) => void;
}

export default function Navbar({ tab, setTab }: NavbarProps) {
  return (
    <>
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
    </>
  );
}
