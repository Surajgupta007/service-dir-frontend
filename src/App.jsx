import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';

// Import New Info Pages from the single file we created
import { 
  HowItWorks, 
  Pricing, 
  ListBusinessInfo, 
  BusinessLoginInfo, 
  SuccessStories, 
  PrivacyPolicy, 
  TermsOfService, 
  CookieSettings 
} from './pages/InfoPages';

import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
          <Navbar />
          
          <Routes>
            {/* Core Navigation Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Info & Footer Pages */}
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/list-business-info" element={<ListBusinessInfo />} />
            <Route path="/business-login-info" element={<BusinessLoginInfo />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookieSettings />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;