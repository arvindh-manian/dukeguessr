import { endGame } from '@/utils/game'
import { NextResponse } from 'next/server'

/**
 * Ends the game and updates the database.
 *
 * @param {Object} request - The request object containing the data to send. Body has uuid, guesses, and score.
 * @return {Promise} - A promise that resolves to the new achievements
 */
export async function POST (request) {
  const body = await request.json()
  const uuid = body.uuid
  const guesses = body.guesses
  const score = body.score

  const resp = await endGame(guesses, score, uuid)
  return NextResponse.json(resp)
}
