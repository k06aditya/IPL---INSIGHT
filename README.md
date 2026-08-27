# IPL---INSIGHT
A comprehensive, data-driven IPL analytics platform offering deep franchise statistics, historical archives, dynamic Net Run Rate (NRR) progression charts, and real-time match simulations.

---

## Key Features

- Franchise Intelligence Hub: Deep-dive individual team dashboards featuring historical win rates, trophy counts, all-time leading run-scorers and wicket-takers, home venue intelligence, and squad DNA breakdowns.
- Official Social Media and Website Directories: Quick-access hubs embedded across team views and global directories mapping official channels (Website, Twitter/X, Instagram, Facebook, and YouTube) for all active franchises.
- Interactive Live Match Simulation: Real-time ball-by-ball and over-by-over match simulator generating dynamic Worm charts (cumulative runs) and Manhattan charts (per-over runs and wickets) with custom playback controls.
- Mathematical NRR Engine: Deterministic match-by-match Net Run Rate progression graphs mapping team momentum across multiple tournament seasons using Recharts.
- Historical Archives and Highlights: Comprehensive chronological records dating back to the inaugural 2008 season.

---

## Tech Stack

- Frontend: React.js, Vite, React Router DOM
- Styling: Tailwind CSS
- Data Visualization: Recharts
- Icons: Lucide React

---

## Project Structure

```text
IPL_INSIGHT/
├── .gitignore                  
├── README.md                   
│
├── backend/                    
│   ├── package.json            
│   ├── package-lock.json
│   ├── server.js               
│   ├── controllers/            
│   ├── models/                 
│   └── routes/                 
│
└── frontend/                   
    ├── index.html
    ├── package.json            
    ├── package-lock.json
    ├── vite.config.js          
    ├── tailwind.config.js      
    ├── postcss.config.js       
    │
    ├── public/                 
    │   ├── vite.svg            
    │   └── logos/              
    │       ├── csk.png
    │       ├── dc.png
    │       ├── deccan.png
    │       ├── gl.png
    │       ├── gt.png
    │       ├── kkr.png
    │       ├── kochi.png
    │       ├── lsg.png
    │       ├── mi.png
    │       ├── pbks.png
    │       ├── pune.png
    │       ├── rcb.png
    │       ├── rps.png
    │       ├── rr.png
    │       └── srh.png
    │
    └── src/                    
        ├── main.jsx            
        ├── App.jsx             
        ├── index.css           
        │
        ├── components/         
        │   ├── Navbar.jsx      
        │   └── Footer.jsx      
        │
        └── pages/              
            ├── LiveMatch.jsx   
            ├── TeamDetail.jsx  
            └── Teams.jsx
