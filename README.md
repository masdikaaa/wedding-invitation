# 💒 Wedding Invitation - Ririn & Andika

Sebuah website undangan pernikahan yang elegan dengan sistem RSVP terintegrasi, database MySQL, dan notifikasi email otomatis.

## ✨ Fitur Utama

- 🎨 **Design Responsif** - Tampilan yang indah di semua perangkat
- 🌙 **Dark Mode** - Mode gelap yang nyaman untuk mata
- 🎵 **Background Music** - Musik latar yang dapat dikontrol
- 📱 **Mobile Friendly** - Optimized untuk mobile dan tablet
- 💌 **RSVP System** - Sistem konfirmasi kehadiran dengan database
- 📧 **Email Notifications** - Notifikasi email otomatis ke pengantin
- 🗺️ **Google Maps Integration** - Lokasi acara terintegrasi
- 💳 **Digital Gift** - Informasi rekening untuk kado digital
- 🎭 **Smooth Animations** - Animasi yang halus dan menarik

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Database**: MySQL 8.0
- **Email**: Nodemailer dengan SMTP
- **Deployment**: Docker & Docker Compose
- **Reverse Proxy**: Caddy

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (untuk development)
- Git

### 1. Clone Repository

\`\`\`bash
git clone <repository-url>
cd wedding-invitation
\`\`\`

### 2. Setup Environment

\`\`\`bash
# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
\`\`\`

### 3. Deploy dengan Docker

\`\`\`bash
# Build dan jalankan semua services
docker compose up -d

# Cek status containers
docker compose ps

# Lihat logs
docker compose logs -f wedding-app
\`\`\`

### 4. Akses Aplikasi

- **Website**: http://localhost
- **Direct App**: http://localhost:3000
- **Database**: localhost:3306

## 📧 Konfigurasi Email

Email sudah dikonfigurasi dengan:
- **SMTP Host**: mail.masdika.biz.id
- **Username**: me@masdika.biz.id
- **Password**: Password
- **Recipients**: 
  - masdika.my.id@gmail.com
  - rsulistyani93@gmail.com

## 🗄️ Database Schema

### Table: rsvp_submissions

\`\`\`sql
CREATE TABLE rsvp_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    attendance ENUM('hadir', 'tidak-hadir') NOT NULL,
    guest_count INT DEFAULT 1,
    message TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

## 🔧 Development

### Local Development

\`\`\`bash
# Install dependencies
npm install

# Setup database (manual)
# Create MySQL database: wedding_rsvp
# Run: mysql-init/01-init.sql

# Set environment variables
DB_ROOT_PASSWORD=Password
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=Password
DB_NAME=wedding_rsvp
DB_PORT=3306
ADMIN_TOKEN=Password

# Run development server
npm run dev
\`\`\`

### Build untuk Production

\`\`\`bash
# Build aplikasi
npm run build

# Start production server
npm start
\`\`\`

## 📊 API Endpoints

### POST /api/rsvp
Submit RSVP confirmation

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "attendance": "hadir",
  "guestCount": "2",
  "message": "Selamat untuk kalian berdua!"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Konfirmasi kehadiran berhasil dikirim",
  "data": {
    "id": 1,
    "name": "John Doe",
    "attendance": "hadir",
    "guestCount": "2",
    "timestamp": "2025-01-15T10:30:00.000Z"
  }
}
\`\`\`

### GET /api/rsvp
Get all RSVP submissions (Admin only)

**Headers:**
\`\`\`
Authorization: Bearer admin123
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [...],
  "statistics": {
    "total_submissions": 25,
    "total_attending": 20,
    "total_not_attending": 5,
    "total_guests": 45
  }
}
\`\`\`

## 🐳 Docker Commands

\`\`\`bash
# Build image
docker build -t wedding-invitation .

# Run container
docker run -p 3000:3000 wedding-invitation

# Docker Compose
docker compose up -d          # Start services
docker compose down           # Stop services
docker compose logs -f        # View logs
docker compose restart        # Restart services

# Database access
docker compose exec mysql mysql -u user -p Password
\`\`\`

## 🔒 Security Features

- Rate limiting pada API endpoints
- SQL injection protection
- XSS protection headers
- Input validation dan sanitization
- Secure email configuration
- Environment variables untuk sensitive data

## 📱 Mobile Optimization

- Responsive design untuk semua screen sizes
- Touch-friendly interface
- Optimized images dan assets
- Fast loading dengan caching
- Progressive Web App ready

## 🎨 Customization

### Mengubah Tema Warna

Edit file `tailwind.config.js`:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color'
      }
    }
  }
}
\`\`\`

### Mengubah Konten

Edit komponen di `app/page.tsx`:
- Nama mempelai
- Tanggal dan lokasi
- Informasi rekening
- Pesan dan ucapan

## 🚨 Troubleshooting

### Database Connection Error

\`\`\`bash
# Cek status MySQL container
docker compose ps mysql

# Restart MySQL
docker compose restart mysql

# Cek logs
docker compose logs mysql
\`\`\`

### Email Not Sending

1. Cek konfigurasi SMTP di `app/api/rsvp/route.ts`
2. Verify email credentials
3. Check firewall settings
4. Review email logs

### Build Errors

\`\`\`bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
\`\`\`

## 📈 Monitoring

### Health Check

\`\`\`bash
# Check application health
curl http://localhost:3000/api/health

# Check database
docker compose exec mysql mysqladmin ping
\`\`\`

### Logs

\`\`\`bash
# Application logs
docker compose logs -f wedding_app

# Database logs
docker compose logs -f wedding_mysql

# Caddy logs
docker compose logs -f wedding_caddy
\`\`\`

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

Open Source project untuk Masdika

## 👥 Support

Untuk pertanyaan atau bantuan:
- Email: me@masdika.biz.id
---

**Made with ❤️ for Masdika.BIZ.ID**
*17 Oktober 2025 • Sidoarjo, Jawa Timur*
