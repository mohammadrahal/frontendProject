import React, { useState, useEffect } from 'react';
import './index.css';
import './button.css';
const App = () => {
    const [data, setData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState(null);

    // State variables for the last 3 text values
    const [editedFirstTick, setEditedFirstTick] = useState('');
    const [editedSecondTick, setEditedSecondTick] = useState('');
    const [editedThirdTick, setEditedThirdTick] = useState('');

    useEffect(() => {
        // Fetch data from the server when the component mounts
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/whyus/kel'); // Replace with your API endpoint
                if (response.ok) {
                    const result = await response.json();
                    if (result.data && result.data.length > 0) {
                        setData(result.data[0]);
                        setEditedData(result.data[0]);
                    }
                    setIsLoading(false);
                } else {
                    console.error('Failed to fetch data from the server.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSaveClick = async () => {
        // Send edited data back to the server when saving
        try {
            const response = await fetch(`http://localhost:5000/whyus/update/${data._id}`, {
                method: 'PUT', // Assuming you use PUT for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            if (response.ok) {
                console.log('Data updated successfully.');

                // Update the document in MongoDB with the same ID
                const updateResponse = await fetch(`http://localhost:5000/whyus/updateDocument/${data._id}`, {
                    method: 'PUT', // Assuming you use PUT for updates
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedData),
                });

                if (updateResponse.ok) {
                    console.log(`Document with ID ${data._id} updated in MongoDB.`);
                } else {
                    console.error('Failed to update document in MongoDB.');
                }

                setData(editedData); // Update displayed data
            } else {
                console.error('Failed to update data on the server.');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
        setIsEditing(false); // Exit edit mode
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!file) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const uploadedImageUrl = data.imageUrl;
                setEditedData({ ...editedData, image: uploadedImageUrl });
            } else {
                console.error('Error uploading the file.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Why Choose Us?</h2>
            {isEditing ? (
                <>
                    <textarea
                        name="whyus"
                        value={editedData.whyus}
                        onChange={handleInputChange}
                    />
                    {/* Input fields for the last 3 text values */}
                    <input
                        type="text"
                        name="firsttick"
                        value={editedData.firsttick}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="secondtick"
                        value={editedData.secondtick}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="thirdtick"
                        value={editedData.thirdtick}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={editedData.image}
                        onChange={handleInputChange}
                    />
                </>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '50%' }}>
                        <p>{data.whyus}</p>
                        <p><img className='' src='' />{data.sfirsttick}</p>
                        <p><img className='' src='' />{data.ssecondtick}</p>
                        <p><img className='' src='' />{data.sthirdtick}</p>
                    </div>
                    <img style={{ width: '150px', height: '150px' }} src={data.image} alt="Image" />
                </div>
            )}

            <div className="content-why">
                <div className="list-why">
                    <div className='list-data'>
                        <div className="list-item">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="firsttick"
                                        value={editedData.firsttick}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <img className='' src='' />
                                    <p>{data.firsttick}</p>
                                </>
                            )}
                        </div>
                        <div className="list-item">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="secondtick"
                                        value={editedData.secondtick}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <img className='' src='' />
                                    <p>{data.secondtick}</p>
                                </>
                            )}
                        </div>
                        <div className="list-item">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="thirdtick"
                                        value={editedData.thirdtick}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <img className='' src='' />
                                    <p>{data.thirdtick}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <button onClick={handleEditClick}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && (
                    <button onClick={handleSaveClick}>Save</button>
                )}
            </div>

            {isEditing && (
                <>
                    {/* Image upload form */}
                    <h2>Upload an Image</h2>
                    <form encType="multipart/form-data">
                        <input type="file" onChange={handleFileChange} />
                        <button type="button" onClick={handleImageUpload}>Upload</button>
                    </form>

                    {imageUrl && (
                        <div>
                            Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{imageUrl}</a>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default App;
