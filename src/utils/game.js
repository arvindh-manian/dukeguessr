import { query } from "./db";

export async function createGame(uuid) {
    const temp_id = await query("INSERT INTO game VALUES(DEFAULT, NULL, 'test') RETURNING game_id");
    const text = await query("SELECT * FROM location ORDER BY RANDOM () LIMIT 5");
    for (let i = 0; i < 1; i++) {
        await query("INSERT INTO element VALUES ($1, $2)", [temp_id.rows[0].game_id, text.rows[i].image_id]);
    }
    return text.rows;
}