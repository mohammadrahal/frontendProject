import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../css/project.css";

function Project() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://localhost-000.onrender.com/project/getproject")
      .then((response) => response.json())
      .then((data) => {
        // Assuming you want to display the first item in the array
        if (data && data.data && data.data.length > 0) {
          setProjectData(data.data[0]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className='Projects'>
      {projectData && (
        <div className='our proj'>
          <div className='proj'>
            <h1>{projectData.title}</h1>
            <p>{projectData.description}</p>
          </div>
          <a href={projectData.link1} target='_blank' rel='noopener noreferrer'>
            <button className='check'>check</button>
          </a>
        </div>
      )}
      {projectData && (
        <a href={projectData.link1} target='_blank' rel='noopener noreferrer'>
          <img
            className='coffee'
            src={projectData.projectimage1}
            alt='coffe-image'
          />
        </a>
      )}
      <div className='web'>
        <p>web developer</p>
      </div>
      {projectData && (
        <a href={projectData.link2} target='_blank' rel='noopener noreferrer'>
          <img
            className='coffee'
            src={projectData.projectimage2}
            alt='coffe-image'
          />
        </a>
      )}
    </div>
  );
}

export default Project;
