const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'tracker_db'
})

inquirer
.prompt({
    name: 'main',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees'
    ]
})
.then((selection) => {
    switch (selection.main) {
        case 'View all departments':
            console.log('Departments')
            break;
        case 'View all roles':
            console.log('Roles')
            break;
        case 'View all employees':
            console.log('Employees')
            break;
    }
})

// connection.promise().query("SELECT * FROM employee")
//   .then( ([results]) => {
//     console.table(results);
//   })
//   .catch(console.log)
//   .then( () => connection.end());