const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//create and name database ("fitness")
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  usefindAndModify: false,
  useUnifiedTopology: true
});

//routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:3001`);
});
