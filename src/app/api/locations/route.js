import { NextResponse } from 'next/server'
import ExifReader from 'exifreader'
import { query } from '../../../utils/db'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

/**
 * Posts an image to the server and saves its location in the database.
 *
 * @param {Request} request - The request object containing the image to be uploaded.
 * @return {NextResponse} A JSON response object containing the latitude and longitude of the uploaded image.
 */
export async function POST (request) {
  const formData = await request.formData()

  const file = formData.get('image')

  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }

  const fileType = file.type
  const extension = fileType.split('/')[1]

  const buffer = Buffer.from(await file.arrayBuffer())
  const tags = await ExifReader.load(buffer)
  const lat = tags.GPSLatitude.description
  const lon = tags.GPSLongitude.description

  if (!lat || !lon) {
    return NextResponse.json({ error: 'No lat/lon' }, { status: 400 })
  }

  // upload image to s3
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY
    },
    region: 'us-east-1'
  })

  const uuid = uuidv4()

  const url = `https://dukeguessrbucket.s3.amazonaws.com/${uuid}.${extension}`

  const result = await client.send(
    new PutObjectCommand({
      Bucket: 'dukeguessrbucket',
      Key: `${uuid}.${extension}`,
      Body: buffer
    })
  )

  const res = await query('INSERT INTO Location VALUES (DEFAULT, $1, $2, $3)', [
    url,
    lat,
    lon
  ])

  return NextResponse.json({ lat, lon })
}
