// import module `express`
const express = require('express');

// import module `UserController` from `../controllers/UserController.js`
const UserController = require('../controllers/UserController.js')

const app = express();

app.get('/users', UserController.getAllUsers)

/*
    exports the object `app` (defined above)
    when another script exports from this file
*/
module.exports = app;