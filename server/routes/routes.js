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

// API for Users
app.get("/users", UserController.getAllUsers);

// API for Contacts
app.get("/contacts/userID/:userID", ContactController.getContactsByUserID);

app.get("/contacts/id/:id", ContactController.getContact);

app.post("/contacts/add", ContactController.insertContact);

app.patch("/contacts/update", ContactController.updateContact);

app.delete("/contacts/delete", ContactController.deleteContact);

// API for Orders

// API for Characters
app.get("/characters/userID/:userID", CharacterController.getCharactersByUserID);

app.get("/characters/id/:id", CharacterController.getCharacter);

app.post("/characters/add", CharacterController.insertCharacter);

app.patch("/characters/update", CharacterController.updateCharacter);

app.delete("/contacts/delete", CharacterController.deleteCharacter);

// API for Images
app.get("/images", ImageController.getAllImages);

app.get("/images/:imageType", ImageController.getImagesByType);

app.post("/images/upload", upload.any(), ImageController.insertImage);

app.delete("/images/:fileName", ImageController.deleteImage);

/*
    exports the object `app` (defined above)
    when another script exports from this file
*/
module.exports = app;
