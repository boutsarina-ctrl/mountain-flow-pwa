// Mountain Flow - PWA Version 1
// App Name: Mountain Flow
// Subtitle: Habits, Movement & Mindfulness
// Theme: Auto (light/dark)

import React, { useState, useEffect } from 'react';
import './tailwind.css';

// ------------------- Local Storage Helpers -------------------
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// ------------------- Morning Ritual -------------------
const defaultMorning = { sunlight: false, movement: false, intention: false, breath: false, hydration: false };

// ------------------- Evening Detox -------------------
const detoxMenuBase = {
  UltraLow: [
    "Lie on floor + 10 slow breaths",
    "Drink water + look out the window 2 min",
    "Barefoot balcony/doorstep air",
    "One-cat-cow + one neck roll",
    "Lights off, eyes closed 3 min"
  ],
  Low: ["10 min mobility", "Yoga Nidra / NSDR", "Light language audio", "Tea + journal", "Fiction reading", "Eye relaxation"],
  Medium: ["Babbel + short writing", "Strength + mobility combo", "Learn new recipe", "Breathwork + meditation", "Organize one small space"],
  High: ["Deep strength session", "Creative project", "Long planning session", "Cold exposure + breathwork"],
};
const eveningEnergyOptions = ["UltraLow", "Low", "Medium", "High"];
const progressiveDetoxMap = {
  Day1: "No social media after 20:00",
  Day3: "No algorithmic content after dinner",
  Day7: "Only intentional media",
  Day14: "Full evening screen-free",
  SOS: "UltraLow mode only — zero self-judgment"
};

// ------------------- Micro Outdoor Breaks -------------------
const outdoorBreaks = {
  15: ["Sunlight walk", "Breathing + horizon gaze", "Mobility laps"],
  30: ["Easy jog", "Forest loop walk", "Stairs + stretch"],
  45: ["Short trail run", "Hilly interval walk", "Easy bike spin"]
};

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function generateOutdoorBreak(minutes = 15) { return randomFrom(outdoorBreaks[minutes]); }

// ------------------- Sport Planning -------------------
const defaultSportPlan = {
  climbing: [],
  running: [],
  skiing: [],
};
const defaultPainRecovery = { pain: 0, recovery: 100 };

// ------------------- Language Tracking -------------------
const defaultLanguage = { French: 0, Spanish: 0, Swedish: 0, Italian: 0 };

// ------------------- Weekend Adventures -------------------
const seasonalAdventures = {
  Winter: {
    quick: ["Brauneck snowshoe sunset lap", "Local valley winter run", "Lenggries cold exposure walk"],
    weekend: ["Tegernsee winter hike", "Achensee snowshoe tour", "Karwendel winter valley"],
    special: ["Stubai ski touring weekend", "Arlberg winter trip"],
    bad: ["Indoor climbing session", "Strength + mobility marathon", "Sauna + stretch"],
  },
  Spring: {
    quick: ["Isar river flow run", "Jachenau forest hike", "Local hill intervals"],
    weekend: ["Waterfall hikes Alpspitze", "Tegernsee ridge hikes"],
    special: ["Dolomites spring climbing", "Zillertal trail weekend"],
    bad: ["Technique bouldering", "Long yoga + core", "Route planning workshop"],
  },
  Summer: {
    quick: ["Evening trail above Lenggries", "Sylvenstein loop run"],
    weekend: ["Karwendel ridge hike", "Via ferrata Achensee"],
    special: ["Western Alps hut-to-hut", "Dolomites multi-day trek"],
    bad: ["Indoor endurance circuit", "Breathwork + heat theory", "Creative deep dive"],
  },
  Autumn: {
    quick: ["Foliage valley run", "Local peak sunset hike"],
    weekend: ["Karwendel golden ridge hike", "Tegernsee panorama run"],
    special: ["Southern Alps photography trip"],
    bad: ["Strength cycle test", "Mobility recovery day", "Training review + planning"],
  },
};

