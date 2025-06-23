import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';
import './App.css';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <Navbar />
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
