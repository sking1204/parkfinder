import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ParkfinderApi from '../services/ParkfinderApi';

const NewFormTextArea = ({ selectedName, setToken,setUser, parkCodes }) => {
  const INITIAL_STATE = {
    review_title: '',
    review_data: '',
    rating: ''
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const navigate = useNavigate();
  const {username, park_code} = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      /* NEED TO FIND A WAY TO MAKE THE USERNAME AND PARK CODE DYNAMIC */
      // const username = 'AnnieCat'; // Replace with actual username
      // const park_code = '1'; // Replace with actual park code

      const review = await ParkfinderApi.leaveReview(username, park_code, formData);
      if(review){
        // setUser(user)
        setFormData(INITIAL_STATE)
      }
      console.log('Response from leaving review:', review);
      navigate('/');
    } catch (err) {
      console.error('Error during leaving review:', err);
      alert("Failed review");
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
      <div>
        <h1>Leave a review for: {selectedName}</h1>
        <h2>{parkCodes}</h2>
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
          label="Review Title"
          variant="outlined"
          fullWidth
          margin="normal"
          id="review_title"
          name="review_title"
          value={formData.review_title}
          onChange={handleChange}
          className="form-style"
        />
        <TextField
          className="form-style"
          fullWidth
          label="Please leave your review here."
          id="review_data"
          name="review_data"
          value={formData.review_data}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          className="form-style"
          fullWidth
          label="Rating"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          margin="normal"
          type="number"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </Box>
    </>
  );
}

export default NewFormTextArea;







// import React, {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import ParkfinderApi from '../services/ParkfinderApi';

// const FormTextArea =({selectedName}) => {

//   // const INITIAL_STATE={
//   //   review_title: '',
//   //   review_data:'',
//   //   rating: ''
//   // };

//   const [formData, setFormData] = useState([]);
//   const navigate = useNavigate();





//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try{
//     const review = await ParkfinderApi.leaveReview(formData);
//     console.log('Response from leaving review:', review);
//     navigate('/')
//     } catch(err){
//       console.error('Error during leaving review:', err);
//       alert("Failed review");
//     }
//     // const formData = new FormData(event.currentTarget);
//     // const reviewText = formData.get('review');
//     // console.log("Review submitted:", reviewText);
//   };

//   const handleChange = (evt) => {
//     const { name, value } = evt.target;
//     setFormData(formData => ({
//         ...formData,
//         [name]: value
//     }));
// };



//   return (
//     <>
//     <div>
//         <h1>Leave a reivew for: {selectedName}</h1>
//     </div>
//     <Box
//       component="form"
//       sx={{
//         width: 500,
//         maxWidth: '100%',
//       }}
//       onSubmit={handleSubmit}
//     >
//     <TextField
//                 label="Review Title"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 id="title"
//                 name="title"
//                 value={formData.title}                 
//                 onChange={handleChange}
//                 className="form-style"  // Apply the CSS class
//             />
//       <TextField
//         className="form-style"
//         fullWidth
//         label="Please leave your review here."
//         id="review"
//         name="review"
//         value={formData.review}
//       />
//       <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
//         Submit
//       </Button>
//     </Box>
//     </>
//   );
// }

// export default FormTextArea;



