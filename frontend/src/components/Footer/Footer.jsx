import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div>
        <p>&copy; {new Date().getFullYear()} Recipe. All rights reserved.</p>
      </div>
      <Link to="/privacy" className="footer-link">Privacy Policy</Link>
    </footer>
  );
};

export default Footer;
