# Employee Tracker

## Description

This command-line application can be used to track company departments, job titles, managers, and individual employees. Different tables can be selected to display department and job title information like salary, as well as tracking employee roles and managers.

## Installation

This application was built primarily in Javascript, using Node.js. MYSQL Workbench was also used for ease of testing and querying the database, though it is not required.

Required npms:
* [mysql](https://www.npmjs.com/package/mysql2)
* [iquirer](https://www.npmjs.com/package/inquirer)
* [console.table](https://www.npmjs.com/package/console.table)
* [dotenv](https://www.npmjs.com/package/dotenv) (Optional - to protect MYQSL password)

## Usage

A password must be provided to sign into MYSQL, and there are a few ways to do this:
* Enter MYSQL from the command line using `mysql -u root -p` and enter your MYSQL password.
* Change the `server.js` file to include your password (under `const connection` update the right side of the `password: process.env.MYSQL_PASSWORD` value to your password information).
* Or create your own `.env` file to include `MYSQL_PASSWORD = ?` with your password information, using [dotenv](https://www.npmjs.com/package/dotenv).

*The last method is the safest, and it was the one I used. Just be careful not to push to github/or upload your password information by mistake!*

After installing the necessary npms and providing your password information, the program can be run on the terminal by evoking `node server.js`.

# Demonstration

https://user-images.githubusercontent.com/90315740/147884566-1ce72678-8f76-440e-bbef-8a77005b46ec.mp4
