// ParkForm.js
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ParkForm = ({ selectedName, selectedCode }) => {

    const handleSubmit = async(evt) =>{
        evt.preventDefault();
        console.log("Form submitted")
    }
  return (
    <>
    <div>
    <h2>Park Details:</h2>
    </div>
    <Box
    component="form"
    sx={{
      width: 500,
      maxWidth: '100%',
    }}
    onSubmit={handleSubmit}
    >      
    
        <TextField
          fullWidth
          margin="normal"
          label="Park Name"
          value={selectedName}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Park Code"
          value={selectedCode}
          InputProps={{
            readOnly: true,
          }}
        />
        {/* <TextField
          fullWidth
          margin="normal"
          label="Park Description"
          value={selectedPark.description}
          InputProps={{
            readOnly: true
          }}
          /> */}
            
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </Box>
    </>
  )};
  


export default ParkForm;
         
