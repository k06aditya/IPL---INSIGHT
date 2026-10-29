import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Swords, ChevronDown, History, BarChart2, Activity, Calendar, User, List } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from 'recharts';

// --- TEAM DIRECTORY WITH BRAND COLORS ---
const TEAMS = {
  "Chennai Super Kings": { id: "CSK", color: "#facc15", text: "text-yellow-500", border: "border-yellow-400", bg: "bg-yellow-500" },
  "Mumbai Indians": { id: "MI", color: "#2563eb", text: "text-blue-600", border: "border-blue-500", bg: "bg-blue-600" },
  "Royal Challengers Bengaluru": { id: "RCB", color: "#ef4444", text: "text-red-500", border: "border-red-500", bg: "bg-red-500" },
  "Kolkata Knight Riders": { id: "KKR", color: "#a855f7", text: "text-purple-500", border: "border-purple-500", bg: "bg-purple-500" },
  "Sunrisers Hyderabad": { id: "SRH", color: "#f97316", text: "text-orange-500", border: "border-orange-500", bg: "bg-orange-500" },
  "Rajasthan Royals": { id: "RR", color: "#ec4899", text: "text-pink-500", border: "border-pink-500", bg: "bg-pink-500" },
  "Delhi Capitals": { id: "DC", color: "#0284c7", text: "text-sky-600", border: "border-sky-500", bg: "bg-sky-600" },
  "Punjab Kings": { id: "PBKS", color: "#dc2626", text: "text-red-600", border: "border-red-600", bg: "bg-red-600" },
  "Gujarat Titans": { id: "GT", color: "#0d9488", text: "text-teal-600", border: "border-teal-500", bg: "bg-teal-600" },
  "Lucknow Super Giants": { id: "LSG", color: "#0ea5e9", text: "text-sky-500", border: "border-sky-400", bg: "bg-sky-500" }
};
const TEAM_NAMES = Object.keys(TEAMS);

