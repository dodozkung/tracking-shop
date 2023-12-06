const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbconnect = require("./db");

const db = require("./models");
const Role = db.role;
const app = express();

require('dotenv').config();
require('./routes/user.routes')(app);
require('./routes/auth.routes')(app);
dbconnect();

var corsOptions = {
  origin: "http://localhost:8899"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "tracking-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tracking application by DoDoz." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8000  ;
app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.find((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
initial();
