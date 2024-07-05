
import React, { useEffect, useState } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';

const SavedEvents = ({ user, parkCode }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        if (user) {
          const userEvents = await ParkfinderApi.getSavedEvents(user.username);
          const filteredEvents = userEvents.filter(event => event.parkCode === parkCode);
          setEvents(filteredEvents);
        }
      } catch (error) {
        console.error("Error fetching saved events:", error);
      }
    };

    fetchSavedEvents();
  }, [user, parkCode]);

  return (
    <div>
      <h3>Saved Events</h3>
      {events.length === 0 ? (
        <p>No events saved for this park.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedEvents;




// import stripHtmlTags from "../helper/stripHtmlTags";

// const SavedEvents = ({ savedEvents }) => {
//   return (
//     <div className="saved-events">
//       <h2>Saved Events</h2>
//       {savedEvents.length > 0 ? (
//         <ul>
//           {savedEvents.map((event, index) => (
//             <li key={index}>
//               <p><strong>Event Title:</strong> {event.title}</p>
//               <p><strong>Event Type:</strong> {event.types}</p>
//               <p><strong>Description:</strong> {stripHtmlTags(event.description)}</p>
//               <p><strong>Dates:</strong></p>
//               {Array.isArray(event.dates) && (
//                 <select>
//                   {event.dates.map((date, dateIndex) => (
//                     <option key={dateIndex} value={date}>{date}</option>
//                   ))}
//                 </select>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No saved events.</p>
//       )}
//     </div>
//   );
// };

// export default SavedEvents;
