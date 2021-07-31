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
  login: (req, res) => {
    const { username, password } = req.body;

    if (username.length === 0)
      return res.status(400).send({
        success: false,
        error: "Sorry, we don't accept empty usernames.",
      });
    if (password.length === 0)
      return res.status(400).send({
        success: false,
        error: "Sorry, we don't accept empty password.",
      });

    db.findOne(User, { username }, (result) => {
      const data = result.result;
      if (data) {
        if (bcrypt.compareSync(password, data.password)) {
          req.session.username = data.username;
          req.session.email = data.email;
          req.session.userType = data.userType;
          res.status(200).send({
            success: true,
            user: {
              username: data.username,
              email: data.email,
              userType: data.userType,
            },
          });
        } else {
          return res
            .status(400)
            .send({ success: false, error: "Incorrect username or password." });
        }
      } else {
        return res
          .status(400)
          .send({ success: false, error: "Incorrect username or password." });
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

    if (errors.isEmpty()) {
      const { username, password } = req.query;

      db.findOne(User, { username }, (result) => {
        if (bcrypt.compareSync(password, result.password)) {
          res.status(200).send({ success: true });
        } else
          res
            .status(200)
            .send({ success: false, error: "Password doesn't match..." });
      });
    }
  },
};
/*
    exports the object `UserController` (defined above)
    when another script exports from this file
*/
module.exports = UserController;
