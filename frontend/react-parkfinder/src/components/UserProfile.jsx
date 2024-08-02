//TRYING TO ADD ABILITY TO CHANGE USERNAME:

import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import { Card, CardContent, TextField, Button, Box } from '@mui/material';
import ParkfinderApi from '../services/ParkfinderApi';

function UserProfile({ user, setUser, setToken, token }) {

    const INITIAL_STATE = {
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const data = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };
    try {
      ParkfinderApi.token = token;
      let res = await ParkfinderApi.patchUser(user.username, data); // Pass old username here
      console.log("RESPONSE:", res);
      setUser(res.user); // Update the user state with the new user data
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error patching user:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="form-style" // Apply the CSS class
      data-testid="form-component"
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
        className="formField" // Apply the CSS class
        data-testid="username-input"
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
        className="formField" // Apply the CSS class
        data-testid="first-name-input"
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
        className="formField" // Apply the CSS class
        data-testid="last-name-input"
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
        className="formField" // Apply the CSS class
        data-testid="email-input"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        className="submitButton" // Apply the CSS class
        data-testid="submit-button"
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default UserProfile;


  //8/1
//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       className="form-style" // Apply the CSS class
//       data-testid="form-component"
//     >
//       <TextField
//         label="Username"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         id="username"
//         name="username"
//         value={formData.username}
//         onChange={handleChange}
//         className="formField" // Apply the CSS class
//         data-testid="username-input"
//       />

//       <TextField
//         label="First Name"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         id="firstName"
//         name="firstName"
//         value={formData.firstName}
//         onChange={handleChange}
//         className="formField" // Apply the CSS class
//         data-testid="first-name-input"
//       />
//       <TextField
//         label="Last Name"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         id="lastName"
//         name="lastName"
//         value={formData.lastName}
//         onChange={handleChange}
//         className="formField" // Apply the CSS class
//         data-testid="last-name-input"
//       />
//       <TextField
//         label="Email"
//         variant="outlined"
//         type="email"
//         fullWidth
//         margin="normal"
//         id="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         className="formField" // Apply the CSS class
//         data-testid="email-input"
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         type="submit"
//         fullWidth
//         className="submitButton" // Apply the CSS class
//         data-testid="submit-button"
//       >
//         Save Changes
//       </Button>
//     </Box>
//   );
// }

// export default UserProfile;




// import React, {useState} from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import ParkfinderApi from '../services/ParkfinderApi';


// function UserProfile({user, setUser, setToken, token}) {

//   const INITIAL_STATE = user;


//   const [formData, setFormData] = useState(INITIAL_STATE);
//   const [isSubmitted, setIsSubmitted] = useState(false);
 

//   const handleChange = (evt) => {
//       const {value, name} = evt.target;
//       setFormData(data => ({
//           ...data,
//           [name]: value
//       }));
//   };

//   const handleSubmit = async (evt) => {
//       evt.preventDefault();
//       const data = {
//         //   username: formData.username,
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email
//       };
//       try {
//           ParkfinderApi.token = token;
//           let res = await ParkfinderApi.patchUser(formData.username, data);
//           console.log("RESPONSE:", res);
//           setUser(res.user);
//           setIsSubmitted(true);
//       } catch(error) {
//           console.error("Error patching user:", error);
//       }
//   };


//   return (
//     <Box
//         component="form"
//         onSubmit={handleSubmit}
//         className="form-style"  // Apply the CSS class
//         data-testid ="form-component"
//     >
//         <TextField
//             label="Username"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className="formField"  // Apply the CSS class
//             data-testid= "username-input" 
//         />
 
//         <TextField
//             label="First Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="formField"  // Apply the CSS class
//             data-testid = "first-name-input" 
//         />
//         <TextField
//             label="Last Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="formField"  // Apply the CSS class
//             data-testid="last-name-input" 
//         />
//         <TextField
//             label="Email"
//             variant="outlined"
//             type="email"
//             fullWidth
//             margin="normal"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="formField"  // Apply the CSS class
//             data-testid="email-input"
//         />
//         <Button
//             variant="contained"
//             color="primary"
//             type="submit"
//             fullWidth
//             className="submitButton"  // Apply the CSS class
//             data-testid="submit-button"
//         >
//             Save Changes
//         </Button>
//     </Box>
// );
// }

// export default UserProfile;
