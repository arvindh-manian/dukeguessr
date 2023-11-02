import { query } from "./db";

export async function createGame(uuid) {
    const temp_id = await query("INSERT INTO game VALUES(DEFAULT, NULL, 'test') RETURNING game_id");
    const text = await query("SELECT * FROM location ORDER BY RANDOM () LIMIT 5");
    for (let i = 0; i < 5; i++) {
        await query("INSERT INTO element VALUES ($1, $2)", [temp_id.rows[0].game_id, text.rows[i].image_id]);
    }
    return text.rows;
}

export async function endGame(guesses, score, uuid) {
    // TODO: Change this to be a function of game_id instead of uuid and mark games as completed
        // This solves the case of a duplicated request causing issues
    const text = await query("SELECT * FROM Records WHERE username = $1", [uuid]);
    var match = t.rows[0];
    if (!match) {
        // Insert new user into database if not present
        const insert_query = `INSERT INTO Records (username) VALUES ($1)`;
        await query(insert_query, [uuid]);

        match = {
            high_score: 0,
            avg_score: 0,
            games_played: 0,
            within_10_feet: false,
            over_1000_miles: false,
            one_game_played: false,
            five_games_played: false,
            ten_games_played: false
        };
    }
    const new_high_score = Math.max(match.high_score, score);
    const new_games_played = match.games_played + 1;
    const new_avg_score = (match.avg_score * match.games_played + score) / new_games_played;
    const closest_guess = Math.min(guesses.map((guess) => guess.distance));
    const farthest_guess = Math.max(guesses.map((guess) => guess.distance));
    const new_within_10_feet = match.within_10_feet || (closest_guess <= 10);
    const new_over_1000_miles = match.over_1000_miles || (farthest_guess >= 1000);
    const new_one_game_played = match.one_game_played || (new_games_played >= 1);
    const new_five_games_played = match.five_games_played || (new_games_played >= 5);
    const new_ten_games_played = match.ten_games_played || (new_games_played >= 10);
    const query_text = `UPDATE Records SET high_score = $1, avg_score = $2, games_played = $3, within_10_feet = $4, over_1000_miles = $5, one_game_played = $6, five_games_played = $7, ten_games_played = $8 WHERE username = $9`;
    await query(query_text, [new_high_score, new_avg_score, new_games_played, new_within_10_feet, new_over_1000_miles, new_one_game_played, new_five_games_played, new_ten_games_played, uuid]);

    return [{
        high_score: new_high_score,
        avg_score: new_avg_score,
        games_played: new_games_played,
        within_10_feet: new_within_10_feet,
        over_1000_miles: new_over_1000_miles,
        one_game_played: new_one_game_played,
        five_games_played: new_five_games_played,
        ten_games_played: new_ten_games_played
    },
        match
    ];
}