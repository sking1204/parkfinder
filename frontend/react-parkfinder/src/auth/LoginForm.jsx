import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ParkfinderApi from '../services/ParkfinderApi';
import "./LoginForm.css";

const LoginForm = ({setToken, setUser}) =>{
    const initialState ={
        username: "",         
        password:""
    }
    const [formData, setFormData] = useState(initialState);    
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleChange = (evt) => {
        const {value, name} = evt.target;         
        setFormData(data => ({
            ...data,
            [name]: value
            
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // Disable the button immediately
        setIsSubmitted(true);
        try {
            const token = await ParkfinderApi.login(formData);
            if(token) {                 
                setToken(token);
                setFormData(initialState);              
                navigate("/");
               
            }

        } catch(error) {
            console.error(error);
            setErrorMessage("Incorrect username and/or password. Please try again.")
            // setFormData(initialState);
            const errorTimeout = setTimeout(() =>{
                setErrorMessage('');                  
                setFormData(initialState);  
                setIsSubmitted(false);
            }, 2000);
        }
        
        
    };



    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="form-style"  // Apply the CSS class
        >
            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
           
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                // className="submitButton"  // Apply the CSS class
                className = {`submitButton ${isSubmitted ? 'submitted' : ''}`}
                disabled={isSubmitted}
            >
                Submit
            </Button>
        </Box>
    )
}

export default LoginForm;