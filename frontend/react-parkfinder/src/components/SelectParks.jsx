import React, { useEffect, useState } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';

import { useNavigate } from 'react-router-dom';
import SelectParkResultsCard from './SelectParkResultsCard';

import "./SelectParks.css"


export default function SelectParks({ selectedState }) {
  const [parks, setParks] = useState([]); 
  const [selectedPark, setSelectedPark] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParks() {       
        try {
          const fetchedParks = await ParkfinderApi.getParksByState(selectedState);
          console.log("Fetched parks data for selected state:", fetchedParks);
          if (Array.isArray(fetchedParks.parkState.data)) {
            setParks(fetchedParks.parkState.data);
            console.log("Fetched parks data array:", fetchedParks.parkState.data)
            console.log(fetchedParks.data)
          }else{
            console.error("Fetched data is not an array:", fetchedParks.data);
         }
        } catch (err) {
          console.error("Error fetching parks:", err);

        }
      }  

    fetchParks();
  }, [selectedState]);

  
  const handleParkClick = (parkCode) =>{
    setSelectedPark(parkCode); // Set the selected park
    navigate(`/parks/parkCode/${parkCode}`);
  };

  return (
    <>
     
    <div>
      
      <div className="park-list">
          {parks.map((park) => (
            <SelectParkResultsCard key={park.id} park={park} parks={parks}onClick={handleParkClick} />
          ))}
        </div>
      </div>
    </>
  );
}
