![Tech Stack](https://img.shields.io/badge/Next.js-14-blue?style=flat-square\&logo=nextdotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square\&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.3-3178C6?style=flat-square\&logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square\&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=flat-square\&logo=docker)
![Caddy](https://img.shields.io/badge/Caddy-2.7-0B3D91?style=flat-square\&logo=caddy)

---

## 🖼️ Preview

| Tampilan Awal                                                                                     | RSVP Form                                                                                      |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| ![Tampilan Awal](./preview/Screenshot%202025-08-08%20004737.png) | ![RSVP Form](./preview/Screenshot%202025-08-08%20004949.png) |

---

# 💒 Wedding Invitation – Ririn & Andika

**Sebuah website undangan pernikahan digital elegan** dengan fitur RSVP interaktif, notifikasi email otomatis, dan integrasi dengan Google Maps serta sistem hadiah digital.

> Dibuat dengan ❤️ oleh [Masdika.BIZ.ID](https://masdika.biz.id) untuk momen spesial:
> *17 Oktober 2025 – Sidoarjo, Jawa Timur*

---

## ✨ Fitur Utama

* 🎨 **Desain Responsif** – Tampil elegan di semua ukuran layar
* 🌙 **Dark Mode** – Mode malam yang nyaman untuk mata
* 🎵 **Background Music** – Musik latar dengan kontrol suara
* 📱 **Mobile-Friendly** – Optimisasi penuh untuk smartphone
* 💌 **RSVP System** – Konfirmasi kehadiran langsung via web
* 📧 **Email Notification** – Notifikasi otomatis ke email mempelai
* 🗘️ **Google Maps** – Lokasi acara langsung di peta
* 💳 **Digital Gift** – Kado digital via rekening
* 🎭 **Smooth Animations** – Transisi animasi lembut dan modern

---

## 💠 Tech Stack

| Layer        | Tools & Frameworks                             |
| ------------ | ---------------------------------------------- |
| **Frontend** | Next.js 14, React 18, TypeScript               |
| **Styling**  | Tailwind CSS, Shadcn/UI                        |
| **Backend**  | REST API (Next.js App Router)                  |
| **Database** | MySQL 8.0                                      |
| **Email**    | Nodemailer (SMTP via mail.masdika.biz.id)      |
| **DevOps**   | Docker & Docker Compose, Caddy (Reverse Proxy) |

---

## 🚀 Quick Start

### ⚙️ Prerequisites

* [Docker](https://www.docker.com/) & Docker Compose
* Node.js 18+ (opsional untuk dev lokal)
* Git

### 🔧 Instalasi

```bash
# Clone repository
git clone https://github.com/masdikaaa/wedding-invitation.git
cd wedding-invitation

# Salin file environment
cp .env.example .env

# Edit konfigurasi
nano .env
```

### 🐳 Jalankan dengan Docker

```bash
# Build dan start service
docker compose up -d

# Cek status
docker compose ps

# Lihat log aplikasi
docker compose logs -f wedding-app
```

### 🌐 Akses Aplikasi

* **Website**: [http://localhost](http://localhost)
* **Next.js App**: [http://localhost:3000](http://localhost:3000)
* **MySQL**: `localhost:3306`

---

## 📧 Konfigurasi Email SMTP

Gunakan pengaturan berikut di file `.env`:

| Field      | Value                                                |
| ---------- | ---------------------------------------------------- |
| Host       | `mail.masdika.biz.id`                                |
| Username   | `me@masdika.biz.id`                                  |
| Password   | `your-password`                                      |
| Recipients | `masdika.my.id@gmail.com`, `rsulistyani93@gmail.com` |

---

## 🗄️ Database Schema

### `rsvp_submissions`

```sql
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
```

---

## 📡 API Endpoints

### `POST /api/rsvp`

Submit RSVP dari undangan.

**Request:**

```json
{
  "name": "John Doe",
  "attendance": "hadir",
  "guestCount": "2",
  "message": "Selamat untuk kalian berdua!"
}
```

**Response:**

```json
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
```

### `GET /api/rsvp`

Menampilkan semua RSVP (akses admin).

**Headers:**

```
Authorization: Bearer admin123
```

**Response:**

```json
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
```

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### 📦 Build Production

```bash
npm run build
npm start
```

---

## 🐳 Docker Commands

```bash
# Build image
docker build -t wedding-invitation .

# Run container
docker run -p 3000:3000 wedding-invitation

# Docker Compose
docker compose up -d      # Start
docker compose down       # Stop
docker compose logs -f    # Logs
docker compose restart    # Restart

# Database CLI
docker compose exec mysql mysql -u root -p
```

---

## 🔐 Keamanan

* Input validation & sanitization
* Rate limiting API
* SQL injection protection
* XSS protection headers
* SMTP email secured via `.env`

---

## 📱 Mobile Optimization

* Fully responsive layout
* Touch-friendly UI
* Optimized assets & caching
* Progressive Web App (PWA) ready

---

## 🎨 Customization

### Mengubah Tema Warna

Edit file `tailwind.config.js`:

```js
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
```

### Mengubah Konten

Edit komponen di `app/page.tsx`:

* Nama mempelai
* Tanggal dan lokasi acara
* Informasi rekening
* Ucapan & pesan undangan

---

## ⚠️ Troubleshooting

### Database Connection Error

```bash
# Cek status MySQL container
docker compose ps mysql

# Restart MySQL
docker compose restart mysql

# Lihat logs
docker compose logs mysql
```

### Email Not Sending

1. Cek konfigurasi SMTP di `app/api/rsvp/route.ts`
2. Verifikasi kredensial email
3. Pastikan port SMTP tidak diblokir firewall
4. Periksa log SMTP server

---

## 📊 Monitoring

### Health Check

```bash
curl http://localhost:3000/api/health
```

### Logs

```bash
# Aplikasi
docker compose logs -f wedding_app

# Database
docker compose logs -f wedding_mysql

# Caddy
docker compose logs -f wedding_caddy
```

---

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/xyz`)
3. Commit perubahan
4. Push branch ke remote
5. Buat Pull Request

---

## 📄 License

Open-source untuk keperluan pribadi dan showcase oleh Masdika

---

## 👥 Support

Untuk pertanyaan atau bantuan:

* Email: [me@masdika.biz.id](mailto:me@masdika.biz.id)

---

**Made with ❤️ for Masdika.BIZ.ID**
*17 Oktober 2025 • Sidoarjo, Jawa Timur*
