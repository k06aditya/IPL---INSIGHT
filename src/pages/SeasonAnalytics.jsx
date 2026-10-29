// frontend/src/pages/SeasonAnalytics.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trophy, Award, Target, ChevronDown, TrendingUp, Info } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ELO_DATA = [
  { year: 2008, RCB: 1431, PBKS: 1556, MI: 1492, CSK: 1519, RR: 1618, KKR: 1489, DC: 1508 },
  { year: 2009, RCB: 1490, PBKS: 1541, MI: 1532, CSK: 1534, RR: 1538, KKR: 1425, DC: 1462 },
  { year: 2010, RCB: 1505, PBKS: 1440, MI: 1520, CSK: 1560, RR: 1490, KKR: 1460, DC: 1545 },
  { year: 2011, RCB: 1555, PBKS: 1480, MI: 1545, CSK: 1610, RR: 1478, KKR: 1485, DC: 1445 },
  { year: 2012, RCB: 1540, PBKS: 1490, MI: 1560, CSK: 1585, RR: 1455, KKR: 1595, DC: 1510 },
  { year: 2013, RCB: 1525, PBKS: 1505, MI: 1620, CSK: 1605, RR: 1540, KKR: 1500, DC: 1420, SRH: 1480 },
  { year: 2014, RCB: 1480, PBKS: 1595, MI: 1585, CSK: 1600, RR: 1515, KKR: 1628, DC: 1338, SRH: 1510 },
  { year: 2015, RCB: 1545, PBKS: 1460, MI: 1630, CSK: 1585, RR: 1530, KKR: 1585, DC: 1395, SRH: 1520 },
  { year: 2016, RCB: 1580, PBKS: 1415, MI: 1575, CSK: 1590, RR: null, KKR: 1550, DC: 1445, SRH: 1590 },
  { year: 2017, RCB: 1455, PBKS: 1470, MI: 1610, CSK: null, RR: null, KKR: 1540, DC: 1465, SRH: 1575 },
  { year: 2018, RCB: 1455, PBKS: 1465, MI: 1555, CSK: 1620, RR: 1520, KKR: 1568, DC: 1475, SRH: 1610 },
  { year: 2019, RCB: 1465, PBKS: 1460, MI: 1620, CSK: 1580, RR: 1500, KKR: 1518, DC: 1545, SRH: 1530 },
  { year: 2020, RCB: 1465, PBKS: 1470, MI: 1665, CSK: 1545, RR: 1505, KKR: 1525, DC: 1550, SRH: 1540 },
  { year: 2021, RCB: 1515, PBKS: 1455, MI: 1555, CSK: 1605, RR: 1465, KKR: 1545, DC: 1590, SRH: 1455 },
  { year: 2022, RCB: 1495, PBKS: 1450, MI: 1480, CSK: 1490, RR: 1555, KKR: 1545, DC: 1535, SRH: 1455, GT: 1550, LSG: 1540 },
  { year: 2023, RCB: 1485, PBKS: 1415, MI: 1510, CSK: 1580, RR: 1530, KKR: 1510, DC: 1455, SRH: 1415, GT: 1620, LSG: 1510 },
  { year: 2024, RCB: 1534, PBKS: 1456, MI: 1464, CSK: 1546, RR: 1534, KKR: 1606, DC: 1524, SRH: 1496, GT: 1539, LSG: 1538 },
  { year: 2025, RCB: 1610, PBKS: 1480, MI: 1450, CSK: 1500, RR: 1510, KKR: 1580, DC: 1530, SRH: 1530, GT: 1560, LSG: 1490 },
  { year: 2026, RCB: 1640, PBKS: 1521, MI: 1454, CSK: 1467, RR: 1518, KKR: 1517, DC: 1532, SRH: 1561, GT: 1580, LSG: 1447 }
];

const EloTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const sorted = [...payload].sort((a, b) => b.value - a.value);
    return (
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xl z-50 min-w-[140px]">
        <p className="text-slate-900 font-black text-lg mb-3 pb-2 border-b border-slate-100">{label}</p>
        <div className="space-y-2">
          {sorted.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-slate-600 font-bold text-xs tracking-wider">{entry.dataKey}</span>
              </div>
              <span className="text-slate-900 font-mono font-bold text-xs">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const getTeamLogoUrl = (teamName) => {
  if (!teamName) return "";
  const formatted = teamName.toLowerCase();
  if (formatted.includes('gujarat') || formatted.includes('gt')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/aTE8G7q-OcAobWvDd6sizQ_500x500.png";
  } else if (formatted.includes('bengaluru') || formatted.includes('rcb') || formatted.includes('royal')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/wJECOchH5L7xlrBSFEAW8Q_500x500.png";
  } else if (formatted.includes('chennai') || formatted.includes('csk')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/5G8eFjkPKNalIgL2FOtovg_500x500.png";
  } else if (formatted.includes('mumbai') || formatted.includes('mi')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/4S8S7zhK04uq4t_QwifP8g_500x500.png";
  } else if (formatted.includes('kolkata') || formatted.includes('kkr')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/bV4wF2dFs6IPc2BMtjgGZw_500x500.png";
  } else if (formatted.includes('delhi') || formatted.includes('dc')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/aep1X0G9rtXVpK7Gzt7pLA_500x500.png";
  } else if (formatted.includes('hyderabad') || formatted.includes('srh')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/W0OCBYc05c5MFMrctF62kg_500x500.png";
  } else if (formatted.includes('punjab') || formatted.includes('pbks')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/XUAb4iA3XozYbH_cXQCryQ_500x500.png";
  } else if (formatted.includes('rajasthan') || formatted.includes('rr')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/GqIU6xhQAnCpy_Cbr2LZRA_500x500.png";
  } else if (formatted.includes('lucknow') || formatted.includes('lsg')) {
    return "https://ssl.gstatic.com/onebox/media/sports/logos/optimized/OqrL0ztLy13FBpvuF6GCBQ_500x500.png";
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=random&color=fff&size=128`;
};

const SeasonAnalytics = () => {
  const [seasons, setSeasons] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSeasons(['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008']);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/api/v1/seasons/${selectedYear}/stats`)
      .then(res => {
        setSeasonData(res.data);
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching season stats:", err);
        setError("Could not load season statistics.");
      })
      .finally(() => setLoading(false));
  }, [selectedYear]);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-slate-900">Season Analytics</h1>
        
        <div className="relative inline-block w-44">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full appearance-none bg-slate-900 text-white font-bold py-2.5 px-4 pr-10 rounded-xl shadow-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {seasons.map((yr) => (
              <option key={yr} value={yr} className="bg-slate-900 text-white">
                {selectedYear === yr ? `✓ ${yr}` : yr}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-20 text-xl font-bold animate-pulse text-slate-700">Loading {selectedYear} Season Data...</div>
      ) : error ? (
        <div className="text-center mt-20 text-xl font-bold text-red-500">{error}</div>
      ) : seasonData ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-2xl shadow-lg flex items-center gap-5">
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm"><Trophy size={36} className="text-white" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-100">Champion ({selectedYear})</p>
                <p className="text-xl font-black mt-1">{seasonData.champion}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-2xl shadow-lg flex items-center gap-5">
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm"><Award size={36} className="text-white" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-100">Orange Cap (Runs)</p>
                <p className="text-lg font-black mt-1">
                  {seasonData.orange_cap?.player} {seasonData.orange_cap?.team && `(${seasonData.orange_cap.team})`}
                </p>
                <p className="text-xs font-bold text-orange-200">{seasonData.orange_cap?.runs} Runs</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-6 rounded-2xl shadow-lg flex items-center gap-5">
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm"><Target size={36} className="text-white" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-200">Purple Cap (Wickets)</p>
                <p className="text-lg font-black mt-1">
                  {seasonData.purple_cap?.player} {seasonData.purple_cap?.team && `(${seasonData.purple_cap.team})`}
                </p>
                <p className="text-xs font-bold text-purple-300">{seasonData.purple_cap?.wickets} Wickets</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
            <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
              <h2 className="text-lg font-black tracking-wide">{selectedYear} Points Table</h2>
              <span className="text-xs font-semibold text-slate-400">Official Standings</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                    <th className="py-3 px-6">Team</th>
                    <th className="py-3 px-4 text-center">M</th>
                    <th className="py-3 px-4 text-center">W</th>
                    <th className="py-3 px-4 text-center">L</th>
                    <th className="py-3 px-4 text-center">NRR</th>
                    <th className="py-3 px-6 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-800">
                  {seasonData.points_table && seasonData.points_table.length > 0 ? (
                    seasonData.points_table.map((row, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 flex items-center gap-3">
                          <span className="w-6 text-xs font-bold text-slate-400">{index + 1}</span>
                          <img 
                            src={getTeamLogoUrl(row.team)} 
                            alt={row.team} 
                            className="w-8 h-8 object-contain flex-shrink-0 drop-shadow-sm"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/32?text=IPL"; }}
                          />
                          <span className="font-extrabold text-slate-900">{row.team}</span>
                        </td>
                        <td className="py-4 px-4 text-center">{row.m}</td>
                        <td className="py-4 px-4 text-center">{row.w}</td>
                        <td className="py-4 px-4 text-center">{row.l}</td>
                        <td className="py-4 px-4 text-center font-mono text-xs">{row.nrr}</td>
                        <td className="py-4 px-6 text-center font-black text-blue-600 text-base">{row.pts}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-500 font-bold">No data available for this season.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-8">
            <h3 className="text-lg font-black text-slate-900 mb-6 text-center">Points Table (Visualized)</h3>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonData.points_table || []} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis type="category" dataKey="team" stroke="#64748b" width={140} tick={{ fontSize: 12, fontWeight: 700 }} />
                  <Tooltip />
                  <Bar dataKey="pts" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {selectedYear === '2026' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mt-8 relative overflow-hidden">
              <div className="flex justify-center items-center gap-2 text-xs text-slate-500 mb-6">
                <span className="border border-slate-200 rounded-full px-3 py-1 bg-slate-50 text-slate-700 font-bold flex items-center gap-1.5">
                  <Info size={14} className="text-blue-600" /> How ELO works
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {[
                  { rank: 1, team: "RCB", score: 1640, color: "#dc2626" },
                  { rank: 2, team: "GT", score: 1580, color: "#0ea5e9" },
                  { rank: 3, team: "SRH", score: 1561, color: "#f97316" },
                  { rank: 4, team: "DC", score: 1532, color: "#3b82f6" },
                  { rank: 5, team: "PBKS", score: 1521, color: "#ef4444" },
                  { rank: 6, team: "RR", score: 1518, color: "#f43f5e" },
                  { rank: 7, team: "KKR", score: 1517, color: "#a855f7" },
                  { rank: 8, team: "CSK", score: 1467, color: "#eab308" },
                  { rank: 9, team: "MI", score: 1454, color: "#2563eb" },
                  { rank: 10, team: "LSG", score: 1447, color: "#db2777" },
                ].map((item) => (
                  <div key={item.rank} className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold">
                    <span className="text-slate-400">{item.rank}</span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-900">{item.team}</span>
                    <span className="text-slate-500 font-mono">{item.score}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={22} /> POWER RATING
                </h3>
              </div>

              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ELO_DATA} margin={{ top: 20, right: 30, left: -10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" stroke="#64748b" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                    <YAxis domain={[1300, 1720]} stroke="#64748b" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} tickCount={9} />
                    <Tooltip content={<EloTooltip />} />
                    <Line type="monotone" connectNulls={false} dataKey="RCB" stroke="#dc2626" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="GT" stroke="#0ea5e9" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="SRH" stroke="#f97316" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="DC" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="PBKS" stroke="#ef4444" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="RR" stroke="#f43f5e" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="KKR" stroke="#a855f7" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="CSK" stroke="#eab308" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="MI" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" connectNulls={false} dataKey="LSG" stroke="#db2777" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SeasonAnalytics;