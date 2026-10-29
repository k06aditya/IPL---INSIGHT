// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomeDashboard from './pages/HomeDashboard';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import TeamCompare from './pages/TeamCompare'; 
import PlayersList from './pages/PlayersList';
import PlayerAnalytics from './pages/PlayerAnalytics';
import PlayerCompare from './pages/PlayerCompare'; 
import LiveMatch from './pages/LiveMatch';
import MatchList from './pages/MatchList';
import MatchAnalytics from './pages/MatchAnalytics';
import SeasonAnalytics from './pages/SeasonAnalytics';
import RecordsDashboard from './pages/RecordsDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/team/:id" element={<TeamDetail />} />
            <Route path="/team-compare" element={<TeamCompare />} /> 
            <Route path="/players" element={<PlayersList />} />
            <Route path="/player/:id" element={<PlayerAnalytics />} />
            <Route path="/compare" element={<PlayerCompare />} /> 
            <Route path="/live" element={<LiveMatch />} />
            <Route path="/matches" element={<MatchList />} />
            <Route path="/match/:id" element={<MatchAnalytics />} />
            <Route path="/seasons" element={<SeasonAnalytics />} />
            <Route path="/records" element={<RecordsDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;