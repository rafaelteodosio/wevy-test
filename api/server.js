const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Task } = require('./models');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) return res.status(404).json({ error: 'User not found' });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(403).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, username: user.username }, config.secretKey);
  res.json({ token });
});

app.get('/tasks', authenticateToken, async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
});

app.post('/tasks', authenticateToken, async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title, userId: req.user.id });
  res.status(201).json(task);
});

app.put('/tasks/:id', authenticateToken, async (req, res) => {
  const { title } = req.body;
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.title = title;
  await task.save();
  res.json(task);
});

app.delete('/tasks/:id', authenticateToken, async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

  if (!task) return res.status(404).json({ error: 'Task not found' });

  await task.destroy();
  res.status(204).send();
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
