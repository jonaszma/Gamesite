const mysql = require('mysql2');
const fs=require('fs');
//
// const initScript = fs.readFileSync('./gry.sql', 'utf8');
// db.query(initScript)
//     .then(() => console.log('Database initialized'))
//     .catch(err => console.error('Error initializing database:', err.message));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Zmień na użytkownika swojej bazy danych
    password: '', // Zmień na swoje hasło
    database: 'gry'
});


// const pool =mysql.createPool({
//
// })

module.exports = pool.promise();
