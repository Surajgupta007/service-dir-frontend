import React, { useState } from 'react';
import { X, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const config = require('../config');

const BookingModal = ({ isOpen, onClose, service }) => {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        customerId: user.id,
        providerId: service.providerId,
        serviceId: service._id,
        date: date
      };

      const response = await fetch(`${config.API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Booking failed');

      alert('Booking Confirmed! The provider will contact you shortly.');
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
              <p className="text-sm text-gray-500">{service.name}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]} // Disable past dates
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Service Price</span>
                <span className="font-medium">${service.price}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-blue-100">
                <span>Total</span>
                <span>${service.price}</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-70"
            >
              {loading ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;