
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ParkfinderApi from '../services/ParkfinderApi';
// import "../auth/Forms.css"
import "./SignUpForm.css"

const SignUpForm = ({setToken, setUser}) => {

    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };


    const handleChange=(evt) =>{
        const {value,name} = evt.target;
        setFormData(data =>({
            ...data,
            [name]: value
        }));
    };



    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);    
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsSubmitted(true); 
    
        // Basic form validation
        if (!formData.username || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
            setErrorMessage("All fields are required.");
            setTimeout(() => {
                setErrorMessage('');
                setIsSubmitted(false);
            }, 2000);
            return;
        }
    
        try {
            // Sign up the user
            const user = await ParkfinderApi.signUp(formData);
            console.log('Response from signUp API:', user);
    
            // Log in the user with the same credentials
            const token = await ParkfinderApi.login({ username: formData.username, password: formData.password });
            console.log('Response from login API:', token);
    
            if (token) {
                setToken(token); // Set the token in your state or context
                setFormData(INITIAL_STATE); // Clear the form data
                navigate('/'); // Redirect to the home page or dashboard
            }
        } catch (err) {
            console.error('Error during signup/login:', err);
            setErrorMessage("Failed signup/login attempt. Please try again.");
            setIsSubmitted(false);
        }
    };

    // const handleSubmit = async (evt) => {
    //     evt.preventDefault();
    //     // Disable the button immediately
    //     setIsSubmitted(true); 

    //     // Basic form validation
    //     if (!formData.username || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
    //         setErrorMessage("All fields are required.");
    //         const errorTiemout = setTimeout(() =>{
    //             setErrorMessage(''); 
    //             setIsSubmitted(false); // Enable the button again
    //         },2000)
            
    //         return;
    //     }

    //     try {
    //         const user = await ParkfinderApi.signUp(formData);
    //         console.log('Response from login API:', user);
    //         // added 7/29
    //         const token = await ParkfinderApi.login(formData);
    //         if(token) {                 
    //             setToken(token);
    //         //added 7/29
    //         setFormData(INITIAL_STATE); 
    //         // login(user);
    //         navigate('/')
    //         }
    //     } catch (err) {
    //         console.error('Error during signup:', err);
    //         setErrorMessage("Failed signup attempt. Please try again.")
    //         setIsSubmitted(false);
    //     }
    // };

    // const handleChange = (evt) => {
    //     const { name, value } = evt.target;
    //     setFormData(formData => ({
    //         ...formData,
    //         [name]: value
    //     }));
    // };

    // {errorMessage && <div className="error-message">{errorMessage}</div>}

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="form-style"  // Apply the CSS class
        >
         {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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
                className={`submitButton ${isSubmitted ? 'submitted' : ''}`}
                disabled={isSubmitted}
            >
                Submit
            </Button>
        </Box>
    );
}

export default SignUpForm;
