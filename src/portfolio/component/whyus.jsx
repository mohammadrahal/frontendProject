import React, { useState, useEffect } from 'react';
import './whyus.css';
import Lamp from './assets/lamp.png';
import Bell from './assets/bell.png';
import Key from './assets/key.png';
const WhyChooseUs = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the server when the component mounts
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/whyus/kel');
                if (response.ok) {
                    const result = await response.json();
                    if (result.data && result.data.length > 0) {
                        setData(result.data[0]);
                    }
                    setIsLoading(false);
                } else {
                    console.error('Failed to fetch data from the server.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2 className='title'>Why Choose Us?</h2>
            <div className='whyus'>
            <div className="text-content">
                    <div className='contenet-wyus'>
                    <p>{data.whyus}</p>
                    </div>
                <div className="content-why">
                    <div className="list-why">
                        <div> <div className="list-item">
                            <img src={Lamp} /><p>{data.firsttick}</p>
                        </div>
                            <div className="list-item">
                                <img src={Bell} /> <p>{data.secondtick}</p>
                            </div>
                            <div className="list-item">
                                <img src={Key} />  <p>{data.thirdtick}</p>
                            </div></div>
                        <div>
                            <div className="list-item">
                                <img src={Lamp} /><p>{data.sfirsttick}</p>
                            </div>
                            <div className="list-item">
                                <img src={Bell} /> <p>{data.ssecondtick}</p>
                            </div>
                            <div className="list-item">
                                <img src={Key} />  <p>{data.sthirdtick}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="right-why">
                <img className="right-circle" src={data.image} alt="Circle" />
            </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
