const { Pool } = require('pg');
const { argv } = process; 
const findCohort = process.argv[2];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`;
const values = [findCohort || `JUL02`];

pool.query(queryString, values)
.then (res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort} : ${user.teacher}`);
  })
})
.catch (err => console.error('query error', err.stack));