




import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import ParkfinderApi from "../services/ParkfinderApi";
import stripHtmlTags from "../helper/stripHtmlTags";
import "./ThingsToDo.css"



const ThingsToDo =({ parkCode, park, user }) => {

  const[fetchedParks, setFetchedParks] = useState([]);
  const [savedTodos, setSavedTodos] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchThingsToDoByParkCode() {
            try{
            const fetchedParks = await ParkfinderApi.getThingsToDoByParkCode(parkCode);
            console.log("Fetched thing to do by park code:", fetchedParks.thingsToDo.data)
            setFetchedParks(fetchedParks.thingsToDo.data);
            setLoading(false);
        } catch (err){
            console.error("Error fetching things to do: err");
            setLoading(false);
        }
        }
      
        fetchThingsToDoByParkCode();
        
      }, [parkCode]);

      const handleSavedThingToDo = async (todo) =>{

          // Clear any previous messages
          setSuccessMessage('');
          setErrorMessage('');

        console.log("Saved thing to do", todo)
        const todoData = {
          todo_id: todo.id,
          title: todo.title,
          short_description: todo.shortDescription,
          location_description: todo.locationDescription
          // date: event.selectedDate // Assuming you capture and pass the selected date
        };
      
        try {
          await ParkfinderApi.saveThingsToDo(user, parkCode, todoData);
          console.log("Item saved to database:", todoData);
      //     setSavedTodos([...savedTodos, todo]);
      //   } catch (err) {
      //     console.error("Error saving event to database:", err);
      //   }
      // };

       // Update the savedTodos state
       setSavedTodos(prevState => ({
        ...prevState,
        [todo.id]: { status: true, message: 'Item successfully saved!' }
      }));

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setSavedTodos(prevState => ({
          ...prevState,
          [todo.id]: { ...prevState[todo.id], message: '' }
        }));
      }, 2000);
    } catch (error) {
      console.error("Error saving item to database:", err);
      setErrorMessage('Failed to save item. Please try again.');
      setTimeout(() => setErrorMessage(''), 2000); // Clear error message after 2 seconds
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading park details: {error.message}</p>;

  return (
    <Card sx={{ padding: 2, margin: 2, backgroundColor: '#DCEDC8', width:'1216px' }}>
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: '25px',
            color: '#3B403C',
          }}
        >
          Things To Do
        </Typography>

        {fetchedParks.length > 0 ? (
          <Grid container spacing={2}>
            {fetchedParks.map((todo, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" sx={{ textAlign: 'left' }}>
                      {todo.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
                      {todo.shortDescription}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
                      {todo.locationDescription}
                    </Typography>
                    <img width="100%" src={todo.images[0].url} alt={todo.title} style={{ marginTop: '10px' }} />
                    {savedTodos[todo.id] && savedTodos[todo.id].message && (
                      <Typography
                        variant="body2"
                        sx={{
                          marginTop: '10px',
                          color: savedTodos[todo.id].status ? 'green' : 'red',
                        }}
                      >
                        {savedTodos[todo.id].message}
                      </Typography>
                    )}
                  </CardContent>
                  <Box sx={{ padding: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={savedTodos[todo.id]}
                      onClick={() => handleSavedThingToDo(todo)}
                      fullWidth
                    >
                      Save Event
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card variant="outlined" sx={{marginTop:2}}>
          <CardContent>
          <Typography>
            {park.fullName} has no listed events.
          </Typography>
          </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ThingsToDo;



//8/1
  //cards
//   return (
//     <>
//       <div className="things-to-do-container">
//         <Typography variant="h4" component="div" gutterBottom>
//           Things To Do
//         </Typography>

//         {fetchedParks.length > 0 ? (
//           <Grid container spacing={3}>
//             {fetchedParks.map((todo, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card variant="outlined">
//                   <CardContent>
//                     <Typography variant="h5" component="div" sx={{ textAlign: 'left' }}>
//                       {todo.title}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
//                       {todo.shortDescription}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '5px' }}>
//                       {todo.locationDescription}
//                     </Typography>
//                     <img width='100%' src={todo.images[0].url} alt={todo.title} style={{ marginTop: '10px' }} />
//                     {savedTodos[todo.id] && savedTodos[todo.id].message && (
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           marginTop: '10px',
//                           color: savedTodos[todo.id].status ? 'green' : 'red'
//                         }}
//                       >
//                         {savedTodos[todo.id].message}
//                       </Typography>
//                     )}
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       sx={{ marginTop: '10px' }}
//                       disabled={savedTodos[todo.id]}
//                       onClick={() => handleSavedThingToDo(todo)}
//                     >
//                       Save Event
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography variant="body2" color="textSecondary">
//             {park.fullName} has no listed events.
//           </Typography>
//         )}
//       </div>
//     </>
//   );
// }

// export default ThingsToDo;

      


  //orig
      //Maybe make a card instead of returning a ul.

  //   return (
  //     <>
  //     <div className="things-to-do-container">
  //       <h2>Things To Do</h2>         
  //       {fetchedParks.length > 0 ? (
  //         <ul>
  //           {fetchedParks.map((todo, index) => (
  //             <li key={index}>
  //               <div className="todo-container">
  //               <p><strong> {todo.title} </strong></p>
  //               <p> {todo.shortDescription} </p>
  //               <p> {todo.locationDescription}</p>
  //               <img width='300px' src={todo.images[0].url}></img>
  //               <div>
  //               {savedTodos[todo.id] && savedTodos[todo.id].message && (
  //               <div className={`message ${savedTodos[todo.id].status ? 'success-message' : 'error-message'}`}>
  //                 {savedTodos[todo.id].message}
  //               </div>
  //             )}

  //               {/* <button className="submit-button" onClick={() => handleSavedThingToDo(todo)}>Save Event</button> */}

  //               <div>
  //               <button className={`submit-button ${savedTodos[todo.id] ? 'submitted' : ''}`} 
  //               disabled={savedTodos[todo.id]} 
  //               onClick={() => handleSavedThingToDo(todo)} >Save Event</button>
  //             </div>
  //             </div>
  //             </div>
                
  //             </li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <p>{park.fullName} has no listed events.</p>
  //       )}
  //     </div>
  //     </>
  //   );
  // }
  
  // export default ThingsToDo;