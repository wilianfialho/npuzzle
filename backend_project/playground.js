const mongoose = require("mongoose");
const faker = require("faker");

const schemaTask = new mongoose.Schema({
  // id: { type: mongoose.Schema.Types.ObjectID},
  title: { type: String, trim: true, min: 1, required: true },
  tags: {
    type: Array,
    required: true,
    validate: {
      validator: function(tags) {
        if (!tags || tags.length === 0) {
          return false;
        }
        for (const tag of tags) {
          if (tag.trim().length === 0) return false;
        }
        return true;
      },
      message: "At least one non empty tag."
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // swimline: {type: Number, default: 1},
  swimline: {
    type: String,
    enum: ["todo", "in progress", "done"],
    default: "todo"
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "users"
  }
});

const schemaUser = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectID },
  name: { type: String, trim: true, min: 1, required: true },
  token: [{ type: String, trim: true, min: 1 }]
});

const Task = mongoose.model("tasks02", schemaTask);
const User = mongoose.model("users", schemaUser);

const words_count = Math.floor(Math.random() * (8 - 3) + 3);
const task = new Task({
  title: faker.lorem.sentence(),
  tags: faker.lorem.words(words_count).split(" "),
  // tags: ["fun", "vikend", "oddych"],
  //   user: "5dc3de1cbacd5c1c501ac09c"
  user: "5dc3de57bacd5c1c501ac09d"
  //   swimline: "todo"
});

mongoose
  .connect("mongodb://localhost:27017/kanban", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(function(value) {
    console.log(`>> Connected to MongoDB`);
    // console.log(value);
    // task
    //   .save()
    //   .then(value => {
    //     console.log("Task was saved.");
    //     // console.log(value);
    //   })
    //   .catch(err => {
    //     for (const error in err.errors) {
    //       console.error(err.errors[error].message);
    //     }
    //     // console.error("Task was not saved.");
    //     // console.log(err);
    //   });
    Task.findOne({
      _id: "5dca7eff63083c544c38359e"
    }).then(task => {
      console.log(task);
      User.findOne({
        _id: task.user
      }).then(user => {
        task.user = user;
        console.log(task);
      });
      //   console.log(`There are ${tasks.length} tasks in result`);
      //   console.log(tasks);
    });
  })
  .catch(function(error) {
    console.log(`>> Ta sa nepripojilo`);
    // console.log(error);
  });

async function masaker() {
  const task = await Task.findOne({ _id: "5dca8038bde50cc4cbf3208c" });
  const user = await User.findOne({ _id: task.user });

  task.user = user;
  console.log(task);
}
