import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';


function SelectParkCodeResultsCard({ park, onClick }) {
    return (
        <Card  sx={{
            maxWidth: 750, 
            margin: 10 ,
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
                        borderRadius: '5px 5px 0 0', /* Optional: rounded corners */
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

export default SelectParkCodeResultsCard;

//OLD CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// function SelectParkCodeResultsCard({ park, onClick }) {
//     return (
//         <Card 
//             sx={{
//                 maxWidth: 0, 
//                 margin: 'auto', // Center the card
//                 marginTop: 4,
//                 boxShadow: 3, // Add subtle shadow for depth
//                 borderRadius: 2, // Round the corners
//             }}
//             onClick={() => onClick(park.parkCode)}
//         >
//             <CardActionArea>
//                 <CardMedia
//                     component="img"
//                     height="140"
//                     image={park.images[0].url}
//                     alt={park.fullName}
//                     sx={{
//                         border: '2px solid #C5E1A5', // Subtle border
//                         borderRadius: '4px 4px 0 0', // Round top corners
//                     }}
//                 />
//                 <CardContent>
//                     <Typography 
//                         gutterBottom 
//                         variant="h5" 
//                         component="div"
//                         sx={{
//                             color: '#3B403C',
//                             fontWeight: 600,
//                         }}
//                     >
//                         {park.fullName}
//                     </Typography>
//                     <Typography
//                         gutterBottom 
//                         variant="body2" 
//                         color="text.secondary"
//                         sx={{ 
//                             mb: 2, 
//                             color: '#3B403C',
//                             fontWeight: 500,
//                             fontSize: '14px',
//                         }} 
//                     >
//                         Park Code: {park.parkCode}
//                     </Typography>
//                     <Typography
//                         variant="body2" 
//                         color="text.secondary" 
//                         sx={{     
//                             mb: 2, // Reduce margin to align with card design                     
//                             color: '#616161',
//                             textAlign: 'left',
//                         }}
//                     >
//                         {park.description}
//                     </Typography>
//                 </CardContent>
//             </CardActionArea>
//         </Card>
//     );
// }

// export default SelectParkCodeResultsCard;


// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
// import './SelectParkCodeResultsCard.css';





// function SelectParkCodeResultsCard({ park, onClick }) {
//     return (
//         <Card  sx={{
//                      maxWidth: 345, 
//                      margin: 2 ,
//                      display: 'flex',
//                      flexDirection: 'column'
//                      }} 
//                      onClick={() => onClick(park.parkCode)}>
//             <CardActionArea>
//                 <CardMedia
//                     component="img"
//                     height="140"
//                     image={park.images[0].url}
//                     alt={park.fullName}
//                     sx={{
//                         border: '5px solid #C5E1A5', /* Add border */
//                         borderRadius: '5px 5px 0 0', /* Optional: rounded corners */
//                         boxSizing:'border-box',
                        
//                     }}
                    
//                 />
//                 <CardContent>
//                     <Typography 
//                     gutterBottom 
//                     variant="h5" 
//                     component="div"
//                     sx={{
//                         color: '#3B403C',
//                         fontWeight: '600',
//                         // color: '#616161',
//                         // fontWeight: 'bold',
//                      }} 
//                     >
//                         {park.fullName}
//                     </Typography>
//                     <Typography
//                     gutterBottom 
//                     variant="body2" 
//                     color="text.secondary"
//                     sx={{ 
//                         mb: 3, // Add bottom margin
//                         // color: '#33691E',
//                         color:'#3B403C',
//                         fontWeight: '500',
//                         fontSize: '14px',

//                     }} 
//                     >
//                         Park Code: {park.parkCode}
//                     </Typography>
//                     <Typography                      
//                     variant="body2" 
//                     color="text.secondary" 
//                     sx={{     
//                         mb: 5, // Add bottom margin                     
//                         color: '#616161',
//                         textAlign:'left',
//                         // fontWeight: 'bold',

//                     }}                    
//                     >
//                         {park.description}
//                     </Typography>
//                 </CardContent>
//             </CardActionArea>
//         </Card>
//     );
// }

// export default SelectParkCodeResultsCard;