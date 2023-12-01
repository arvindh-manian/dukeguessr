import { query } from "./db";

export async function createGame(uuid, mode, num_images) {
    const westLats = {lower: 35.99430815017746, upper: 36.00667182204735}
    const westLongs = {lower: -78.9459561590145, upper: -78.93605360751229}

    const eastLats = {lower: 36.00263641201658, upper: 36.00975115010499}
    const eastLongs = {lower: -78.92078837645336, upper: -78.91208046540619}

    const gardensLats = {lower: 36.000410851950775, upper: 36.00522423590298}
    const gardensLongs = {lower: -78.9359986394505, upper: -78.92988761485728}

    const dukeLats = {lower: 35.98786056801792, upper: 36.01730613973231}
    const dukeLongs = {lower: -78.96292089018712, upper: -78.90470648047639}
    let q = `
    SELECT * FROM Location 
    WHERE ((lat > $1) AND (lat < $2) AND (long > $3) AND (long < $4)) 
    ORDER BY RANDOM () 
    LIMIT $5
    `;
    let lats = [-999, 999];
    let longs = [-999, 999];
    let limit = 9999;
    if (num_images != null && num_images != 0){
        limit = num_images;
    }

    if (mode == "west") {
        lats = westLats;
        longs = westLongs;
    } else if (mode == "east") {
        lats = eastLats;
        longs = eastLongs;
    } else if (mode == "gardens") {
        lats = gardensLats;
        longs = gardensLongs;
    }
    
    const temp_id = await query("INSERT INTO game VALUES(DEFAULT, NULL, 'test') RETURNING game_id");
    const text = await query(q, [lats.lower, lats.upper, longs.lower, longs.upper, limit]);
    let num_returned = text.rows.length;
    for (let i = 0; i < num_returned; i++) {
        await query("INSERT INTO element VALUES ($1, $2)", [temp_id.rows[0].game_id, text.rows[i].image_id]);
    }
    return text.rows;
}

export async function endGame(guesses, score, uuid) {
    // TODO: Change this to be a function of game_id instead of uuid and mark games as completed
        // This solves the case of a duplicated request causing issues
    const text = await query("SELECT * FROM Records WHERE username = $1", [uuid]);
    var match = text.rows[0];
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