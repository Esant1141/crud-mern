const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ye Middleware hai (iski alg file bhi bn skti hai)
app.use(bodyParser.json());
app.use(cors());

// iss predefine function se db se connect krte he
mongoose.connect("mongodb://localhost/mern-crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ye schema define kiya hai (jo jo data db me save krana hai )
const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
});


const TodoModel = mongoose.model("todo", TodoSchema);

// Routes (ye backend ki routing he======> crud ki ----> get,post,put,delete ki)
app.get("/todos", async (req, res) => {
  const todos = await TodoModel.find({});
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new TodoModel(req.body);
  await todo.save();
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await TodoModel.findByIdAndDelete(id);
  res.json({ message: "Todo deleted successfully" });
});

// ye server start krne ka pre define function hai
app.listen(5000, () => console.log("Server started on port 5000"));
