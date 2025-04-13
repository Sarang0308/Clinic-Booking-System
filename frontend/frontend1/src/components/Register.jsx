import { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'patient' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('userId', data.user._id);
      alert('Registration successful');

      window.location.href =
        data.user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard';
    } else {
      alert(data.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-teal-600">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
