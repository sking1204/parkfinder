import { useEffect, useState } from "react";
import { Card, CardContent,Typography,  Grid, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import ParkfinderApi from "../services/ParkfinderApi";
import stripHtmlTags from "../helper/stripHtmlTags";

import "./ParkEvents.css";

const ParkEvents = ({ parkCode, park, user }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchedParks, setFetchedParks] = useState([]);    
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEvents, setSubmittedEvents] = useState({}); // Track submission status for each event
  const [selectedDates, setSelectedDates] = useState({});


  useEffect(() => {
    async function fetchEventsByParkCode() {
      try {
        const fetchedParks = await ParkfinderApi.getEventsByParkCode(park.parkCode);
        console.log("Fetched Events By Park Code:", fetchedParks.eventsRes.data);
        setFetchedParks(fetchedParks.eventsRes.data);
        setLoading(false);
      } catch (err) {
        setError(err)
        console.error("Error fetching parks:", err);
        setLoading(false);
        
      }
    }

    fetchEventsByParkCode();
  }, [parkCode]);

 

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6" style={{ marginBottom: '20px' }}>Loading...</Typography>
        <CircularProgress />
        
      </div>
    );
  }

  if (error) {
    return <p>Error loading park details: {error.message}</p>;
  }

 
  const handleSaveEvent = async (event) => {

        // Clear any previous messages
        setSuccessMessage('');
        setErrorMessage('');

    // Check if a date is selected
    if (!selectedDates[event.id]) {
      setErrorMessage('Please select a date!');
      setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 2 seconds
      return;
    }

    const eventData = {
      event_id: event.id,
      title: event.title,
      type: event.types,
      description: stripHtmlTags(event.description),
      park_code: parkCode,
      date: selectedDates[event.id] // Adding selected date to eventData      
      
    };
  
    try {
      await ParkfinderApi.saveEvents(user, parkCode, eventData);
      console.log("Event saved to database:", eventData);
      setSuccessMessage('Event successfully saved!');
      setSubmittedEvents({ ...submittedEvents, [event.id]: true });       
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds       
    
    } catch (err) {
      console.error("Error saving event to database:", err);
      setErrorMessage('Failed to save event. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000); // Clear success message after 3 seconds
    }


  };

  const handleDateChange = (event, eventId) => {
    setSelectedDates({
      ...selectedDates,
      [eventId]: event.target.value
    });
  };


  return (
    <Card sx={{ padding: 2,
     margin: 2,
     backgroundColor: '#DCEDC8',
     width: '1216px',
   

       }}>
      <CardContent>
        <Typography 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: '25px',
            color: '#3B403C',
          }}
        >
          Events
        </Typography>
       
        <Typography variant="subtitle1" marginBottom="20px">
          Select events to add to your saved items!
        </Typography>

        {successMessage && <Typography className="success-message" marginBottom="20px">{successMessage}</Typography>}
        {errorMessage && <Typography className="error-message" marginBottom="20px">{errorMessage}</Typography>}
        
        {fetchedParks.length > 0 ? ( 
          <Grid container spacing={2} sx={{ justifyContent: fetchedParks.length > 0 && fetchedParks.length < 4 ? 'center' : 'flex-start' }}>
            {fetchedParks.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent
                  sx={{
                    height: '400px', 
                    overflow: 'auto', 
                  }}
                  >
                    <Typography variant="h5" component="div" sx={{ textAlign: 'left' }}>
                      Event Title: {event.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
                      Event Type: {event.types}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
                      Description: {stripHtmlTags(event.description)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '10px', fontSize: '12px' }}>
                      Dates:
                    </Typography>
                    {Array.isArray(event.dates) && (
                      <Select
                        onChange={(e) => handleDateChange(e, event.id)}
                        displayEmpty
                        defaultValue=""
                        sx={{ marginTop: '5px', width: '100%' }}
                      >
                        <MenuItem value="">Select a date</MenuItem>
                        {event.dates.map((date, dateIndex) => (
                          <MenuItem key={dateIndex} value={date}>{date}</MenuItem>
                        ))}
                      </Select>
                    )}
               
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: '10px' }}
                      disabled={submittedEvents[event.id]}
                      onClick={() => handleSaveEvent(event)}
                    >
                      Save Event
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card variant="outlined" sx={{ marginTop: 2 }}>
            <CardContent>           
          <Typography >
            {park.fullName} has no listed events.
          </Typography>
          </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ParkEvents;




//OLD CODE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  //grid for cards

//  return (
//     <div className="park-events">
//       <Typography variant="h4" component="div" gutterBottom>
//         Events
//       </Typography>
//       <Typography variant="h6" component="div" gutterBottom>
//         Select event to add to your saved items!
//       </Typography>

//       {fetchedParks.length > 0 ? (
//         <Grid container spacing={3}>
//           {fetchedParks.map((event, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="h5" component="div" sx={{ textAlign: 'left' }}>
//                     Event Title: {event.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
//                     Event Type: {event.types}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
//                     Description: {stripHtmlTags(event.description)}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '10px', fontSize: '12px' }}>
//                     Dates:
//                   </Typography>
//                   {Array.isArray(event.dates) && (
//                     <Select
//                       onChange={(e) => handleDateChange(e, event.id)}
//                       displayEmpty
//                       defaultValue=""
//                       sx={{ marginTop: '5px', width: '100%' }}
//                     >
//                       <MenuItem value="">Select a date</MenuItem>
//                       {event.dates.map((date, dateIndex) => (
//                         <MenuItem key={dateIndex} value={date}>{date}</MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                   {submittedEvents[event.id] && submittedEvents[event.id].message && (
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         marginTop: '10px',
//                         color: submittedEvents[event.id].status ? 'green' : 'red'
//                       }}
//                     >
//                       {submittedEvents[event.id].message}
//                     </Typography>
//                   )}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ marginTop: '10px' }}
//                     disabled={submittedEvents[event.id]}
//                     onClick={() => handleSaveEvent(event)}
//                   >
//                     Save Event
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography variant="body2" color="textSecondary">
//           {park.fullName} has no listed events.
//         </Typography>
//       )}
//     </div>
//   );
// }

// export default ParkEvents;


  //updated 8/2

//   return (
//     <div className="park-events">
//       <Typography variant="h4" component="div" gutterBottom>
//         Events
//       </Typography>
//       <Typography variant="h6" component="div" gutterBottom>
//         Select event to add to your saved items!
//       </Typography>

//       {fetchedParks.length > 0 ? (
//         <ul style={{ listStyleType: 'none', padding: 0 }}>
//           {fetchedParks.map((event, index) => (
//             <li key={index} style={{ marginBottom: '20px' }}>
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="h5" component="div" sx={{ textAlign: 'left' }}>
//                     Event Title: {event.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
//                     Event Type: {event.types}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
//                     Description: {stripHtmlTags(event.description)}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '10px', fontSize: '12px' }}>
//                     Dates:
//                   </Typography>
//                   {Array.isArray(event.dates) && (
//                     <Select
//                       onChange={(e) => handleDateChange(e, event.id)}
//                       displayEmpty
//                       defaultValue=""
//                       sx={{ marginTop: '5px', width: '100%' }}
//                     >
//                       <MenuItem value="">Select a date</MenuItem>
//                       {event.dates.map((date, dateIndex) => (
//                         <MenuItem key={dateIndex} value={date}>{date}</MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                   {submittedEvents[event.id] && submittedEvents[event.id].message && (
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         marginTop: '10px',
//                         color: submittedEvents[event.id].status ? 'green' : 'red'
//                       }}
//                     >
//                       {submittedEvents[event.id].message}
//                     </Typography>
//                   )}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ marginTop: '10px' }}
//                     disabled={submittedEvents[event.id]}
//                     onClick={() => handleSaveEvent(event)}
//                   >
//                     Save Event
//                   </Button>
//                 </CardContent>
//               </Card>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <Typography variant="body2" color="textSecondary">
//           {park.fullName} has no listed events.
//         </Typography>
//       )}
//     </div>
//   );
// }

// export default ParkEvents;



  //orig

//   return (
//     <div className="park-events">
//       <h2>Events</h2>
//       <h5>Select event to add to your saved items!</h5>
      
//       {fetchedParks.length > 0 ? (
//         <ul>
          
//           {fetchedParks.map((event, index) => (
//             <li key={index} className="event-card">
//               <div className="park-event-container">
//               <p><strong>Event Title:</strong> {event.title}</p>
//               <p><strong>Event Type:</strong> {event.types}</p>
//               <p><strong>Description:</strong> {stripHtmlTags(event.description)}</p>
//               <p><strong>Dates:</strong></p>
              
//               {Array.isArray(event.dates) && (
//                 <select onChange={(e) => handleDateChange(e, event.id)}>
//                   <option value="">Select a date</option>
//                   {event.dates.map((date, dateIndex) => (
//                     <option key={dateIndex} value={date}>{date}</option>
//                   ))}
//                 </select>
                
//               )}

//               {submittedEvents[event.id] && submittedEvents[event.id].message && (
//                 <div className={`message ${submittedEvents[event.id].status ? 'success-message' : 'error-message'}`}>
//                   {submittedEvents[event.id].message}
//                 </div>
//               )}
//               {/* {Array.isArray(event.dates) && (
//                 <select onChange={(e) => handleDateChange(e, event.id)}>
//                   {event.dates.map((date, dateIndex) => (
//                     <option key={dateIndex} value={date}>{date}</option>
//                   ))}
//                 </select>
//               )} */}
//               <div>
//                 <button className={`submit-button ${submittedEvents[event.id] ? 'submitted' : ''}`} 
//                 disabled={submittedEvents[event.id]} 
//                 onClick={() => handleSaveEvent(event)} >Save Event</button>
//               </div>
//               {/* {successMessage && <div className="success-message">{successMessage}</div>}
//                 {errorMessage && <div className="error-message">{errorMessage}</div>} */}
//                 </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>{park.fullName} has no listed events.</p>
//       )}
//     </div>
//   );
// }

// export default ParkEvents;



// import { useEffect, useState } from "react";
// import ParkfinderApi from "../services/ParkfinderApi";
// import stripHtmlTags from "../helper/stripHtmlTags";
// import SavedEvents from "./SavedEvents";
// import "./ParkEvents.css";



// const ParkEvents =({ parkCode, park }) => {

//   const[fetchedParks, setFetchedParks] = useState([]);
//   const[savedEvents, setSavedEvents] = useState([]);

//     useEffect(() => {
//         async function fetchEventsByParkCode() {
//             try{
//             const fetchedParks = await ParkfinderApi.getEventsByParkCode(parkCode);
//             console.log("Fetched Parks By State:", fetchedParks.eventsRes.data)
//             setFetchedParks(fetchedParks.eventsRes.data);
//         } catch (err){
//             console.error("Error fetching parks: err");
//         }
//         }
      
//         fetchEventsByParkCode();
        
//       }, [parkCode]);

//       const handleSaveEvent = (event) => {
//         setSavedEvents([...savedEvents, event]);
//         console.log("Event saved:", event);
//         // You can add additional logic to persist the saved events if needed
//       };

//       //maybe add button to save event

//       return (
//         <div className="park-events">
//           <h2>Events</h2>
//           {fetchedParks.length > 0 ? (             
//             <ul>
//               {fetchedParks.map((event, index) => (
                
//                 <li key={index}>
//                   <p><strong>Event Title:</strong> {event.title}</p>
//                   <p><strong>Event Type:</strong> {event.types}</p>
//                   <p><strong>Description:</strong> {stripHtmlTags(event.description)}</p>
//                   <p><strong>Dates:</strong></p>
//                   {/* {console.log(`Type of event.dates for event ${index}:`, Array.isArray(event.dates) ? 'array' : typeof event.dates)} */}
//                   {Array.isArray(event.dates) && (
//                     <select>
//                       {event.dates.map((date, dateIndex) => (
//                         <option key={dateIndex} value={date}>{date}</option>
//                       ))}
//                     </select>
//                   )}
//                   <div>
//                   <button className="submit-button" onClick={() => handleSaveEvent(event)}>Save Event</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>      
                     
//           ) : (
//             <p>{park.fullName} has no listed events.</p>
//           )}

//           {/* <SavedEvents savedEvents={savedEvents} /> */}


//         </div>
//       );
//     }
    
//     export default ParkEvents;