import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ParkfinderApi from '../services/ParkfinderApi';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack'
import {Link}  from "react-router-dom"
import GetMap from './GetMap';
import ActivitiesList from './ActivitiesList';
import ParkFees from './ParkFees';
import ParkEvents from './ParkEvents';
import UserContext from '../contexts/UserContext';
import ThingsToDo from './ThingsToDo';
import FormTextArea from './FormTextArea';
import './ParkDetail.css'



function ParkDetail() {
  const { parkCode } = useParams();
  const [park, setPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showThingsToDo, setShowThingsToDo] = useState(false);
  // const [showDescription, setShowDescription] = useState(true);
  const { user } = useContext(UserContext); 

  useEffect(() => {
    async function fetchParkDetails() {
      try {
        const parkData = await ParkfinderApi.getParksByParkCode(parkCode);
        console.log("Fetched parks data for parkCode:", parkData.park.data);
        setPark(parkData.park.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchParkDetails();
  }, [parkCode]);

  const handleButtonClick = (setShowFunction) =>{
    // setShowDescription(false);
    setShowFunction(cur => ! cur)
  }

  const handleGetMapClick = () => {
    setShowMap(cur =>!cur);
  };

  const handleGetActivitiesClick = () => {
    setShowActivities(cur =>!cur);
  };

  const handleGetFeesClick = () => {
    setShowFees(cur =>!cur);
  };

  const handleGetEventsClick = () => {
    setShowEvents(cur =>!cur);
  };
  const handleGetThingsToDoClick = () => {
    setShowThingsToDo(cur =>!cur);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading park details: {error.message}</p>;

  return (
    <>
    <Stack direction="column" spacing={2}>
      {/* <Stack direction="column" spacing={2} sx={{ border: '1px solid red', padding: '10px' }}> */}
        <h2>{park[0].fullName}</h2>
        <Stack direction="row" spacing={2} className="button-container">
          <Button  onClick={() => handleButtonClick(setShowActivities)}>See Activities!</Button>
          <Button  onClick={() => handleButtonClick(setShowFees)}>Fees & Passes!</Button>
          <Button  onClick={() => handleButtonClick(setShowEvents)}>See Events!</Button>
          <Button  onClick={() => handleButtonClick(setShowMap)}>Get a map!</Button>
          <Button  onClick={() => handleButtonClick(setShowThingsToDo)}>Things to Do!</Button>
          <Link className="review" to={`/users/${user.username}/reviews/${parkCode}`} onClick={() => setShowDescription(false)} >Leave a Review!</Link>
        </Stack>
        {/* {showDescription && ( */}
          <div className="park-description-container">
          {/* <div className="park-description-container" style={{ border: '1px solid white', padding: '10px' }}> */}
            <p>{park[0].description}</p>
            <img src={park[0].images[0].url} width="400px" alt={park.fullName} />
            <div>
            <Button>Save to Favorites!</Button>
            </div>
          </div>
        {/* )} */}
        {showMap && <GetMap park={park[0]} />}
        {showActivities && <ActivitiesList park={park[0]} user={user.username}  />}
        {showFees && <ParkFees park={park[0]} user={user.username}  />}
        {showEvents && <ParkEvents parkCode={parkCode} park={park[0]} user={user.username}  />}
        {showThingsToDo && <ThingsToDo parkCode={parkCode} park={park[0]} user={user.username}  />}
      </Stack>
    </>
  );
}

export default ParkDetail;
   


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
