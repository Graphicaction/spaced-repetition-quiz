const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');

// Defining methods for the questionController
module.exports = {
  findAll: function (req, res) {
    db.Question.find()
      .then((questions) => {
        res.json({ questions });
      })
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Question.find({ _id: req.params.id })
      .then((question) => {
        res.json({ question });
      })
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Question.create(req.body)
      .then((dbQuestion) => {
        // If the Challenge was created successfully, send it back to the client
        res.json(dbQuestion);
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Question.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbQuestion) => {
        // If the Challenge was updated successfully, send it back to the client
        res.json(dbQuestion);
      })
      .catch((err) => res.status(422).json(err));
  }
};