// ------------------- Main App Component -------------------
export default function App() {
  const [morningRitual, setMorningRitual] = useLocalStorage('morningRitual', defaultMorning);
  const [sportPlan, setSportPlan] = useLocalStorage('sportPlan', defaultSportPlan);
  const [painRecovery, setPainRecovery] = useLocalStorage('painRecovery', defaultPainRecovery);
  const [language, setLanguage] = useLocalStorage('language', defaultLanguage);
  const [eveningEnergy, setEveningEnergy] = useState('Low');
  const [outdoorBreak, setOutdoorBreak] = useState('');
  const [adventureDistance, setAdventureDistance] = useState('quick');
  const [adventureSuggestion, setAdventureSuggestion] = useState('');

  const generateAdventure = () => {
    const season = getSeason();
    const weatherKey = adventureDistance;
    const options = seasonalAdventures[season][weatherKey] || seasonalAdventures[season].quick;
    const adventure = randomFrom(options);
    setAdventureSuggestion(`${adventure} — ${adventureDistance === "quick" ? "≤1h drive" : adventureDistance === "weekend" ? "1–3h" : "Special Alps Trip"}`);
  };

  const generateOutdoor = (minutes) => { setOutdoorBreak(generateOutdoorBreak(minutes)); };

  function getSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 12 || month <= 2) return 'Winter';
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    return 'Autumn';
  }

  return (
    <div className="p-4 font-sans min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Mountain Flow</h1>
        <p className="text-sm text-neutral-500">Habits, Movement & Mindfulness</p>
      </header>

      <section className="mb-4">
        <h2 className="font-semibold mb-2">Morning Ritual</h2>
        <p className="text-xs text-neutral-500 mb-1">10–20 min pre-work activation</p>
        {Object.keys(morningRitual).map((key) => (
          <div key={key} className="flex items-center mb-1">
            <input type="checkbox" checked={morningRitual[key]} onChange={() => setMorningRitual({...morningRitual, [key]: !morningRitual[key]})} />
            <span className="ml-2 capitalize">{key}</span>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-2">Evening Detox ({eveningEnergy})</h2>
        <ul className="list-disc list-inside">
          {detoxMenuBase[eveningEnergy].map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <select value={eveningEnergy} onChange={(e) => setEveningEnergy(e.target.value)} className="mt-2">
          {eveningEnergyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-2">Outdoor Break</h2>
        <button className="p-2 bg-neutral-200 dark:bg-neutral-700 rounded" onClick={() => generateOutdoor(15)}>15 min break</button>
        <button className="p-2 bg-neutral-200 dark:bg-neutral-700 rounded ml-1" onClick={() => generateOutdoor(30)}>30 min break</button>
        <button className="p-2 bg-neutral-200 dark:bg-neutral-700 rounded ml-1" onClick={() => generateOutdoor(45)}>45 min break</button>
        {outdoorBreak && <p className="mt-2">Suggestion: {outdoorBreak}</p>}
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-2">Weekend Adventure</h2>
        <div className="flex gap-1 mb-2">
          <button onClick={() => setAdventureDistance("quick")} className={`px-2 py-1 rounded ${adventureDistance === "quick" ? "bg-neutral-300" : "bg-white dark:bg-neutral-700"}`}>Quick</button>
          <button onClick={() => setAdventureDistance("weekend")} className={`px-2 py-1 rounded ${adventureDistance === "weekend" ? "bg-neutral-300" : "bg-white dark:bg-neutral-700"}`}>Weekend</button>
          <button onClick={() => setAdventureDistance("special")} className={`px-2 py-1 rounded ${adventureDistance === "special" ? "bg-neutral-300" : "bg-white dark:bg-neutral-700"}`}>Special</button>
        </div>
        <button onClick={generateAdventure} className="p-2 bg-neutral-200 dark:bg-neutral-700 rounded w-full">Generate Adventure</button>
        {adventureSuggestion && <p className="mt-2">{adventureSuggestion}</p>}
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-2">Sport Planning & Recovery</h2>
        <p>Placeholder for climbing, running, skiing schedule, pain & recovery tracking.</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-2">Language Learning</h2>
        <p>Placeholder for French, Spanish, Swedish, Italian tracking and streaks.</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-2">Weekly Review</h2>
        <p>Placeholder for weekly narrative reflection and analytics summary.</p>
      </section>
    </div>
  );
}
