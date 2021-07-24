// import module from `../models/database.js`
const db = require('../models/database.js');

// import UserSchema from `../models/UserModel.js`
const User = require('../models/UserModel');

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require('../helpers/defaultCallback');

const UserController = {
  getAllUsers: (req, res) => {
    db.findMany(User, {}, (result) => defaultCallback(res, result));
  },
};
/*
    exports the object `UserController` (defined above)
    when another script exports from this file
*/
module.exports = UserController;