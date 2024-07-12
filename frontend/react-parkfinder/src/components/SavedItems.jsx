import { useEffect, useState } from "react";
import ParkfinderApi from "../services/ParkfinderApi";
import './SavedItems.css';

const SavedItems = ({ user }) => {
  const [savedItems, setSavedItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.username) {
      async function fetchSavedItems() {
        try {
          const fetchedSavedItems = await ParkfinderApi.getSavedItems(user.username);
          setSavedItems(fetchedSavedItems);
          console.log("Fetched Saved Items:", fetchedSavedItems);
        } catch (err) {
          setError(err);
          console.error("Error fetching saved items:", err);
        }
      }

      fetchSavedItems();
    }
  }, [user]);

  if (error) {
    return <div>Error fetching saved items: {error.message}</div>;
  }

  if (!savedItems) {
    return <div>Loading saved items...</div>;
  }

  const { savedActivities, savedEvents, savedFees, savedMap, savedTodo } = savedItems;

  return (
    <>
      <div>
        <h1>Saved Items for: {user.username}</h1>         
      </div>

      <div className="saved-items-container">
        <div className="items-container">
          <h2>Saved Activities</h2>
          {savedActivities.length > 0 ? (
            
            <ul>
              {savedActivities.map((activity, index) => (
                <div className="items-grouping">
                <li key={index}>
                  <p><strong>Activity ID:</strong> {activity.nps_activity_id}</p>
                  <p><strong>Activity Name:</strong> {activity.name}</p>
                  <p><strong>Park Code:</strong> {activity.park_code}</p>
                </li>
                </div>
                
              ))}
            </ul>
            
          ) : (
            <p>No saved activities.</p>
          )}
        </div>

        <div className="items-container">
          <h2>Saved Events</h2>
          {savedEvents.length > 0 ? (
            <ul>
              {savedEvents.map((event, index) => (
                <div className="items-grouping">
                <li key={index}>
                  <p><strong>Title:</strong> {event.title}</p>
                  <p><strong>Description:</strong> {event.description}</p>
                  <p><strong>Park Code:</strong> {event.park_code}</p>
                </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No saved events.</p>
          )}
        </div>

        <div className="items-container">
          <h2>Saved Fees</h2>
          {savedFees.length > 0 ? (
            <ul>
              {savedFees.map((fee, index) => (
                <div className="items-grouping">
                <li key={index}>
                  <p><strong>Title:</strong> {fee.title}</p>
                  <p><strong>Park Code:</strong> {fee.park_code}</p>
                </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No saved fees.</p>
          )}
        </div>

        <div className="items-container">
          <h2>Saved Map Locations</h2>
          {savedMap.length > 0 ? (
            
            <ul>
              {savedMap.map((map, index) => (
                <div className="items-grouping">
                <li key={index}>
                  <p><strong>Latitude:</strong> {map.latitude}</p>
                  <p><strong>Longitude:</strong> {map.longitude}</p>
                  <p><strong>Park Code:</strong> {map.park_code}</p>
                </li>
                </div>
              ))}
            </ul>
            
          ) : (
            <p>No saved map locations.</p>
          )}
        </div>

        <div className="items-container">
          <h2>Things To Do</h2>
          {savedTodo.length > 0 ? (
             
            <ul>
              {savedTodo.map((todo, index) => (
                <div className="items-grouping">
                <li key={index}>
                  <p><strong>Title:</strong> {todo.title}</p>
                  <p><strong>Short Description:</strong> {todo.short_description}</p>
                  <p><strong>Location Description:</strong> {todo.location_description}</p>
                  <p><strong>Park Code:</strong> {todo.park_code}</p>
                </li>
                </div>
              ))}
            </ul>
            
          ) : (
            <p>No things to do saved.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedItems;



// import { useEffect, useState } from "react";
// import ParkfinderApi from "../services/ParkfinderApi";

// const SavedItems = ({user}) => {
//   const [savedItems, setSavedItems] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (user && user.username) {
//       async function fetchSavedItems() {
//         try {
//           const fetchedSavedItems = await ParkfinderApi.getSavedItems(user.username);
//           setSavedItems(fetchedSavedItems);
//           console.log("Fetched Saved Items:", fetchedSavedItems);
//         } catch (err) {
//           setError(err);
//           console.error("Error fetching saved items:", err);
//         }
//       }

//       fetchSavedItems();
//     }
//   }, [user]);

//   if (error) {
//     return <div>Error fetching saved items: {error.message}</div>;
//   }

//   if (!savedItems) {
//     return <div>Loading saved items...</div>;
//   }

//   return (
//     <>
//       <div>
//         <h1>Saved Items for: {user.username}</h1>         
//       </div>
      

//     </>
//   );
// };

// export default SavedItems;

