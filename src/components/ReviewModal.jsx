import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import API_URL from '../config'

const ReviewModal = ({ isOpen, onClose, serviceId, onReviewAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (rating === 0) {
        alert("Please select a star rating");
        setLoading(false);
        return;
      }

      const payload = {
        serviceId,
        userId: user.id,
        userName: user.name,
        rating,
        comment
      };

      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const newReview = await response.json();
      onReviewAdded(newReview); // Update parent UI instantly
      alert('Review Submitted!');
      
      // Reset & Close
      setRating(0);
      setComment('');
      onClose();

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-slideUp">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Write a Review</h2>
          <p className="text-gray-500 text-sm mb-6">Share your experience with others.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Star Rating Input */}
            <div className="flex justify-center space-x-2 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Comment</label>
              <textarea
                required
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;