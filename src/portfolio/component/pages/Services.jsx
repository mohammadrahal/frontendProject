import { useEffect, useState } from "react";
import Image from "../assets/imageCircle.png";
import Tick from "../assets/tickMark.png";
import "../css/services.css";

const Services = () => {
  const [data, setData] = useState([]);
  const api = "https://localhost-000.onrender.com/service/getservice";

  const fetchData = async () => {
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setData(result.data);
        console.log("Fetched data:", result);
      } else {
        console.error("Failed to fetch data from the API.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='service-container'>
        <div className='service-img'>
          <img src={Image} alt='Service Image' />
        </div>
        {data.map((item) => (
          <div key={item._id} className='ser-items'>
            <p className='ser-bla'>blablablabla</p>
            <p className='ser-title'>{item.title1}</p>
            <p className='ser-subTitle'>{item.title2}</p>
            <div>
              <p>
                <img src={Tick} alt='Tick Icon' className='ser-icon' />
                {item.tick1}
              </p>
              <p>
                <img src={Tick} alt='Tick Icon' className='ser-icon' />
                {item.tick2}
              </p>
              <p>
                <img src={Tick} alt='Tick Icon' className='ser-icon' />
                {item.tick3}
              </p>
            </div>
            <button className='ser-btn'> check me</button>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Services;
