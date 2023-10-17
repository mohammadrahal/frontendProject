import React, { useEffect, useState } from "react";
import "../css/Footer1.css";

const Footer1 = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://localhost-000.onrender.com/footer/getfooter")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state
        setFooterData(data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className='foots'>
      <div className='Flex_containerz'>
        <div className='flex-itemz'>
          <p> Our Addresses</p>
          {footerData && (
            <>
              <p style={{ color: "white" }}>{footerData.address}, Lebanon</p>
              <p> Our Headquarters</p>
              <p style={{ color: "white" }}>{footerData.quater}, U.A.E.</p>
            </>
          )}
        </div>
        <div className='flex-itemz'>
          <p className='social-media'> Our Phones</p>
          {footerData && (
            <>
              <p style={{ color: "white" }}>
                Office Phone: {footerData.ophone}
              </p>
              <p style={{ color: "white" }}>
                Mobile Phone: {footerData.mobilephone}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer1;
