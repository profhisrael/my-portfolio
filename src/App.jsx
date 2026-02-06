import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import Footer from './components/Footer';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVtXFFuEbkJrcO8QjuYeII64sM_57FEGw",
  authDomain: "my-portfolio-7b107.firebaseapp.com",
  projectId: "my-portfolio-7b107",
  storageBucket: "my-portfolio-7b107.firebasestorage.app",
  messagingSenderId: "1048492284761",
  appId: "1:1048492284761:web:365d69bc54d961653cca48",
  measurementId: "G-SMLQ4F1NGD"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// ScrollToTop component to handle scroll behavior on route changes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, scroll to that element
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
