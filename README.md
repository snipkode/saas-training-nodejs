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
