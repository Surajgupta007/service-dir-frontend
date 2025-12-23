import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trash2, MapPin, Calendar, Check, X, Briefcase, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const config = require('../config');

const Profile = () => {
  const { user } = useAuth();
  const [myServices, setMyServices] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings'); // Default view
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. If Business, fetch their listings
        if (user.role === 'business') {
          const servicesRes = await fetch(`${config.API_URL}/services?providerId=${user.id}`);
          const servicesData = await servicesRes.json();
          setMyServices(servicesData);
          setActiveTab('services'); // Default to services for business owners
        }

        // 2. Fetch Bookings (For both Customers and Businesses)
        // We pass the role so the backend knows whether to search by customerId or providerId
        const bookingsRes = await fetch(`${config.API_URL}/bookings/${user.id}?role=${user.role}`);
        const bookingsData = await bookingsRes.json();
        setMyBookings(bookingsData);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  // DELETE SERVICE (Business Only)
  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await fetch(`${config.API_URL}/services/${serviceId}`, { method: 'DELETE' });
      if (res.ok) {
        setMyServices(myServices.filter(s => s._id !== serviceId));
      }
    } catch (err) {
      alert("Failed to delete service.");
    }
  };

  // UPDATE BOOKING STATUS (Business Only)
  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`${config.API_URL}/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        const updatedBooking = await res.json();
        // Update local state to show the new status immediately
        setMyBookings(myBookings.map(b => b._id === bookingId ? updatedBooking : b));
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Info Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {user.email}
              </p>
              <div className="mt-4">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide border border-blue-100">
                  {user.role} Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs (Only visible for Business Owners) */}
        {user.role === 'business' && (
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'services' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              My Services
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'bookings' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Incoming Bookings
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your dashboard...</p>
          </div>
        ) : (
          <>
            {/* --- VIEW 1: MY SERVICES (Business Only) --- */}
            {activeTab === 'services' && user.role === 'business' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Your Listings</h2>
                  <Link to="/" className="text-sm text-blue-600 hover:underline">Add New +</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myServices.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500 mb-4">You haven't listed any services yet.</p>
                    </div>
                  ) : (
                    myServices.map((service) => (
                      <div key={service._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group hover:shadow-md transition-shadow">
                        <div className="relative h-48">
                          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => handleDeleteService(service._id)}
                            className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-full shadow-sm hover:bg-red-50 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 mb-2 truncate">{service.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <MapPin className="w-4 h-4 mr-1" /> {service.location}
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                            <span className="font-bold text-blue-600">${service.price}</span>
                            <Link to={`/service/${service._id}`} className="text-sm text-blue-600 hover:underline">View Page</Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* --- VIEW 2: BOOKINGS (Everyone) --- */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {user.role === 'business' ? 'Upcoming Appointments' : 'My Bookings History'}
                </h2>
                
                {myBookings.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No bookings found yet.</p>
                  </div>
                ) : (
                  myBookings.map((booking) => (
                    <div key={booking._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-blue-100 transition-colors">
                      
                      {/* Left: Service Details */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{booking.serviceId?.name || "Service Unavailable"}</h3>
                          <div className="text-sm text-gray-500 space-y-1">
                            {user.role === 'business' ? (
                              <p>Customer: <span className="font-medium text-gray-700">{booking.customerId?.name}</span> ({booking.customerId?.email})</p>
                            ) : (
                              <p>Provider: <span className="font-medium text-gray-700">{booking.providerId?.name}</span></p>
                            )}
                            <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Date, Status, Actions */}
                      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-gray-50 pt-4 lg:pt-0">
                        
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg text-gray-700">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </div>

                        {/* BUSINESS ACTIONS: Accept / Reject */}
                        {user.role === 'business' && booking.status === 'pending' && (
                          <div className="flex gap-2 pl-2 border-l border-gray-100">
                            <button 
                              onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                              className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 border border-green-200 transition-colors" 
                              title="Confirm Booking"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-200 transition-colors" 
                              title="Decline Booking"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;