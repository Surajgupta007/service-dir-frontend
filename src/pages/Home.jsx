import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import Pagination from '../components/Pagination';

// Try to import API_URL, but fallback if it doesn't exist
let API_URL = 'https://service-dir-backend.onrender.com'
try {
  const config = require('../config');
  if (config.API_URL) API_URL = config.API_URL;
} catch (e) {
  // Config not found, using default localhost
}

// UPDATED CATEGORY IMAGES
const categoryImages = {
  'Plumbing': 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=60',
  'Electrical': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60',
  'Cleaning': 'https://clearchoiceuk.com/wp-content/uploads/2018/08/qualities-and-skills-of-a-commercial-cleaner.jpg', 
  'Carpentry': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=60',
  'Painting': 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=60',
  'Landscaping': 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&auto=format&fit=crop&q=60',
  'Other': 'https://images.unsplash.com/photo-1521791136064-7985c2717883?w=800&auto=format&fit=crop&q=60'
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/services`);
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        
        const enrichedData = data.map(service => ({
          ...service,
          image: categoryImages[service.category] || service.image || categoryImages['Other'],
          availability: service.availability || 'Available Today', 
          rating: service.rating || 0,
          reviewCount: service.reviewCount || 0
        }));

        setServices(enrichedData);

        const params = new URLSearchParams(location.search);
        const categoryFilter = params.get('category');

        if (categoryFilter) {
          const filtered = enrichedData.filter(s => s.category === categoryFilter);
          setFilteredServices(filtered);
        } else {
          setFilteredServices(enrichedData);
        }

      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Could not load services. Please check if backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [location.search]);

  const handleSearch = ({ searchTerm, location, category }) => {
    let results = services;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(s => s.name.toLowerCase().includes(term) || s.description.toLowerCase().includes(term));
    }
    if (location) results = results.filter(s => s.location.toLowerCase().includes(location.toLowerCase()));
    if (category) results = results.filter(s => s.category === category);
    
    setFilteredServices(results);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handleBook = (service) => alert(`Booking ${service.name}`);
  const handleQuote = (service) => alert(`Quote for ${service.name}`);

  return (
    <div className="flex-grow w-full">
      <SearchBar onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {loading ? 'Loading...' : 'Featured Services'}
          </h2>
        </div>

        {error && <div className="text-center py-10 bg-red-50 text-red-600 rounded-lg">{error}</div>}

        {loading ? (
          <div className="flex justify-center py-20"><Loader className="w-10 h-10 animate-spin text-blue-600" /></div>
        ) : (
          <>
            {!loading && currentServices.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p className="text-xl">No services found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setFilteredServices(services);
                    setCurrentPage(1);
                    navigate('/'); 
                  }}
                  className="mt-4 text-blue-600 underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentServices.map((service) => (
                  <ServiceCard key={service._id} service={service} onBook={handleBook} onQuote={handleQuote} />
                ))}
              </div>
            )}
            {filteredServices.length > itemsPerPage && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;