// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { createAppointment, getPatientAppointments, getDoctorAppointments, updateAppointmentStatus,getAllDoctors } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Book appointment (patient)
router.post('/', authMiddleware, createAppointment);

// Get patient's own appointments
router.get('/patient', authMiddleware, getPatientAppointments);

// Get doctor's appointments
router.get('/doctor', authMiddleware, getDoctorAppointments);
router.get('/getdoctors',authMiddleware, getAllDoctors);
// Doctor updates status (approve/reject)
router.put('/:id/status', authMiddleware, updateAppointmentStatus);

module.exports = router;
