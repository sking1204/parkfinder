import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import "./ParksByState.css"
import {useState, useEffect} from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import SelectParks from './SelectParks';


export default function ParksByState() {

const [stateCodes, setStateCodes] = useState([]);
const [selectedState, setSelectedState] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
  async function fetchParksByStateList() {
    setLoading(true);
      try{
      const fetchedParks = await ParkfinderApi.getParksStateList();
      console.log("Fetched Parks By State:", fetchedParks.StateCodes)
      setStateCodes(fetchedParks.StateCodes);
  } catch (err){
      console.error("Error fetching parks: err");
  }
  setLoading(false);
  }

  fetchParksByStateList();
  
}, []);

const handleStateChange = (evt) =>{
  setSelectedState(evt.target.value);
}



return (
  <>
    <h1>Find Park By State:</h1>
    {loading ? (
      <p>Loading...</p>
    ): (
    
    <Box className="nativeselect" sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Select State by State Code
        </InputLabel>
        <NativeSelect
          value={selectedState}
          onChange={handleStateChange}
          inputProps={{
            name: 'state',
            id: 'uncontrolled-native',
          }}
        >
          <option value="" disabled>Select State by State Code</option>
          {stateCodes.map((stateCode) => (
            <option key={stateCode} value={stateCode}>
              {stateCode}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
    )}
    <SelectParks selectedState={selectedState} />    
  </>
);
}