import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import MealDetail from './components/MealDetail/MealDetail';
import AboutUs from './components/AboutUs/AboutUs'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import './App.css';

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
            <Route path="/meal/:id" element={<MealDetail />} />
            <Route path="/about" element={<AboutUs />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


