/*
  This script inserts the following:
    1. 5 users to the collection 'users' 
*/

const users = [
  { username: "user", password: "password" },
  { username: "admin", password: "password" },
  { username: "john", password: "password" },
  { username: "kyle", password: "password" },
  { username: "jacob", password: "password" },
];

const contacts = [

]

const characters = [

]

const orders = [

]

require('dotenv').config()

// import module from `../models/database.js`
const db = require('../models/database.js');
const User = require('../models/UserModel');
const Contact = require('../models/ContactModel');
const Character = require('../models/CharacterModel');
const Order = require('../models/OrderModel');

db.connect();

db.insertMany(User, users, null);
db.insertMany(Contact, contacts, null);
db.insertMany(Character, characters, null);
db.insertMany(Order, orders, null);