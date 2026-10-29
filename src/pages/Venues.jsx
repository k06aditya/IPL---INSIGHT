// frontend/src/pages/Venues.jsx
import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

const VENUES_DATA = [
  { rank: 1, name: "Wankhede Stadium", city: "Mumbai", mat: 132, avg1: "173.1", avg2: "162.0", high: 249, low: 67, winBatFirst: "45%", topScorer: "RG Sharma", runs: 2632, topWktTaker: "SL Malinga", wkts: 68 },
  { rank: 2, name: "Eden Gardens", city: "Kolkata", mat: 106, avg1: "170.0", avg2: "154.7", high: 262, low: 74, winBatFirst: "45%", topScorer: "G Gambhir", runs: 1407, topWktTaker: "SP Narine", wkts: 79 },
  { rank: 3, name: "Arun Jaitley Stadium", city: "Delhi", mat: 103, avg1: "172.9", avg2: "158.4", high: 278, low: 44, winBatFirst: "48%", topScorer: "DA Warner", runs: 1048, topWktTaker: "A Mishra", wkts: 58 },
  { rank: 4, name: "M Chinnaswamy Stadium", city: "Bengaluru", mat: 103, avg1: "173.8", avg2: "157.2", high: 287, low: 82, winBatFirst: "44%", topScorer: "V Kohli", runs: 3448, topWktTaker: "YS Chahal", wkts: 54 },
  { rank: 5, name: "MA Chidambaram Stadium", city: "Chennai", mat: 98, avg1: "165.6", avg2: "152.3", high: 246, low: 70, winBatFirst: "53%", topScorer: "MS Dhoni", runs: 1547, topWktTaker: "R Ashwin", wkts: 52 },
  { rank: 6, name: "Rajiv Gandhi Intl Stadium", city: "Hyderabad", mat: 89, avg1: "168.7", avg2: "156.6", high: 286, low: 80, winBatFirst: "47%", topScorer: "DA Warner", runs: 1623, topWktTaker: "B Kumar", wkts: 48 },
  { rank: 7, name: "Sawai Mansingh Stadium", city: "Jaipur", mat: 68, avg1: "169.1", avg2: "155.8", high: 229, low: 59, winBatFirst: "35%", topScorer: "AM Rahane", runs: 1115, topWktTaker: "SK Trivedi", wkts: 36 },
  { rank: 8, name: "PCA IS Bindra Stadium", city: "Chandigarh", mat: 61, avg1: "168.3", avg2: "157.4", high: 257, low: 67, winBatFirst: "44%", topScorer: "SE Marsh", runs: 1064, topWktTaker: "PP Chawla", wkts: 26 },
  { rank: 9, name: "Narendra Modi Stadium", city: "Ahmedabad", mat: 53, avg1: "180.7", avg2: "162.2", high: 243, low: 86, winBatFirst: "50%", topScorer: "Shubman Gill", runs: 1384, topWktTaker: "Rashid Khan", wkts: 34 },
  { rank: 10, name: "Dubai Intl Stadium", city: "Dubai", mat: 46, avg1: "163.8", avg2: "149.1", high: 219, low: 109, winBatFirst: "49%", topScorer: "KL Rahul", runs: 606, topWktTaker: "YS Chahal", wkts: 19 },
  { rank: 11, name: "Dr DY Patil Academy", city: "Navi Mumbai", mat: 37, avg1: "159.6", avg2: "148.0", high: 216, low: 82, winBatFirst: "46%", topScorer: "RV Uthappa", runs: 359, topWktTaker: "DJ Bravo", wkts: 9 },
  { rank: 12, name: "MCA Stadium", city: "Pune", mat: 35, avg1: "168.3", avg2: "149.3", high: 211, low: 73, winBatFirst: "51%", topScorer: "SPD Smith", runs: 469, topWktTaker: "Imran Tahir", wkts: 15 },
  { rank: 13, name: "Sheikh Zayed Stadium", city: "Abu Dhabi", mat: 29, avg1: "158.9", avg2: "145.6", high: 206, low: 70, winBatFirst: "41%", topScorer: "SA Yadav", runs: 413, topWktTaker: "JJ Bumrah", wkts: 13 },
  { rank: 14, name: "Ekana Cricket Stadium", city: "Lucknow", mat: 28, avg1: "176.6", avg2: "166.5", high: 235, low: 108, winBatFirst: "41%", topScorer: "MR Marsh", runs: 571, topWktTaker: "Ravi Bishnoi", wkts: 20 },
  { rank: 15, name: "Sharjah Cricket Stadium", city: "Sharjah", mat: 28, avg1: "159.0", avg2: "147.5", high: 228, low: 85, winBatFirst: "36%", topScorer: "V Kohli", runs: 285, topWktTaker: "Mohammed Shami", wkts: 14 },
  { rank: 16, name: "Brabourne Stadium", city: "Mumbai", mat: 27, avg1: "178.5", avg2: "166.1", high: 217, low: 68, winBatFirst: "52%", topScorer: "S Dhawan", runs: 295, topWktTaker: "KK Ahmed", wkts: 10 },
  { rank: 17, name: "HPCA Stadium", city: "Dharamsala", mat: 18, avg1: "195.1", avg2: "166.9", high: 254, low: 116, winBatFirst: "61%", topScorer: "SE Marsh", runs: 334, topWktTaker: "PP Chawla", wkts: 13 },
  { rank: 18, name: "ACA-VDCA Stadium", city: "Visakhapatnam", mat: 17, avg1: "169.5", avg2: "141.9", high: 272, low: 76, winBatFirst: "53%", topScorer: "S Dhawan", runs: 294, topWktTaker: "A Zampa", wkts: 10 },
  { rank: 19, name: "Maharaja Yadavindra", city: "New Chandigarh", mat: 17, avg1: "186.6", avg2: "176.1", high: 254, low: 95, winBatFirst: "47%", topScorer: "Priyansh Arya", runs: 340, topWktTaker: "Arshdeep Singh", wkts: 15 },
  { rank: 20, name: "Subrata Roy Sahara", city: "Pune", mat: 16, avg1: "149.4", avg2: "133.6", high: 187, low: 99, winBatFirst: "63%", topScorer: "RV Uthappa", runs: 418, topWktTaker: "R Sharma", wkts: 11 },
  { rank: 21, name: "Kingsmead", city: "Durban", mat: 15, avg1: "152.0", avg2: "138.2", high: 211, low: 79, winBatFirst: "60%", topScorer: "Yuvraj Singh", runs: 182, topWktTaker: "IK Pathan", wkts: 10 },
  { rank: 22, name: "SuperSport Park", city: "Centurion", mat: 12, avg1: "154.8", avg2: "149.6", high: 189, low: 105, winBatFirst: "33%", topScorer: "SK Raina", runs: 182, topWktTaker: "A Mishra", wkts: 7 },
  { rank: 23, name: "SCA Stadium", city: "Rajkot", mat: 10, avg1: "168.9", avg2: "162.7", high: 213, low: 131, winBatFirst: "33%", topScorer: "SK Raina", runs: 328, topWktTaker: "AJ Tye", wkts: 7 },
  { rank: 24, name: "Holkar Cricket Stadium", city: "Indore", mat: 9, avg1: "160.3", avg2: "158.8", high: 245, low: 88, winBatFirst: "11%", topScorer: "KL Rahul", runs: 195, topWktTaker: "AJ Tye", wkts: 7 },
  { rank: 25, name: "Zayed Cricket Stadium", city: "Abu Dhabi", mat: 8, avg1: "159.0", avg2: "150.4", high: 235, low: 92, winBatFirst: "38%", topScorer: "RD Gaikwad", runs: 141, topWktTaker: "JJ Bumrah", wkts: 7 },
  { rank: 26, name: "Barsapara Cricket Stadium", city: "Guwahati", mat: 8, avg1: "168.9", avg2: "157.6", high: 202, low: 123, winBatFirst: "50%", topScorer: "YBK Jaiswal", runs: 236, topWktTaker: "YS Chahal", wkts: 6 },
  { rank: 27, name: "New Wanderers Stadium", city: "Johannesburg", mat: 8, avg1: "144.0", avg2: "142.5", high: 166, low: 123, winBatFirst: "38%", topScorer: "JH Kallis", runs: 151, topWktTaker: "A Nehra", wkts: 6 },
  { rank: 28, name: "St George's Park", city: "Port Elizabeth", mat: 7, avg1: "159.0", avg2: "131.4", high: 187, low: 87, winBatFirst: "43%", topScorer: "JP Duminy", runs: 139, topWktTaker: "SL Malinga", wkts: 5 },
  { rank: 29, name: "Newlands", city: "Cape Town", mat: 7, avg1: "139.4", avg2: "112.6", high: 184, low: 58, winBatFirst: "67%", topScorer: "R Dravid", runs: 114, topWktTaker: "RP Singh", wkts: 6 },
  { rank: 30, name: "Barabati Stadium", city: "Cuttack", mat: 7, avg1: "167.7", avg2: "157.7", high: 231, low: 126, winBatFirst: "57%", topScorer: "RV Uthappa", runs: 152, topWktTaker: "SP Narine", wkts: 4 },
  { rank: 31, name: "JSCA Intl Stadium", city: "Ranchi", mat: 7, avg1: "149.0", avg2: "144.7", high: 189, low: 114, winBatFirst: "29%", topScorer: "MS Dhoni", runs: 138, topWktTaker: "RA Jadeja", wkts: 8 },
  { rank: 32, name: "SVNS Intl Stadium", city: "Raipur", mat: 6, avg1: "146.3", avg2: "143.8", high: 164, low: 119, winBatFirst: "33%", topScorer: "DA Warner", runs: 207, topWktTaker: "UT Yadav", wkts: 4 },
  { rank: 33, name: "Nehru Stadium", city: "Kochi", mat: 5, avg1: "146.8", avg2: "125.8", high: 162, low: 74, winBatFirst: "60%", topScorer: "DPMD Jayawardene", runs: 111, topWktTaker: "R Vinay Kumar", wkts: 7 },
  { rank: 34, name: "Green Park", city: "Kanpur", mat: 4, avg1: "161.3", avg2: "163.3", high: 197, low: 12, winBatFirst: "40%", topScorer: "SK Raina", runs: 119, topWktTaker: "DR Smith", wkts: 6 },
  { rank: 35, name: "De Beers Diamond Oval", city: "Kimberley", mat: 3, avg1: "158.0", avg2: "141.0", high: 169, low: 113, winBatFirst: "33%", topScorer: "A Symonds", runs: 90, topWktTaker: "RG Sharma", wkts: 5 },
  { rank: 36, name: "Buffalo Park", city: "East London", mat: 3, avg1: "147.3", avg2: "119.0", high: 178, low: 100, winBatFirst: "67%", topScorer: "BJ Hodge", runs: 73, topWktTaker: "SB Jakati", wkts: 4 },
  { rank: 37, name: "VCA Stadium", city: "Nagpur", mat: 3, avg1: "149.3", avg2: "144.7", high: 159, low: 138, winBatFirst: "67%", topScorer: "RG Sharma", runs: 132, topWktTaker: "RJ Harris", wkts: 7 },
  { rank: 38, name: "OUTsurance Oval", city: "Bloemfontein", mat: 2, avg1: "135.0", avg2: "129.5", high: 150, low: 120, winBatFirst: "50%", topScorer: "AB de Villiers", runs: 90, topWktTaker: "MF Maharoof", wkts: 4 },
  { rank: 39, name: "SVNS Intl Stadium", city: "Raipur", mat: 2, avg1: "179.0", avg2: "180.5", high: 194, low: 16, winBatFirst: "60%", topScorer: "V Kohli", runs: 105, topWktTaker: "B Kumar", wkts: 5 }
];

