import React, { useEffect, useState } from 'react';
import './Footer1.css';
import PhoneCall from '../icons/PhoneCall.svg';
import Github from '../icons/Github.svg';
import Instagram from '../icons/Instagram.svg';
import Facebook from '../icons/Facebook.jpg';

const Footer1 = () => {
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5000/footer/getfooter')
            .then((response) => response.json())
            .then((data) => {
                // Set the fetched data to the state
                setFooterData(data.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="foots">
            <div className="Flex_containerz">
                <div className="flex-itemz">
                    <p> Our Addresses</p>
                    {footerData && (
                        <>
                            <p style={{ color: 'white' }}>{footerData.address}, Lebanon</p>
                            <p> Our Headquarters</p>
                            <p style={{ color: 'white' }}>{footerData.quater}, U.A.E.</p>
                        </>
                    )}
                </div>
                <div className="flex-itemz">
                    <p className="social-media"> Our Phones</p>
                    {footerData && (
                        <>
                            <p style={{ color: 'white' }}>Office Phone: {footerData.ophone}</p>
                            <p style={{ color: 'white' }}>Mobile Phone: {footerData.mobilephone}</p>
                        </>
                    )}
                </div>

                <div className="flex-itemz">
                    <p>Follow us on social media:</p>
                    <div className="social-media">
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                            <img src={Facebook} style={{ height: '25px', fill: 'white' }} alt="Facebook" />
                        </a>
                        <a href="https://www.github.com" target="_blank" rel="noreferrer">
                            <img src={Github} style={{ height: '25px', background: 'white' }} alt="Github" />
                        </a>
                    </div>
                    <div className="social-media">
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            <img src={Instagram} style={{ height: '25px', background: 'white' }} alt="Instagram" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <img src={Github} style={{ height: '25px', background: 'white' }} alt="Twitter" />
                        </a>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Footer1;
