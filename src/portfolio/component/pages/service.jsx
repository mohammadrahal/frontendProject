// import React from "react";

// const Service = () => {
//   const [data, setData] = useState([]);
//   const [api, setApi] = useState(
//     "https://localhost-000.onrender.com/service/getservice"
//   );

//   const fetchData = async () => {
//     try {
//       const response = await fetch(api, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setData(data.data);
//         console.log("Fetched data:", data);
//       } else {
//         console.error("Failed to fetch data from the API.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return
//   <div>
//     <h1 {data.title1} ></h1>
//   </div>;
// };

// export default Service;
