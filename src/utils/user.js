import { query } from "./db";

export async function getLeaderboard() {
    const text = await query(`
    SELECT *
    FROM account
    LEFT JOIN records ON records.username = account.username
    ORDER BY records.high_score DESC NULLS LAST`);
    return text.rows;
}

export async function getUser(username) {
    const text = await query("SELECT * FROM account LEFT JOIN records ON records.username = account.username WHERE account.username=$1", [username]);
    return text.rows[0];
}

export async function addUser(username, email, password) {
    let insertQuery = `
    INSERT INTO Account (username, email, password)
    VALUES ($1, $2, $3)
    `

    const text = await query(insertQuery, [username, email, password]);
    //revalidatePath("/users/leaderboard");
    return;
}