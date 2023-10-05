import React, { useState, useEffect } from 'react';
// import '';

const Header1 = () => {
    const [navVisible, setNavVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [headingData, setHeadingData] = useState({
        _id: '651e5ae0cf90656922fd2fc9',
        heading: 'welcome To',
        headingg: 'Crazy Web UI',
    });

    useEffect(() => {
        // Fetch the heading data from the API
        fetch('http://localhost:5000/hero/gethero')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setHeadingData(data.data[0]);
                } else {

                    console.error('Failed to fetch heading data');
                }
            })
            .catch((error) => {

                console.error('Error fetching heading data:', error);
            });
    }, []);

    const toggleNav = () => {
        setNavVisible(!navVisible);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        const updatedData = {
            _id: headingData._id,
            heading: headingData.heading,
            headingg: headingData.headingg,
        };


        fetch(`http://localhost:5000/hero/update/${headingData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: [updatedData] }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setEditMode(false);
                } else {
                    // Handle error if needed
                    console.error('Failed to update heading data');
                }
            })
            .catch((error) => {
                // Handle fetch error if needed
                console.error('Error updating heading data:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHeadingData({
            ...headingData,
            [name]: value,
        });
    };

    return (
        <header className="boxy">
            <div className="div1">
                <nav id="nav" className={`nav ${navVisible ? 'show-nav' : ''}`}>
                    <a href="{Footer1} target='_blank'">Home</a>
                    <a href="#">Services</a>
                    <a href="#">Why Choose us</a>
                    <a href="#">Skills</a>
                    <a href="#">Contact us</a>
                    <a href="#">My Blogs</a>
                </nav>
            </div>
            <div id="polygon-image" className="heads">
                {editMode ? (
                    <div className="flex-item">
                        <input
                            type="text"
                            name="heading"
                            value={headingData.heading}
                            onChange={handleChange}
                        />
                    </div>
                ) : (
                    <div className="flex-item">
                        <h1>{headingData.heading}</h1>
                    </div>
                )}
                {editMode ? (
                    <div className="flex-item">
                        <input
                            type="text"
                            name="headingg"
                            value={headingData.headingg}
                            onChange={handleChange}
                        />
                    </div>
                ) : (
                    <div className="flex-item">
                        <h1>{headingData.headingg}</h1>
                    </div>
                )}
                <div className="flex-item">
                    {editMode ? (
                        <button className="button1" onClick={handleSave}>
                            Save
                        </button>
                    ) : (
                        <button className="button1" onClick={handleEdit}>
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header1;
