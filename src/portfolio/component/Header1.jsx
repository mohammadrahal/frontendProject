import { useState, useEffect } from 'react';
import './header.css';
import './button1.css';
import Footer1 from './Footer1';
import logo from './assets/logoCrazy.jpg';

const Header1 = () => {
    const [navVisible, setNavVisible] = useState(false);
    const [headingData, setHeadingData] = useState({
        heading: 'Welcome to',
        headingg: 'Crazy Web UI',
    });

    useEffect(() => {
        // Fetch the heading data from the API
        fetch('https://localhost-000.onrender.com/hero/gethero')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setHeadingData(data.data);
                } else {
                    // Handle error if needed
                    console.error('Failed to fetch heading data');
                }
            })
            .catch((error) => {
                // Handle fetch error if needed
                console.error('Error fetching heading data:', error);
            });
    }, []);

    const toggleNav = () => {
        setNavVisible(!navVisible);
    };

    return (
        <header className="boxy">
            <div className="div1">
                <img className="imgz" src={logo} alt="Logo" />
                <nav id="nav" className={`nav ${navVisible ? 'show-nav' : ''}`}>
                    <a href="{Footer1} target='_blank'">Home</a>
                    <a href="#">Services</a>
                    <a href="#">Why Choose us</a>
                    <a href="#">Skills</a>
                    <a href="#">Contact us</a>
                    <a href="#">My Blogs</a>
                </nav>
            </div>
            <div id="polygon-image" className="heads">
                <div className="flex-item">
                    <h1>{headingData.heading}</h1>
                </div>
                <div className="flex-item">
                    <h1>{headingData.headingg}</h1>
                </div>
                <div className="flex-item">
                    <button className="button1">Let's be together</button>
                </div>
            </div>
        </header>
    );
};

export default Header1;
