import React, { useState } from "react";
import toast from "react-hot-toast"; // Import toast
import axiosInstance from "../utils/axiosInstance";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false); // Clicked state for animation

  const { username, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setClicked(true); // Set clicked state to true to trigger animation
    try {
      await axiosInstance.post("/api/auth/register", formData);
      toast.success("User registered successfully!"); // Show success toast
      navigate('/login');
    } catch (err) {
      toast.error("Error registering user"); // Show error toast
    }finally {
      setLoading(false); // Reset loading state
      setClicked(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      <div className="absolute top-20">
        <Title />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
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
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
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
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${clicked ? 'clicked' : ''}`}
            disabled={loading} // Disable button when loading
            onClick={() => setClicked(true)}
          >
            {loading ? 'Signing up...' : 'Register'}
          </button>
          <p className="text-sm text-center mt-4">
            Already registered?{" "}
            <Link to={"/login"} className="underline text-blue-600">
              Login to your account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
