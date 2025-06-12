
import React from 'react';
import { StarIcon } from './IconComponents';

interface ReviewStarsProps {
  rating: number;
  maxStars?: number;
  starSize?: string;
  className?: string;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating, maxStars = 5, starSize = "w-5 h-5", className }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0; // Not implemented visually, just logic
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} filled className={`${starSize} text-yellow-400`} />
      ))}
      {/* Visual half star can be implemented here if needed */}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} filled={false} className={`${starSize} text-gray-300`} />
      ))}
    </div>
  );
};

export default ReviewStars;
