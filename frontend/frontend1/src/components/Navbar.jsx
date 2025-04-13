import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white p-4 flex justify-between items-center shadow-xl">
    <h1 className="text-2xl font-bold">🩺 CrazyHealth</h1>
    <div className="flex gap-4">
      <Link to="/" className="hover:underline">Login</Link>
      <Link to="/appointment" className="hover:underline">Book</Link>
      <Link to="/doctor" className="hover:underline">Doctor</Link>
      <Link to="/patient" className="hover:underline">Patient</Link>
    </div>
  </nav>
);

export default Navbar;