// --- CUSTOM TEAM DROPDOWN ---
const TeamDropdown = ({ value, onChange, options, label, exclude }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const theme = TEAMS[value];

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const availableOptions = options.filter(opt => opt !== exclude);

  return (
    <div className="flex flex-col space-y-3 relative w-full" ref={wrapperRef}>
      <label className={`text-[10px] font-bold ${theme.text} tracking-widest uppercase text-center`}>{label}</label>
      <div className="relative w-full">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-white border-2 ${theme.border} text-slate-900 font-black text-lg py-4 px-4 rounded-2xl cursor-pointer flex justify-between items-center transition-all hover:shadow-md z-10 relative`}
        >
          <div className="flex items-center gap-3">
             <span className={`w-4 h-4 rounded-full ${theme.bg}`}></span>
             <span className="truncate">{value}</span>
          </div>
          <ChevronDown className={`${theme.text} transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
        </div>

        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto">
            <ul className="divide-y divide-slate-50">
              {availableOptions.map(t => (
                <li 
                  key={t} onClick={() => { onChange(t); setIsOpen(false); }}
                  className="px-4 py-3 text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-50 flex items-center gap-3 transition-colors"
                >
                  <span className={`w-3 h-3 rounded-full ${TEAMS[t].bg}`}></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// --- DETERMINISTIC GENERATOR ENGINE ---
const generateSeededRandom = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  return function() {
    hash = Math.imul(741103597, hash) + 1891316104 | 0;
    return (hash >>> 0) / 4294967296;
  }
};

const getRealisticCaptain = (team, year) => {
  if (team === "Chennai Super Kings") return year < 2024 ? "MS Dhoni" : "R Gaikwad";
  if (team === "Mumbai Indians") return year < 2013 ? "S Tendulkar" : year < 2024 ? "R Sharma" : "H Pandya";
  if (team === "Royal Challengers Bengaluru") return year < 2013 ? "A Kumble" : year < 2022 ? "V Kohli" : year < 2026 ? "F du Plessis" : "R Patidar";
  if (team === "Kolkata Knight Riders") return year < 2011 ? "S Ganguly" : year < 2018 ? "G Gambhir" : year < 2022 ? "E Morgan" : "S Iyer";
  if (team === "Rajasthan Royals") return year < 2012 ? "S Warne" : year < 2018 ? "S Smith" : year < 2026 ? "S Samson" : "R Parag";
  if (team === "Delhi Capitals") return year < 2013 ? "V Sehwag" : year < 2021 ? "S Iyer" : "R Pant";
  if (team === "Sunrisers Hyderabad") return year < 2015 ? "S Dhawan" : year < 2022 ? "D Warner" : "P Cummins";
  if (team === "Punjab Kings") return year < 2018 ? "G Bailey" : year < 2022 ? "KL Rahul" : "S Dhawan";
  if (team === "Gujarat Titans") return year < 2024 ? "H Pandya" : "S Gill";
  if (team === "Lucknow Super Giants") return year < 2025 ? "KL Rahul" : "R Pant";
  return "Captain";
};

// Generates Win/Loss History for a single team
const generateTeamHistory = (team) => {
  const rand = generateSeededRandom(team);
  const isNewFranchise = team === "Gujarat Titans" || team === "Lucknow Super Giants";
  const startYear = isNewFranchise ? 2022 : 2008;
  
  const history = [];
  for (let year = 2008; year <= 2026; year++) {
    
    // Check for the 2016-2017 Suspension for CSK and RR
    const isSuspended = (team === "Chennai Super Kings" || team === "Rajasthan Royals") && (year === 2016 || year === 2017);

    if (year < startYear || isSuspended) {
      history.push({ 
        year: year.toString(), 
        matches: 0, 
        wins: 0, 
        losses: 0, 
        winPct: null, 
        captain: isSuspended ? "Suspended" : "-" 
      });
    } else {
      const matches = 14;
      const wins = Math.floor(rand() * 9) + 4; // 4 to 12 wins
      const losses = matches - wins;
      const winPct = Math.round((wins / matches) * 100);
      history.push({ 
        year: year.toString(), 
        matches, wins, losses, winPct, 
        captain: getRealisticCaptain(team, year) 
      });
    }
  }
  return history;
};

// Generates Cumulative NRR for a given team in a given season
const generateTeamNRR = (team, season) => {
  const rand = generateSeededRandom(`${team}-${season}`);
  const data = [];
  let cumRunsScored = 0, cumOversFaced = 0, cumRunsConceded = 0, cumOversBowled = 0;

  for (let match = 1; match <= 14; match++) {
    const rFor = Math.floor(rand() * 80) + 140; 
    const oFor = (rand() > 0.8) ? 20 : (20 - (rand() * 2)); 
    const rAgainst = Math.floor(rand() * 80) + 140;
    const oAgainst = (rand() > 0.8) ? 20 : (20 - (rand() * 2)); 
    
    cumRunsScored += rFor; cumOversFaced += oFor;
    cumRunsConceded += rAgainst; cumOversBowled += oAgainst;

    const nrr = (cumRunsScored / cumOversFaced) - (cumRunsConceded / cumOversBowled);
    data.push(parseFloat(nrr.toFixed(3)));
  }
  return data;
};

const generateH2HData = (team1, team2) => {
  const matchupKey = [team1, team2].sort().join("::");
  const rand = generateSeededRandom(matchupKey);
  const getRand = (min, max) => Math.floor(rand() * (max - min + 1)) + min;

  const isNewFranchise = team1 === "Gujarat Titans" || team1 === "Lucknow Super Giants" || team2 === "Gujarat Titans" || team2 === "Lucknow Super Giants";
  const totalMatches = isNewFranchise ? getRand(4, 8) : getRand(24, 38);
  
  const isT1First = team1 < team2; 
  const baseWinRatio = rand() * 0.4 + 0.3;
  const assignedWins = Math.round(totalMatches * baseWinRatio);
  
  const t1Wins = isT1First ? assignedWins : (totalMatches - assignedWins);
  const t2Wins = totalMatches - t1Wins;

  const recentForm = Array.from({length: 5}, (_, i) => {
    const winner = rand() > (t1Wins / totalMatches) ? team2 : team1;
    return {
      year: 2026 - i,
      winner: winner,
      loser: winner === team1 ? team2 : team1,
      margin: rand() > 0.5 ? `${getRand(1, 40)} runs` : `${getRand(3, 8)} wkts`,
      t1Score: getRand(140, 220),
      t2Score: getRand(130, 210)
    };
  });

  return {
    totalMatches, t1Wins, t2Wins,
    t1Highest: getRand(190, 240), t2Highest: getRand(190, 240),
    t1Lowest: getRand(70, 130), t2Lowest: getRand(70, 130),
    avgScore1: getRand(155, 175), avgScore2: getRand(155, 175),
    recentForm
  };
};

export default function TeamCompare() {
  const [team1, setTeam1] = useState("Chennai Super Kings");
  const [team2, setTeam2] = useState("Mumbai Indians");
  const [selectedSeason, setSelectedSeason] = useState("2026");

  const t1Theme = TEAMS[team1];
  const t2Theme = TEAMS[team2];

  const matchData = useMemo(() => generateH2HData(team1, team2), [team1, team2]);
  
  // Historical Data for Line Charts & Tables
  const t1History = useMemo(() => generateTeamHistory(team1), [team1]);
  const t2History = useMemo(() => generateTeamHistory(team2), [team2]);

  // Combine Win % History for Season Chronicle Chart
  const combinedHistory = useMemo(() => {
    return t1History.map((h1, i) => {
      const h2 = t2History[i];
      return {
        year: h1.year,
        [team1]: h1.winPct,
        [team2]: h2.winPct
      };
    });
  }, [t1History, t2History, team1, team2]);

  // Combine Wins Data specifically for the Season-by-Season Graph
  const combinedWinsData = useMemo(() => {
    return t1History.map((h1, i) => {
      const h2 = t2History[i];
      return {
        year: h1.year,
        [`${team1} Wins`]: h1.winPct !== null ? h1.wins : null,
        [`${team2} Wins`]: h2.winPct !== null ? h2.wins : null
      };
    });
  }, [t1History, t2History, team1, team2]);

  // Combine NRR for Progression Chart
  const combinedNRR = useMemo(() => {
    const t1NRR = generateTeamNRR(team1, selectedSeason);
    const t2NRR = generateTeamNRR(team2, selectedSeason);
    return Array.from({length: 14}, (_, i) => ({
      matchNumber: `M${i+1}`,
      [team1]: t1NRR[i],
      [team2]: t2NRR[i]
    }));
  }, [team1, team2, selectedSeason]);

  const SEASONS = ["2026", "2025", "2024", "2023", "2022"];

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24 px-4 sm:px-8">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto py-5 flex justify-between items-center mb-8 border-b border-slate-200">
        <Link to="/teams" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-500 hover:text-slate-900 transition uppercase pb-4">
          <ArrowLeft size={14} /> Back to Franchises
        </Link>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">

        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
            <Swords size={14} /> Franchise Wars
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-slate-900 font-mono">
            Head-to-Head Engine
          </h1>
        </div>

        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-visible">
          <div className="absolute top-0 left-0 w-1/2 h-2 opacity-80 rounded-tl-3xl" style={{ backgroundColor: t1Theme.color }}></div>
          <div className="absolute top-0 right-0 w-1/2 h-2 opacity-80 rounded-tr-3xl" style={{ backgroundColor: t2Theme.color }}></div>

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-slate-900 text-white rounded-full items-center justify-center font-black italic text-xl border-4 border-white shadow-md z-20">
            VS
          </div>
          
          <TeamDropdown value={team1} onChange={setTeam1} options={TEAM_NAMES} exclude={team2} label="Host Franchise" />
          <TeamDropdown value={team2} onChange={setTeam2} options={TEAM_NAMES} exclude={team1} label="Challenger Franchise" />
        </div>

        {/* CORE METRICS & WIN DISTRIBUTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Win Rate Visualizer */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm lg:col-span-1 flex flex-col justify-center items-center">
            <h2 className="text-[11px] font-black tracking-widest uppercase text-slate-400 mb-8">All-Time Win Distribution</h2>
            
            <div className="w-full flex justify-between items-end mb-4 px-4">
              <div className="text-center">
                <p className="text-5xl font-black font-mono tracking-tighter" style={{ color: t1Theme.color }}>{matchData.t1Wins}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Wins</p>
              </div>
              <div className="text-center pb-2">
                <p className="text-lg font-black text-slate-300 italic">VS</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">{matchData.totalMatches} MATCHES</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-black font-mono tracking-tighter" style={{ color: t2Theme.color }}>{matchData.t2Wins}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Wins</p>
              </div>
            </div>

            <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
              <div className="h-full transition-all duration-1000" style={{ width: `${(matchData.t1Wins / matchData.totalMatches) * 100}%`, backgroundColor: t1Theme.color }}></div>
              <div className="h-full transition-all duration-1000" style={{ width: `${(matchData.t2Wins / matchData.totalMatches) * 100}%`, backgroundColor: t2Theme.color }}></div>
            </div>
            
            <div className="w-full flex justify-between text-[10px] font-bold text-slate-400 mt-3 px-2">
               <span>{((matchData.t1Wins / matchData.totalMatches) * 100).toFixed(1)}%</span>
               <span>{((matchData.t2Wins / matchData.totalMatches) * 100).toFixed(1)}%</span>
            </div>
          </div>

          {/* Tale of the Tape */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-xs font-black tracking-widest uppercase text-slate-500">Tale of the Tape</h2>
              <Shield size={16} className="text-slate-400" />
            </div>
            
            <div className="flex flex-col divide-y divide-slate-100">
              {[
                { label: "Highest Score", p1: matchData.t1Highest, p2: matchData.t2Highest },
                { label: "Lowest Score", p1: matchData.t1Lowest, p2: matchData.t2Lowest },
                { label: "Average Score", p1: matchData.avgScore1, p2: matchData.avgScore2 },
                { label: "Current Win Streak", p1: matchData.recentForm[0].winner === team1 ? "1 W" : "-", p2: matchData.recentForm[0].winner === team2 ? "1 W" : "-" }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 px-6 hover:bg-slate-50 transition-colors">
                  <div className="w-1/3 text-center sm:text-right text-2xl font-black font-mono tracking-tighter" style={{ color: row.p1 > row.p2 && row.label !== "Lowest Score" ? t1Theme.color : '#475569' }}>
                    {row.p1}
                  </div>
                  <div className="w-1/3 text-center text-[10px] font-extrabold text-slate-400 tracking-widest uppercase bg-transparent px-2">
                    {row.label}
                  </div>
                  <div className="w-1/3 text-center sm:text-left text-2xl font-black font-mono tracking-tighter" style={{ color: row.p2 > row.p1 && row.label !== "Lowest Score" ? t2Theme.color : '#475569' }}>
                    {row.p2}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- I. SEASON CHRONICLE (Win % Comparison) --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
              <Activity size={20} className="text-indigo-600" /> I. SEASON CHRONICLE
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Win % Trajectory</p>
          </div>
          
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedHistory} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                <XAxis dataKey="year" stroke="#475569" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="#475569" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} ticks={[0, 25, 50, 75, 100]} />
                <Tooltip 
                  cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px' }}
                />
                <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="4 4" />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                
                {/* Note: connectNulls is intentionally OMITTED here so the 2016-17 suspensions show as distinct gaps */}
                <Line type="monotone" name={team1} dataKey={team1} stroke={t1Theme.color} strokeWidth={3} dot={{ fill: '#ffffff', stroke: t1Theme.color, strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" name={team2} dataKey={team2} stroke={t2Theme.color} strokeWidth={3} dot={{ fill: '#ffffff', stroke: t2Theme.color, strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- II. TEAM NRR PROGRESSION --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-4">
            <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
              <Activity size={20} className="text-rose-500" /> II. TEAM NRR PROGRESSION
            </h2>
            <div className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
               <Calendar size={14} className="text-slate-400" />
               <select
                 value={selectedSeason}
                 onChange={(e) => setSelectedSeason(e.target.value)}
                 className="bg-transparent text-xs font-black text-slate-700 focus:outline-none cursor-pointer uppercase tracking-wider"
               >
                 {SEASONS.map(year => <option key={year} value={year}>{year} SEASON</option>)}
               </select>
            </div>
          </div>
          
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedNRR} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                <XAxis dataKey="matchNumber" stroke="#475569" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} />
                <YAxis domain={['auto', 'auto']} stroke="#475569" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} tickFormatter={(val) => (val > 0 ? `+${val}` : val)} />
                <Tooltip 
                  cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px' }}
                />
                <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                
                <Line type="monotone" name={team1} dataKey={team1} stroke={t1Theme.color} strokeWidth={3} dot={{ fill: '#ffffff', stroke: t1Theme.color, strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" name={team2} dataKey={team2} stroke={t2Theme.color} strokeWidth={3} dot={{ fill: '#ffffff', stroke: t2Theme.color, strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- III. SEASON-BY-SEASON PERFORMANCE TREND & CAPTAINS --- */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="px-8 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-sm font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
              <List size={18} className="text-indigo-600" /> III. Season-by-Season Trend & Captains
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">(2008 - 2026)</span>
          </div>

          {/* Wins Timeline Chart */}
          <div className="p-8 border-b border-slate-100 bg-white">
            <h3 className="text-xs font-black tracking-widest uppercase text-slate-400 mb-6 text-center">Total Wins Per Season</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedWinsData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                  <XAxis dataKey="year" stroke="#475569" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                  {/* connectNulls omitted here as well to show suspensions as a visual gap */}
                  <Line type="monotone" name={`${TEAMS[team1].id} Wins`} dataKey={`${team1} Wins`} stroke={t1Theme.color} strokeWidth={3} dot={{ fill: '#ffffff', stroke: t1Theme.color, strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" name={`${TEAMS[team2].id} Wins`} dataKey={`${team2} Wins`} stroke={t2Theme.color} strokeWidth={3} dot={{ fill: '#ffffff', stroke: t2Theme.color, strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Detailed Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white">
                  <th className="py-4 px-6">Season</th>
                  <th className="py-4 px-4"><span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${t1Theme.bg}`}></span>{TEAMS[team1].id} Captain</span></th>
                  <th className="py-4 px-4 text-center">W-L</th>
                  <th className="py-4 px-4 text-center border-l border-slate-100">W-L</th>
                  <th className="py-4 px-6 text-right"><span className="flex items-center justify-end gap-2">{TEAMS[team2].id} Captain<span className={`w-2 h-2 rounded-full ${t2Theme.bg}`}></span></span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px] font-semibold text-slate-700">
                {t1History.slice().reverse().map((h1, index) => {
                  const h2 = t2History.slice().reverse()[index];
                  
                  // Hide rows where BOTH teams did not exist yet (e.g. 2008 for GT vs LSG)
                  if (h1.winPct === null && h2.winPct === null && h1.captain !== "Suspended" && h2.captain !== "Suspended") return null;
                  
                  return (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-6 font-black font-mono text-slate-900">{h1.year}</td>
                      
                      {/* Team 1 Columns */}
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        {h1.winPct !== null ? <><User size={14} className={t1Theme.text} /> {h1.captain}</> : <span className="text-slate-400 italic text-xs">{h1.captain}</span>}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">
                        {h1.winPct !== null ? <><span className="text-emerald-600">{h1.wins}</span>-<span className="text-rose-600">{h1.losses}</span></> : <span className="text-slate-300">-</span>}
                      </td>
                      
                      {/* Team 2 Columns */}
                      <td className="py-3 px-4 text-center font-mono border-l border-slate-100">
                        {h2.winPct !== null ? <><span className="text-emerald-600">{h2.wins}</span>-<span className="text-rose-600">{h2.losses}</span></> : <span className="text-slate-300">-</span>}
                      </td>
                      <td className="py-3 px-6 font-bold flex items-center justify-end gap-2">
                        {h2.winPct !== null ? <>{h2.captain} <User size={14} className={t2Theme.text} /></> : <span className="text-slate-400 italic text-xs">{h2.captain}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- RECENT ENCOUNTERS TIMELINE --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-8">
            <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
              <History size={20} className="text-indigo-600" /> Last 5 Encounters
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {matchData.recentForm.map((match, idx) => {
              const isT1Winner = match.winner === team1;
              const winTheme = isT1Winner ? t1Theme : t2Theme;
              
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl p-5 relative overflow-hidden bg-slate-50 hover:shadow-md transition-shadow">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: winTheme.color }}></div>
                  <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 uppercase tracking-widest mb-3 inline-block">
                    {match.year}
                  </span>
                  
                  <h3 className="text-sm font-black text-slate-900 mb-1 leading-tight tracking-tight">
                    {TEAMS[match.winner].id} won by
                  </h3>
                  <p className="text-xs font-bold text-slate-500 mb-4">{match.margin}</p>
                  
                  <div className="flex justify-between items-center text-[11px] font-mono font-bold bg-white p-2 rounded border border-slate-100">
                    <span className={isT1Winner ? t1Theme.text : 'text-slate-500'}>{TEAMS[team1].id} {match.t1Score}</span>
                    <span className={!isT1Winner ? t2Theme.text : 'text-slate-500'}>{TEAMS[team2].id} {match.t2Score}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* --- INNINGS SCORE DISTRIBUTION (BAR CHART) --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
              <BarChart2 size={20} className="text-indigo-600" /> Innings Score Trajectory
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 5 Matches</p>
          </div>
          
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchData.recentForm.slice().reverse()} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#475569" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                <Bar dataKey="t1Score" name={TEAMS[team1].id} fill={t1Theme.color} radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="t2Score" name={TEAMS[team2].id} fill={t2Theme.color} radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}