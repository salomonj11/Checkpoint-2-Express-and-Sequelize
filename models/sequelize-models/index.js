const db = require('./database');
const Sequelize = require('sequelize');
const todos = require('/Users/salomonj/Checkpoint-Express-Sequelize-B/models/express-models/todos.js');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.prototype.assignOwner = async function (person) {
  const meAssign = this.setOwner(person);
  return meAssign;
};

Owner.getOwnersAndTasks = async function () {
  const wholeLotOfStuff = await this.findAll({ include: Task });
  return wholeLotOfStuff;
};

Owner.prototype.getIncompleteTasks = async function () {
  let myBad = await this.getTasks();
  return myBad.filter((task) => task.complete === false);
};

Owner.beforeDestroy((person) => {
  if (person.name === 'Grace Hopper') {
    throw new Error('Woah calm down cowboy');
  }
});

Task.clearCompleted = async function () {
  const woahCompleted = await Task.destroy({
    where: { complete: true },
  });
  return woahCompleted;
};

Task.completeAll = async function () {
  const woahCleared = await this.update(
    { complete: true },
    {
      where: {
        complete: false,
      },
    }
  );
  return woahCleared;
};

Task.prototype.getTimeRemaining = function () {
  if (!this.due) {
    return Infinity;
  } else {
    return this.due - Date.now();
  }
};

Task.prototype.isOverdue = function () {
  if (this.due < Date.now() && this.complete === true) {
    return false;
  } else if (this.due > Date.now()) {
    return false;
  } else {
    return true;
  }
};

//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
