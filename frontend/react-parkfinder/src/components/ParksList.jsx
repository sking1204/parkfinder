import React, { useState, useEffect } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import ParkCard from './ParkCard';

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

  /** Triggered by search form submit; reloads companies. */
//   async function search(name) {
//     let companies = await JoblyApi.getCompanies(name);
//     setCompanies(companies);
//   }

    return (
        <div className="card-container">
            {/* <SearchForm searchFor={search} /> */}
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





// import "./ParksList.css"

// const ParksList = () =>{
//     return(
//         <div className="parkslist">
//             <h1 className="parkslist-header">This is the Find A Park placeholder page!</h1>
//         </div>
//     )
// }

// export default ParksList;