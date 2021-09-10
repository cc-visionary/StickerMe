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
app.get("/users/:username", UserController.getUserByUsername);

app.get("/users", UserController.getAllUsers);

app.post("/users", UserController.insertUser);

app.patch("/users/update", UserController.updateUser);

app.delete("/users/:username", UserController.deleteUser);

app.post("/users/login", UserController.login);

app.post("/users/logout", UserController.logout);

// API for Contacts
app.get("/contacts/username/:username", ContactController.getContactsByUsername);

app.post("/contacts/add", ContactController.insertContact);

app.patch("/contacts/update", ContactController.updateContact);

app.delete("/contacts/delete/:id", ContactController.deleteContact);

// API for Orders
app.get("/orders", OrderController.getAllOrders);

app.get("/orders/:username", OrderController.getOrderByUser);

app.post("/orders", OrderController.insertOrder);

app.patch("/orders/status/:id", OrderController.updateStatus);

app.patch("/orders/cancel/:id", OrderController.cancelOrder);

app.delete("/orders/delete/:id", OrderController.deleteOrder);

// API for Characters
app.get("/characters/username/:username", CharacterController.getCharactersByUsername);

app.get("/characters", CharacterController.getAllCharacters);

app.post("/characters/add", CharacterController.insertCharacter);

app.patch("/characters/update", CharacterController.updateCharacter);

app.delete("/characters/delete/:id", CharacterController.deleteCharacter);

// API for Images
app.get("/images/id/:id", ImageController.getImagesByID);

app.get("/images/type/:imageType", ImageController.getImagesByType);

app.get("/images", ImageController.getAllImages);

app.post("/images/upload", upload.any(), ImageController.insertImage);

app.delete("/images/:fileName", ImageController.deleteImage);

/*
    exports the object `app` (defined above)
    when another script exports from this file
*/
module.exports = app;
