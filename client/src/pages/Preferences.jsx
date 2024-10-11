import React, { useState } from 'react';
import toast from 'react-hot-toast'; // Import toast
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';

const Preferences = () => {
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();

  const availablePreferences = ['technology', 'sports', 'finance', 'politics'];

  const onChange = e => {
    const value = e.target.value;
    if (preferences.includes(value)) {
      setPreferences(preferences.filter(pref => pref !== value));
    } else {
      setPreferences([...preferences, value]);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/news/preferences', { preferences });
      toast.success('Preferences saved successfully!');
      navigate('/news');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error('Unauthorized: Please login again.');
      } else {
        toast.error('An error occurred while saving preferences.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className='absolute top-20'>
        <Title />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Set Your Preferences</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {availablePreferences.map(pref => (
            <label key={pref} className="block">
              <input
                type="checkbox"
                value={pref}
                onChange={onChange}
                className="mr-2"
              />
              {pref.charAt(0).toUpperCase() + pref.slice(1)}
            </label>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
