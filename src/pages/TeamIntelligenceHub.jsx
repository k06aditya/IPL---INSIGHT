// frontend/src/pages/TeamIntelligenceHub.jsx
import { useState } from 'react';
import { MapPin, Users, CheckCircle2, AlertCircle } from 'lucide-react';

const IPL_TEAMS_INTELLIGENCE = {
  "CSK": {
    name: "Chennai Super Kings",
    short: "CSK",
    color: "from-amber-500 to-yellow-600",
    winRate: "58.4%",
    titles: "5×",
    captain: "Ruturaj Gaikwad",
    coach: "Stephen Fleming",
    form: ["W", "L", "W", "W", "L"],
    homeVenue: "MA Chidambaram Stadium (Chepauk)",
    coordinates: "N 13.0629° E 80.2794°",
    capacity: "50,000",
    pitchType: "Slow, dry, sharp turn",
    description: "Chennai Super Kings enter IPL 2026 with Sanju Samson traded in from RR, adding explosive batting depth alongside MS Dhoni and captain Ruturaj Gaikwad. The Yellow Army have won five titles and remain one of the most consistent franchises, now bolstered by Noor Ahmad's left-arm wrist spin and Jamie Overton's all-round power.",
    strengths: [
      "MS Dhoni finishing masterclass",
      "Samson-Gaikwad explosive top order",
      "Noor Ahmad wrist spin dimension",
      "Unmatched IPL experience & playoff DNA"
    ],
    weaknesses: [
      "Ageing squad core",
      "Lost Ravindra Jadeja to RR trade",
      "Struggles on fast bouncy pitches"
    ],
    squad: [
      { role: "BAT", name: "Ruturaj Gaikwad", stats: "2,280R", dna: 87 },
      { role: "WK", name: "MS Dhoni", stats: "5,200R", dna: 95 },
      { role: "WK", name: "Sanju Samson", stats: "4,100R", dna: 86 },
      { role: "AR", name: "Shivam Dube", stats: "1,650R", dna: 81 },
      { role: "BOWL", name: "Khaleel Ahmed", stats: "42W", dna: 77 }
    ]
  },
  "MI": {
    name: "Mumbai Indians",
    short: "MI",
    color: "from-blue-600 to-cyan-600",
    winRate: "59.8%",
    titles: "5×",
    captain: "Hardik Pandya",
    coach: "Mahela Jayawardene",
    form: ["W", "W", "L", "W", "W"],
    homeVenue: "Wankhede Stadium",
    coordinates: "N 18.9388° E 72.8258°",
    capacity: "33,108",
    pitchType: "True bounce, red soil, high scoring",
    description: "Mumbai Indians, owned by Reliance Industries, are the most successful franchise in IPL history with five titles. Known for their world-class pace attack led by Jasprit Bumrah and explosive batting, MI have set the gold standard for IPL franchises.",
    strengths: [
      "World-class pace battery (Jasprit Bumrah & Co.)",
      "Unmatched power-hitting depth",
      "Aggressive powerplay intent",
      "Strong talent scouting network"
    ],
    weaknesses: [
      "Tactical transition phase",
      "Spin bowling department depth",
      "Middle-overs economy rate pressure"
    ],
    squad: [
      { role: "BOWL", name: "Jasprit Bumrah", stats: "165W", dna: 96 },
      { role: "BAT", name: "Rohit Sharma", stats: "6,628R", dna: 92 },
      { role: "AR", name: "Hardik Pandya", stats: "2,525R", dna: 88 },
      { role: "BAT", name: "Suryakumar Yadav", stats: "3,598R", dna: 90 },
      { role: "BOWL", name: "Gerald Coetzee", stats: "18W", dna: 79 }
    ]
  },
  "RCB": {
    name: "Royal Challengers Bengaluru",
    short: "RCB",
    color: "from-red-600 to-rose-700",
    winRate: "49.8%",
    titles: "2×",
    captain: "Virat Kohli",
    coach: "Andy Flower",
    form: ["W", "W", "W", "L", "W"],
    homeVenue: "M Chinnaswamy Stadium",
    coordinates: "N 12.9788° E 77.5996°",
    capacity: "40,000",
    pitchType: "Flat, small boundaries, high altitude",
    description: "Royal Challengers Bengaluru combine the unmatched star power of Virat Kohli with a fiercely loyal fanbase. Known for setting blistering batting records at Chinnaswamy Stadium, RCB remain one of the most electric teams in the league.",
    strengths: [
      "Virat Kohli masterclass anchor & run-scoring",
      "Explosive boundary-hitting machine",
      "Electrifying home crowd backing",
      "Aggressive overseas recruitment"
    ],
    weaknesses: [
      "Historical bowling pressure at Chinnaswamy",
      "Middle-order collapse vulnerability",
      "Heavy reliance on top-order anchors"
    ],
    squad: [
      { role: "BAT", name: "Virat Kohli", stats: "8,004R", dna: 98 },
      { role: "BAT", name: "Faf du Plessis", stats: "4,150R", dna: 86 },
      { role: "AR", name: "Glenn Maxwell", stats: "2,771R", dna: 84 },
      { role: "BOWL", name: "Mohammed Siraj", stats: "93W", dna: 80 }
    ]
  },
  "KKR": {
    name: "Kolkata Knight Riders",
    short: "KKR",
    color: "from-purple-600 to-indigo-800",
    winRate: "53.2%",
    titles: "3×",
    captain: "Ajinkya Rahane",
    coach: "Chandrakant Pandit",
    form: ["L", "W", "W", "L", "W"],
    homeVenue: "Eden Gardens",
    coordinates: "N 22.5646° E 88.3433°",
    capacity: "66,000",
    pitchType: "Balanced, turning assists later",
    description: "Kolkata Knight Riders enter the season with a reputation for fearless intent and lethal mystery spin. Backed by the roaring 66,000 capacity of Eden Gardens, KKR have secured three titles through tactical grit and explosive all-rounders.",
    strengths: [
      "Mystery spin dominance (Sunil Narine & Varun)",
      "Fearless aggressive opening partnerships",
      "Massive Eden Gardens home advantage",
      "Balanced tactical depth"
    ],
    weaknesses: [
      "Top-order inconsistency",
      "Pace attack transition phase"
    ],
    squad: [
      { role: "AR", name: "Sunil Narine", stats: "1,522R / 180W", dna: 93 },
      { role: "BOWL", name: "Varun Chakaravarthy", stats: "82W", dna: 85 },
      { role: "BAT", name: "Rinku Singh", stats: "893R", dna: 83 },
      { role: "BAT", name: "Ajinkya Rahane", stats: "4,642R", dna: 81 }
    ]
  },
  "DC": {
    name: "Delhi Capitals",
    short: "DC",
    color: "from-blue-700 to-indigo-900",
    winRate: "47.5%",
    titles: "0×",
    captain: "Axar Patel",
    coach: "Hemang Badani",
    form: ["W", "L", "W", "L", "W"],
    homeVenue: "Arun Jaitley Stadium",
    coordinates: "N 28.6376° E 77.2432°",
    capacity: "35,000",
    pitchType: "Low and slow, responsive to spin",
    description: "Delhi Capitals feature an energetic and balanced squad blending homegrown talent with explosive overseas power-hitters, striving to clinch their maiden IPL championship trophy under strategic leadership.",
    strengths: [
      "Dynamic all-round options",
      "Strong spin-bowling department",
      "Aggressive young Indian core"
    ],
    weaknesses: [
      "Inconsistent death bowling execution",
      "Middle-order stability under pressure"
    ],
    squad: [
      { role: "AR", name: "Axar Patel", stats: "1,650R / 112W", dna: 88 },
      { role: "WK", name: "Rishabh Pant", stats: "3,284R", dna: 91 },
      { role: "BAT", name: "David Warner", stats: "6,565R", dna: 89 }
    ]
  },
  "GT": {
    name: "Gujarat Titans",
    short: "GT",
    color: "from-slate-800 to-cyan-950",
    winRate: "63.1%",
    titles: "1×",
    captain: "Shubman Gill",
    coach: "Ashish Nehra",
    form: ["W", "W", "L", "W", "W"],
    homeVenue: "Narendra Modi Stadium",
    coordinates: "N 23.0920° E 72.5975°",
    capacity: "132,000",
    pitchType: "Good bounce, high-scoring venue",
    description: "Gujarat Titans have established themselves as an analytical powerhouse since their inception, winning the title in their debut season and consistently dominating with tactical discipline and elite match-winners.",
    strengths: [
      "Superb tactical coaching under Ashish Nehra",
      "Shubman Gill's technical masterclass",
      "Massive home backing at Ahmedabad"
    ],
    weaknesses: [
      "Squad depth post mega-auction shifts",
      "Powerplay wicket-taking pressure"
    ],
    squad: [
      { role: "BAT", name: "Shubman Gill", stats: "3,216R", dna: 92 },
      { role: "AR", name: "Rashid Khan", stats: "445R / 149W", dna: 95 },
      { role: "BOWL", name: "Mohammed Shami", stats: "127W", dna: 88 }
    ]
  },
  "SRH": {
    name: "Sunrisers Hyderabad",
    short: "SRH",
    color: "from-orange-600 to-red-700",
    winRate: "52.4%",
    titles: "1×",
    captain: "Pat Cummins",
    coach: "Daniel Vettori",
    form: ["W", "W", "W", "L", "W"],
    homeVenue: "Rajiv Gandhi International Stadium",
    coordinates: "N 17.4065° E 78.5501°",
    capacity: "55,000",
    pitchType: "Flat deck, batting friendly",
    description: "Sunrisers Hyderabad are known for rewriting T20 batting records with ultra-aggressive powerplay intent, backed by Pat Cummins' astute leadership and a formidable pace attack.",
    strengths: [
      "Explosive opening batting approach",
      "Pat Cummins tactical leadership",
      "Lethal pace bowling variations"
    ],
    weaknesses: [
      "High-risk batting can trigger collapses",
      "Spin bowling control on flat tracks"
    ],
    squad: [
      { role: "BOWL", name: "Pat Cummins", stats: "65W", dna: 90 },
      { role: "BAT", name: "Travis Head", stats: "980R", dna: 89 },
      { role: "BAT", name: "Heinrich Klaasen", stats: "1,420R", dna: 91 }
    ]
  },
  "RR": {
    name: "Rajasthan Royals",
    short: "RR",
    color: "from-pink-600 to-rose-900",
    winRate: "50.9%",
    titles: "1×",
    captain: "Sanju Samson",
    coach: "Rahul Dravid",
    form: ["L", "W", "W", "W", "L"],
    homeVenue: "Sawai Mansingh Stadium",
    coordinates: "N 26.9046° E 75.8062°",
    capacity: "30,000",
    pitchType: "Balanced, favors spinners and smart seamers",
    description: "Rajasthan Royals, the inaugural champions of 2008, combine smart auction strategies with dynamic anchors and world-class spin wizardry to consistently contend for the playoffs.",
    strengths: [
      "Yuzvendra Chahal spin mastery",
      "Sanju Samson explosive captaincy & keeping",
      "Solid middle-order backbone"
    ],
    weaknesses: [
      "Death-over bowling consistency",
      "Dependence on key overseas anchors"
    ],
    squad: [
      { role: "WK", name: "Sanju Samson", stats: "4,100R", dna: 86 },
      { role: "BOWL", name: "Yuzvendra Chahal", stats: "205W", dna: 92 },
      { role: "BAT", name: "Yashasvi Jaiswal", stats: "1,750R", dna: 87 }
    ]
  },
  "PBKS": {
    name: "Punjab Kings",
    short: "PBKS",
    color: "from-red-500 to-red-800",
    winRate: "46.2%",
    titles: "0×",
    captain: "Shreyas Iyer",
    coach: "Ricky Ponting",
    form: ["L", "L", "W", "W", "L"],
    homeVenue: "PCA IS Bindra Stadium",
    coordinates: "N 30.6929° E 76.7353°",
    capacity: "27,000",
    pitchType: "Pace and bounce friendly",
    description: "Punjab Kings enter the new season under the expert guidance of head coach Ricky Ponting and captain Shreyas Iyer, bringing renewed tactical clarity and fiery pace firepower.",
    strengths: [
      "Ricky Ponting's winning coaching pedigree",
      "Aggressive pace bowling options",
      "Explosive middle-order hitters"
    ],
    weaknesses: [
      "Historical inconsistency in tight matches",
      "Powerplay batting stability"
    ],
    squad: [
      { role: "BAT", name: "Shreyas Iyer", stats: "3,450R", dna: 88 },
      { role: "AR", name: "Liam Livingstone", stats: "950R / 20W", dna: 83 },
      { role: "BOWL", name: "Arshdeep Singh", stats: "78W", dna: 85 }
    ]
  },
  "LSG": {
    name: "Lucknow Super Giants",
    short: "LSG",
    color: "from-cyan-700 to-blue-950",
    winRate: "55.0%",
    titles: "0×",
    captain: "Rishabh Pant",
    coach: "Justin Langer",
    form: ["W", "L", "W", "W", "L"],
    homeVenue: "BRSABV Ekana Cricket Stadium",
    coordinates: "N 26.7991° E 81.0140°",
    capacity: "50,000",
    pitchType: "Low scoring, slow surface, great for seam cutters & spin",
    description: "Lucknow Super Giants have quickly built a reputation for tactical resilience and disciplined bowling on their home turf at Ekana Stadium, backed by smart all-round balance.",
    strengths: [
      "Justin Langer's fierce competitive culture",
      "Ekana pitch condition mastery",
      "Strong pace-bowling variations"
    ],
    weaknesses: [
      "Scoring rate acceleration in middle overs",
      "Top-order batting stability"
    ],
    squad: [
      { role: "WK", name: "Rishabh Pant", stats: "3,284R", dna: 91 },
      { role: "AR", name: "Marcus Stoinis", stats: "1,120R / 40W", dna: 84 },
      { role: "BOWL", name: "Ravi Bishnoi", stats: "62W", dna: 82 }
    ]
  }
};

