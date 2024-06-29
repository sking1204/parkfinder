import React, {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ParkfinderApi from '../services/ParkfinderApi';
import TokenContext from '../contexts/TokenContext';

function UserProfile({user, setUser}) {

  const INITIAL_STATE = user;
  const token = useContext(TokenContext);

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);
  //const navigate = useNavigate();

  const handleChange = (evt) => {
      const {value, name} = evt.target;
      setFormData(data => ({
          ...data,
          [name]: value
      }));
  };

  const handleSubmit = async (evt) => {
      evt.preventDefault();
      const data = {
          // username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email
      };
      try {
          ParkfinderApi.token = token;
          let res = await ParkfinderApi.patchUser(formData.username, data);
          console.log("RESPONSE:", res);
          setUser(res.user);
          setIsSubmitted(true);
      } catch(error) {
          console.error("Error patching user:", error);
      }
  };


  return (
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
            Save Changes
        </Button>
    </Box>
);
}

export default UserProfile;
