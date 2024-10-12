import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        {/* News Image */}
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={article.urlToImage} alt="News" />
        </div>
        
        <div className="p-8">
          {/* News Title */}
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{article.source.name}</div>
          
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {article.title}
          </a>
          
          {/* News Description */}
          <p className="mt-2 text-gray-500">{article.description}</p>
          
          {/* Author and Source */}
          <div className="mt-4">
            <span className="text-gray-700 text-sm">By {article.author ? article.author : 'Unknown Author'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
