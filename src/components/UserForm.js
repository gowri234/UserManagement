import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css';



// Back button handler



const UserForm = ({ initialData, onSave, addUserToState }) => {
    const [formData, setFormData] = useState(initialData || {});
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = formData.id
            ? axios.put(`https://jsonplaceholder.typicode.com/users/${formData.id}`, formData)
            : axios.post('https://jsonplaceholder.typicode.com/users', formData);

        apiCall
            .then((response) => {
                if (!formData.id) {
                    addUserToState({ ...formData, id: response.data.id });
                    alert('Successfully Added User');
                }
                onSave(); // Close the form and refresh the list
            })
            .catch(() => setError('Failed to save user. Please try again.'));
    };

    return (
        <div className="bg-card">

            <form className="form-container" onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <h1 className="heading">Add New User...</h1>
                <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleChange}
                    placeholder="Department"
                />
                <div>
                    <button className="button" type="submit">Save</button>
                    <button
                        className="back-button"
                        onClick={() => navigate(-1)} // Navigate back to the previous page
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
