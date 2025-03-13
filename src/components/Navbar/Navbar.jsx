import React from 'react';
/*import { Link } from 'react-router-dom';*/
import './Navbar.css';
import '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

/*const Navbar = () => (
  <nav style={{ padding: '1rem', backgroundColor: '#f8f8f8', borderBottom: '1px solid #ddd' }}>
    <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
  </nav>
);

export default Navbar;*/


const Navbar = () => {
  const navigate = useNavigate();

  // this can be simplified to
  const handleNavigation = (path, reload = false) => {
    navigate(path);
    if (reload) window.location.reload();
  };

  return (
    <nav>
      <button
      class="logoBtn"
        onClick={() => handleNavigation("/", true)}
      >
        <img
          src={logo}
          alt="Logo"
          width="100"
          height="auto"
          class="logo"
        />
      </button>
      <div>
        <button
          
          onClick={() => handleNavigation("/", true)}
          aria-label="Go to Home Page"
        >
          Home
        </button>
      
      </div>
    </nav>
  );
};

export default Navbar;
