import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, count, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          } transition-all`}
        />
      ))}
      {count && (
        <span className="ml-2 text-sm text-gray-600">({count} reviews)</span>
      )}
    </div>
  );
};

export default RatingStars;