import { useState } from "react";
import Navbar from "@/components/game/Navbar";
import HomePage from "@/components/game/HomePage";
import GamePage from "@/components/game/GamePage";
import ShopProfileSupport from "@/components/game/ShopProfileSupport";

type Tab = "home" | "game" | "profile" | "shop" | "support";

const HEROES = [
  { id: 1, name: "Торн Железный", class: "Воин", rarity: "legendary", level: 24, power: 8420, atk: 85, def: 72, hp: 91, icon: "⚔️", color: "#ff9020" },
  { id: 2, name: "Эйлин Тени", class: "Лучница", rarity: "epic", level: 18, power: 6150, atk: 92, def: 45, hp: 63, icon: "🏹", color: "#b060ff" },
  { id: 3, name: "Магнус Руна", class: "Маг", rarity: "epic", level: 20, power: 7200, atk: 96, def: 38, hp: 55, icon: "🔮", color: "#b060ff" },
  { id: 4, name: "Брок Камень", class: "Страж", rarity: "rare", level: 14, power: 4800, atk: 62, def: 88, hp: 94, icon: "🛡️", color: "#4a9eff" },
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

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [selectedHero, setSelectedHero] = useState(HEROES[0]);
  const [gameTab, setGameTab] = useState<"heroes" | "village" | "battle">("heroes");
  const [selectedBuilding, setSelectedBuilding] = useState<typeof VILLAGE_BUILDINGS[0] | null>(null);
  const [shopCategory, setShopCategory] = useState("все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [skinIndex, setSkinIndex] = useState(0);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar tab={tab} setTab={setTab} />

      <div className="pt-16 pb-20 md:pb-0">
        {tab === "home" && (
          <HomePage setTab={setTab} setGameTab={setGameTab} />
        )}

        {tab === "game" && (
          <GamePage
            gameTab={gameTab}
            setGameTab={setGameTab}
            selectedHero={selectedHero}
            setSelectedHero={setSelectedHero}
            selectedBuilding={selectedBuilding}
            setSelectedBuilding={setSelectedBuilding}
            skinIndex={skinIndex}
            setSkinIndex={setSkinIndex}
          />
        )}

        {(tab === "profile" || tab === "shop" || tab === "support") && (
          <ShopProfileSupport
            tab={tab}
            setTab={setTab}
            shopCategory={shopCategory}
            setShopCategory={setShopCategory}
            openFaq={openFaq}
            setOpenFaq={setOpenFaq}
          />
        )}
      </div>
    </div>
  );
}
