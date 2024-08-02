import React from 'react';
import {Link} from 'react-router-dom';
import { Card, CardContent, CardMedia,Typography, List, ListItem, ListItemText } from '@mui/material';
// import "./ReviewCard.css";

function ReviewCard({ id,park_code,title,description,created_at, rating, username }) {
    return (
        <Card variant="outlined"
        sx={{
            marginTop: '20px',
            height: '280px', // Set fixed height
            overflow: 'auto', // Enable scrolling
            backgroundColor: 'white'
        }}>
          
          <CardContent>
            {/* <Typography variant="h6" component="div">
              {username}'s Favorites
            </Typography> */}
            <Typography variant="h5"
             component="div"
             sx={{
              textAlign: 'left',
             }}>
              {title}
            </Typography> 

            <Typography 
             component="div"
             sx={{
              textAlign: 'left',
              marginTop:'5px',
             }}>
              Rating: {rating}
            </Typography>    

              
  
            <Typography variant="body2"
             color="textSecondary"
             sx={{
              textAlign: 'left',
              marginTop:'10px',
             }}
             >
              Review: {description}
             
            </Typography> 

            <Typography variant="body2"
             color="textSecondary"
             sx={{
              marginTop: '10px',
              fontSize: '12px',
              textAlign: 'left',
             }}
             >
              Reviewed By: {username}
            </Typography>                
  
            
  
            <Typography variant="body2"
             color="textSecondary"
             sx={{
              marginTop: '10px',
              fontSize: '12px',
              textAlign: 'left',
             }}
             >
              ParkCode: {park_code}
            </Typography>
   
          </CardContent>
        </Card>
      );
    }
    
    export default ReviewCard;
    
    
    
    
    
    
    //orig
    
//     return (
//         // <Link className="parkcard" to = {`/parks/${company.handle}`}>
//         <div className="card">
//             <h1>Title: {title}</h1>
//             <h2>Reviewed by: {username}</h2>
//             <h4>Park Code:{park_code}</h4>
//             {/* <h1>Park: {parkFullName}</h1> */}
                         
            
//             <p>Review:{description}</p> 
//             <h2>Rating:{rating}</h2> 
//             <h5>Created At: {created_at}</h5>           
            
//             {/* <p>{company.description}</p> */}
            

//         </div>
//         // </Link>
//     );
// }


