// frontend/src/pages/HomeDashboard.jsx
import { useEffect, useState } from 'react';
import { seasonService } from '../services/api';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Calendar, ChevronRight, Trophy, ArrowRight } from 'lucide-react';
import { getTeamLogo, handleImageError } from '../utils/teamLogos';

const TEAMS_LIST = [
  { name: "Chennai Super Kings", slug: "csk", short: "CSK", titles: "5 Titles", status: "Active (2008–Present)", logo: "/logos/csk.png" },
  { name: "Mumbai Indians", slug: "mi", short: "MI", titles: "5 Titles", status: "Active (2008–Present)", logo: "/logos/mi.png" },
  { name: "Royal Challengers Bengaluru", slug: "rcb", short: "RCB", titles: "2 Titles", status: "Active (2008–Present)", logo: "/logos/rcb.png" },
  { name: "Kolkata Knight Riders", slug: "kkr", short: "KKR", titles: "3 Titles", status: "Active (2008–Present)", logo: "/logos/kkr.png" },
  { name: "Delhi Capitals", slug: "dc", short: "DC", titles: "Contender", status: "Active (2008–Present)", logo: "/logos/dc.png" },
  { name: "Gujarat Titans", slug: "gt", short: "GT", titles: "2 Titles", status: "Active (2022–Present)", logo: "/logos/gt.png" },
  { name: "Sunrisers Hyderabad", slug: "srh", short: "SRH", titles: "1 Title", status: "Active (2013–Present)", logo: "/logos/srh.png" },
  { name: "Rajasthan Royals", slug: "rr", short: "RR", titles: "1 Title", status: "Active (2008–Present)", logo: "/logos/rr.png" },
  { name: "Punjab Kings", slug: "pbks", short: "PBKS", titles: "Contender", status: "Active (2008–Present)", logo: "/logos/pbks.png" },
  { name: "Lucknow Super Giants", slug: "lsg", short: "LSG", titles: "Contender", status: "Active (2022–Present)", logo: "/logos/lsg.png" },
  { name: "Deccan Chargers", slug: "deccan", short: "DEC", titles: "1 Title (2009)", status: "Defunct (2008–2012)", logo: "/logos/deccan.png" },
  { name: "Kochi Tuskers Kerala", slug: "kochi", short: "KTK", titles: "Played 2011", status: "Defunct (2011)", logo: "/logos/kochi.png" },
  { name: "Pune Warriors India", slug: "pwi", short: "PWI", titles: "Played 2011-13", status: "Defunct (2011–2013)", logo: "/logos/pune.png" },
  { name: "Gujarat Lions", slug: "gl", short: "GL", titles: "Playoffs (2016)", status: "Defunct (2016–2017)", logo: "/logos/gl.png" },
  { name: "Rising Pune Supergiant", slug: "rps", short: "RPS", titles: "Finalist (2017)", status: "Defunct (2016–2017)", logo: "/logos/rps.png" }
];

