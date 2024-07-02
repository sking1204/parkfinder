/* Version 6/30 */

import React, { useState } from 'react';
import './ActivitiesList.css';
import ParkfinderApi from '../services/ParkfinderApi';

const ParkActivities = ({ park,user }) => {
  const [checkedActivities, setCheckedActivities] = useState(new Set());

  const handleCheckboxChange = (evt) => {
    const { value, checked } = evt.target;
    setCheckedActivities((prevCheckedActivities) => {
      const newCheckedActivities = new Set(prevCheckedActivities);
      if (checked) {
        newCheckedActivities.add(value);
      } else {
        newCheckedActivities.delete(value);
      }
      return newCheckedActivities;
    });
  };

  const handleSelectAllChange = (evt) => {
    const { checked } = evt.target;
    setCheckedActivities(checked ? new Set(park.activities.map(activity => activity.id)) : new Set());
  };

  const isAllChecked = checkedActivities.size === park.activities.length;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const nps_activity_id = Array.from(checkedActivities);
  //   console.log('Selected activities:', nps_activity_id);

  //   try{
  //     const response = await ParkfinderApi.saveActivities(user, park.parkCode, {nps_activity_id});
  //     console.log('Activities saved successfully:', response);
  //   }catch(error){
  //     console.error('Error saving activities:', error);
  //   }
    
  //   // Here you can send the selected activities to a server or perform any other actions
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert checkedActivities to an array of IDs
    const nps_activity_ids = Array.from(checkedActivities);
  
    console.log('Selected activities:', nps_activity_ids);
  
    try {
      const response = await ParkfinderApi.saveActivities(user, park.parkCode, { nps_activity_ids });
      console.log('Activities saved successfully:', response);
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  };

  return (
    <div className="activities-container">
      <h2>Activities</h2>
      <form onSubmit={handleSubmit}>
        <div className="multiselect">
          <label>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleSelectAllChange}
            />
            Select All
          </label>
          <ul className="park-activities-grid">
            {park.activities.map((activity, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={activity.id}
                    checked={checkedActivities.has(activity.id)}
                    onChange={handleCheckboxChange}
                  />
                  <strong>{activity.name}</strong>
                </label>
              </li>
            ))}
          </ul>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>





  );
};

export default ParkActivities;




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