
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ParkfinderApi from '../services/ParkfinderApi';


const TripPlannerForm = () => {
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const user = await ParkfinderApi.signUp(formData);
            console.log('Response from login API:', user);
            // login(user);
            navigate('/')
        } catch (err) {
            console.error('Error during login:', err);
            alert("Failed login attempt");
        }
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    return (
        <>
        <h1>Plan Your Trip</h1>
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="form-style"  // Apply the CSS class
        >
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="formField"  // Apply the CSS class
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="formField"  // Apply the CSS class
            />
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="formField"  // Apply the CSS class
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="formField"  // Apply the CSS class
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                margin="normal"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="formField"  // Apply the CSS class
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className="submitButton"  // Apply the CSS class
            >
                Submit
            </Button>
        </Box>
    </>
    );
}







export default TripPlannerForm;