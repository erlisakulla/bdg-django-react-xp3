const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user_router = require('./routes/UserAPI');


const app = express();


app.use(cors());
app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the game." });
});



app.use('', user_router);

const db = require("./models");
db.sequelize.sync();

// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
