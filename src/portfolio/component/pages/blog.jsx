import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom';
import "../css/blog.css";

function Blogs() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch("https://localhost-000.onrender.com/blog/getblog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setBlogData(data.data);
        } else {
          console.error(
            "API response does not have the expected structure:",
            data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <h1 className='titre1'>Latest Blogs</h1>
      <p className='sous'>
        What is a title slide? The Title Slide layout is the default layout when
        you open a blank presentation in PowerPoint.
      </p>
      <div id='blog-images' className='blog-images'>
        {blogData.map((blog, index) => (
          <div key={index} className='B1'>
            <img className={`blog-image`} src={blog.blogimage} alt='blog-img' />
            <div className={`blog`}>
              <div className='text'>
                <p>{blog.blogtitle}</p>
                <p>{blog.description}</p>
              </div>
              <div>
                <p>{blog.imagedes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
