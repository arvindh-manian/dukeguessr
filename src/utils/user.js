import { query } from './db'

/**
 * Retrieves the leaderboard from the database.
 *
 * @return {Array} An array of rows representing the leaderboard.
 */
export async function getLeaderboard () {
  const text = await query(`
    SELECT *
    FROM account
    LEFT JOIN records ON records.username = account.username
    ORDER BY records.high_score DESC NULLS LAST`)
  return text.rows
}

/**
 * Retrieves a user's information from the database.
 *
 * @param {string} username - The username of the user to retrieve.
 * @return {object} The user object containing all the information from the database.
 */
export async function getUser (username) {
  const text = await query(
    'SELECT * FROM account LEFT JOIN records ON records.username = account.username WHERE account.username=$1',
    [username]
  )
  return text.rows[0]
}

/**
 * Adds a new user to the Account table.
 *
 * @param {string} username - The username of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @return {void}
 */
export async function addUser (username, email, password) {
  let insertQuery = `
    INSERT INTO Account (username, email, password)
    VALUES ($1, $2, $3)
    `

  const text = await query(insertQuery, [username, email, password])
  //revalidatePath("/users/leaderboard");
  return
}
