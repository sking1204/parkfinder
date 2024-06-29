import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LogIn() {
  return (
    <>

    <h1>Log In Here!</h1>
    
    <form className="form">
      <TextField className="form-input"
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField className="form-input"
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
      />      
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>

    </>
  );
}

export default LogIn;
