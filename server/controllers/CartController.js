// import module from `../models/database.js`
const db = require("../models/database.js");

// import CartSchema from `../models/CartModel.js`
const Cart = require("../models/CartModel");

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require("../helpers/defaultCallback");

const CartController = {
  getCartByUser: (req, res) => {
    const { username } = req.params;

    db.findMany(Cart, { username }, (result) => defaultCallback(res, result));
  },
  insertCart: (req, res) => {
    const { username, characterID } = req.body;

    const cart = { username, characterID }

    db.insertOne(Cart, cart, (result) => {
      if (result.success) {
        res.status(200).send({ success: true, result: cart });
      } else {
        res.status(400).send({ success: false, error: result.error.message });
      }
    });
  },
  deleteCartItem: (req, res) => {
    const { username, characterID } = req.body;

    db.deleteOne(Cart, { username, characterID }, (result) => defaultCallback(res, result));
  },
  deleteCart: (req, res) => {
    const { username } = req.body;

    db.deleteOne(Cart, { username }, (result) => defaultCallback(res, result));
  }
};
/*
    exports the object `CartController` (defined above)
    when another script exports from this file
*/
module.exports = CartController;
