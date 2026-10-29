import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, FastForward, Activity, BarChart2, Calendar, Clock, Trophy, ArrowLeft, Video, Film, History, Newspaper, ExternalLink } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LabelList } from 'recharts';

// --- TEAM DIRECTORY ---
const TEAMS = {
  "Gujarat Titans": { id: "GT", color: "#0d9488", venue: "Narendra Modi Stadium, Ahmedabad" },
  "Royal Challengers Bengaluru": { id: "RCB", color: "#ef4444", venue: "M. Chinnaswamy Stadium, Bengaluru" }
};

// --- ARCHIVE LINKS ---
const ARCHIVE_LINKS = [
  { year: 2025, link: "https://www.hotstar.com/in/explore?search_query=ipl+2025" },
  { year: 2024, link: "https://www.hotstar.com/in/explore?search_query=ipl+2024" },
  { year: 2023, link: "https://www.hotstar.com/in/explore?search_query=ipl+2023" },
  { year: 2022, link: "https://www.hotstar.com/in/explore?search_query=ipl+2022" },
  { year: 2021, link: "https://www.hotstar.com/in/explore?search_query=ipl+2021" },
  { year: 2020, link: "https://www.hotstar.com/in/explore?search_query=ipl+2020" },
  { year: 2019, link: "https://www.hotstar.com/in/explore?search_query=ipl+2019" },
  { year: 2018, link: "https://www.hotstar.com/in/explore?search_query=ipl+2018" },
  { year: 2017, link: "https://www.hotstar.com/in/explore?search_query=ipl+2017" },
  { year: 2016, link: "https://www.hotstar.com/in/explore?search_query=ipl+2016" },
  { year: 2015, link: "https://www.hotstar.com/in/explore?search_query=ipl+2015" },
  { year: 2014, link: "https://www.hotstar.com/in/explore?search_query=ipl+2014" },
  { year: 2013, link: "https://www.hotstar.com/in/explore?search_query=ipl+2013" },
  { year: 2012, link: "https://www.hotstar.com/in/explore?search_query=ipl+2012" },
  { year: 2011, link: "https://www.hotstar.com/in/explore?search_query=ipl+2011" },
  { year: 2010, link: "https://www.hotstar.com/in/explore?search_query=ipl+2010" },
  { year: 2009, link: "https://www.hotstar.com/in/explore?search_query=ipl+2009" },
  { year: 2008, link: "https://www.hotstar.com/in/explore?search_query=ipl+2008" }
];

// --- LAST MATCH CONSTANTS (2026 FINAL) ---
const FINAL_MATCH_DATA = {
  team1: { name: "Gujarat Titans", short: "GT", score: 155, wickets: 8, overs: "20.0", color: "#3b82f6" },
  team2: { name: "Royal Challengers Bengaluru", short: "RCB", score: 161, wickets: 5, overs: "18.0", color: "#ef4444" },
  date: "2026-05-31",
  venue: "Narendra Modi Stadium, Ahmedabad"
};

// --- LOCKED NEXT MATCH DETAILS ---
const getTentativeNextMatch = (t1) => {
  return { 
    day: "Tuesday", 
    date: "18 May 2027", 
    time: "19:30 IST", 
    venue: TEAMS[t1].venue 
  };
};

// --- REAL-TIME LIVE SIMULATOR GENERATOR ---
const generateInnings = (isChasing = false, target = null) => {
  const data = [];
  let cumRuns = 0; let cumWkts = 0;
  for (let over = 1; over <= 20; over++) {
    if (cumWkts >= 10 || (isChasing && cumRuns >= target)) {
      data.push({ over, runs: 0, wkts: 0, cumRuns, cumWkts }); continue;
    }
    const maxRuns = over > 15 ? 24 : over <= 6 ? 18 : 14; 
    let runs = Math.floor(Math.random() * maxRuns);
    let wkts = 0;
    if (Math.random() > (over > 15 ? 0.65 : 0.85)) wkts = 1; 
    if (Math.random() > 0.95) wkts = 2; 
    if (cumWkts + wkts > 10) wkts = 10 - cumWkts; 
    cumRuns += runs; cumWkts += wkts;
    data.push({ over, runs, wkts, cumRuns, cumWkts });
  }
  return { data, totalRuns: cumRuns, totalWkts: cumWkts };
};

