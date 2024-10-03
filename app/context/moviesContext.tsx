"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type MovieWithAvgRating = {
  id: string;
  name: string;
  releaseDate: string;
  averageRating: number | null;
  createdAt: Date;
  updatedAt: Date;
};

type MovieContextType = {
  movies: MovieWithAvgRating[];
  fetchMovies: () => Promise<void>;
  loading: boolean;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<MovieWithAvgRating[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, fetchMovies, loading }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
