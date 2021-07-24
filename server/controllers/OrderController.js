// import module from `../models/database.js`
const db = require('../models/database.js');

// import OrderSchema from `../models/OrderModel.js`
const Order = require('../models/OrderModel');

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require('../helpers/defaultCallback');

const OrderController = {
  getAllOrders: (req, res) => {
    db.findMany(Order, {}, (result) => defaultCallback(res, result));
  },
};
/*
    exports the object `OrderController` (defined above)
    when another script exports from this file
*/
module.exports = OrderController;