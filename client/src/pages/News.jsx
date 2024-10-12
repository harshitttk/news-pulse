import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Your Axios setup
import NewsCard from '../components/NewsCard';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/SpinnerCard';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate();

  // Fetch the user's preferred news articles
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true); // Start loading spinner
        const response = await axiosInstance.get('/api/news');
        setArticles(response.data.articles);
      } catch (error) {
        toast.error('Error fetching news');
      }finally {
        setLoading(false); // Stop loading spinner after API call
      }
    };
    
    fetchNews();
  }, []);

  const handleLogout = () => {
    // Clear cookies or tokens if you're using any
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear token cookie

    toast.success('Logout successful!');
    // Redirect to login or homepage after logout
    navigate('/login');
  };

  const handleChangePreferences = () => {
    navigate('/preferences'); // Navigate to the preferences page
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Personalized News</h1>

      {/* Logout Button */}
      <div className="flex justify-between mb-4">
        <button 
          onClick={handleChangePreferences} 
          className="shadow-md"
        >
          Change Preferences
        </button>
        <button 
          onClick={handleLogout} 
          className="shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Map through articles and display each using NewsCard */}
      {/* Display loading spinners when fetching data */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Show multiple loading spinner cards */}
          {[...Array(6)].map((_, index) => (
            <LoadingSpinner key={index} />
          ))}
        </div>
      ) : (
        /* Show news articles once data is loaded */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          ) : (
            <p className="text-center text-lg">No articles found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default News;
