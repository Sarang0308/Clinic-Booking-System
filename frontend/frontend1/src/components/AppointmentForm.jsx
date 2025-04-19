import React, { useState, useEffect } from 'react';

const AppointmentForm = () => {
  const [form, setForm] = useState({
    doctorId: '',
    time: '',
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/appointments/getdoctors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
      if (Array.isArray(data)) {
        setDoctors(data);
      } else {
        console.error('Expected array but got:', data);
        setDoctors([]); // Fallback to empty
      }
    } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || 'Appointment booked!');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-300 via-blue-300 to-purple-300">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Book an Appointment</h2>
         <select
          className="w-full mb-4 p-3 border rounded-lg"
          value={form.doctorId}
          onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name}
            </option>
          ))}
        </select>
        <input
          className="w-full mb-4 p-3 border rounded-lg"
          type="datetime-local"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AppointmentForm;
