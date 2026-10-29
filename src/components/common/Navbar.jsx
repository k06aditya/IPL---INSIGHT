// frontend/src/components/common/Navbar.jsx
import { Link } from 'react-router-dom';
import { Trophy, Home, BarChart2, Calendar, Award, Star, Swords, Shield, PlayCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 text-white shadow-lg border-b border-blue-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 text-2xl font-black tracking-wider">
          <Trophy className="text-yellow-400" size={28} />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            IPL INSIGHT
          </span>
        </Link>
        <div className="flex space-x-5 font-medium">
          <Link to="/" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <Home size={16} /><span>Teams</span>
          </Link>
          <Link to="/team-compare" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <Shield size={16} /><span>Vs Teams</span>
          </Link>
          <Link to="/players" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <BarChart2 size={16} /><span>Players</span>
          </Link>
          <Link to="/compare" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <Swords size={16} /><span>Vs Players</span>
          </Link>
          <Link to="/matches" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <Calendar size={16} /><span>Matches</span>
          </Link>
          <Link to="/live" className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition animate-pulse font-black">
            <PlayCircle size={16} /><span>Live Match</span>
          </Link>
          <Link to="/seasons" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <Award size={16} /><span>Seasons</span>
          </Link>
          <Link to="/records" className="flex items-center space-x-1 hover:text-yellow-400 transition">
            <Star size={16} /><span>Records</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;