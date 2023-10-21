import { useState, useEffect } from "react";
import "../css/header.css";
// import "../button1.css";

import logo from "../assets/logoCrazy.jpg";
import menu from "../assets/menu.png";
const Header1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headingData, setHeadingData] = useState({
    heading: "Welcome to",
    headingg: "Crazy Web UI",
  });

  useEffect(() => {
    // Fetch the heading data from the API
    fetch("https://localhost-000.onrender.com/hero/gethero")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setHeadingData(data.data);
        } else {
          // Handle error if needed
          console.error("Failed to fetch heading data");
        }
      })
      .catch((error) => {
        // Handle fetch error if needed
        console.error("Error fetching heading data:", error);
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className='header-container'>
        <div>
          <img className='header-logo' src={logo} alt='nav-Logo' />
        </div>
        <img src={menu} onClick={toggleMenu} className='menu-btn' />

        <nav className={`nav ${isMenuOpen ? "show-nav" : ""}`}>
          <a href="#'">Home</a>
          <a href='#'>Services</a>
          <a href='#'>Why Choose us</a>
          <a href='#'>Skills</a>
          <a href='#'>Contact us</a>
          <a href='#'>My Blogs</a>
        </nav>
      </div>
      <div id='polygon-image' className='heads'>
        <div className='flex-item'>
          <h1 className='h1-text'>{headingData.heading}</h1>
          <h2 className='h2-text'>{headingData.headingg}</h2>
          <div className=''>
            <button className='header-btn'>Let's be together</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
