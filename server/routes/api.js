const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const events = require('./events');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// declare axios for making http requests
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/events', (req, res) => {
  res.send(events[0]);
});

// Get all posts
router.get('/events', (req, res) => {
    res.send(events);
});

module.exports = router;