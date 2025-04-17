import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import AboutUs from './components/AboutUs/AboutUs';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      const isFav = prevFavorites.some(r => r._id === recipe._id);
      if (isFav) {
        return prevFavorites.filter(r => r._id !== recipe._id);
      } else {
        return [...prevFavorites, recipe];
      }
    });
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(r => r._id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <Navbar />
        </header>
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  removeFavorite={removeFavorite}
                />
              }
            />
            <Route 
            path="/" 
            element={
              <HomePage 
              favorites={favorites}
         toggleFavorite={toggleFavorite}
    />
  }
/>
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
