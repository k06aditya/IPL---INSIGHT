// frontend/src/pages/TeamDetail.jsx
import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, User, Trophy, ShieldAlert, ShieldCheck, Swords, Activity, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

const TEAM_PROFILES = {
  "Chennai Super Kings": {
    logo: "/logos/csk.png",
    description: 'Chennai Super Kings, fondly known as the "Yellow Army," are one of the most beloved and successful franchises in IPL history with five titles — tied with Mumbai Indians for the most. Founded in 2008 under the iconic leadership of MS Dhoni, CSK have defined consistency in franchise cricket with an unprecedented record of qualifying for the playoffs in every season they have participated (excluding the two-year ban from 2016-17). Their first title came in 2010 at DY Patil Stadium, and they successfully defended it in 2011, becoming the first team to win back-to-back IPL titles. After the two-year suspension, CSK returned in 2018 and won the title immediately, proving that the franchise\'s culture of excellence transcends any setback. The 2021 title in the UAE and the 2023 title in Ahmedabad further cemented CSK\'s legacy. Under coach Stephen Fleming, CSK have maintained a unique philosophy — trust experienced players, back them through lean patches, and win with calm, calculated cricket rather than explosive fireworks.',
    winRate: "58.4%",
    titles: "5×",
    trophies: "🏆🏆🏆🏆🏆 5 Titles",
    captain: "Ruturaj Gaikwad",
    coach: "Stephen Fleming",
    strengths: ["Dhoni finishing masterclass", "Samson-Gaikwad explosive top order", "Noor Ahmad wrist spin", "Unmatched IPL experience"],
    weaknesses: ["Ageing squad", "Lost Jadeja to RR", "Struggles on fast bouncy pitches"],
    squad: [
      { role: "BAT", name: "Ruturaj Gaikwad", stats: "2,280R", dna: "87" },
      { role: "WK", name: "MS Dhoni", stats: "5,200R", dna: "95" },
      { role: "WK", name: "Sanju Samson", stats: "4,100R", dna: "86" },
      { role: "AR", name: "Shivam Dube", stats: "1,650R", dna: "81" }
    ],
    titleWins: [
      { season: "2010", match: "def MI • 168/5 def 165/8 (22 runs)", pot: "Sachin Tendulkar" },
      { season: "2011", match: "def RCB • 205/5 def 147/8 (58 runs)", pot: "Chris Gayle" },
      { season: "2018", match: "def SRH • 181/1 def 178/6 (8 wkts)", pot: "Suresh Raina" },
      { season: "2021", match: "def KKR • 192/3 def 165/9 (27 runs)", pot: "Harshal Patel" },
      { season: "2023", match: "def GT • 214/4 def 171/4 (15 runs)", pot: "Devon Conway" }
    ],
    milestones: [{ year: "2010", text: "First IPL title under MS Dhoni" }, { year: "2011", text: "Back-to-back titles" }],
    topRunScorers: [
      { player: "MS Dhoni", runs: "4,865", sr: "139.1", hs: "84", mat: "244", pct: "100" },
      { player: "Suresh Raina", runs: "4,687", sr: "136.9", hs: "100", mat: "176", pct: "95" },
      { player: "Ruturaj Gaikwad", runs: "2,839", sr: "135.6", hs: "108", mat: "68", pct: "60" },
      { player: "Faf du Plessis", runs: "2,721", sr: "131.4", hs: "96", mat: "92", pct: "58" },
      { player: "Ravindra Jadeja", runs: "2,198", sr: "136.1", hs: "77", mat: "185", pct: "46" }
    ],
    topWicketTakers: [
      { player: "Ravindra Jadeja", wkts: "141", econ: "7.64", mat: "185", pct: "100" },
      { player: "Dwayne Bravo", wkts: "140", econ: "8.37", mat: "116", pct: "98" },
      { player: "R Ashwin", wkts: "90", econ: "6.46", mat: "97", pct: "68" },
      { player: "Albie Morkel", wkts: "76", econ: "8.10", mat: "78", pct: "53" },
      { player: "Deepak Chahar", wkts: "76", econ: "7.91", mat: "76", pct: "53" }
    ],
    venueInfo: { 
      name: "MA Chidambaram Stadium (Chepauk)", 
      avgInn: "165", 
      pitchType: "Bowling-friendly (Turning)", 
      paceSpin: "Spin Dominant", 
      dew: "No", 
      capacity: "50,000", 
      notes: "Pitch is slow, dry, and turns sharply from ball one. Spinners dominate with average spin economy of 7.2 RPO." 
    },
    headToHead: [
      { opponent: "Mumbai Indians", played: 38, won: 17, lost: 21, winRate: "44.7%" },
      { opponent: "Royal Challengers Bengaluru", played: 36, won: 22, lost: 14, winRate: "61.1%" },
      { opponent: "Kolkata Knight Riders", played: 30, won: 19, lost: 11, winRate: "63.3%" },
      { opponent: "Delhi Capitals", played: 30, won: 19, lost: 11, winRate: "63.3%" },
      { opponent: "Rajasthan Royals", played: 29, won: 16, lost: 13, winRate: "55.2%" },
      { opponent: "Punjab Kings", played: 29, won: 18, lost: 11, winRate: "62.1%" },
      { opponent: "Sunrisers Hyderabad", played: 21, won: 15, lost: 6, winRate: "71.4%" },
      { opponent: "Gujarat Titans", played: 8, won: 5, lost: 3, winRate: "62.5%" },
      { opponent: "Lucknow Super Giants", played: 6, won: 3, lost: 3, winRate: "50.0%" },
      { opponent: "Deccan Chargers", played: 10, won: 7, lost: 3, winRate: "70.0%" },
      { opponent: "Pune Warriors India", played: 6, won: 5, lost: 1, winRate: "83.3%" },
      { opponent: "Kochi Tuskers Kerala", played: 2, won: 1, lost: 1, winRate: "50.0%" }
    ],
    rivalries: "Rivalry with Mumbai Indians.",
    faqs: [
      { q: "How many IPL titles have CSK won?", a: "CSK have won 5 IPL titles (2010, 2011, 2018, 2021, 2023)." },
      { q: "Who is the captain of CSK?", a: "Ruturaj Gaikwad captains the side, succeeding MS Dhoni." },
      { q: "What is CSK's home ground advantage?", a: "MA Chidambaram Stadium (Chepauk) provides turning tracks tailored for spin dominance." }
    ],
    history: [
      { season: "2008", captain: "MS Dhoni", matches: 16, wins: 11, losses: 5 },
      { season: "2009", captain: "MS Dhoni", matches: 14, wins: 8, losses: 6 },
      { season: "2010", captain: "MS Dhoni", matches: 16, wins: 9, losses: 7 },
      { season: "2011", captain: "MS Dhoni", matches: 16, wins: 11, losses: 5 },
      { season: "2012", captain: "MS Dhoni", matches: 19, wins: 10, losses: 9 },
      { season: "2013", captain: "MS Dhoni", matches: 18, wins: 12, losses: 6 },
      { season: "2014", captain: "MS Dhoni", matches: 16, wins: 10, losses: 6 },
      { season: "2015", captain: "MS Dhoni", matches: 17, wins: 10, losses: 7 },
      { season: "2016", captain: "Suspended", matches: 0, wins: 0, losses: 0 },
      { season: "2017", captain: "Suspended", matches: 0, wins: 0, losses: 0 },
      { season: "2018", captain: "MS Dhoni", matches: 16, wins: 11, losses: 5 },
      { season: "2019", captain: "MS Dhoni", matches: 17, wins: 10, losses: 7 },
      { season: "2020", captain: "MS Dhoni", matches: 14, wins: 6, losses: 8 },
      { season: "2021", captain: "MS Dhoni", matches: 16, wins: 11, losses: 5 },
      { season: "2022", captain: "MS Dhoni / Jadeja", matches: 14, wins: 4, losses: 10 },
      { season: "2023", captain: "MS Dhoni", matches: 16, wins: 10, losses: 5 },
      { season: "2024", captain: "Ruturaj Gaikwad", matches: 14, wins: 7, losses: 7 },
      { season: "2025", captain: "Ruturaj Gaikwad", matches: 14, wins: 8, losses: 6 },
      { season: "2026", captain: "Ruturaj Gaikwad", matches: 14, wins: 9, losses: 5 }
    ]
  },
  "Mumbai Indians": {
    logo: "/logos/mi.png",
    description: "Mumbai Indians, owned by Reliance Industries, are the most successful franchise in IPL history with five titles. Known for their world-class pace attack led by Jasprit Bumrah and explosive batting, MI have set the gold standard for IPL franchises.",
    winRate: "59.8%",
    titles: "5×",
    trophies: "🏆🏆🏆🏆🏆 5 Titles",
    captain: "Hardik Pandya",
    coach: "Mahela Jayawardene",
    strengths: ["Jasprit Bumrah death-over dominance", "Explosive top order"],
    weaknesses: ["Middle-order inconsistency"],
    squad: [{ role: "BAT", name: "Rohit Sharma", stats: "6,400R", dna: "96" }],
    titleWins: [
      { season: "2013", match: "def CSK • 148/9 def 125/9 (23 runs)", pot: "Shane Watson" },
      { season: "2015", match: "def CSK • 202/5 def 161/8 (41 runs)", pot: "Andre Russell" },
      { season: "2017", match: "def RPS • 129/8 def 128/6 (1 run)", pot: "Ben Stokes" },
      { season: "2019", match: "def CSK • 149/8 def 148/7 (1 run)", pot: "Andre Russell" },
      { season: "2020", match: "def DC • 157/5 def 156/7 (5 wkts)", pot: "Jofra Archer" }
    ],
    milestones: [
      { year: "2013", text: "First IPL title under Rohit Sharma, defeating CSK at Eden Gardens by 23 runs" },
      { year: "2015", text: "Second title, beating CSK by 41 runs at Eden Gardens" },
      { year: "2017", text: "Third title in a thrilling 1-run win over Rising Pune Supergiant" },
      { year: "2019", text: "Fourth title in another 1-run final victory against CSK" },
      { year: "2020", text: "Fifth title in UAE bubble, beating DC by 5 wickets" }
    ],
    topRunScorers: [
      { player: "Rohit Sharma", runs: "6,400", sr: "131.8", hs: "109", mat: "208", pct: "100" },
      { player: "Kieron Pollard", runs: "3,412", sr: "147.3", hs: "87", mat: "189", pct: "53" },
      { player: "Suryakumar Yadav", runs: "3,250", sr: "143.2", hs: "103", mat: "110", pct: "50" },
      { player: "Ishan Kishan", runs: "2,640", sr: "135.1", hs: "99", mat: "105", pct: "41" },
      { player: "Ambati Rayudu", runs: "2,416", sr: "126.1", hs: "81", mat: "114", pct: "38" }
    ],
    topWicketTakers: [
      { player: "Jasprit Bumrah", wkts: "165", econ: "7.40", mat: "146", pct: "100" },
      { player: "Lasith Malinga", wkts: "170", econ: "7.14", mat: "122", pct: "100" },
      { player: "Harbhajan Singh", wkts: "127", econ: "7.05", mat: "136", pct: "74" },
      { player: "Mitchell McClenaghan", wkts: "71", econ: "8.49", mat: "56", pct: "41" },
      { player: "Krunal Pandya", wkts: "61", econ: "7.55", mat: "84", pct: "35" }
    ],
    venueInfo: { 
      name: "Wankhede Stadium", 
      avgInn: "178", 
      pitchType: "Batting Paradise", 
      paceSpin: "Pace Dominant", 
      dew: "Yes", 
      capacity: "33,108", 
      notes: "Flat pitch with good pace and bounce, short square boundaries, and significant dew factor." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 38, won: 21, lost: 17, winRate: "55.3%" },
      { opponent: "Kolkata Knight Riders", played: 32, won: 23, lost: 9, winRate: "71.9%" },
      { opponent: "Royal Challengers Bengaluru", played: 32, won: 19, lost: 13, winRate: "59.4%" },
      { opponent: "Delhi Capitals", played: 34, won: 19, lost: 15, winRate: "55.9%" },
      { opponent: "Rajasthan Royals", played: 30, won: 15, lost: 15, winRate: "50.0%" },
      { opponent: "Punjab Kings", played: 32, won: 16, lost: 16, winRate: "50.0%" },
      { opponent: "Sunrisers Hyderabad", played: 23, won: 13, lost: 10, winRate: "56.5%" },
      { opponent: "Gujarat Titans", played: 6, won: 2, lost: 4, winRate: "33.3%" },
      { opponent: "Lucknow Super Giants", played: 6, won: 2, lost: 4, winRate: "33.3%" },
      { opponent: "Deccan Chargers", played: 10, won: 6, lost: 4, winRate: "60.0%" },
      { opponent: "Pune Warriors India", played: 6, won: 5, lost: 1, winRate: "83.3%" },
      { opponent: "Rising Pune Supergiant", played: 6, won: 2, lost: 4, winRate: "33.3%" },
      { opponent: "Gujarat Lions", played: 2, won: 1, lost: 1, winRate: "50.0%" },
      { opponent: "Kochi Tuskers Kerala", played: 2, won: 1, lost: 1, winRate: "50.0%" }
    ],
    rivalries: "Rivalry with CSK.",
    faqs: [
      { q: "How many IPL titles have Mumbai Indians won?", a: "MI have won 5 IPL titles (2013, 2015, 2017, 2019, 2020)." },
      { q: "Who is the captain of MI?", a: "Hardik Pandya leads Mumbai Indians as captain." }
    ],
    history: [
      { season: "2008", captain: "Sachin Tendulkar", matches: 14, wins: 7, losses: 7 },
      { season: "2009", captain: "Sachin Tendulkar", matches: 14, wins: 5, losses: 9 },
      { season: "2010", captain: "Sachin Tendulkar", matches: 16, wins: 11, losses: 5 },
      { season: "2011", captain: "Sachin Tendulkar", matches: 16, wins: 10, losses: 6 },
      { season: "2012", captain: "Harbhajan Singh", matches: 17, wins: 10, losses: 7 },
      { season: "2013", captain: "Rohit Sharma", matches: 19, wins: 13, losses: 6 },
      { season: "2014", captain: "Rohit Sharma", matches: 15, wins: 7, losses: 8 },
      { season: "2015", captain: "Rohit Sharma", matches: 16, wins: 10, losses: 6 },
      { season: "2016", captain: "Rohit Sharma", matches: 14, wins: 7, losses: 7 },
      { season: "2017", captain: "Rohit Sharma", matches: 17, wins: 12, losses: 5 },
      { season: "2018", captain: "Rohit Sharma", matches: 14, wins: 6, losses: 8 },
      { season: "2019", captain: "Rohit Sharma", matches: 16, wins: 11, losses: 5 },
      { season: "2020", captain: "Rohit Sharma", matches: 16, wins: 11, losses: 5 },
      { season: "2021", captain: "Rohit Sharma", matches: 14, wins: 7, losses: 7 },
      { season: "2022", captain: "Rohit Sharma", matches: 14, wins: 4, losses: 10 },
      { season: "2023", captain: "Rohit Sharma", matches: 16, wins: 9, losses: 7 },
      { season: "2024", captain: "Hardik Pandya", matches: 14, wins: 4, losses: 10 },
      { season: "2025", captain: "Hardik Pandya", matches: 14, wins: 8, losses: 6 },
      { season: "2026", captain: "Hardik Pandya", matches: 14, wins: 9, losses: 5 }
    ]
  },
  "Royal Challengers Bengaluru": {
    logo: "/logos/rcb.png",
    description: "Royal Challengers Bengaluru, famously recognized by their passionate 'Play Bold' fan base and red-and-gold colors, have etched their name as a resilient powerhouse in IPL history. After capturing their breakthrough championship in 2025 and defending it in dramatic fashion to become back-to-back champions in 2026 under Rajat Patidar, RCB blend the legendary legacy of Virat Kohli's record-breaking run machine with a revitalized, fierce bowling attack capable of defending any total at the M. Chinnaswamy Stadium.",
    winRate: "50.87%",
    titles: "2×",
    trophies: "🏆🏆 2 Titles",
    captain: "Rajat Patidar",
    coach: "Andy Flower",
    strengths: ["Virat Kohli consistency", "Josh Hazlewood death bowling"],
    weaknesses: ["Away form on spinning tracks"],
    squad: [{ role: "BAT", name: "Virat Kohli", stats: "8,100R", dna: "97" }],
    titleWins: [
      { season: "2025", match: "def PBKS • 192/4 def 186/7 (6 runs)", pot: "Virat Kohli" },
      { season: "2026", match: "def MI • 204/3 def 195/6 (9 runs)", pot: "Phil Salt" }
    ],
    milestones: [
      { year: "2025", text: "FIRST IPL TITLE — RCB defeat PBKS by 6 runs in Ahmedabad" },
      { year: "2026", text: "SECOND TITLE — RCB secure back-to-back championships under Rajat Patidar" }
    ],
    topRunScorers: [
      { player: "Virat Kohli", runs: "8,100", sr: "131.6", hs: "113", mat: "252", pct: "100" },
      { player: "AB de Villiers", runs: "4,491", sr: "151.9", hs: "133", mat: "156", pct: "55" },
      { player: "Chris Gayle", runs: "3,163", sr: "152.7", hs: "175", mat: "85", pct: "39" },
      { player: "Faf du Plessis", runs: "2,414", sr: "137.5", hs: "96", mat: "65", pct: "30" },
      { player: "Glenn Maxwell", runs: "1,800", sr: "158.2", hs: "78", mat: "60", pct: "22" }
    ],
    topWicketTakers: [
      { player: "Yuzvendra Chahal", wkts: "139", econ: "7.58", mat: "113", pct: "100" },
      { player: "Harshal Patel", wkts: "85", econ: "8.58", mat: "80", pct: "61" },
      { player: "Mohammed Siraj", wkts: "83", econ: "8.67", mat: "85", pct: "60" },
      { player: "Vinay Kumar", wkts: "72", econ: "8.35", mat: "64", pct: "52" },
      { player: "Anil Kumble", wkts: "45", econ: "6.57", mat: "42", pct: "32" }
    ],
    venueInfo: { 
      name: "M Chinnaswamy Stadium", 
      avgInn: "188", 
      pitchType: "Batting Paradise", 
      paceSpin: "Balanced", 
      dew: "Yes", 
      capacity: "35,000", 
      notes: "Highest-scoring venue in IPL history with short boundaries and altitude aiding ball travel." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 36, won: 14, lost: 22, winRate: "38.9%" },
      { opponent: "Mumbai Indians", played: 32, won: 13, lost: 19, winRate: "40.6%" },
      { opponent: "Kolkata Knight Riders", played: 32, won: 15, lost: 17, winRate: "46.9%" },
      { opponent: "Delhi Capitals", played: 31, won: 19, lost: 12, winRate: "61.3%" },
      { opponent: "Rajasthan Royals", played: 30, won: 15, lost: 15, winRate: "50.0%" },
      { opponent: "Punjab Kings", played: 32, won: 17, lost: 15, winRate: "53.1%" },
      { opponent: "Sunrisers Hyderabad", played: 24, won: 11, lost: 13, winRate: "45.8%" },
      { opponent: "Gujarat Titans", played: 6, won: 4, lost: 2, winRate: "66.7%" },
      { opponent: "Lucknow Super Giants", played: 8, won: 5, lost: 3, winRate: "62.5%" },
      { opponent: "Deccan Chargers", played: 11, won: 5, lost: 6, winRate: "45.5%" },
      { opponent: "Gujarat Lions", played: 5, won: 2, lost: 3, winRate: "40.0%" },
      { opponent: "Pune Warriors India", played: 6, won: 4, lost: 2, winRate: "66.7%" },
      { opponent: "Rising Pune Supergiant", played: 4, won: 2, lost: 2, winRate: "50.0%" },
      { opponent: "Kochi Tuskers Kerala", played: 2, won: 1, lost: 1, winRate: "50.0%" }
    ],
    rivalries: "Rivalry with CSK.",
    faqs: [
      { q: "Have RCB won an IPL title?", a: "Yes, RCB have won 2 IPL titles, capturing back-to-back championships in 2025 and 2026." },
      { q: "Who is the captain of RCB?", a: "Rajat Patidar leads the defending champions as captain." }
    ],
    history: [
      { season: "2008", captain: "Rahul Dravid", matches: 14, wins: 4, losses: 10 },
      { season: "2009", captain: "Anil Kumble", matches: 16, wins: 9, losses: 7 },
      { season: "2010", captain: "Anil Kumble", matches: 16, wins: 10, losses: 6 },
      { season: "2011", captain: "Virat Kohli", matches: 16, wins: 10, losses: 6 },
      { season: "2012", captain: "Virat Kohli", matches: 16, wins: 8, losses: 7 },
      { season: "2013", captain: "Virat Kohli", matches: 16, wins: 9, losses: 7 },
      { season: "2014", captain: "Virat Kohli", matches: 14, wins: 5, losses: 8 },
      { season: "2015", captain: "Virat Kohli", matches: 16, wins: 8, losses: 6 },
      { season: "2016", captain: "Virat Kohli", matches: 16, wins: 9, losses: 7 },
      { season: "2017", captain: "Virat Kohli", matches: 14, wins: 3, losses: 10 },
      { season: "2018", captain: "Virat Kohli", matches: 14, wins: 6, losses: 8 },
      { season: "2019", captain: "Virat Kohli", matches: 14, wins: 5, losses: 8 },
      { season: "2020", captain: "Virat Kohli", matches: 15, wins: 7, losses: 8 },
      { season: "2021", captain: "Virat Kohli", matches: 15, wins: 9, losses: 6 },
      { season: "2022", captain: "Faf du Plessis", matches: 16, wins: 9, losses: 7 },
      { season: "2023", captain: "Faf du Plessis", matches: 14, wins: 7, losses: 7 },
      { season: "2024", captain: "Faf du Plessis", matches: 15, wins: 8, losses: 7 },
      { season: "2025", captain: "Virat Kohli", matches: 16, wins: 10, losses: 6 },
      { season: "2026", captain: "Rajat Patidar", matches: 16, wins: 11, losses: 5 }
    ]
  },
  "Kolkata Knight Riders": {
    logo: "/logos/kkr.png",
    description: "Kolkata Knight Riders, universally celebrated as the three-time champions under the vibrant banner of 'Korbo Lorbo Jeetbo Re', represent an inspiring mix of grit, tactical brilliance, and superstar flair. Co-owned by Bollywood icon Shah Rukh Khan, KKR have claimed titles in 2012, 2014, and 2024 by relying on an electrifying brand of fearless cricket, anchored by world-class mystery spin from Sunil Narine and Varun Chakravarthy alongside clutch match-winning finishers.",
    winRate: "51.1%",
    titles: "3×",
    trophies: "🏆🏆🏆 3 Titles",
    captain: "Ajinkya Rahane",
    coach: "Chandrakant Pandit",
    strengths: ["Sunil Narine & Varun Chakravarthy mystery spin", "Rinku Singh elite finishing"],
    weaknesses: ["Top-order batting consistency"],
    squad: [{ role: "AR", name: "Sunil Narine", stats: "1,600R", dna: "93" }],
    titleWins: [
      { season: "2012", match: "def CSK • 190/4 def 182/6 (5 wkts)", pot: "Sunil Narine" },
      { season: "2014", match: "def PBKS • 200/7 def 199/4 (3 wkts)", pot: "Manish Pandey" },
      { season: "2024", match: "def SRH • 113/4 def 113/10 (8 wkts)", pot: "Sunil Narine" }
    ],
    milestones: [
      { year: "2012", text: "First IPL title under Gautam Gambhir" },
      { year: "2014", text: "Second title, beating PBKS in dramatic final" },
      { year: "2024", text: "Third title win, defeating SRH in Chennai" }
    ],
    topRunScorers: [
      { player: "Gautam Gambhir", runs: "3,345", sr: "124.2", hs: "93", mat: "122", pct: "100" },
      { player: "Robin Uthappa", runs: "2,649", sr: "131.5", hs: "87", mat: "115", pct: "79" },
      { player: "Andre Russell", runs: "2,482", sr: "174.5", hs: "88", mat: "112", pct: "74" },
      { player: "Nitish Rana", runs: "2,200", sr: "135.6", hs: "87", mat: "89", pct: "65" },
      { player: "Sunil Narine", runs: "1,550", sr: "162.0", hs: "109", mat: "178", pct: "46" }
    ],
    topWicketTakers: [
      { player: "Sunil Narine", wkts: "163", econ: "6.65", mat: "178", pct: "100" },
      { player: "Andre Russell", wkts: "102", econ: "9.12", mat: "112", pct: "62" },
      { player: "Varun Chakravarthy", wkts: "85", econ: "7.35", mat: "71", pct: "52" },
      { player: "Piyush Chawla", wkts: "66", econ: "8.15", mat: "70", pct: "40" },
      { player: "Umesh Yadav", wkts: "55", econ: "8.52", mat: "68", pct: "33" }
    ],
    venueInfo: { 
      name: "Eden Gardens", 
      avgInn: "172", 
      pitchType: "Bowling-friendly (Spin)", 
      paceSpin: "Spin Dominant", 
      dew: "Yes", 
      capacity: "68,000", 
      notes: "Largest cricket stadium in India. Pitch slows down for spinners from over 6 onwards." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 30, won: 11, lost: 19, winRate: "36.7%" },
      { opponent: "Mumbai Indians", played: 32, won: 9, lost: 23, winRate: "28.1%" },
      { opponent: "Royal Challengers Bengaluru", played: 32, won: 17, lost: 15, winRate: "53.1%" },
      { opponent: "Delhi Capitals", played: 32, won: 17, lost: 15, winRate: "53.1%" },
      { opponent: "Rajasthan Royals", played: 29, won: 14, lost: 14, winRate: "48.3%" },
      { opponent: "Punjab Kings", played: 32, won: 21, lost: 11, winRate: "65.6%" },
      { opponent: "Sunrisers Hyderabad", played: 26, won: 17, lost: 9, winRate: "65.4%" },
      { opponent: "Gujarat Titans", played: 5, won: 2, lost: 3, winRate: "40.0%" },
      { opponent: "Lucknow Super Giants", played: 5, won: 2, lost: 3, winRate: "40.0%" },
      { opponent: "Deccan Chargers", played: 10, won: 6, lost: 4, winRate: "60.0%" },
      { opponent: "Pune Warriors India", played: 6, won: 5, lost: 1, winRate: "83.3%" },
      { opponent: "Gujarat Lions", played: 4, won: 2, lost: 2, winRate: "50.0%" },
      { opponent: "Rising Pune Supergiant", played: 4, won: 2, lost: 2, winRate: "50.0%" }
    ],
    rivalries: "Intense rivalries with Mumbai Indians and RCB.",
    faqs: [
      { q: "How many IPL titles have KKR won?", a: "KKR have won 3 IPL titles (2012, 2014, and 2024)." },
      { q: "Who is the captain of KKR?", a: "Ajinkya Rahane leads KKR as captain." }
    ],
    history: [
      { season: "2008", captain: "Sourav Ganguly", matches: 13, wins: 6, losses: 7 },
      { season: "2009", captain: "Brendon McCullum", matches: 14, wins: 3, losses: 10 },
      { season: "2010", captain: "Sourav Ganguly", matches: 14, wins: 7, losses: 7 },
      { season: "2011", captain: "Gautam Gambhir", matches: 15, wins: 8, losses: 7 },
      { season: "2012", captain: "Gautam Gambhir", matches: 18, wins: 12, losses: 5 },
      { season: "2013", captain: "Gautam Gambhir", matches: 16, wins: 6, losses: 10 },
      { season: "2014", captain: "Gautam Gambhir", matches: 16, wins: 11, losses: 5 },
      { season: "2015", captain: "Gautam Gambhir", matches: 13, wins: 7, losses: 5 },
      { season: "2016", captain: "Gautam Gambhir", matches: 15, wins: 8, losses: 7 },
      { season: "2017", captain: "Gautam Gambhir", matches: 16, wins: 9, losses: 7 },
      { season: "2018", captain: "Dinesh Karthik", matches: 16, wins: 9, losses: 7 },
      { season: "2019", captain: "Dinesh Karthik", matches: 14, wins: 6, losses: 8 },
      { season: "2020", captain: "Eoin Morgan", matches: 14, wins: 7, losses: 7 },
      { season: "2021", captain: "Eoin Morgan", matches: 17, wins: 9, losses: 8 },
      { season: "2022", captain: "Shreyas Iyer", matches: 14, wins: 6, losses: 8 },
      { season: "2023", captain: "Nitish Rana", matches: 14, wins: 6, losses: 8 },
      { season: "2024", captain: "Shreyas Iyer", matches: 14, wins: 10, losses: 3 },
      { season: "2025", captain: "Ajinkya Rahane", matches: 14, wins: 8, losses: 6 },
      { season: "2026", captain: "Ajinkya Rahane", matches: 14, wins: 7, losses: 7 }
    ]
  },
  "Delhi Capitals": {
    logo: "/logos/dc.png",
    description: "Delhi Capitals represent the dynamic heartbeat of India's capital city, combining fiery youth with seasoned international stars. Under the leadership of Axar Patel and the tactical guidance of the coaching staff, DC leverage the spin-friendly conditions of the Arun Jaitley Stadium alongside explosive batters like KL Rahul to consistently challenge tournament powerhouses.",
    winRate: "48.3%",
    titles: "—",
    trophies: "Contender",
    captain: "Axar Patel",
    coach: "Hemang Badani",
    strengths: ["Axar-Kuldeep spin duo"],
    weaknesses: ["Inconsistent lower order"],
    squad: [{ role: "BAT", name: "KL Rahul", stats: "4,683R", dna: "92" }],
    titleWins: [],
    milestones: [{ year: "2020", text: "First final appearance" }],
    topRunScorers: [
      { player: "Rishabh Pant", runs: "3,284", sr: "147.9", hs: "128", mat: "111", pct: "100" },
      { player: "Shreyas Iyer", runs: "2,375", sr: "123.9", hs: "96", mat: "87", pct: "72" },
      { player: "Virender Sehwag", runs: "2,189", sr: "160.3", hs: "119", mat: "79", pct: "66" },
      { player: "David Warner", runs: "2,055", sr: "135.2", hs: "92", mat: "68", pct: "62" },
      { player: "Shikhar Dhawan", runs: "2,054", sr: "131.5", hs: "106", mat: "63", pct: "62" }
    ],
    topWicketTakers: [
      { player: "Amit Mishra", wkts: "106", econ: "7.35", mat: "99", pct: "100" },
      { player: "Axar Patel", wkts: "82", econ: "7.30", mat: "88", pct: "77" },
      { player: "Kagiso Rabada", wkts: "76", econ: "8.21", mat: "50", pct: "71" },
      { player: "Anrich Nortje", wkts: "53", econ: "8.15", mat: "40", pct: "50" },
      { player: "Kuldeep Yadav", wkts: "50", econ: "7.50", mat: "45", pct: "47" }
    ],
    venueInfo: { 
      name: "Arun Jaitley Stadium", 
      avgInn: "170", 
      pitchType: "Bowling-friendly (Turning)", 
      paceSpin: "Spin Dominant", 
      dew: "No", 
      capacity: "41,820", 
      notes: "Pitch offers increasing turn as matches progress. Spinners achieve sub-7 economies." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 30, won: 11, lost: 19, winRate: "36.7%" },
      { opponent: "Mumbai Indians", played: 34, won: 15, lost: 19, winRate: "44.1%" },
      { opponent: "Royal Challengers Bengaluru", played: 31, won: 12, lost: 19, winRate: "38.7%" },
      { opponent: "Kolkata Knight Riders", played: 32, won: 15, lost: 17, winRate: "46.9%" },
      { opponent: "Rajasthan Royals", played: 28, won: 13, lost: 15, winRate: "46.4%" },
      { opponent: "Punjab Kings", played: 32, won: 16, lost: 16, winRate: "50.0%" },
      { opponent: "Sunrisers Hyderabad", played: 23, won: 11, lost: 12, winRate: "47.8%" },
      { opponent: "Gujarat Titans", played: 5, won: 2, lost: 3, winRate: "40.0%" },
      { opponent: "Lucknow Super Giants", played: 6, won: 3, lost: 3, winRate: "50.0%" },
      { opponent: "Deccan Chargers", played: 10, won: 6, lost: 4, winRate: "60.0%" },
      { opponent: "Pune Warriors India", played: 6, won: 4, lost: 2, winRate: "66.7%" },
      { opponent: "Gujarat Lions", played: 4, won: 2, lost: 2, winRate: "50.0%" },
      { opponent: "Rising Pune Supergiant", played: 4, won: 2, lost: 2, winRate: "50.0%" }
    ],
    rivalries: "Rivalry with MI.",
    faqs: [
      { q: "Have Delhi Capitals won the IPL?", a: "No, DC have reached the final once in 2020." },
      { q: "Who is the captain of DC?", a: "Axar Patel captains the Delhi Capitals." }
    ],
    history: [
      { season: "2008", captain: "Virender Sehwag", matches: 15, wins: 7, losses: 8 },
      { season: "2009", captain: "Virender Sehwag", matches: 15, wins: 10, losses: 5 },
      { season: "2010", captain: "Gautam Gambhir", matches: 14, wins: 7, losses: 7 },
      { season: "2011", captain: "Virender Sehwag", matches: 14, wins: 9, losses: 5 },
      { season: "2012", captain: "Virender Sehwag", matches: 17, wins: 11, losses: 6 },
      { season: "2013", captain: "Mahela Jayawardene", matches: 16, wins: 3, losses: 13 },
      { season: "2014", captain: "Kevin Pietersen", matches: 14, wins: 2, losses: 12 },
      { season: "2015", captain: "JP Duminy", matches: 14, wins: 5, losses: 9 },
      { season: "2016", captain: "Zaheer Khan", matches: 14, wins: 7, losses: 7 },
      { season: "2017", captain: "Zaheer Khan", matches: 14, wins: 6, losses: 8 },
      { season: "2018", captain: "Shreyas Iyer", matches: 14, wins: 5, losses: 9 },
      { season: "2019", captain: "Shreyas Iyer", matches: 16, wins: 10, losses: 6 },
      { season: "2020", captain: "Shreyas Iyer", matches: 17, wins: 10, losses: 7 },
      { season: "2021", captain: "Rishabh Pant", matches: 16, wins: 10, losses: 6 },
      { season: "2022", captain: "Rishabh Pant", matches: 14, wins: 7, losses: 7 },
      { season: "2023", captain: "David Warner", matches: 14, wins: 5, losses: 9 },
      { season: "2024", captain: "Rishabh Pant", matches: 14, wins: 7, losses: 7 },
      { season: "2025", captain: "Axar Patel", matches: 14, wins: 7, losses: 7 },
      { season: "2026", captain: "Axar Patel", matches: 14, wins: 8, losses: 6 }
    ]
  },
  "Gujarat Titans": {
    logo: "/logos/gt.png",
    description: "Gujarat Titans have taken the IPL by storm since their breathtaking debut season in 2022, securing two championships through exceptional tactical execution, disciplined bowling led by Rashid Khan, and stellar leadership. Playing at the world's largest cricket stadium in Ahmedabad, the Titans exemplify modern T20 efficiency and composure under pressure.",
    winRate: "56.8%",
    titles: "2×",
    trophies: "🏆🏆 2 Titles",
    captain: "Shubman Gill",
    coach: "Ashish Nehra",
    strengths: ["Rashid Khan spin stranglehold", "Strong opening partnership"],
    weaknesses: ["Middle order depth"],
    squad: [{ role: "BAT", name: "Shubman Gill", stats: "2,540R", dna: "90" }],
    titleWins: [
      { season: "2022", match: "def RR • 130/5 def 129/9 (7 wkts)", pot: "Hardik Pandya" },
      { season: "2024", match: "def Championships", pot: "Rashid Khan" }
    ],
    milestones: [
      { year: "2022", text: "Won IPL title in debut season under Hardik Pandya" },
      { year: "2024", text: "Captured second IPL championship" }
    ],
    topRunScorers: [
      { player: "Shubman Gill", runs: "2,540", sr: "141.2", hs: "129", mat: "60", pct: "100" },
      { player: "David Miller", runs: "950", sr: "142.6", hs: "94", mat: "38", pct: "37" },
      { player: "Sai Sudharsan", runs: "980", sr: "136.5", hs: "96", mat: "30", pct: "38" },
      { player: "Hardik Pandya", runs: "833", sr: "135.5", hs: "87", mat: "31", pct: "32" },
      { player: "Wriddhiman Saha", runs: "750", sr: "128.0", hs: "81", mat: "35", pct: "29" }
    ],
    topWicketTakers: [
      { player: "Rashid Khan", wkts: "65", econ: "6.55", mat: "45", pct: "100" },
      { player: "Mohammed Shami", wkts: "48", econ: "7.55", mat: "33", pct: "74" },
      { player: "Mohit Sharma", wkts: "45", econ: "8.15", mat: "28", pct: "69" },
      { player: "Noor Ahmad", wkts: "32", econ: "7.80", mat: "24", pct: "49" },
      { player: "Sai Kishore", wkts: "18", econ: "7.60", mat: "15", pct: "27" }
    ],
    venueInfo: { 
      name: "Narendra Modi Stadium", 
      avgInn: "171", 
      pitchType: "Balanced (Spin Friendly Later)", 
      paceSpin: "Spin Dominant", 
      dew: "Yes", 
      capacity: "132,000", 
      notes: "World's largest cricket stadium. Rashid Khan holds an astonishing economy here." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 8, won: 3, lost: 5, winRate: "37.5%" },
      { opponent: "Mumbai Indians", played: 6, won: 4, lost: 2, winRate: "66.7%" },
      { opponent: "Royal Challengers Bengaluru", played: 6, won: 2, lost: 4, winRate: "33.3%" },
      { opponent: "Kolkata Knight Riders", played: 5, won: 3, lost: 2, winRate: "60.0%" },
      { opponent: "Rajasthan Royals", played: 6, won: 4, lost: 2, winRate: "66.7%" },
      { opponent: "Delhi Capitals", played: 5, won: 3, lost: 2, winRate: "60.0%" },
      { opponent: "Lucknow Super Giants", played: 5, won: 4, lost: 1, winRate: "80.0%" },
      { opponent: "Sunrisers Hyderabad", played: 5, won: 3, lost: 2, winRate: "60.0%" },
      { opponent: "Punjab Kings", played: 5, won: 3, lost: 2, winRate: "60.0%" }
    ],
    rivalries: "Rivalry with RR.",
    faqs: [
      { q: "How many IPL titles have GT won?", a: "GT have won 2 IPL titles (2022 and 2024)." },
      { q: "Who is the captain of GT?", a: "Shubman Gill is the captain of Gujarat Titans." }
    ],
    history: [
      { season: "2022", captain: "Hardik Pandya", matches: 16, wins: 12, losses: 4 },
      { season: "2023", captain: "Hardik Pandya", matches: 17, wins: 10, losses: 7 },
      { season: "2024", captain: "Shubman Gill", matches: 14, wins: 11, losses: 3 },
      { season: "2025", captain: "Shubman Gill", matches: 14, wins: 8, losses: 6 },
      { season: "2026", captain: "Shubman Gill", matches: 14, wins: 9, losses: 5 }
    ]
  },
  "Sunrisers Hyderabad": {
    logo: "/logos/srh.png",
    description: "Sunrisers Hyderabad, the fearless 'Orange Army', are celebrated across the globe for redefining aggressive modern batting. Led by Pat Cummins and packed with devastating power-hitters like Travis Head and Heinrich Klaasen, SRH bring unmatched intensity, record-shattering totals, and a relentless pace attack to every match.",
    winRate: "50.2%",
    titles: "1×",
    trophies: "🏆 1 Title",
    captain: "Pat Cummins",
    coach: "Daniel Vettori",
    strengths: ["Explosive top order"],
    weaknesses: ["Over-dependent on top order"],
    squad: [{ role: "BAT", name: "Travis Head", stats: "850R", dna: "91" }],
    titleWins: [{ season: "2016", match: "def RCB", pot: "Virat Kohli" }],
    milestones: [{ year: "2016", text: "Won title" }],
    topRunScorers: [
      { player: "David Warner", runs: "4,014", sr: "142.1", hs: "126", mat: "95", pct: "100" },
      { player: "Shikhar Dhawan", runs: "2,518", sr: "125.1", hs: "92", mat: "85", pct: "63" },
      { player: "Kane Williamson", runs: "2,101", sr: "134.5", hs: "89", mat: "76", pct: "52" },
      { player: "Manish Pandey", runs: "1,345", sr: "121.5", hs: "83", mat: "51", pct: "33" },
      { player: "Jonny Bairstow", runs: "1,038", sr: "142.0", hs: "114", mat: "28", pct: "26" }
    ],
    topWicketTakers: [
      { player: "Bhuvneshwar Kumar", wkts: "146", econ: "7.35", mat: "140", pct: "100" },
      { player: "Rashid Khan", wkts: "93", econ: "6.33", mat: "76", pct: "64" },
      { player: "T Natarajan", wkts: "58", econ: "8.75", mat: "50", pct: "40" },
      { player: "Siddarth Kaul", wkts: "51", econ: "8.65", mat: "43", pct: "35" },
      { player: "Sandeep Sharma", wkts: "41", econ: "7.80", mat: "43", pct: "28" }
    ],
    venueInfo: { 
      name: "Rajiv Gandhi Stadium", 
      avgInn: "174", 
      pitchType: "Batting Paradise", 
      paceSpin: "Pace Dominant", 
      dew: "Yes", 
      capacity: "55,000", 
      notes: "Hard, flat surface with true bounce where SRH recorded the highest T20 total ever." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 21, won: 6, lost: 15, winRate: "28.6%" },
      { opponent: "Mumbai Indians", played: 23, won: 10, lost: 13, winRate: "43.5%" },
      { opponent: "Royal Challengers Bengaluru", played: 24, won: 13, lost: 11, winRate: "54.2%" },
      { opponent: "Kolkata Knight Riders", played: 26, won: 9, lost: 17, winRate: "34.6%" },
      { opponent: "Delhi Capitals", played: 23, won: 12, lost: 11, winRate: "52.2%" },
      { opponent: "Rajasthan Royals", played: 19, won: 10, lost: 9, winRate: "52.6%" },
      { opponent: "Punjab Kings", played: 22, won: 15, lost: 7, winRate: "68.2%" },
      { opponent: "Gujarat Titans", played: 5, won: 2, lost: 3, winRate: "40.0%" },
      { opponent: "Lucknow Super Giants", played: 5, won: 2, lost: 3, winRate: "40.0%" }
    ],
    rivalries: "Rivalry with RCB.",
    faqs: [
      { q: "How many titles have SRH won?", a: "SRH won 1 IPL title in 2016." },
      { q: "Who is the captain of SRH?", a: "Pat Cummins captains Sunrisers Hyderabad." }
    ],
    history: [
      { season: "2013", captain: "Kumar Sangakkara", matches: 17, wins: 10, losses: 7 },
      { season: "2014", captain: "Shikhar Dhawan", matches: 14, wins: 6, losses: 8 },
      { season: "2015", captain: "David Warner", matches: 14, wins: 7, losses: 7 },
      { season: "2016", captain: "David Warner", matches: 17, wins: 11, losses: 6 },
      { season: "2017", captain: "David Warner", matches: 14, wins: 8, losses: 5 },
      { season: "2018", captain: "Kane Williamson", matches: 17, wins: 10, losses: 7 },
      { season: "2019", captain: "Kane Williamson", matches: 15, wins: 6, losses: 9 },
      { season: "2020", captain: "David Warner", matches: 16, wins: 8, losses: 8 },
      { season: "2021", captain: "Kane Williamson", matches: 14, wins: 3, losses: 11 },
      { season: "2022", captain: "Kane Williamson", matches: 14, wins: 6, losses: 8 },
      { season: "2023", captain: "Aiden Markram", matches: 14, wins: 4, losses: 10 },
      { season: "2024", captain: "Pat Cummins", matches: 16, wins: 9, losses: 6 },
      { season: "2025", captain: "Pat Cummins", matches: 14, wins: 8, losses: 6 },
      { season: "2026", captain: "Pat Cummins", matches: 14, wins: 9, losses: 5 }
    ]
  },
  "Rajasthan Royals": {
    logo: "/logos/rr.png",
    description: "Rajasthan Royals, the inaugural champions of 2008 under the legendary Shane Warne, embody a spirit of innovation, fearless youth development, and royal flair. Guided by captain Riyan Parag and coach Kumar Sangakkara, the Royals continually unearth global talents while playing an exceptionally entertaining brand of cricket.",
    winRate: "49.8%",
    titles: "1×",
    trophies: "🏆 1 Title",
    captain: "Riyan Parag",
    coach: "Kumar Sangakkara",
    strengths: ["Yashasvi Jaiswal powerplay"],
    weaknesses: ["Loss of Samson"],
    squad: [{ role: "BAT", name: "Yashasvi Jaiswal", stats: "1,770R", dna: "93" }],
    titleWins: [{ season: "2008", match: "def CSK", pot: "Shane Watson" }],
    milestones: [{ year: "2008", text: "Inaugural champions" }],
    topRunScorers: [
      { player: "Sanju Samson", runs: "3,888", sr: "138.5", hs: "119", mat: "140", pct: "100" },
      { player: "Jos Buttler", runs: "3,082", sr: "148.3", hs: "124", mat: "85", pct: "79" },
      { player: "Ajinkya Rahane", runs: "2,810", sr: "122.5", hs: "103", mat: "100", pct: "72" },
      { player: "Shane Watson", runs: "2,372", sr: "141.2", hs: "104", mat: "78", pct: "61" },
      { player: "Yashasvi Jaiswal", runs: "1,950", sr: "151.2", hs: "124", mat: "55", pct: "50" }
    ],
    topWicketTakers: [
      { player: "Yuzvendra Chahal", wkts: "88", econ: "7.75", mat: "46", pct: "100" },
      { player: "Trent Boult", wkts: "65", econ: "8.10", mat: "45", pct: "73" },
      { player: "Siddharth Trivedi", wkts: "65", econ: "7.58", mat: "76", pct: "73" },
      { player: "Shane Warne", wkts: "57", econ: "7.27", mat: "55", pct: "64" },
      { player: "Jofra Archer", wkts: "46", econ: "7.13", mat: "35", pct: "52" }
    ],
    venueInfo: { 
      name: "Sawai Mansingh Stadium", 
      avgInn: "169", 
      pitchType: "Balanced", 
      paceSpin: "Balanced", 
      dew: "Yes", 
      capacity: "30,000", 
      notes: "Balanced venue offering pace early and turn for spinners later. Evening dew aids chasing teams." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 29, won: 13, lost: 16, winRate: "44.8%" },
      { opponent: "Mumbai Indians", played: 30, won: 15, lost: 15, winRate: "50.0%" },
      { opponent: "Royal Challengers Bengaluru", played: 30, won: 15, lost: 15, winRate: "50.0%" },
      { opponent: "Kolkata Knight Riders", played: 29, won: 14, lost: 14, winRate: "51.7%" },
      { opponent: "Delhi Capitals", played: 28, won: 15, lost: 13, winRate: "53.6%" },
      { opponent: "Punjab Kings", played: 28, won: 16, lost: 12, winRate: "57.1%" },
      { opponent: "Sunrisers Hyderabad", played: 19, won: 10, lost: 9, winRate: "52.6%" },
      { opponent: "Gujarat Titans", played: 6, won: 2, lost: 4, winRate: "33.3%" },
      { opponent: "Lucknow Super Giants", played: 5, won: 3, lost: 2, winRate: "60.0%" },
      { opponent: "Deccan Chargers", played: 10, won: 5, lost: 5, winRate: "50.0%" },
      { opponent: "Pune Warriors India", played: 6, won: 4, lost: 2, winRate: "66.7%" }
    ],
    rivalries: "Rivalry with CSK.",
    faqs: [
      { q: "When did RR win their title?", a: "RR won the inaugural IPL title in 2008 under Shane Warne." },
      { q: "Who is the captain of RR?", a: "Riyan Parag leads the Rajasthan Royals as captain." }
    ],
    history: [
      { season: "2008", captain: "Shane Warne", matches: 16, wins: 13, losses: 3 },
      { season: "2009", captain: "Shane Warne", matches: 13, wins: 6, losses: 7 },
      { season: "2010", captain: "Shane Warne", matches: 14, wins: 6, losses: 8 },
      { season: "2011", captain: "Shane Warne", matches: 14, wins: 6, losses: 7 },
      { season: "2012", captain: "Rahul Dravid", matches: 16, wins: 7, losses: 9 },
      { season: "2013", captain: "Rahul Dravid", matches: 18, wins: 11, losses: 7 },
      { season: "2014", captain: "Shane Watson", matches: 14, wins: 7, losses: 7 },
      { season: "2015", captain: "Shane Watson", matches: 14, wins: 7, losses: 5 },
      { season: "2016", captain: "Suspended", matches: 0, wins: 0, losses: 0 },
      { season: "2017", captain: "Suspended", matches: 0, wins: 0, losses: 0 },
      { season: "2018", captain: "Ajinkya Rahane", matches: 15, wins: 7, losses: 8 },
      { season: "2019", captain: "Steve Smith", matches: 14, wins: 5, losses: 8 },
      { season: "2020", captain: "Steve Smith", matches: 14, wins: 6, losses: 8 },
      { season: "2021", captain: "Sanju Samson", matches: 14, wins: 5, losses: 9 },
      { season: "2022", captain: "Sanju Samson", matches: 17, wins: 10, losses: 7 },
      { season: "2023", captain: "Sanju Samson", matches: 14, wins: 7, losses: 7 },
      { season: "2024", captain: "Sanju Samson", matches: 16, wins: 9, losses: 6 },
      { season: "2025", captain: "Sanju Samson", matches: 14, wins: 9, losses: 5 },
      { season: "2026", captain: "Riyan Parag", matches: 14, wins: 10, losses: 4 }
    ]
  },
  "Punjab Kings": {
    logo: "/logos/pbks.png",
    description: "Punjab Kings showcase immense grit and passionate cricket, carrying a proud legacy from Mohali. Under the strategic leadership of Shreyas Iyer and head coach Ricky Ponting, PBKS combine ferocious batting depth with elite death bowling from Arshdeep Singh, making them fierce contenders in every tournament.",
    winRate: "45.6%",
    titles: "—",
    trophies: "Contender",
    captain: "Shreyas Iyer",
    coach: "Ricky Ponting",
    strengths: ["Arshdeep death bowling"],
    weaknesses: ["Title drought"],
    squad: [{ role: "BAT", name: "Shreyas Iyer", stats: "3,300R", dna: "87" }],
    titleWins: [],
    milestones: [{ year: "2025", text: "Finalist" }],
    topRunScorers: [
      { player: "KL Rahul", runs: "3,273", sr: "139.7", hs: "132", mat: "55", pct: "100" },
      { player: "Shaun Marsh", runs: "2,477", sr: "132.7", hs: "115", mat: "71", pct: "75" },
      { player: "Mayank Agarwal", runs: "1,985", sr: "134.3", hs: "106", mat: "60", pct: "60" },
      { player: "David Miller", runs: "1,974", sr: "139.3", hs: "101", mat: "84", pct: "60" },
      { player: "Shikhar Dhawan", runs: "1,788", sr: "124.5", hs: "106", mat: "50", pct: "54" }
    ],
    topWicketTakers: [
      { player: "Piyush Chawla", wkts: "84", econ: "7.84", mat: "87", pct: "100" },
      { player: "Arshdeep Singh", wkts: "80", econ: "8.75", mat: "65", pct: "95" },
      { player: "Sandeep Sharma", wkts: "73", econ: "7.89", mat: "61", pct: "86" },
      { player: "Mohammed Shami", wkts: "58", econ: "8.25", mat: "42", pct: "69" },
      { player: "Axar Patel", wkts: "44", econ: "7.35", mat: "50", pct: "52" }
    ],
    venueInfo: { 
      name: "PCA Stadium Mohali", 
      avgInn: "176", 
      pitchType: "Batting (True Bounce)", 
      paceSpin: "Pace Dominant", 
      dew: "No", 
      capacity: "26,950", 
      notes: "True bounce with a fast outfield favoring vertical-bat strokeplay." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 29, won: 11, lost: 18, winRate: "37.9%" },
      { opponent: "Mumbai Indians", played: 32, won: 16, lost: 16, winRate: "50.0%" },
      { opponent: "Royal Challengers Bengaluru", played: 32, won: 15, lost: 17, winRate: "46.9%" },
      { opponent: "Kolkata Knight Riders", played: 32, won: 11, lost: 21, winRate: "34.4%" },
      { opponent: "Delhi Capitals", played: 32, won: 16, lost: 16, winRate: "50.0%" },
      { opponent: "Rajasthan Royals", played: 28, won: 12, lost: 16, winRate: "42.9%" },
      { opponent: "Sunrisers Hyderabad", played: 22, won: 7, lost: 15, winRate: "31.8%" },
      { opponent: "Gujarat Titans", played: 5, won: 2, lost: 3, winRate: "40.0%" },
      { opponent: "Lucknow Super Giants", played: 5, won: 2, lost: 3, winRate: "40.0%" },
      { opponent: "Deccan Chargers", played: 10, won: 5, lost: 5, winRate: "50.0%" },
      { opponent: "Pune Warriors India", played: 6, won: 4, lost: 2, winRate: "66.7%" }
    ],
    rivalries: "Rivalry with RCB.",
    faqs: [
      { q: "Have PBKS won an IPL title?", a: "No, PBKS finished as runners-up in 2014 and 2025." },
      { q: "Who is the captain of PBKS?", a: "Shreyas Iyer captains the Punjab Kings." }
    ],
    history: [
      { season: "2008", captain: "Yuvraj Singh", matches: 15, wins: 10, losses: 5 },
      { season: "2009", captain: "Yuvraj Singh", matches: 14, wins: 7, losses: 7 },
      { season: "2010", captain: "Kumar Sangakkara", matches: 14, wins: 4, losses: 10 },
      { season: "2011", captain: "Adam Gilchrist", matches: 14, wins: 7, losses: 7 },
      { season: "2012", captain: "Adam Gilchrist", matches: 16, wins: 8, losses: 8 },
      { season: "2013", captain: "Adam Gilchrist", matches: 16, wins: 8, losses: 8 },
      { season: "2014", captain: "George Bailey", matches: 16, wins: 12, losses: 4 },
      { season: "2015", captain: "George Bailey", matches: 14, wins: 3, losses: 11 },
      { season: "2016", captain: "Murali Vijay", matches: 14, wins: 4, losses: 10 },
      { season: "2017", captain: "Glenn Maxwell", matches: 14, wins: 7, losses: 7 },
      { season: "2018", captain: "Ravichandran Ashwin", matches: 14, wins: 6, losses: 8 },
      { season: "2019", captain: "Ravichandran Ashwin", matches: 14, wins: 6, losses: 8 },
      { season: "2020", captain: "KL Rahul", matches: 14, wins: 6, losses: 8 },
      { season: "2021", captain: "KL Rahul", matches: 14, wins: 6, losses: 8 },
      { season: "2022", captain: "Mayank Agarwal", matches: 14, wins: 7, losses: 7 },
      { season: "2023", captain: "Shikhar Dhawan", matches: 14, wins: 6, losses: 8 },
      { season: "2024", captain: "Shikhar Dhawan", matches: 14, wins: 5, losses: 9 },
      { season: "2025", captain: "Shreyas Iyer", matches: 14, wins: 7, losses: 7 },
      { season: "2026", captain: "Shreyas Iyer", matches: 14, wins: 8, losses: 6 }
    ]
  },
  "Lucknow Super Giants": {
    logo: "/logos/lsg.png",
    description: "Lucknow Super Giants bring a modern, energetic presence to the IPL, representing Uttar Pradesh with flair. Led by Rishabh Pant and featuring a lethal pace battery alongside explosive hitters like Nicholas Pooran, LSG have established themselves as a formidable force capable of dominating opponents in all departments.",
    winRate: "52.3%",
    titles: "—",
    trophies: "Contender",
    captain: "Rishabh Pant",
    coach: "Justin Langer",
    strengths: ["Pace battery"],
    weaknesses: ["Middle order"],
    squad: [{ role: "WK", name: "Rishabh Pant", stats: "3,500R", dna: "92" }],
    titleWins: [],
    milestones: [{ year: "2022", text: "Debut playoffs" }],
    topRunScorers: [
      { player: "KL Rahul", runs: "1,450", sr: "135.2", hs: "103", mat: "45", pct: "100" },
      { player: "Nicholas Pooran", runs: "1,320", sr: "168.5", hs: "75", mat: "43", pct: "91" },
      { player: "Marcus Stoinis", runs: "950", sr: "148.0", hs: "89", mat: "42", pct: "65" },
      { player: "Quinton de Kock", runs: "850", sr: "138.0", hs: "100", mat: "30", pct: "58" },
      { player: "Ayush Badoni", runs: "750", sr: "135.0", hs: "59", mat: "40", pct: "51" }
    ],
    topWicketTakers: [
      { player: "Ravi Bishnoi", wkts: "55", econ: "7.80", mat: "45", pct: "100" },
      { player: "Mohsin Khan", wkts: "35", econ: "8.10", mat: "30", pct: "63" },
      { player: "Avesh Khan", wkts: "30", econ: "9.20", mat: "22", pct: "54" },
      { player: "Naveen-ul-Haq", wkts: "28", econ: "8.15", mat: "24", pct: "50" },
      { player: "Yash Thakur", wkts: "25", econ: "9.10", mat: "20", pct: "45" }
    ],
    venueInfo: { 
      name: "Ekana Stadium", 
      avgInn: "168", 
      pitchType: "Bowling-friendly (Seam)", 
      paceSpin: "Pace Dominant", 
      dew: "Yes", 
      capacity: "50,000", 
      notes: "Offers early movement for pace bowlers, perfectly suiting LSG's pace battery." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 6, won: 3, lost: 3, winRate: "50.0%" },
      { opponent: "Mumbai Indians", played: 6, won: 4, lost: 2, winRate: "66.7%" },
      { opponent: "Royal Challengers Bengaluru", played: 8, won: 5, lost: 3, winRate: "62.5%" },
      { opponent: "Gujarat Titans", played: 5, won: 1, lost: 4, winRate: "20.0%" },
      { opponent: "Kolkata Knight Riders", played: 5, won: 3, lost: 2, winRate: "60.0%" },
      { opponent: "Delhi Capitals", played: 6, won: 3, lost: 3, winRate: "50.0%" },
      { opponent: "Rajasthan Royals", played: 5, won: 2, lost: 3, winRate: "40.0%" },
      { opponent: "Sunrisers Hyderabad", played: 5, won: 3, lost: 2, winRate: "60.0%" },
      { opponent: "Punjab Kings", played: 5, won: 3, lost: 2, winRate: "60.0%" }
    ],
    rivalries: "Rivalry with GT.",
    faqs: [
      { q: "When did LSG join the IPL?", a: "LSG made their debut in the 2022 IPL season." },
      { q: "Who is the captain of LSG?", a: "Rishabh Pant leads Lucknow Super Giants as captain." }
    ],
    history: [
      { season: "2022", captain: "KL Rahul", matches: 15, wins: 9, losses: 6 },
      { season: "2023", captain: "KL Rahul", matches: 15, wins: 8, losses: 6 },
      { season: "2024", captain: "KL Rahul", matches: 14, wins: 7, losses: 7 },
      { season: "2025", captain: "Rishabh Pant", matches: 14, wins: 8, losses: 6 },
      { season: "2026", captain: "Rishabh Pant", matches: 14, wins: 9, losses: 5 }
    ]
  },
  "Deccan Chargers": {
    logo: "/logos/deccan.png",
    description: "Deccan Chargers hold a legendary place in IPL history as the heroic champions of 2009. Based in Hyderabad and captained by Adam Gilchrist, they pulled off an unforgettable underdog triumph in South Africa, etching icons like Rohit Sharma into folklore before concluding their franchise journey.",
    winRate: "45.7%",
    titles: "1×",
    trophies: "🏆 1 Title",
    captain: "Adam Gilchrist",
    coach: "Darren Lehmann",
    strengths: ["Gilchrist opening"],
    weaknesses: ["Terminated"],
    squad: [],
    titleWins: [{ season: "2009", match: "def RCB", pot: "Anil Kumble" }],
    milestones: [{ year: "2009", text: "Title win" }],
    topRunScorers: [
      { player: "Adam Gilchrist", runs: "1,220", sr: "140.2", hs: "109", mat: "46", pct: "100" },
      { player: "Rohit Sharma", runs: "1,170", sr: "131.5", hs: "101", mat: "45", pct: "95" },
      { player: "Herschelle Gibbs", runs: "890", sr: "120.0", hs: "69", mat: "33", pct: "72" },
      { player: "Andrew Symonds", runs: "508", sr: "132.0", hs: "117", mat: "20", pct: "41" },
      { player: "VVS Laxman", runs: "282", sr: "105.0", hs: "59", mat: "19", pct: "23" }
    ],
    topWicketTakers: [
      { player: "Pragyan Ojha", wkts: "63", econ: "7.25", mat: "54", pct: "100" },
      { player: "RP Singh", wkts: "53", econ: "7.88", mat: "44", pct: "84" },
      { player: "Amit Mishra", wkts: "38", econ: "7.15", mat: "31", pct: "60" },
      { player: "Dale Steyn", wkts: "35", econ: "6.45", mat: "28", pct: "55" }
    ],
    venueInfo: { 
      name: "Uppal", 
      avgInn: "160", 
      pitchType: "Balanced", 
      paceSpin: "Balanced", 
      dew: "No", 
      capacity: "55,000", 
      notes: "Former home ground." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 10, won: 3, lost: 7, winRate: "30.0%" },
      { opponent: "Mumbai Indians", played: 10, won: 4, lost: 6, winRate: "40.0%" },
      { opponent: "Royal Challengers Bengaluru", played: 11, won: 6, lost: 5, winRate: "54.5%" },
      { opponent: "Kolkata Knight Riders", played: 10, won: 4, lost: 6, winRate: "40.0%" },
      { opponent: "Delhi Capitals", played: 10, won: 6, lost: 4, winRate: "60.0%" },
      { opponent: "Rajasthan Royals", played: 10, won: 5, lost: 5, winRate: "50.0%" },
      { opponent: "Punjab Kings", played: 10, won: 5, lost: 5, winRate: "50.0%" }
    ],
    rivalries: "Early clashes.",
    faqs: [
      { q: "What happened to Deccan Chargers?", a: "They won the 2009 title and were later replaced by SRH in 2013." }
    ],
    history: [
      { season: "2008", captain: "VVS Laxman / A. Gilchrist", matches: 14, wins: 2, losses: 12 },
      { season: "2009", captain: "Adam Gilchrist", matches: 16, wins: 9, losses: 7 },
      { season: "2010", captain: "Adam Gilchrist", matches: 16, wins: 8, losses: 8 },
      { season: "2011", captain: "Kumar Sangakkara", matches: 14, wins: 6, losses: 8 },
      { season: "2012", captain: "Kumar Sangakkara", matches: 16, wins: 4, losses: 11 }
    ]
  },
  "Kochi Tuskers Kerala": {
    logo: "/logos/kochi.png",
    description: "Kochi Tuskers Kerala represented the vibrant spirit of God's Own Country during the 2011 IPL season. Led by Mahela Jayawardene and featuring legendary performances from Brendon McCullum and Ravindra Jadeja, the franchise added a unique chapter to early IPL expansion history.",
    winRate: "42.8%",
    titles: "—",
    trophies: "Played 2011",
    captain: "Mahela Jayawardene",
    coach: "Geoff Lawson",
    strengths: ["Brendon McCullum"],
    weaknesses: ["Terminated"],
    squad: [], titleWins: [], milestones: [],
    topRunScorers: [
      { player: "Brendon McCullum", runs: "357", sr: "130.6", hs: "81", mat: "13", pct: "100" },
      { player: "Brad Hodge", runs: "285", sr: "135.7", hs: "51", mat: "14", pct: "80" },
      { player: "Ravindra Jadeja", runs: "283", sr: "114.1", hs: "47", mat: "14", pct: "79" },
      { player: "Mahela Jayawardene", runs: "268", sr: "127.2", hs: "66", mat: "13", pct: "75" }
    ],
    topWicketTakers: [
      { player: "RP Singh", wkts: "13", econ: "8.15", mat: "14", pct: "100" },
      { player: "Vinay Kumar", wkts: "9", econ: "8.60", mat: "13", pct: "69" },
      { player: "Ravindra Jadeja", wkts: "8", econ: "7.40", mat: "14", pct: "61" },
      { player: "Thisara Perera", wkts: "7", econ: "9.20", mat: "4", pct: "53" }
    ],
    venueInfo: { 
      name: "Kochi", 
      avgInn: "155", 
      pitchType: "Balanced", 
      paceSpin: "Balanced", 
      dew: "No", 
      capacity: "60,000", 
      notes: "2011 only." 
    },
    headToHead: [
      { opponent: "Chennai Super Kings", played: 2, won: 1, lost: 1, winRate: "50.0%" },
      { opponent: "Mumbai Indians", played: 2, won: 1, lost: 1, winRate: "50.0%" },
      { opponent: "Royal Challengers Bengaluru", played: 2, won: 1, lost: 1, winRate: "50.0%" }
    ],
    rivalries: "None.",
    faqs: [
      { q: "How many seasons did Kochi play?", a: "Kochi Tuskers Kerala played only the 2011 IPL season." }
    ],
    history: [{ season: "2011", captain: "Mahela Jayawardene", matches: 14, wins: 6, losses: 8 }]
  },
  "Pune Warriors India": {
    logo: "/logos/pune.png",
    description: "Pune Warriors India brought high-profile cricket to Maharashtra from 2011 to 2013 under the ownership of Sahara India Pariwar. Guided by legendary captains like Yuvraj Singh and Sourav Ganguly, the team enjoyed passionate fan backing throughout their tenure.",
    winRate: "35.2%",
    titles: "—",
    trophies: "Played 2011-13",
    captain: "Angelo Mathews",
    coach: "Prasad Amte",
    strengths: ["Ganguly leadership"],
    weaknesses: ["Financial disputes"],
    squad: [], titleWins: [], milestones: [],
    topRunScorers: [
      { player: "Robin Uthappa", runs: "1,019", sr: "119.5", hs: "75", mat: "46", pct: "100" },
      { player: "Jesse Ryder", runs: "556", sr: "135.2", hs: "86", mat: "24", pct: "54" },
      { player: "Steven Smith", runs: "480", sr: "125.0", hs: "76", mat: "22", pct: "47" },
      { player: "Angelo Mathews", runs: "350", sr: "118.0", hs: "43", mat: "20", pct: "34" },
      { player: "Yuvraj Singh", runs: "343", sr: "130.5", hs: "83", mat: "14", pct: "33" }
    ],
    topWicketTakers: [
      { player: "Rahul Sharma", wkts: "30", econ: "7.02", mat: "31", pct: "100" },
      { player: "Bhuvneshwar Kumar", wkts: "24", econ: "7.90", mat: "31", pct: "80" },
      { player: "Ashok Dinda", wkts: "22", econ: "8.50", mat: "23", pct: "73" },
      { player: "Wayne Parnell", wkts: "14", econ: "8.10", mat: "12", pct: "46" }
    ],
    venueInfo: { 
      name: "Pune", 
      avgInn: "165", 
      pitchType: "Balanced", 
      paceSpin: "Balanced", 
      dew: "No", 
      capacity: "37,000", 
      notes: "Defunct." 
    },
    headToHead: [
      { opponent: "Mumbai Indians", played: 6, won: 1, lost: 5, winRate: "16.7%" },
      { opponent: "Chennai Super Kings", played: 6, won: 1, lost: 5, winRate: "16.7%" },
      { opponent: "Royal Challengers Bengaluru", played: 6, won: 2, lost: 4, winRate: "33.3%" },
      { opponent: "Kolkata Knight Riders", played: 6, won: 1, lost: 5, winRate: "16.7%" },
      { opponent: "Delhi Capitals", played: 6, won: 2, lost: 4, winRate: "33.3%" }
    ],
    rivalries: "None.",
    faqs: [
      { q: "When did Pune Warriors play?", a: "They competed from 2011 to 2013." }
    ],
    history: [
      { season: "2011", captain: "Yuvraj Singh", matches: 14, wins: 4, losses: 9 },
      { season: "2012", captain: "Sourav Ganguly", matches: 16, wins: 4, losses: 12 },
      { season: "2013", captain: "Angelo Mathews", matches: 16, wins: 4, losses: 12 }
    ]
  },
  "Gujarat Lions": {
    logo: "/logos/gl.png",
    description: "Gujarat Lions served as an electrifying temporary franchise based out of Rajkot for the 2016 and 2017 IPL seasons. Captained by Suresh Raina, they delivered an exceptional debut campaign by topping the league standings and reaching the playoffs with memorable strokeplay.",
    winRate: "47.2%",
    titles: "—",
    trophies: "Playoffs (2016)",
    captain: "Suresh Raina",
    coach: "Brad Hodge",
    strengths: ["Suresh Raina"],
    weaknesses: ["Temporary"],
    squad: [], titleWins: [], milestones: [],
    topRunScorers: [
      { player: "Suresh Raina", runs: "841", sr: "127.4", hs: "75", mat: "29", pct: "100" },
      { player: "Aaron Finch", runs: "693", sr: "138.6", hs: "74", mat: "26", pct: "82" },
      { player: "Brendon McCullum", runs: "599", sr: "135.3", hs: "93", mat: "27", pct: "71" },
      { player: "Dinesh Karthik", runs: "590", sr: "123.4", hs: "65", mat: "28", pct: "70" }
    ],
    topWicketTakers: [
      { player: "Dhawal Kulkarni", wkts: "21", econ: "7.68", mat: "20", pct: "100" },
      { player: "Ravindra Jadeja", wkts: "14", econ: "7.85", mat: "27", pct: "66" },
      { player: "Andrew Tye", wkts: "12", econ: "7.78", mat: "6", pct: "57" },
      { player: "Praveen Kumar", wkts: "11", econ: "8.12", mat: "26", pct: "52" }
    ],
    venueInfo: { 
      name: "Rajkot", 
      avgInn: "180", 
      pitchType: "Batting Friendly", 
      paceSpin: "Pace Dominant", 
      dew: "No", 
      capacity: "28,000", 
      notes: "Rajkot home venue." 
    },
    headToHead: [
      { opponent: "Royal Challengers Bengaluru", played: 5, won: 3, lost: 2, winRate: "60.0%" },
      { opponent: "Mumbai Indians", played: 2, won: 1, lost: 1, winRate: "50.0%" },
      { opponent: "Kolkata Knight Riders", played: 4, won: 2, lost: 2, winRate: "50.0%" },
      { opponent: "Delhi Capitals", played: 4, won: 2, lost: 2, winRate: "50.0%" }
    ],
    rivalries: "Temporary.",
    faqs: [
      { q: "Why did Gujarat Lions play?", a: "They were a temporary replacement team during CSK and RR's suspension." }
    ],
    history: [
      { season: "2016", captain: "Suresh Raina", matches: 16, wins: 9, losses: 7 },
      { season: "2017", captain: "Suresh Raina", matches: 14, wins: 4, losses: 10 }
    ]
  },
  "Rising Pune Supergiant": {
    logo: "/logos/rps.png",
    description: "Rising Pune Supergiant lit up the 2016 and 2017 IPL seasons with masterclass tactical leadership from MS Dhoni and Steve Smith. Their stellar run to the 2017 IPL final—featuring unforgettable match-winning performances by Ben Stokes—remains one of the most memorable chapters in tournament history.",
    winRate: "46.6%",
    titles: "—",
    trophies: "Finalist (2017)",
    captain: "Steve Smith",
    coach: "Stephen Fleming",
    strengths: ["Steve Smith"],
    weaknesses: ["Temporary"],
    squad: [], titleWins: [], milestones: [],
    topRunScorers: [
      { player: "Steven Smith", runs: "740", sr: "128.5", hs: "101", mat: "23", pct: "100" },
      { player: "MS Dhoni", runs: "590", sr: "125.6", hs: "64", mat: "30", pct: "79" },
      { player: "Ajinkya Rahane", runs: "500", sr: "121.0", hs: "63", mat: "30", pct: "67" },
      { player: "Rahul Tripathi", runs: "391", sr: "146.4", hs: "93", mat: "14", pct: "52" }
    ],
    topWicketTakers: [
      { player: "Imran Tahir", wkts: "30", econ: "7.72", mat: "27", pct: "100" },
      { player: "Jaydev Unadkat", wkts: "24", econ: "7.02", mat: "12", pct: "80" },
      { player: "Shardul Thakur", wkts: "17", econ: "8.25", mat: "12", pct: "56" },
      { player: "Ben Stokes", wkts: "12", econ: "7.18", mat: "12", pct: "40" }
    ],
    venueInfo: { 
      name: "Pune", 
      avgInn: "165", 
      pitchType: "Balanced", 
      paceSpin: "Balanced", 
      dew: "No", 
      capacity: "37,000", 
      notes: "Pune home venue." 
    },
    headToHead: [
      { opponent: "Mumbai Indians", played: 6, won: 4, lost: 2, winRate: "66.7%" },
      { opponent: "Royal Challengers Bengaluru", played: 4, won: 2, lost: 2, winRate: "50.0%" },
      { opponent: "Kolkata Knight Riders", played: 4, won: 2, lost: 2, winRate: "50.0%" },
      { opponent: "Delhi Capitals", played: 4, won: 2, lost: 2, winRate: "50.0%" }
    ],
    rivalries: "Derby with MI.",
    faqs: [
      { q: "Did Rising Pune reach a final?", a: "Yes, they reached the 2017 IPL final under Steve Smith." }
    ],
    history: [
      { season: "2016", captain: "MS Dhoni", matches: 14, wins: 5, losses: 9 },
      { season: "2017", captain: "Steve Smith", matches: 16, wins: 10, losses: 6 }
    ]
  }
};

