// import module `express`
const express = require("express");

// import module `UserController` from `../controllers/UserController.js`
const UserController = require("../controllers/UserController.js");

// import module `ContactController` from `../controllers/ContactController.js`
const ContactController = require("../controllers/ContactController.js");

// import module `OrderController` from `../controllers/OrderController.js`
const OrderController = require("../controllers/OrderController.js");

// import module `CharacterController` from `../controllers/CharacterController.js`
const CharacterController = require("../controllers/CharacterController.js");

const ImageController = require("../controllers/ImageController");

const app = express();

const upload = require('../modules/multer');

app.get("/users", UserController.getAllUsers);
// 
app.post("/images/upload", upload.any(), ImageController.insertImage);

app.get("/images", ImageController.getAllImages);

/*
    exports the object `app` (defined above)
    when another script exports from this file
*/
module.exports = app;
