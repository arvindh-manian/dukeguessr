import { parse } from "postcss";
import { query } from "./db";

export async function createGame(uuid) {
    const temp_id = await query("INSERT INTO game VALUES(DEFAULT, NULL, 'test') RETURNING game_id");
    const text = await query("SELECT * FROM location ORDER BY RANDOM () LIMIT 5");
    for (let i = 0; i < 5; i++) {
        await query("INSERT INTO element VALUES ($1, $2)", [temp_id.rows[0].game_id, text.rows[i].image_id]);
    }
    return text.rows;
}

function getAchievementChanges(oldAchievements, distances, games_played) {
    const new_within_10_feet = Math.min(...distances) <= 10;
    const new_over_1000_miles = Math.max(...distances) / 5280 >= 1000;
    const new_one_game_played = true;
    const new_five_games_played = games_played + 1 >= 5;
    const new_ten_games_played = games_played + 1 >= 10;
    return {
        within_10_feet: new_within_10_feet && !oldAchievements.within_10_feet,
        over_1000_miles: new_over_1000_miles && !oldAchievements.over_1000_miles,
        one_game_played: new_one_game_played && !oldAchievements.one_game_played,
        five_games_played: new_five_games_played && !oldAchievements.five_games_played,
        ten_games_played: new_ten_games_played && !oldAchievements.ten_games_played
    };
}

export async function endGame(guesses, score, uuid) {

    await query("BEGIN");


    console.log('ending game for ' + uuid);
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
    const distances = guesses.map((guess) => guess.distance);
    // console.log(distances);
    const achievementChanges = getAchievementChanges(match, distances, match.games_played);
    const { within_10_feet, over_1000_miles, one_game_played, five_games_played, ten_games_played } = achievementChanges;
    const new_within_10_feet = match.within_10_feet || within_10_feet;
    const new_over_1000_miles = match.over_1000_miles || over_1000_miles;
    const new_one_game_played = match.one_game_played || one_game_played;
    const new_five_games_played = match.five_games_played || five_games_played;
    const new_ten_games_played = match.ten_games_played || ten_games_played;
    const new_high_score = Math.max(match.high_score, score);
    const new_games_played = match.games_played + 1;
    const new_avg_score = (match.avg_score * match.games_played + score) / new_games_played;
    const query_text = `UPDATE Records SET high_score = $1, avg_score = $2, games_played = $3, within_10_feet = $4, over_1000_miles = $5, one_game_played = $6, five_games_played = $7, ten_games_played = $8 WHERE username = $9`;
    await query(query_text, [new_high_score, new_avg_score, new_games_played, new_within_10_feet, new_over_1000_miles, new_one_game_played, new_five_games_played, new_ten_games_played, uuid]);

    await query("COMMIT");
    return Object.keys(achievementChanges).filter((key) => achievementChanges[key]);
}