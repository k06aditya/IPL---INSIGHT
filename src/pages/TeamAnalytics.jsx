// frontend/src/pages/TeamAnalytics.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { teamService } from '../services/api';
import { ArrowLeft } from 'lucide-react';

const TeamAnalytics = () => {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await teamService.getTeamStats(id);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching team stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-semibold text-slate-600 animate-pulse">
          Calculating SQL Analytics...
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center mt-20 text-red-500 font-semibold">Team data not found.</div>;
  }

  const chartData = [
    { name: 'Wins', value: stats.wins, color: '#22c55e' },
    { name: 'Losses', value: stats.losses, color: '#ef4444' },
    { name: 'No Result', value: stats.no_results, color: '#94a3b8' }
  ];

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
        <ArrowLeft size={18} className="mr-1" /> Back to Franchises
      </Link>

      <h1 className="text-4xl font-black text-slate-800">{stats.team_name}</h1>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matches</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{stats.total_matches}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wins</p>
          <p className="text-3xl font-black text-green-500 mt-1">{stats.wins}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Losses</p>
          <p className="text-3xl font-black text-red-500 mt-1">{stats.losses}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Win %</p>
          <p className="text-3xl font-black text-blue-600 mt-1">{stats.win_percentage}%</p>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">Win/Loss Distribution</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;