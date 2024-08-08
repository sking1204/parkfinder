import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect'; 
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ParkfinderApi from '../services/ParkfinderApi';



export default function ParksByName({onParkSelect}) {
  const [parks, setParks] = useState([]);
  const [parkNames, setParkNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [parkCodes, setParkCodes] = useState([]); 

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParksByNameList() {
      try {
        const fetchedParks = await ParkfinderApi.getAllParks();
        console.log("Fetched Parks By State:", fetchedParks.parks.parkNames);

        // Ensure fetched data is in expected format
        if (Array.isArray(fetchedParks.parks.parkNames) && Array.isArray(fetchedParks.parks.parkCodes)) {
          setParkNames(fetchedParks.parks.parkNames);           
          setParkCodes(fetchedParks.parks.parkCodes);
          setParks(fetchedParks.parks);
          
        } else {
          console.error("Fetched data is not in expected format:", fetchedParks);
        }
      } catch (err) {
        console.error("Error fetching parks:", err);
      }
    }

    fetchParksByNameList();
  }, []);

  const handleNameChange = (evt) => {
    const selectedCode = evt.target.value;
    const selectedIndex = parkCodes.indexOf(selectedCode);
    const selectedName = parkNames[selectedIndex];
    setSelectedName(selectedName);
    setSelectedCode(selectedCode);
    console.log("Selected name:", selectedName)
    console.log("Selected code:", selectedCode)
    onParkSelect(selectedName, selectedCode)
    
  }

  return (
    <>
      <h1>Find Park By Name:</h1>
      <Box className="nativeselect" sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Select Park by Name
          </InputLabel>
          <NativeSelect
            value={selectedName}
            onChange={handleNameChange}
            inputProps={{
              name: 'park-name',
              id: 'uncontrolled-native',
            }}
          >
            <option value="" disabled>Select Park by Name</option>
            {parkCodes.map((parks, index) => (
              <option key={index} value={parks}>
                {parkNames[index]}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>

     
    </>
  );
}