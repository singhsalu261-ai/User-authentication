const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';


router.post('/register', async (req, res) => {
    console.log("Register API Hit with Body:", req.body);

    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'required filled all data.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: ' Do not Password and Confirm Password match .' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Database Insert Error:", err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: ' This Email already registered .' });
                }
                return res.status(500).json({ message: 'Database error.' });
            }
            res.status(201).json({ message: 'Registration successful!' });
        });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: 'Server error.' });
    }
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Required Email and Password.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'you have entered wrong password.' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful!',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
});

module.exports = router;