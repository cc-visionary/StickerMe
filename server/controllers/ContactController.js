// import module from `../models/database.js`
const db = require('../models/database.js');

// import ContactSchema from `../models/ContactModel.js`
const Contact = require('../models/ContactModel');

const defaultCallback = (res, result) => res.status(200).json(result)

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