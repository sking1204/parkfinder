import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';





function SelectParkResultsCard({ park, onClick }) {
    return (
        <Card  sx={{
                     maxWidth: 345, 
                     margin: 4 ,
                     display: 'flex',
                     flexDirection: 'column',
                     boxShadow: 3,
                     marginBottom: 4,
                     '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                        backgroundColor:'#f0f0f0',
                     },
                     }} 
                     onClick={() => onClick(park.parkCode)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={park.images[0].url}
                    alt={park.fullName}
                    sx={{
                        border: '5px solid #C5E1A5', /* Add border */
                        borderRadius: '2px 2px 0 0', /* Optional: rounded corners */
                        boxSizing:'border-box',                 
                             
                    }}
                    
                />
                <CardContent>
                    <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div"
                    sx={{
                        color: '#3B403C',
                        fontWeight: '600',                        
                     }} 
                    >
                        {park.fullName}
                    </Typography>
                    <Typography
                    gutterBottom 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                        mb: 3, // Add bottom margin                         
                        color:'#3B403C',
                        fontWeight: '500',
                        fontSize: '14px',

                    }} 
                    >
                        Park Code: {park.parkCode}
                    </Typography>
                    <Typography                      
                    variant="body2" 
                    color="text.secondary" 
                    sx={{     
                        mb: 5, // Add bottom margin                     
                        color: '#616161',
                        textAlign:'left',                        
                    }}                    
                    >
                        {park.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default SelectParkResultsCard;

//OLD CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// import React from 'react';
// import {Link} from 'react-router-dom';
// import ParkfinderRoutes from './ParkfinderRoutes';
// import './SelectParkResultsCard.css'

// function SelectParkResultsCard({ park, onClick }) {
//     return (
//         // <Link className="parkcard" to = {`/parks/${company.handle}`}>
//         <div className="park-card" onClick ={() =>onClick(park.parkCode)}>
//             <h2>{park.fullName}</h2>
//             <div>
//                 <h3>Park Code: {park.parkCode}</h3>
//             </div>

//             <img width= "200px" src={park.images[0].url} />
//             <p>{park.description}</p>
//             {/* <p>{company.description}</p> */}
            

//         </div>
//         // </Link>
//     );
// }


// export default SelectParkResultsCard;

// return (
//     <>
//       <h1>Parks in {selectedState}:</h1>
//       <div className="selected-states-park-list">
//         {parks.map((park) => (
//           <Link key={park.parkCode} className="companycard" to={`/parks/parkCode/${park.parkCode}`}>
//             <div className="card">             
//               <h2>{park.fullName}</h2>
//               <p>{park.description}</p>
//               <img width = "200px" src={park.images[0].url}/>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
//   }
  