import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';


const PageNotFound = () => {

  return (
    <div>
       <Typography variant="h5" color="#FF1744" marginBottom="20px">Page Not Found</Typography>
      <div className="image-card-container">
                <Card sx={{ maxWidth: 800,
                            margin: 'auto', 
                            marginTop: 4,
                            borderRadius: '5px'
                            
                           
                             }}>
                    <CardMedia
                        component="img"
                        height="450"
                        image="src/assets/errorimage.jpg" 
                        alt="Park image"
                        sx={{                             
                            borderRadius: '2px', 
                            boxSizing:'border-box',
                        }}
                    />
                     <CardContent>
                        <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        margin="2px"              
                        >
                            <a href="https://www.freepik.com/free-vector/404-error-with-landscape-concept-illustration_20602785.htm#query=404&position=17&from_view=keyword&track=ais_hybrid&uuid=f29cb975-eee2-4f28-94d5-838f56a8eeb8">Image by storyset on Freepik</a>
                        </Typography>
                    </CardContent> 
                    </Card>
                    </div>         
     
                    <Link className="back" to={`/`} >Back to Parkfinder!</Link>
    </div>
  );
}

export default PageNotFound;


