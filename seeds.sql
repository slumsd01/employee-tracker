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


INSERT INTO manager
    (id, manager)
VALUES
    (1, 'John Doe'),
    (3, 'Ashley Rodriquez'),
    (5, 'Kunal Singh'),
    (7, 'Sarah Lourd');

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriquez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);