import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: [] });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // For default signup, no roles are specified.
    axios.post('http://localhost:8080/api/auth/signup', form)
      .then(response => {
        setMessage('Signup successful! Please login.');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(err => {
        setMessage('Signup failed. ' + (err.response?.data?.message || ''));
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      { message && <p>{message}</p> }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
