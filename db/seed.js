import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  await db.query('DELETE FROM employees;');

  // Insert at least 10 employees
  const employees = [
    ['Alice', 'Johnson', 'Engineering', 'Software Engineer', 95000],
    ['Bob', 'Smith', 'Engineering', 'DevOps Engineer', 90000],
    ['Carol', 'Lee', 'Design', 'UX Designer', 85000],
    ['David', 'Brown', 'Marketing', 'SEO Specialist', 78000],
    ['Ella', 'Martinez', 'Sales', 'Account Executive', 82000],
    ['Frank', 'Garcia', 'Finance', 'Analyst', 88000],
    ['Grace', 'Kim', 'HR', 'Recruiter', 76000],
    ['Henry', 'Nguyen', 'Engineering', 'Frontend Developer', 92000],
    ['Isla', 'Patel', 'Support', 'Customer Success', 70000],
    ['Jack', 'Wilson', 'Operations', 'Manager', 97000]
  ];

  for (const e of employees) {
    await db.query(
      `INSERT INTO employees (first_name, last_name, department, role, salary)
       VALUES ($1, $2, $3, $4, $5);`,
      e
    );
  }
}
