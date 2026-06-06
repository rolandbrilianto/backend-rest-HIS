# Backend REST HIS

REST API untuk sistem PPOB (Payment Point Online Bank) dengan modul Membership, Information, dan Transaction.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT (JSON Web Token)
- **File Upload**: Multer + Cloudinary

## Struktur Project

```
backend-rest-HIS/
├── migrations/
│   ├── ddl.sql                      # Struktur tabel database
│   └── seed.sql                     # Data awal (banner & services)
├── src/
│   ├── config/
│   │   ├── db.js                    # Koneksi PostgreSQL
│   │   └── multer.js                # Konfigurasi upload gambar (Cloudinary)
│   ├── controllers/
│   │   ├── auth.controller.js       # Handler register & login
│   │   ├── information.controller.js # Handler banner & services
│   │   ├── profile.controller.js    # Handler profil user
│   │   └── transaction.controller.js # Handler transaksi
│   ├── middleware/
│   │   └── auth.middleware.js       # Verifikasi JWT
│   ├── models/
│   │   ├── banner.model.js          # Query tabel banners
│   │   ├── service.model.js         # Query tabel services
│   │   ├── transaction.model.js     # Query tabel transactions
│   │   └── user.model.js            # Query tabel users
│   ├── routes/
│   │   ├── auth.route.js            # Route register & login
│   │   ├── index.js                 # Entry point semua routes
│   │   ├── information.route.js     # Route banner & services
│   │   ├── profile.route.js         # Route profil user
│   │   └── transaction.route.js     # Route transaksi
│   ├── schemas/
│   │   ├── auth.schema.js           # Validasi register & login
│   │   ├── profile.schema.js        # Validasi update profil
│   │   └── transaction.schema.js    # Validasi topup & transaksi
│   ├── services/
│   │   ├── auth.service.js          # Business logic auth
│   │   ├── information.service.js   # Business logic information
│   │   ├── profile.service.js       # Business logic profil
│   │   └── transaction.service.js   # Business logic transaksi
│   ├── utils/
│   │   ├── invoice.js               # Generate invoice number
│   │   └── response.js              # Format response standar
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Instalasi

```bash
# Clone repository
git clone https://github.com/username/backend-rest-HIS.git
cd backend-rest-HIS

# Install dependencies
npm install

# Copy env example dan isi credentials
cp .env.example .env

# Jalankan DDL dan seed di database
# Buka migrations/ddl.sql lalu jalankan di database
# Buka migrations/seed.sql lalu jalankan di database

# Jalankan server
npm run dev
```

## Environment Variables

```
PORT=3000
DB_HOST=
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Modul API

### 1. Module Membership
Mengelola data pengguna — registrasi, login, dan profil.

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| POST | /registration | ❌ | Registrasi user baru |
| POST | /login | ❌ | Login dan dapat JWT token |
| GET | /profile | ✅ | Lihat profil user |
| PUT | /profile/update | ✅ | Update nama user |
| PUT | /profile/image | ✅ | Upload foto profil (jpeg/png) |

### 2. Module Information
Menyediakan data statis berupa banner promosi dan daftar layanan PPOB yang tersedia. Data diambil dari database, bukan hardcode.

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | /banner | ❌ | List banner promosi |
| GET | /services | ✅ | List layanan PPOB (Pulsa, PLN, PDAM, dll) |

### 3. Module Transaction
Mengelola transaksi keuangan — cek saldo, top up, pembayaran, dan riwayat transaksi.

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | /balance | ✅ | Cek saldo |
| POST | /topup | ✅ | Top up saldo |
| POST | /transaction | ✅ | Bayar layanan (PPOB) |
| GET | /transaction/history | ✅ | Riwayat transaksi |

> ✅ = Memerlukan Bearer Token JWT  
> ❌ = Public, tidak perlu token

## Format Response

Semua endpoint menggunakan format response yang konsisten:

```json
{
  "status": 0,
  "message": "Pesan sukses atau error",
  "data": null
}
```

| Status Code | Keterangan |
|-------------|------------|
| 0 | Sukses |
| 102 | Bad Request (validasi gagal) |
| 103 | Username atau password salah |
| 108 | Token tidak valid atau kadaluwarsa |

## Database Design

Project ini menggunakan 4 tabel utama:

- **users** — data pengguna dan saldo
- **banners** — data banner promosi (Module Information)
- **services** — data layanan PPOB (Module Information)
- **transactions** — riwayat transaksi (topup & payment)

Lihat `migrations/ddl.sql` untuk detail struktur tabel.