const SLUG_TO_NAME = {
  "csk": "Chennai Super Kings",
  "mi": "Mumbai Indians",
  "rcb": "Royal Challengers Bengaluru",
  "kkr": "Kolkata Knight Riders",
  "dc": "Delhi Capitals",
  "gt": "Gujarat Titans",
  "srh": "Sunrisers Hyderabad",
  "rr": "Rajasthan Royals",
  "pbks": "Punjab Kings",
  "lsg": "Lucknow Super Giants",
  "deccan": "Deccan Chargers",
  "kochi": "Kochi Tuskers Kerala",
  "pwi": "Pune Warriors India",
  "gl": "Gujarat Lions",
  "rps": "Rising Pune Supergiant"
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xl text-slate-900">
        <p className="font-black text-blue-600 mb-1">Season: {label}</p>
        <p className="text-sm font-bold flex items-center gap-1.5 text-amber-600 mb-2">
          <User size={14} /> Captain: {data.captain}
        </p>
        <p className="text-sm text-emerald-600 font-semibold">Wins: {data.wins}</p>
        <p className="text-sm text-rose-600 font-semibold">Losses: {data.losses}</p>
      </div>
    );
  }
  return null;
};

// Helper function to dynamically generate a deterministic set of match blocks if explicitly not provided
const generateMatchBlocks = (won, lost, opponent) => {
  let w = won, l = lost;
  const res = [];
  let yr = 2026;
  let step = 0;
  while (w > 0 || l > 0) {
    if (w > 0 && (step % 3 !== 0 || l === 0)) {
      res.unshift({ outcome: 'W', desc: `${yr} • Won match against ${opponent}` });
      w--;
    } else {
      res.unshift({ outcome: 'L', desc: `${yr} • Lost match to ${opponent}` });
      l--;
    }
    step++;
    if (step % 2 === 0) yr--;
  }
  return res;
};

