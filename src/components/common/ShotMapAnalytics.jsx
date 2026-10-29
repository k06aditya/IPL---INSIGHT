import React, { useState, useMemo } from 'react';
import { Target, Compass } from 'lucide-react';

// --- SEEDED DATA GENERATOR (NO ML REQUIRED) ---
const generateSeededRandom = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  return function() {
    hash = Math.imul(741103597, hash) + 1891316104 | 0;
    return (hash >>> 0) / 4294967296;
  }
};

const generateDeliveries = (playerName) => {
  const rand = generateSeededRandom(playerName || "Player");
  const deliveries = [];
  const outcomes = ["DOT", "RUNS", "BOUNDARY", "SIX", "WICKET"];

  for (let i = 1; i <= 48; i++) {
    const outcome = outcomes[Math.floor(rand() * outcomes.length)];
    
    // Pitch Map Coordinates (X: -1.2m to 1.2m across pitch, Y: 1m to 18m length)
    const pitchX = (rand() * 2.2 - 1.1).toFixed(2);
    const pitchY = (rand() * 16 + 1.5).toFixed(2);

    // Wagon Wheel Coordinates (Angle: 0-360 deg, Distance: 10m to 75m)
    const angle = Math.floor(rand() * 360);
    const distance = outcome === "SIX" ? Math.floor(rand() * 15 + 65) : outcome === "BOUNDARY" ? Math.floor(rand() * 10 + 55) : Math.floor(rand() * 45 + 10);

    deliveries.push({
      id: i,
      outcome,
      pitchX: parseFloat(pitchX),
      pitchY: parseFloat(pitchY),
      angle,
      distance
    });
  }
  return deliveries;
};

