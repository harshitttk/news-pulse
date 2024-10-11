import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';  // Import Toaster
import Register from './pages/Register';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import News from './pages/News';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div>
        {/* Toaster Component to show toast notifications */}
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
