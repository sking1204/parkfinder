import React, { useState, useEffect } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import ParkCard from '../components/ParkCard';
import './ParksList.css'

function ParksList() {
    const [parks, setParks] = useState([]);

    useEffect(() => {
        async function fetchParks() {
            try{
            const fetchedParks = await ParkfinderApi.getAllFLParks();
            console.log("Fetched Parks:", fetchedParks)
            setParks(fetchedParks.parks.data);
        } catch (err){
            console.error("Error fetching parks: err");
        }
        }

        fetchParks();
        
    }, []);


    return (
        <div className="card-container"> 
            {parks.map(park => (
                <ParkCard 
                key={park.id}
                id={park.id}  
                name={park.name}
                description={park.description}
                image ={park.images[0].url}
                />
            ))}
        </div>
    );
}

export default ParksList;

