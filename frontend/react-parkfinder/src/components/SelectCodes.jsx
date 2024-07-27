import React, { useEffect, useState } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import { useNavigate } from 'react-router-dom';
import SelectParkResultsCard from './SelectParkResultsCard';
import SelectParkCodeResultsCard from './SelectParkCodeResultsCard';
import './SelectCodes.css';

export default function SelectCodes({ selectedCode }) {
  const [parks, setParks] = useState([]); 
  // const [loading,setLoding]  = useState([]);
  const [selectedPark, setSelectedPark] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParks() {
      // if (selectedCode) {
        try {
          const fetchedParks = await ParkfinderApi.getParksByParkCode(selectedCode);
          console.log("Fetched parks data:", fetchedParks);
          if (Array.isArray(fetchedParks.park.data)) {
            setParks(fetchedParks.park.data);
          }else{
            console.error("Fetched data is not an array:", fetchedParks.data);
         }
        } catch (err) {
          console.error("Error fetching parks:", err);

        }
      }
    // }

    fetchParks();
  }, [selectedCode]);

 
//removed 7/31 too clutterd
  // if (!selectedCode)  {
  //   return <p className='select-code'>Please select a code to view parks.</p>;
  // }

  const handleParkClick = (parkCode) =>{
    setSelectedPark(parkCode)
    navigate(`/parks/parkCode/${parkCode}`);
  };

  return (
    <>
    {/* removed 7/31 */}
    {/* <div>
    <h5>Select park to view more details!</h5>        */}

      <div className="park-list">
          {parks.map((park) => (
            // <SelectParkResultsCard key={park.id} park={park} onClick={handleParkClick} />
            <SelectParkCodeResultsCard key={park.id} park={park} parks={parks} onClick={handleParkClick} />
          ))}
        </div>
      {/* </div> */}
    </>
  );
}

// return (
//   <div>
//     <h2>Park Code: {selectedCode}</h2>
//     <ul>
//       {parks.map((park) => (
//         <li key={park.id}>{park.fullName}</li>
//       ))}
//     </ul>
//   </div>
// );
// }

