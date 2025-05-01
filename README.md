# restfullApiSuite
Tugas dari bootcamp AfterOffice - API Automation Advance

Tugas 2 - API Automation Testing
Buat API E2E testing dengan menggunakan API berikut:
a. API auth - untuk mendapatkan token, dipakai untuk token saat hapus booking
● Credential user harus ditaruh di file .env terpisah
● Expect status code sudah sesuai dokumentasi
b. API createBooking - untuk membuat data booking baru, output responsenya
mendapatkan bookingId
● Data booking harus ditaruh di file .json terpisah
● Expect status code sudah sesuai dokumentasi
● Expect isi body sudah sesuai dengan body yang digunakan saat request
c. API getBooking - untuk memastikan data booking sudah dibuat
● bookingId harus didapatkan dari API createBooking pada step 2
● Expect status code sudah sesuai dokumentasi
● Expect isi body sudah sesuai dengan body yang digunakan saat
createBooking

d. API deleteBooking - untuk menghapus data booking, memerlukan bookingId dan
token
● Token harus didapatkan dari API auth pada step 1
● Expect status code sudah sesuai dokumentasi
Dokumentasi API: https://restful-booker.herokuapp.com/apidoc/index.html