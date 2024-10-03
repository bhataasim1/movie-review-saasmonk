import { useMovies } from '@/app/context/moviesContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

type AddMovieModalProps = {
  onClose: () => void;
};

export default function AddMovieModal({ onClose }: AddMovieModalProps) {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const { fetchMovies } = useMovies();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log({ name, releaseDate });

    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, releaseDate }),
      });
      if (response.ok) {
        await fetchMovies();
        onClose();
        toast.success('Movie added successfully');
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
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Release Date</label>
              <input
                type="text"
                name="releaseDate"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
              Create Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
