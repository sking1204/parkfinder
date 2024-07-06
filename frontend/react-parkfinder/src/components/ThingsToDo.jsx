




import { useEffect, useState } from "react";
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

      

      //Maybe make a card instead of returning a ul.

    return (
      <>
      <div className="things-to-do-container">
        <h2>Things To Do</h2>         
        {fetchedParks.length > 0 ? (
          <ul>
            {fetchedParks.map((todo, index) => (
              <li key={index}>
                <p><strong> {todo.title} </strong></p>
                <p> {todo.shortDescription} </p>
                <p> {todo.locationDescription}</p>
                <img width='300px' src={todo.images[0].url}></img>
                <div>
                {savedTodos[todo.id] && savedTodos[todo.id].message && (
                <div className={`message ${savedTodos[todo.id].status ? 'success-message' : 'error-message'}`}>
                  {savedTodos[todo.id].message}
                </div>
              )}

                {/* <button className="submit-button" onClick={() => handleSavedThingToDo(todo)}>Save Event</button> */}

                <div>
                <button className={`submit-button ${savedTodos[todo.id] ? 'submitted' : ''}`} 
                disabled={savedTodos[todo.id]} 
                onClick={() => handleSavedThingToDo(todo)} >Save Event</button>
              </div>
              </div>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>{park.fullName} has no listed events.</p>
        )}
      </div>
      </>
    );
  }
  
  export default ThingsToDo;