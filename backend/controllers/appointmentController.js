// controllers/appointmentController.js
const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, time } = req.body;

    const newAppointment = new Appointment({
      patientId: req.user.id,
      doctorId,
      time
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id });
    console.log('Raw Appointments:', appointments);

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patient appointments' });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id }).populate('patientId', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor appointments' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};
