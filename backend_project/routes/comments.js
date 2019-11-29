const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const url = "mongodb://localhost:27017/minesweeper";

router.use(express.json());

const schemaComment = new mongoose.Schema({
  player: { type: String, required: true, trim: true, minlength: 3 },
  description: { type: String, required: true, trim: true, minlength: 3 },
  date: { type: Date }
});

const Comment = mongoose.model("comment", schemaComment);

router.get("/", (req, res) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      Comment.find({}).then(comments => {
        db.disconnect();
        res.send(comments);
      });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

router.post("/", (req, res) => {
  const comment = new Comment({
    player: req.body.player,
    description: req.body.description,
    date: Date.now()
  });
  console.log(comment);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      comment
        .save()
        .then(inserted => {
          db.disconnect();
          res.status(201).send(JSON.stringify({ _id: inserted._id }));
        })
        .catch(msg => {
          db.disconnect();
          res.status(400).send({ error: "wrong data", msg: msg.errors });
        });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

module.exports = router;
