import { NextResponse } from 'next/server'
import { addUser } from '@/utils/user.js'

/**
 * Handles creation of users.
 *
 * @param {Object} request - The request object containing the POST data. Body has username, password, and email
 * @return {NextResponse} The response object containing the status
 */
export async function POST (request) {
  const body = await request.json()
  const username = body.username
  const password = body.password
  const email = body.email
  addUser(username, email, password)
  return NextResponse.json({
    status: 'good.'
  })
}
