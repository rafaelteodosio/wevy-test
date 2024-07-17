const request = require('supertest');
const app = require('../../server');

describe('Authentication Endpoints', () => {

  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'user@example.com',
        password: 'password'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail to login with incorrect password', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'user@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('error', 'Credenciais inválidas');
  });
});
