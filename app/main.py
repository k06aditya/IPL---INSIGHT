from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import home, matches, teams, players, records, seasons

app = FastAPI(title="IPL Insight API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home.router, prefix="/api/v1/home", tags=["Home"])
app.include_router(matches.router, prefix="/api/v1/matches", tags=["Matches"])
app.include_router(teams.router, prefix="/api/v1/teams", tags=["Teams"])
app.include_router(players.router, prefix="/api/v1/players", tags=["Players"])
app.include_router(records.router, prefix="/api/v1/records", tags=["Records"])
app.include_router(seasons.router, prefix="/api/v1/seasons", tags=["Seasons"])

@app.get("/")
def read_root():
    return {"message": "IPL Insight API is running"}