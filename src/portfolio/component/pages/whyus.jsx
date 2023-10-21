import React, { useState, useEffect } from "react";
import "../css/whyus.css";
import Lamp from "../assets/lamp.png";
import Bell from "../assets/bell.png";
import Key from "../assets/key.png";
import Image from "../assets/circle.jpg";
const WhyChooseUs = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    async function fetchData() {
      try {
        const response = await fetch(
          "https://localhost-000.onrender.com/whyus/kel"
        );
        if (response.ok) {
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            setData(result.data[0]);
          }
          setIsLoading(false);
        } else {
          console.error("Failed to fetch data from the server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='whyus'>
      <div className='text-content'>
        <h2 className='title-whyus'>Why Choose Us?</h2>
        <div className='contenet-wyus'>
          <p>{data.whyus}</p>
        </div>
        <div className='list-why'>
          <div>
            <div className='list-items-why'>
              <img src={Lamp} alt='lamp-icon' />
              <p>{data.firsttick}</p>
            </div>
            <div className='list-items-why'>
              <img src={Bell} alt='bell-icon' />
              <p>{data.secondtick}</p>
            </div>
            <div className='list-items-why'>
              <img src={Key} alt='key-icon' />
              <p>{data.thirdtick}</p>
            </div>
          </div>
          <div>
            <div className='list-items-why'>
              <img src={Lamp} alt='lamp-icon' />
              <p>{data.firsttick}</p>
            </div>
            <div className='list-items-why'>
              <img src={Bell} alt='bell-icon' />
              <p>{data.firsttick}</p>
            </div>
            <div className='list-items-why'>
              <img src={Key} alt='key-icon' />
              <p>{data.sthirdtick}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='right-why'>
        <img className='right-pic' src={Image} alt='Circle' />
      </div>
    </div>
  );
};

export default WhyChooseUs;
