"use client";

import { useState } from 'react';
import AddMovieModal from './dialog/AddMovieModel';
import AddReviewModal from './dialog/AddReviewModel';
import { useMovies } from '../context/moviesContext';

export default function Header() {
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { movies } = useMovies();

  return (
    <header className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">MOVIECRITIC</a>
        <div className="space-x-4">
          <button
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
            onClick={() => setShowMovieModal(true)}
          >
            Add new movie
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => setShowReviewModal(true)}
          >
            Add new review
          </button>
        </div>
      </div>
      {showMovieModal && <AddMovieModal onClose={() => setShowMovieModal(false)} />}
      {showReviewModal && <AddReviewModal movies={movies} onClose={() => setShowReviewModal(false)} />}
    </header>
  );
}
