INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Interconnected"),
        ("Sales"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Engineering Manager", 120000, 1),
        ("Engineering Lead", 100000, 1),
        ("Staff Engineer", 80000, 1),
        ("Finance Manager", 85000, 2),
        ("Accountant", 70000, 2),
        ("Brand Advocate Manager", 95000, 3),
        ("Brand Advocate Sr. Analyst", 82000, 3),
        ("Brand Advocate Analyst", 70000, 3),
        ("Sales Manager", 75000, 4),
        ("Salesperson", 65000, 4),
        ("Legal Manager", 110000, 5),
        ("Lawyer", 95000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bella", "Smith",  1, NULL),
        ("John", "Winter",  2, 1),
        ("Bella", "Hensen",  3, 1), 
        ("David", "Brand",  4, NULL), 
        ("Susan", "May",  5, 4),
        ("Ana", "Winston",  6, NULL), 
        ("Peter", "Dave",  7, 6), 
        ("Ivan", "Gold",  8, 6), 
        ("Sharlotte", "Fin",  9, NULL), 
        ("Reza", "Tehrani",  10, 9), 
        ("Ben", "Dalas",  11, NULL), 
        ("Melanie", "Ivanov",  12, 11);