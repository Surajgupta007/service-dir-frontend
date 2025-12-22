import React, { useState } from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- 1. IMPORT LINK
import RatingStars from './RatingStars';

const ServiceCard = ({ service, onBook, onQuote }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback for ID if using mock data vs mongo data
  const serviceId = service._id || service.id;

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 2. WRAP IMAGE IN LINK */}
      <Link to={`/service/${serviceId}`} className="relative h-48 overflow-hidden block">
        <img
          src={service.image}
          alt={service.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
          <span className="text-sm font-semibold text-blue-600">{service.category}</span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        {/* 3. WRAP TITLE IN LINK */}
        <Link to={`/service/${serviceId}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
            {service.name}
          </h3>
        </Link>
        
        <RatingStars rating={service.rating} count={service.reviewCount} />
        
        <div className="mt-4 space-y-2 flex-grow">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            {service.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            {service.availability || 'Available Today'}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
            Starting from ${service.price}
          </div>
        </div>

        <p className="mt-4 text-gray-600 text-sm line-clamp-2">{service.description}</p>

        <div className="mt-6 flex space-x-3">
          <Link 
            to={`/service/${serviceId}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg text-center font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;