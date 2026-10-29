import React, { useState, useMemo } from 'react';
import { Activity, Calendar, Shield } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine 
} from 'recharts';

const IPL_TEAMS = [
  { id: "CSK", name: "Chennai Super Kings", color: "#eab308" },
  { id: "MI", name: "Mumbai Indians", color: "#3b82f6" },
  { id: "RCB", name: "Royal Challengers Bengaluru", color: "#ef4444" },
  { id: "KKR", name: "Kolkata Knight Riders", color: "#a855f7" },
  { id: "RR", name: "Rajasthan Royals", color: "#ec4899" },
  { id: "SRH", name: "Sunrisers Hyderabad", color: "#f97316" },
  { id: "DC", name: "Delhi Capitals", color: "#0ea5e9" },
  { id: "PBKS", name: "Punjab Kings", color: "#ef4444" },
  { id: "GT", name: "Gujarat Titans", color: "#14b8a6" },
  { id: "LSG", name: "Lucknow Super Giants", color: "#06b6d4" }
];

// --- MATH / DETERMINISTIC NRR ENGINE ---
const generateSeededRandom = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  return function() {
    hash = Math.imul(741103597, hash) + 1891316104 | 0;
    return (hash >>> 0) / 4294967296;
  }
};

const generateTournamentNRR = (teamName, season) => {
  const rand = generateSeededRandom(`${teamName}-${season}`);
  
  let cumulativeRunsScored = 0, cumulativeOversFaced = 0;
  let cumulativeRunsConceded = 0, cumulativeOversBowled = 0;
  const chartData = [];

  for (let match = 1; match <= 14; match++) {
    // If a team is all out, the overs considered for NRR calculation is the full 20 overs
    const isAllOutFor = rand() > 0.8;
    const runsFor = Math.floor(rand() * 80) + 140; 
    const oversFor = isAllOutFor ? 20 : (20 - (rand() * 2)); 

    const isAllOutAgainst = rand() > 0.8;
    const runsAgainst = Math.floor(rand() * 80) + 140;
    const oversAgainst = isAllOutAgainst ? 20 : (20 - (rand() * 2)); 
    
    cumulativeRunsScored += runsFor;
    cumulativeOversFaced += oversFor;
    cumulativeRunsConceded += runsAgainst;
    cumulativeOversBowled += oversAgainst;

    const currentCumulativeNRR = (cumulativeRunsScored / cumulativeOversFaced) - (cumulativeRunsConceded / cumulativeOversBowled);
    const matchNRR = (runsFor / oversFor) - (runsAgainst / oversAgainst);

    chartData.push({
      matchNumber: `M${match}`,
      fullLabel: `Match ${match}`,
      nrr: parseFloat(currentCumulativeNRR.toFixed(3)),
      matchNRR: parseFloat(matchNRR.toFixed(3))
    });
  }
  return chartData;
};

// --- CUSTOM TOOLTIP FOR NRR ---
const NRRTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPositive = data.nrr >= 0;
    
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-lg min-w-[160px] z-50">
        <p className="font-black text-slate-800 text-sm border-b border-slate-100 pb-2 mb-2">{data.fullLabel}</p>
        <div className="flex flex-col gap-1.5">
           <div className="flex justify-between items-center gap-4">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tournament NRR</span>
             <span className={`font-black font-mono text-sm ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
               {(data.nrr > 0 ? '+' : '') + data.nrr.toFixed(3)}
             </span>
           </div>
           <div className="flex justify-between items-center gap-4">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Margin</span>
             <span className="font-bold font-mono text-xs text-slate-600">
               {(data.matchNRR > 0 ? '+' : '') + data.matchNRR.toFixed(3)}
             </span>
           </div>
        </div>
      </div>
    );
  }
  return null;
};

// --- INDIVIDUAL TEAM SECTION COMPONENT ---
const TeamSection = ({ team }) => {
  const [selectedSeason, setSelectedSeason] = useState("2026");
  const seasons = ["2026", "2025", "2024", "2023"];
  
  const nrrData = useMemo(() => generateTournamentNRR(team.id, selectedSeason), [team.id, selectedSeason]);
  const finalNRR = nrrData[nrrData.length - 1]?.nrr || 0;
  const isOverallPositive = finalNRR >= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm font-sans mb-12 overflow-hidden">
      
      {/* Team Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md" style={{ backgroundColor: team.color }}>
            {team.id}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{team.name}</h2>
            <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mt-1">Franchise NRR Analytics</p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 ${isOverallPositive ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Final NRR</span>
             <span className={`font-mono font-black text-lg ${isOverallPositive ? 'text-emerald-700' : 'text-red-600'}`}>
               {(isOverallPositive ? '+' : '') + finalNRR.toFixed(3)}
             </span>
           </div>
           
           <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none uppercase tracking-wider"
              >
                {seasons.map(year => (
                  <option key={year} value={year}>{year} SEASON</option>
                ))}
              </select>
           </div>
        </div>
      </div>

      {/* Team NRR Chart Area */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-blue-600" size={18} />
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Cumulative Progression</h3>
        </div>
        
        {/* EXPLICIT HEIGHT PROVIDED HERE TO FIX RECHARTS COLLAPSE BUG */}
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={nrrData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="matchNumber" 
                stroke="#94a3b8" 
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} 
                tickLine={false} 
                axisLine={false}
                domain={['auto', 'auto']}
                tickFormatter={(val) => (val > 0 ? `+${val}` : val)}
              />
              <Tooltip content={<NRRTooltip />} />
              
              <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} />
              
              <Line 
                type="monotone" 
                dataKey="nrr" 
                stroke={team.color} 
                strokeWidth={3.5} 
                dot={{ fill: '#ffffff', stroke: team.color, strokeWidth: 2, r: 5 }} 
                activeDot={{ r: 7, fill: team.color, stroke: '#ffffff', strokeWidth: 2 }}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function Teams() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8 mb-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Shield className="text-blue-600" size={32} /> Team Dashboards
          </h1>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Analyze the mathematical Net Run Rate (NRR) progression for every IPL franchise match-by-match.
          </p>
        </div>
      </div>

      {/* Render all teams */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {IPL_TEAMS.map((team) => (
          <TeamSection key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}