const renderLiveWicketMarker = (props) => {
  const { x, y, width, value } = props;
  if (value > 0) {
    return (
      <g transform={`translate(${x + width / 2}, ${y - 12})`}>
        <circle r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
        <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">{value}</text>
      </g>
    );
  }
  return null;
};

// --- MAIN COMPONENT ---
export default function LiveMatch() {
  const team1 = "Gujarat Titans";
  const team2 = "Royal Challengers Bengaluru";
  
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const [currentOver, setCurrentOver] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); 

  const t1 = TEAMS[team1];
  const t2 = TEAMS[team2];

  const nextMatch = useMemo(() => getTentativeNextMatch(team1), [team1]);

  const startLiveSimulation = () => {
    const inn1 = generateInnings(false);
    const inn2 = generateInnings(true, inn1.totalRuns + 1);
    
    const combinedData = Array.from({ length: 20 }, (_, i) => ({
      over: i + 1,
      t1Runs: inn1.data[i].runs, t1Wkts: inn1.data[i].wkts, t1CumRuns: inn1.data[i].cumRuns, t1CumWkts: inn1.data[i].cumWkts,
      t2Runs: inn2.data[i].runs, t2Wkts: inn2.data[i].wkts, t2CumRuns: inn2.data[i].cumRuns, t2CumWkts: inn2.data[i].cumWkts,
    }));
    setMatchData(combinedData); setCurrentOver(0); setIsLiveActive(true); setIsPlaying(true);
  };

  const resetToScheduleView = () => {
    setIsLiveActive(false); setIsPlaying(false); setCurrentOver(0);
  };

  useEffect(() => {
    let interval;
    if (isPlaying && currentOver < 20) {
      interval = setInterval(() => setCurrentOver(prev => prev + 1), playbackSpeed);
    } else if (currentOver >= 20 && isPlaying) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentOver, playbackSpeed]);

  const liveData = matchData.slice(0, currentOver);
  const currentT1 = liveData.length > 0 ? liveData[liveData.length - 1] : { t1CumRuns: 0, t1CumWkts: 0 };
  const currentT2 = liveData.length > 0 ? liveData[liveData.length - 1] : { t2CumRuns: 0, t2CumWkts: 0 };

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24 px-4 sm:px-8 pt-8">
      <div className="max-w-5xl mx-auto">

        {/* ══════════════════════════════════════════════════
            VIEW A: NOT LIVE (NEXT MATCH STRIP -> DARK CARD -> VIDEOS)
           ══════════════════════════════════════════════════ */}
        {!isLiveActive && (
          <div className="space-y-6 animate-fade-in">
            
            {/* 1. NEXT MATCH DATE STRIP */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-[1.5rem] p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 text-center sm:text-left w-full">
                <div className="w-14 h-14 bg-indigo-50/80 text-indigo-600 rounded-full flex shrink-0 items-center justify-center border border-indigo-100">
                  <Calendar size={24} />
                </div>
                <div className="flex flex-col items-center sm:items-start w-full">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Next Scheduled Match</div>
                  <div className="text-lg font-black text-slate-900 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    {nextMatch.date} <span className="text-slate-200 hidden sm:inline">|</span> 
                    <span className="text-sm text-slate-500">{nextMatch.day} • {nextMatch.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. EXACT REPLICA OF THE DARK CARD (With Simulation Button) */}
            <div className="bg-[#1e2235] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden flex flex-col items-center text-center">
              
              <div className="absolute top-5 left-5 bg-[#facc15] text-amber-950 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-sm">
                MATCH 1045 (FINAL) (2026)
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full mt-10 md:mt-4">
                <div className="flex flex-col items-center md:items-end text-white space-y-3 flex-1">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">{FINAL_MATCH_DATA.team1.name}</h2>
                  <div className="border border-slate-600 px-4 py-1.5 rounded-full text-white font-bold tracking-widest text-sm font-mono bg-transparent">
                    {FINAL_MATCH_DATA.team1.score}/{FINAL_MATCH_DATA.team1.wickets} <span className="text-[11px] ml-1 text-slate-300">({FINAL_MATCH_DATA.team1.overs} ov)</span>
                  </div>
                </div>
                
                <div className="text-[#f59e0b] font-black italic text-2xl tracking-widest lowercase px-4">
                  vs
                </div>
                
                <div className="flex flex-col items-center md:items-start text-white space-y-3 flex-1">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">{FINAL_MATCH_DATA.team2.name}</h2>
                  <div className="border border-slate-600 px-4 py-1.5 rounded-full text-white font-bold tracking-widest text-sm font-mono bg-transparent">
                    {FINAL_MATCH_DATA.team2.score}/{FINAL_MATCH_DATA.team2.wickets} <span className="text-[11px] ml-1 text-slate-300">({FINAL_MATCH_DATA.team2.overs} ov)</span>
                  </div>
                </div>
              </div>

              {/* FOOTER & LAUNCH BUTTON */}
              <div className="mt-8 flex flex-col items-center gap-6 w-full border-t border-slate-700/50 pt-6">
                
                <button 
                  onClick={startLiveSimulation} 
                  className="px-8 py-3.5 bg-[#e60000] hover:bg-red-700 text-white text-sm font-black tracking-widest uppercase rounded-2xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <Play size={18} fill="white" /> Launch Live Simulation
                </button>

                <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-[0.15em] uppercase flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <span>{FINAL_MATCH_DATA.date}</span> 
                  <span className="hidden sm:inline">|</span> 
                  <span>{FINAL_MATCH_DATA.venue}</span>
                </div>
              </div>
            </div>

            {/* 3. KEY VIDEOS & MEDIA SECTION */}
            <div className="pt-6">
              <div className="flex items-center gap-2 mb-4 px-2">
                <Video size={18} className="text-red-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Highlights & Historical Archives</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Featured Video */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <a 
                    href="https://www.iplt20.com/en/video/s-ipl-2026-final-rcb-vs-gt-match-highlights-o1hffe" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group bg-[#1e2235] bg-cover bg-center rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition relative flex flex-col justify-end h-64 p-6 border border-slate-200 hover:border-red-500"
                    style={{ backgroundImage: "url('/image_48e868.jpeg')" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-0"></div>
                    <div className="z-10 flex items-end justify-between w-full">
                      <div>
                        <div className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-3 shadow-sm">Must Watch</div>
                        <h4 className="text-2xl font-black leading-tight text-white group-hover:text-red-400 transition">IPL 2026 Final: RCB vs GT</h4>
                        <p className="text-sm text-slate-300 font-bold mt-2 flex items-center gap-1.5"><Play size={14} /> Official Match Highlights</p>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition duration-300 shadow-lg shrink-0">
                        <Play size={24} fill="white" className="text-white ml-1" />
                      </div>
                    </div>
                  </a>

                  {/* Secondary Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://www.hotstar.com/in/browse/editorial/tata-ipl-2026-highlights/1271615359" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:border-blue-500 hover:shadow-sm transition group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0"><Film size={18} /></div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900">TATA IPL 2026</h4>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Season Recap</p>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600 transition" />
                    </a>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <a href="https://www.iplt20.com/en/videos" target="_blank" rel="noreferrer" className="bg-amber-50 border border-amber-100 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-amber-100 hover:border-amber-300 transition group text-amber-900">
                        <Video size={20} className="text-amber-600 group-hover:scale-110 transition" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Exclusives</span>
                      </a>
                      <a href="https://www.iplt20.com/en/news" target="_blank" rel="noreferrer" className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-emerald-100 hover:border-emerald-300 transition group text-emerald-900">
                        <Newspaper size={20} className="text-emerald-600 group-hover:scale-110 transition" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Latest News</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Historical Archives */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <History size={16} className="text-slate-500" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-800">Historical Archives</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 overflow-y-auto max-h-64 pr-2 custom-scrollbar">
                    {ARCHIVE_LINKS.map((archive) => (
                      <a 
                        key={archive.year}
                        href={archive.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex-grow text-center flex items-center justify-center gap-1.5"
                      >
                        {archive.year}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════
            VIEW B: LIVE MATCH SIMULATION (WORM & MANHATTAN)
           ══════════════════════════════════════════════════ */}
        {isLiveActive && (
          <div className="space-y-6 animate-fade-in">
            
            {/* LIVE CONTROLS BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-3xl border border-slate-200 shadow-sm gap-4">
              <button onClick={resetToScheduleView} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center gap-2 uppercase tracking-widest transition">
                <ArrowLeft size={14} /> Exit Simulation
              </button>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 mr-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${currentOver === 20 ? 'bg-slate-300' : 'bg-red-500 animate-pulse'}`}></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {currentOver === 20 ? 'Finished' : 'Live In-Play'}
                  </span>
                </div>
                <button onClick={() => setIsPlaying(!isPlaying)} disabled={currentOver >= 20} className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition flex items-center gap-2 text-white ${currentOver >= 20 ? 'bg-slate-400 cursor-not-allowed' : isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? 'PAUSE' : 'RESUME'}
                </button>
                <button onClick={() => setPlaybackSpeed(playbackSpeed === 1000 ? 300 : 1000)} disabled={currentOver >= 20} className={`p-2.5 rounded-xl transition ${playbackSpeed === 300 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} title="Fast Forward (3x Speed)">
                  <FastForward size={16} />
                </button>
              </div>
            </div>

            {/* LIVE SCORECARD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-center space-y-1">
                <span className="text-xs font-black tracking-widest text-slate-400 uppercase">{team1}</span>
                <div className="text-5xl font-black font-mono text-slate-900">
                  {currentT1.t1CumRuns}<span className="text-2xl text-slate-400">/{currentT1.t1CumWkts}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Overs: {currentOver}.0</span>
              </div>

              <div className="text-center flex flex-col items-center justify-center py-4 border-y md:border-y-0 md:border-x border-slate-100">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-black italic text-xs mb-2">VS</div>
                <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
                  Target: {currentT1.t1CumRuns + 1}
                </div>
                {currentOver === 20 && (
                  <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-2 flex items-center gap-1">
                    <Trophy size={14} /> Final Over Finished
                  </p>
                )}
              </div>

              <div className="text-center space-y-1">
                <span className="text-xs font-black tracking-widest text-slate-400 uppercase">{team2}</span>
                <div className="text-5xl font-black font-mono text-slate-900">
                  {currentT2.t2CumRuns}<span className="text-2xl text-slate-400">/{currentT2.t2CumWkts}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Overs: {currentOver}.0</span>
              </div>
            </div>

            {/* LIVE WORM CHART */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
                  <Activity size={16} className="text-indigo-600" /> The Worm • Cumulative Runs
                </h3>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={liveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                    <XAxis dataKey="over" stroke="#64748b" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} type="number" domain={[1, 20]} ticks={[1,5,10,15,20]} />
                    <YAxis stroke="#64748b" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} domain={[0, 240]} />
                    <Tooltip cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                    <Line type="stepAfter" name={t1.id} dataKey="t1CumRuns" stroke={t1.color} strokeWidth={4} dot={false} activeDot={{ r: 6 }} isAnimationActive={false} />
                    <Line type="stepAfter" name={t2.id} dataKey="t2CumRuns" stroke={t2.color} strokeWidth={4} dot={false} activeDot={{ r: 6 }} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* LIVE MANHATTAN CHART */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black tracking-widest uppercase text-slate-900 flex items-center gap-2">
                  <BarChart2 size={16} className="text-rose-600" /> Manhattan Dynamics • Runs & Wickets
                </h3>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={liveData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                    <XAxis dataKey="over" stroke="#64748b" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} type="number" domain={[1, 20]} ticks={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]} />
                    <YAxis stroke="#64748b" tick={{fontSize: 10, fontWeight: 700}} tickLine={false} axisLine={false} domain={[0, 26]} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                    <Bar name={`${t1.id} Runs`} dataKey="t1Runs" fill={t1.color} radius={[3, 3, 0, 0]} barSize={14} isAnimationActive={false}>
                      <LabelList dataKey="t1Wkts" content={renderLiveWicketMarker} />
                    </Bar>
                    <Bar name={`${t2.id} Runs`} dataKey="t2Runs" fill={t2.color} radius={[3, 3, 0, 0]} barSize={14} isAnimationActive={false}>
                      <LabelList dataKey="t2Wkts" content={renderLiveWicketMarker} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}