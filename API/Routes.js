const express = require('express');
const appRoute = express.Router();
const mysql = require('mysql');

// Create connection
const DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todolist"
});
// Connect to MySQL
DB.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MySql Connected");
    }
});

// Difine function for exicute sql query
// Function take SQL and massage to display after success
const exicuteSQL = (sql, msg) => {
    // Exicute Quary
    DB.query(sql, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(msg);
        }
    });
}

// Define Routes ===================================

// Insert Data to Database
appRoute.route('/insert').post((req, res) => {
    // console.log(req.body);
    // Insert Values
    const sql = `INSERT INTO todo (Title,Status) VALUES ("${req.body.Title}","${req.body.Status}")`;
    // Exicute Quary
    exicuteSQL(sql, "Value Added to Database");
});

// View all data from Database 
appRoute.route('/view').get((req, res) => {
    // Select All Values
    const sql = `SELECT * FROM todo`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

// View Database by sorting 
appRoute.route('/sortitem').post((req, res) => {
    // Select All Values
    console.log(req.body.sortBy);
    const sql = `SELECT * FROM todo ORDER BY ${req.body.sortBy}`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

// View updating value from Database 
appRoute.route('/view-update/:id').get((req, res) => {
    const updateID = req.params.id;
    // Select All Values
    const sql = `SELECT * FROM todo WHERE dodoID = ${updateID}`;
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

// View Searching value from Database 
appRoute.route('/view-search/:id').get((req, res) => {
    const SearchTitle = req.params.id;
    console.log(SearchTitle)
    if (!SearchTitle) {
        var sql = `SELECT * FROM todo`;
    }
    else {
        var sql = `SELECT * FROM todo WHERE Title LIKE "%${SearchTitle}%"`;
    }
    // Select All Values
    // Exicute Quary
    DB.query(sql, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

// Update Data in Database
appRoute.route('/update').put((req, res) => {
    console.log(req.body);
    // Update Values
    const sql = `UPDATE todo SET Status="${req.body.Status}" WHERE dodoID = ${req.body.dodoID}`;
    // Exicute Quary
    exicuteSQL(sql, "Value Updated");
});


// Delete Data fom Table
appRoute.route('/delete/:id').delete((req, res) => {
    const deleteID = req.params.id;
    // Delete Values
    const sql = `DELETE FROM todo WHERE dodoID = ${deleteID}`;
    // Exicute Quary
    exicuteSQL(sql, "Value Deleted");
});


module.exports = appRoute;