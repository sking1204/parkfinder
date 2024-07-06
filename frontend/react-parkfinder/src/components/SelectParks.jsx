import React, { useEffect, useState } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';

import { useNavigate } from 'react-router-dom';
import SelectParkResultsCard from './SelectParkResultsCard';


export default function SelectParks({ selectedState }) {
  const [parks, setParks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParks() {
      if (selectedState) {
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
    }

    fetchParks();
  }, [selectedState]);

  if (!selectedState) {
    return <p>Please select a state to view parks.</p>;
  }

  //onclick renders ParkDetail component
  const handleParkClick = (parkCode) =>{
    navigate(`/parks/parkCode/${parkCode}`);
  };

  return (
    <>
     
    <div>
      <h1>Parks in {selectedState}:</h1>
      <h5>Select park to view more details!</h5>

      <div className="park-list">
          {parks.map((park) => (
            <SelectParkResultsCard key={park.id} park={park} onClick={handleParkClick} />
          ))}
        </div>
      </div>
    </>
  );
}
//       {/* <ul>
//         {parks.map((park) => (
//           <SelectParkResultsCard
//           key={parks.id} parks={parks} />
          
//           // <li key={park.id} onClick={() =>handleParkClick(park.parkCode)}>
//           //   {park.fullName} - {`ParkCode: ${park.parkCode}`}</li> 
        
//         ))} 
//       </ul>
    

     
//     </div>
//     {/* <ParkImageGallery parks ={parks}/>     */}
//     </>
//   );
// } */}
