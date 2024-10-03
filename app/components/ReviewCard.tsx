"use client";

import { PenSquare, Trash2 } from 'lucide-react';
import { ReviewType } from './ReviewCardList';
import { useState } from 'react';
import { useReviewContext } from '../context/ReviewContext';

interface ReviewCardProps {
  review: ReviewType;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(review.comments);
  const [updatedRating, setUpdatedRating] = useState(review.rating);

  const { deleteReview, updateReview } = useReviewContext();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    const updatedReview = {
      comments: updatedComment,
      rating: updatedRating,
    };

    await updateReview(review.id, updatedReview);
    setIsEditing(false);
  };

  return (
    <div className="border p-6">
      {isEditing ? (
        <div>
          <textarea
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
            className="border rounded-md p-2 mb-2 w-full"
          />
          <input
            type="number"
            value={updatedRating}
            onChange={(e) => setUpdatedRating(Number(e.target.value))}
            min="0"
            max="10"
            className="border rounded-md p-2 mb-2 w-full"
          />
          <div className="flex justify-between">
            <button onClick={handleUpdate} className="text-white bg-green-500 px-3 py-2 rounded-lg">Save</button>
            <button onClick={handleEditToggle} className="text-white bg-red-500 px-3 py-2 rounded-lg">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <p className="text-gray-800 mb-2">{review.comments}</p>
            <span className="text-indigo-600 font-medium text-xl">{review.rating}/10</span>
          </div>
          <div className="flex justify-between items-center text-gray-500">
            <span className="italic">By: {review.reviewerName || 'Anonymous'}</span>
            <div className="flex space-x-2">
              <button className="p-1 hover:text-indigo-600" onClick={handleEditToggle}>
                <PenSquare size={18} />
              </button>
              <button className="p-1 hover:text-red-600" onClick={async () => await deleteReview(review.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
