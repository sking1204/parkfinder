

//7/5

import { useEffect, useState } from "react"; 
import { useLocation } from 'react-router-dom';
import ParkfinderApi from "../services/ParkfinderApi";
import './SavedItems.css';

const FavoritedParks = () => {
  const location = useLocation();
  const { user, park, parkCode } = location.state || {}; // Destructure the state
  const [savedFavorites, setSavedFavorites] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.username) {
      async function fetchSavedFavorites() {
        try {
          const fetchedSavedFavorites = await ParkfinderApi.getSavedFavoritesByParkCode(user.username, parkCode);
          setSavedFavorites(fetchedSavedFavorites.savedFavorites); 
          console.log("Fetched Saved Items:", fetchedSavedFavorites.savedFavorites);
        } catch (err) {
          setError(err);
          console.error("Error fetching saved items:", err);
        }
      }

      fetchSavedFavorites();
    }
  }, [user, parkCode]);

  if (error) {
    return <div>Error fetching saved items: {error.message}</div>;
  }

  if (!savedFavorites) {
    return <div>Loading saved items...</div>;
  }

  return (
    <>
      <div>
        <h1>Saved Parks for: {user.username}</h1>         
      </div>
      <div className="saved-items-container">
        <div>
          <h2>Saved Parks</h2>
          {savedFavorites.length > 0 ? (
            <ul>
              {savedFavorites.map((favorite, index) => (
                <div className="items-container" key={favorite.park_id}>
                  <li>
                    <p><strong>Park ID:</strong> {favorite.park_id}</p>
                    <p><strong>Park Code:</strong> {favorite.park_code}</p>
                    <p><strong>Park Name:</strong> {favorite.park_full_name}</p>
                    <img src={favorite.park_image_url} width="400px" alt={favorite.park_full_name} />
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No saved activities.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritedParks;






//MOSTLY WORKING
// import { useEffect, useState } from "react";
// import {useLocation}  from 'react-router-dom';
// import ParkfinderApi from "../services/ParkfinderApi";
// import './SavedItems.css';

// const FavoritedParks = ({ user }) => {
//   const location = useLocation();
//   const { park, parkCode } = location.state; // Destructure the state
//   const [savedFavorites, setSavedFavorites] = useState(null);
//   const [error, setError] = useState(null);
 


 

//   useEffect(() => {
//     if (user && user.username) {
//       async function fetchSavedFavorites() {
//         try {
//           const fetchedSavedFavorites = await ParkfinderApi.getSavedFavorites(user.username, parkCode);
//           setSavedFavorites(fetchedSavedFavorites.savedFavorites); 
//           console.log("Fetched Saved Items:", fetchedSavedFavorites.savedFavorites);
          
//         } catch (err) {
//           setError(err);
//           console.error("Error fetching saved items:", err);
//         }
//       }

//       fetchSavedFavorites();
//     }
//   }, [user]);

//   if (error) {
//     return <div>Error fetching saved items: {error.message}</div>;
//   }

//   if (!savedFavorites) {
//     return <div>Loading saved items...</div>;
//   }

// //   const { savedActivities, savedEvents, savedFees, savedMap, savedTodo } = savedItems;

//   return (
//     <>
//       <div>
//         <h1>Saved Parks for: {user.username}</h1>         
//       </div>

//       <div className="saved-items-container">
//         <div >
//           <h2>Saved Parks</h2>
//           {savedFavorites.length > 0 ? (
//             <ul>
//               {savedFavorites.map((favorite, index) => (
//                 <div className = "items-container">
//                 <li key={index}>
//                   <p><strong>Park ID:</strong> {favorite.park_id}</p>
//                   <p><strong>Park Code:</strong> {favorite.park_code}</p>
//                   <p><strong>Park Name:</strong> {park.fullName}</p>
//                   <p>{park.description}</p>
//                   <img src={park.images[0].url} width="400px" alt={park.fullName} />
                 
                 
                 
//                 </li>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No saved activities.</p>
//           )}
//         </div>       

//       </div>
//     </>
//   );
// };

// export default FavoritedParks;




