import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Ensure form submission is prevented
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
  
      // Handle response from backend
      const data = res.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('userId', data.user._id);
        alert('Login successful');
  
        window.location.href = data.user.role === 'doctor' ? '/doctor' : '/patient';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
      if (error.response) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Network or server issue');
      }
    }
  };
   
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Doctor/Patient Login</h2>
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
          className="w-full mb-6 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
