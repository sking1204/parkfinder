import * as React from 'react';
import {useParams} from 'react-router-dom' 
import ReviewForm from './ReviewForm';





const ParkReview = ({user,selectedName, selectedCode}) =>{
  const {parkCode} =useParams();
  return(
    
      <>       
      
        <div>
          <ReviewForm selectedName ={selectedName}  selecedCode={selectedCode} parkCode={parkCode} user={user}/>
        </div>            
      </>
    );
    }    
  

export default ParkReview;