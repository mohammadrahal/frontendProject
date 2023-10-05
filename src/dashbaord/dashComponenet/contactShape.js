import React, { useState, useEffect } from 'react';

// Create a separate component for the image upload form
const ImageUploadForm = ({ setImageSrc, contactId }) => {
    const [file, setFile] = useState(null);

    const handleImageUpload = async () => {
        if (!file) {
            console.error('No file selected for upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`https://localhost-000.onrender.com/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.imageUrl;

                // Update the image source in the parent component
                setImageSrc(imageUrl);

                // Update the image URL in the API using PUT method
                await fetch(`https://localhost-000.onrender.com/contactShape/update/${contactId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        image: imageUrl, // Include the updated image source in the request
                    }),
                });

                // Clear the file input
                setFile(null);
            } else {
                console.error('Error uploading the file.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <h1>Upload an Image</h1>
            <form encType="multipart/form-data">
                <input type="file" id="fileInput" name="file" onChange={handleFileChange} />
                <button type="button" onClick={handleImageUpload}>Upload</button>
            </form>
        </div>
    );
};

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [labels, setLabels] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [contactId, setContactId] = useState('');

    useEffect(() => {
        // Fetch contact data including image source from the API
        fetch('https://localhost-000.onrender.com/contactShape/getContactShape')
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    const firstItem = data.data[0];
                    setLabels({
                        name: firstItem.contentName,
                        email: firstItem.contentEmail,
                        message: firstItem.contentMessage,
                    });
                    setImageSrc(firstItem.image);
                    setContactId(firstItem._id);
                }
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Send a PUT request to update the labels and image source in the API
        if (contactId) {
            fetch(`https://localhost-000.onrender.com/contactShape/update/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...labels,
                    image: imageSrc, // Include the updated image source in the request
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Data updated in API:', data);
                    setIsEditing(false); // Exit edit mode
                })
                .catch(error => {
                    console.error('Error updating data in API:', error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            message
        };

        // Send a POST request to your API
        fetch('https://localhost-000.onrender.com/contact/postcontact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from API:', data);
                setSubmitted(true);
            })
            .catch(error => {
                console.error('Error sending data to API:', error);
            });
    };

    return (
        <div className="contact-container">
            <div className="image-container">
                {isEditing ? (
                    <ImageUploadForm setImageSrc={setImageSrc} contactId={contactId} />
                ) : (
                    <img src={imageSrc} alt="Contact Us" />
                )}
            </div>
            <div className="contact-content">
                <div className="form-container">
                    <h2>Contact Us</h2>
                    {isEditing ? (
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={labels.name}
                                onChange={(e) => setLabels({ ...labels, name: e.target.value })}
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={labels.email}
                                onChange={(e) => setLabels({ ...labels, email: e.target.value })}
                            />
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={labels.message}
                                onChange={(e) => setLabels({ ...labels, message: e.target.value })}
                            ></textarea>
                            <button onClick={handleSaveClick}>Save</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">{labels.name || 'Name'}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">{labels.email || 'Email'}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">{labels.message || 'Message'}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                    {!isEditing && <button onClick={handleEditClick}>Edit</button>}
                    {submitted && <p>Form submitted successfully!</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
