// imports
const express = require("express");
const morgan = require("morgan");
const tasksRouter = require("./routes/tasks03");
const scoreRouter = require("./routes/scores");
const commentRouter = require("./routes/comments");
const carsRouter = require("./routes/cars");
const ratingRouter = require("./routes/rating");
const homeRouter = require("./routes/home");
const usersRouter = require("./routes/users02");
const loggerMd = require("./middleware/logger");
const authMd = require("./middleware/auth");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/minesweeper", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

// middleware
// app.use(morgan("combined"));
// app.use(express.static("public"));
// app.use(loggerMd);
// app.use(authMd);
app.use(express.json());

// routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/api/cars", carsRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/scores", scoreRouter);
app.use("/api/comments", commentRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/", homeRouter);

// run app
const port = process.env.WEBAPP_PORT || 3300;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// app.get("/links", (req, res) => {
//     const result = [];
//     for (key in links) {
//         result.push(links[key]);
//     }
//     res.send(result);
// });

// app.get("/:slug", function(req, res) {
//     if (links[req.params.slug] === undefined) {
//         res.status(404).send({
//             error: "Not found."
//         });
//     }

//     res.send(links[req.params.slug]);
// });
