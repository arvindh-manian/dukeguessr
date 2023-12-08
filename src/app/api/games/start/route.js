import { NextResponse } from 'next/server'
import { createGame } from '@/utils/game'

/**
 * Handles a POST request and creates a game.
 *
 * @param {Object} request - the request object
 * @param {Object} params - the params object
 * @return {Object} the response object
 */
export async function POST (request, { params }) {
  const data = await request.json()
  const mode = data.mode
  const num_images = data.num_images
  const resp = await createGame('', mode, num_images) // for now UUID is arbitrary since it's not used; later will be validated in middleware vs a JWT and then passed
  if (resp) {
    return NextResponse.json(resp)
  } else {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
