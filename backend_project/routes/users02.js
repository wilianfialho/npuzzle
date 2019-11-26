const express = require("express");
// const users = require("./usersDb");
const router = express.Router();
const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectID },
  name: { type: String, trim: true, min: 1, required: true },
  token: [{ type: String, trim: true, min: 1 }]
});

const User = mongoose.model("users", schemaUser);

router.get("/", (req, res) => {
  mongoose
    .connect("mongodb://localhost:27017/kanban", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(function(value) {
      console.log(`>> Connected to MongoDB`);
      User.find().then(users => {
        console.log(`There are ${users.length} tasks in result`);
        //console.log(tasks);
        res.send(users);
      });
    })
    .catch(function(error) {
      console.log(`>> Ta sa nepripojilo`);
    });

  // if (req.user) {
  //     res.send(req.user);
  // } else {
  //     res.status(401).send({ error: "Not authenticated." });
  // }

  return;
});

module.exports = router;
