import { query } from "./db";

export async function createGame(uuid) {
    await query("INSERT INTO game VALUES (1, 0, 'test'");
    const text = await query("SELECT * FROM location WHERE image_id = 1");
    return {"locations": text.rows[0]};
}