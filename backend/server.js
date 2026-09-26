const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(cors());


app.use(express.json());


app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send("Backend Server is Running Perfectly!");
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});