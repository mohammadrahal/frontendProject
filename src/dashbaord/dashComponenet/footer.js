import React, { useEffect, useState } from 'react';
import './footer1.css';

const Footer1 = () => {
    const [footerData, setFooterData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({}); // Store the updated data locally before sending it to the server

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5000/footer/getfooter')
            .then((response) => response.json())
            .then((data) => {
                // Set the fetched data to the state
                setFooterData(data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleEdit = () => {
        if (!editMode) {
            setUpdatedData({
                address: footerData[0]?.address || '',
                quater: footerData[0]?.quater || '',
                ophone: footerData[0]?.ophone || '',
                mobilephone: footerData[0]?.mobilephone || '',
            });
        }
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Update the local data with the edited values
        setFooterData([updatedData]);

        // Update the database with the edited data
        fetch(`http://localhost:5000/footer/update/${footerData[0]._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the local data with the edited values
                setFooterData([data]);
                setEditMode(false);
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    return (
        <div className="foots">
            <div className="Flex_containerz">
                <div className="flex-itemz">
                    <p> Our Addresses</p>
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                name="address"
                                value={updatedData.address || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="quater"
                                value={updatedData.quater || ''}
                                onChange={handleInputChange}
                            />
                        </>
                    ) : (
                        <>
                            <p style={{ color: 'white' }}>{footerData[0]?.address}, Lebanon</p>
                            <p> Our Headquarters</p>
                            <p style={{ color: 'white' }}>{footerData[0]?.quater}, U.A.E.</p>
                        </>
                    )}
                </div>
                <div className="flex-itemz">
                    <p className="social-media"> Our Phones</p>
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                name="ophone"
                                value={updatedData.ophone || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="mobilephone"
                                value={updatedData.mobilephone || ''}
                                onChange={handleInputChange}
                            />
                        </>
                    ) : (
                        <>
                            <p style={{ color: 'white' }}>Office Phone: {footerData[0]?.ophone}</p>
                            <p style={{ color: 'white' }}>Mobile Phone: {footerData[0]?.mobilephone}</p>
                        </>
                    )}
                </div>

                <div className="flex-itemz">
                    <p>Follow us on social media:</p>
                    <div className="social-media">
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                            Facebook
                        </a>
                        <a href="https://www.github.com" target="_blank" rel="noreferrer">
                            Github
                        </a>
                    </div>
                    <div className="social-media">
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            Instagram
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
            {editMode ? (
                <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleEdit}>Cancel</button>
                </>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
};

export default Footer1;