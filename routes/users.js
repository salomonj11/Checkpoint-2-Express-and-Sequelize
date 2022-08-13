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
  try {
    const newName = req.params.name;
    const myPeps = todos.listPeople();

    // responds with 404 if user does not exist //
    !myPeps.includes(newName)
      ? res.sendStatus(404)
      : res.send(todos.list(req.params.name));
  } catch (error) {
    next(error);
  }
});

router.post('/:name/tasks', async (req, res, next) => {
  try {
    if (req.body.content === '') {
      res.sendStatus(400);
    } else {
      const newTask = todos.add(req.params.name, req.body);
      res.status(201).json(req.body);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:name/tasks/:index', async (req, res, next) => {
  try {
    res.send(todos.complete(req.params.name, req.params.index));
  } catch (error) {
    next(error);
  }
});

router.delete('/:name/tasks/:index', async (req, res, next) => {
  try {
    const myDelete = todos.remove(req.params.name, req.params.index);
    res.status(204).json(req.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

//req.params = { name: x, index: '1'}

// req.params = { name: 'sarah' }

// req.body = { content: 'a new tasks for x }
