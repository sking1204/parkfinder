import { useEffect, useState } from "react";
import ParkfinderApi from "../services/ParkfinderApi";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

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

  //new 7/29

  return (
    <>
      {/* <div>
        <p className="saved-items-header">Saved Items for: {user.username}</p>               
      </div> */}

      <Card style={{ 
        marginTop:'20px',
        marginBottom: '20px',
        backgroundColor: '#DCEDC8',
        
         }}>
        <CardContent>
          <Typography variant="h5"
          sx={{
            marginBottom: '20px',
          }}>
            Saved Activities</Typography>
          {savedActivities.length > 0 ? (
            <div style={{ 
              display: 'grid',               
              // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: '20px', // gap between cards
            }}>
           
              {savedActivities.map((activity, index) => (
                <Card 
                key={index} 
                style={{ 
                  marginBottom: '10px',
                  // backgroundColor:'#EEEE',
                   }}>
                  <CardContent>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
                          {`${activity.name}`}
                          {/* {`Activity: ${activity.name}`} */}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span">Activity ID: {activity.id}</Typography>
                            <br />
                            <Typography component="span">Park Code: {activity.park_code}</Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
              </div>
          
          ) : (
            <Typography>No saved activities.</Typography>
          )}
        </CardContent>
      </Card>

      <Card style={{ 
        marginBottom: '20px',
        backgroundColor: '#DCEDC8',
      
        

         }}>
        <CardContent>
          <Typography 
          variant="h5"
          sx={{
            marginBottom: '20px',
          }}> 
          Saved Events</Typography>
          {savedEvents.length > 0 ? (
            // <List>
            <div style={{ 
              display: 'grid',               
              // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '20px', // gap between cards
            }}>
              
              
              {savedEvents.map((event, index) => (
                <Card key={index}
                 style={{
                   marginBottom: '10px',
                  height: '380px', // Set fixed height
                  overflow: 'auto' // Enable scrolling
                  }}>
                  <CardContent>
                    <ListItem>
                      <ListItemText
                        // primary={`Title: ${event.title}`}
                        primary={
                          <Typography variant="h6" component="span" sx={{ 
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            // marginBottom: '20px' // Adds margin to the top and bottom                            
                             }}>
                          {event.title}
                        </Typography>
                        }
                        secondary ={
                          <>
                            {/* <Typography component="span"><strong>Description:</strong> {event.description}</Typography>
                            <br />
                            <Typography component="span"><strong>Park Code:</strong> {event.park_code}</Typography>
                            <br />
                            <Typography component="span"><strong>Selected Date:</strong> {event.selected_date}</Typography> */}
                            <Typography component="span"
                            sx={{
                              marginTop:'10px',
                            }}>{event.description}</Typography>
                            <br />
                            <Typography component="span"><strong>Park Code:</strong> {event.park_code}</Typography>
                            <br />
                            <Typography component="span"><strong>Selected Date:</strong> {event.selected_date}</Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>                
              ))}
              </div>
            /* // </List> */
          ) : (
            <Typography>No saved events.</Typography>
          )}
        </CardContent>
      </Card>

      <Card style={{ 
        marginBottom: '20px',
        backgroundColor: '#DCEDC8',
         }}>
        <CardContent>
          <Typography
          variant="h5" 
          sx={{
            marginBottom: '20px',
          }}> 
          Saved Fees</Typography>
          {savedFees.length > 0 ? (
            // <List>
            <div style={{ 
              display: 'grid',               
              // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '20px', // gap between cards
            }}>
              {savedFees.map((fee, index) => (
                <Card 
                key={index} 
                style={{ 
                  marginBottom: '10px',
                  // backgroundColor:'#EEEE',
                  height: '200px',
                   }}>
                  <CardContent>
                    <ListItem>
                      <ListItemText
                        // primary={`Fee: ${fee.title}`}
                        // primary={`${fee.title}`}
                        primary={
                          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
                          {fee.title}
                        </Typography>
                        }
                        secondary={
                          <>
                             <Typography component="span"><strong>Cost:</strong> {fee.cost}</Typography>                             
                            <br />
                            <Typography component="span"><strong>Park Code:</strong> {fee.park_code}</Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            {/* </List> */}
            </div>
          ) : (
            <Typography>No saved fees.</Typography>
          )}
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5">Saved Map Locations</Typography>
          {savedMap.length > 0 ? (
            <List>
              {savedMap.map((map, index) => (
                <Card key={index} style={{ marginBottom: '10px' }}>
                  <CardContent>
                    <ListItem>
                      <ListItemText
                        primary={`Park Code: ${map.park_code}`}
                        secondary={
                          <>
                            <Typography component="span"><strong>Latitude:</strong> {map.latitude}</Typography>
                            <br />
                            <Typography component="span"><strong>Longitude:</strong> {map.longitude}</Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            </List>
          ) : (
            <Typography>No saved map locations.</Typography>
          )}
        </CardContent>
      </Card>

      <Card style={{ 
        marginBottom: '20px',
        backgroundColor: '#DCEDC8', 
         }}>
        <CardContent>
          <Typography 
          variant="h5"
          sx={{
            marginBottom: '20px',
          }}> 
          Things To Do</Typography>
          {savedTodo.length > 0 ? (
            // <List>
            <div style={{ 
              display: 'grid',               
              // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '20px', // gap between cards
            }}>
              {savedTodo.map((todo, index) => (
                <Card key={index} 
                style={{ 
                  marginBottom: '10px',
                  height: '370px', // Set fixed height
                  overflow: 'auto', // Enable scrolling
                   }}>
                  <CardContent>
                    <ListItem>
                      <ListItemText
                        // primary={`Title: ${todo.title}`}
                        primary={
                          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                          {todo.title}
                        </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span"><strong>Short Description:</strong> {todo.short_description}</Typography>
                            <br />
                            <Typography component="span"><strong>Location Description:</strong> {todo.location_description}</Typography>
                            <br />
                            <Typography component="span"><strong>Park Code:</strong> {todo.park_code}</Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            {/* </List> */}
            </div>
          ) : (
            <Typography>No things to do saved.</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SavedItems;

/* old card
<Card style={{ 
        marginBottom: '20px',
        backgroundColor: '#DCEDC8',
       
         }}>
        <CardContent>
          <Typography variant="h5"
          sx={{
            marginBottom: '20px',
          }}>
            Saved Activities</Typography>
          {savedActivities.length > 0 ? (
            <div style={{ 
              display: 'grid',               
              // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gridTemplateColumns: 'repeat(5,1fr)',
              gap: '20px', // gap between cards
              marginBottom: '20px';
            }}>
           
              {savedActivities.map((activity, index) => (
                <Card 
                key={index} 
                style={{ 
                  marginBottom: '10px',
                  // backgroundColor:'#EEEE',
                  height: '150px', // Set fixed height
                  // overflow: 'auto' // Enable scrolling
                   }}>
                  <CardContent>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" component="span" sx={{ fontWeight: 'normal' }}>
                          {`${activity.name}`}
                          {/* {`Activity: ${activity.name}`} */
      //                     </Typography>
      //                   }
      //                   secondary={
      //                     <>
      //                       <Typography component="span">Activity ID: {activity.id}</Typography>
      //                       <br />
      //                       <Typography component="span">Park Code: {activity.park_code}</Typography>
      //                     </>
      //                   }
      //                 />
      //               </ListItem>
      //             </CardContent>
      //           </Card>
      //         ))}
      //         </div>
          
      //     ) : (
      //       <Typography>No saved activities.</Typography>
      //     )}
      //   </CardContent>
      // </Card>






  //old

//   return (
//     <>
//       <div>
//         <h1>Saved Items for: {user.username}</h1>         
//       </div>

//       <div className="saved-items-container">
//         <div className="items-container">
//           <h2>Saved Activities</h2>
//           {savedActivities.length > 0 ? (
            
//             <ul>
//               {savedActivities.map((activity, index) => (
//                 <div className="items-grouping">
//                 <li key={index}>
//                   <p><strong>Activity ID:</strong> {activity.id}</p>
//                   <p><strong>Activity Name:</strong> {activity.name}</p>
//                   <p><strong>Park Code:</strong> {activity.park_code}</p>
//                 </li>
//                 </div>
                
//               ))}
//             </ul>
            
//           ) : (
//             <p>No saved activities.</p>
//           )}
//         </div>

//         <div className="items-container">
//           <h2>Saved Events</h2>
//           {savedEvents.length > 0 ? (
//             <ul>
//               {savedEvents.map((event, index) => (
//                 <div className="items-grouping">
//                 <li key={index}>
//                   <p><strong>Title:</strong> {event.title}</p>
//                   <p><strong>Description:</strong> {event.description}</p>
//                   <p><strong>Park Code:</strong> {event.park_code}</p>
//                   <p><strong>Selected Date:</strong> {event.selected_date}</p>
//                 </li>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No saved events.</p>
//           )}
//         </div>

//         <div className="items-container">
//           <h2>Saved Fees</h2>
//           {savedFees.length > 0 ? (
//             <ul>
//               {savedFees.map((fee, index) => (
//                 <div className="items-grouping">
//                 <li key={index}>
//                   <p><strong>Title:</strong> {fee.title}</p>
//                   <p><strong>Park Code:</strong> {fee.park_code}</p>
//                   <p><strong>Cost:</strong> {fee.cost}</p>
//                 </li>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No saved fees.</p>
//           )}
//         </div>

//         <div className="items-container">
//           <h2>Saved Map Locations</h2>
//           {savedMap.length > 0 ? (
            
//             <ul>
//               {savedMap.map((map, index) => (
//                 <div className="items-grouping">
//                 <li key={index}>
//                   <p><strong>Latitude:</strong> {map.latitude}</p>
//                   <p><strong>Longitude:</strong> {map.longitude}</p>
//                   <p><strong>Park Code:</strong> {map.park_code}</p>
//                 </li>
//                 </div>
//               ))}
//             </ul>
            
//           ) : (
//             <p>No saved map locations.</p>
//           )}
//         </div>

//         <div className="items-container">
//           <h2>Things To Do</h2>
//           {savedTodo.length > 0 ? (
             
//             <ul>
//               {savedTodo.map((todo, index) => (
//                 <div className="items-grouping">
//                 <li key={index}>
//                   <p><strong>Title:</strong> {todo.title}</p>
//                   <p><strong>Short Description:</strong> {todo.short_description}</p>
//                   <p><strong>Location Description:</strong> {todo.location_description}</p>
//                   <p><strong>Park Code:</strong> {todo.park_code}</p>
//                 </li>
//                 </div>
//               ))}
//             </ul>
            
//           ) : (
//             <p>No things to do saved.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SavedItems;



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

