import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import "./ParksByState.css"
import {useState, useEffect} from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import SelectParks from './SelectParks';
import ParksByParkCode from './ParksByParkCode';

// export default function ParksByState() {
//   const [stateCodes, setStateCodes] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showParksByState, setShowParksByState] = useState(true);


//   useEffect(() => {
//     async function fetchParksByStateList() {
//       setLoading(true);
//       try {
//         const fetchedParks = await ParkfinderApi.getParksStateList();
//         console.log("Fetched Parks By State:", fetchedParks.StateCodes);
//         setStateCodes(fetchedParks.StateCodes);
//       } catch (err) {
//         console.error("Error fetching parks:", err);
//       }
//       setLoading(false);
//     }

//     fetchParksByStateList();
//   }, []);

//   const handleStateChange = (evt) => {
//     setSelectedState(evt.target.value);
//     // Hide ParksByState once a state is selected
//     if (evt.target.value) {
//       setShowParksByState(false);       
//     }
//   };

//   return (
//     <>
//       {showParksByState && (
//         <>
//           <div className="park-by-state">Find Park By State:</div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <Box className="nativeselect" sx={{ minWidth: 120 }}>
//               <FormControl fullWidth>
//                 {selectedState === "" && (
//                   <InputLabel
//                     variant="standard"
//                     htmlFor="uncontrolled-native"
//                     sx={{
//                       left: '8%',
//                       paddingTop: '12px',
//                       transform: 'translateX(-50%)',
//                       width: 'fit-content',
//                     }}
//                   >
//                     Select Park by State Code
//                   </InputLabel>
//                 )}
//                 <NativeSelect
//                   value={selectedState}
//                   onChange={handleStateChange}
//                   inputProps={{
//                     name: 'state',
//                     id: 'uncontrolled-native',
//                   }}
//                   sx={{
//                     paddingLeft: '10px',
//                   }}
//                 >
//                   <option value=""></option>
//                   {stateCodes.map((stateCode) => (
//                     <option key={stateCode} value={stateCode}>
//                       {stateCode}
//                     </option>
//                   ))}
//                 </NativeSelect>
//               </FormControl>
//             </Box>
//           )}
//         </>
//       )}
//       <SelectParks selectedState={selectedState} />
     
    
//     </>
//   );
// }


//7-26 OLD
export default function ParksByState() {
  const [stateCodes, setStateCodes] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchParksByStateList() {
      setLoading(true);
      try {
        const fetchedParks = await ParkfinderApi.getParksStateList();
        console.log("Fetched Parks By State:", fetchedParks.StateCodes);
        setStateCodes(fetchedParks.StateCodes);
      } catch (err) {
        console.error("Error fetching parks: err");
      }
      setLoading(false);
    }

    fetchParksByStateList();
  }, []);

  const handleStateChange = (evt) => {
    setSelectedState(evt.target.value);
  };

  return (
    <>
      <div className="park-by-state">Find Park By State:</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box className="nativeselect" sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            {selectedState === "" && (
              <InputLabel
                variant="standard"
                htmlFor="uncontrolled-native"
                sx={{
                  left: '8%',
                  paddingTop: '12px',
                  transform: 'translateX(-50%)',
                  width: 'fit-content',
                }}
              >
                Select Park by State Code
              </InputLabel>
            )}
            <NativeSelect
              value={selectedState}
              onChange={handleStateChange}
              inputProps={{
                name: 'state',
                id: 'uncontrolled-native',
              }}
              sx={{
                paddingLeft: '10px',
              }}
            >
              <option value=""></option>
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


//OLD
// export default function ParksByState() {

// const [stateCodes, setStateCodes] = useState([]);
// const [selectedState, setSelectedState] = useState("");
// const [loading, setLoading] = useState(false);

// useEffect(() => {
//   async function fetchParksByStateList() {
//     setLoading(true);
//       try{
//       const fetchedParks = await ParkfinderApi.getParksStateList();
//       console.log("Fetched Parks By State:", fetchedParks.StateCodes)
//       setStateCodes(fetchedParks.StateCodes);
//   } catch (err){
//       console.error("Error fetching parks: err");
//   }
//   setLoading(false);
//   }

//   fetchParksByStateList();
  
// }, []);

// const handleStateChange = (evt) =>{
//   setSelectedState(evt.target.value);
// }



// return (
//   <>
//     <div className="park-by-state">Find Park By State:</div>
//     {loading ? (
//       <p>Loading...</p>
//     ): (
    
//     <Box className="nativeselect" sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel 
//         variant="standard" 
//         htmlFor="uncontrolled-native"
//         sx={{
//           left:'8%',
//           paddingTop: '12px',
//           transform: 'translateX(-50%)',
//           width: 'fit-content',
//         }}
//         >
//           Select Park by State Code
//         </InputLabel>
//         <NativeSelect
//           value={selectedState}
//           onChange={handleStateChange}
//           inputProps={{
//             name: 'state',
//             id: 'uncontrolled-native',
//           }}
//         >
//           {/* <option value="" disabled>Select State by State Code</option> */}
//           <option value="" ></option>
//           {stateCodes.map((stateCode) => (
//             <option key={stateCode} value={stateCode}>
//               {stateCode}
//             </option>
//           ))}
//         </NativeSelect>
//       </FormControl>
//     </Box>
//     )}
//     <SelectParks selectedState={selectedState} />    
//   </>
// );
// }