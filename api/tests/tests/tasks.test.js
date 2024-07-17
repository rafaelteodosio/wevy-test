const request = require('supertest');
const { User, Task } = require('../../models');
const app = require('../../server');

describe('Task Endpoints', () => {
  let token;
  let userId;

  beforeAll(async () => {
    const user = await User.findOne({ where: { username: 'user@example.com' } });
    userId = user.id;
    const res = await request(app)
      .post('/login')
      .send({
        username: 'user@example.com',
        password: 'password'
      });

    token = res.body.token;
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', token)
      .send({
        title: 'Test Task',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Test Task');
  });

  it('should update a task', async () => {
    const task = await Task.create({ title: 'Old Task', description: 'Old description', userId });

    const res = await request(app)
      .put(`/tasks/${task.id}`)
      .set('Authorization', token)
      .send({
        title: 'Updated Task',
        description: 'Updated description'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Task');
  });

  it('should delete a task', async () => {
    const task = await Task.create({ title: 'Task to Delete', description: 'Delete this task', userId });

    const res = await request(app)
      .delete(`/tasks/${task.id}`)
      .set('Authorization', token);

    expect(res.statusCode).toEqual(204);
  });

  it('should fetch all tasks for a user', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', token);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
