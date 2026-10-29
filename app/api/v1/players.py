# backend/app/api/v1/router.py
from fastapi import APIRouter
from app.api.v1.endpoints import teams, players

api_router = APIRouter()

api_router.include_router(teams.router, prefix="/teams", tags=["Teams"])
api_router.include_router(players.router, prefix="/players", tags=["Players"])