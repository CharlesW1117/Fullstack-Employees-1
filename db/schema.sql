-- Fullstack Employees Database Schema
-- Creates the employees table with required columns.

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  department VARCHAR(100),
  role VARCHAR(100),
  salary NUMERIC(10,2),
  hire_date DATE DEFAULT CURRENT_DATE
);