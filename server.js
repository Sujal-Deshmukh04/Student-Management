const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory student storage
let students = [];

// Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Add student
app.post('/add', (req, res) => {
    const { name, age, course } = req.body;

    const student = {
        id: students.length + 1,
        name,
        age,
        course
    };

    students.push(student);

    res.redirect('/students');
});

// View students
app.get('/students', (req, res) => {
    let html = `
    <h2>Student List</h2>
    <a href="/">Add New Student</a>
    <ul>
    `;

    students.forEach(s => {
        html += `<li>${s.id} - ${s.name} (${s.age}) - ${s.course}</li>`;
    });

    html += "</ul>";

    res.send(html);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});