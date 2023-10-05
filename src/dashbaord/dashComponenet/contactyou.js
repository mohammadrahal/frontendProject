import React, { useState, useEffect } from 'react';


const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await fetch('http://localhost:5000/contact/getcontact');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (Array.isArray(data.data)) {
                    setContacts(data.data);
                } else {
                    // Handle the case where the API response is not an array
                    setError('Data received from the API is not in the expected format.');
                }
            } catch (error) {
                console.error('Error fetching contact data:', error);
                setError('Error fetching contact data. Please try again later.');
            }
        };

        fetchContactData();
    }, []);

    const handleDeleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/contact/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Remove the deleted contact from the state
            setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
            setError('Error deleting contact. Please try again later.');
        }
    };

    return (
        <div className="contact-list">
            <h2>Here are the people who contacted you!</h2>
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="contact-box-container">
                    {contacts.map((contact) => (
                        <div className="contact-box" key={contact._id}>
                            <h3>{contact.name}</h3>
                            <p>Email: {contact.email}</p>
                            <p>Message: {contact.message}</p>
                            <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactList;
