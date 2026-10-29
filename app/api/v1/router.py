# backend/app/api/v1/router.py
from fastapi import APIRouter
from app.api.v1.endpoints import teams, players, matches, seasons, records

api_router = APIRouter()

api_router.include_router(teams.router, prefix="/teams", tags=["Teams"])
api_router.include_router(players.router, prefix="/players", tags=["Players"])
api_router.include_router(matches.router, prefix="/matches", tags=["Matches"])
api_router.include_router(seasons.router, prefix="/seasons", tags=["Seasons"])
api_router.include_router(records.router, prefix="/records", tags=["Records"])