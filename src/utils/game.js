import { parse } from 'postcss'
import { query } from './db'

/**
 * Creates a game with the specified parameters.
 *
 * @param {string} uuid - The UUID of the user.
 * @param {string} mode - The mode of the game (west, east, gardens, or default).
 * @param {number} num_images - The number of images for the game (optional).
 * @return {[Object]} - The images for the game and their latitudes/longitudes
 */
export async function createGame (uuid, mode, num_images) {
  const westLats = { lower: 35.99430815017746, upper: 36.00667182204735 }
  const westLongs = { lower: -78.9459561590145, upper: -78.93605360751229 }

  const eastLats = { lower: 36.00263641201658, upper: 36.00975115010499 }
  const eastLongs = { lower: -78.92078837645336, upper: -78.91208046540619 }

  const gardensLats = { lower: 36.000410851950775, upper: 36.00522423590298 }
  const gardensLongs = { lower: -78.9359986394505, upper: -78.92988761485728 }

  const dukeLats = { lower: 35.98786056801792, upper: 36.01730613973231 }
  const dukeLongs = { lower: -78.96292089018712, upper: -78.90470648047639 }
  let q = `
    SELECT * FROM Location 
    WHERE ((lat > $1) AND (lat < $2) AND (long > $3) AND (long < $4)) 
    ORDER BY RANDOM () 
    LIMIT $5
    `
  let lats = { lower: -999, upper: 999 }
  let longs = { lower: -999, upper: 999 }
  let limit = 9999
  if (num_images != null && num_images != 0) {
    limit = num_images
  }

  if (mode == 'west') {
    lats = westLats
    longs = westLongs
  } else if (mode == 'east') {
    lats = eastLats
    longs = eastLongs
  } else if (mode == 'gardens') {
    lats = gardensLats
    longs = gardensLongs
  } else {
    lats = dukeLats
    longs = dukeLongs
  }

  const temp_id = await query(
    "INSERT INTO game VALUES(DEFAULT, NULL, 'test') RETURNING game_id"
  )
  const text = await query(q, [
    lats.lower,
    lats.upper,
    longs.lower,
    longs.upper,
    limit
  ])
  let num_returned = text.rows.length
  for (let i = 0; i < num_returned; i++) {
    await query('INSERT INTO element VALUES ($1, $2)', [
      temp_id.rows[0].game_id,
      text.rows[i].image_id
    ])
  }
  return text.rows
}

/**
 * Calculates the changes in achievements based on the given parameters.
 *
 * @param {object} oldAchievements - The old achievements object.
 * @param {array} distances - An array of the distances of the guesses.
 * @param {number} games_played - The number of games played.
 * @return {object} An object containing the changes in achievements.
 */
function getAchievementChanges (oldAchievements, distances, games_played) {
  const new_within_10_feet = Math.min(...distances) <= 10
  const new_over_1000_miles = Math.max(...distances) / 5280 >= 1000
  const new_one_game_played = true
  const new_five_games_played = games_played + 1 >= 5
  const new_ten_games_played = games_played + 1 >= 10
  return {
    within_10_feet: new_within_10_feet && !oldAchievements.within_10_feet,
    over_1000_miles: new_over_1000_miles && !oldAchievements.over_1000_miles,
    one_game_played: new_one_game_played && !oldAchievements.one_game_played,
    five_games_played:
      new_five_games_played && !oldAchievements.five_games_played,
    ten_games_played: new_ten_games_played && !oldAchievements.ten_games_played
  }
}

/**
 * Updates the game records and achievements for the user after ending the game.
 *
 * @param {Array} guesses - The array of guesses made by the user during the game. See frontend for schema.
 * @param {number} score - The score achieved by the user in the game.
 * @param {string} uuid - The unique identifier of the user.
 * @return {Array} - An array of achievements that have changed for the user. This is used to render the achievement popup in the frontend.
 */
export async function endGame (guesses, score, uuid) {
  await query('BEGIN')

  const text = await query('SELECT * FROM Records WHERE username = $1', [uuid])
  var match = text.rows[0]
  if (!match) {
    // Insert new user into database if not present
    const insert_query = `INSERT INTO Records (username) VALUES ($1)`
    await query(insert_query, [uuid])

    match = {
      high_score: 0,
      avg_score: 0,
      games_played: 0,
      within_10_feet: false,
      over_1000_miles: false,
      one_game_played: false,
      five_games_played: false,
      ten_games_played: false
    }
  }
  const distances = guesses.map(guess => guess.distance)
  // console.log(distances);
  const achievementChanges = getAchievementChanges(
    match,
    distances,
    match.games_played
  )
  const {
    within_10_feet,
    over_1000_miles,
    one_game_played,
    five_games_played,
    ten_games_played
  } = achievementChanges
  const new_within_10_feet = match.within_10_feet || within_10_feet
  const new_over_1000_miles = match.over_1000_miles || over_1000_miles
  const new_one_game_played = match.one_game_played || one_game_played
  const new_five_games_played = match.five_games_played || five_games_played
  const new_ten_games_played = match.ten_games_played || ten_games_played
  const new_high_score = Math.max(match.high_score, score)
  const new_games_played = match.games_played + 1
  const new_avg_score =
    (match.avg_score * match.games_played + score) / new_games_played
  const query_text = `UPDATE Records SET high_score = $1, avg_score = $2, games_played = $3, within_10_feet = $4, over_1000_miles = $5, one_game_played = $6, five_games_played = $7, ten_games_played = $8 WHERE username = $9`
  await query(query_text, [
    new_high_score,
    new_avg_score,
    new_games_played,
    new_within_10_feet,
    new_over_1000_miles,
    new_one_game_played,
    new_five_games_played,
    new_ten_games_played,
    uuid
  ])

  await query('COMMIT')
  // get the achievements that changed and return them
  return Object.keys(achievementChanges).filter(key => achievementChanges[key])
}
