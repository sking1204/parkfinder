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
import './ActivitiesList.css'

const ParkActivities =({ park }) => {
    return (
      <div className="activities-container">
        <h2>Activities</h2>
        {park.activities.length > 0 ? (
          <ul className="park-activities-grid">
            {park.activities.map((activity, index) => (
              <li key={index}>
                {/* <p><strong>id:</strong> ${activity.id}</p> */}
                <p><strong>{activity.name} </strong></p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>{park.fullName} has no listed activities.</p>
        )}
      </div>
    );
  }
  
  export default ParkActivities;