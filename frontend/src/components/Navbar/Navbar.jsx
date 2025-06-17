import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path, reload = false) => {
    navigate(path);
    if (reload) window.location.reload();
  };

  return (
    <nav>
      <button
        className="logoBtn"
        onClick={() => handleNavigation("/", true)}
      >
        <img
          src={logo}
          alt="Logo"
          width="100"
          height="auto"
          className="logo"
        />
      </button>
      <div>
        <button
          onClick={() => handleNavigation("/", true)}
          aria-label="Go to Home Page"
        >
          Home
        </button>
        <button
          onClick={() => handleNavigation("/about", false)}
          aria-label="About Us Page"
        >
          About Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;