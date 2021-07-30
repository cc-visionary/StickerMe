// import module from `../models/database.js`
const db = require("../models/database.js");

// import UserSchema from `../models/UserModel.js`
const User = require("../models/UserModel");

// import bcrypt for encrypting the password by hashing
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync();

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require("../helpers/defaultCallback");

const UserController = {
  getAllUsers: (req, res) => {
    db.findMany(User, {}, (result) => defaultCallback(res, result));
  },
  getUserByUsername: (req, res) => {
    const { username } = req.params;

    db.findOne(User, { username }, (result) => defaultCallback(res, result));
  },
  insertUser: (req, res) => {
    const { username, email, password, userType } = req.body;

    const user = {
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds),
      userType,
    };

    db.insertOne(User, user, (result) => {
      if (result.success) {
        res.status(200).send("User was successfully added to the database!");
      } else {
        res.status(400).send(error.message);
      }
    });
  },
  updateUser: (req, res) => {
    const { username, email, password, userType } = req.body;

    const user = {
      // username, <- non-editable
      email,
      password,
      userType,
    };

    db.updateOne(User, { username }, user, (result) =>
      defaultCallback(res, result)
    );
  },
  deleteUser: (req, res) => {
    const { username } = req.params;

    db.deleteOne(User, { username }, (result) => defaultCallback(res, result));
  },
  getLogin: (req, res) => {
    const { username, email, password, userType } = req.session;
    if (username) {
      const user = { username, email, password, userType };
      res.status(200).send({ success: true, result: user });
    } else {
      res.send({ success: false });
    }
  },
  login: (req, res) => {
    const { username, password, remember } = req.body;

    db.findOne(User, { username }, (result) => {
      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          // only keep the user logged in, if user asked to be `remember` is true
          if (remember) {
            req.session.username = result.password;
            req.session.email = result.email;
            req.session.userType = result.userType;
          }
          res.status(200).send({ success: true, user: result });
        } else {
          res
            .status(404)
            .send({ success: false, error: "Incorrect password..." });
        }
      } else {
        res
          .status(400)
          .send({ success: false, error: "Username doesn't exist..." });
      }
    });
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.send({ success: false, error: err });
        throw err;
      }
      res.send({ success: true });
    });
  },
  verifyPassword: (req, res) => {
    // checks if there are validation errors
    var errors = validationResult(req);

    if(errors.isEmpty()) {
      const { username, password } = req.query;

      db.findOne(User, { username }, (result) => {
        if(bcrypt.compareSync(password, result.password)) {
          res.status(200).send({success: true})
        } else res.status(200).send({success: false, error: "Password doesn't match..."})
      })
    }
  }
};
/*
    exports the object `UserController` (defined above)
    when another script exports from this file
*/
module.exports = UserController;
