import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>We're passionate about making cooking accessible, enjoyable, and inspiring for everyone. Our app is designed to bring the joy of cooking to your kitchen, whether you're a seasoned chef or just starting out.</p>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <ul>
          <li>Curated recipes from around the world</li>
          <li>Personalized recipe recommendations</li>
          <li>Step-by-step cooking instructions</li>
          <li>Meal planning and grocery list features</li>
          <li>Community-driven recipe sharing</li>
        </ul>
      </section>

      
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions or suggestions? We'd love to hear from you!</p>
        <a href="mailto:contact@recipeapp.com" className="contact-button">Contact Us</a>
      </section>
    </div>
  );
};

export default AboutUs;