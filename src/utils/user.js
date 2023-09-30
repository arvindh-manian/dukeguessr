import { query } from "./db";

export async function getUsers() {
    const text = await query("SELECT * FROM TEST_TABLE");
    return text.rows;
}

export async function getUser(uuid) {
    // mocked data

    return {
        "uuid": uuid,
        "username": "abcdefgh",
        "email": "a.b@example.com",
        "records": {
            "high_score": 10,
            "games_played": 6,
            "avg_score": 3
        }
    }
}