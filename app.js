const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const todos = require('./models/express-models/todos');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)

app.use('/users', usersRouter);

// app.get('users/:name/tasks', (req, res) => {
//   res.send(body);
// });

app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
