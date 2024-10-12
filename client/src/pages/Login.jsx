import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';  // Use the axios instance
import Title from '../components/Title';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/login', { username, password });  // Send only username and password
      toast.success('Login successful!');
      navigate('/preferences');
    } catch (err) {
      if (err.response && err.response.status == 400) {
        toast.error('Invalid username or password');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      <div className='absolute top-20'>
        <Title />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <p className="text-sm text-center mt-4">
        Not registered yet?{" "}
        <Link to={"/register"} className="underline text-blue-600">
          Create an Account
        </Link>
      </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
