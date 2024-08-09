import React, { useEffect, useState } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import { useNavigate } from 'react-router-dom'; 
import SelectParkCodeResultsCard from './SelectParkCodeResultsCard';
import './SelectCodes.css';
import { CircularProgress } from '@mui/material';

export default function SelectCodes({ selectedCode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parks, setParks] = useState([]);    
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParks() {
      setLoading(true);
      setError(null); // Reset the error state when a new request starts

      try {
        const fetchedParks = await ParkfinderApi.getParksByParkCode(selectedCode);
        console.log("Fetched parks data:", fetchedParks);

        if (Array.isArray(fetchedParks.park.data)) {
          setParks(fetchedParks.park.data);
        } else {
          console.error("Fetched data is not an array:", fetchedParks.data);
          setError("Fetched data is not an array");
        }
      } catch (err) {
        console.error("Error fetching parks:", err);
        setError("Error fetching parks");
      } finally {
        setLoading(false);
      }
    }

    fetchParks();
  }, [selectedCode]);

  const handleParkClick = (parkCode) => {
    navigate(`/parks/parkCode/${parkCode}`);
  };

  return (
    <div>
      {loading ? (
        <>
          <p>Loading...</p>
          <CircularProgress />
        </>
      // ) : error ? (
      //   <p>Error: {error}</p>
      ) : (
        <div className="park-list">
          {parks.map((park) => (
            <SelectParkCodeResultsCard key={park.id} park={park} onClick={handleParkClick} />
          ))}
        </div>
      )}
    </div>
  );
}

// export default function SelectCodes({ selectedCode }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [parks, setParks] = useState([]);    
//   const [selectedPark, setSelectedPark] = useState(null)
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchParks() {
//       setLoading(true)       
//         try {
//           const fetchedParks = await ParkfinderApi.getParksByParkCode(selectedCode);
//           console.log("Fetched parks data:", fetchedParks);
//           if (Array.isArray(fetchedParks.park.data)) {
//             setParks(fetchedParks.park.data);
//             setLoading(false);
//           }else{
//             console.error("Fetched data is not an array:", fetchedParks.data);
//          }
//         } catch (err) {
//           console.error("Error fetching parks:", err);
//           setError(err);
//           setLoading(false);

//         }
//       }
    

//     fetchParks();
//   }, [selectedCode]);

//   // if (loading) return <p>Loading...</p>;
  


//   const handleParkClick = (parkCode) =>{
//     setSelectedPark(parkCode)
//     navigate(`/parks/parkCode/${parkCode}`);
//   };

//   return (
//     <>
//     <div>
//       {loading ? (
//         <>
//         <p>Loading...</p>
//         <CircularProgress />
//         </>
//       ) : ( 
//       <div className="park-list">
//           {parks.map((park) => (             
//             <SelectParkCodeResultsCard key={park.id} park={park} parks={parks} onClick={handleParkClick} />
//           ))}
//         </div>  
//       )}
//       </div>    
//     </>
//   );
// }


