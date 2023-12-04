import { NextResponse } from 'next/server'

export async function POST (request) {
  const body = await request.json()
  const name = body.name
  const message = body.message
  const email = body.email

  console.log(name + ' with email ' + email + ' says: ' + message)

  return NextResponse.json({ success: true })
}
