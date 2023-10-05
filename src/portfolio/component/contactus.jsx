import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [labels, setLabels] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // Fetch labels, image URL, and other data from the API
        fetch('https://localhost-000.onrender.com/contactShape/getContactShape')
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    const firstItem = data.data[0];
                    setLabels({
                        name: firstItem.contentName || 'Name',
                        email: firstItem.contentEmail || 'Email',
                        message: firstItem.contentMessage || 'Message',
                    });
                    setImageUrl(firstItem.image || ''); // Set the image URL
                }
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            message
        };

        // Send a POST request to your API
        fetch('http://localhost:5000/contact/postcontact', {
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
                <img src={imageUrl} alt="Contact Us" />
            </div>
            <div className="contact-content">
                <div className="form-container">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">{labels.name}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{labels.email}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">{labels.message}</label>
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
                    {submitted && <p>Message sent!</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
