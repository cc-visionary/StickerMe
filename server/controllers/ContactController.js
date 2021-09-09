// import module from `../models/database.js`
const db = require("../models/database.js");

// import ContactSchema from `../models/ContactModel.js`
const Contact = require("../models/ContactModel");

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require("../helpers/defaultCallback");

const ContactController = {
  getContactsByUsername: (req, res) => {
    const { username } = req.params;
    db.findMany(Contact, { username }, (result) => defaultCallback(res, result));
  },
  insertContact: (req, res) => {
    const {
      username,
      firstName,
      lastName,
      phone,
      address1,
      address2,
      city,
      country,
      zipcode,
      paypalEmail
    } = req.body;

    const contact = {
      username,
      firstName,
      lastName,
      phone,
      address1,
      address2,
      city,
      country,
      zipcode,
      paypalEmail
    };

    db.insertOne(Contact, contact, (result) => {
      if (result.success) {
        res.status(200).send({ success: true, result: contact });
      } else {
        res.status(400).send({ success: false, error: result.error.message });
      }
    });
  },
  updateContact: (req, res) => {
    const {
      _id,
      fullName,
      phone,
      address,
      city,
      country,
      zipcode,
      paypalEmail,
    } = req.body;

    const contact = {
      // username, <- non-editable
      fullName,
      phone,
      address,
      city,
      country,
      zipcode,
      paypalEmail, // <- verify
    };

    db.updateOne(Contact, { _id }, contact, (result) => defaultCallback(res, result));
  },
  deleteContact: (req, res) => {
    const { id } = req.params;

    db.deleteOne(Contact, { _id: id }, (result) => defaultCallback(res, result));
  },
};
/*
    exports the object `ContactController` (defined above)
    when another script exports from this file
*/
module.exports = ContactController;
