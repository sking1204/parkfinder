import { useEffect, useState } from "react";
import ParkfinderApi from "../services/ParkfinderApi";
import stripHtmlTags from "../helper/stripHtmlTags";
import "./ThingsToDo.css"



const ThingsToDo =({ parkCode, park }) => {

  const[fetchedParks, setFetchedParks] = useState([]);

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

      //Maybe make a card instead of returning a ul.

    return (
      <div className="things-to-do-container">
        <h2>Things To Do</h2>
        {fetchedParks.length > 0 ? (
          <ul>
            {fetchedParks.map((thingtodo, index) => (
              <li key={index}>
                <p><strong> {thingtodo.title} </strong></p>
                <p> {thingtodo.shortDescription} </p>
                <img width='300px' src={thingtodo.images[0].url}></img>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>{park.fullName} has no listed events.</p>
        )}
      </div>
    );
  }
  
  export default ThingsToDo;