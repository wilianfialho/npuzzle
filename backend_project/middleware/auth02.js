const express = require("express");
// const users = require("../routes/usersDb");
const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectID },
  name: { type: String, trim: true, min: 1, required: true },
  token: [{ type: String, trim: true, min: 1 }]
});

const User = mongoose.model("users", schemaUser);

function auth(req, res, next) {
  mongoose
    .connect("mongodb://localhost:27017/kanban", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(function(value) {
      console.log(`>> Connected to MongoDB`);
      User.findOne({
        token: req.params.token
      }).then(user => {
        req.user = user;
        res.send(user);
      });
    })
    .catch(function(error) {
      console.log(`>> Not authentificated`);
      // console.log(error);
    });

  //   if (!req.headers.token) {
  //     res.status(401).send({ error: "Not authentificated" });
  //     return;
  //   }

  //   const user = users.find(user => {
  //     return user.token === req.headers.token;
  //   });

  //   if (user) {
  //     req.user = user;
  //     next();
  //   } else {
  //     res.status(401).send({ error: "Not authenticated." });
  //   }

  return;
}

module.exports = auth;
