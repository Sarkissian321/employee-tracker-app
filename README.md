# Employee Tracker App
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
- [Employee Tracker App](#employee-tracker-app)
  - [Description](#description)
  - [Usage](#usage)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Installation](#installation)
  - [Contributing](#contributing)
  - [Questions](#questions)

## Description
This application is a Node.js-based command-line interface (CLI) for managing an employee database, allowing users to interactively view, add, and update various aspects of employee data. Utilizing inquirer for user prompts and mysql2 for database operations, the application enables tasks such as viewing all departments, roles, and employees, adding new departments, roles, and employees, and updating employees' roles. It's designed to streamline HR and management tasks by providing a user-friendly interface for handling common database operations without the need for direct interaction with the database or SQL commands, enhancing efficiency in managing employee-related data.

Link to this repository: https://github.com/Sarkissian321/employee-tracker-app

## Usage
https://github.com/Sarkissian321/employee-tracker-app/assets/142841411/68bb687b-3656-4bbf-a641-693efc34b454

## Acceptance Criteria 

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Installation
To run this application:

1. Clone this repository
2. Run ```npm i``` to install all dependencies
3. Invoke app with ```node index.js``` 


## Contributing
Feel free to contribute!

## Questions
Contact me at my GitHub account: Sarkissian321

<br> e-mail: sarkissian.mell321@yahoo.com </br>
