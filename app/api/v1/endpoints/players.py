from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import get_db

router = APIRouter()

@router.get("/")
def get_all_players(db: Session = Depends(get_db)):
    try:
        # Simplest possible query to prevent locking
        query = text("SELECT id, name FROM players LIMIT 300")
        result = db.execute(query).fetchall()
        return [{"id": r[0], "name": r[1].strip(), "total_runs": 0} for r in result]
    except Exception as e:
        print("Error fetching players:", e)
        return []

@router.get("/{player_id}")
def get_player_profile(player_id: str, db: Session = Depends(get_db)):
    # Look up player robustly (handling string or int IDs)
    player = db.execute(text("SELECT id, name FROM players WHERE id = :id OR id = :str_id LIMIT 1"), {"id": player_id, "str_id": str(player_id)}).fetchone()
    
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    matches, runs, hs, wickets = 0, 0, 0, 0

    try:
        # Safe Batting Stats
        batting = db.execute(text("SELECT COUNT(DISTINCT match_id), SUM(total_runs), MAX(total_runs) FROM deliveries WHERE batter_id = :id OR batsman_id = :id"), {"id": player[0]}).fetchone()
        matches = batting[0] if batting and batting[0] else 0
        runs = batting[1] if batting and batting[1] else 0
        hs = batting[2] if batting and batting[2] else 0
    except Exception as e:
        print("Batting query error:", e)
        pass

    try:
        # Safe Bowling Stats
        bowling = db.execute(text("SELECT SUM(CASE WHEN is_wicket = 1 OR is_wicket = '1' OR is_wicket = 'TRUE' THEN 1 ELSE 0 END) FROM deliveries WHERE bowler_id = :id"), {"id": player[0]}).fetchone()
        wickets = bowling[0] if bowling and bowling[0] else 0
    except Exception as e:
        print("Bowling query error:", e)
        pass

    return {
        "id": player[0],
        "name": player[1].strip(),
        "matches": matches,
        "runs": runs,
        "highest_score": hs,
        "wickets": wickets
    }