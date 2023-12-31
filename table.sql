CREATE TABLE Account(
    username VARCHAR(256) NOT NULL PRIMARY KEY,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE Game(
    game_id SERIAL NOT NULL PRIMARY KEY,
    score INTEGER,
    mode VARCHAR(20) NOT NULL
);

CREATE TABLE Records(
    username VARCHAR(256) NOT NULL PRIMARY KEY REFERENCES Account(username),
    high_score INTEGER,
    avg_score DECIMAL,
    games_played INTEGER,
    within_10_feet BOOLEAN,
    over_1000_miles BOOLEAN,
    one_game_played BOOLEAN,
    five_games_played BOOLEAN,
    ten_games_played BOOLEAN
);

CREATE TABLE Location(
    image_id SERIAL NOT NULL PRIMARY KEY,
    image_file VARCHAR(256) NOT NULL UNIQUE,
    lat DECIMAL(8, 6) NOT NULL,
    long DECIMAL(9, 6) NOT NULL
);

CREATE TABLE Mode(
    image_id INTEGER NOT NULL PRIMARY KEY REFERENCES Location(image_id),
    game_mode VARCHAR(20) NOT NULL
);

CREATE TABLE Guess(
    image_id INTEGER NOT NULL PRIMARY KEY REFERENCES Location(image_id),
    lat_guess DECIMAL(8, 6) NOT NULL,
    long_guess DECIMAL(9, 6) NOT NULL
);

CREATE TABLE Play(
    username VARCHAR(256) NOT NULL REFERENCES Account(username),
    game_id INTEGER NOT NULL REFERENCES Game(game_id),
    PRIMARY KEY(username, game_id)
);

CREATE TABLE Element(
    game_id INTEGER NOT NULL REFERENCES Game(game_id),
    image_id INTEGER NOT NULL REFERENCES Location(image_id),
    PRIMARY KEY(game_id, image_id)
);

CREATE INDEX Location_Index ON Location(lat, long);