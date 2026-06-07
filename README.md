# OrangeHRM Login Feature - Automation Testing

Proyek ini adalah repositori otomatisasi pengujian (*automation testing*) untuk fitur **Login** pada website demo **OrangeHRM** menggunakan framework **Cypress**. Pengujian mencakup skenario positif (*positive test cases*) dan negatif (*negative test cases*) guna memastikan ketahanan sistem otentikasi.

---

## Teknologi yang Digunakan

* **Framework Automated Testing:** Cypress
* **Bahasa Pemrograman:** JavaScript
* **Target Aplikasi Visual (SUT):** [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com/)

---

## Cakupan Matriks Pengujian

Skrip pengujian di dalam file `cypress/e2e/login_orangehrm.cy.js` mencakup 10 skenario terstruktur berikut:

### Skenario Positif (Positive Test Cases)
1. **Test 01:** Login Berhasil Menggunakan Email dan Password yang Valid (`Admin` / `admin123`).
2. **Test 02:** Memastikan Struktur Tipe Masking pada Kolom Password (atribut `type="password"`).
3. **Test 03:** Navigasi ke Halaman "Forgot Your Password?" berjalan lancar.

### Skenario Negatif (Negative Test Cases)
4. **Test 04:** Login Gagal dengan Mengosongkan Seluruh Field (Validasi *Required*).
5. **Test 05:** Login Gagal dengan Mengosongkan Kolom Username.
6. **Test 06:** Login Gagal dengan Mengosongkan Kolom Password.
7. **Test 07:** Login Gagal Menggunakan Username yang Salah.
8. **Test 08:** Login Gagal Menggunakan Password yang Salah.
9. **Test 09:** Login Gagal Menggunakan Username (Kapital) dan Password yang Salah.
10. **Test 10:** Login Gagal Menggunakan *Case Sensitive* pada Password.

---

## Penjelasan Tambahan: `cypress/e2e/spec.cy.js`

Selain pengujian terfragmentasi pada fitur login (`login_orangehrm.cy.js`), repositori ini juga memiliki berkas **`spec.cy.js`**. Berkas ini berfungsi sebagai **Alur Pengujian Dasar End-to-End (E2E)** yang menguji integrasi penuh mulai dari proses autentikasi hingga interaksi komponen utama di dalam halaman Dashboard dalam satu siklus pengujian tunggal.

### Alur Kerja & Validasi yang Dilakukan (`spec.cy.js`):

#### 1. Fase Otentikasi (Halaman Login)
* **Akses URL:** Membuka halaman utama sistem OrangeHRM.
* **Validasi Visual Awal:** Memastikan komponen branding (`img[alt="company-branding"]`) eksis dan judul form `Login` terlihat di layar.
* **Interaksi Form:** Mengetikkan data kredensial valid (`Admin` / `admin123`).
* **Validasi Atribut Keamanan:** Memastikan input pada kolom *username* sesuai dan atribut kolom *password* berupa `type="password"`.
* **Eksekusi:** Memastikan tombol login dalam kondisi aktif (*enabled*) sebelum diklik oleh sistem.

#### 2. Fase Eksplorasi (Halaman Dashboard)
Setelah proses login berhasil dilewati, skrip langsung melanjutkan pengujian ke area internal sistem:
* **Validasi URL & Header:** Memastikan URL beralih ke `/dashboard` dan judul bar atas bertuliskan `Dashboard`.
* **Validasi Sidebar Menu:** Memeriksa integritas menu navigasi samping untuk memastikan jumlahnya tepat berjumlah 12 item menu.
* **Fitur Pencarian:** Menguji fungsionalitas kolom pencarian menu dengan mengetikkan kata kunci lalu menghapusnya kembali (`.clear()`).
* **Interaksi Halaman:** Melakukan simulasi gulir (*scrolling*) ke bawah halaman untuk memverifikasi teks hak cipta (*copyright*), lalu kembali bergulir ke posisi paling atas (*top*).
* **Menu Profil Pengguna:** Mengklik menu *drop-down* akun, memicu efek *hover* (*mouseover*), dan memvalidasi bahwa tautan navigasi internal di dalamnya (seperti opsi Logout) telah berhasil muncul secara visual.