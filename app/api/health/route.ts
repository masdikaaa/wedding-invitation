import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Andikaferdi11',
  database: process.env.DB_NAME || 'wedding_rsvp',
  port: parseInt(process.env.DB_PORT || '3306'),
}

export async function GET() {
  try {
    // Check database connection
    const connection = await mysql.createConnection(dbConfig)
    await connection.ping()
    await connection.end()

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        application: 'running'
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
        services: {
          database: 'disconnected',
          application: 'running'
        }
      },
      { status: 503 }
    )
  }
}
