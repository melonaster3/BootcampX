const { Pool } = require('pg');
const { argv } = process; 
const findCohort = process.argv[2];
const maxResult = process.argv[3];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
pool.query(`
SELECT students.id, students.name as student, cohorts.name
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE '${findCohort}%'
LIMIT ${maxResult};`)
.then (res => {
  res.rows.forEach(user => {
    console.log(`${user.student} has an id of ${user.id} and was in the ${user.name} cohort`);
  })
})
.catch (err => console.error('query error', err.stack));