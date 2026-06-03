import express from "express";
const app = express();
export default app;

app.use(express.json());

// STEP 5: route /employees to employees router
import employeesRouter from "./api/employees.js";
app.use("/", employeesRouter);

// error handler (must stay last)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
