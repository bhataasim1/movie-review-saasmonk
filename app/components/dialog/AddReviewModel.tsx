import { useState } from 'react';
import { MovieWithAvgRating } from '../MovieCard';
import { useMovies } from '@/app/context/moviesContext';
import toast from 'react-hot-toast';
import { useReviewContext } from '@/app/context/ReviewContext';

type AddReviewModalProps = {
  movies: MovieWithAvgRating[];
  onClose: () => void;
};

export default function AddReviewModal({ onClose, movies }: AddReviewModalProps) {
  const [movieId, setMovieId] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  const { fetchMovies } = useMovies();
  const {fetchReviews} = useReviewContext();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log({ movieId, reviewer, rating, comments });

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId, reviewerName: reviewer, rating, comments }),
      });
      if (response.ok) {
        await fetchMovies();
        await fetchReviews(movieId);
        onClose();
        toast.success('Review added successfully');
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-60">
        <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <select
                className="w-full p-2 mb-4 border rounded"
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
              >
                <option value="" disabled>Select a movie</option>
                {movies && movies?.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                className="w-full p-2 mb-4 border rounded"
                placeholder="Your name"
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                max="10"
                min="1"
                className="w-full p-2 mb-4 border rounded"
                placeholder="Rating out of 10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div>
              <textarea
                className="w-full p-2 mb-4 border rounded"
                placeholder="Review comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
