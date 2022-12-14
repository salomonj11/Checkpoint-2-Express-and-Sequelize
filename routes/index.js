const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');

// write your routes here. Feel free to split into multiple files if you like.

router.get('/', async (req, res, next) => {
  try {
    res.send(todos.listPeople());
  } catch (error) {
    next();
  }
});

router.get('/users/:name/tasks', async (req, res, next) => {
  try {
    res.send(todos.listPeople());
  } catch (error) {
    next();
  }
});

router.put('/:index', async (req, res, next) => {
  try {
    console.log(todos.complete(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
