import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

interface ReviewProps {
  reviewId: string;
  employeeId: string;
  ratings: {
    category: string;
    rating: number;
    comment: string;
  }[];
  feedback: string;
  reviewDate: string;
}

function PerformanceReview({ review }: { review: ReviewProps }) {
  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        {review.ratings.map((rating) => (
          <div key={rating.category}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {rating.category}
              </span>
              <RatingStars rating={rating.rating} />
            </div>
            <p className="text-sm text-gray-500">{rating.comment}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-start space-x-2">
          <MessageSquare className="h-5 w-5 text-gray-400" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              Manager's Feedback
            </h4>
            <p className="mt-1 text-sm text-gray-500">{review.feedback}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceReview;