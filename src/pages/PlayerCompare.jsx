import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Swords, Target, ChevronDown, Activity, Clock, Search, Dna, Flag } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

import ShotMapAnalytics from '../components/common/ShotMapAnalytics';

// --- MASSIVE EXPANDED LIST OF PLAYERS ---
const PLAYER_LIST = [
  "A Mishra", "A Nortje", "A Zampa", "AB de Villiers", "AD Russell", 
  "AM Rahane", "AR Patel", "Arshdeep Singh", "AT Rayudu", "B Kumar", 
  "C Green", "CH Gayle", "CV Varun", "DA Miller", "DA Warner", 
  "DJ Bravo", "DJ Hooda", "DL Chahar", "DP Conway", "F du Plessis", 
  "G Gambhir", "GJ Maxwell", "H Klaasen", "HH Pandya", "HV Patel", 
  "Ishan Kishan", "JC Buttler", "JJ Bumrah", "JM Bairstow", "K Gowtham", 
  "K Rabada", "KA Pollard", "KD Karthik", "KH Pandya", "KL Rahul", 
  "KS Williamson", "Kuldeep Yadav", "LH Ferguson", "M Pathirana", "M Vijay", 
  "M Wood", "MA Agarwal", "MA Starc", "MK Pandey", "MM Sharma", 
  "Mohammed Shami", "Mohammed Siraj", "MP Stoinis", "MS Dhoni", "N Pooran", 
  "Naveen-ul-Haq", "P Salt", "PA Patel", "PJ Cummins", "Q de Kock", 
  "R Ashwin", "R Bishnoi", "R Dravid", "R Parag", "R Patidar", 
  "RA Jadeja", "Rashid Khan", "RD Chahar", "RD Gaikwad", "RG Sharma", 
  "Rinku Singh", "RR Pant", "RV Uthappa", "S Dhawan", "S Dube", 
  "S Gill", "S Smith", "SA Yadav", "SK Raina", "SL Malinga", 
  "SN Thakur", "SO Hetmyer", "SP Narine", "SR Tendulkar", "SR Watson", 
  "SS Iyer", "SV Samson", "TA Boult", "TH David", "Tilak Varma", 
  "TM Head", "UT Yadav", "V Kohli", "V Sehwag", "Washington Sundar", 
  "WP Saha", "YBK Jaiswal", "YS Chahal", "Yuvraj Singh", "Z Khan"
].sort();

