const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function getDbConnection() {
    return await mysql.createConnection({
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
}

async function viewAllDepartments(db) {
    const [departments] = await db.query("SELECT * FROM department");
    console.table(departments);
}

async function viewAllRoles(db) {
    const [roles] = await db.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id
    `);
    console.table(roles);
}

async function viewAllEmployees(db) {
    const [employees] = await db.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    console.table(employees);
}

async function addDepartment(db) {
    const { department } = await inquirer.prompt({
        name: "department",
        message: "Enter New Department Name:"
    });
    await db.query("INSERT INTO department (name) VALUES (?);", [department]);
    console.log(`Added ${department} to departments`);
}

async function addRole(db) {
    const [departments] = await db.query("SELECT id, name FROM department");
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

    const answers = await inquirer.prompt([
        {
            name: "title",
            message: "Enter New Role Title:"
        },
        {
            name: "salary",
            message: "Enter Salary for the Role:",
            validate: input => !isNaN(parseFloat(input)) || "Please enter a valid number"
        },
        {
            type: "list",
            name: "department_id",
            message: "Select Department for the Role:",
            choices: departmentChoices
        }
    ]);

    await db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [answers.title, answers.salary, answers.department_id]);
    console.log(`Added ${answers.title} to roles`);
}

async function addEmployee(db) {
    const [roles] = await db.query("SELECT id, title FROM role");
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

    const [managers] = await db.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE manager_id IS NULL");
    const managerChoices = managers.map(manager => ({ name: manager.name, value: manager.id }));

    const answers = await inquirer.prompt([
        {
            name: "first_name",
            message: "Enter Employee's First Name:"
        },
        {
            name: "last_name",
            message: "Enter Employee's Last Name:"
        },
        {
            type: "list",
            name: "role_id",
            message: "Select Employee's Role:",
            choices: roleChoices
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select Employee's Manager:",
            choices: managerChoices
        }
    ]);

    await db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
    console.log(`Added ${answers.first_name} ${answers.last_name} to employees`);
}

async function updateEmployeeRole(db) {
    const [employees] = await db.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee");
    const employeeChoices = employees.map(emp => ({ name: emp.name, value: emp.id }));

    const [roles] = await db.query("SELECT id, title FROM role");
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Select Employee to Update:",
            choices: employeeChoices
        },
        {
            type: "list",
            name: "role_id",
            message: "Select New Role:",
            choices: roleChoices
        }
    ]);

    await db.query("UPDATE employee SET role_id = ? WHERE id = ?;", [answers.role_id, answers.employee_id]);
    console.log(`Updated role for ${answers.employee_id}`);
}

async function dbConnection(select) {
    const db = await getDbConnection();

    try {
        switch (select) {
            case "View All Departments":
                await viewAllDepartments(db);
                break;
            case "View All Roles":
                await viewAllRoles(db);
                break;
            case "View All Employees":
                await viewAllEmployees(db);
                break;
            case "Add a Department":
                await addDepartment(db);
                break;
            case "Add a Role":
                await addRole(db);
                break;
            case "Add an Employee":
                await addEmployee(db);
                break;
            case "Update an Employee Role":
                await updateEmployeeRole(db);
                break;
        }
    } catch (err) {
        console.error("Error: ", err);
    } finally {
        await db.end();
    }
}

function userPrompt() {
    inquirer.prompt({
        type: "list",
        name: "select",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            new inquirer.Separator(),
            "Quit"
        ]
    })
    .then(async (res) => {
        if (res.select === "Quit") {
            console.log("Exiting application.");
            process.exit();
        } else {
            await dbConnection(res.select);
            userPrompt();
        }
    })
    .catch((err) => {
        console.error("An error occurred: ", err);
    });
}

userPrompt();
