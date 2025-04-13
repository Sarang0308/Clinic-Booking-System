import React, { useEffect, useState } from 'react';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await fetch('http://localhost:5000/api/appointments/patient', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-200 via-rose-200 to-cyan-200 p-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-rose-700">My Appointments</h2>
      <div className="grid gap-4">
        {appointments.map((appt) => (
          <div key={appt._id} className="bg-white p-6 rounded-lg shadow-xl">
            <p className="font-semibold">Doctor ID: {appt.doctorId}</p>
            <p>Time: {new Date(appt.time).toLocaleString()}</p>
            <p>Status: <span className={`font-bold ${appt.status === 'approved' ? 'text-green-600' : appt.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{appt.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;
