import React from 'react'; 
import { Card, CardContent, Typography,ListItem, ListItemText, Grid } from '@mui/material';


function ReviewCard({ id,park_code,title,description,created_at, rating, username }) {

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card style={{ 
        marginTop: '20px', 
        marginBottom: '20px', 
        backgroundColor: 'white', 
        height: '280px', 
        overflow: 'auto' }}>
        <CardContent>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
                  {title}
                </Typography>
              }
              secondary={
                <>
                  <Typography component="div" sx={{ textAlign: 'left', marginTop: '5px' }}>
                    Rating: {rating}
                  </Typography>
                  <Typography  sx={{ textAlign: 'left', marginTop: '10px' }}>
                    Review: {description}
                  </Typography>
                  <Typography  sx={{ marginTop: '10px', fontSize: '12px', textAlign: 'left' }}>
                    Reviewed By: {username}
                  </Typography>
                  <Typography variant="body2"  sx={{ marginTop: '10px', fontSize: '12px', textAlign: 'left' }}>
                    Park Code: {park_code}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ReviewCard;




/* OLD CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    // return (
    //     <Card variant="outlined"
    //     sx={{
    //         marginTop: '20px',
    //         height: '280px', // Set fixed height
    //         overflow: 'auto', // Enable scrolling
    //         backgroundColor: 'white'
    //     }}>
          
    //       <CardContent>
    //         {/* <Typography variant="h6" component="div">
    //           {username}'s Favorites
    //         </Typography> */}
    //         <Typography variant="h5"
    //          component="div"
    //          sx={{
    //           textAlign: 'left',
    //          }}>
    //           {title}
    //         </Typography> 

    //         <Typography 
    //          component="div"
    //          sx={{
    //           textAlign: 'left',
    //           marginTop:'5px',
    //          }}>
    //           Rating: {rating}
    //         </Typography>    

              
  
    //         <Typography variant="body2"
    //          color="textSecondary"
    //          sx={{
    //           textAlign: 'left',
    //           marginTop:'10px',
    //          }}
    //          >
    //           Review: {description}
             
    //         </Typography> 

    //         <Typography variant="body2"
    //          color="textSecondary"
    //          sx={{
    //           marginTop: '10px',
    //           fontSize: '12px',
    //           textAlign: 'left',
    //          }}
    //          >
    //           Reviewed By: {username}
    //         </Typography>                
  
            
  
    //         <Typography variant="body2"
    //          color="textSecondary"
    //          sx={{
    //           marginTop: '10px',
    //           fontSize: '12px',
    //           textAlign: 'left',
    //          }}
    //          >
    //           ParkCode: {park_code}
    //         </Typography>
   
    //       </CardContent>
    //     </Card>
    //   );
    // }
    
    // export default ReviewCard;
    
    
    
    
    
    
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


