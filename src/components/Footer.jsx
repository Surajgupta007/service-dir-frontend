import React from 'react';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-screen relative left-[calc(-50vw+50%)] bg-slate-950 text-slate-300 overflow-hidden">
      
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                <span className="text-white font-bold text-lg">SD</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">ServiceDir</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Connecting you with trusted local service providers. Find the right professional for any job, anywhere, anytime.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="flex items-center hover:text-blue-400 transition-all duration-200 group">
                  <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 text-blue-500">›</span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center hover:text-blue-400 transition-all duration-200 group">
                  <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 text-blue-500">›</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="flex items-center hover:text-blue-400 transition-all duration-200 group">
                  <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 text-blue-500">›</span>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="flex items-center hover:text-blue-400 transition-all duration-200 group">
                  <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-2 text-blue-500">›</span>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Business */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">For Professionals</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/list-business-info" className="hover:text-blue-400 transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link to="/business-login-info" className="hover:text-blue-400 transition-colors">
                  Business Login Info
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-blue-400 transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Contact Us</h4>
            <p className="text-sm text-slate-400">Need help? Reach out to our support team.</p>
            
            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3 text-slate-400 group cursor-pointer hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5 text-blue-600 group-hover:text-blue-400 transition-colors mt-0.5" />
                <span>support@servicedir.com</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400 group cursor-pointer hover:text-blue-400 transition-colors">
                <Phone className="w-5 h-5 text-blue-600 group-hover:text-blue-400 transition-colors mt-0.5" />
                <span>+1 (888) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} ServiceDir Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-blue-400 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;