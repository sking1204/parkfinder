import { useEffect, useState } from "react";
import ParkfinderApi from "../services/ParkfinderApi";
import stripHtmlTags from "../helper/stripHtmlTags";
import "./ParkEvents.css";



const ParkEvents =({ parkCode, park }) => {

  const[fetchedParks, setFetchedParks] = useState([]);

    useEffect(() => {
        async function fetchEventsByParkCode() {
            try{
            const fetchedParks = await ParkfinderApi.getEventsByParkCode(parkCode);
            console.log("Fetched Parks By State:", fetchedParks.eventsRes.data)
            setFetchedParks(fetchedParks.eventsRes.data);
        } catch (err){
            console.error("Error fetching parks: err");
        }
        }
      
        fetchEventsByParkCode();
        
      }, [parkCode]);

      //maybe add button to save event

      return (
        <div className="park-events">
          <h2>Events</h2>
          {fetchedParks.length > 0 ? (
            <ul>
              {fetchedParks.map((event, index) => (
                <li key={index}>
                  <p><strong>Event Title:</strong> {event.title}</p>
                  <p><strong>Event Type:</strong> {event.types}</p>
                  <p><strong>Description:</strong> {stripHtmlTags(event.description)}</p>
                  <p><strong>Dates:</strong></p>
                  {console.log(`Type of event.dates for event ${index}:`, Array.isArray(event.dates) ? 'array' : typeof event.dates)}
                  {Array.isArray(event.dates) && (
                    <select>
                      {event.dates.map((date, dateIndex) => (
                        <option key={dateIndex} value={date}>{date}</option>
                      ))}
                    </select>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>{park.fullName} has no listed events.</p>
          )}
        </div>
      );
    }
    
    export default ParkEvents;