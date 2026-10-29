// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const teamService = {
  getAllTeams: () => apiClient.get('/teams/'),
  getTeamStats: (teamId) => apiClient.get(`/teams/${teamId}/stats`),
};

export const playerService = {
  getAllPlayers: () => apiClient.get('/players/'),
  getPlayerStats: (playerId) => apiClient.get(`/players/${playerId}/stats`),
};

export const matchService = {
  getRecentMatches: () => apiClient.get('/matches/'),
  getMatchAnalytics: (matchId) => apiClient.get(`/matches/${matchId}/analytics`),
};

export const seasonService = {
  getLatestSeasonSummary: () => apiClient.get('/seasons/latest'),
  getAllSeasons: () => apiClient.get('/seasons/'),
  getSeasonStats: (seasonId) => apiClient.get(`/seasons/${seasonId}/stats`),
};

export const recordService = {
  getAllTimeRecords: () => apiClient.get('/records/'),
};

export default apiClient;