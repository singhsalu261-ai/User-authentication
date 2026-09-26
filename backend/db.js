require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: process.env.DB_PASSWORD     
});

db.connect(err => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        return;
    }
    console.log('Connected to MySQL Server!');

    db.query('CREATE DATABASE IF NOT EXISTS auth_db', (err) => {
        if (err) {
            console.error('Database Creation Error:', err);
            return;
        }
        console.log('Database "auth_db" ready!');

        db.changeUser({ database: 'auth_db' }, (err) => {
            if (err) {
                console.error('Database Switch Error:', err);
                return;
            }

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            db.query(createTableQuery, (err) => {
                if (err) {
                    console.error('Table Creation Error:', err);
                } else {
                    console.log('Table "users" ready!');
                }
            });
        });
    });
});

module.exports = db;