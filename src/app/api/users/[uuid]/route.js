import { NextResponse } from 'next/server'
import { getUser } from '@/utils/user'
/**
 * Retrieves a user based on the UUID provided in the request parameters.
 *
 * @param {Object} request - The request object containing information about the HTTP request.
 * @param {Object} request.params - The parameters object containing the UUID.
 * @param {string} request.params.uuid - The UUID of the user to retrieve.
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object containing the user data, or an error response if something went wrong.
 */
export async function GET (request, { params }) {
  const uuid = params.uuid
  const resp = await getUser(uuid)
  if (resp) {
    return NextResponse.json(resp)
  } else {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
