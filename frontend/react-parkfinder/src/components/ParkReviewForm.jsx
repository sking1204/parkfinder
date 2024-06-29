import * as React from 'react';
import {useParams} from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect'; 
import ParkfinderApi from '../services/ParkfinderApi';
import FormTextArea from './FormTextArea';
import Button from '@mui/material/Button';
import BasicRating from './BasicRating'
import ParksByName from './ParksByName';
import NewFormTextArea from './NewFormTextArea';




const ParkReviewForm = ({selectedName, selectedCode}) =>{
  const {parkCode} =useParams();
  return(
    
      <>
      
        
        {/* <div>
        <BasicRating />
        </div> */}
        {/* <div>
          <h1>Leave a review for: {selectedName}</h1>
        </div> */}
        {/* <div>
          <FormTextArea selectedName ={selectedName} user={user} selecedCode={selectedCode}/>
        </div> */}
        <div>
          <FormTextArea selectedName ={selectedName}  selecedCode={selectedCode} parkCode={parkCode}/>
        </div>
       

   
                 
           
           
      </>
    );
    }
    // <div>
    //   <h1>Park Review Form Placeholder</h1>       
    //   <h2>{selectedName}</h2>
    // </div>
  

export default ParkReviewForm;