// --- IV. MATH / DETERMINISTIC NRR ENGINE ---
const generateSeededRandom = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  return function() {
    hash = Math.imul(741103597, hash) + 1891316104 | 0;
    return (hash >>> 0) / 4294967296;
  }
};

const generateTournamentNRR = (teamName, season) => {
  const rand = generateSeededRandom(`${teamName}-${season}`);
  
  let cumulativeRunsScored = 0, cumulativeOversFaced = 0;
  let cumulativeRunsConceded = 0, cumulativeOversBowled = 0;
  const chartData = [];

  for (let match = 1; match <= 14; match++) {
    const isAllOutFor = rand() > 0.8;
    const runsFor = Math.floor(rand() * 80) + 140; 
    const oversFor = isAllOutFor ? 20 : (20 - (rand() * 2)); 

    const isAllOutAgainst = rand() > 0.8;
    const runsAgainst = Math.floor(rand() * 80) + 140;
    const oversAgainst = isAllOutAgainst ? 20 : (20 - (rand() * 2)); 
    
    cumulativeRunsScored += runsFor;
    cumulativeOversFaced += oversFor;
    cumulativeRunsConceded += runsAgainst;
    cumulativeOversBowled += oversAgainst;

    const currentCumulativeNRR = (cumulativeRunsScored / cumulativeOversFaced) - (cumulativeRunsConceded / cumulativeOversBowled);
    const matchNRR = (runsFor / oversFor) - (runsAgainst / oversAgainst);

    chartData.push({
      matchNumber: `M${match}`,
      fullLabel: `Match ${match}`,
      nrr: parseFloat(currentCumulativeNRR.toFixed(3)),
      matchNRR: parseFloat(matchNRR.toFixed(3))
    });
  }
  return chartData;
};

const NRRTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPositive = data.nrr >= 0;
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-lg min-w-[160px] z-50">
        <p className="font-black text-slate-800 text-sm border-b border-slate-100 pb-2 mb-2">{data.fullLabel}</p>
        <div className="flex flex-col gap-1.5">
           <div className="flex justify-between items-center gap-4">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tournament NRR</span>
             <span className={`font-black font-mono text-sm ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
               {(data.nrr > 0 ? '+' : '') + data.nrr.toFixed(3)}
             </span>
           </div>
           <div className="flex justify-between items-center gap-4">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Margin</span>
             <span className="font-bold font-mono text-xs text-slate-600">
               {(data.matchNRR > 0 ? '+' : '') + data.matchNRR.toFixed(3)}
             </span>
           </div>
        </div>
      </div>
    );
  }
  return null;
};

const MatchGrid = ({ w, l }) => {
  const boxes = Array.from({length: Math.min(w+l, 24)}).map((_, i) => i < (w/(w+l))*24 ? 'bg-[#0ea5e9]' : 'bg-[#f59e0b]');
  return (
    <div className="flex flex-wrap gap-1 mt-3 mb-3">
       {boxes.map((color, idx) => <div key={idx} className={`w-2.5 h-2.5 rounded-[2px] ${color}`} />)}
    </div>
  );
};

const TeamDetail = () => {
  const [teamData, setTeamData] = useState(null);
  const [hoveredMatch, setHoveredMatch] = useState({});
  const [selectedSeason, setSelectedSeason] = useState("2026");
  const seasons = ["2026", "2025", "2024", "2023"];

  useEffect(() => {
    const segments = window.location.pathname.split('/').filter(Boolean);
    const param = decodeURIComponent(segments[segments.length - 1] || "").trim().toLowerCase();
    const allKeys = Object.keys(TEAM_PROFILES);

    let resolvedName = "Chennai Super Kings";

    if (!isNaN(param)) {
      const num = parseInt(param, 10);
      resolvedName = allKeys[num % allKeys.length];
    } else if (SLUG_TO_NAME[param]) {
      resolvedName = SLUG_TO_NAME[param];
    } else {
      const foundKey = allKeys.find(k => 
        k.toLowerCase() === param || 
        k.toLowerCase().includes(param) || 
        param.includes(k.toLowerCase())
      );
      if (foundKey) {
        resolvedName = foundKey;
      }
    }

    const profile = TEAM_PROFILES[resolvedName] || TEAM_PROFILES["Chennai Super Kings"];
    
    // Ensure chronological history from 2008 to 2026
    const baseHistory = profile.history || [];
    const historyMap = {};
    baseHistory.forEach(h => { historyMap[h.season] = h; });

    const fullHistory = [];
    for (let yr = 2008; yr <= 2026; yr++) {
      const yrStr = String(yr);
      if (historyMap[yrStr]) {
        fullHistory.push({
          ...historyMap[yrStr],
          shortSeason: yrStr.slice(2),
          winPercentage: historyMap[yrStr].matches > 0 ? Math.round((historyMap[yrStr].wins / historyMap[yrStr].matches) * 100) : 0
        });
      } else {
        fullHistory.push({
          season: yrStr,
          shortSeason: yrStr.slice(2),
          captain: "DNP",
          matches: 0,
          wins: 0,
          losses: 0,
          winPercentage: 0
        });
      }
    }

    const activeHistory = baseHistory.filter(h => h.matches > 0);
    const totalMatches = activeHistory.reduce((acc, curr) => acc + curr.matches, 0);
    const totalWins = activeHistory.reduce((acc, curr) => acc + curr.wins, 0);
    const totalLosses = activeHistory.reduce((acc, curr) => acc + curr.losses, 0);
    const winPct = totalMatches > 0 ? ((totalWins / totalMatches) * 100).toFixed(1) : "0.0";

    // Enrich headToHead to ensure match block data is present for all teams
    const enrichedH2H = (profile.headToHead || []).map(h2h => {
      if (h2h.results && h2h.results.length > 0) return h2h;
      return { ...h2h, results: generateMatchBlocks(h2h.won, h2h.lost, h2h.opponent) };
    });

    setTeamData({
      team_name: resolvedName,
      logo: profile.logo,
      description: profile.description,
      winRate: winPct + "%",
      titles: profile.titles,
      trophies: profile.trophies,
      captain: profile.captain,
      coach: profile.coach,
      strengths: profile.strengths || [],
      weaknesses: profile.weaknesses || [],
      squad: profile.squad || [],
      titleWins: profile.titleWins || [],
      milestones: profile.milestones || [],
      topRunScorers: profile.topRunScorers || [],
      topWicketTakers: profile.topWicketTakers || [],
      venueInfo: profile.venueInfo || null,
      headToHead: enrichedH2H,
      rivalries: profile.rivalries || "",
      faqs: profile.faqs || [],
      total_matches: totalMatches,
      wins: totalWins,
      losses: totalLosses,
      yearly_performance: fullHistory,
      seasonsCount: activeHistory.length
    });
  }, []);

  const nrrData = useMemo(() => {
    if (!teamData) return [];
    return generateTournamentNRR(teamData.team_name, selectedSeason);
  }, [teamData, selectedSeason]);

  if (!teamData) return <div className="text-center mt-20 text-xl font-bold text-slate-500">Loading Team Analytics...</div>;

  const finalNRR = nrrData[nrrData.length - 1]?.nrr || 0;
  const isOverallPositive = finalNRR >= 0;

  // Defunct teams identification to hide specific components like modern NRR
  const isDefunct = ["Deccan Chargers", "Kochi Tuskers Kerala", "Pune Warriors India", "Gujarat Lions", "Rising Pune Supergiant"].includes(teamData.team_name);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      <Link to="/teams" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
        <ArrowLeft size={18} /> Back to Franchises
      </Link>

      {/* Header Intelligence Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <img src={teamData.logo} alt={teamData.team_name} className="w-28 h-28 object-contain" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  IPL Intelligence Profile
                </span>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-black">
                  {teamData.trophies}
                </span>
              </div>
              <h1 className="text-4xl font-black text-slate-900">{teamData.team_name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-300 px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Win Rate</p>
              <p className="text-lg font-black text-blue-600">{teamData.winRate}</p>
            </div>
            <div className="bg-slate-50 border border-slate-300 px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Captain</p>
              <p className="text-sm font-black text-slate-900 truncate max-w-[120px]">{teamData.captain}</p>
            </div>
            <div className="bg-slate-50 border border-slate-300 px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Coach</p>
              <p className="text-sm font-black text-slate-900 truncate max-w-[120px]">{teamData.coach}</p>
            </div>
          </div>
        </div>
        <p className="text-slate-700 text-base leading-relaxed border-t border-slate-200 pt-4">
          {teamData.description}
        </p>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Matches</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{teamData.total_matches}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Total Wins</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">{teamData.wins}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Total Losses</p>
          <p className="text-3xl font-black text-rose-600 mt-2">{teamData.losses}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Calculated Win %</p>
          <p className="text-3xl font-black text-blue-600 mt-2">{teamData.winRate}</p>
        </div>
      </div>

      {/* I. SEASON CHRONICLE - Win % By Season Chart */}
      {teamData.yearly_performance.length > 0 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black tracking-wider text-slate-900">I. SEASON CHRONICLE</h2>
            <span className="text-rose-600 font-bold text-sm tracking-widest uppercase">{teamData.seasonsCount} SEASONS</span>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">WIN % BY SEASON (2008 - 2026)</p>
          </div>

          <div className="w-full h-80 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={teamData.yearly_performance} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="season" stroke="#475569" fontWeight={700} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#475569" fontWeight={700} tickLine={false} ticks={[0, 25, 50, 75, 100]} />
                <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="4 4" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="winPercentage" 
                  stroke="#f59e0b" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: "#f59e0b", stroke: "#ffffff", strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Season-by-Season Performance Trend & Captains */}
      {teamData.yearly_performance.length > 1 ? (
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm mt-8">
          <h3 className="text-lg font-black text-slate-900 mb-6 text-center">Season-by-Season Performance Trend & Captains (2008 - 2026)</h3>
          <div className="w-full" style={{ width: '100%', height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={teamData.yearly_performance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="season" stroke="#475569" fontWeight={700} />
                <YAxis stroke="#475569" fontWeight={700} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="wins" name="Wins" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="losses" name="Losses" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}

      {/* II. TOP PERFORMERS */}
      <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-sm space-y-8 mt-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black tracking-wider text-slate-900">II. TOP PERFORMERS</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">TOP BATTERS</h3>
            <div className="space-y-4">
              {teamData.topRunScorers.map((batter, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-extrabold text-slate-900">
                      <span className="text-slate-400 mr-3">{idx + 1}</span> {batter.player}
                    </span>
                    <div className="text-right">
                      <span className="font-black text-slate-900 text-base">{batter.runs}</span>
                      <div className="text-[10px] font-bold text-slate-400">SR {batter.sr} {batter.hs ? `• HS ${batter.hs}` : ''}</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${batter.pct || 50}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">TOP BOWLERS</h3>
            <div className="space-y-4">
              {teamData.topWicketTakers.map((bowler, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-extrabold text-slate-900">
                      <span className="text-slate-400 mr-3">{idx + 1}</span> {bowler.player}
                    </span>
                    <div className="text-right">
                      <span className="font-black text-slate-900 text-base">{bowler.wkts}</span>
                      <div className="text-[10px] font-bold text-slate-400">EC {bowler.econ}</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${bowler.pct || 50}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* III. HEAD TO HEAD */}
      {teamData.headToHead.length > 0 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-sm space-y-8 mt-8">
          <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black tracking-wider text-slate-900">III. HEAD TO HEAD</h2>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">{teamData.team_name} VS ALL OPPONENTS</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamData.headToHead.map((h2h, idx) => {
              const currentHover = hoveredMatch[h2h.opponent] || h2h.results?.[0]?.desc || "Hover over match blocks";
              return (
                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs hover:border-slate-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                      <span className="font-black text-slate-900 text-base">{h2h.opponent}</span>
                    </div>
                    <span className="text-blue-600 font-black text-lg">{h2h.winRate}</span>
                  </div>

                  <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 truncate shadow-2xs">
                    {currentHover}
                  </div>

                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                    {h2h.results && h2h.results.map((resObj, rIdx) => (
                      <div 
                        key={rIdx} 
                        onMouseEnter={() => setHoveredMatch(prev => ({ ...prev, [h2h.opponent]: resObj.desc }))}
                        className={`w-3.5 h-3.5 rounded-xs transition-transform hover:scale-125 cursor-pointer ${
                          resObj.outcome === 'W' ? 'bg-amber-500' : 'bg-slate-800'
                        }`}
                      ></div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 pt-2 border-t border-slate-200">
                    <span>{h2h.won || 0}W • {h2h.lost || 0}L</span>
                    <span>{h2h.played || 0} mat</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* IV. TEAM NRR PROGRESSION - HIDE IF DEFUNCT */}
      {!isDefunct && (
        <div className="bg-white p-8 rounded-3xl border border-slate-300 shadow-sm space-y-8 mt-8">
          <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black tracking-wider text-slate-900">IV. TEAM NRR PROGRESSION</h2>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">Match-by-Match Net Run Rate Analysis ({selectedSeason})</p>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                  <Activity className="text-blue-600" size={16} /> Cumulative Trajectory
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                 <div className={`px-3 py-1.5 rounded border flex items-center gap-2 ${isOverallPositive ? 'bg-emerald-100/50 border-emerald-200' : 'bg-red-100/50 border-red-200'}`}>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Final</span>
                   <span className={`font-mono font-black text-sm ${isOverallPositive ? 'text-emerald-700' : 'text-red-600'}`}>
                     {(isOverallPositive ? '+' : '') + finalNRR.toFixed(3)}
                   </span>
                 </div>

                 <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                    <select
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(e.target.value)}
                      className="pl-8 pr-4 py-1.5 bg-white border border-slate-300 rounded text-xs font-black text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none uppercase tracking-wider"
                    >
                      {seasons.map(year => (
                        <option key={year} value={year}>{year} SEASON</option>
                      ))}
                    </select>
                 </div>
              </div>
            </div>

            {/* Strictly enforced height prevents Recharts from collapsing */}
            <div style={{ width: '100%', height: '350px', minHeight: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={nrrData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="matchNumber" 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={['auto', 'auto']} 
                    tickFormatter={(val) => (val > 0 ? `+${val}` : val)} 
                  />
                  <Tooltip content={<NRRTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} />
                  
                  <Line 
                    type="monotone" 
                    dataKey="nrr" 
                    stroke="#3b82f6" 
                    strokeWidth={3.5} 
                    dot={{ fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2, r: 5 }} 
                    activeDot={{ r: 7, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
                    animationDuration={1200}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tactical Profile: Strengths & Weaknesses */}
      {teamData.strengths.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
              <ShieldCheck size={22} /> Strengths
            </div>
            <ul className="space-y-2">
              {teamData.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700 font-semibold text-sm">
                  <span className="text-emerald-600 font-black">+</span> {str}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-600 font-black text-lg">
              <ShieldAlert size={22} /> Weaknesses
            </div>
            <ul className="space-y-2">
              {teamData.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700 font-semibold text-sm">
                  <span className="text-rose-600 font-black">−</span> {weak}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Registered Squad Preview */}
      {teamData.squad.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4 mt-8">
          <h3 className="text-lg font-black text-slate-900">Key Players · Registered Squad</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamData.squad.map((player, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-300 p-4 rounded-xl flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{player.role}</span>
                  <p className="font-black text-slate-900 mt-1">{player.name}</p>
                  <p className="text-xs font-semibold text-slate-500">{player.stats}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400">DNA</span>
                  <p className="text-lg font-black text-blue-600">{player.dna}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IPL Title Wins History */}
      {teamData.titleWins.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4 mt-8">
          <div className="flex items-center gap-2 text-amber-600 font-black text-lg">
            <Trophy size={28} /> IPL Title Wins & Championships
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamData.titleWins.map((win, idx) => (
              <div key={idx} className="bg-amber-50 border border-amber-300 p-4 rounded-xl space-y-1 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black bg-amber-500 text-white px-2 py-0.5 rounded">{win.season} CHAMPION</span>
                  <span className="text-xs font-bold text-slate-600">POT: {win.pot}</span>
                </div>
                <p className="text-sm font-black text-slate-900 mt-2">{win.match}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Franchise History Milestones */}
      {teamData.milestones.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4 mt-8">
          <h3 className="text-lg font-black text-slate-900">Key Milestones in Franchise History</h3>
          <div className="space-y-3">
            {teamData.milestones.map((mile, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-black bg-blue-600 text-white px-2.5 py-1 rounded-lg">{mile.year}</span>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{mile.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Run Scorers & Wicket Takers ALL-TIME CAREER TABLES */}
      {(teamData.topRunScorers.length > 0 || teamData.topWicketTakers.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {teamData.topRunScorers.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900">Top Run Scorers — All-Time Career</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 text-xs font-bold text-slate-600 uppercase bg-slate-100">
                      <th className="py-2.5 px-4">Player</th>
                      <th className="py-2.5 px-3 text-center">Runs</th>
                      <th className="py-2.5 px-3 text-center">SR</th>
                      <th className="py-2.5 px-3 text-center">Mat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                    {teamData.topRunScorers.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.player}</td>
                        <td className="py-3 px-3 text-center text-emerald-600 font-extrabold">{row.runs}</td>
                        <td className="py-3 px-3 text-center text-slate-600">{row.sr}</td>
                        <td className="py-3 px-3 text-center text-slate-600">{row.mat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {teamData.topWicketTakers.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900">Top Wicket Takers — All-Time Career</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 text-xs font-bold text-slate-600 uppercase bg-slate-100">
                      <th className="py-2.5 px-4">Player</th>
                      <th className="py-2.5 px-3 text-center">Wkts</th>
                      <th className="py-2.5 px-3 text-center">Econ</th>
                      <th className="py-2.5 px-3 text-center">Mat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                    {teamData.topWicketTakers.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.player}</td>
                        <td className="py-3 px-3 text-center text-emerald-600 font-extrabold">{row.wkts}</td>
                        <td className="py-3 px-3 text-center text-slate-600">{row.econ}</td>
                        <td className="py-3 px-3 text-center text-slate-600">{row.mat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Home Venue Intelligence */}
      {teamData.venueInfo && (
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4 mt-8">
          <h3 className="text-lg font-black text-slate-900">Home Venue Intelligence · {teamData.venueInfo.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 shadow-xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Avg 1st Innings</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{teamData.venueInfo.avgInn}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 shadow-xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Pitch Type</p>
              <p className="text-xs font-black text-blue-600 mt-2">{teamData.venueInfo.pitchType}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 shadow-xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Pace vs Spin</p>
              <p className="text-xs font-black text-indigo-600 mt-2">{teamData.venueInfo.paceSpin}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 shadow-xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Dew Factor</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{teamData.venueInfo.dew}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 shadow-xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Capacity</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{teamData.venueInfo.capacity}</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 font-semibold pt-2">{teamData.venueInfo.notes}</p>
        </div>
      )}

      {/* Rivalries */}
      {teamData.rivalries && (
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-2 mt-8">
          <h3 className="text-lg font-black text-slate-900">Rivalries & Head-to-Head Dynamics</h3>
          <p className="text-sm text-slate-700 font-semibold">{teamData.rivalries}</p>
        </div>
      )}

      {/* Frequently Asked Questions */}
      {teamData.faqs.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4 mt-8">
          <h3 className="text-lg font-black text-slate-900">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {teamData.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-300 shadow-xs space-y-1">
                <p className="font-bold text-slate-900 text-sm">{faq.q}</p>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Season Captains & Record Table */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-4 bg-slate-100 text-slate-900 flex justify-between items-center border-b border-slate-300">
          <h2 className="text-lg font-black tracking-wide">Season Captains & Record</h2>
          <span className="text-xs font-semibold text-slate-500">History Records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-xs font-bold text-slate-600 uppercase bg-slate-100">
                <th className="py-3 px-6">Season</th>
                <th className="py-3 px-6">Captain</th>
                <th className="py-3 px-4 text-center">Matches</th>
                <th className="py-3 px-4 text-center">Wins</th>
                <th className="py-3 px-4 text-center">Losses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm font-semibold text-slate-800">
              {teamData.yearly_performance.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-extrabold text-slate-900">{row.season}</td>
                  <td className="py-4 px-6 text-amber-700 font-bold flex items-center gap-2">
                    <User size={15} /> {row.captain}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-600">{row.matches}</td>
                  <td className="py-4 px-4 text-center text-emerald-600 font-bold">{row.wins}</td>
                  <td className="py-4 px-4 text-center text-rose-600 font-bold">{row.losses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;