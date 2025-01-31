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

## Simulasi Pembayaran

Untuk mensimulasikan pembayaran menggunakan sandbox Midtrans, ikuti langkah-langkah berikut:

1. Pastikan Anda telah mengatur `MIDTRANS_SERVER_KEY` dan `MIDTRANS_CLIENT_KEY` di file `.env` Anda dengan kunci sandbox Midtrans Anda.

2. Pastikan Anda telah mengatur `NGROK_AUTH` berupa token yang didapatkan pada website ngrok official di [ngrok Dashboard](https://dashboard.ngrok.com/endpoints).

3. Mulai aplikasi Anda menggunakan Docker Compose:
   ```sh
   docker-compose up --build -d
   ```

4. Buka aplikasi Anda dan lanjutkan ke bagian pembayaran.

5. Ketika diminta untuk pembayaran, gunakan URL berikut untuk mensimulasikan proses pembayaran:
   [Simulator Pembayaran Midtrans](https://simulator.sandbox.midtrans.com)

6. Ikuti instruksi di Simulator Pembayaran Midtrans untuk menyelesaikan proses pembayaran.

7. Aplikasi Anda sekarang harus mencerminkan status pembayaran yang disimulasikan.

8. Pastikan Anda telah mengatur endpoint callback notifikasi pada Midtrans dengan URL berikut:
   ```sh
   {{baseURLTunnel}}/payments/notification
   ```

9. Untuk mengetes simulasi pembayaran subscription, URL harus menggunakan ngrok. Buka ngrok pada port 4040 di browser dan copy-paste baseURL-nya ke pengaturan notification webhook Midtrans di [Midtrans Dashboard](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration/history).

10. Atur URL redirect setelah pembayaran berhasil di menu [Midtrans Dashboard](https://dashboard.sandbox.midtrans.com/settings/payment/finish-redirect).

11. Untuk melihat hasil konfirmasi Midtrans melalui webhook, kunjungi history di sini: [Midtrans Dashboard History](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration/history).

### Contoh Request Body Notifikasi Pembayaran

Berikut adalah contoh request body notifikasi pembayaran dari Midtrans:

```json
{
  "va_numbers": [
    {
      "va_number": "85293557733750664904806",
      "bank": "bca"
    }
  ],
  "transaction_time": "2025-01-31 07:00:57",
  "transaction_status": "settlement",
  "transaction_id": "054e96a2-6010-4010-8529-836b2afabb55",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "6679d5143067a34bfee3a676d209bbb04d77e566eb8cbba7b193f5eb48cc8e0725d3adf90af43dc54e55555c2e9a82d87488c86096cf315378e3676328e9daae",
  "settlement_time": "2025-01-31 07:01:05",
  "payment_type": "bank_transfer",
  "payment_amounts": [],
  "order_id": "order-979721e6-cff5-4f8b-90d0-0e0d7dfe4cf0",
  "merchant_id": "G311685293",
  "gross_amount": "152123.00",
  "fraud_status": "accept",
  "expiry_time": "2025-02-01 07:00:56",
  "currency": "IDR"
}
```

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

## Checking Available Models on AI Service

Untuk mengecek model yang tersedia pada layanan AI, gunakan perintah curl berikut:

```sh
curl http://localhost:11434/api/tags
```

## Tunnel Alternatif

Sebagai alternatif dari pengaturan tunnel saat ini, Anda dapat menggunakan `cloudflared`. Ini adalah alat yang disediakan oleh Cloudflare yang memungkinkan Anda membuat tunnel aman ke server lokal Anda.

Untuk menginstal `cloudflared`, ikuti instruksi pada [dokumentasi Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation).

Setelah diinstal, Anda dapat memulai tunnel dengan perintah berikut:
```sh
cloudflared tunnel --url http://localhost:YOUR_PORT
```

Ganti `YOUR_PORT` dengan nomor port tempat aplikasi Anda berjalan.

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
