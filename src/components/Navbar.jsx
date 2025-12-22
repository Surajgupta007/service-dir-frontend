import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // <--- Updated imports
import SignIn from './SignIn';
import SignUp from './SignUp';
import AddServiceModal from './AddServiceModal';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Modal States
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleOpenSignIn = () => { setIsMenuOpen(false); setIsSignInOpen(true); };
  const handleOpenSignUp = () => { setIsMenuOpen(false); setIsSignUpOpen(true); };
  
  const handleListBusiness = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    if (user) {
      setIsAddServiceOpen(true);
    } else {
      setIsSignUpOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleGoToProfile = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate('/profile');
  };

  // Navigation Links Configuration
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white ${
          isScrolled ? 'shadow-md py-2' : 'shadow-sm py-4'
        }`}
        role="navigation"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">SD</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ServiceDir
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              {user ? (
                // Logged In View
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none"
                  >
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn overflow-hidden">
                      <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                        <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      <button 
                        onClick={handleGoToProfile}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Dashboard
                      </button>

                      <button 
                        onClick={handleListBusiness}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                      >
                        <BriefcaseIcon className="w-4 h-4" />
                        List New Service
                      </button>

                      <button onClick={handleLogout} className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100 mt-1 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Guest View
                <button onClick={handleOpenSignIn} className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Sign In
                </button>
              )}

              {/* List Business Button */}
              <button
                onClick={handleListBusiness}
                className="px-4 py-2 lg:px-6 lg:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                List Your Business
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              {user && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600" onClick={handleGoToProfile}>
                  <User className="w-5 h-5" />
                </div>
              )}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)} // Close menu on click
                className="block text-left w-full text-gray-600 hover:text-blue-600 font-medium text-lg"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 flex flex-col gap-3 border-t border-gray-100 mt-4">
              {user ? (
                <>
                  <button onClick={() => {handleGoToProfile(); setIsMenuOpen(false);}} className="w-full px-4 py-2.5 text-left text-gray-700 bg-gray-50 rounded-lg font-medium">My Dashboard</button>
                  <button onClick={handleLogout} className="w-full px-4 py-2.5 text-red-600 border border-red-200 bg-red-50 font-medium rounded-lg">Sign Out</button>
                </>
              ) : (
                <button onClick={handleOpenSignIn} className="w-full px-4 py-2.5 text-blue-600 border border-blue-600 font-medium rounded-lg">Sign In</button>
              )}
              <button onClick={handleListBusiness} className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md">
                List Your Business
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modals */}
      <SignIn isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSwitchToSignUp={() => {setIsSignInOpen(false); setIsSignUpOpen(true)}} />
      <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} onSwitchToSignIn={() => {setIsSignUpOpen(false); setIsSignInOpen(true)}} />
      
      {/* Service Modal */}
      <AddServiceModal 
        isOpen={isAddServiceOpen} 
        onClose={() => setIsAddServiceOpen(false)} 
      />
    </>
  );
};

const BriefcaseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

export default Navbar;