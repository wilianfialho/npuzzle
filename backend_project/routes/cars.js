const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const url = "mongodb://localhost:27017/cars";

router.use(express.json());

const schemaCar = new mongoose.Schema({
  brand: { type: String, require: true, trim: true, minlength: 3 },
  vehicleId: { type: String, require: true, min: 0 }
});

const Car = mongoose.model("cars", schemaCar);

router.get("/:id", (req, res) => {
  const id = req.params.id;

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      Car.findById(id).then(cars => {
        db.disconnect();
        res.send(cars);
      });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

router.get("/", (req, res) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      Car.find({}).then(cars => {
        db.disconnect();
        res.send(cars);
      });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});



router.post("/", (req, res) => {
  const car = new Car({
    brand: req.body.brand,
    vehicleId: req.body.vehicleId
  });
  console.log(car);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      car
        .save()
        .then(inserted => {
          db.disconnect();
          res.status(201).send(inserted._id);
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

router.put("/:id", (req, res) => {
  const id = req.params.id;

  const car = req.body;

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(value => {
      console.log(`>> Connected to mongodb (${value})`);
      console.log("ahoj", req.body);
      Car.findByIdAndUpdate(id, car, { new: true }, (err, car) => {
        if (err) {
          res.status(404).send({ error: "Not found" });
          return;
        } else {
          return res.status(200).send(car);
        }
      });
    })
    .catch(err => {
      console.log("Ta sa to nepripojilo.");
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  // zvalidujem
  const id = req.params.id;

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(value => {
      console.log(`>> Connected to mongodb (${value})`);
      // console.log(value);

      Car.findByIdAndRemove(id, (err, car) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          const response = {
            message: "Car successfully deleted",
            id: car._id
          };
          return res.status(200).send(response);
        }
      });
    })
    .catch(err => {
      console.log("Ta sa to nepripojilo.");
      console.log(err);
    });
});

module.exports = router;
