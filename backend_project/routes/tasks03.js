const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const schemaTask = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectID },
  title: { type: String, trim: true, min: 1, required: true },
  tags: [{ type: String, trim: true, min: 1 }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  swimline: { type: Number, default: 1 },
  userId: { type: mongoose.Schema.Types.ObjectID }
});

const Task = mongoose.model("tasks", schemaTask);

// const tasks = [
//   {
//     id: 1,
//     title: "urobit si domacu ulohu",
//     swimline: 1,
//     userId: 1
//   },
//   {
//     id: 2,
//     title: "precitat si peknu knizku",
//     swimline: 2,
//     userId: 1
//   },
//   {
//     id: 3,
//     title: "kuknut mocny film",
//     swimline: 1,
//     userId: 2
//   }
// ];

// router.use(express.json());

// GET /

// router.get("/", (req, res) => {
//   const userId = parseInt(req.user.id);

//   const filtered = tasks.filter(task => {
//     return task.userId === userId;
//   });
//   res.send(filtered);
// });

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // test if id is a number
  if (isNaN(id)) {
    res.status(400).send({ error: "Bad Request" });
    return;
  }

  // find task
  const task = tasks.find(element => {
    return element.id === id;
  });

  // if task was found
  if (task) {
    res.send(task);
    return;
  }

  // if task was not found
  res.status(404).send({ error: "Not Found" });
});

router.post("/", async (req, res) => {
  // validation - required params
  if (!req.body.title || !req.body.swimline) {
    res.status(400).send({
      error: "Bad Request"
    });
    return;
  }

  // validation - title
  const title = req.body.title.trim();
  if (title.length < 3 || title.length > 100) {
    res.status(400).send({ error: "Bad Request" });
    return;
  }

  // validation - swimline
  const swimline = parseInt(req.body.swimline);
  if (isNaN(swimline) || swimline < 1) {
    res.status(400).send({ error: "Bad Request" });
    return;
  }

  const task = new Task({
    id: tasks.length + 1,
    title: title,
    swimline: swimline,
    userId: req.user.id
  });

  try {
    const newtask = await task.save();
    tasks.push(newtask);
    res.status(201).json(newtask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  //   // create new task
  //   const task = {
  //     id: tasks.length + 1,
  //     title: title,
  //     swimline: swimline,
  //     userId: req.user.id
  //   };

  //   tasks.push(task);
  //   res.status(201).send(task);
});

router.put("/:id", (req, res) => {
  // validacia id
  const id = parseInt(req.params.id);

  // test if id is a number
  if (isNaN(id)) {
    res.status(400).send({ error: "Bad Request" });
    return;
  }

  // najdem tasku podla id
  const task = tasks.find((task, idx) => {
    return task.id === id;
  });

  // ak nenasiel, tak skonci
  if (!task) {
    res.status(404).send({ error: "Not Found." });
    return;
  }

  // validacia title a swimline
  // validation - title
  const title = req.body.title.trim();
  if (title.length < 3 || title.length > 100) {
    res.status(400).send({ error: "Bad Request" });
    return;
  }

  // validation - swimline
  const swimline = parseInt(req.body.swimline);
  if (isNaN(swimline) || swimline < 1) {
    res.status(400).send({ error: "Bad Request" });
    return;
  }

  // update
  task.title = title;
  task.swimline = swimline;

  // status 200, aj s taskom
  res.send(task);
});

router.delete("/:id", (req, res) => {
  // zvalidujem
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({ error: "Bad request." });
    return;
  }

  // najdem
  const task = tasks.find((task, idx) => {
    return task.id === id;
  });

  // ak nenasiel, tak skonci
  if (!task) {
    res.status(404).send({ error: "Not Found." });
    return;
  }

  // vyhodim
  const idx = tasks.indexOf(task);
  tasks.splice(idx, 1);

  // odpoviem (poslem tu ulohu klientovi)
  res.send(task);
});

module.exports = router;
