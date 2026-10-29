-- database/schema.sql

-- 1. Dimension Tables
CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    year INT UNIQUE NOT NULL
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    cricsheet_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- 2. Fact Table: Matches
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    cricsheet_match_id INT UNIQUE NOT NULL,
    season_id INT REFERENCES seasons(id),
    date DATE NOT NULL,
    venue VARCHAR(150),
    city VARCHAR(100),
    team1_id INT REFERENCES teams(id),
    team2_id INT REFERENCES teams(id),
    toss_winner_id INT REFERENCES teams(id),
    toss_decision VARCHAR(20),
    winner_id INT REFERENCES teams(id),
    result VARCHAR(50),
    result_margin INT,
    player_of_match_id INT REFERENCES players(id)
);

-- 3. Fact Table: Deliveries (Ball-by-Ball)
CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES matches(id) ON DELETE CASCADE,
    inning INT NOT NULL,
    over_no INT NOT NULL,
    ball_no INT NOT NULL,
    batting_team_id INT REFERENCES teams(id),
    bowling_team_id INT REFERENCES teams(id),
    batter_id INT REFERENCES players(id),
    bowler_id INT REFERENCES players(id),
    non_striker_id INT REFERENCES players(id),
    batter_runs INT NOT NULL DEFAULT 0,
    extra_runs INT NOT NULL DEFAULT 0,
    total_runs INT NOT NULL DEFAULT 0,
    is_wide BOOLEAN NOT NULL DEFAULT FALSE,
    is_noball BOOLEAN NOT NULL DEFAULT FALSE,
    is_legbye BOOLEAN NOT NULL DEFAULT FALSE,
    is_bye BOOLEAN NOT NULL DEFAULT FALSE,
    is_wicket BOOLEAN NOT NULL DEFAULT FALSE,
    dismissal_kind VARCHAR(50),
    player_out_id INT REFERENCES players(id),
    fielder_id INT REFERENCES players(id)
);

-- 4. B-Tree Indexes for Performance
CREATE INDEX idx_deliveries_match_id ON deliveries(match_id);
CREATE INDEX idx_deliveries_batter_id ON deliveries(batter_id);
CREATE INDEX idx_deliveries_bowler_id ON deliveries(bowler_id);
CREATE INDEX idx_matches_season_id ON matches(season_id);
CREATE INDEX idx_matches_team1_id ON matches(team1_id);
CREATE INDEX idx_matches_team2_id ON matches(team2_id);