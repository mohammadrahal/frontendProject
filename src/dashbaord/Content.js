import React, { useState } from 'react';
import Hero from './dashComponenet/hero';
import Bestservices from './dashComponenet/bestservices';
import Whyus from './dashComponenet/whyus';
import ContactYou from './dashComponenet/contactyou';
import ContactShape from './dashComponenet/contactShape';
import Blog from './dashComponenet/blog';
import Project from './dashComponenet/project'
import Footer from './dashComponenet/footer';
import './index.css';
import Experience from './dashComponenet/experience'
// import EmailIcon from './components/imgs/emailIcon';
function MenuAndContent() {
    const [activePage, setActivePage] = useState('hero');

    const handleMenuClick = (page) => {
        setActivePage(page);
    };

    return (
        <div className="menu-and-content">
            <div className="menu">
                <div className="menu-content">
                    <div className="menu-item">
                        <a href="#hero" onClick={() => handleMenuClick('hero')}>Hero Section</a>
                    </div>
                    <div className="menu-item">
                        <a href="#bestservices" onClick={() => handleMenuClick('bestservices')}>Best Services Section</a>
                    </div>
                    <div className="menu-item">
                        <a href="#whyus" onClick={() => handleMenuClick('whyus')}>Why Choose Us?</a>
                    </div>
                    <div className="menu-item">
                        <a href="#experience" onClick={() => handleMenuClick('experience')}>Experience</a>
                    </div>
                    <div className="menu-item">
                        <a href="#blog" onClick={() => handleMenuClick('blog')} >Latest Blog</a>
                    </div>
                    <div className="menu-item">
                        <a href="#project" onClick={() => handleMenuClick('project')} >Projects</a>
                    </div>
                    <div className="menu-item">
                        <a href="#footer" onClick={() => handleMenuClick('footer')} >Footer</a>
                    </div>
                    <div className="menu-item">
                        <a href="#contact" onClick={() => handleMenuClick('contactShape')} >Contact Us </a>
                    </div>
                    <div className="menu-item">
                        <a href="#contactyou" onClick={() => handleMenuClick('contactyou')} >People who contacted you!</a>
                    </div>
                </div>
            </div>
            <div id="content" className='content'>
                <div className='nav-content'>
                    <h1>Welcome to Dashboard</h1>
                    <h3>Hello Mohammad Rizk, welcome to your awesome dashboard!</h3>
                </div>
                <div className='static'>
                    <div className='static-email'>
                        <div className='email-sgv'>
                            {/* <img className="icon" src={EmailIcon} alt="icon" /> */}
                        </div>
                        <div className='emails'>
                            <h1>1,200</h1>
                            <p>Emails</p>
                        </div>
                        <div className='text'>
                            <p>Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                    <div className='static-email'>
                        <div className='email-sgv'>
                            {/* <img className="icon" src={EmailIcon} alt="icon" /> */}
                        </div>
                        <div className='emails'>
                            <h1>1,400</h1>
                            <p>Projects</p>
                        </div>
                        <div className='text'>
                            <p>Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                    <div className='static-email'>
                        <div className='email-sgv'>
                            {/* <img className="icon" src={EmailIcon} alt="icon" /> */}
                        </div>
                        <div className='emails'>
                            <h1>400</h1>
                            <p>User</p>
                        </div>
                        <div className='text'>
                            <p>Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                </div>
                {activePage === 'hero' && <Hero />}
                {activePage === 'bestservices' && <Bestservices />}
                {activePage === 'whyus' && <Whyus />}
                {activePage === 'contactyou' && <ContactYou />}
                {activePage === 'contactShape' && <ContactShape />}
                {activePage === 'blog' && <Blog />}'
                {activePage === 'experience' && <Experience />}
                {activePage === 'project' && <Project />}
                {activePage === 'footer' && <Footer />}
            </div>
        </div>
    );
}

export default MenuAndContent;
