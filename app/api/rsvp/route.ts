import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import nodemailer from 'nodemailer'

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Andikaferdi11',
  database: process.env.DB_NAME || 'wedding_rsvp',
  port: parseInt(process.env.DB_PORT || '3306'),
}

// Email configuration
const emailConfig = {
  host: 'mail.masdika.biz.id',
  port: 587,
  secure: false,
  auth: {
    user: 'me@masdika.biz.id',
    pass: 'Andikaferdi11'
  }
}

interface RSVPData {
  name: string
  attendance: string
  guestCount: string
  message: string
}

// Create database connection
async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    return connection
  } catch (error) {
    console.error('Database connection error:', error)
    throw new Error('Failed to connect to database')
  }
}

// Initialize database table
async function initializeDatabase() {
  const connection = await createConnection()
  
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS rsvp_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        attendance ENUM('hadir', 'tidak-hadir') NOT NULL,
        guest_count INT DEFAULT 1,
        message TEXT,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_attendance (attendance),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    
    console.log('Database table initialized successfully')
  } catch (error) {
    console.error('Database initialization error:', error)
    throw error
  } finally {
    await connection.end()
  }
}

// Send email notification
async function sendEmailNotification(rsvpData: RSVPData & { id: number; timestamp: string }) {
  try {
    const transporter = nodemailer.createTransport(emailConfig)

    const attendanceText = rsvpData.attendance === 'hadir' ? 'HADIR' : 'TIDAK HADIR'
    const guestCountText = rsvpData.guestCount ? `${rsvpData.guestCount} orang` : 'Tidak disebutkan'

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d97706, #ea580c); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #d97706; }
          .label { font-weight: bold; color: #d97706; }
          .value { margin-left: 10px; }
          .message-box { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border: 1px solid #ddd; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .status-hadir { color: #059669; font-weight: bold; }
          .status-tidak-hadir { color: #dc2626; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💌 RSVP Konfirmasi Kehadiran</h1>
            <p>Ririn & Andika Wedding</p>
          </div>
          
          <div class="content">
            <h2>Ada konfirmasi kehadiran baru!</h2>
            
            <div class="info-row">
              <span class="label">👤 Nama:</span>
              <span class="value">${rsvpData.name}</span>
            </div>
            
            <div class="info-row">
              <span class="label">📅 Status Kehadiran:</span>
              <span class="value ${rsvpData.attendance === 'hadir' ? 'status-hadir' : 'status-tidak-hadir'}">${attendanceText}</span>
            </div>
            
            <div class="info-row">
              <span class="label">👥 Jumlah Tamu:</span>
              <span class="value">${guestCountText}</span>
            </div>
            
            <div class="info-row">
              <span class="label">🕐 Waktu Submit:</span>
              <span class="value">${new Date(rsvpData.timestamp).toLocaleString('id-ID', { 
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} WIB</span>
            </div>
            
            ${rsvpData.message ? `
              <div class="message-box">
                <div class="label">💬 Ucapan & Doa:</div>
                <p style="margin: 10px 0 0 0; font-style: italic;">"${rsvpData.message}"</p>
              </div>
            ` : ''}
            
            <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 5px; border-left: 4px solid #f59e0b;">
              <strong>📊 ID Submission:</strong> #${rsvpData.id}
            </div>
          </div>
          
          <div class="footer">
            <p>Email ini dikirim otomatis dari sistem RSVP Wedding Ririn & Andika</p>
            <p>17 Oktober 2025 • Sidoarjo, Jawa Timur</p>
          </div>
        </div>
      </body>
      </html>
    `

    const mailOptions = {
      from: {
        name: 'Wedding RSVP System',
        address: 'me@masdika.biz.id'
      },
      to: ['andikaferdialvianto@gmail.com', 'rsulistiani93@gmail.com'],
      subject: `🎉 RSVP Baru: ${rsvpData.name} - ${attendanceText}`,
      html: htmlContent,
      text: `
RSVP Konfirmasi Kehadiran Baru

Nama: ${rsvpData.name}
Status: ${attendanceText}
Jumlah Tamu: ${guestCountText}
Waktu: ${new Date(rsvpData.timestamp).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB

${rsvpData.message ? `Ucapan & Doa: "${rsvpData.message}"` : ''}

ID Submission: #${rsvpData.id}

---
Wedding Ririn & Andika
17 Oktober 2025
      `
    }

    await transporter.sendMail(mailOptions)
    console.log('Email notification sent successfully')
  } catch (error) {
    console.error('Email sending error:', error)
    // Don't throw error here to avoid failing the RSVP submission
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize database on first request
    await initializeDatabase()

    const body: RSVPData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.attendance) {
      return NextResponse.json(
        { error: 'Nama dan konfirmasi kehadiran wajib diisi' },
        { status: 400 }
      )
    }

    // Validate attendance value
    if (!['hadir', 'tidak-hadir'].includes(body.attendance)) {
      return NextResponse.json(
        { error: 'Status kehadiran tidak valid' },
        { status: 400 }
      )
    }

    // Get client information
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const connection = await createConnection()

    try {
      // Insert RSVP data
      const [result] = await connection.execute(
        `INSERT INTO rsvp_submissions (name, attendance, guest_count, message, ip_address, user_agent) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          body.name.trim(),
          body.attendance,
          parseInt(body.guestCount) || 1,
          body.message?.trim() || null,
          clientIP,
          userAgent
        ]
      ) as any

      const insertId = result.insertId
      const timestamp = new Date().toISOString()

      // Prepare data for email
      const emailData = {
        ...body,
        id: insertId,
        timestamp
      }

      // Send email notification (async, don't wait)
      sendEmailNotification(emailData).catch(error => {
        console.error('Failed to send email notification:', error)
      })

      // Log for monitoring
      console.log('New RSVP submission:', {
        id: insertId,
        name: body.name,
        attendance: body.attendance,
        guestCount: body.guestCount,
        timestamp
      })

      return NextResponse.json({
        success: true,
        message: 'Konfirmasi kehadiran berhasil dikirim',
        data: {
          id: insertId,
          name: body.name,
          attendance: body.attendance,
          guestCount: body.guestCount,
          timestamp
        }
      })

    } finally {
      await connection.end()
    }

  } catch (error) {
    console.error('RSVP submission error:', error)
    
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan saat memproses konfirmasi',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check for admin access (simple auth)
    const authHeader = request.headers.get('authorization')
    const adminToken = process.env.ADMIN_TOKEN || 'admin123'
    
    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      )
    }

    await initializeDatabase()
    const connection = await createConnection()

    try {
      // Get all RSVP submissions with statistics
      const [submissions] = await connection.execute(`
        SELECT 
          id,
          name,
          attendance,
          guest_count,
          message,
          created_at,
          ip_address
        FROM rsvp_submissions 
        ORDER BY created_at DESC
      `)

      const [stats] = await connection.execute(`
        SELECT 
          COUNT(*) as total_submissions,
          SUM(CASE WHEN attendance = 'hadir' THEN 1 ELSE 0 END) as total_attending,
          SUM(CASE WHEN attendance = 'tidak-hadir' THEN 1 ELSE 0 END) as total_not_attending,
          SUM(CASE WHEN attendance = 'hadir' THEN guest_count ELSE 0 END) as total_guests
        FROM rsvp_submissions
      `) as any

      return NextResponse.json({
        success: true,
        data: submissions,
        statistics: stats[0],
        timestamp: new Date().toISOString()
      })

    } finally {
      await connection.end()
    }

  } catch (error) {
    console.error('Error fetching RSVP data:', error)
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan saat mengambil data',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
