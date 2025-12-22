import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Zap, Home, Hammer, PaintBucket, Flower2, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'plumbing', name: 'Plumbing', icon: Wrench, color: 'bg-blue-100 text-blue-600', desc: 'Pipe repairs, installation, and maintenance.' },
  { id: 'electrical', name: 'Electrical', icon: Zap, color: 'bg-yellow-100 text-yellow-600', desc: 'Wiring, lighting, and electrical repairs.' },
  { id: 'cleaning', name: 'Cleaning', icon: Home, color: 'bg-green-100 text-green-600', desc: 'Home and office cleaning services.' },
  { id: 'carpentry', name: 'Carpentry', icon: Hammer, color: 'bg-orange-100 text-orange-600', desc: 'Furniture repair, custom woodwork, and more.' },
  { id: 'painting', name: 'Painting', icon: PaintBucket, color: 'bg-purple-100 text-purple-600', desc: 'Interior and exterior painting services.' },
  { id: 'landscaping', name: 'Landscaping', icon: Flower2, color: 'bg-emerald-100 text-emerald-600', desc: 'Lawn care, gardening, and outdoor design.' },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Categories</h1>
          <p className="text-xl text-gray-600">Find the right professional for your specific needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              // UPDATED: Now sends the category name in the URL
              to={`/?category=${cat.name}`} 
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group border border-gray-100 hover:border-blue-100"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.name}</h3>
              <p className="text-gray-500 mb-6">{cat.desc}</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                Browse Services <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;