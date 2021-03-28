const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user_router = require("./routes/UserAPI");
const game_router = require("./routes/GameAPI");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// simple route

const db = require("./models");
db.sequelize.sync();


app.use("/user", user_router);

app.use("/game", game_router);


// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
