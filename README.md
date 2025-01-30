# Judul Proyek

Saas AI Subscription

## Deskripsi

Saas AI Subscription adalah layanan berbasis langganan yang memungkinkan pengguna mengakses fitur-fitur bertenaga AI. Pengguna dapat memilih dari berbagai paket langganan, masing-masing dengan batas penggunaan prompt AI yang berbeda. Layanan ini melacak langganan pengguna, penggunaan prompt AI, dan pembayaran. Ini juga mencakup mekanisme untuk memastikan pengguna tidak melebihi batas prompt mereka berdasarkan paket langganan mereka.

## Instalasi

Instruksi tentang cara menginstal dan mengatur proyek.

```bash
# Clone repository
git clone https://github.com/snipkode/saas-training-nodejs.git

# Masuk ke direktori proyek
cd saas-training-nodejs

# Instal dependensi
npm install
```

## Penggunaan

Instruksi tentang cara menggunakan proyek.

```bash
# Mulai proyek
npm start
```

## Menjalankan dengan Docker

Panduan untuk menjalankan proyek menggunakan Docker container.

1. Pastikan Docker sudah terinstal di sistem Anda.
2. Bangun image Docker.

```bash
docker build -t saas-ai-subscription .
```

3. Jalankan container Docker.

```bash
docker run -d -p 3000:3000 --name saas-ai-subscription-container saas-ai-subscription
```

4. Akses aplikasi di browser melalui `http://localhost:3000`.

## Menjalankan dengan Docker Compose

Panduan untuk menjalankan proyek menggunakan Docker Compose.

1. Pastikan Docker dan Docker Compose sudah terinstal di sistem Anda.
2. Jalankan Docker Compose.

```bash
docker-compose up -d
```

3. Akses aplikasi di browser melalui `http://localhost:3000`.
4. Akses phpMyAdmin di browser melalui `http://localhost:8080` untuk mengelola basis data.

## Skema Basis Data

Proyek ini menggunakan basis data MySQL dengan skema berikut:

- **users**: Menyimpan informasi pengguna.
- **subscription_plans**: Menyimpan berbagai paket langganan.
- **user_subscriptions**: Menyimpan langganan pengguna ke berbagai paket.
- **ai_prompt_usage**: Melacak penggunaan prompt AI oleh pengguna.
- **payments**: Mencatat transaksi pembayaran.

## Alur Bisnis

1. **Registrasi Pengguna**: Pengguna mendaftar dan informasi mereka disimpan di tabel `users`.
2. **Paket Langganan**: Berbagai paket langganan didefinisikan di tabel `subscription_plans`.
3. **Langganan Pengguna**: Pengguna berlangganan paket, dan langganan mereka dicatat di tabel `user_subscriptions`.
4. **Penggunaan Prompt AI**: Pengguna dapat menggunakan prompt AI, dan setiap penggunaan dilacak di tabel `ai_prompt_usage`.
5. **Pembayaran**: Pembayaran untuk langganan dicatat di tabel `payments`.
6. **Cek Batas Prompt**: Prosedur tersimpan `CheckPromptLimit` memeriksa apakah pengguna telah melebihi batas prompt mereka berdasarkan paket langganan mereka.

## API Dokumentasi

Berikut adalah dokumentasi API untuk proyek ini. Dokumentasi API Swagger tersedia di path `/api-docs`.

### Autentikasi

#### Login Pengguna

- **Endpoint**: `/api/login`
- **Metode**: `POST`
- **Deskripsi**: Autentikasi pengguna dan menghasilkan token akses.
- **Permintaan**:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Respon**:
  ```json
  {
    "token": "jwt_token"
  }
  ```

### Pengguna

#### Daftar Pengguna

- **Endpoint**: `/api/register`
- **Metode**: `POST`
- **Deskripsi**: Mendaftarkan pengguna baru.
- **Permintaan**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Respon**:
  ```json
  {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "created_at": "2023-01-01T00:00:00Z"
  }
  ```

### Langganan

#### Mendapatkan Paket Langganan

- **Endpoint**: `/api/subscription-plans`
- **Metode**: `GET`
- **Deskripsi**: Mendapatkan daftar paket langganan yang tersedia.
- **Respon**:
  ```json
  [
    {
      "id": 1,
      "name": "Free Plan",
      "price": 0.00,
      "prompt_limit": 5,
      "created_at": "2023-01-01T00:00:00Z"
    },
    // ... paket lainnya ...
  ]
  ```

#### Berlangganan Paket

- **Endpoint**: `/api/subscribe`
- **Metode**: `POST`
- **Deskripsi**: Berlangganan paket langganan.
- **Permintaan**:
  ```json
  {
    "user_id": 1,
    "plan_id": 2
  }
  ```
- **Respon**:
  ```json
  {
    "id": 1,
    "user_id": 1,
    "plan_id": 2,
    "start_date": "2023-01-01",
    "end_date": "2023-12-31",
    "status": "active"
  }
  ```

## Kontribusi

Panduan untuk berkontribusi pada proyek.

1. Fork repository
2. Buat cabang baru (`git checkout -b feature-branch`)
3. Lakukan perubahan Anda
4. Commit perubahan Anda (`git commit -m 'Tambahkan beberapa fitur'`)
5. Push ke cabang (`git push origin feature-branch`)
6. Buka pull request

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detailnya.
