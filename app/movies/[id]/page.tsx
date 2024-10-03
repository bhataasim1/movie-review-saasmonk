"use client";
import { useEffect } from 'react';
import ReviewCardList from '@/app/components/ReviewCardList';
import { useReviewContext } from '@/app/context/ReviewContext';

const SingleMovie = ({ params }: { params: { id: string } }) => {
  const { reviews, movieName, averageRating, loading, fetchReviews } = useReviewContext();

  useEffect(() => {
    fetchReviews(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className='flex flex-col px-16 py-10'>
      {loading ? (
        <div className='text-2xl text-gray-800 font-bold text-center'>Loading...</div>
      ) : (
        <>
          {reviews.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl text-gray-800 font-bold">{movieName}</h1>
                <div className="text-3xl font-medium text-indigo-600">{averageRating?.toFixed(2)}/10</div>
              </div>
              <ReviewCardList reviews={reviews} />
            </>
          ) : (
            <div className='text-xl text-gray-600 text-center'>OOPS! No reviews available for this movie.</div>
          )}
        </>
      )}
    </div>
  );
}

export default SingleMovie;
