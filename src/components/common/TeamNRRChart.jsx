// frontend/src/components/TeamNRRChart.jsx
import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine 
} from 'recharts';
import { Activity, Calendar } from 'lucide-react';

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

export default function TeamNRRChart({ teamName = "Mumbai Indians" }) {
  const [selectedSeason, setSelectedSeason] = useState("2026");
  const seasons = ["2026", "2025", "2024", "2023"];
  
  const nrrData = useMemo(() => generateTournamentNRR(teamName, selectedSeason), [teamName, selectedSeason]);

  const finalNRR = nrrData[nrrData.length - 1]?.nrr || 0;
  const isOverallPositive = finalNRR >= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm font-sans mt-8 w-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 font-sans flex items-center gap-2">
            IV. TEAM NRR PROGRESSION
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
            Match-by-Match Net Run Rate Analysis ({selectedSeason})
          </p>
        </div>
      </div>
      
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
              <Activity className="text-blue-600" size={18} /> Cumulative NRR Trajectory
            </h3>
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">
              {teamName}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${isOverallPositive ? 'bg-emerald-100/50 border-emerald-200' : 'bg-red-100/50 border-red-200'}`}>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Final NRR</span>
               <span className={`font-mono font-black ${isOverallPositive ? 'text-emerald-700' : 'text-red-600'}`}>
                 {(isOverallPositive ? '+' : '') + finalNRR.toFixed(3)}
               </span>
             </div>

             <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-black text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none uppercase tracking-wider"
                >
                  {seasons.map(year => (
                    <option key={year} value={year}>{year} SEASON</option>
                  ))}
                </select>
             </div>
          </div>
        </div>

        {/* Height strictly fixed to 320px so Recharts cannot collapse */}
        <div style={{ width: '100%', height: '320px', minHeight: '320px' }}>
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
              <Tooltip content={<NRRTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
              
              <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} />
              
              <Line 
                type="monotone" 
                dataKey="nrr" 
                stroke="#3b82f6" 
                strokeWidth={3.5} 
                dot={{ fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2, r: 5 }} 
                activeDot={{ r: 7, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}