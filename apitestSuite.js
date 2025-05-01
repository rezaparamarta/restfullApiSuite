require('dotenv').config();
const request = require('supertest');
const expect = require('chai').expect;
const fs = require('fs');

const BASE_URL = process.env.BASE_URL_RESTFUL;
const credentials = {
  username: process.env.USERNAME_RESTFUL,
  password: process.env.PASSWORD_RESTFUL
};
const bookingData = JSON.parse(fs.readFileSync('./payload/newBooking.json'));

let token;
let bookingId;
let response;

describe('TUGAS 2 - API Automation E2E Suite', function () {
    // Login Sebelum menjalankan test
    before(async function () {
        console.log('Starting API E2E Suite');

        const loginResponse = await request(BASE_URL)
           .post('/auth')
           .set('Content-Type', 'application/json')
           .send(credentials);

        // Memeriksa status code dan message berhasil login
        console.log('Login Successful:', loginResponse.status);
        console.log('Login Message:', loginResponse.body);

        // Assertion Testing
        expect(loginResponse.status).to.equal(200);
        expect(loginResponse.body).to.have.property('token');
        token = loginResponse.body.token;
        expect(token).to.be.exist;
        expect(token).to.be.a('string');
        console.log('Token:', token);
    });

    // Hook sebelum setiap test case dimulai
    beforeEach(async function () {
        console.log(`--- Running Test Case: ${this.currentTest.title}`);
        this.timeout(60000);
    });

    // 1. Create Booking
    it('Create a new booking', async function () {
        console.log('---- Create a new booking ----');

        const createResponse = await request(BASE_URL)
            .post('/booking')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send(bookingData)

        console.log('Create booking status:', createResponse.status);
        console.log('Create booking body:', createResponse.body);

        expect(createResponse.status).to.equal(200);
        bookingId = createResponse.body.bookingid;
        expect(bookingId).to.exist;
        expect(bookingId).to.be.a('number');
        console.log('Booking ID:', bookingId);
    });

    // 2. Get Booking
    it('Get a booking', async function () {
        console.log('---- Get a new booking ----');

        const createResponse = await request(BASE_URL)
            .get('/booking/' + bookingId)
            .set('Accept', '*/*')

        console.log('Create booking status:', createResponse.status);
        console.log('Create booking body:', createResponse.body);

        expect(createResponse.status).to.equal(200);
        firstname = createResponse.body.firstname;
        expect(firstname).to.exist;
        expect(firstname).to.be.a('string');
        console.log('First Name:', firstname);
    });

    // 3. Delete Booking
    it("Delete the booking", async function () {
        console.log("----- DELETE BOOKING -----");

        response = await request(BASE_URL)
        .delete(`/booking/${bookingId}`)
        .set("Cookie", `token=${token}`);

        console.log("Delete booking status:", response.status);
        console.log("Delete booking body:", response.text);

        expect(response.status).to.equal(201);
        expect(response.text).to.equal("Created");
    });
      // Hook sesudah setiap test
  afterEach(function () {
    console.log(`----- Finished Test: ${this.currentTest.title} -----`);
    if (response) {
      expect(response.status).to.be.oneOf([200, 201]);
    }
  });
  // Hook sesudah semua test
  after(function () {
    console.log("----- All Booking Tests Completed -----");
  });
});
