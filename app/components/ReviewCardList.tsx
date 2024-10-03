import ReviewCard from './ReviewCard'

export type ReviewType = {
  id: string;
  movieId: string;
  reviewerName: string | null;
  rating: number;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewCardListProps {
  reviews: ReviewType[];
}

export default function ReviewCardList({ reviews }: ReviewCardListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
