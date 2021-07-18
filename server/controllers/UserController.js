// import module from `../models/database.js`
const db = require('../models/database.js');

// import UserSchema from `../models/UserModel.js`
const User = require('../models/UserModel');

const defaultCallback = (res, result) => res.status(200).json(result)

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