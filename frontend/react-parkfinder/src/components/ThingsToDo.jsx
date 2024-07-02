import { useEffect, useState } from "react";
import ParkfinderApi from "../services/ParkfinderApi";
import stripHtmlTags from "../helper/stripHtmlTags";
import "./ThingsToDo.css"



const ThingsToDo =({ parkCode, park, user }) => {

  const[fetchedParks, setFetchedParks] = useState([]);
  const [savedTodos, setSavedTodos] = useState([]);

    useEffect(() => {
        async function fetchThingsToDoByParkCode() {
            try{
            const fetchedParks = await ParkfinderApi.getThingsToDoByParkCode(parkCode);
            console.log("Fetched thing to do by park code:", fetchedParks.thingsToDo.data)
            setFetchedParks(fetchedParks.thingsToDo.data);
        } catch (err){
            console.error("Error fetching things to do: err");
        }
        }
      
        fetchThingsToDoByParkCode();
        
      }, [parkCode]);

      const handleSavedThingToDo = async (todo) =>{
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
          console.log("Event saved to database:", todoData);
          setSavedTodos([...savedTodos, todo]);
        } catch (err) {
          console.error("Error saving event to database:", err);
        }
      };
      

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
                <button className="submit-button" onClick={() => handleSavedThingToDo(todo)}>Save Event</button>
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