const express = require("express");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express();
require('dotenv').config();
process.env.TZ = 'Etc/Universal';

var corsOptions = {
  // origin: "http://localhost" 
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync({alter: true}) //{ force: true }  >>>> drop the table if it already exists
  .then(() => {
    console.log("Synced db.");
    // seeder
    const categorySeeder = require('./app/seeder/category.seeder');
    categorySeeder();
    const reasonSeeder = require('./app/seeder/reason.seeder');
    reasonSeeder();
    const introductionSeeder = require('./app/seeder/introduction.seeder');
    introductionSeeder();
    const sendnotification = require('./app/seeder/notification.seeder');
    sendnotification();
    
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.use(express.static('uploads'))

app.get("/", (req, res) => {
  res.json({message: `Server running on port ${PORT}`})
});

require("./app/routes/reason.routes")(app);
require("./app/routes/introduction.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/notification.routes")(app);

app.use("/api/user", require('./app/routes/users'));
app.use("/api/auth", require('./app/routes/auth'));
app.use("/api/item", require('./app/routes/item'));

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

