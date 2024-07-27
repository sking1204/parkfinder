import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
// import "./ParksByState.css"
import {useState, useEffect} from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import SelectCodes from './SelectCodes';

import './ParksByParkCode.css';


export default function ParksByParkCode({ selectedCode, setSelectedCode }) {

  const [parkCodes, setParkCodes] = useState([]);
  // const [selectedCode, setSelectedCode] = useState("");
  const [loading, setLoading] = useState(false);
  // const [showParksByCode, setShowParksByCode] = useState(true);

  

useEffect(() => {
  async function fetchParkCodesList() {
    setLoading(true);
      try{
      const fetchedParks = await ParkfinderApi.getAllParks();
      console.log("Fetched Parks By Code:", fetchedParks.parks.parkCodes);
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
  // Hide ParksByCode once a state is selected
  // if (evt.target.value) {
  //   setShowParksByCode(true); 
  };
// }



return (
  <>
  {/* {showParksByCode &&(
    <> */}
  <div className="park-by-code">Find Park By ParkCode:</div>
    {loading ? (
      <p>Loading, this may take a moment...</p>
    ): (    
      
    <Box className="nativeselect" sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {selectedCode === "" &&(
        <InputLabel 
        variant="standard" 
        htmlFor="uncontrolled-native"
          sx={{
          left:'8%',
          paddingTop: '12px',
          transform: 'translateX(-50%)',
          width: 'fit-content',
        }}
        >
          Select Park by Park Code
        </InputLabel>
        )}
        <NativeSelect
          value={selectedCode}
          onChange={handleCodeChange}
          inputProps={{
            name: 'park',
            id: 'uncontrolled-native',
          }}
          sx={{
            paddingLeft: '10px',
          }}
        >
          {/* <option value="" disabled>Select Park by Park Code</option> */}
          <option value="" ></option>
          {parkCodes.map((parkCode) => (
            <option key={parkCode} value={parkCode}>
              {parkCode}
            </option>
          ))}
        </NativeSelect>
      </FormControl>       
    </Box>
    )}
    {/* </>     
    )}     */}
    <SelectCodes selectedCode={selectedCode} loading={loading} />
  </>
);
}