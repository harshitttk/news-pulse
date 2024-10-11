import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axiosInstance.get('/api/news');
        setArticles(res.data.articles);
      } catch (err) {
        console.error('Error fetching news', err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Your News</h2>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.url} className="bg-white p-4 rounded-lg shadow-md">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-lg"
            >
              {article.title}
            </a>
            <p className="mt-2 text-gray-600">{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
