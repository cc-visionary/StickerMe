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

    // email validation
    if(email == '') {
      return res.status(400).send({ success: false, error:"Sorry, we don't accept empty emails." })
    }

    // username validation
    if(username == '') {
      return res.status(400).send({ success: false, error:"Sorry, we don't accept empty usernames." })
    }

    if(username.length < 4) {
      return res.status(400).send({ success: false, error:"Username cannot be less than 4 characters" })
    }

    const re_username = /^[a-zA-Z0-9_\.]+$/
    if(!re_username.test(username)) {
      return res.status(400).send({ success: false, error:"Username can only contain letters, numbers, dots, and underscores." })
    }

    // password validation
    if(password == '') {
      return res.status(400).send({ success: false, error:"Sorry, we don't accept empty passwords." })
    }

    if(password.length < 12) {
      return res.status(400).send({ success: false, error:"Password cannot be less than 12 characters" })
    }

    // email validation
    const re_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!re_email.test(email)) {
      return res.status(400).send({ success: false, error: "Invalid email format." })
    }

    // usertype validation
    if(userType != 'customer') {
      return res.status(400).send({ success: false, error: 'Usertype has to be customer.' });
    }

    const user = {
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds),
      userType,
    };

    db.findOne(User, { username }, (result1) => {
      // check if username exists
      if(result1.result) {
        return res.status(400).send({ success: false, error: 'Username already exists.' });
      } else {
        db.findOne(User, { email }, (result2) => {
          // check if email already exists
          if(result2.result) {
            return res.status(400).send({ success: false, error: 'Email already exists.' });
          } else {
            db.insertOne(User, user, (result) => {
              if (result.success) {
                res.status(200).send({ success: true, result: user });
              } else {
                res.status(400).send({ success: false, error: result.error.message });
              }
            });
          }
        })
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
