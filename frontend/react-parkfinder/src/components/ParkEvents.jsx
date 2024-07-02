import { useEffect, useState } from "react";
import ParkfinderApi from "../services/ParkfinderApi";
import stripHtmlTags from "../helper/stripHtmlTags";

import "./ParkEvents.css";

const ParkEvents = ({ parkCode, park, user }) => {
  const [fetchedParks, setFetchedParks] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);

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
    const eventData = {
      event_id: event.id,
      title: event.title,
      type: event.types,
      description: stripHtmlTags(event.description),
      park_code: parkCode,
     
      // cost: event.cost
      // date: event.selectedDate // Assuming you capture and pass the selected date
    };
  
    try {
      await ParkfinderApi.saveEvents(user, parkCode, eventData);
      console.log("Event saved to database:", eventData);
      setSavedEvents([...savedEvents, event]);
    } catch (err) {
      console.error("Error saving event to database:", err);
    }
  };

  return (
    <div className="park-events">
      <h2>Events</h2>
      {fetchedParks.length > 0 ? (
        <ul>
          {fetchedParks.map((event, index) => (
            <li key={index}>
              <p><strong>Event Title:</strong> {event.title}</p>
              <p><strong>Event Type:</strong> {event.types}</p>
              <p><strong>Description:</strong> {stripHtmlTags(event.description)}</p>
              <p><strong>Dates:</strong></p>
              {Array.isArray(event.dates) && (
                <select>
                  {event.dates.map((date, dateIndex) => (
                    <option key={dateIndex} value={date}>{date}</option>
                  ))}
                </select>
              )}
              <div>
                <button className="submit-button" onClick={() => handleSaveEvent(event)}>Save Event</button>
              </div>
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