import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, TrendingUp, MessageSquare, Target } from 'lucide-react';
import type { Performance } from '../types';

function PerformancePage() {
  const { data: performance } = useQuery({
    queryKey: ['performance'],
    queryFn: async () => {
      // Simulated API call
      return {
        id: '1',
        userId: 'EMP001',
        reviewerId: 'EMP002',
        reviewCycle: '2024-Q1',
        ratings: [
          {
            category: 'Technical Skills',
            rating: 4,
            comment: 'Strong technical knowledge and problem-solving abilities',
          },
          {
            category: 'Communication',
            rating: 4,
            comment: 'Excellent communication with team members and stakeholders',
          },
          {
            category: 'Leadership',
            rating: 3,
            comment: 'Shows potential in leading small team projects',
          },
        ],
        goals: [
          {
            title: 'Complete Advanced React Training',
            description: 'Finish the advanced React certification course',
            status: 'completed',
            dueDate: '2024-03-31',
          },
          {
            title: 'Improve Code Quality',
            description: 'Maintain code coverage above 80%',
            status: 'in-progress',
            dueDate: '2024-06-30',
          },
        ],
        overallRating: 4,
        feedback: 'Consistently delivers high-quality work and shows initiative',
        createdAt: '2024-01-01',
        updatedAt: '2024-03-15',
      } as Performance;
    },
  });

  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Performance Review</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Request Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Performance Ratings
          </h2>
          <div className="space-y-4">
            {performance?.ratings.map((rating) => (
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
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Goals & Objectives
          </h2>
          <div className="space-y-4">
            {performance?.goals.map((goal) => (
              <div
                key={goal.title}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {goal.description}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      goal.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : goal.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {goal.status}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Due: {goal.dueDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Overall Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Overall Rating
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {performance?.overallRating}/5
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Review Cycle</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {performance?.reviewCycle}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Goals Completed
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {
                    performance?.goals.filter(
                      (goal) => goal.status === 'completed'
                    ).length
                  }
                  /{performance?.goals.length}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="h-5 w-5 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-900">
                Manager's Feedback
              </h3>
            </div>
            <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
              {performance?.feedback}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformancePage;