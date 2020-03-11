const request = require('supertest');

const server = 'http://localhost:8080';

describe('API Tests', () => {
  describe('/auth/login', () => {
    it('responds with 400 when username does not exist', () => {
      const user = {
        username: 'usernameThatDoesNotExist',
        password: 'password',
        passCondition: true,
      };

      return request(server)
        .post('/auth/login')
        .send(user)
        .expect('Content-Type', /application\/json/)
        .expect(400);
    });

    it('responds with 403 when password is incorrect', () => {
      const user = {
        username: 'jason',
        password: 'incorrectPassword',
        passCondition: true,
      };

      return request(server)
        .post('/auth/login')
        .send(user)
        .expect('Content-Type', /application\/json/)
        .expect(403);
    });

    it('responds with 200 when username and password are correct', () => {
      const user = {
        username: 'jason',
        password: 'password',
        passCondition: true,
      };

      return request(server)
        .post('/auth/login')
        .send(user)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    it('sends user JWT token on successful login', () => {
      const user = {
        username: 'jason',
        password: 'password',
        passCondition: true,
      };

      return request(server)
        .post('/auth/login')
        .send(user)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .expect('set-cookie', /token=/);
    });
  });
  // /auth/login

  describe('/auth/validate', () => {
    it('responds with 403 when invalid JWT is sent for validaton', () => {
      const user = {
        username: 'jason',
        password: 'password',
        passCondition: true,
      };

      return request(server)
        .get('/auth/validate')
        .set('Cookie', ['token=completelyInvalidJWT'])
        .expect('Content-Type', /application\/json/)
        .expect(403);
    });
  });
  // /auth/validate
});
