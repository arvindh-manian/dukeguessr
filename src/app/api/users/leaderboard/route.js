import { NextResponse } from 'next/server'
import { getLeaderboard } from '@/utils/user'
/**
 * Retrieves the leaderboard data and returns a JSON response.
 *
 * @param {Object} request - The request object.
 * @return {Promise} A JSON response containing the leaderboard data or an error message with a 500 status code.
 */
export async function GET (request, { params }) {
  const resp = await getLeaderboard()
  if (resp) {
    return NextResponse.json(resp)
  } else {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export const revalidate = 0
//export const fetchCache = 'force-no-store';
