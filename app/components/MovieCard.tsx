import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useMovies } from '../context/moviesContext';
import toast from 'react-hot-toast';

export type MovieWithAvgRating = {
  id: string;
  name: string;
  releaseDate: string;
  averageRating: number | null;
  createdAt: Date;
  updatedAt: Date;
};

interface MovieCardProps {
  movie: MovieWithAvgRating;
}

export default function MovieCard({ movie }: MovieCardProps) {
  // console.log('movie:', movie);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedMovie, setEditedMovie] = useState({
    name: movie.name,
    releaseDate: movie.releaseDate,
  });

  const { fetchMovies } = useMovies();

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/movies?id=${movie.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Movie deleted successfully');
        await fetchMovies();
      } else {
        toast.error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/movies?id=${movie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedMovie.name,
          releaseDate: editedMovie.releaseDate,
        }),
      });

      if (response.ok) {
        await fetchMovies();
        toast.success('Movie updated successfully');
        handleDialogClose();
      } else {
        toast.error('Failed to update movie');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <div className="bg-purple-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
      <div>
        <Link href={`/movies/${movie.id}`}>
          <h3 className="text-xl font-semibold text-gray-800 cursor-pointer">{movie.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mt-2">
          Released: {new Date(movie.releaseDate).toLocaleDateString()}
        </p>
        <div className="mt-3">
          <span className="text-lg font-medium">
            Rating: {movie.averageRating
              ? `${movie.averageRating}/10`
              : 'No ratings yet'}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleEdit}
          className="p-2 hover:bg-lavender-100 rounded-full transition-colors duration-200"
          aria-label="Edit movie"
        >
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => handleDelete()}
          className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
          aria-label="Delete movie"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      </div>

      {isEditDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedMovie.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Release Date</label>
                <input
                  type="text"
                  name="releaseDate"
                  value={editedMovie.releaseDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleDialogClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