const VENUES_DATA = [
  { rank: 1, name: "Wankhede Stadium", city: "Mumbai", mat: 132, avg1: "173.1", avg2: "162.0", high: 249, low: 67, winBatFirst: "45%", topScorer: "RG Sharma", runs: 2632, topWktTaker: "SL Malinga", wkts: 68 },
  { rank: 2, name: "Eden Gardens", city: "Kolkata", mat: 106, avg1: "170.0", avg2: "154.7", high: 262, low: 74, winBatFirst: "45%", topScorer: "G Gambhir", runs: 1407, topWktTaker: "SP Narine", wkts: 79 },
  { rank: 3, name: "Arun Jaitley Stadium", city: "Delhi", mat: 103, avg1: "172.9", avg2: "158.4", high: 278, low: 44, winBatFirst: "48%", topScorer: "DA Warner", runs: 1048, topWktTaker: "A Mishra", wkts: 58 },
  { rank: 4, name: "M Chinnaswamy Stadium", city: "Bengaluru", mat: 103, avg1: "173.8", avg2: "157.2", high: 287, low: 82, winBatFirst: "44%", topScorer: "V Kohli", runs: 3448, topWktTaker: "YS Chahal", wkts: 54 },
  { rank: 5, name: "MA Chidambaram", city: "Chennai", mat: 98, avg1: "165.6", avg2: "152.3", high: 246, low: 70, winBatFirst: "53%", topScorer: "MS Dhoni", runs: 1547, topWktTaker: "R Ashwin", wkts: 52 },
  { rank: 6, name: "Rajiv Gandhi Intl", city: "Hyderabad", mat: 89, avg1: "168.7", avg2: "156.6", high: 286, low: 80, winBatFirst: "47%", topScorer: "DA Warner", runs: 1623, topWktTaker: "B Kumar", wkts: 48 },
  { rank: 7, name: "Sawai Mansingh", city: "Jaipur", mat: 68, avg1: "169.1", avg2: "155.8", high: 229, low: 59, winBatFirst: "35%", topScorer: "AM Rahane", runs: 1115, topWktTaker: "SK Trivedi", wkts: 36 },
  { rank: 8, name: "PCA IS Bindra", city: "Chandigarh", mat: 61, avg1: "168.3", avg2: "157.4", high: 257, low: 67, winBatFirst: "44%", topScorer: "SE Marsh", runs: 1064, topWktTaker: "PP Chawla", wkts: 26 },
  { rank: 9, name: "Narendra Modi", city: "Ahmedabad", mat: 53, avg1: "180.7", avg2: "162.2", high: 243, low: 86, winBatFirst: "50%", topScorer: "Shubman Gill", runs: 1384, topWktTaker: "Rashid Khan", wkts: 34 },
  { rank: 10, name: "Dubai Intl", city: "Dubai", mat: 46, avg1: "163.8", avg2: "149.1", high: 219, low: 109, winBatFirst: "49%", topScorer: "KL Rahul", runs: 606, topWktTaker: "YS Chahal", wkts: 19 },
  { rank: 11, name: "Dr DY Patil", city: "Navi Mumbai", mat: 37, avg1: "159.6", avg2: "148.0", high: 216, low: 82, winBatFirst: "46%", topScorer: "RV Uthappa", runs: 359, topWktTaker: "DJ Bravo", wkts: 9 },
  { rank: 12, name: "MCA Stadium", city: "Pune", mat: 35, avg1: "168.3", avg2: "149.3", high: 211, low: 73, winBatFirst: "51%", topScorer: "SPD Smith", runs: 469, topWktTaker: "Imran Tahir", wkts: 15 },
  { rank: 13, name: "Sheikh Zayed", city: "Abu Dhabi", mat: 29, avg1: "158.9", avg2: "145.6", high: 206, low: 70, winBatFirst: "41%", topScorer: "SA Yadav", runs: 413, topWktTaker: "JJ Bumrah", wkts: 13 },
  { rank: 14, name: "Sharjah Stadium", city: "Sharjah", mat: 28, avg1: "159.0", avg2: "147.5", high: 228, low: 85, winBatFirst: "36%", topScorer: "V Kohli", runs: 285, topWktTaker: "Mohammed Shami", wkts: 14 },
  { rank: 15, name: "Ekana Stadium", city: "Lucknow", mat: 28, avg1: "176.6", avg2: "166.5", high: 235, low: 108, winBatFirst: "41%", topScorer: "MR Marsh", runs: 571, topWktTaker: "Ravi Bishnoi", wkts: 20 },
  { rank: 16, name: "Brabourne Stadium", city: "Mumbai", mat: 27, avg1: "178.5", avg2: "166.1", high: 217, low: 68, winBatFirst: "52%", topScorer: "S Dhawan", runs: 295, topWktTaker: "KK Ahmed", wkts: 10 },
  { rank: 17, name: "HPCA Stadium", city: "Dharamsala", mat: 18, avg1: "195.1", avg2: "166.9", high: 254, low: 116, winBatFirst: "61%", topScorer: "SE Marsh", runs: 334, topWktTaker: "PP Chawla", wkts: 13 },
  { rank: 18, name: "Maharaja Yadavindra", city: "New Chandigarh", mat: 17, avg1: "186.6", avg2: "176.1", high: 254, low: 95, winBatFirst: "47%", topScorer: "Priyansh Arya", runs: 340, topWktTaker: "Arshdeep Singh", wkts: 15 },
  { rank: 19, name: "ACA-VDCA Stadium", city: "Visakhapatnam", mat: 17, avg1: "169.5", avg2: "141.9", high: 272, low: 76, winBatFirst: "53%", topScorer: "S Dhawan", runs: 294, topWktTaker: "A Zampa", wkts: 10 },
  { rank: 20, name: "Subrata Roy Sahara", city: "Pune", mat: 16, avg1: "149.4", avg2: "133.6", high: 187, low: 99, winBatFirst: "63%", topScorer: "RV Uthappa", runs: 418, topWktTaker: "R Sharma", wkts: 11 },
  { rank: 21, name: "Kingsmead", city: "Durban", mat: 15, avg1: "152.0", avg2: "138.2", high: 211, low: 79, winBatFirst: "60%", topScorer: "Yuvraj Singh", runs: 182, topWktTaker: "YA Abdulla", wkts: 10 },
  { rank: 22, name: "SuperSport Park", city: "Centurion", mat: 12, avg1: "154.8", avg2: "149.6", high: 189, low: 105, winBatFirst: "33%", topScorer: "SK Raina", runs: 182, topWktTaker: "A Mishra", wkts: 7 },
  { rank: 23, name: "SCA Stadium", city: "Rajkot", mat: 10, avg1: "168.9", avg2: "162.7", high: 213, low: 131, winBatFirst: "33%", topScorer: "SK Raina", runs: 328, topWktTaker: "AJ Tye", wkts: 7 },
  { rank: 24, name: "Holkar Cricket Stadium", city: "Indore", mat: 9, avg1: "160.3", avg2: "158.8", high: 245, low: 88, winBatFirst: "11%", topScorer: "KL Rahul", runs: 195, topWktTaker: "AJ Tye", wkts: 7 },
  { rank: 25, name: "New Wanderers Stadium", city: "Johannesburg", mat: 8, avg1: "144.0", avg2: "142.5", high: 166, low: 123, winBatFirst: "38%", topScorer: "JH Kallis", runs: 151, topWktTaker: "A Kumble", wkts: 6 },
  { rank: 26, name: "Zayed Cricket Stadium", city: "Abu Dhabi", mat: 8, avg1: "159.0", avg2: "150.4", high: 235, low: 92, winBatFirst: "38%", topScorer: "RD Gaikwad", runs: 141, topWktTaker: "JJ Bumrah", wkts: 7 },
  { rank: 27, name: "Barsapara Cricket Stadium", city: "Guwahati", mat: 8, avg1: "168.9", avg2: "157.6", high: 202, low: 123, winBatFirst: "50%", topScorer: "YBK Jaiswal", runs: 236, topWktTaker: "YS Chahal", wkts: 6 },
  { rank: 28, name: "JSCA Intl Stadium", city: "Ranchi", mat: 7, avg1: "149.0", avg2: "144.7", high: 189, low: 114, winBatFirst: "29%", topScorer: "MS Dhoni", runs: 138, topWktTaker: "RA Jadeja", wkts: 8 },
  { rank: 29, name: "Barabati Stadium", city: "Cuttack", mat: 7, avg1: "167.7", avg2: "157.7", high: 231, low: 126, winBatFirst: "57%", topScorer: "RV Uthappa", runs: 152, topWktTaker: "PP Chawla", wkts: 4 },
  { rank: 30, name: "Newlands", city: "Cape Town", mat: 7, avg1: "139.4", avg2: "112.6", high: 184, low: 58, winBatFirst: "67%", topScorer: "R Dravid", runs: 114, topWktTaker: "RP Singh", wkts: 6 },
  { rank: 31, name: "St George's Park", city: "Port Elizabeth", mat: 7, avg1: "159.0", avg2: "131.4", high: 187, low: 87, winBatFirst: "43%", topScorer: "JP Duminy", runs: 139, topWktTaker: "SL Malinga", wkts: 5 },
  { rank: 32, name: "SVNS Intl Stadium", city: "Raipur", mat: 6, avg1: "146.3", avg2: "143.8", high: 164, low: 119, winBatFirst: "33%", topScorer: "DA Warner", runs: 207, topWktTaker: "UT Yadav", wkts: 4 },
  { rank: 33, name: "Nehru Stadium", city: "Kochi", mat: 5, avg1: "146.8", avg2: "125.8", high: 162, low: 74, winBatFirst: "60%", topScorer: "DPMD Jayawardene", runs: 111, topWktTaker: "R Vinay Kumar", wkts: 7 },
  { rank: 34, name: "Green Park", city: "Kanpur", mat: 4, avg1: "161.3", avg2: "163.3", high: 197, low: 12, winBatFirst: "40%", topScorer: "SK Raina", runs: 119, topWktTaker: "DR Smith", wkts: 6 },
  { rank: 35, name: "VCA Stadium", city: "Nagpur", mat: 3, avg1: "149.3", avg2: "144.7", high: 159, low: 138, winBatFirst: "67%", topScorer: "RG Sharma", runs: 132, topWktTaker: "RJ Harris", wkts: 7 },
  { rank: 36, name: "De Beers Diamond Oval", city: "Kimberley", mat: 3, avg1: "158.0", avg2: "141.0", high: 169, low: 113, winBatFirst: "33%", topScorer: "A Symonds", runs: 90, topWktTaker: "RG Sharma", wkts: 5 },
  { rank: 37, name: "Buffalo Park", city: "East London", mat: 3, avg1: "147.3", avg2: "119.0", high: 178, low: 100, winBatFirst: "67%", topScorer: "BJ Hodge", runs: 73, topWktTaker: "SB Jakati", wkts: 4 },
  { rank: 38, name: "SVNS Intl Stadium", city: "Raipur", mat: 2, avg1: "179.0", avg2: "180.5", high: 194, low: 16, winBatFirst: "60%", topScorer: "V Kohli", runs: 105, topWktTaker: "B Kumar", wkts: 5 },
  { rank: 39, name: "OUTsurance Oval", city: "Bloemfontein", mat: 2, avg1: "135.0", avg2: "129.5", high: 150, low: 120, winBatFirst: "50%", topScorer: "AB de Villiers", runs: 90, topWktTaker: "MF Maharoof", wkts: 4 }
];

