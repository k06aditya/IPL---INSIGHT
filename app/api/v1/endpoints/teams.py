# backend/app/api/v1/endpoints/teams.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import get_db

router = APIRouter()

@router.get("/")
def get_all_teams(db: Session = Depends(get_db)):
    """Fetch all IPL teams."""
    result = db.execute(text("SELECT id, name FROM teams ORDER BY name;"))
    teams = [{"id": row[0], "name": row[1]} for row in result.fetchall()]
    return teams

@router.get("/{team_id}/stats")
def get_team_stats(team_id: int, db: Session = Depends(get_db)):
    """Dynamically calculate a team's overall analytics."""
    
    # 1. Verify Team Exists
    team = db.execute(text("SELECT name FROM teams WHERE id = :id"), {"id": team_id}).fetchone()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
        
    # 2. Dynamic SQL Calculations for Matches, Wins, Losses
    stats_query = text("""
        SELECT 
            COUNT(id) as total_matches,
            SUM(CASE WHEN winner_id = :team_id THEN 1 ELSE 0 END) as wins,
            SUM(CASE WHEN winner_id != :team_id AND result = 'completed' THEN 1 ELSE 0 END) as losses,
            SUM(CASE WHEN result != 'completed' THEN 1 ELSE 0 END) as no_results
        FROM matches 
        WHERE team1_id = :team_id OR team2_id = :team_id;
    """)
    
    stats = db.execute(stats_query, {"team_id": team_id}).fetchone()
    
    return {
        "team_id": team_id,
        "team_name": team[0],
        "total_matches": stats[0] or 0,
        "wins": stats[1] or 0,
        "losses": stats[2] or 0,
        "no_results": stats[3] or 0,
        "win_percentage": round((stats[1] / stats[0] * 100), 2) if stats[0] else 0
    }