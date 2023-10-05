import React, { useState, useEffect } from 'react';
import './style.css'
const Experience = () => {
    const [data, setData] = useState([]);
    const [api, setApi] = useState('http://localhost:5000/Experience/');

    const fetchData = async () => {
        try {
            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setData(data.data);
                console.log('Fetched data:', data);
            } else {
                console.error('Failed to fetch data from the API.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2 className='exp-title'>Experience</h2>
            <div className="exp-container">
                <div className='line-shape'></div>
                <div className="exp-items slides">
                    {data.length > 0 ? (
                        data.map((data) => (
                            <div key={data._id} className='item-list '>
                                <h1 className='title-exp'>{data.title}</h1>
                                <h2 className='first-blue'>{data.firstblue}</h2>
                                <h3 className='second-blue'>{data.secondblue}</h3>
                                <h4 className='fisrt-black'>{data.firstblack}</h4>
                                <p className='second-black'>{data.secondblack}</p>

                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Experience;
