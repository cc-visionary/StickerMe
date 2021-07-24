// import module from `../models/database.js`
const db = require('../models/database.js');

// import ContactSchema from `../models/ContactModel.js`
const Contact = require('../models/ContactModel');

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require('../helpers/defaultCallback');

const ContactController = {
  getContactsByUserID: (req, res) => {
    db.findMany(Contact, {}, (result) => defaultCallback(res, result));
  },
};
/*
    exports the object `ContactController` (defined above)
    when another script exports from this file
*/
module.exports = ContactController;