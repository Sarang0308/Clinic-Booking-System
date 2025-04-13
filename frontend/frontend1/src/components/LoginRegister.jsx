import React, { useState } from 'react';

const LoginRegister = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async () => {
    const endpoint = `http://localhost:5000/api/auth/${mode}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || JSON.stringify(data));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-400 to-pink-500 p-4">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{mode === 'login' ? 'Login' : 'Register'}</h2>
        <input
          className="w-full mb-4 p-2 border rounded-lg"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full mb-4 p-2 border rounded-lg"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        <p className="text-center mt-4 text-sm">
          {mode === 'login' ? 'No account?' : 'Have an account?'}{' '}
          <button className="text-blue-700 underline" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            Switch to {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
