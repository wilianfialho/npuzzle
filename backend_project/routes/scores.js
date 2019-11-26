const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const url = "mongodb://localhost:27017/score";

router.use(express.json());

const schemaScore = new mongoose.Schema({
  date: { type: Date },
  player: { type: String, require: true, trim: true, minlength: 3 },
  points: { type: Number, require: true, min: 0 }
});

const Score = mongoose.model("score", schemaScore);

router.get("/", (req, res) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      Score.find({}).then(scores => {
        db.disconnect();
        res.send(scores);
      });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

router.post("/", (req, res) => {
  const score = new Score({
    date: Date.now(),
    player: req.body.player,
    points: req.body.points
  });
  console.log(score);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      score
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
