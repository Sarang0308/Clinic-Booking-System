import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentForm from './components/AppointmentForm';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/appointment-form"
          element={isAuthenticated && role === 'patient' ? <AppointmentForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/patient"
          element={isAuthenticated && role === 'patient' ? <PatientDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/doctor"
          element={isAuthenticated && role === 'doctor' ? <DoctorDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
