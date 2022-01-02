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

function mainMenu() {
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
                viewDepartments()
                break;
            case 'View all roles':
                viewRoles()
                break;
            case 'View all employees':
                viewEmployees()
                break;
        }
    })
}

function viewDepartments() {
    connection.promise().query(`SELECT * FROM department`)
    .then( ([results]) => {
        console.table(results);
        mainMenu()
    })
}

function viewRoles() {
    connection.promise().query
        (
            `SELECT role.id, role.title, department.department, role.salary FROM role 
            JOIN department ON department_id = department.id
            ORDER BY role.id;`
        )
    .then( ([results]) => {
        console.table(results);
        mainMenu()
    })
}

function viewEmployees() {
    connection.promise().query
        (
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            ORDER BY employee.id;`
        )
    .then( ([results]) => {
        console.table(results);
        mainMenu()
    })
}

mainMenu()