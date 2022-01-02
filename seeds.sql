INSERT INTO department
    (department)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');


INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 10000.00, 4),
    ('Salesperson', 8000.00, 4),
    ('Lead Engineer', 15000.00, 1),
    ('Software Engineer', 10000.00, 1),
    ('Account Manager', 16000.00, 2),
    ('Accountant', 12500.00, 2),
    ('Legal Team Lead', 25000.00, 3),
    ('Lawyer', 19000.00, 3);


INSERT INTO employee 
    (first_name, last_name, role_id)
VALUES
    ('John', 'Doe', 1),
    ('Mike', 'Chan', 2),
    ('Ashley', 'Rodriquez', 3),
    ('Kevin', 'Tupik', 4),
    ('Kunal', 'Singh', 5),
    ('Malia', 'Brown', 6),
    ('Sarah', 'Lourd', 7),
    ('Tom', 'Allen', 8);