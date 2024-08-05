import {useState} from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, Checkbox, Button, Typography, Grid, FormControlLabel, Box, CardActions } from '@mui/material';
import ParkfinderApi from '../services/ParkfinderApi';
import './ParkFees.css';

//new
const ParkFees = ({ park, user }) => {
  const [checkedFees, setCheckedFees] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showActivities, setShowActivities] = useState(true); 

  const handleCheckboxChange = (evt) => {
    const { value, checked } = evt.target;
    if (value === 'Free') {
      const fee = { title: 'Free', cost: '0.00' };
      setCheckedFees((prevCheckedFees) => {
        const newCheckedFees = new Set(prevCheckedFees);
        if (checked) {
          newCheckedFees.add(fee);
        } else {
          newCheckedFees.delete(fee);
        }
        return newCheckedFees;
      });
    } else {
      const { title, cost } = JSON.parse(value);
      const fee = { title, cost };
      setCheckedFees((prevCheckedFees) => {
        const newCheckedFees = new Set(prevCheckedFees);
        if (checked) {
          newCheckedFees.add(fee);
        } else {
          newCheckedFees.delete(fee);
        }
        return newCheckedFees;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous messages
    setSuccessMessage('');
    setErrorMessage('');

    if (checkedFees.size === 0) {
      setErrorMessage('Please make at least one selection.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // Convert checkedFees to an array of fee objects
    const feeData = Array.from(checkedFees);

    try {
      const response = await ParkfinderApi.saveEntranceFees(user, park.parkCode, feeData);
      setSuccessMessage('Fees saved successfully!');
      setIsSubmitted(true); // Set submission status to true
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving fees:', error);
      setErrorMessage('Failed to save fees. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleBackClick = () => {
    setShowActivities(false);
  };

  return (
    <Card sx={{ padding: 2, margin: 2, backgroundColor: '#DCEDC8', width:"1216px" }}>
      <CardContent>
        <Typography           
          sx={{
            fontWeight: 'bold',
            fontSize: '25px',
            color: '#3B403C',
          }}
        >
          Entrance Fees
        </Typography>
        <Typography variant="subtitle1" marginBottom>
          Select fees/passes to add to your saved items!
        </Typography>
        {successMessage && <Typography className="success-message">{successMessage}</Typography>}
        {errorMessage && <Typography className="error-message">{errorMessage}</Typography>}

        {park.entranceFees.length > 0 ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {park.entranceFees.map((fee, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body1">
                        {fee.title} - <strong>${fee.cost}</strong>
                      </Typography>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={JSON.stringify({ title: fee.title, cost: fee.cost })}
                            onChange={handleCheckboxChange}
                            disabled={isSubmitted}
                          />
                        }
                        label="Select"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitted}
              >
                Submit
              </Button>
            </Box>
          </form>
        ) : (
          <Card variant="outlined" sx={{ marginTop: 2 }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Typography>
                  {park.fullName} is FREE, no entrance pass required!
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Free"
                      onChange={handleCheckboxChange}
                      disabled={isSubmitted}
                    />
                  }
                  label="This park is free"
                />
              </form>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardActions>
        <Grid container direction="column" alignItems="center" sx={{ width: '100%' }}>
          <Grid item>
            <Box sx={{ marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitted}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Button
                component={Link}
                to={`/parks/parkCode/${park.parkCode}`}
                onClick={handleBackClick}
              >
                Back to Park Details!
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ParkFees;



//old code ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// const ParkFees = ({ park, user }) => {
//   const [checkedFees, setCheckedFees] = useState(new Set());
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);


//   const handleCheckboxChange = (evt) => {
//     const { value, checked } = evt.target;
//     const [feeName, feeCost] = value.split('|');
//     const fee = { title: feeName, cost: feeCost };

//     setCheckedFees((prevCheckedFees) => {
//       const newCheckedFees = new Set(prevCheckedFees);
//       if (checked) {
//         newCheckedFees.add(fee);
//       } else {
//         newCheckedFees.delete(fee);
//       }
//       console.log(newCheckedFees)
//       return newCheckedFees;
//     });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear any previous messages
//     setSuccessMessage('');
//     setErrorMessage('');

//     if (checkedFees.size === 0) {
//       setErrorMessage('Please make at least one selection.');
//       setTimeout(() => setErrorMessage(''), 3000);
//       return;
//     }
  
//     // Convert checkedFees to an array of IDs
//     const feeData = Array.from(checkedFees);
  
//     console.log('Selected activities:', feeData);
  
//     try {
//       const response = await ParkfinderApi.saveEntranceFees(user, park.parkCode, feeData);
//       console.log('Fees saved successfully:', response);
//       setSuccessMessage('Fees saved successfully!');
//       setIsSubmitted(true); // Set submission status to true
//       const successTimeout = setTimeout(() =>{
//         setSuccessMessage('');
//       }, 3000);
//     } catch (error) {
//       console.error('Error saving fees:', error);
//       setErrorMessage('Failed to save fees. Please try again.');
//       const errorTimeout = setTimeout(() =>{
//         setErrorMessage('');
//       }, 3000);
//     }
//   };

//   const handleBackClick = () => {
//     setShowActivities(false);
//   };

//   return (
//     <Card sx={{ padding: 2, margin: 2, backgroundColor: '#DCEDC8' }}>
//       <CardContent>
//         <Typography
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             fontSize: '25px',
//             color: '#3B403C',
//           }}
//         >
//           Entrance Fees
//         </Typography>
//         <Typography variant="subtitle1" 
//         marginBottom>
//           Select fees/passes to add to your saved items!
//         </Typography>
//         {successMessage && <Typography 
//         className="success-message"       
//         >{successMessage}</Typography>}
//          {errorMessage && <Typography
//         className="error-message"
//         >{errorMessage}</Typography>}
        
//         {park.entranceFees.length > 0 ? (
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               {park.entranceFees.map((fee, index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <Card variant="outlined">
//                     <CardContent>
//                       <Typography variant="body1">
//                         {fee.title} - <strong>${fee.cost}</strong>
//                       </Typography>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             value={`${fee.title}|${fee.cost}`}
//                             onChange={handleCheckboxChange}
//                           />
//                         }
//                         label="Select"
//                       />
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//             <Box sx={{ marginTop: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 disabled={isSubmitted}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </form>
//         ) : (
//           <Card variant="outlined" sx={{ marginTop: 2 }}>
//             <CardContent>
//               <form onSubmit={handleSubmit}>
//                 <Typography>
//                   {park.fullName} is FREE, no entrance pass required!
//                 </Typography>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       value="Free"
//                       onChange={handleCheckboxChange}
//                       disabled={isSubmitted}
//                     />
//                   }
//                   label="This park is free"
//                 />
//               </form>
//             </CardContent>
//           </Card>
//         )}
//       </CardContent>
//       <CardActions>
//         <Grid container direction="column" alignItems="center" sx={{ width: '100%' }}>
//           <Grid item>
//             <Box sx={{ marginTop: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 disabled={isSubmitted}
//                 onClick={handleSubmit} // Added to handle the form submission when the button is clicked
//               >
//                 Submit
//               </Button>
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 2 }}>
//               <Button
//                 component={Link}
//                 to={`/parks/parkCode/${park.parkCode}`}
//                 onClick={handleBackClick}
//               >
//                 Back to Park Details!
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </CardActions>
//     </Card>
//   );
// };

// export default ParkFees;




//old code

//           <Card variant="outlined" sx={{ marginTop: 2 }}>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <Typography>
//                 {park.fullName} is FREE, no entrance pass required!
//               </Typography>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     value="Free"
//                     onChange={handleCheckboxChange}
//                     disabled={isSubmitted}
//                   />
//                 }
//                 label="This park is free"
//               />
//               <Box sx={{ marginTop: 2 }}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={isSubmitted}
//                 >
//                   Submit
//                 </Button>
//               </Box>
//             </form>
//           </CardContent>
//         </Card>
//       )}
//     </CardContent>
//       <CardActions>
//         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//           <Button
//             component={Link}
//             to={`/parks/parkCode/${park.parkCode}`}
//             onClick={handleBackClick}
//           >
//             Back to Park Details!
//           </Button>
//         </Box>
//       </CardActions>
//     </Card>
//   );
// };

// export default ParkFees;

//   return (
//     <Card
//       sx={{
//         padding: 2,
//         margin: 6,
//         backgroundColor: '#DCEDC8',
//         // border: '10px solid #DCEDC8'
//       }}
//     >
//       <CardContent>
//         <Typography
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             fontSize: '25px',
//             color: '#3B403C',
//           }}
//         >
//           Entrance Fees
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           Select fees/passes to add to your saved items!
//         </Typography>
//         {successMessage && (
//           <Typography variant="body2" color="success">
//             {successMessage}
//           </Typography>
//         )}
//         {errorMessage && (
//           <Typography variant="body2" color="error">
//             {errorMessage}
//           </Typography>
//         )}
//         {park.entranceFees.length > 0 ? (
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               {park.entranceFees.map((fee, index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <Card variant="outlined">
//                   <Typography variant="body1">
//                     {fee.title} - <strong>${fee.cost}</strong>
//                   </Typography>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         value={`${fee.title}|${fee.cost}`}
//                         onChange={handleCheckboxChange}
//                       />
//                     }
//                     label="Select"
//                   />
//                   </Card>
//                 </Grid>
              
//               ))}
             
//             </Grid>
//             <Box sx={{ marginTop: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 disabled={isSubmitted}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </form>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <Typography>
//               {park.fullName} is FREE, no entrance pass required!
//             </Typography>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   value="Free"
//                   onChange={handleCheckboxChange}
//                   disabled={isSubmitted}
//                 />
//               }
//               label="This park is free"
//             />
//             <Box sx={{ marginTop: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 disabled={isSubmitted}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </form>
//         )}
//       </CardContent>
//       <CardActions>
//         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//           <Button
//             component={Link}
//             to={`/parks/parkCode/${park.parkCode}`}
//             onClick={handleBackClick}
//           >
//             Back to Park Details!
//           </Button>
//         </Box>
//       </CardActions>
//     </Card>
//   );
// };

// export default ParkFees;

  
  //   return (
  //     <Card sx={{ 
  //       padding: 2, 
  //       margin: 6,
  //       backgroundColor: '#DCEDC8',
  //        }}>
  //       <CardContent>
  //         <Typography
  //           gutterBottom
  //           sx={{
  //             fontWeight: 'bold',
  //             fontSize: '25px',
  //             color: '#3B403C',
  //           }}
  //         >
  //           Entrance Fees
  //         </Typography>
  //         <Typography variant="subtitle1" gutterBottom>Select fees/passes to add to your saved items!</Typography>
  //         {successMessage && <Typography variant="body2" color="success">{successMessage}</Typography>}
  //         {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
  //         {park.entranceFees.length > 0 ? (
  //           <form onSubmit={handleSubmit}>
  //             <Grid container spacing={2}>
  //               {park.entranceFees.map((fee, index) => (
  //                 <Grid item xs={12} sm={6} md={4} key={index}>
  //                   <Card 
  //                   variant="outlined"
                  
  //                   >
  //                     <CardContent>
  //                       <Typography variant="body1">{fee.title} - <strong>${fee.cost}</strong></Typography>
  //                       <FormControlLabel
  //                         control={
  //                           <Checkbox
  //                             value={`${fee.title}|${fee.cost}`}
  //                             onChange={handleCheckboxChange}
  //                           />
  //                         }
  //                         label="Select"
  //                       />
  //                     </CardContent>
  //                   </Card>
  //                 </Grid>
  //               ))}
  //             </Grid>
  //             <Box sx={{ marginTop: 2 }}>
  //               <Button
  //                 type="submit"
  //                 variant="contained"
  //                 color="primary"
  //                 disabled={isSubmitted}
  //               >
  //                 Submit
  //               </Button>
  //             </Box>
  //           </form>
  //         ) : (
  //           <form onSubmit={handleSubmit}>
  //             <Typography>{park.fullName} is FREE, no entrance pass required!</Typography>
  //             <FormControlLabel
  //               control={
  //                 <Checkbox
  //                   value="Free"
  //                   onChange={handleCheckboxChange}
  //                   disabled={isSubmitted}
  //                 />
  //               }
  //               label="This park is free"
  //             />
  //             <Box sx={{ marginTop: 2 }}>
  //               <Button
  //                 type="submit"
  //                 variant="contained"
  //                 color="primary"
  //                 disabled={isSubmitted}
  //               >
  //                 Submit
  //               </Button>
  //             </Box>
  //           </form>
  //         )}
  //       </CardContent>
  //       <CardActions>
  //         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
  //           <Button
  //             component={Link}
  //             to={`/parks/parkCode/${park.parkCode}`}
  //             onClick={handleBackClick}
  //           >
  //             Back to Park Details!
  //           </Button>
  //         </Box>
  //       </CardActions>
  //     </Card>
  //   );
  // };
  
  // export default ParkFees;



  //orig
//   return (
//     <>
    
//     <div className="park-fees">
//       <h2>Entrance Fees</h2>
//       <h5>Select fees/passes to add to your saved items!</h5>
//       {successMessage && <p className="success-message">{successMessage}</p>} {/* Conditionally render success message */}
//       {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally render error message */}       
//       {park.entranceFees.length > 0 ? (
//         <form onSubmit={handleSubmit}>
//         <ul>
//           {park.entranceFees.map((fee, index) => (
//             <li key={index}>               
//               <p>{fee.title} - <strong>${fee.cost}</strong></p>
//               <label>
//                 <input type="checkbox"
//                 value={`${fee.title}|${fee.cost}`}
//                   // value={fee.title}
//                   onChange={handleCheckboxChange}
//                   />
//               </label>
//             </li>             
//           ))}
//         </ul>
        
//         <button type="submit" className="submit-button">Submit</button>
//         </form>
//       ) : (
//         <form onSubmit={handleSubmit}>
//             <p>{park.fullName} is FREE, no entrance pass required!</p>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Free"
//                 onChange={handleCheckboxChange}
//                 className={`check-box ${isSubmitted ? 'submitted' : ''}`}
//                 disabled={isSubmitted} // Disable checkbox if submitted
//               />
//               This park is free
//             </label>
//             <button
//                 type="submit"
//                 className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
//                 disabled={isSubmitted} // Disable button if submitted
//               >
//                 Submit
//               </button>
              
//             {/* <button type="submit" className="submit-button">Submit</button> */}
//           </form>
//       )}
//     </div>
//     <div>
//     <Link className="back" to={`/parks/parkCode/${park.parkCode}`} onClick={handleBackClick}>Back to Park Details!</Link>
//     </div>
//     </>
//   );
// };

// export default ParkFees;

/* Once selected fee, then show description/details */

  {/* <p><strong>Cost:</strong> ${fee.cost}</p>
              <p><strong>Description:</strong> {fee.description}</p> */}
              {/* <p><strong>Title:</strong> {fee.title} - ${fee.cost}</p> */}