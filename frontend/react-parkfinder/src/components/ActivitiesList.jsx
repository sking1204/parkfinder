//7/18

import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import { Card, CardContent, Checkbox, Button, Typography, Grid, FormControlLabel, Box } from '@mui/material';
import { Card, CardContent, Checkbox, Button, Typography, Grid, FormControlLabel, Box, CardActions } from '@mui/material';
import './ActivitiesList.css';
import ParkfinderApi from '../services/ParkfinderApi';

//card version
const ActivitiesList = ({ park, user }) => {
  const [checkedActivities, setCheckedActivities] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (evt) => {
    const { value, checked } = evt.target;
    const [activityId, activityName] = value.split('|');
    const activity = { nps_activity_id: activityId, name: activityName };
    
    setCheckedActivities((prevCheckedActivities) => {
      const newCheckedActivities = new Set(prevCheckedActivities);
      if (checked) {
        newCheckedActivities.add(activity);
      } else {
        newCheckedActivities.forEach(act => {
          if (act.nps_activity_id === activityId) {
            newCheckedActivities.delete(act);
          }
        });
      }
      return newCheckedActivities;
    });
  };

  const handleSelectAllChange = (evt) => {
    const { checked } = evt.target;
    setCheckedActivities(checked ? new Set(park.activities.map(activity => ({ nps_activity_id: activity.id, name: activity.name }))) : new Set());
  };

  const isAllChecked = checkedActivities.size === park.activities.length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Check if any activities are selected
    if (checkedActivities.size === 0) {
      setErrorMessage('Please select at least one activity.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // Convert checkedActivities to an array of activity objects
    const activities = Array.from(checkedActivities);
    console.log('Selected activities:', activities);

    try {
      const response = await ParkfinderApi.saveActivities(user, park.parkCode, activities);
      console.log('Activities saved successfully:', response);
      setSuccessMessage('Activities saved successfully!');
      setIsSubmitted(true); // Set submission status to true
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving activities:', error);
      setErrorMessage('Failed to save activities. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleBackClick = () => {
    setShowActivities(false);
  };

  return (
    <Card sx={{ padding: 2,
     margin: 2,
     backgroundColor: '#DCEDC8',
      }}>
      <CardContent>
        <Typography  
        gutterBottom
        sx={{
          fontWeight:'bold',
          fontSize: '25px',
          color:'#3B403C',
        }}
        >Activities</Typography>
        {/* <Typography variant="subtitle1" gutterBottom>Select activities to add to your saved items!</Typography> */}
        {successMessage && <Typography variant="body2" color="success">{successMessage}</Typography>}
        {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
        <form onSubmit={handleSubmit}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllChecked}
                onChange={handleSelectAllChange}
                disabled={isSubmitted} 
                // sx={{
                //   '& .MuiSvgIcon-root': {
                //     color: '#3B403C',
                //   },
                // }}
                // sx={{
                //   color: 'white',
                // }}
              />
            }
            label="Select All"
            sx={{
              marginBottom:'20px',
            }}
          />
          <Grid container spacing={2}>
            {park.activities.map((activity, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={`${activity.id}|${activity.name}`}
                          checked={Array.from(checkedActivities).some(act => act.nps_activity_id === activity.id)}
                          onChange={handleCheckboxChange}
                          disabled={isSubmitted}
                        />
                      }
                      label={<Typography variant="body1">{activity.name}</Typography>}
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
      </CardContent>
      <CardActions>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            to={`/parks/parkCode/${park.parkCode}`}
            onClick={handleBackClick}
          >
            Back to Park Details!
          </Button>
      </Box>
      </CardActions>
    </Card>
  );
};

export default ActivitiesList;



//box version

// const ActivitiesList = ({ park, user }) => {
//   const [checkedActivities, setCheckedActivities] = useState(new Set());
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleCheckboxChange = (evt) => {
//     const { value, checked } = evt.target;
//     const [activityId, activityName] = value.split('|');
//     const activity = { nps_activity_id: activityId, name: activityName };
    
//     setCheckedActivities((prevCheckedActivities) => {
//       const newCheckedActivities = new Set(prevCheckedActivities);
//       if (checked) {
//         newCheckedActivities.add(activity);
//       } else {
//         newCheckedActivities.forEach(act => {
//           if (act.nps_activity_id === activityId) {
//             newCheckedActivities.delete(act);
//           }
//         });
//       }
//       return newCheckedActivities;
//     });
//   };

//   const handleSelectAllChange = (evt) => {
//     const { checked } = evt.target;
//     setCheckedActivities(checked ? new Set(park.activities.map(activity => ({ nps_activity_id: activity.id, name: activity.name }))) : new Set());
//   };

//   const isAllChecked = checkedActivities.size === park.activities.length;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear any previous messages
//     setSuccessMessage('');
//     setErrorMessage('');

//     // Check if any activities are selected
//     if (checkedActivities.size === 0) {
//       setErrorMessage('Please select at least one activity.');
//       setTimeout(() => setErrorMessage(''), 3000);
//       return;
//     }

//     // Convert checkedActivities to an array of activity objects
//     const activities = Array.from(checkedActivities);
//     console.log('Selected activities:', activities);

//     try {
//       const response = await ParkfinderApi.saveActivities(user, park.parkCode, activities);
//       console.log('Activities saved successfully:', response);
//       setSuccessMessage('Activities saved successfully!');
//       setIsSubmitted(true); // Set submission status to true
//       setTimeout(() => setSuccessMessage(''), 3000);
//     } catch (error) {
//       console.error('Error saving activities:', error);
//       setErrorMessage('Failed to save activities. Please try again.');
//       setTimeout(() => setErrorMessage(''), 3000);
//     }
//   };

//   const handleBackClick = () => {
//     setShowActivities(false);
//   };

//   return (
//     <Box sx={{ padding: 2,      
      
//      }}>
//       <Typography variant="h4"
//        gutterBottom>Activities</Typography>
//       <Typography variant="subtitle1" gutterBottom>Select activities to add to your saved items!</Typography>
//       {successMessage && <Typography variant="body2" color="success">{successMessage}</Typography>}
//       {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
//       <form onSubmit={handleSubmit}>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={isAllChecked}
//               onChange={handleSelectAllChange}
//               disabled={isSubmitted}
//             />
//           }
//           label="Select All"
//         />
//         <Grid container spacing={2}>
//           {park.activities.map((activity, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card variant="outlined">
//                 <CardContent>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         value={`${activity.id}|${activity.name}`}
//                         checked={Array.from(checkedActivities).some(act => act.nps_activity_id === activity.id)}
//                         onChange={handleCheckboxChange}
//                         disabled={isSubmitted}
//                       />
//                     }
//                     label={<Typography variant="body1">{activity.name}</Typography>}
//                   />
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ marginTop: 2 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={isSubmitted}
//           >
//             Submit
//           </Button>
//         </Box>
//       </form>
//       <Box sx={{ marginTop: 2 }}>
//         <Button
//           component={Link}
//           to={`/parks/parkCode/${park.parkCode}`}
//           onClick={handleBackClick}
//         >
//           Back to Park Details!
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ActivitiesList;



//orig version

// const ActivitiesList = ({ park, user }) => {
//   const [checkedActivities, setCheckedActivities] = useState(new Set());
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleCheckboxChange = (evt) => {
//     const { value, checked } = evt.target;
//     const [activityId, activityName] = value.split('|');
//     const activity = { nps_activity_id: activityId, name: activityName };
    
//     setCheckedActivities((prevCheckedActivities) => {
//       const newCheckedActivities = new Set(prevCheckedActivities);
//       if (checked) {
//         newCheckedActivities.add(activity);
//       } else {
//         newCheckedActivities.forEach(act => {
//           if (act.nps_activity_id === activityId) {
//             newCheckedActivities.delete(act);
//           }
//         });
//       }
//       return newCheckedActivities;
//     });
//   };

//   const handleSelectAllChange = (evt) => {
//     const { checked } = evt.target;
//     setCheckedActivities(checked ? new Set(park.activities.map(activity => ({ nps_activity_id: activity.id, name: activity.name }))) : new Set());
//   };

//   const isAllChecked = checkedActivities.size === park.activities.length;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear any previous messages
//     setSuccessMessage('');
//     setErrorMessage('');

//     // Check if any activities are selected
//     if (checkedActivities.size === 0) {
//       setErrorMessage('Please select at least one activity.');
//       const errorTiemout = setTimeout(() =>{
//         setErrorMessage('');
//       }, 3000);
//       return;
//     }
// //OLD
//     // Convert checkedActivities to an array of IDs
//     // const nps_activity_ids = Array.from(checkedActivities).map(activity => activity.id);

//     // console.log('Selected activities:', nps_activity_ids);

//     //NEW 7/18
//     // Convert checkedActivities to an array of activity objects
//   const activities = Array.from(checkedActivities);

//   console.log('Selected activities:', activities);


//     try {
//       // const response = await ParkfinderApi.saveActivities(user, park.parkCode, { nps_activity_ids });
//       const response = await ParkfinderApi.saveActivities(user, park.parkCode, activities);
//       console.log('Activities saved successfully:', response);
//       setSuccessMessage('Activities saved successfully!');
//       setIsSubmitted(true); // Set submission status to true
//       const successTimeout = setTimeout(() => {
//         setSuccessMessage('');
//       }, 3000);
//     } catch (error) {
//       console.error('Error saving activities:', error);
//       setErrorMessage('Failed to save activities. Please try again.');
//       const errorTiemout = setTimeout(() =>{
//         setErrorMessage('');
//       }, 3000);
//     }
//   };

//   const handleBackClick = () => {
//     setShowActivities(false);
//   };

//   return (
//     <div className="activities-container">
//       <h2>Activities</h2>
//       <h5>Select activities to add to your saved items!</h5>
//       {successMessage && <p className="success-message">{successMessage}</p>} {/* Conditionally render success message */}
//       {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally render error message */}
//       <form onSubmit={handleSubmit}>
//         <div className="multiselect">
//           <label>
//             <input
//               type="checkbox"
//               checked={isAllChecked}
//               onChange={handleSelectAllChange}
//               className={`check-box ${isSubmitted ? 'submitted' : ''}`}
//               disabled={isSubmitted} // Disable checkbox if submitted
//             />
//             Select All
//           </label>
//           <ul className="park-activities-grid">
//             {park.activities.map((activity, index) => (
//               <li key={index}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value={`${activity.id}|${activity.name}`}
//                     checked={Array.from(checkedActivities).some(act => act.nps_activity_id === activity.id)}
//                     onChange={handleCheckboxChange}
//                     className={`check-box ${isSubmitted ? 'submitted' : ''}`}
//                     disabled={isSubmitted} // Disable checkbox if submitted
//                   />
//                   <strong>{activity.name}</strong>
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <button
//             type="submit"
//             className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
//             disabled={isSubmitted} // Disable button if submitted
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//       <div>
//         <Link className="back" to={`/parks/parkCode/${park.parkCode}`} onClick={handleBackClick}>Back to Park Details!</Link>
//       </div>
//     </div>
//   );
// };

// export default ActivitiesList;



/* Version 6/30 */

// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// // import { useNavigate } from 'react-router-dom';
// import './ActivitiesList.css';
// import ParkfinderApi from '../services/ParkfinderApi';

// const ActivitiesList = ({ park,user}) => {
//   const [checkedActivities, setCheckedActivities] = useState(new Set());
//   // const navigate = useNavigate();
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleCheckboxChange = (evt) => {
//     const { value, checked } = evt.target;
//     setCheckedActivities((prevCheckedActivities) => {
//       const newCheckedActivities = new Set(prevCheckedActivities);
//       if (checked) {
//         newCheckedActivities.add(value);
//       } else {
//         newCheckedActivities.delete(value);
//       }
//       return newCheckedActivities;
//     });
//   };

//   const handleSelectAllChange = (evt) => {
//     const { checked } = evt.target;
//     setCheckedActivities(checked ? new Set(park.activities.map(activity => activity.id)) : new Set());
//   };

//   const isAllChecked = checkedActivities.size === park.activities.length;



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear any previous messages
//     setSuccessMessage('');
//     setErrorMessage('');

//     // Check if any activities are selected
//     if (checkedActivities.size === 0 ) {
//       setErrorMessage('Please select at least one activity.');
//       return;
//     }
  
//     // Convert checkedActivities to an array of IDs
//     const nps_activity_ids = Array.from(checkedActivities);
  
//     console.log('Selected activities:', nps_activity_ids);
    
  
//     try {
//       const response = await ParkfinderApi.saveActivities(user, park.parkCode, { nps_activity_ids });
//       console.log('Activities saved successfully:', response);
//       setSuccessMessage('Activities saved successfully!');
//       setIsSubmitted(true); // Set submission status to true
      
//     } catch (error) {
//       console.error('Error saving activities:', error);
//       setSuccessMessage('Failed to save activities. Please try again.');
//     }
//     // navigate(`/parks/parkCode/${park.parkCode}`);
//   };

//   const handleBackClick = () => {
//     setShowActivities(false);
//   };
  

//   return (
//     <div className="activities-container">
//       <h2>Activities</h2>
//       <h5>Select activities to add to your saved items!</h5>
//       {successMessage && <p className="success-message">{successMessage}</p>} {/* Conditionally render success message */}
//       {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Conditionally render error message */}
//       <form onSubmit={handleSubmit}>
//         <div className="multiselect">
//           <label>
//             <input
//               type="checkbox"
//               checked={isAllChecked}
//               onChange={handleSelectAllChange}
//               className={`check-box ${isSubmitted ? 'submitted' : ''}`}
//               disabled={isSubmitted} // Disable checkbox if submitted
//             />
//             Select All
//           </label>
//           <ul className="park-activities-grid">
//             {park.activities.map((activity, index) => (
//               <li key={index}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value={activity.id}
//                     checked={checkedActivities.has(activity.id)}
//                     onChange={handleCheckboxChange}
//                     className={`check-box ${isSubmitted ? 'submitted' : ''}`}
//                     disabled={isSubmitted} // Disable checkbox if submitted
//                   />
//                   <strong>{activity.name}</strong>
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <button
//                 type="submit"
//                 className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
//                 disabled={isSubmitted} // Disable button if submitted
//               >
//                 Submit
//               </button>
//           {/* <button type="submit" className="submit-button">Submit</button> */}
//         </div>
//       </form>
//       <div>
//       <Link className="back" to={`/parks/parkCode/${park.parkCode}`} onClick={handleBackClick}>Back to Park Details!</Link>
//       </div>
//     </div>
   





//   );
// };

// export default ActivitiesList;




/* NEWEST VERSION */

// import React, { useState, useContext } from 'react';
// import './ActivitiesList.css';
// import ParkfinderApi from '../services/ParkfinderApi';
// import UserContext from '../contexts/UserContext'; // Import the useUser hook

// const ParkActivities = ({ park }) => {
//     const { user } = useContext(UserContext); // Get the user from context  
//   const [formData, setFormData] = useState({
//     checkedActivities: []  });

//     const handleCheckboxChange = (activity) => {
//       setFormData((prevData) => {
//         const { checkedActivities } = prevData;
//         const newCheckedActivities = checkedActivities.find((a) => a.id === activity.id)
//           ? checkedActivities.filter((a) => a.id !== activity.id)
//           : [...checkedActivities, activity];
        
//         return {
//           ...prevData,
//           checkedActivities: newCheckedActivities
//         };
//       });
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       console.log('Selected activities:', formData.checkedActivities);
  
//       // Prepare data for saving, including all necessary fields
//       const data = formData.checkedActivities.map(activity => ({
//         activity_name: activity.name,
//         nps_activity_id: activity.id
//       }));
  
//       try {
//         // Call saveActivities method with necessary parameters
//         const res = await ParkfinderApi.saveActivities(user.username, park.parkCode, data);
//         console.log('Save response:', res);
//       } catch (error) {
//         console.error('Error saving activities:', error);
//       }
//     };
  
//     return (
//       <div className="activities-container">
//         <h2>Activities</h2>
//         {park.activities.length > 0 ? (
//           <form onSubmit={handleSubmit}>
//             <ul className="park-activities-grid">
//               {park.activities.map((activity, index) => (
//                 <li key={index}>
//                   <label>
//                     <input
//                       type="checkbox"
//                       value={activity.id}
//                       onChange={() => handleCheckboxChange(activity)}
//                     />
//                     <strong>{activity.name}</strong>
//                   </label>
//                 </li>
//               ))}
//             </ul>
//             <button type="submit" className="submit-button">Submit</button>
//           </form>
//         ) : (
//           <p>{park.fullName} has no listed activities.</p>
//         )}
//       </div>
//     );
//   };
  
//   export default ParkActivities;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Selected activities:', checkedActivities);

  //   const data = { activities: checkedActivities[0] };

  //   try {
  //     const res = await ParkfinderApi.saveActivities(user.username, park.parkCode, data);
  //     console.log('Save response:', res);
  //   } catch (error) {
  //     console.error('Error saving activities:', error);
  //   }
  // };

//   return (
//     <div className="activities-container">
//       <h2>Activities</h2>
//       {park.activities.length > 0 ? (
//         <form onSubmit={handleSubmit}>
//           <ul className="park-activities-grid">
//             {park.activities.map((activity, index) => (
//               <li key={index}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value={activity.id}
//                     onChange={() => handleCheckboxChange(activity)}
//                   />
//                   <strong>{activity.name}</strong>
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       ) : (
//         <p>{park.fullName} has no listed activities.</p>
//       )}
//     </div>
//   );
// };

// export default ParkActivities;




/* NEWER VERSION */

// import React, { useState, useContext } from 'react';
// import './ActivitiesList.css';
// import ParkfinderApi from '../services/ParkfinderApi';
// import UserContext from '../contexts/UserContext'; // Import the useUser hook

// const ParkActivities = ({ park, parkCode}) => { // Make sure to pass username as a prop
//   const { user } = useContext(UserContext); // Get the user from context
//   const [checkedActivities, setCheckedActivities] = useState([]);

//   const handleCheckboxChange = (activityId) => {
//     setCheckedActivities((prev) =>
//       prev.includes(activityId)
//         ? prev.filter((id) => id !== activityId)
//         : [...prev, activityId]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Selected activities:', checkedActivities);

//     // Prepare data for saving
//     const data = { activities: checkedActivities };

//     try {
//       // Call saveActivities method with necessary parameters
//       const res = await ParkfinderApi.saveActivities(user.username, parkCode,data);
//       console.log('Save response:', res);
//     } catch (error) {
//       console.error('Error saving activities:', error);
//     }
//   };

//   return (
//     <div className="activities-container">
//       <h2>Activities</h2>
//       {park.activities.length > 0 ? (
//         <form onSubmit={handleSubmit}>
//           <ul className="park-activities-grid">
//             {park.activities.map((activity, index) => (
//               <li key={index}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value={activity.id}
//                     onChange={() => handleCheckboxChange(activity.id)}
//                   />
//                   <strong>{activity.name}</strong>
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       ) : (
//         <p>{park.fullName} has no listed activities.</p>
//       )}
//     </div>
//   );
// };

// export default ParkActivities;


/* NEW VERSION */

// import React, { useState } from 'react';
// import './ActivitiesList.css';
// import ParkfinderApi from '../services/ParkfinderApi';

// const ParkActivities = ({ park }) => {
//   const [checkedActivities, setCheckedActivities] = useState([]);

//   const handleCheckboxChange = (activityId) => {
//     setCheckedActivities((prev) =>
//       prev.includes(activityId)
//         ? prev.filter((id) => id !== activityId)
//         : [...prev, activityId]
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Selected activities:', checkedActivities);
//     // Here you can send the selected activities to a server or perform any other actions
//   };

//   return (
//     <div className="activities-container">
//       <h2>Activities</h2>
//       {park.activities.length > 0 ? (
//         <form onSubmit={handleSubmit}>
//           <ul className="park-activities-grid">
//             {park.activities.map((activity, index) => (
//               <li key={index}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value={activity.id}
//                     onChange={() => handleCheckboxChange(activity.id)}
//                   />
//                   <strong>{activity.name}</strong>
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       ) : (
//         <p>{park.fullName} has no listed activities.</p>
//       )}
//     </div>
//   );
// };

// export default ParkActivities;




///MAYBE EASIER TO JUST PUT ACTIVITIES IN A DROP DOWN

//SIMPLE LIST FOR NOW > NICE TO HAVE: (SELECT BOXES NEXT TO EACH ITEM)

/* ORIGINAL VERSION */
// import './ActivitiesList.css'

// const ParkActivities =({ park }) => {
//     return (
//       <div className="activities-container">
//         <h2>Activities</h2>
//         {park.activities.length > 0 ? (
//           <ul className="park-activities-grid">
//             {park.activities.map((activity, index) => (
//               <li key={index}>
//                 {/* <p><strong>id:</strong> ${activity.id}</p> */}
//                 <p><strong>{activity.name} </strong></p>
                
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>{park.fullName} has no listed activities.</p>
//         )}
//       </div>
//     );
//   }
  
//   export default ParkActivities;