const TeamIntelligenceHub = () => {
  const [selectedTeam, setSelectedTeam] = useState("CSK");
  const team = IPL_TEAMS_INTELLIGENCE[selectedTeam];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-blue-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white font-black px-3 py-1.5 rounded-lg tracking-wider text-sm">CRICMIND.AI</div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">IPL 2026 Intelligence Hub</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
          <span className="hover:text-blue-400 cursor-pointer">HOME</span>
          <span className="text-blue-400">TEAMS</span>
          <span className="hover:text-blue-400 cursor-pointer">ASK AI</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-8">
        
        {/* Team Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {Object.keys(IPL_TEAMS_INTELLIGENCE).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTeam(key)}
              className={`px-5 py-2.5 rounded-xl font-black text-sm whitespace-nowrap transition-all flex items-center gap-2 border ${
                selectedTeam === key 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30 scale-105' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{key}</span>
              <span className="text-[10px] opacity-70 font-normal">{IPL_TEAMS_INTELLIGENCE[key].short}</span>
            </button>
          ))}
        </div>

        {/* Team Header Profile Card */}
        <div className={`bg-gradient-to-br ${team.color} p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-white/10 text-white`}>
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border border-white/20">
                  IPL Intelligence Profile
                </span>
                <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-extrabold border border-amber-400/30">
                  {team.titles} IPL TITLES
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">{team.name}</h1>
              <p className="mt-3 text-white/90 text-sm md:text-base max-w-2xl leading-relaxed">
                {team.description}
              </p>
            </div>

            {/* Form Indicator Box */}
            <div className="bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-white/15 flex flex-col items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Recent Form (L5)</span>
              <div className="flex items-center gap-2">
                {team.form.map((res, i) => (
                  <span 
                    key={i} 
                    className={`w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center shadow-md ${
                      res === 'W' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15 relative z-10 text-center">
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">Win Rate</p>
              <p className="text-2xl font-black mt-1">{team.winRate}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">IPL Titles</p>
              <p className="text-2xl font-black mt-1">{team.titles}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">Captain</p>
              <p className="text-lg font-black mt-1 truncate">{team.captain}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">Coach</p>
              <p className="text-lg font-black mt-1 truncate">{team.coach}</p>
            </div>
          </div>
        </div>

        {/* Tactical Profile: Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
              <CheckCircle2 size={22} />
              <h3>TACTICAL STRENGTHS</h3>
            </div>
            <ul className="space-y-3">
              {team.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl text-sm font-semibold text-emerald-200">
                  <span className="text-emerald-400 font-bold">+</span> {str}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-black text-lg">
              <AlertCircle size={22} />
              <h3>TACTICAL WEAKNESSES</h3>
            </div>
            <ul className="space-y-3">
              {team.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl text-sm font-semibold text-rose-200">
                  <span className="text-rose-400 font-bold">−</span> {weak}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Squad Intelligence Table */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="px-6 py-5 bg-slate-950 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Users className="text-blue-400" size={20} />
              <h2 className="text-lg font-black tracking-wide text-white">Key Players · Squad Intelligence</h2>
            </div>
            <span className="text-xs font-bold text-slate-400">AI DNA Rated</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase bg-slate-900/50">
                  <th className="py-3 px-6">Role</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6 text-center">Career Stats</th>
                  <th className="py-3 px-6 text-center">AI DNA Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm font-semibold text-slate-200">
                {team.squad.map((player, index) => (
                  <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-lg text-xs font-black">
                        {player.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-extrabold text-white text-base">{player.name}</td>
                    <td className="py-4 px-6 text-center font-mono text-slate-300">{player.stats}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-black text-xs">
                        {player.dna} / 100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Home Venue Intelligence Card */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-black text-sm tracking-widest uppercase">
              <MapPin size={18} /> Home Venue Intelligence
            </div>
            <h3 className="text-2xl font-black text-white">{team.homeVenue}</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Pitch profile: <span className="text-slate-200 font-bold">{team.pitchType}</span>. Coordinates: <span className="font-mono text-blue-400">{team.coordinates}</span>. Capacity: <span className="text-slate-200 font-bold">{team.capacity}</span>.
            </p>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center w-full md:w-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Venue Advantage</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">High Impact</p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default TeamIntelligenceHub;