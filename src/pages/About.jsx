import React from 'react';
import { Shield, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Local Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We are on a mission to connect trusted professionals with the people who need them most.
          </p>
        </div>
      </div>

      {/* Stats / Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Trusted Professionals</h3>
            <p className="text-gray-600">Every provider is vetted to ensure high-quality service and safety.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community Focused</h3>
            <p className="text-gray-600">Building stronger neighborhoods by supporting local businesses.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600">We stand behind the work done on our platform with our happiness guarantee.</p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            ServiceDir began with a simple idea: it shouldn't be hard to find a good plumber, electrician, or cleaner. We saw that local professionals struggled to reach customers, and customers struggled to find reliable help.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Today, we are proud to host thousands of service providers and help countless families get their to-do lists done. We believe in the power of technology to make everyday life easier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;