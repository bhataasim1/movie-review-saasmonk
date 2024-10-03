
"use client";

import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';

type Review = {
  id: string;
  movieId: string;
  reviewerName: string;
  rating: number;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
  movie: {
    id: string;
    name: string;
    releaseDate: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

const SearchReviewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch reviews from the server based on movie name
  const fetchReviews = async (movieName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reviews/search?movieName=${encodeURIComponent(movieName)}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchReviews(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Search Movie Reviews</h1>
      <div className='flex items-center justify-center'>
        <span className='text-center text-gray-400 font-medium'>You need to press Enter or Click on the Search Icon to get the Reviews of Particular Movie</span>
      </div>
      <div className="relative mx-auto mb-8 mt-3">
        <input
          type="text"
          placeholder="Search Reviews by Movie Name eg. Devara"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="block w-full pl-5 p-2 border border-gray-300 rounded-md"
        />
        <button onClick={handleSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <SearchIcon />
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-md shadow">
              <h3 className="text-xl font-semibold">{review.movie.name}</h3>
              <p>{review.comments}</p>
              <div className="text-gray-500">Rating: {review.rating}/10</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No reviews found for this movie. Try Searching !!</div>
      )}
    </div>
  );
};

export default SearchReviewsPage;
