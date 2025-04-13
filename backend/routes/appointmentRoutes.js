// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { createAppointment, getPatientAppointments, getDoctorAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Book appointment (patient)
router.post('/', authMiddleware, createAppointment);

// Get patient's own appointments
router.get('/', authMiddleware, getPatientAppointments);

// Get doctor's appointments
router.get('/doctor', authMiddleware, getDoctorAppointments);

// Doctor updates status (approve/reject)
router.put('/:id', authMiddleware, updateAppointmentStatus);

module.exports = router;
