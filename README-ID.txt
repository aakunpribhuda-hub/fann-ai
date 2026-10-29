# Fann AI — versi backend

## Penting
HTML saja tidak dapat menjalankan model AI sungguhan secara aman. Project ini menyediakan backend yang menyimpan API key di server, bukan di HTML. Untuk jawaban AI sungguhan, kamu memerlukan API key penyedia AI dan menjalankan project ini di komputer/server/hosting yang mendukung Node.js. Penggunaan API dapat berbayar sesuai penyedia dan pemakaian.

## Cara menjalankan
1. Instal Node.js versi 18 atau lebih baru pada komputer/server.
2. Ekstrak ZIP ini.
3. Salin `.env.example` menjadi `.env`.
4. Buka `.env`, lalu isi `OPENAI_API_KEY` dengan API key milikmu. Jangan bagikan file `.env`.
5. Buka terminal di folder project dan jalankan `npm install`.
6. Jalankan `npm start`.
7. Buka `http://localhost:3000`.

## Jika ingin dipakai dari HP melalui internet
Deploy folder project ke hosting/server yang mendukung Node.js, lalu buka alamat HTTPS hasil deploy. File HTML di folder `public` sudah menggunakan endpoint relatif `/api/chat`.

## Catatan
- Jangan memasukkan API key ke HTML atau mengirimnya ke orang lain.
- Kalau API key belum diisi, kuota habis, atau server tidak berjalan, chat akan menampilkan pesan error alih-alih berpura-pura menjawab.
- File HTML tunggal tidak bisa menjawab AI sungguhan tanpa backend/API.
