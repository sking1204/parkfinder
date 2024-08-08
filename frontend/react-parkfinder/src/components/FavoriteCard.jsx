import React from 'react'; 
import { Card, CardContent, CardMedia,Typography } from '@mui/material';


function FavoriteCard({ id, park_code, description, park_name, created_at, username, image }) {
    return (
      <Card variant="outlined">
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={park_name}
        />
        <CardContent>          
          <Typography variant="h5"
           component="div"
           sx={{
            textAlign: 'left',
           }}>
            {park_name}
          </Typography>           

          <Typography variant="body2"
           color="textSecondary"
           sx={{
            textAlign: 'left',
            marginTop:'5px',
           }}
           >             
            {description}
          </Typography>            

          <Typography variant="body2"
           color="textSecondary"
           sx={{
            marginTop: '10px',
            fontSize: '12px',
           }}
           >
            ParkCode: {park_code}
          </Typography>

          <Typography variant="body2"
           color="textSecondary"
           sx={{
            marginTop: '10px',
            fontSize: '12px',
           }}
           >
            Created At: {created_at}
          </Typography>

        </CardContent>
      </Card>
    );
  }
  
  export default FavoriteCard;



//old CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// function FavoriteCard({ id, park_code, description, park_name, created_at, username, image }) {
//     return (
//         <Card variant="outlined">
//             <CardMedia
//                 component="img"
//                 height="140"
//                 image={image}
//                 alt={park_name}
//             />
//             <CardContent style={{
//                  display: 'grid',
//                   gap: '10px',
//                   gridTemplateColumns: 'repeat(4,1fr)',
//                    }}>
//                 <Typography variant="h6" component="div">
//                     {username}'s Favorites
//                 </Typography>
//                 <Typography variant="h5" component="div">
//                     Park Name: {park_name} - Park Code: {park_code}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                     Description: {description}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                     Created At: {created_at}
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// }

// export default FavoriteCard;




    //old
//     return (
        
//         // <Link className="parkcard" to = {`/parks/${company.handle}`}>
//         <div className="card">
//             <h1>{username}'s Favorites</h1>
           
//             {/* <h1>Park: {parkFullName}</h1> */}
//             <h1>Park Name:{park_name} - ParkCode : {park_code}</h1>                         
//             <h2>Description:{description}</h2> 
//             <p>Review:{description}</p> 
//             <img src={image} width="400px" alt={park_name} />  
//             <h5>Created At:{created_at}</h5>           
            
//             {/* <p>{company.description}</p> */}
            

//         </div>
//         // </Link>
//     );
// }


// export default FavoriteCard;