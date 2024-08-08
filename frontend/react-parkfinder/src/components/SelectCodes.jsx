import React, { useEffect, useState } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import { useNavigate } from 'react-router-dom'; 
import SelectParkCodeResultsCard from './SelectParkCodeResultsCard';
import './SelectCodes.css';

export default function SelectCodes({ selectedCode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parks, setParks] = useState([]);    
  const [selectedPark, setSelectedPark] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParks() {       
        try {
          const fetchedParks = await ParkfinderApi.getParksByParkCode(selectedCode);
          console.log("Fetched parks data:", fetchedParks);
          if (Array.isArray(fetchedParks.park.data)) {
            setParks(fetchedParks.park.data);
            setLoading(false);
          }else{
            console.error("Fetched data is not an array:", fetchedParks.data);
         }
        } catch (err) {
          console.error("Error fetching parks:", err);
          setError(err);
          setLoading(false);

        }
      }
    

    fetchParks();
  }, [selectedCode]);

  if (loading) return <p>Loading...</p>;
  


  const handleParkClick = (parkCode) =>{
    setSelectedPark(parkCode)
    navigate(`/parks/parkCode/${parkCode}`);
  };

  return (
    <>


      <div className="park-list">
          {parks.map((park) => (             
            <SelectParkCodeResultsCard key={park.id} park={park} parks={parks} onClick={handleParkClick} />
          ))}
        </div>      
    </>
  );
}