// --- CUSTOM SEARCHABLE DROPDOWN COMPONENT ---
const SearchableDropdown = ({ value, onChange, options, label, colorTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const themeColors = colorTheme === 'red' 
    ? { text: 'text-red-500', border: 'border-red-100', focus: 'focus:border-red-400', icon: 'text-red-400', bgHover: 'hover:bg-red-50', align: 'md:items-end', textCol: 'md:text-right' }
    : { text: 'text-blue-500', border: 'border-blue-100', focus: 'focus:border-blue-400', icon: 'text-blue-400', bgHover: 'hover:bg-blue-50', align: 'md:items-start', textCol: 'md:text-left' };

  return (
    <div className={`flex flex-col items-center ${themeColors.align} space-y-3 relative w-full`} ref={wrapperRef}>
      <label className={`text-[10px] font-bold ${themeColors.text} tracking-widest uppercase`}>{label}</label>
      
      <div className="relative w-full max-w-xs">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-slate-50 border-2 ${themeColors.border} text-slate-900 font-black text-xl py-3 px-4 rounded-xl cursor-pointer flex justify-between items-center transition-colors hover:bg-slate-100`}
        >
          <span className={`truncate w-full text-center ${themeColors.textCol}`}>{value.toUpperCase()}</span>
          <ChevronDown className={`${themeColors.icon} transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
        </div>

        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50">
            <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search players..." 
                className="w-full bg-transparent text-sm font-bold focus:outline-none text-slate-700 placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <ul className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {filteredOptions.length > 0 ? filteredOptions.map(p => (
                <li 
                  key={p} 
                  onClick={() => handleSelect(p)}
                  className={`px-4 py-3 text-sm font-black text-slate-700 cursor-pointer ${themeColors.bgHover} border-b border-slate-50 last:border-0 transition-colors`}
                >
                  {p.toUpperCase()}
                </li>
              )) : (
                <li className="px-4 py-4 text-sm font-bold text-slate-400 text-center italic">No players found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SEEDED DATA GENERATOR ---
const generateSeededRandom = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  return function() {
    hash = Math.imul(741103597, hash) + 1891316104 | 0;
    return (hash >>> 0) / 4294967296;
  }
};

const getPlayerData = (name) => {
  const rand = generateSeededRandom(name.toUpperCase());
  const getRand = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
  
  const floatSr = (rand() * 50 + 110);
  const floatAvg = (rand() * 25 + 15);
  
  const rawMat = getRand(50, 200);
  const rawRuns = getRand(1000, 5000);
  const rawInn = Math.floor(rawMat * 0.95);
  const avgRunsPerInn = rawRuns / rawInn;
  
  const baseData = {
    name: name.toUpperCase(),
    mat: rawMat,
    runs: rawRuns,
    avg: floatAvg.toFixed(1),
    sr: floatSr.toFixed(1),
    hs: getRand(60, 120),
    hundreds: getRand(0, 4),
    fifties: getRand(5, 30),
    boundaries: `${getRand(100, 400)}/${getRand(30, 150)}`,
    role: "BAT",
    seasons: Array.from({ length: 19 }, (_, i) => ({ year: (2008 + i).toString(), runs: getRand(150, 700) })),
    phases: {
      powerplay: { sr: (floatSr * 0.9).toFixed(1), runs: getRand(300, 1500) },
      middle: { sr: (floatSr * 0.95).toFixed(1), runs: getRand(500, 2500) },
      death: { sr: (floatSr * 1.3).toFixed(1), runs: getRand(200, 1000) }
    },
    // Mathematically estimated milestones for dynamically generated players
    milestones: {
      m1k: rawRuns >= 1000 ? Math.floor((1000 / avgRunsPerInn) * (rand() * 0.2 + 0.9)) : null,
      m3k: rawRuns >= 3000 ? Math.floor((3000 / avgRunsPerInn) * (rand() * 0.2 + 0.9)) : null,
      m5k: rawRuns >= 5000 ? Math.floor((5000 / avgRunsPerInn) * (rand() * 0.2 + 0.9)) : null,
    }
  };

  // Hardcoded legends for exact realism
  if (name === "V Kohli") {
    baseData.mat = 252; baseData.runs = 8004; baseData.avg = "38.6"; baseData.sr = "131.9"; baseData.hs = 113; baseData.hundreds = 8; baseData.fifties = 55; baseData.boundaries = "705/272";
    baseData.seasons = [ { year: '2016', runs: 973 }, { year: '2017', runs: 308 }, { year: '2018', runs: 530 }, { year: '2019', runs: 464 }, { year: '2020', runs: 466 }, { year: '2021', runs: 405 }, { year: '2022', runs: 341 }, { year: '2023', runs: 639 }, { year: '2024', runs: 741 }, { year: '2025', runs: 657 }, { year: '2026', runs: 675 } ];
    baseData.phases = { powerplay: { sr: "129.6", runs: 3477 }, middle: { sr: "125.8", runs: 4286 }, death: { sr: "188.4", runs: 1573 } };
    baseData.milestones = { m1k: 29, m3k: 110, m5k: 157 };
  }
  if (name === "RG Sharma") {
    baseData.mat = 257; baseData.runs = 6628; baseData.avg = "29.7"; baseData.sr = "131.1"; baseData.hs = 109; baseData.hundreds = 2; baseData.fifties = 43; baseData.boundaries = "599/280";
    baseData.seasons = [ { year: '2016', runs: 489 }, { year: '2017', runs: 333 }, { year: '2018', runs: 286 }, { year: '2019', runs: 405 }, { year: '2020', runs: 332 }, { year: '2021', runs: 381 }, { year: '2022', runs: 268 }, { year: '2023', runs: 332 }, { year: '2024', runs: 417 }, { year: '2025', runs: 418 }, { year: '2026', runs: 283 } ];
    baseData.phases = { powerplay: { sr: "126.4", runs: 2564 }, middle: { sr: "122.5", runs: 3238 }, death: { sr: "181.1", runs: 1527 } };
    baseData.milestones = { m1k: 37, m3k: 109, m5k: 187 };
  }
  if (name === "AB de Villiers") {
    baseData.mat = 184; baseData.runs = 5162; baseData.avg = "39.7"; baseData.sr = "151.6"; baseData.hs = 133; baseData.hundreds = 3; baseData.fifties = 40; baseData.boundaries = "413/251";
    baseData.milestones = { m1k: 43, m3k: 104, m5k: 161 };
  }
  if (name === "MS Dhoni") {
    baseData.mat = 264; baseData.runs = 5243; baseData.avg = "39.1"; baseData.sr = "137.5"; baseData.hs = 84; baseData.hundreds = 0; baseData.fifties = 24; baseData.boundaries = "363/252";
    baseData.milestones = { m1k: 41, m3k: 116, m5k: 208 };
  }
  if (name === "CH Gayle") {
    baseData.mat = 142; baseData.runs = 4965; baseData.avg = "39.7"; baseData.sr = "148.9"; baseData.hs = 175; baseData.hundreds = 6; baseData.fifties = 31; baseData.boundaries = "405/357";
    baseData.milestones = { m1k: 27, m3k: 75, m5k: null };
  }
  if (name === "S Gill") {
    baseData.mat = 103; baseData.runs = 3216; baseData.avg = "37.8"; baseData.sr = "135.2"; baseData.hs = 129; baseData.hundreds = 4; baseData.fifties = 20; baseData.boundaries = "315/98";
    baseData.milestones = { m1k: 36, m3k: 94, m5k: null };
  }
  if (name === "HH Pandya") {
    baseData.mat = 137; baseData.runs = 2525; baseData.avg = "28.7"; baseData.sr = "143.5"; baseData.hs = 91; baseData.hundreds = 0; baseData.fifties = 10; baseData.boundaries = "187/135";
    baseData.milestones = { m1k: 58, m3k: null, m5k: null };
  }
  if (name === "GJ Maxwell") {
    baseData.mat = 134; baseData.runs = 2771; baseData.avg = "24.7"; baseData.sr = "156.7"; baseData.hs = 95; baseData.hundreds = 0; baseData.fifties = 18; baseData.boundaries = "240/158";
    baseData.milestones = { m1k: 45, m3k: null, m5k: null };
  }
  if (name === "SR Tendulkar") {
    baseData.mat = 78; baseData.runs = 2334; baseData.avg = "34.8"; baseData.sr = "119.8"; baseData.hs = 100; baseData.hundreds = 1; baseData.fifties = 13; baseData.boundaries = "296/29";
    baseData.milestones = { m1k: 31, m3k: null, m5k: null };
  }
  if (name === "N Pooran") {
    baseData.mat = 104; baseData.runs = 2527; baseData.avg = "30.4"; baseData.sr = "164.1"; baseData.hs = 87; baseData.hundreds = 0; baseData.fifties = 15; baseData.boundaries = "169/186";
    baseData.milestones = { m1k: 48, m3k: null, m5k: null };
  }
  if (name === "KL Rahul") {
    baseData.mat = 132; baseData.runs = 4683; baseData.avg = "45.0"; baseData.sr = "134.4"; baseData.hs = 132; baseData.hundreds = 4; baseData.fifties = 37; baseData.boundaries = "415/187";
    baseData.milestones = { m1k: 29, m3k: 80, m5k: null };
  }
  
  return baseData;
};

const getRadarMetrics = (player) => {
  const rand = generateSeededRandom(player.name);
  const getRand = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
  const sr = parseFloat(player.sr) || 130;
  const avg = parseFloat(player.avg) || 30;

  return [
    { name: "MIDDLE SR", val: (sr * 0.95).toFixed(1), pct: getRand(50, 95), cat: "TEMPO" },
    { name: "ACCELERATION", val: `${(sr / 100).toFixed(2)}x`, pct: getRand(40, 90), cat: "POWER" },
    { name: "BOUNDARY %", val: `${getRand(40, 75)}%`, pct: getRand(50, 95), cat: "POWER" },
    { name: "SIX RATE", val: getRand(4, 15).toFixed(1), pct: getRand(40, 95), cat: "POWER" },
    { name: "DEATH SR", val: (sr * 1.3).toFixed(1), pct: getRand(60, 95), cat: "POWER" },
    { name: "CHASE SR", val: (sr * 0.98).toFixed(1), pct: getRand(50, 90), cat: "POWER" },
    { name: "AVERAGE", val: avg.toFixed(1), pct: getRand(50, 95), cat: "CONSISTENCY" },
    { name: "BIG SCORE %", val: `${getRand(20, 50)}%`, pct: getRand(50, 90), cat: "CONSISTENCY" },
    { name: "CONVERSION", val: `${getRand(30, 60)}%`, pct: getRand(40, 85), cat: "CONSISTENCY" },
    { name: "BALLS/BNDY", val: getRand(4, 8).toFixed(1), pct: getRand(50, 90), cat: "CONSISTENCY" },
    { name: "DOT %", val: `${getRand(25, 45)}%`, pct: getRand(50, 90), cat: "TEMPO" },
    { name: "FIFTY RATE", val: `${getRand(10, 30)}%`, pct: getRand(50, 95), cat: "TEMPO" }
  ];
};

// --- DUAL RADAR CHART COMPONENT ---
const DualOvergraphRadar = ({ player1, p1Metrics, player2, p2Metrics }) => {
  if (!p1Metrics || !p2Metrics) return null;

  const cx = 240; const cy = 220; const R = 130;

  const getCoordinates = (index, radius) => {
    const angle = (index * 30 - 90) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  };

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getPolygonPoints = (metrics) => metrics.map((m, i) => {
    const pctVal = isNaN(Number(m.pct)) ? 20 : Number(m.pct);
    const { x, y } = getCoordinates(i, Math.max(20, (pctVal / 100) * R));
    return `${x},${y}`;
  }).join(" ");

  const points1 = getPolygonPoints(p1Metrics);
  const points2 = getPolygonPoints(p2Metrics);

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-full max-w-2xl overflow-visible flex justify-center">
        <svg width="480" height="460" viewBox="0 0 480 460" className="overflow-visible drop-shadow-sm">
          {gridLevels.map((level, idx) => {
            const points = Array.from({ length: 12 }, (_, i) => `${getCoordinates(i, R * level).x},${getCoordinates(i, R * level).y}`).join(" ");
            return <polygon key={idx} points={points} fill="none" stroke="#e2e8f0" strokeWidth={idx === 4 ? "2" : "1"} />;
          })}
          {Array.from({ length: 12 }, (_, i) => <line key={i} x1={cx} y1={cy} x2={getCoordinates(i, R).x} y2={getCoordinates(i, R).y} stroke="#e2e8f0" strokeWidth="1" />)}

          {/* Polygons */}
          <polygon points={points2} fill="#3b82f6" fillOpacity="0.4" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points={points1} fill="#ef4444" fillOpacity="0.4" stroke="#dc2626" strokeWidth="2.5" strokeLinejoin="round" />

          {/* Dots */}
          {p2Metrics.map((m, i) => {
            const { x, y } = getCoordinates(i, Math.max(20, (m.pct / 100) * R));
            return <circle key={`p2-dot-${i}`} cx={x} cy={y} r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />;
          })}
          {p1Metrics.map((m, i) => {
            const { x, y } = getCoordinates(i, Math.max(20, (m.pct / 100) * R));
            return <circle key={`p1-dot-${i}`} cx={x} cy={y} r="4" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />;
          })}

          {/* Labels */}
          {p1Metrics.map((m, i) => {
            const { x, y } = getCoordinates(i, R + 40);
            let textAnchor = "middle"; if (x < cx - 10) textAnchor = "end"; if (x > cx + 10) textAnchor = "start";
            return (
              <g key={`label-${i}`}>
                <text x={x} y={y - 2} fill="#64748b" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="1px" textAnchor={textAnchor}>{m.name}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex justify-center gap-10 mt-2 bg-slate-50 border border-slate-200 px-6 py-3 rounded-full shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#ef4444] border border-[#dc2626]"></span>
          <span className="text-xs font-black text-slate-800 tracking-widest">{player1.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#3b82f6] border border-[#2563eb]"></span>
          <span className="text-xs font-black text-slate-800 tracking-widest">{player2.name}</span>
        </div>
      </div>
    </div>
  );
};

// --- MILESTONE RACE COMPONENT ---
const MilestoneRace = ({ p1, p2 }) => {
  const renderTrack = (title, key, maxInn) => {
    const v1 = p1.milestones[key];
    const v2 = p2.milestones[key];

    if (!v1 && !v2) return null; // Neither has reached this milestone

    const pos1 = v1 ? Math.min(96, (v1 / maxInn) * 100) : null;
    const pos2 = v2 ? Math.min(96, (v2 / maxInn) * 100) : null;

    // Lower innings = better/faster
    const p1Faster = v1 && (!v2 || v1 < v2);
    const p2Faster = v2 && (!v1 || v2 < v1);

    return (
      <div className="mb-14 last:mb-0 relative">
         <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
         </div>

         {/* The Track */}
         <div className="relative w-full h-2.5 bg-slate-200 rounded-full my-8">
            <span className="absolute -top-6 left-0 text-[9px] font-bold text-slate-400">0 INN</span>
            <span className="absolute -top-6 right-0 text-[9px] font-bold text-slate-400">{maxInn} INN</span>

            {/* Player 1 Marker (Top) */}
            {v1 && (
              <div className="absolute bottom-full mb-1 -translate-x-1/2 flex flex-col items-center z-20" style={{ left: `${pos1}%` }}>
                 <span className={`text-[10px] font-black text-red-500 mb-0.5 ${p1Faster ? 'scale-110 drop-shadow-sm' : ''}`}>{v1}</span>
                 <div className={`w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-sm ${p1Faster ? 'ring-2 ring-red-200' : ''}`}></div>
                 <div className="w-[1px] h-2 bg-red-300"></div>
              </div>
            )}

            {/* Player 2 Marker (Bottom) */}
            {v2 && (
              <div className="absolute top-full mt-1 -translate-x-1/2 flex flex-col items-center z-10" style={{ left: `${pos2}%` }}>
                 <div className="w-[1px] h-2 bg-blue-300"></div>
                 <div className={`w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-sm ${p2Faster ? 'ring-2 ring-blue-200' : ''}`}></div>
                 <span className={`text-[10px] font-black text-blue-600 mt-0.5 ${p2Faster ? 'scale-110 drop-shadow-sm' : ''}`}>{v2}</span>
              </div>
            )}
         </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-100 pb-4 mb-10">
        <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
           <Flag size={20} className="text-indigo-600" /> Milestone Race
        </h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Innings taken to reach career runs</p>
      </div>
      
      <div className="pt-4 px-4">
        {renderTrack("1,000 IPL Runs", "m1k", 100)}
        {renderTrack("3,000 IPL Runs", "m3k", 150)}
        {renderTrack("5,000 IPL Runs", "m5k", 250)}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function PlayerCompare() {
  const [p1Name, setP1Name] = useState("V Kohli");
  const [p2Name, setP2Name] = useState("RG Sharma");

  const player1 = useMemo(() => getPlayerData(p1Name), [p1Name]);
  const player2 = useMemo(() => getPlayerData(p2Name), [p2Name]);

  const p1Metrics = useMemo(() => getRadarMetrics(player1), [player1]);
  const p2Metrics = useMemo(() => getRadarMetrics(player2), [player2]);

  // --- PLAYER DNA SIMILARITY CALCULATOR ---
  const dnaSimilarity = useMemo(() => {
    if (!p1Metrics || !p2Metrics) return 0;
    let totalDiff = 0;
    p1Metrics.forEach((m1, idx) => {
      const m2 = p2Metrics[idx];
      if (m2) {
        totalDiff += Math.abs(m1.pct - m2.pct);
      }
    });
    const avgDiff = totalDiff / p1Metrics.length;
    return Math.max(15, Math.min(99, Math.round(100 - avgDiff)));
  }, [p1Metrics, p2Metrics]);

  // Merge seasons data for the Season Chronicle chart
  const combinedSeasonsData = useMemo(() => {
    const years = new Set([...player1.seasons.map(s => s.year), ...player2.seasons.map(s => s.year)]);
    const sortedYears = Array.from(years).sort();
    
    return sortedYears.map(year => {
      const p1Match = player1.seasons.find(s => s.year === year);
      const p2Match = player2.seasons.find(s => s.year === year);
      return {
        year,
        [player1.name]: p1Match ? p1Match.runs : null,
        [player2.name]: p2Match ? p2Match.runs : null,
      };
    });
  }, [player1, player2]);

  const getMetricVal = (metrics, name) => {
    const metric = metrics.find(m => m.name === name);
    return metric ? metric.val : "-";
  };

  const compareAdvancedStats = (val1, val2, isHigherBetter = true) => {
    const v1 = parseFloat(String(val1).replace(/[^0-9.-]+/g, ""));
    const v2 = parseFloat(String(val2).replace(/[^0-9.-]+/g, ""));
    if (isNaN(v1) || isNaN(v2) || v1 === v2) return "EQUAL";
    if (isHigherBetter) return v1 > v2 ? "P1" : "P2";
    return v1 < v2 ? "P1" : "P2";
  };

  const statRows = [
    { section: "CORE METRICS" },
    { label: "MATCHES", p1: player1.mat, p2: player2.mat, comp: compareAdvancedStats(player1.mat, player2.mat) },
    { label: "RUNS", p1: player1.runs, p2: player2.runs, comp: compareAdvancedStats(player1.runs, player2.runs) },
    { label: "AVERAGE", p1: player1.avg, p2: player2.avg, comp: compareAdvancedStats(player1.avg, player2.avg) },
    { label: "STRIKE RATE", p1: player1.sr, p2: player2.sr, comp: compareAdvancedStats(player1.sr, player2.sr) },
    { label: "HIGHEST SCORE", p1: player1.hs, p2: player2.hs, comp: compareAdvancedStats(player1.hs, player2.hs) },
    { label: "100s / 50s", p1: `${player1.hundreds} / ${player1.fifties}`, p2: `${player2.hundreds} / ${player2.fifties}`, comp: "EQUAL" },
    { label: "BOUNDARIES (4s/6s)", p1: player1.boundaries, p2: player2.boundaries, comp: "EQUAL" },

    { section: "ADVANCED POWER" },
    { label: "BOUNDARY %", p1: getMetricVal(p1Metrics, "BOUNDARY %"), p2: getMetricVal(p2Metrics, "BOUNDARY %"), comp: compareAdvancedStats(getMetricVal(p1Metrics, "BOUNDARY %"), getMetricVal(p2Metrics, "BOUNDARY %")) },
    { label: "SIX RATE", p1: getMetricVal(p1Metrics, "SIX RATE"), p2: getMetricVal(p2Metrics, "SIX RATE"), comp: compareAdvancedStats(getMetricVal(p1Metrics, "SIX RATE"), getMetricVal(p2Metrics, "SIX RATE")) },
    { label: "DEATH OVERS SR", p1: getMetricVal(p1Metrics, "DEATH SR"), p2: getMetricVal(p2Metrics, "DEATH SR"), comp: compareAdvancedStats(getMetricVal(p1Metrics, "DEATH SR"), getMetricVal(p2Metrics, "DEATH SR")) },
    { label: "ACCELERATION", p1: getMetricVal(p1Metrics, "ACCELERATION"), p2: getMetricVal(p2Metrics, "ACCELERATION"), comp: compareAdvancedStats(getMetricVal(p1Metrics, "ACCELERATION"), getMetricVal(p2Metrics, "ACCELERATION")) },

    { section: "TEMPO & CONSISTENCY" },
    { label: "MIDDLE OVERS SR", p1: getMetricVal(p1Metrics, "MIDDLE SR"), p2: getMetricVal(p2Metrics, "MIDDLE SR"), comp: compareAdvancedStats(getMetricVal(p1Metrics, "MIDDLE SR"), getMetricVal(p2Metrics, "MIDDLE SR")) },
    { label: "CHASE SR", p1: getMetricVal(p1Metrics, "CHASE SR"), p2: getMetricVal(p2Metrics, "CHASE SR"), comp: compareAdvancedStats(getMetricVal(p1Metrics, "CHASE SR"), getMetricVal(p2Metrics, "CHASE SR")) },
    { label: "DOT BALL %", p1: getMetricVal(p1Metrics, "DOT %"), p2: getMetricVal(p2Metrics, "DOT %"), comp: compareAdvancedStats(getMetricVal(p1Metrics, "DOT %"), getMetricVal(p2Metrics, "DOT %"), false) },
    { label: "CONVERSION RATE", p1: getMetricVal(p1Metrics, "CONVERSION"), p2: getMetricVal(p2Metrics, "CONVERSION"), comp: compareAdvancedStats(getMetricVal(p1Metrics, "CONVERSION"), getMetricVal(p2Metrics, "CONVERSION")) },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24 px-4 sm:px-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto py-5 flex justify-between items-center mb-8 border-b border-slate-200">
        <Link to="/players" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-500 hover:text-slate-900 transition uppercase pb-4">
          <ArrowLeft size={14} /> Back to Directory
        </Link>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">

        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
            <Swords size={14} /> Head-to-Head Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-slate-900 font-mono">
            Ultimate Comparison
          </h1>
        </div>

        {/* Selection Area using Custom Searchable Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative max-w-5xl mx-auto">
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 text-white rounded-full items-center justify-center font-black italic text-xl border-4 border-white shadow-sm z-10">VS</div>
          
          <SearchableDropdown 
            value={p1Name} 
            onChange={setP1Name} 
            options={PLAYER_LIST} 
            label="Select Player 1 (Red)" 
            colorTheme="red"
          />
          
          <SearchableDropdown 
            value={p2Name} 
            onChange={setP2Name} 
            options={PLAYER_LIST} 
            label="Select Player 2 (Blue)" 
            colorTheme="blue"
          />
        </div>

        {/* PLAYER DNA SIMILARITY CARD */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
            <Dna size={14} /> Player DNA Match Engine
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-2">
            <div className="text-center sm:text-right">
              <p className="text-xs font-black text-red-500 uppercase">{player1.name}</p>
              <p className="text-[10px] font-bold text-slate-400">Archetype Matrix</p>
            </div>

            <div className="relative flex flex-col items-center justify-center">
              <div className="text-5xl font-black font-mono tracking-tighter text-slate-900">
                {dnaSimilarity}<span className="text-2xl text-indigo-600">%</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">
                Statistical DNA Similarity
              </span>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xs font-black text-blue-600 uppercase">{player2.name}</p>
              <p className="text-[10px] font-bold text-slate-400">Archetype Matrix</p>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-indigo-600 to-blue-600 rounded-full transition-all duration-700"
              style={{ width: `${dnaSimilarity}%` }}
            ></div>
          </div>

          <p className="text-xs font-black tracking-wider uppercase text-slate-700">
            {dnaSimilarity >= 85 ? "🔥 Mirror Profile • Near Identical Playstyle" :
             dnaSimilarity >= 70 ? "⚡ High Tactical Compatibility • Similar Role" :
             dnaSimilarity >= 50 ? "⚖️ Moderate Synergy • Key Stylistic Differences" :
             "💥 Contrasting Archetypes • Opposite Strengths"}
          </p>
        </div>

        {/* 2-COLUMN LAYOUT FOR STATS & RADAR */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start relative z-0">
          
          {/* Detailed Tale of the Tape */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50 text-center">
              <h2 className="text-sm font-black tracking-widest uppercase text-slate-500">Tale of the Tape • Advanced Profile</h2>
            </div>
            <div className="flex flex-col">
              {statRows.map((row, idx) => {
                if (row.section) {
                  return (
                    <div key={`sec-${idx}`} className="bg-slate-100 px-8 py-2 text-center border-y border-slate-200">
                      <span className="text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase">{row.section}</span>
                    </div>
                  );
                }
                return (
                  <div key={idx} className="flex justify-between items-center py-3.5 px-4 sm:px-12 hover:bg-slate-50 border-b border-slate-50 transition-colors">
                    <div className={`w-1/3 text-center sm:text-right text-lg sm:text-xl font-black font-mono tracking-tighter ${row.comp === 'P1' ? 'text-red-500' : 'text-slate-700'}`}>{row.p1}</div>
                    <div className="w-1/3 text-center text-[9px] font-extrabold text-slate-400 tracking-widest uppercase bg-transparent px-2">{row.label}</div>
                    <div className={`w-1/3 text-center sm:text-left text-lg sm:text-xl font-black font-mono tracking-tighter ${row.comp === 'P2' ? 'text-blue-600' : 'text-slate-700'}`}>{row.p2}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dual Radar Chart */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 h-full flex flex-col justify-center">
            <div className="text-center mb-4">
              <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 flex items-center justify-center gap-2">
                <Target size={20} className="text-indigo-600" /> Overgraph Radar Alignment
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Power • Consistency • Tempo</p>
            </div>
            <DualOvergraphRadar player1={player1} p1Metrics={p1Metrics} player2={player2} p2Metrics={p2Metrics} />
          </div>

        </div>

        {/* --- MILESTONE RACE COMPARISON --- */}
        <MilestoneRace p1={player1} p2={player2} />

        {/* --- SEASON CHRONICLE COMPARISON --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
              <Activity size={20} className="text-indigo-600" /> Season Chronicle Comparison
            </h2>
          </div>
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedSeasonsData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="year" stroke="#475569" tick={{fontSize: 10, fill: '#64748b', fontWeight: 700}} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" tick={{fontSize: 10, fill: '#64748b', fontWeight: 700}} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '12px', fontWeight: 'bold', borderRadius: '8px' }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                <Line type="monotone" name={player1.name} dataKey={player1.name} stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ffffff', stroke: '#ef4444', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#ef4444' }} connectNulls />
                <Line type="monotone" name={player2.name} dataKey={player2.name} stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#3b82f6' }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- MATCH PHASES COMPARISON --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
              <Clock size={20} className="text-indigo-600" /> Match Phases Analysis
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Powerplay Compare */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-xs font-black tracking-widest uppercase text-emerald-600 mb-6 text-center">1-6 Powerplay</h3>
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <p className="text-3xl font-black text-red-500 font-mono tracking-tighter">{player1.phases.powerplay.sr}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">P1 SR</p>
                </div>
                <div className="text-slate-300 font-black italic">VS</div>
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-600 font-mono tracking-tighter">{player2.phases.powerplay.sr}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">P2 SR</p>
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-red-500">{player1.phases.powerplay.runs} <span className="text-[9px] text-slate-400">RUNS</span></span>
                <span className="text-blue-600">{player2.phases.powerplay.runs} <span className="text-[9px] text-slate-400">RUNS</span></span>
              </div>
            </div>

            {/* Middle Overs Compare */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-xs font-black tracking-widest uppercase text-indigo-600 mb-6 text-center">7-15 Middle</h3>
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <p className="text-3xl font-black text-red-500 font-mono tracking-tighter">{player1.phases.middle.sr}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">P1 SR</p>
                </div>
                <div className="text-slate-300 font-black italic">VS</div>
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-600 font-mono tracking-tighter">{player2.phases.middle.sr}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">P2 SR</p>
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-red-500">{player1.phases.middle.runs} <span className="text-[9px] text-slate-400">RUNS</span></span>
                <span className="text-blue-600">{player2.phases.middle.runs} <span className="text-[9px] text-slate-400">RUNS</span></span>
              </div>
            </div>

            {/* Death Overs Compare */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-xs font-black tracking-widest uppercase text-rose-600 mb-6 text-center">16-20 Death</h3>
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <p className="text-3xl font-black text-red-500 font-mono tracking-tighter">{player1.phases.death.sr}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">P1 SR</p>
                </div>
                <div className="text-slate-300 font-black italic">VS</div>
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-600 font-mono tracking-tighter">{player2.phases.death.sr}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">P2 SR</p>
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-red-500">{player1.phases.death.runs} <span className="text-[9px] text-slate-400">RUNS</span></span>
                <span className="text-blue-600">{player2.phases.death.runs} <span className="text-[9px] text-slate-400">RUNS</span></span>
              </div>
            </div>

          </div>
        </div>

        {/* --- VISUAL ANALYTICS (PITCH MAP & WAGON WHEEL) --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <div className="relative">
            <div className="absolute -top-3 left-6 z-10 bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest border-2 border-white shadow-sm">PLAYER 1 • {player1.name}</div>
            <ShotMapAnalytics playerName={player1.name} />
          </div>
          <div className="relative">
            <div className="absolute -top-3 right-6 z-10 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest border-2 border-white shadow-sm">PLAYER 2 • {player2.name}</div>
            <ShotMapAnalytics playerName={player2.name} />
          </div>
        </div>

      </div>
    </div>
  );
}