export default function ShotMapAnalytics({ playerName = "Player" }) {
  const [activeTab, setActiveTab] = useState("PITCH_MAP");
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const deliveries = useMemo(() => generateDeliveries(playerName), [playerName]);

  const filteredDeliveries = useMemo(() => {
    if (selectedFilter === "ALL") return deliveries;
    if (selectedFilter === "BOUNDARIES") return deliveries.filter(d => d.outcome === "BOUNDARY" || d.outcome === "SIX");
    if (selectedFilter === "WICKETS") return deliveries.filter(d => d.outcome === "WICKET");
    if (selectedFilter === "DOTS") return deliveries.filter(d => d.outcome === "DOT");
    return deliveries;
  }, [deliveries, selectedFilter]);

  const getColor = (outcome) => {
    switch (outcome) {
      case "WICKET": return "#ef4444";  // Red
      case "SIX": return "#8b5cf6";     // Purple
      case "BOUNDARY": return "#10b981";// Green
      case "RUNS": return "#3b82f6";    // Blue
      default: return "#94a3b8";        // Slate Gray
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm font-sans w-full mt-10">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            {activeTab === "PITCH_MAP" ? <Target className="text-blue-600" size={22} /> : <Compass className="text-blue-600" size={22} />}
            {activeTab === "PITCH_MAP" ? "VI. Pitch Map Trajectory" : "VI. 360° Wagon Wheel"}
          </h2>
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-1.5">
            Visual Delivery Analytics • {playerName}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("PITCH_MAP")}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              activeTab === "PITCH_MAP" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Pitch Map
          </button>
          <button
            onClick={() => setActiveTab("WAGON_WHEEL")}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              activeTab === "WAGON_WHEEL" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Wagon Wheel
          </button>
        </div>
      </div>

      {/* Outcome Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {["ALL", "BOUNDARIES", "WICKETS", "DOTS"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                selectedFilter === filter
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-5 text-[9px] font-black text-slate-600 uppercase tracking-widest bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-sm"></span> Wicket</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] shadow-sm"></span> Six</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-sm"></span> Four</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-sm"></span> Runs</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8] shadow-sm"></span> Dot</span>
        </div>
      </div>

      {/* GRAPHIC AREA */}
      <div className="flex justify-center bg-slate-50 border border-slate-200 rounded-2xl p-8 relative overflow-hidden shadow-inner min-h-[550px] items-center">
        
        {/* --- 1. PITCH MAP VIEW --- */}
        {activeTab === "PITCH_MAP" && (
          <div className="relative flex flex-col items-center w-full max-w-sm">
            <svg width="100%" height="100%" viewBox="0 0 280 520" className="overflow-visible drop-shadow-sm">
              {/* Grass Background */}
              <rect x="0" y="0" width="280" height="520" fill="#f8fafc" rx="16" stroke="#e2e8f0" strokeWidth="2" />
              {/* Pitch Strip */}
              <rect x="50" y="40" width="180" height="440" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" rx="4" />
              {/* Length Zones */}
              <line x1="50" y1="120" x2="230" y2="120" stroke="#cbd5e1" strokeDasharray="4 4" />
              <text x="238" y="123" fill="#94a3b8" fontSize="8" fontWeight="800" fontFamily="sans-serif">FULL</text>
              <line x1="50" y1="240" x2="230" y2="240" stroke="#cbd5e1" strokeDasharray="4 4" />
              <text x="238" y="243" fill="#94a3b8" fontSize="8" fontWeight="800" fontFamily="sans-serif">GOOD</text>
              <line x1="50" y1="360" x2="230" y2="360" stroke="#cbd5e1" strokeDasharray="4 4" />
              <text x="238" y="363" fill="#94a3b8" fontSize="8" fontWeight="800" fontFamily="sans-serif">SHORT</text>
              {/* Creases */}
              <line x1="70" y1="90" x2="210" y2="90" stroke="#64748b" strokeWidth="2" />
              <rect x="122" y="70" width="36" height="6" fill="#0f172a" rx="1" />
              <line x1="70" y1="430" x2="210" y2="430" stroke="#64748b" strokeWidth="2" />
              <rect x="122" y="444" width="36" height="6" fill="#0f172a" rx="1" />

              {/* Plot Pitch Deliveries */}
              {filteredDeliveries.map((d) => {
                const svgX = 140 + d.pitchX * 65;
                const svgY = 80 + (d.pitchY / 20) * 350;
                return (
                  <g key={d.id} className="transition-all hover:scale-150 cursor-pointer origin-center">
                    <circle cx={svgX} cy={svgY} r="7.5" fill={getColor(d.outcome)} stroke="#ffffff" strokeWidth="2" />
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* --- 2. WAGON WHEEL VIEW --- */}
        {activeTab === "WAGON_WHEEL" && (
          <div className="relative flex flex-col items-center w-full max-w-md">
            <svg width="100%" height="100%" viewBox="0 0 440 440" className="overflow-visible drop-shadow-sm">
              {/* Stadium Boundary Oval */}
              <ellipse cx="220" cy="220" rx="210" ry="200" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
              {/* 30-Yard Circle */}
              <ellipse cx="220" cy="220" rx="90" ry="85" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />
              {/* Center Pitch */}
              <rect x="214" y="200" width="12" height="40" fill="#cbd5e1" rx="2" />
              
              {/* Direction Labels */}
              <text x="220" y="8" fill="#94a3b8" fontSize="9" fontWeight="900" textAnchor="middle">LONG OFF / ON</text>
              <text x="438" y="223" fill="#94a3b8" fontSize="9" fontWeight="900" textAnchor="start">POINT / COVER</text>
              <text x="220" y="438" fill="#94a3b8" fontSize="9" fontWeight="900" textAnchor="middle">BEHIND SQUARE</text>
              <text x="2" y="223" fill="#94a3b8" fontSize="9" fontWeight="900" textAnchor="end">MID WICKET</text>

              {/* Plot Shot Rays */}
              {filteredDeliveries.map((d) => {
                const rad = (d.angle - 90) * (Math.PI / 180);
                const maxR = 195;
                const shotR = Math.min((d.distance / 80) * maxR, maxR);
                const targetX = 220 + shotR * Math.cos(rad);
                const targetY = 220 + shotR * Math.sin(rad);

                return (
                  <g key={d.id} className="transition-all hover:opacity-100 cursor-pointer">
                    <line
                      x1="220"
                      y1="220"
                      x2={targetX}
                      y2={targetY}
                      stroke={getColor(d.outcome)}
                      strokeWidth={d.outcome === "SIX" || d.outcome === "BOUNDARY" ? "3" : "1.5"}
                      opacity={d.outcome === "DOT" ? "0.2" : "0.85"}
                    />
                    <circle
                      cx={targetX}
                      cy={targetY}
                      r={d.outcome === "SIX" ? "5.5" : "4"}
                      fill={getColor(d.outcome)}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}