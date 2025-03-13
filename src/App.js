import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import MealDetail from './components/MealDetail/MealDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
          {}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meal/:id" element={<MealDetail />} />
          </Routes>
        </main>
        <Footer /> {}
      </div>
    </Router>
  );
}

export default App;
