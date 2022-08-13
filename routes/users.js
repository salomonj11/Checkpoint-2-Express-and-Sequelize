const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
const { MyTasks } = require('../models/express-models/todos');
const bodyParser = require('body-parser');

router.get('/', async (req, res, next) => {
  try {
    res.send(todos.listPeople());
  } catch (error) {
    next();
  }
});

router.get('/:name/tasks', async (req, res, next) => {
  res.send(todos.list(req.params.name));
});

router.post('/:name/tasks', async (req, res, next) => {
  try {
    const newTask = todos.add(req.params.name, req.body);
    res.status(201).json(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// req.params = { name: 'sarah' }

// req.body = { content: 'a new tasks for x }
