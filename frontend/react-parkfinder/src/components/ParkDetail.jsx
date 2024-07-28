import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ParkfinderApi from '../services/ParkfinderApi';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import { Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Button, Box, Stack, FormControlLabel, Switch,Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GetMap from './GetMap';
import ActivitiesList from './ActivitiesList';
import ParkFees from './ParkFees';
import ParkEvents from './ParkEvents';
// import UserContext from '../contexts/UserContext';
import ThingsToDo from './ThingsToDo';
import './ParkDetail.css';


//version with switch component
function ParkDetail({ user }) {
  const { parkCode } = useParams();
  const [park, setPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showThingsToDo, setShowThingsToDo] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = async () => {
    try {
      const favoriteData = {
        park_id: park.id,
        park_description: park.description,
        park_full_name: park.fullName,
        park_image_url: park.images[0].url
      };

      let res = await ParkfinderApi.saveFavorites(user.username, parkCode, favoriteData);
      console.log("Park res:", res);
      navigate(`/users/${user.username}/favorites`, { state: { user, park, parkCode } });
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  useEffect(() => {
    async function fetchParkDetails() {
      try {
        const parkData = await ParkfinderApi.getParksByParkCode(parkCode);
        console.log("Fetched parks data for parkCode:", parkData.park.data[0]);
        setPark(parkData.park.data[0]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchParkDetails();
  }, [parkCode]);

  useEffect(() => {
    if (park) {
      console.log("Park saved in state:", park);
    }
  }, [park]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading park details: {error.message}</p>;

  // Combine the conditions to hide the card
  const shouldShowCard = !(showActivities || showFees || showEvents || showMap || showThingsToDo);

  return (
    <>
    {/* commented out to make page cleaner - 8/1 */}
      {/* <div className="park-detail-headers">
        <h2>{park.fullName}</h2>
        <h5>Click the links below to hide/show details!</h5>
      </div> */}

    {/* adding box for spacing */}
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >

      

      {/* <Stack direction="column" spacing={2}
      > */}
        <Stack direction="row" 
        spacing={2} 
        className="switch-container"
        sx={{
          marginTop: '20px',
        }}
        >
          <FormControlLabel
            control={<Switch checked={showActivities} onChange={() => setShowActivities(!showActivities)} />}
            label="See Activities!"
          />
          <FormControlLabel
            control={<Switch checked={showFees} onChange={() => setShowFees(!showFees)} />}
            label="Fees & Passes!"
          />
          <FormControlLabel
            control={<Switch checked={showEvents} onChange={() => setShowEvents(!showEvents)} />}
            label="See Events!"
          />
          <FormControlLabel
            control={<Switch checked={showMap} onChange={() => setShowMap(!showMap)} />}
            label="Get a map!"
          />
          <FormControlLabel
            control={<Switch checked={showThingsToDo} onChange={() => setShowThingsToDo(!showThingsToDo)} />}
            label="Things to Do!"
          />
        </Stack>

        {/* <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`}>Leave A Review!</Link> */}

{/* ADD Card component instead of div, don't forget save to Favorites link!!!! */}
{/* Conditionally render the Card based on the combined state */}
{shouldShowCard && park && (


<Card  sx={{
            maxWidth: 750, 
            margin: 10 ,
            display: 'flex',
            
            flexDirection: 'column',
            boxShadow: 3,
            marginBottom: 4,
            // '&:hover': {
            //    transform: 'scale(1.05)',
            //    boxShadow: 6,
            //    backgroundColor:'#f0f0f0',
            // },
            }} 
        // <Card  sx={{
        //     maxWidth: 750, // Set the desired width in pixels
        //     margin: 'auto', // Center the card
        //     marginTop: 4,
        //     boxShadow: 3, // Add subtle shadow for depth
        //     borderRadius: 2, // Round the corners
        //              }} 
                     onClick={() => onClick(park.parkCode)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={park.images[0].url}
                    alt={park.fullName}
                    sx={{
                        border: '5px solid #C5E1A5', /* Add border */
                        borderRadius: '5px 5px 0 0', /* Optional: rounded corners */
                        boxSizing:'border-box',
                        
                    }}
                    
                />
                <CardContent>
                    <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div"
                    sx={{
                        color: '#3B403C',
                        fontWeight: '600',
                        // color: '#616161',
                        // fontWeight: 'bold',
                     }} 
                    >
                        {park.fullName} - {park.parkCode}
                    </Typography>
                    {/* <Typography
                    gutterBottom 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                        mb: 3, // Add bottom margin
                        // color: '#33691E',
                        color:'#3B403C',
                        fontWeight: '500',
                        fontSize: '14px',

                    }} 
                    >
                        Park Code: {park.parkCode}
                    </Typography> */}
                    <Typography                      
                    variant="body2" 
                    color="text.secondary" 
                    sx={{     
                        mb: 5, // Add bottom margin                     
                        color: '#616161',
                        textAlign:'left',
                        // fontWeight: 'bold',

                    }}                    
                    >
                        {park.description}
                    </Typography>
                    {/* <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`}>Leave A Review!</Link> */}
                    <Button
  component={Link}
  to={`/users/${user.username}/reviews/${parkCode}`}
  sx={{
    mt: 0,
    marginBottom:'20px',
   
    color: '#558B2F',
    textTransform: 'none',
    textDecoration: 'underline',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  }}
>
  Leave A Review!
</Button>

                </CardContent>
                
            </CardActionArea>
           
        </Card>
)}
            





        {/* <div className="park-description-container">
          <p>{park.description}</p>
          <img src={park.images[0].url} width="400px" alt={park.fullName} />


          <div>
            <Button onClick={handleNavigate}>Save to Favorites!</Button>
          </div>
        </div> */}

        {showMap && <GetMap park={park} user={user.username} parkCode={parkCode} />}
        {showActivities && <ActivitiesList park={park} user={user.username} />}
        {showFees && <ParkFees park={park} user={user.username} />}
        {showEvents && <ParkEvents parkCode={parkCode} park={park} user={user.username} />}
        {showThingsToDo && <ThingsToDo parkCode={parkCode} park={park} user={user.username} />}
      {/* </Stack> */}
      </Box>

     
    </>
  );
}

export default ParkDetail;

//versison with toggle button
// function ParkDetail({ user }) {
//   const { parkCode } = useParams();
//   const [park, setPark] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeComponents, setActiveComponents] = useState([]);

//   const navigate = useNavigate();

//   const handleNavigate = async () => {
//     try {
//       const favoriteData = {
//         park_id: park.id,
//         park_description: park.description,
//         park_full_name: park.fullName,
//         park_image_url: park.images[0].url
//       };

//       let res = await ParkfinderApi.saveFavorites(user.username, parkCode, favoriteData);
//       console.log("Park res:", res);
//       navigate(`/users/${user.username}/favorites`, { state: { user, park, parkCode } });
//     } catch (error) {
//       console.error('Error saving favorite:', error);
//     }
//   };

//   useEffect(() => {
//     async function fetchParkDetails() {
//       try {
//         const parkData = await ParkfinderApi.getParksByParkCode(parkCode);
//         console.log("Fetched parks data for parkCode:", parkData.park.data[0]);
//         setPark(parkData.park.data[0]);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     }

//     fetchParkDetails();
//   }, [parkCode]);

//   useEffect(() => {
//     if (park) {
//       console.log("Park saved in state:", park);
//     }
//   }, [park]);

//   const handleToggle = (event, newActiveComponents) => {
//     setActiveComponents(newActiveComponents);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading park details: {error.message}</p>;

//   return (
//     <>
//       <div className="park-detail-headers">
//         <h2>{park.fullName}</h2>
//         <h5>Click the links below to hide/show details!</h5>
//       </div>

//       <Stack direction="column" spacing={2}>
//         <ToggleButtonGroup
//           value={activeComponents}
//           onChange={handleToggle}
//           aria-label="park details"
//           exclusive={false}
//         >
//           <ToggleButton value="activities" aria-label="activities">
//             See Activities!
//           </ToggleButton>
//           <ToggleButton value="fees" aria-label="fees">
//             Fees & Passes!
//           </ToggleButton>
//           <ToggleButton value="events" aria-label="events">
//             See Events!
//           </ToggleButton>
//           <ToggleButton value="map" aria-label="map">
//             Get a map!
//           </ToggleButton>
//           <ToggleButton value="thingsToDo" aria-label="things to do">
//             Things to Do!
//           </ToggleButton>
//         </ToggleButtonGroup>

//         <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`}>LEAVE A REVIEW!</Link>

//         <div className="park-description-container">
//           <p>{park.description}</p>
//           <img src={park.images[0].url} width="400px" alt={park.fullName} />
//           <div>
//             <Button onClick={handleNavigate}>Save to Favorites!</Button>
//           </div>
//         </div>

//         {activeComponents.includes("map") && <GetMap park={park} user={user.username} parkCode={parkCode} />}
//         {activeComponents.includes("activities") && <ActivitiesList park={park} user={user.username} />}
//         {activeComponents.includes("fees") && <ParkFees park={park} user={user.username} />}
//         {activeComponents.includes("events") && <ParkEvents parkCode={parkCode} park={park} user={user.username} />}
//         {activeComponents.includes("thingsToDo") && <ThingsToDo parkCode={parkCode} park={park} user={user.username} />}
//       </Stack>
//     </>
//   );
// }

// export default ParkDetail;

// function ParkDetail({user}) {
//   const { parkCode } = useParams();
//   const [park, setPark] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showMap, setShowMap] = useState(false);
//   const [showActivities, setShowActivities] = useState(false);
//   const [showFees, setShowFees] = useState(false);
//   const [showEvents, setShowEvents] = useState(false);
//   const [showThingsToDo, setShowThingsToDo] = useState(false);
//   // const { user } = useContext(UserContext); 
//   const navigate = useNavigate();

//   const handleNavigate = async () => {
//     try {
//       const favoriteData = {
//         park_id: park.id,
//         park_description: park.description,
//         park_full_name: park.fullName,
//         park_image_url: park.images[0].url
//       };
  
//       let res = await ParkfinderApi.saveFavorites(user.username, parkCode, favoriteData);
//       console.log("Park res:", res);
//       //orig
//       // navigate(`/users/${user.username}/all-saved-favorites`, { state: { user, park, parkCode } });
//       //new 8/1
//       navigate(`/users/${user.username}/favorites`, { state: { user, park, parkCode } });
//     } catch (error) {
//       console.error('Error saving favorite:', error);
//     }
//   };

//   useEffect(() => {
//     async function fetchParkDetails() {
//       try {
//         const parkData = await ParkfinderApi.getParksByParkCode(parkCode);
//         console.log("Fetched parks data for parkCode:", parkData.park.data[0]);
//         setPark(parkData.park.data[0]);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     }

//     fetchParkDetails();
//   }, [parkCode]);

//   useEffect(() => {
//     if (park) {
//       console.log("Park saved in state:", park);
//     }
//   }, [park]);

//   const handleButtonClick = (setShowFunction) => {
//     setShowFunction(cur => !cur);
//   };

//   // const hideActivitiesList = () => {
//   //   setShowActivities(false);
//   // };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading park details: {error.message}</p>;

//   return (
//     <>
//      <div className="park-detail-headers">
//         <h2>{park.fullName}</h2>
//         <h5>Click the links below to hide/show details!</h5>
//         </div>

//       <Stack direction="column" spacing={2}>        
//         <Stack direction="row" spacing={2} className="button-container">
//           <Button onClick={() => handleButtonClick(setShowActivities)}>See Activities!</Button>
//           <Button onClick={() => handleButtonClick(setShowFees)}>Fees & Passes!</Button>
//           <Button onClick={() => handleButtonClick(setShowEvents)}>See Events!</Button>
//           <Button onClick={() => handleButtonClick(setShowMap)}>Get a map!</Button>
//           <Button onClick={() => handleButtonClick(setShowThingsToDo)}>Things to Do!</Button>
//           <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`}>LEAVE A REVIEW!</Link>
//         </Stack>
//         <div className="park-description-container">
//           <p>{park.description}</p>
//           <img src={park.images[0].url} width="400px" alt={park.fullName} />
//           <div>
//             <Button onClick={handleNavigate}>Save to Favorites!</Button>
//           </div>
//         </div>
//         {showMap && <GetMap park={park} user={user.username} parkCode={parkCode} />}
//         {showActivities && <ActivitiesList park={park} user={user.username}  />}
//         {showFees && <ParkFees park={park} user={user.username} />}
//         {showEvents && <ParkEvents parkCode={parkCode} park={park} user={user.username} />}
//         {showThingsToDo && <ThingsToDo parkCode={parkCode} park={park} user={user.username} />}
//       </Stack>
//     </>
//   );
// }

// export default ParkDetail;


//Mostly working 7/6

// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ParkfinderApi from '../services/ParkfinderApi';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import { Link } from "react-router-dom";
// import GetMap from './GetMap';
// import ActivitiesList from './ActivitiesList';
// import ParkFees from './ParkFees';
// import ParkEvents from './ParkEvents';
// import UserContext from '../contexts/UserContext';
// import ThingsToDo from './ThingsToDo';
// import './ParkDetail.css';

// function ParkDetail() {
//   const { parkCode } = useParams();
//   const [park, setPark] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showMap, setShowMap] = useState(false);
//   const [showActivities, setShowActivities] = useState(false);
//   const [showFees, setShowFees] = useState(false);
//   const [showEvents, setShowEvents] = useState(false);
//   const [showThingsToDo, setShowThingsToDo] = useState(false);
//   const { user } = useContext(UserContext); 
//   const navigate = useNavigate();

//   //updated version 7/5
//   const handleNavigate = async () => {
//     try {
//       const favoriteData = {
//         park_id: park.id,
//         park_description: park.description,
//         park_full_name: park.fullName,
//         park_image_url: park.images[0].url
//       };
  
//       let res = await ParkfinderApi.saveFavorites(user.username, parkCode, favoriteData);
//       console.log("Park res:", res);
//       navigate(`/users/${user.username}/all-saved-favorites`, { state: { user, park, parkCode } });
//     } catch (error) {
//       console.error('Error saving favorite:', error);
//     }
//   };

//   // const handleNavigate = async () => {
//   //   try {
//   //     let res = await ParkfinderApi.saveFavorites(user.username, parkCode, park.id);
//   //     console.log("Park res:", res);
//   //     navigate(`/users/${user.username}/all-saved-favorites`, { state: { user, park, parkCode } });
//   //   } catch (error) {
//   //     console.error('Error saving favorite:', error);
//   //   }
//   // };

//   useEffect(() => {
//     async function fetchParkDetails() {
//       try {
//         const parkData = await ParkfinderApi.getParksByParkCode(parkCode);
//         console.log("Fetched parks data for parkCode:", parkData.park.data[0]);
//         setPark(parkData.park.data[0]);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     }

//     fetchParkDetails();
//   }, [parkCode]);

//   useEffect(() => {
//     if (park) {
//       console.log("Park saved in state:", park);
//     }
//   }, [park]);

//   const handleButtonClick = (setShowFunction) => {
//     setShowFunction(cur => !cur);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading park details: {error.message}</p>;

//   return (
//     <>
//       <Stack direction="column" spacing={2}>
//         <h2>{park.fullName}</h2>
//         <Stack direction="row" spacing={2} className="button-container">
//           <Button onClick={() => handleButtonClick(setShowActivities)}>See Activities!</Button>
//           <Button onClick={() => handleButtonClick(setShowFees)}>Fees & Passes!</Button>
//           <Button onClick={() => handleButtonClick(setShowEvents)}>See Events!</Button>
//           <Button onClick={() => handleButtonClick(setShowMap)}>Get a map!</Button>
//           <Button onClick={() => handleButtonClick(setShowThingsToDo)}>Things to Do!</Button>
//           <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`}>Leave a Review!</Link>
//         </Stack>
//         <div className="park-description-container">
//           <p>{park.description}</p>
//           <img src={park.images[0].url} width="400px" alt={park.fullName} />
//           <div>
//             <Button onClick={handleNavigate}>Save to Favorites!</Button>
//           </div>
//         </div>
//         {showMap && <GetMap park={park} user={user.username} parkCode={parkCode} />}
//         {showActivities && <ActivitiesList park={park} user={user.username} />}
//         {showFees && <ParkFees park={park} user={user.username} />}
//         {showEvents && <ParkEvents parkCode={parkCode} park={park} user={user.username} />}
//         {showThingsToDo && <ThingsToDo parkCode={parkCode} park={park} user={user.username} />}
//       </Stack>
//     </>
//   );
// }

// export default ParkDetail;




//MOSTLY WORKING
// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ParkfinderApi from '../services/ParkfinderApi';
// import Button from '@mui/material/Button';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Stack from '@mui/material/Stack'
// import {Link}  from "react-router-dom"
// import GetMap from './GetMap';
// import ActivitiesList from './ActivitiesList';
// import ParkFees from './ParkFees';
// import ParkEvents from './ParkEvents';
// import UserContext from '../contexts/UserContext';
// import ThingsToDo from './ThingsToDo';
// import FormTextArea from './FormTextArea';
// import './ParkDetail.css'
// import FavoritedParks from './FavoritedParks';


// function ParkDetail() {
//   const { parkCode } = useParams();
//   const [park, setPark] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showMap, setShowMap] = useState(false);
//   const [showActivities, setShowActivities] = useState(false);
//   const [showFees, setShowFees] = useState(false);
//   const [showEvents, setShowEvents] = useState(false);
//   const [showThingsToDo, setShowThingsToDo] = useState(false);
//   // const [isParkFavorited, setIsParkFavorited] = useState(false); // New state variable
//   // const [showDescription, setShowDescription] = useState(true);
//   const { user } = useContext(UserContext); 
//   const navigate = useNavigate(); // Initializing useNavigate

//   // const handleNavigate = () => {
//   //   navigate(`/users/${user.username}/all-saved-favorites`, { state: { park, parkCode } });
//   // };

//   const handleNavigate = async () => {
//     try {
//       let res =await ParkfinderApi.saveFavorites(user.username, parkCode, park.id);
//       console.log("Park res:", res)
//       // setIsParkFavorited(true); // Update state variable
//       navigate(`/users/${user.username}/all-saved-favorites`, { state: { park, parkCode } });
//       // navigate(`/users/${user.username}/all-saved-favorites`);
//     } catch (error) {
//       console.error('Error saving favorite:', error);
//     }
//   };

//   useEffect(() => {
//     async function fetchParkDetails() {
//       try {
//         const parkData = await ParkfinderApi.getParksByParkCode(parkCode);
//         console.log("Fetched parks data for parkCode:", parkData.park.data[0]);
//         setPark(parkData.park.data[0]);         
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     }

//     fetchParkDetails();
//   }, [parkCode]);

//   useEffect(() => {
//     if (park) {
//       console.log("Park saved in state:", park);
//     }
//   }, [park]);

//   const handleButtonClick = (setShowFunction) =>{
//     // setShowDescription(false);
//     setShowFunction(cur => ! cur)
//   }

//   const handleGetMapClick = () => {
//     setShowMap(cur =>!cur);
//   };

//   const handleGetActivitiesClick = () => {
//     setShowActivities(cur =>!cur);
//   };

//   const handleGetFeesClick = () => {
//     setShowFees(cur =>!cur);
//   };

//   const handleGetEventsClick = () => {
//     setShowEvents(cur =>!cur);
//   };
//   const handleGetThingsToDoClick = () => {
//     setShowThingsToDo(cur =>!cur);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading park details: {error.message}</p>;

//   return (
//     <>
//     <Stack direction="column" spacing={2}>
//       {/* <Stack direction="column" spacing={2} sx={{ border: '1px solid red', padding: '10px' }}> */}
//         <h2>{park.fullName}</h2>
//         <Stack direction="row" spacing={2} className="button-container">
//           <Button  onClick={() => handleButtonClick(setShowActivities)}>See Activities!</Button>
//           <Button  onClick={() => handleButtonClick(setShowFees)}>Fees & Passes!</Button>
//           <Button  onClick={() => handleButtonClick(setShowEvents)}>See Events!</Button>
//           <Button  onClick={() => handleButtonClick(setShowMap)}>Get a map!</Button>
//           <Button  onClick={() => handleButtonClick(setShowThingsToDo)}>Things to Do!</Button>
//           {/* <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`} onClick={() => setShowDescription(false)} >Leave a Review!</Link> */}
//           <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`} >Leave a Review!</Link>
//         </Stack>
//         {/* {showDescription && ( */}
//           <div className="park-description-container">
//           {/* <div className="park-description-container" style={{ border: '1px solid white', padding: '10px' }}> */}
//             <p>{park.description}</p>
//             <img src={park.images[0].url} width="400px" alt={park.fullName} />
//             <div>
            
//               <Button onClick={() => handleNavigate(parkCode, park[0], user.username)}>Save to Favorites!</Button>
            
//             {/* <Link to={`/users/${user.username}/all-saved-favorites`}>
//               <Button>Save to Favorites!</Button>
//             </Link> */}
//           </div>
//           </div>
//         {/* )} */}
//         {showMap && <GetMap park={park} user={user.username} parkCode={parkCode}/>}
//         {showActivities && <ActivitiesList park={park} user={user.username}  />}
//         {showFees && <ParkFees park={park} user={user.username}  />}
//         {showEvents && <ParkEvents parkCode={parkCode} park={park} user={user.username}  />}
//         {showThingsToDo && <ThingsToDo parkCode={parkCode} park={park} user={user.username}  />}
//       </Stack>
    
//      {/* Conditionally render FavoritedParks component
//      {isParkFavorited && <FavoritedParks user={user} park={park} parkCode={parkCode} />} */}
//     </>
//   );
// }

// export default ParkDetail;
   


//OPTION WITH TABS:

// function ParkDetail() {
//   const { parkCode } = useParams();
//   const [park, setPark] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [tabIndex, setTabIndex] = useState(0);
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     async function fetchParkDetails() {
//       try {
//         const parkData = await ParkfinderApi.getParksByParkCode(parkCode);
//         console.log('Fetched parks data for parkCode:', parkData.park.data);
//         setPark(parkData.park.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     }

//     fetchParkDetails();
//   }, [parkCode]);

//   const handleTabChange = (tabIndex) => {
//     switch (tabIndex) {
//       case 0:
//         setShowActivities((prev) => !prev);
//         break;
//       case 1:
//         setShowFees((prev) => !prev);
//         break;
//       case 2:
//         setShowEvents((prev) => !prev);
//         break;
//       case 3:
//         setShowMap((prev) => !prev);
//         break;
//       case 4:
//         setShowThingsToDo((prev) => !prev);
//         break;
//       default:
//         break;
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading park details: {error.message}</p>;

//   return (
//     <>
  
//       <div>
//         <h1>Park Detail</h1>
//         <h2>{park[0].fullName}</h2>
//         <h3>{park[0].designation}</h3>
//         <h3>Park Code: {parkCode}</h3>
//         <p>{park[0].description}</p>
//         <p>{park[0].latitude}</p>
//         <p>{park[0].longitude}</p>
//         <p>{park[0].latLong}</p>
//       </div>

//       <Tabs>
//         <Tab label="Activities" onClick={() => handleTabChange(0)} />
//         <Tab label="Fees & Passes" onClick={() => handleTabChange(1)} />
//         <Tab label="Events" onClick={() => handleTabChange(2)} />
//         <Tab label="Map" onClick={() => handleTabChange(3)} />
//         <Tab label="Things to Do" onClick={() => handleTabChange(4)} />
//       </Tabs>

//       <div>
//         {showActivities && <ActivitiesList park={park[0]} />}
//         {showFees && <ParkFees park={park[0]} />}
//         {showEvents && <ParkEvents parkCode={parkCode} park={park[0]} />}
//         {showMap && <GetMap park={park[0]} />}
//         {showThingsToDo && <ThingsToDo parkCode={parkCode} park={park[0]} />}
//       </div>

//       <div>
//         <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`}>
//           Leave a Review!
//         </Link>
//       </div>
//     </>
//   );
// }

// export default ParkDetail;
