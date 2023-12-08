import { NextResponse } from 'next/server'

/**
 * Log the received messages
 *
 * @param {Object} request - The request object containing the request details.
 * @return {Promise<Object>} - A promise that resolves to a JSON object with the success status.
 */
export async function POST (request) {
  const body = await request.json()
  const name = body.name
  const message = body.message
  const email = body.email

  console.log(name + ' with email ' + email + ' says: ' + message)

  return NextResponse.json({ success: true })
}
