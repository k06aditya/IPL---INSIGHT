// frontend/src/utils/teamLogos.js

export const getTeamLogo = (teamName) => {
  if (!teamName) return "/logos/ipl.png";
  
  const name = teamName.toLowerCase().trim();
  
  const logos = {
    "chennai super kings": "/logos/csk.png",
    "mumbai indians": "/logos/mi.png",
    "royal challengers bangalore": "/logos/rcb.png",
    "royal challengers bengaluru": "/logos/rcb.png",
    "kolkata knight riders": "/logos/kkr.png",
    "rajasthan royals": "/logos/rr.png",
    "sunrisers hyderabad": "/logos/srh.png",
    "delhi capitals": "/logos/dc.png",
    "delhi daredevils": "/logos/dc.png",
    "punjab kings": "/logos/pbks.png",
    "kings xi punjab": "/logos/pbks.png",
    "gujarat titans": "/logos/gt.png",
    "lucknow super giants": "/logos/lsg.png",
    "gujarat lions": "/logos/gl.png",
    "deccan chargers": "/logos/deccan.png",
    "kochi tuskers kerala": "/logos/kochi.png",
    "pune warriors": "/logos/pune.png",
    "rising pune supergiant": "/logos/rps.png",
    "rising pune supergiants": "/logos/rps.png"
  };

  return logos[name] || "/logos/ipl.png";
};

export const handleImageError = (e) => {
  e.target.onerror = null; 
  e.target.src = "/logos/ipl.png";
};

export const deduplicateTeams = (teamsList) => {
  if (!teamsList) return [];
  const hiddenTeams = new Set(["delhi daredevils", "kings xi punjab", "royal challengers bangalore", "rising pune supergiants"]);
  const seen = new Set();
  
  return teamsList.filter((team) => {
    const name = team.name ? team.name.trim() : '';
    const lowerName = name.toLowerCase();
    
    if (hiddenTeams.has(lowerName) || seen.has(lowerName)) return false;
    
    seen.add(lowerName);
    return true;
  });
};