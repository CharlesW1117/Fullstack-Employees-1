import express from "express";
const router = express.Router();
export default router;

import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

// GET /
router.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// GET /employees
router.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees
router.post("/employees", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body || {};

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body required");
    }

    if (!name || !birthday || !salary) {
      return res.status(400).send("Missing required field(s)");
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  } catch (err) {
    next(err);
  }
});


// GET /employees/:id
router.get("/employees/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.send(employee);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id
router.put("/employees/:id", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body || {};

    // ✅ check for empty body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body required");
    }

    // ✅ check for missing required fields
    if (!name || !birthday || !salary) {
      return res.status(400).send("Missing required field(s)");
    }

    const updated = await updateEmployee({
      id: req.params.id,
      name,
      birthday,
      salary,
    });

    if (!updated) {
      return res.status(404).send("Employee not found");
    }

    res.send(updated);
  } catch (err) {
    next(err);
  }
});




// DELETE /employees/:id
router.delete("/employees/:id", async (req, res, next) => {
  try {
    const deleted = await deleteEmployee(req.params.id);
    if (!deleted) return res.status(404).send("Employee not found");
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
