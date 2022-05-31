SELECT count(assistance_requests.*) as total_assistance, students.name as name 
FROM assistance_requests
JOIN students ON students.id = student_id
WHERE name = 'Elliot Dickinson'
GROUP BY students.name;