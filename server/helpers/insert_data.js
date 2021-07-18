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

require('dotenv').config()

// import module from `../models/database.js`
const db = require('../models/database.js');
const User = require('../models/UserModel');

db.connect();

db.insertMany(User, users, () => console.log('Users inserted successfully'));