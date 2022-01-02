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
    inquirer.prompt({
        name: 'main',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee role',
            'Quit'
        ]
    }).then( (selection) => {
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
            case 'Add a department':
                addDepartment()
                break;
            case 'Add a role':
                addRole()
                break;
            case 'Add an employee':
                addEmployee()
                break;
            case 'Update employee role':
                updateEmployee()
                break;
            case 'Quit':
                connection.end()
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

function addDepartment() {
    inquirer.prompt({
        name: 'newDepartment',
        type: 'input',
        message: 'Enter the name of the new department.'
    }).then( (input) => {
        let params = [ input.newDepartment ]
        connection.promise().query(`INSERT INTO department (department) VALUES (?)`, params)
            .then( ([results]) => {
            console.log(`New department added!`);
            mainMenu()
        })
    })
}

function addRole() {
    // show departments to choose from
    
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the new role.'
        }, 
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary of the new role.'
        }, 
        {
            name: 'department',
            type: 'input',
            message: function () {
                connection.promise().query(`SELECT * FROM department`)
                .then( ([results]) => {
                    console.log('\n')
                    console.table(results);
                    console.log('What department is this role associated with? (Enter the id number from the table above.)')
                })
            }
        }
    ]).then( (newRole) => {
        let params = [ newRole.title, newRole.salary, newRole.department ]
        connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, params)
        .then( ([results]) => {
            console.log(`New role added!`);
            mainMenu()
        })
    })
    
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "Enter the new employee's first name."
        }, 
        {
            name: 'lastName',
            type: 'input',
            message: "Enter the new employee's last name."
        }, 
        {
            name: 'role',
            type: 'input',
            message: function () {
                connection.promise().query(`SELECT role.id, role.title FROM role`)
                .then( ([results]) => {
                    console.log('\n')
                    console.table(results);
                    console.log('What role does this employee have? (Enter the id number from the table above.)')
                })
            }
        }
    ]).then( (newEmployee) => {
        let params = [ newEmployee.firstName, newEmployee.lastName, newEmployee.role ]
        connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`, params)
        .then( ([results]) => {
            console.log(`New role added!`);
            mainMenu()
        })
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: function () {
                connection.promise().query
                    (
                        `SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee
                        JOIN role ON role_id = role.id`
                    )
                .then( ([results]) => {
                    console.log('\n')
                    console.table(results);
                    console.log('What employee would you like to update? (Enter the id number from the table above.)')
                })
            }
        }, 
        {
            name: 'role',
            type: 'input',
            message: function () {
                connection.promise().query(`SELECT role.id, role.title FROM role`)
                .then( ([results]) => {
                    console.log('\n')
                    console.table(results);
                    console.log('What is their updated role? (Enter the id number from the table above.)')
                })
            }
        }
    ]).then((updatedEmployee) => {
        let params = [ updatedEmployee.role, updatedEmployee.id ]
        connection.promise().query(`UPDATE employee SET role_id = (?) WHERE id = (?)`, params)
        .then( ([results]) => {
            console.log(`Employee updated!`);
            mainMenu()
        })
    })
}

mainMenu()