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