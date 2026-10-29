from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_all_records():
    return {
        "batting_legends": {
            "highest_individual_scores": [
                {"rank": 1, "player": "CH Gayle", "against": "PWI", "year": 2013, "score": "175*", "detail": "66b • 13/17"},
                {"rank": 2, "player": "BB McCullum", "against": "RCB", "year": 2008, "score": "158*", "detail": "73b • 10/13"},
                {"rank": 3, "player": "KL Rahul", "against": "PBKS", "year": 2026, "score": "152*", "detail": "67b • 16/9"},
                {"rank": 4, "player": "Abhishek Sharma", "against": "PBKS", "year": 2025, "score": "141", "detail": "55b • 14/10"},
                {"rank": 5, "player": "Q de Kock", "against": "KKR", "year": 2022, "score": "140*", "detail": "70b • 10/10"},
                {"rank": 6, "player": "Abhishek Sharma", "against": "DC", "year": 2026, "score": "135*", "detail": "68b • 10/10"},
                {"rank": 7, "player": "AB de Villiers", "against": "MI", "year": 2015, "score": "133*", "detail": "59b • 19/4"},
                {"rank": 8, "player": "KL Rahul", "against": "RCB", "year": 2020, "score": "132*", "detail": "69b • 14/7"},
                {"rank": 9, "player": "AB de Villiers", "against": "GL", "year": 2016, "score": "129*", "detail": "52b • 10/12"},
                {"rank": 10, "player": "Shubman Gill", "against": "MI", "year": 2023, "score": "129", "detail": "60b • 7/10"}
            ],
            "most_career_runs": [
                {"rank": 1, "player": "V Kohli", "matches": 282, "stat": "9,336", "detail": "HS 113 • SR 134.8"},
                {"rank": 2, "player": "RG Sharma", "matches": 281, "stat": "7,329", "detail": "HS 109 • SR 132.9"},
                {"rank": 3, "player": "S Dhawan", "matches": 222, "stat": "6,769", "detail": "HS 106 • SR 127.1"},
                {"rank": 4, "player": "DA Warner", "matches": 184, "stat": "6,565", "detail": "HS 126 • SR 139.8"},
                {"rank": 5, "player": "KL Rahul", "matches": 160, "stat": "5,815", "detail": "HS 152 • SR 139.1"},
                {"rank": 6, "player": "SK Raina", "matches": 204, "stat": "5,528", "detail": "HS 100 • SR 136.7"},
                {"rank": 7, "player": "MS Dhoni", "matches": 277, "stat": "5,439", "detail": "HS 84 • SR 137.5"},
                {"rank": 8, "player": "AM Rahane", "matches": 212, "stat": "5,367", "detail": "HS 105 • SR 125.6"},
                {"rank": 9, "player": "SV Samson", "matches": 190, "stat": "5,181", "detail": "HS 119 • SR 141.1"},
                {"rank": 10, "player": "AB de Villiers", "matches": 183, "stat": "5,162", "detail": "HS 133 • SR 151.7"}
            ]
        },
        "bowling_greats": {
            "best_bowling_figures": [
                {"rank": 1, "player": "AS Joseph", "against": "SRH", "year": 2019, "figures": "6/12", "econ": "Econ 3.27"},
                {"rank": 2, "player": "Sohail Tanvir", "against": "CSK", "year": 2008, "figures": "6/14", "econ": "Econ 3.50"},
                {"rank": 3, "player": "A Zampa", "against": "SRH", "year": 2016, "figures": "6/19", "econ": "Econ 4.75"},
                {"rank": 4, "player": "A Kumble", "against": "RR", "year": 2009, "figures": "5/5", "econ": "Econ 1.58"},
                {"rank": 5, "player": "Akash Madhwal", "against": "LSG", "year": 2023, "figures": "5/5", "econ": "Econ 1.43"},
                {"rank": 6, "player": "JJ Bumrah", "against": "KKR", "year": 2022, "figures": "5/10", "econ": "Econ 2.50"},
                {"rank": 7, "player": "MM Sharma", "against": "MI", "year": 2023, "figures": "5/10", "econ": "Econ 4.29"},
                {"rank": 8, "player": "I Sharma", "against": "KTK", "year": 2011, "figures": "5/12", "econ": "Econ 4.00"},
                {"rank": 9, "player": "SL Malinga", "against": "DC", "year": 2011, "figures": "5/13", "econ": "Econ 3.55"},
                {"rank": 10, "player": "MA Wood", "against": "DC", "year": 2023, "figures": "5/14", "econ": "Econ 3.50"}
            ],
            "most_career_wickets": [
                {"rank": 1, "player": "YS Chahal", "matches": 189, "stat": "233", "detail": "Econ 8.05"},
                {"rank": 2, "player": "B Kumar", "matches": 206, "stat": "226", "detail": "Econ 7.71"},
                {"rank": 3, "player": "SP Narine", "matches": 201, "stat": "207", "detail": "Econ 6.79"},
                {"rank": 4, "player": "PP Chawla", "matches": 192, "stat": "192", "detail": "Econ 7.96"},
                {"rank": 5, "player": "R Ashwin", "matches": 219, "stat": "187", "detail": "Econ 7.20"},
                {"rank": 6, "player": "JJ Bumrah", "matches": 158, "stat": "187", "detail": "Econ 7.34"},
                {"rank": 7, "player": "DJ Bravo", "matches": 160, "stat": "183", "detail": "Econ 8.38"},
                {"rank": 8, "player": "RA Jadeja", "matches": 267, "stat": "180", "detail": "Econ 7.71"},
                {"rank": 9, "player": "Rashid Khan", "matches": 153, "stat": "179", "detail": "Econ 7.28"},
                {"rank": 10, "player": "A Mishra", "matches": 162, "stat": "174", "detail": "Econ 7.38"}
            ]
        },
        "team_records": {
            "highest_team_totals": [
                {"rank": 1, "team": "SRH", "against": "RCB", "year": 2024, "score": "287/3", "overs": "20.0 ov"},
                {"rank": 2, "team": "SRH", "against": "RR", "year": 2025, "score": "286/6", "overs": "20.0 ov"},
                {"rank": 3, "team": "SRH", "against": "KKR", "year": 2025, "score": "278/3", "overs": "20.0 ov"},
                {"rank": 4, "team": "SRH", "against": "MI", "year": 2024, "score": "277/3", "overs": "20.0 ov"},
                {"rank": 5, "team": "KKR", "against": "DC", "year": 2024, "score": "272/7", "overs": "20.0 ov"},
                {"rank": 6, "team": "SRH", "against": "DC", "year": 2024, "score": "266/7", "overs": "20.0 ov"},
                {"rank": 7, "team": "PBKS", "against": "DC", "year": 2026, "score": "265/4", "overs": "18.5 ov"},
                {"rank": 8, "team": "DC", "against": "PBKS", "year": 2026, "score": "264/2", "overs": "20.0 ov"},
                {"rank": 9, "team": "RCB", "against": "PWI", "year": 2013, "score": "263/5", "overs": "20.0 ov"},
                {"rank": 10, "team": "RCB", "against": "SRH", "year": 2024, "score": "262/7", "overs": "20.0 ov"}
            ],
            "lowest_team_totals": [
                {"rank": 1, "team": "RCB", "against": "DC", "year": 2015, "score": "2/0", "overs": "1.1 ov"},
                {"rank": 2, "team": "KKR", "against": "PBKS", "year": 2025, "score": "7/0", "overs": "1.0 ov"},
                {"rank": 3, "team": "RR", "against": "RCB", "year": 2019, "score": "41/1", "overs": "3.2 ov"},
                {"rank": 4, "team": "SRH", "against": "DC", "year": 2014, "score": "44/2", "overs": "4.2 ov"},
                {"rank": 5, "team": "KKR", "against": "SRH", "year": 2017, "score": "48/3", "overs": "5.2 ov"},
                {"rank": 6, "team": "RCB", "against": "KKR", "year": 2017, "score": "49/10", "overs": "9.4 ov"},
                {"rank": 7, "team": "CSK", "against": "KKR", "year": 2008, "score": "55/0", "overs": "8.0 ov"},
                {"rank": 8, "team": "RR", "against": "RCB", "year": 2009, "score": "58/10", "overs": "15.1 ov"},
                {"rank": 9, "team": "DC", "against": "PBKS", "year": 2009, "score": "58/0", "overs": "4.5 ov"},
                {"rank": 10, "team": "RR", "against": "RCB", "year": 2023, "score": "59/10", "overs": "10.3 ov"}
            ]
        },
        "chase_masters": {
            "highest_successful_chases": [
                {"rank": 1, "team": "PBKS", "against": "DC", "year": 2026, "score": "265/4", "chasing": "chasing 265"},
                {"rank": 2, "team": "PBKS", "against": "KKR", "year": 2024, "score": "262/2", "chasing": "chasing 262"},
                {"rank": 3, "team": "SRH", "against": "MI", "year": 2026, "score": "249/4", "chasing": "chasing 244"},
                {"rank": 4, "team": "SRH", "against": "PBKS", "year": 2025, "score": "247/2", "chasing": "chasing 246"},
                {"rank": 5, "team": "RCB", "against": "LSG", "year": 2025, "score": "230/4", "chasing": "chasing 228"},
                {"rank": 6, "team": "MI", "against": "LSG", "year": 2026, "score": "229/4", "chasing": "chasing 229"},
                {"rank": 7, "team": "SRH", "against": "RR", "year": 2026, "score": "229/5", "chasing": "chasing 229"},
                {"rank": 8, "team": "RR", "against": "PBKS", "year": 2026, "score": "228/4", "chasing": "chasing 223"},
                {"rank": 9, "team": "DC", "against": "RR", "year": 2026, "score": "226/3", "chasing": "chasing 226"},
                {"rank": 10, "team": "RR", "against": "PBKS", "year": 2020, "score": "226/6", "chasing": "chasing 224"}
            ],
            "most_career_sixes": [
                {"rank": 1, "player": "CH Gayle", "matches": 141, "stat": "357", "detail": "4,965 runs"},
                {"rank": 2, "player": "RG Sharma", "matches": 281, "stat": "324", "detail": "7,329 runs"},
                {"rank": 3, "player": "V Kohli", "matches": 282, "stat": "317", "detail": "9,336 runs"},
                {"rank": 4, "player": "MS Dhoni", "matches": 277, "stat": "264", "detail": "5,439 runs"},
                {"rank": 5, "player": "AB de Villiers", "matches": 183, "stat": "251", "detail": "5,162 runs"},
                {"rank": 6, "player": "SV Samson", "matches": 190, "stat": "243", "detail": "5,181 runs"},
                {"rank": 7, "player": "KL Rahul", "matches": 160, "stat": "239", "detail": "5,815 runs"},
                {"rank": 8, "player": "DA Warner", "matches": 184, "stat": "236", "detail": "6,565 runs"},
                {"rank": 9, "player": "AD Russell", "matches": 139, "stat": "223", "detail": "2,651 runs"},
                {"rank": 10, "player": "KA Pollard", "matches": 189, "stat": "223", "detail": "3,412 runs"}
            ]
        },
        "highest_partnerships": [
            {"rank": 1, "partnership": "AB de Villiers & V Kohli", "wicket": "2nd wkt", "year": 2016, "runs": "229", "detail": "96b"},
            {"rank": 2, "partnership": "KL Rahul & N Rana", "wicket": "2nd wkt", "year": 2026, "runs": "220", "detail": "95b"},
            {"rank": 3, "partnership": "AB de Villiers & V Kohli", "wicket": "2nd wkt", "year": 2015, "runs": "215", "detail": "101b"},
            {"rank": 4, "partnership": "B Sai Sudharsan & Shubman Gill", "wicket": "1st wkt", "year": 2024, "runs": "210", "detail": "104b"},
            {"rank": 5, "partnership": "KL Rahul & Q de Kock", "wicket": "1st wkt", "year": 2022, "runs": "210", "detail": "120b"},
            {"rank": 6, "partnership": "AC Gilchrist & SE Marsh", "wicket": "2nd wkt", "year": 2011, "runs": "206", "detail": "96b"},
            {"rank": 7, "partnership": "B Sai Sudharsan & Shubman Gill", "wicket": "1st wkt", "year": 2025, "runs": "205", "detail": "114b"},
            {"rank": 8, "partnership": "CH Gayle & V Kohli", "wicket": "2nd wkt", "year": 2012, "runs": "204", "detail": "106b"},
            {"rank": 9, "partnership": "DA Warner & NV Ojha", "wicket": "2nd wkt", "year": 2012, "runs": "189", "detail": "98b"},
            {"rank": 10, "partnership": "DA Warner & JM Bairstow", "wicket": "1st wkt", "year": 2019, "runs": "185", "detail": "98b"}
        ]
    }