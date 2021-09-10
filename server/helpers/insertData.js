/*
  This script inserts the following:
    1. 5 users to the collection "users" 
*/

// import bcrypt for encrypting the password by hashing
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync();

const users = [
  { username: "moderator", email: "moderator@gmail.com", password: bcrypt.hashSync("password", saltRounds), userType: "admin" },
  { username: "customer", email: "customer@gmail.com", password: bcrypt.hashSync("password", saltRounds), userType: "customer" },
  { username: "john", email: "john@gmail.com", password: bcrypt.hashSync("password", saltRounds), userType: "customer" },
  { username: "kyle", email: "kyle@gmail.com", password: bcrypt.hashSync("password", saltRounds), userType: "customer" },
  { username: "jacob", email: "jacob@gmail.com", password: bcrypt.hashSync("password", saltRounds), userType: "customer" },
];

const contacts = [
  
];

const characters = [

]

const orders = [

]

require("dotenv").config()

// import module from `../models/database.js`
const db = require("../models/database.js");
const User = require("../models/UserModel");
const Contact = require("../models/ContactModel");
const Character = require("../models/CharacterModel");
const Order = require("../models/OrderModel");

db.connect();

db.insertMany(User, users, (res) => console.log(res));
// db.insertMany(Contact, contacts, (res) => console.log(res));
// db.insertMany(Character, characters, (res) => console.log(res));
// db.insertMany(Order, orders, (res) => console.log(res));