export default function Venues() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 mt-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          
          {/* Header Section */}
          <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-10 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="text-blue-600 dark:text-blue-400" size={32} />
                <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-mono">Venues</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
                Every ground that has hosted an IPL match since 2008. Breaking down average first and second innings scores, bat-first versus chase win percentages, scoring dynamics, and venue records across all 39 grounds.
              </p>
            </div>
            
            <div className="flex gap-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl">
              <div>
                <div className="text-4xl font-black text-slate-900 dark:text-white">39</div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Venues</div>
              </div>
              <div>
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400">1,237</div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Matches</div>
              </div>
            </div>
          </div>
          
          {/* Venues Table */}
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-800">
                  <th className="py-4 px-4 text-center font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">#</th>
                  <th className="py-4 px-4 text-left font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">Venue</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">Mat</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">Avg 1st</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">Avg 2nd</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">High</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">Low</th>
                  <th className="py-4 px-4 text-center font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">Win% <span className="text-[9px] lowercase text-slate-400 block mt-0.5">(Bat 1st)</span></th>
                  <th className="py-4 px-4 text-left font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">Top Scorer</th>
                  <th className="py-4 px-4 text-left font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px]">Top Wkt Taker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {VENUES_DATA.map((v) => (
                  <tr key={v.rank} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer">
                    <td className="py-4 px-4 text-center text-sm font-black text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{v.rank}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-[14px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{v.name}</div>
                      <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wide uppercase mt-0.5">{v.city}</div>
                    </td>
                    <td className="py-4 px-4 text-center font-black text-slate-900 dark:text-white text-sm">{v.mat}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-600 dark:text-slate-300 text-sm">{v.avg1}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-600 dark:text-slate-300 text-sm">{v.avg2}</td>
                    <td className="py-4 px-4 text-center font-black text-blue-600 dark:text-blue-400 text-sm">{v.high}</td>
                    <td className="py-4 px-4 text-center font-black text-rose-600 dark:text-rose-400 text-sm">{v.low}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black px-2.5 py-1.5 rounded text-[11px]">{v.winBatFirst}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-[13px]">{v.topScorer}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{v.runs} runs</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200 text-[13px]">{v.topWktTaker}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{v.wkts} wkts</div>
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
}