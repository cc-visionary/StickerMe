// import module from `../models/database.js`
const db = require("../models/database.js");

// import ContactSchema from `../models/ContactModel.js`
const Contact = require("../models/ContactModel");

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require("../helpers/defaultCallback");

const ContactController = {
  insertContact: (req, res) => {
    const {
      userID,
      fullName,
      phone,
      address,
      city,
      country,
      zipcode,
      paypalEmail,
    } = req.body;

    const contact = {
      userID,
      fullName,
      phone,
      address,
      city,
      country,
      zipcode,
      paypalEmail,
    };

    db.insertOne(Contact, contact, (result) => {
      if (result.success) {
        res.status(200).send("Contact was successfully added to the database!");
      } else {
        res.status(400).send(error.message);
      }
    });
  },
  getContactByID: (req, res) => {
    const { id } = req.params;
    db.findOne(Contact, { _id: id }, (result) => defaultCallback(res, result));
  },
  getContactsByUserID: (req, res) => {
    const { userID } = req.params;
    db.findMany(Contact, { userID }, (result) => defaultCallback(res, result));
  },
  editContact: (req, res) => {
    const {
      id,
      userID,
      fullName,
      phone,
      address,
      city,
      country,
      zipcode,
      paypalEmail,
    } = req.body;

    const contact = {
      // userID, <- non-editable
      fullName,
      phone,
      address,
      city,
      country,
      zipcode,
      paypalEmail, // <- verify
    };

    db.updateOne(Contact, { _id: id }, contact, (result) => defaultCallback(res, result));
  },
  deleteContact: (req, res) => {
    const { id } = req.params;

    db.deleteOne(Contact, { _id: id }, (result) => defaultCallback(res, result));
  }
};
/*
    exports the object `ContactController` (defined above)
    when another script exports from this file
*/
module.exports = ContactController;
