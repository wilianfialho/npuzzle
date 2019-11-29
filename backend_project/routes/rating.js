const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const url = "mongodb://localhost:27017/rating";

router.use(express.json());

const schemaRating = new mongoose.Schema({
  game: { type: String, required: true, trim: true, minlength: 3 },
  stars: { type: Number, required: true }, //todo: check enum 1-5
  date: { type: Date }
});

const Rating = mongoose.model("rating", schemaRating);

router.get("/", (req, res) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      Rating.find({}).then(ratings => {
        db.disconnect();
        res.send(ratings);
      });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

// router.get("/avg", (req, res) => {
//   mongoose
//     .connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     .then(db => {
//       // Rating.find({}).then(ratings => {
//       //   db.disconnect();
//       //   res.send(ratings);
//       // });

//       Ratings.aggregate(
//         // { $match: { _id: id, average: { $avg: "$stars" } } },
//         [{ $match: { stars: 3 } }, {$group:
//           {_id: '$a', total: {$sum: '$a'} }
//         }],
//         function(err, result) {
//           console.log("working");
//           db.disconnect();
//           res.send(result);
//         }
//       );
//     })
//     .catch(() => {
//       res.status(400).send("wrong request");
//     });
// });

router.post("/", (req, res) => {
  const rating = new Rating({
    game: req.body.game,
    stars: req.body.stars,
    date: Date.now()
  });
  console.log(rating);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      rating
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
