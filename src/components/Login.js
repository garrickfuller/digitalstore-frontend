import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/auth/signin', form)
      .then(response => {
        // Assuming response contains token and user details
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      })
      .catch(err => {
        setError('Invalid credentials');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      { error && <p style={{ color: 'red' }}>{error}</p> }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
