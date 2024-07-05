import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import "./ParksByState.css"
import {useState, useEffect} from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import SelectCodes from './SelectCodes';


export default function ParksByParkCode() {

  const [parkCodes, setParkCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  async function fetchParkCodesList() {
    setLoading(true);
      try{
      const fetchedParks = await ParkfinderApi.getAllParks();
      console.log("Fetched Parks By Code:", fetchedParks.parks.parkCodes)
      setParkCodes(fetchedParks.parks.parkCodes);
  } catch (err){
      console.error("Error fetching parks: err");
  }
  setLoading(false);
  }

  fetchParkCodesList();
  
}, []);

const handleCodeChange = (evt) =>{
  setSelectedCode(evt.target.value);
}



return (
  <>
  <h1>Find Park By ParkCode:</h1>
    {loading ? (
      <p>Loading...</p>
    ): (     
    <Box className="nativeselect" sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Select Park by Park Code
        </InputLabel>
        <NativeSelect
          value={selectedCode}
          onChange={handleCodeChange}
          inputProps={{
            name: 'park',
            id: 'uncontrolled-native',
          }}
        >
          <option value="" disabled>Select Park by Park Code</option>
          {parkCodes.map((parkCode) => (
            <option key={parkCode} value={parkCode}>
              {parkCode}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
    )}
    <SelectCodes selectedCode={selectedCode} />
  </>
);
}