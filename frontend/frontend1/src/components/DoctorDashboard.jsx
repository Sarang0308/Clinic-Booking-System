import React, { useEffect, useState } from 'react';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await fetch('http://localhost:5000/api/appointments/doctor', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    setAppointments(data);
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-200 to-lime-200 p-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">Doctor Dashboard</h2>
      <div className="grid gap-4">
        {appointments.map((appt) => (
          <div key={appt._id} className="bg-white p-6 rounded-lg shadow-xl flex justify-between items-center">
            <div>
              <p className="font-semibold">Patient ID: {appt.patientId}</p>
              <p>Time: {new Date(appt.time).toLocaleString()}</p>
              <p>Status: <span className={`font-bold ${appt.status === 'approved' ? 'text-green-600' : appt.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{appt.status}</span></p>
            </div>
            {(appt.status === 'pending') && (
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(appt._id, 'approved')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(appt._id, 'rejected')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Reject
              </button>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
