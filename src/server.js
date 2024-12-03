const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); // To load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_NAME || 'vet_clinic_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, hashedPassword]
        );
        
        res.status(201).json({ 
            message: 'User registered successfully', 
            userId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// Pet Profile Operations
app.get('/api/pets', async (req, res) => {
    try {
        const [pets] = await pool.execute('SELECT * FROM pets');
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pets', error: error.message });
    }
});

app.post('/api/pets', async (req, res) => {
    try {
        const { name, species, breed, age, medicalHistory, userId } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO pets (user_id, name, species, breed, age, medical_history) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, name, species, breed, age, medicalHistory]
        );
        res.status(201).json({ 
            message: 'Pet added successfully', 
            petId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding pet', error: error.message });
    }
});

// Appointment Operations
app.get('/api/appointments', async (req, res) => {
    try {
        const [appointments] = await pool.execute('SELECT * FROM appointments');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
});

app.post('/api/appointments', async (req, res) => {
    try {
        const { petId, serviceType, appointmentDate } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO appointments (pet_id, service_type, appointment_date) VALUES (?, ?, ?)',
            [petId, serviceType, appointmentDate]
        );
        res.status(201).json({ 
            message: 'Appointment booked successfully', 
            appointmentId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error: error.message });
    }
});

// Admin Dashboard - All Appointments
app.get('/api/admin/appointments', async (req, res) => {
    try {
        const [appointments] = await pool.execute(`
            SELECT a.*, p.name as petName 
            FROM appointments a 
            JOIN pets p ON a.pet_id = p.id
        `);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin appointments', error: error.message });
    }
});

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});