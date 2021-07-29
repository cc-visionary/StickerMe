/* 
  Sets up the session and connection to backend, then listens to those connection.
*/

// import module `cors`, `body-parser`, `path`, `express-session`, `session`, `mongoose`, `connect-mongo`
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

const db = require("./models/database");

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(require('morgan')('tiny'));

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }))

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static(path.resolve(__dirname, "../client/public")));

// connects to the database
db.connect();

// import module `routes` from `./routes/routes.js`
const routes = require("./routes/routes.js");

// setups the session tracker
app.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    autoRemove: "disabled",
  })
);

// define paths for uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// define the paths contained in `./routes/routes.js`
app.use("/api", routes);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
});

// binds the server to a specific port
app.listen(port, () => console.debug("app listening at port " + port));
