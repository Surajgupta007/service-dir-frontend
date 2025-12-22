import React from 'react';
import { CheckCircle, ArrowRight, Star, Shield, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. HOW IT WORKS ---
export const HowItWorks = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How ServiceDir Works</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Whether you need a job done or you're looking for work, we make it simple.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "1. Search", desc: "Browse categories or search for specific services like plumbing, cleaning, or electrical work in your area.", icon: "🔍" },
          { title: "2. Compare", desc: "Read verified reviews, check ratings, and view profiles to find the perfect professional for your needs.", icon: "⭐" },
          { title: "3. Book", desc: "Contact the provider directly or book an appointment through our secure platform.", icon: "📅" }
        ].map((step, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- 2. PRICING ---
export const Pricing = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Choose the plan that fits your needs.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Customer Plan */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">For Customers</h3>
          <div className="text-4xl font-bold text-blue-600 mb-6">Free<span className="text-lg text-gray-500 font-normal">/forever</span></div>
          <p className="text-gray-600 mb-8">Find and book professionals at no cost. You only pay for the service itself.</p>
          <ul className="space-y-4 mb-8">
            {['Unlimited Searches', 'Read Reviews', 'Secure Booking', 'Customer Support'].map(item => (
              <li key={item} className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Business Plan */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-600 relative overflow-hidden">
          <div className="absolute top-5 right-5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Popular</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">For Professionals</h3>
          <div className="text-4xl font-bold text-gray-900 mb-6">$29<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <p className="text-gray-600 mb-8">Everything you need to grow your local service business.</p>
          <ul className="space-y-4 mb-8">
            {['Profile Visibility', 'Unlimited Leads', 'Booking Management', 'Verified Badge', 'Analytics Dashboard'].map(item => (
              <li key={item} className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// --- 3. BUSINESS LOGIN INFO ---
export const BusinessLoginInfo = () => (
  <div className="min-h-screen bg-white py-16">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-xl mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Login Access</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          We do not have a separate login page for businesses. All users, whether customers or providers, access the platform through the main <strong>Sign In</strong> button in the top navigation bar.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">How to Access Your Dashboard</h3>
          <ol className="list-decimal pl-5 space-y-3 text-gray-600">
            <li>Click the <strong>Sign In</strong> button at the top right of the homepage.</li>
            <li>Enter your registered email and password.</li>
            <li>Once logged in, click your <strong>Profile Icon</strong> in the top right.</li>
            <li>Select <strong>"My Dashboard"</strong> from the dropdown menu to manage your services and bookings.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
);

// --- 4. SUCCESS STORIES ---
export const SuccessStories = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
        <p className="text-xl text-gray-600">See how ServiceDir is helping local businesses thrive.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Mike T.", role: "Expert Plumber", quote: "Since listing on ServiceDir, my weekly bookings have doubled. The calendar management tool saves me hours every week.", color: "bg-blue-100 text-blue-600" },
          { name: "Sarah J.", role: "Green Cleaning Co.", quote: "I love that I can accept or decline bookings based on my schedule. It gives me total control over my business.", color: "bg-green-100 text-green-600" },
          { name: "David L.", role: "Master Carpenter", quote: "The verified reviews helped me build trust quickly in my new city. Highly recommended for any tradesperson.", color: "bg-orange-100 text-orange-600" }
        ].map((story, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 ${story.color} rounded-full flex items-center justify-center font-bold text-xl`}>
                {story.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{story.name}</h4>
                <p className="text-sm text-gray-500">{story.role}</p>
              </div>
            </div>
            <div className="mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400 inline-block mr-1" />)}
            </div>
            <p className="text-gray-600 italic">"{story.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- 5. LIST BUSINESS INFO ---
export const ListBusinessInfo = () => (
  <div className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-6">List Your Business</h1>
    <p className="text-lg text-gray-600 mb-6">Join thousands of local professionals growing their business with ServiceDir.</p>
    <div className="bg-gray-50 p-8 rounded-2xl">
      <h3 className="text-xl font-bold mb-4">Why Join?</h3>
      <ul className="space-y-3">
        <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Reach thousands of local customers.</li>
        <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Manage bookings easily.</li>
        <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Build your reputation.</li>
      </ul>
    </div>
  </div>
);

// --- 6. LEGAL PAGES ---
export const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
    <div className="mt-8 space-y-6 text-gray-600">
      <p>Your privacy is important to us. It is ServiceDir's policy to respect your privacy regarding any information we may collect from you across our website.</p>
    </div>
  </div>
);

export const TermsOfService = () => (
  <div className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
    <p className="text-gray-600">By using ServiceDir, you agree to these terms.</p>
  </div>
);

export const CookieSettings = () => (
  <div className="max-w-3xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-bold mb-6">Cookie Settings</h1>
    <p className="text-gray-600">Manage your cookie preferences here.</p>
  </div>
);