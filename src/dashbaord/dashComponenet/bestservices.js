import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './button.css';
// import Blue from "./bleu.jpg";
// import Developer from "./developer.jpg";

function Ourservice() {
    const [serviceData, setServiceData] = useState({
        _id: "",
        title1: "",
        title2: "",
        paragraph1: "",
        tick1: "",
        tick2: "",
        tick3: "",
        __v: 0,
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        // Fetch data from the API
        fetch("https://localhost-000.onrender.com/service/getservice")
            .then((response) => response.json())
            .then((data) => {
                // Assuming data structure is like {"data": [...]}
                const firstService = data.data[0];

                // Set the service data in state
                setServiceData(firstService);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = () => {
        // Send the edited data to the API
        fetch(`https://localhost-000.onrender.com/service/update/${serviceData._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data updated successfully:", data);
                setEditMode(false);
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData({
            ...serviceData,
            [name]: value,
        });
    };

    return (
        <div id="content">
            <div id="our-service">
                <h3 id="title12">Our Service</h3>
                <div id="title">
                    {editMode ? (
                        <input
                            type="text"
                            name="title1"
                            value={serviceData.title1}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <h1>{serviceData.title1}</h1>
                    )}
                </div>
                {editMode ? (
                    <>
                        <input
                            type="text"
                            name="paragraph1"
                            value={serviceData.paragraph1}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="tick1"
                            value={serviceData.tick1}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="tick2"
                            value={serviceData.tick2}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="tick3"
                            value={serviceData.tick3}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                    </>
                ) : (
                    <>
                        <p>{serviceData.paragraph1}</p>
                        <span>&#10003; {serviceData.tick1}</span>
                        <br />
                        <span>&#10003; {serviceData.tick2}</span>
                        <br />
                        <span>&#10003; {serviceData.tick3}</span>
                        <br />
                    </>
                )}
                <br />
                <button onClick={handleEditClick}>
                    {editMode ? "Cancel Edit" : "Edit"}
                </button>
            </div>
        </div>
    );
}

export default Ourservice;
