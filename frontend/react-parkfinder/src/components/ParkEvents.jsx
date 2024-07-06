import { useEffect, useState } from "react";
import ParkfinderApi from "../services/ParkfinderApi";
import stripHtmlTags from "../helper/stripHtmlTags";

import "./ParkEvents.css";

const ParkEvents = ({ parkCode, park, user }) => {
  const [fetchedParks, setFetchedParks] = useState([]);
  // const [savedEvents, setSavedEvents] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEvents, setSubmittedEvents] = useState({}); // Track submission status for each event
  const [selectedDates, setSelectedDates] = useState({});


  useEffect(() => {
    async function fetchEventsByParkCode() {
      try {
        const fetchedParks = await ParkfinderApi.getEventsByParkCode(parkCode);
        console.log("Fetched Events By Park Code:", fetchedParks.eventsRes.data);
        setFetchedParks(fetchedParks.eventsRes.data);
      } catch (err) {
        console.error("Error fetching parks:", err);
      }
    }

    fetchEventsByParkCode();
  }, [parkCode]);

  // const handleSaveEvent = async (event) => {
  //   setSavedEvents([...savedEvents, event]);
  //   console.log("Event saved:", event);

  //   try {
  //     await ParkfinderApi.saveEvents(username, parkCode, { event_ids});
  //     console.log("Event saved to database:", event);
  //   } catch (err) {
  //     console.error("Error saving event to database:", err);
  //   }
  // };
  const handleSaveEvent = async (event) => {

        // Clear any previous messages
        setSuccessMessage('');
        setErrorMessage('');

    const eventData = {
      event_id: event.id,
      title: event.title,
      type: event.types,
      description: stripHtmlTags(event.description),
      park_code: parkCode,
      date: selectedDates[event.id] // Adding selected date to eventData      
      // cost: event.cost
      // date: event.selectedDate // **Nice to have...need to find a way to capture and pass the selected date 
    };
  
    try {
      await ParkfinderApi.saveEvents(user, parkCode, eventData);
      console.log("Event saved to database:", eventData);
      // setSuccessMessage('Event successfully saved!');
      // setSubmittedEvents({ ...submittedEvents, [event.id]: true });
      // setSavedEvents([...savedEvents, event]);
      // setTimeout(() => setSuccessMessage(''), 2000); // Clear success message after 3 seconds
      setSubmittedEvents({
        ...submittedEvents,
        [event.id]: { status: true, message: 'Event successfuly saved!' }
      });
      setTimeout(() => setSubmittedEvents((prev) => ({
        ...prev,
        [event.id]: { ...prev[event.id], message: '' }
      })), 2000); // Clear error message after 2 seconds
    
    } catch (err) {
      console.error("Error saving event to database:", err);
      setErrorMessage('Failed to save event. Please try again.');
      setTimeout(() => setSuccessMessage(''), 2000); // Clear success message after 3 seconds
    }


  };

  const handleDateChange = (event, eventId) => {
    setSelectedDates({
      ...selectedDates,
      [eventId]: event.target.value
    });
  };

  return (
    <div className="park-events">
      <h2>Events</h2>
      <h5>Select event to add to your saved items!</h5>
      
      {fetchedParks.length > 0 ? (
        <ul>
          
          {fetchedParks.map((event, index) => (
            <li key={index} className="event-card">
              <p><strong>Event Title:</strong> {event.title}</p>
              <p><strong>Event Type:</strong> {event.types}</p>
              <p><strong>Description:</strong> {stripHtmlTags(event.description)}</p>
              <p><strong>Dates:</strong></p>
              {Array.isArray(event.dates) && (
                <select onChange={(e) => handleDateChange(e, event.id)}>
                  <option value="">Select a date</option>
                  {event.dates.map((date, dateIndex) => (
                    <option key={dateIndex} value={date}>{date}</option>
                  ))}
                </select>
                
              )}

              {submittedEvents[event.id] && submittedEvents[event.id].message && (
                <div className={`message ${submittedEvents[event.id].status ? 'success-message' : 'error-message'}`}>
                  {submittedEvents[event.id].message}
                </div>
              )}
              {/* {Array.isArray(event.dates) && (
                <select onChange={(e) => handleDateChange(e, event.id)}>
                  {event.dates.map((date, dateIndex) => (
                    <option key={dateIndex} value={date}>{date}</option>
                  ))}
                </select>
              )} */}
              <div>
                <button className={`submit-button ${submittedEvents[event.id] ? 'submitted' : ''}`} 
                disabled={submittedEvents[event.id]} 
                onClick={() => handleSaveEvent(event)} >Save Event</button>
              </div>
              {/* {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>} */}
            </li>
          ))}
        </ul>
      ) : (
        <p>{park.fullName} has no listed events.</p>
      )}
    </div>
  );
}

export default ParkEvents;



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