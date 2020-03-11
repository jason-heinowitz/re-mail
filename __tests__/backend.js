const request = require('supertest');

const server = 'http://localhost:8080';

describe('API Tests', () => {
  describe('/auth/login', () => {
    describe('', () => {
      it('response with 400 when username does not exist', () => {
        const user = {
          username: 'jason',
          password: 'password',
          passCondition: false,
        };

        return request(server)
          .post('/auth/login')
          .send(user)
          .expect('Content-Type', /application\/json/)
          .expect(400);
      });
    });
    // nill
  });
  // /auth/login
});
