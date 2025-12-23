import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Phone, ArrowLeft, Star, Share2, MessageSquare } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import ReviewModal from '../components/ReviewModal'; // Import the Review Modal
import { useAuth } from '../context/AuthContext';

import API_URL from '../config'

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  // Data States
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]); // Store reviews list
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false); // Modal state for reviews

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Service Details
        const serviceRes = await fetch(`${API_URL}/services/${id}`);
        if (!serviceRes.ok) throw new Error('Service not found');
        const serviceData = await serviceRes.json();
        setService(serviceData);

        // 2. Fetch Reviews for this service
        const reviewsRes = await fetch(`${API_URL}/reviews/${id}`);
        if (reviewsRes.ok) {
            const reviewsData = await reviewsRes.json();
            setReviews(reviewsData);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBookClick = () => {
    if (!user) { alert("Please Sign In to book."); return; }
    setIsBookingOpen(true);
  };

  const handleReviewClick = () => {
    if (!user) { alert("Please Sign In to leave a review."); return; }
    setIsReviewOpen(true);
  };

  // Update UI instantly when review is added
  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
    // Optimistically update review count
    setService(prev => ({
      ...prev,
      reviewCount: (prev.reviewCount || 0) + 1
    }));
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (error) return <div className="min-h-screen flex flex-col justify-center items-center text-center px-4"><h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Service not found</h2><Link to="/" className="text-blue-600 hover:underline">Back to Home</Link></div>;

  return (
    <div className="flex-grow bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"><ArrowLeft className="w-5 h-5 mr-2" />Back to Services</Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Details & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Details Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-[400px] overflow-hidden">
                <img 
                  src={service.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'} 
                  alt={service.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">{service.category}</span>
                    <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                  </div>
                  <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"><Share2 className="w-6 h-6" /></button>
                </div>
                <div className="flex items-center space-x-6 text-gray-600 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                    <span className="font-medium text-gray-900">{service.rating || 0}</span>
                    <span className="mx-1">·</span>
                    <span>{service.reviewCount || 0} reviews</span>
                  </div>
                  <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-blue-600" />{service.location}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">About this Service</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{service.description}</p>
              </div>
            </div>

            {/* REVIEWS SECTION */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Customer Reviews ({reviews.length})
                </h3>
                <button 
                  onClick={handleReviewClick}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Write a Review
                </button>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl text-gray-500">
                  No reviews yet. Be the first to review!
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                            {(review.userName || 'A').charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{review.userName || 'Anonymous'}</p>
                            <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2 pl-13">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500">Starting at</span>
                <span className="text-3xl font-bold text-blue-600">${service.price}</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg"><Clock className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-xs text-gray-500 uppercase font-bold">Availability</p><p className="text-sm font-medium text-gray-900">Available Today</p></div></div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg"><Phone className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-xs text-gray-500 uppercase font-bold">Contact Provider</p><p className="text-sm font-medium text-gray-900">{service.phone}</p></div></div>
              </div>
              <button onClick={handleBookClick} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95">Book Now</button>
            </div>
          </div>

        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} service={service} />
      
      {/* RENDER REVIEW MODAL */}
      <ReviewModal 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
        serviceId={id}
        onReviewAdded={handleReviewAdded}
      />
    </div>
  );
};

export default ServiceDetails;