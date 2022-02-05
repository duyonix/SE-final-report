require('dotenv').config();

const express = require('express');
const cors = require('cors');
const route = require('./routes');
const db = require('./config/db');
const fs = require('fs-extra');

// connect to database mongodb
db.connect()

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

route(app);

if (!fs.existsSync('uploads/')){
    fs.mkdirSync('uploads/');
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`);
});