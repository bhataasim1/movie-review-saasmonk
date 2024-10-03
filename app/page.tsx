"use client";

import { useState } from 'react';
import MovieCardGrid from './components/MoviesCardGrid';
import { SearchIcon } from 'lucide-react';
import { useMovies } from './context/moviesContext';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { movies, loading } = useMovies();

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-8">The best movie reviews site!</h1>
        <Link href="/reviews" className='text-blue-400'>
          Bonus: New Search Page
        </Link>
      </div>

      <div className="relative mx-auto mb-4">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for your favourite movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-1/2 pl-10 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {
            filteredMovies.length > 0 ? (
              <MovieCardGrid movies={filteredMovies} />
            ) : (
              <div className="text-gray-800 text-lg font-medium text-center">
                OOPS! No Movie Try Adding Some Movies
              </div>
            )
          }
        </>
      )}
    </main>
  );
}
