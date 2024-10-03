"use client";

import React, { createContext, useContext, useState } from 'react';
import { ReviewType } from '@/app/components/ReviewCardList';
import toast from 'react-hot-toast';

interface ReviewContextType {
  reviews: ReviewType[];
  movieName: string | null;
  averageRating: number | null;
  loading: boolean;
  fetchReviews: (movieId: string) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  updateReview: (id: string, updatedReview: Pick<ReviewType, 'comments' | 'rating'>) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviewContext must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [movieName, setMovieName] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchReviews(movieId: string) {
    setLoading(true);
    try {
      const response = await fetch(`/api/reviews?id=${movieId}`);
      const data = await response.json();
      setReviews(data);

      if (data.length > 0) {
        setMovieName(data[0].movie.name);
        calculateAverageRating(data);
      } else {
        setMovieName(null);
        setAverageRating(null);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  function calculateAverageRating(reviews: ReviewType[]) {
    const totalRating = reviews.reduce((acc, review) => {
      return acc + parseFloat(review.rating.toString()); // Ensure rating is treated as a number
    }, 0);
    const average = reviews.length ? totalRating / reviews.length : 0;
    setAverageRating(parseFloat(average.toFixed(2))); // Limit the average rating to 2 decimal places
  }

  async function deleteReview(id: string) {
    try {
      await fetch(`/api/reviews?id=${id}`, {
        method: 'DELETE',
      });
      toast.success('Review deleted successfully');
      setReviews(reviews.filter(review => review.id !== id));
    } catch (error) {
      console.error('Failed to delete review:', error);
      toast.error('Failed to delete review');
    }
  }

  async function updateReview(id: string, updatedReview: Pick<ReviewType, 'comments' | 'rating'>) {
    try {
      await fetch(`/api/reviews?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });
      toast.success('Review updated successfully');
      setReviews(reviews.map(review => (review.id === id ? { ...review, ...updatedReview } : review)));
    } catch (error) {
      console.error('Failed to update review:', error);
      toast.error('Failed to update review');
    }
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        movieName,
        averageRating,
        loading,
        fetchReviews,
        deleteReview,
        updateReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};