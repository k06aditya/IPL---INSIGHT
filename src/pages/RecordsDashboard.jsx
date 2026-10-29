import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trophy, Shield, Users, Zap, Award } from 'lucide-react';

const RecordsDashboard = () => {
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/records/')
      .then(res => setRecords(res.data))
      .catch(err => {
        console.error("Error fetching records:", err);
        setError("Could not load records from backend.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl font-bold animate-pulse text-slate-700">Loading IPL Records...</div>;
  if (error) return <div className="text-center mt-20 text-xl font-bold text-red-500">{error}</div>;
  if (!records) return <div className="text-center mt-20 text-xl font-bold text-red-500">Records currently unavailable.</div>;

  return (
    <div className="space-y-12 pb-16 text-slate-900">
      
      {/* SECTION I: BATTING LEGENDS */}
      <div>
        <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase mb-6 flex items-center gap-2">
          <Trophy className="text-yellow-600"/> I. Batting Legends
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">Highest Individual Scores</h3>
            <div className="space-y-3">
              {records.batting_legends?.highest_individual_scores?.map((r, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                    <div>
                      <p className="font-bold text-slate-900">{r.player}</p>
                      <p className="text-xs text-slate-500">vs <span className="text-blue-600 font-semibold">{r.against}</span> • {r.year}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-blue-600 text-lg">{r.score}</p>
                    <p className="text-xs text-slate-500">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">Most Career Runs</h3>
            <div className="space-y-3">
              {records.batting_legends?.most_career_runs?.map((r, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                    <div>
                      <p className="font-bold text-slate-900">{r.player}</p>
                      <p className="text-xs text-slate-500">{r.matches} mat</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-blue-600 text-lg">{r.stat}</p>
                    <p className="text-xs text-slate-500">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SECTION II: BOWLING GREATS */}
      <div>
        <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase mb-6 flex items-center gap-2">
          <Shield className="text-blue-600"/> II. Bowling Greats
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">Best Bowling Figures</h3>
            <div className="space-y-3">
              {records.bowling_greats?.best_bowling_figures?.map((r, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                    <div>
                      <p className="font-bold text-slate-900">{r.player}</p>
                      <p className="text-xs text-slate-500">vs <span className="text-pink-600 font-semibold">{r.against}</span> • {r.year}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-600 text-lg">{r.figures}</p>
                    <p className="text-xs text-slate-500">{r.econ}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">Most Career Wickets</h3>
            <div className="space-y-3">
              {records.bowling_greats?.most_career_wickets?.map((r, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                    <div>
                      <p className="font-bold text-slate-900">{r.player}</p>
                      <p className="text-xs text-slate-500">{r.matches} mat</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-600 text-lg">{r.stat}</p>
                    <p className="text-xs text-slate-500">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SECTION III: TEAM RECORDS */}
      <div>
        <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase mb-6 flex items-center gap-2">
          <Users className="text-orange-600"/> III. Team Records
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">Highest Team Totals</h3>
            <div className="space-y-3">
              {records.team_records?.highest_team_totals?.map((r, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                    <div>
                      <p className="font-bold text-slate-900">{r.team}</p>
                      <p className="text-xs text-slate-500">vs {r.against} • {r.year}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-blue-600 text-lg">{r.score}</p>
                    <p className="text-xs text-slate-500">{r.overs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">Lowest Team Totals</h3>
            <div className="space-y-3">
              {records.team_records?.lowest_team_totals?.map((r, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                    <div>
                      <p className="font-bold text-slate-900">{r.team}</p>
                      <p className="text-xs text-slate-500">vs {r.against} • {r.year}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-red-600 text-lg">{r.score}</p>
                    <p className="text-xs text-slate-500">{r.overs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SECTION IV: CHASE MASTERS & POWER HITTERS */}
      <div>
        <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase mb-6 flex items-center gap-2">
          <Zap className="text-yellow-600"/> IV. Chase Masters & Power Hitters
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">Highest Successful Chases</h3>
            <div className="space-y-3">
              {records.chase_masters?.highest_successful_chases?.map((r, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                    <div>
                      <p className="font-bold text-slate-900">{r.team} <span className="text-xs text-slate-500 font-normal">vs {r.against} • {r.year}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-blue-600 text-lg">{r.score}</p>
                    <p className="text-xs text-slate-500">{r.chasing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-2">Most Career Sixes</h3>
            <div className="space-y-3">
              {records.chase_masters?.most_career_sixes?.map((r, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                    <div>
                      <p className="font-bold text-slate-900">{r.player}</p>
                      <p className="text-xs text-slate-500">{r.matches} mat</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-blue-600 text-lg">{r.stat} <span className="text-xs font-normal text-slate-500">sixes</span></p>
                    <p className="text-xs text-slate-500">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SECTION V: HIGHEST PARTNERSHIPS */}
      <div>
        <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase mb-6 flex items-center gap-2">
          <Award className="text-purple-600"/> V. Highest Partnerships
        </h2>
        <div className="bg-slate-200 text-slate-900 p-6 rounded-xl border border-slate-300 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {records.highest_partnerships?.map((r, i) => (
              <div key={i} className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-slate-400 font-bold w-5">{r.rank}</span>
                  <div>
                    <p className="font-bold text-slate-900">{r.partnership}</p>
                    <p className="text-xs text-slate-500">{r.wicket} • {r.year}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-blue-600 text-lg">{r.runs}</p>
                  <p className="text-xs text-slate-500">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default RecordsDashboard;