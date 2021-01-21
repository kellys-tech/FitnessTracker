const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const user = require("./user.js");

const app = express();

app.use(logger("dev")); //what is "dev"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//create and name database ("fitness") is db name
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", {useNewUrlParser: true,});

//could seed database here with an example but we already have a seed file


//data object could come from from the front end from the post request
// Example.create(data)
// .then(dbExample => {
//   console.log(dbExample);
// })
// .catch(({message}) => {
//   console.log(message)
// });
// //all above code from activity 10

// routes
// app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:3000`);
});