const HomeDashboard = () => {
  const [seasonData, setSeasonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seasonRes = await seasonService.getLatestSeasonSummary();
        setSeasonData(seasonRes.data);
      } catch (err) {
        console.error("Error loading home dashboard:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. RECENT SEASON CHAMPIONS BANNER */}
      {seasonData && seasonData.year && (
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-8 shadow-xl text-center">
          <h1 className="text-2xl md:text-3xl font-black mb-8">IPL {seasonData.year} Grand Finale</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2">🏆</div>
              <img src={getTeamLogo(seasonData.champion)} onError={(e) => handleImageError(e, seasonData.champion)} className="w-28 h-28 object-contain mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" alt={seasonData.champion} />
              <p className="text-yellow-400 font-black uppercase text-xs tracking-widest mb-1">Champions</p>
              <h2 className="text-2xl font-bold">{seasonData.champion}</h2>
            </div>
            <div className="text-slate-500 font-black text-2xl italic">VS</div>
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2">🥈</div>
              <img src={getTeamLogo(seasonData.runner_up)} onError={(e) => handleImageError(e, seasonData.runner_up)} className="w-24 h-24 object-contain mb-4 opacity-80" alt={seasonData.runner_up} />
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-1">Runner-Up</p>
              <h2 className="text-xl font-bold text-slate-300">{seasonData.runner_up}</h2>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-2 text-slate-400 text-sm">
            <MapPin size={16} className="text-yellow-500" />
            <span>Played at: {seasonData.final_stadium}</span>
          </div>
        </div>
      )}

      {/* 2. RECENT MATCHES WITH STADIUM NAMES */}
      {seasonData?.recent_matches && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
            <Calendar className="text-blue-600" />
            <span>Recent Matches</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonData.recent_matches.map((m) => (
              <Link to={`/match/${m.id}`} key={m.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition block">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-3">
                  <span>{m.date}</span>
                  <span className="flex items-center space-x-1 text-slate-500">
                    <MapPin size={12} />
                    <span>{m.stadium}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center font-bold text-slate-800 my-2">
                  <div className="flex flex-col items-center flex-1">
                    <img src={getTeamLogo(m.team1)} onError={(e) => handleImageError(e, m.team1)} className="w-10 h-10 object-contain mb-1" alt={m.team1} />
                    <span className="text-xs text-center">{m.team1}</span>
                  </div>
                  <span className="text-xs font-black text-slate-300 px-4">VS</span>
                  <div className="flex flex-col items-center flex-1">
                    <img src={getTeamLogo(m.team2)} onError={(e) => handleImageError(e, m.team2)} className="w-10 h-10 object-contain mb-1" alt={m.team2} />
                    <span className="text-xs text-center">{m.team2}</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-emerald-600 text-center mt-3 pt-2 border-t border-slate-100">
                  Winner: {m.winner}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. ALL IPL FRANCHISES GRID */}
      <div className="space-y-6 pt-6">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Shield className="text-blue-600" /> All IPL Franchises
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAMS_LIST.map((team) => (
            <Link
              key={team.slug}
              to={`/team/${team.slug}`}
              className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-blue-600 hover:shadow-md transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{team.short}</span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{team.status}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5 group-hover:text-blue-600 transition-colors">{team.name}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{team.titles}</p>
                </div>
              </div>
              <ChevronRight className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
            </Link>
          ))}
        </div>
      </div>

      {/* 4. VENUES OVERVIEW (Added exactly after the Franchises grid) */}
      <div className="space-y-6 pt-10">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <MapPin className="text-blue-600" /> Venues Overview
        </h2>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          {/* Header Description & Metrics */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1">
              <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                Every ground that has hosted an IPL match since 2008. Each venue page breaks down average first and second innings scores, bat-first versus chase win percentages, phase-by-phase scoring patterns, and team-specific records at that ground. Click any venue to see the full analysis.
              </p>
            </div>
            <div className="flex gap-8 md:gap-12 shrink-0 bg-slate-50 border border-slate-100 p-5 rounded-xl">
              <div>
                <div className="text-3xl font-black text-slate-900">39</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Venues</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-600">1,237</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Matches</div>
              </div>
            </div>
          </div>

          {/* Venues Scrollable Data Table */}
          <div className="overflow-x-auto custom-scrollbar pb-4">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 px-4 text-center font-black text-slate-400 uppercase tracking-widest text-[11px]">#</th>
                  <th className="py-4 px-4 text-left font-black text-slate-400 uppercase tracking-widest text-[11px]">Venue</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 uppercase tracking-widest text-[11px]">Mat</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 uppercase tracking-widest text-[11px]">Avg 1st</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 uppercase tracking-widest text-[11px]">Avg 2nd</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 uppercase tracking-widest text-[11px]">High</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 uppercase tracking-widest text-[11px]">Low</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 uppercase tracking-widest text-[11px]">Win% <span className="text-[9px] lowercase text-slate-400 block mt-0.5">(Bat 1st)</span></th>
                  <th className="py-4 px-4 text-left font-black text-slate-400 uppercase tracking-widest text-[11px]">Top Scorer</th>
                  <th className="py-4 px-4 text-left font-black text-slate-400 uppercase tracking-widest text-[11px]">Top Wkt Taker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {VENUES_DATA.map((v) => (
                  <tr key={v.rank} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                    <td className="py-4 px-4 text-center text-sm font-black text-slate-400 group-hover:text-blue-600 transition-colors">{v.rank}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-[14px] group-hover:text-blue-600 transition-colors">{v.name}</div>
                      <div className="text-[11px] font-bold text-slate-400 tracking-wide uppercase mt-0.5">{v.city}</div>
                    </td>
                    <td className="py-4 px-4 text-center font-black text-slate-900 text-sm">{v.mat}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-600 text-sm">{v.avg1}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-600 text-sm">{v.avg2}</td>
                    <td className="py-4 px-4 text-center font-black text-blue-600 text-sm">{v.high}</td>
                    <td className="py-4 px-4 text-center font-black text-rose-600 text-sm">{v.low}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-slate-100 text-slate-700 font-black px-2.5 py-1.5 rounded text-[11px]">{v.winBatFirst}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800 text-[13px]">{v.topScorer}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{v.runs} runs</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-800 text-[13px]">{v.topWktTaker}</div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">{v.wkts} wkts</div>
                        </div>
                        <ChevronRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeDashboard;