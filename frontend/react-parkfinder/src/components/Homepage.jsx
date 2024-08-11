import {Link} from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import FindParks from "./FindParks";
import ParksByState from "./ParksByState";
import ParksByParkCode from "./ParksByParkCode";
import FormTextArea from "./ReviewForm";
import "./Homepage.css"


const Homepage = ({ user }) => {
    return (
        <>
         
            {user ? (
                <div className="homepage-logged-in">
                    <h1 className="homepage-header">Welcome, {user.username}!</h1>
                      <div>
                    <Link className="parks-link" to={`/parks`}>Click here to find a park!</Link>
                    </div>
                    <div className="image-card-container">
                <Card sx={{ maxWidth: 800,
                            margin: 'auto', 
                            marginTop: 4,
                            boxShadow: '0px 4px 10px #558B2F', 
                            backgroundColor:'#F1F8E9',
                             }}>
                    <CardMedia
                        component="img"
                        height="450"
                        image="/assets/background.jpg" 
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
                            Photo by <a href="https://unsplash.com/@skamenar">Steven Kamenar</a> on <a href="https://unsplash.com/">Unsplash</a>
                        </Typography>
                    </CardContent> 
                    </Card>
                    </div>         
                   
                </div>                
            ) : (
                <>
                <div className="homepage">
                    <h1 className="homepage-header">Welcome to Parkfinder!</h1>
                    <h4 className="homepage-login">Login or signup to find a park!</h4>
                </div>
                <div className="image-card-container">
                <Card sx={{ maxWidth: 800,
                            margin: 'auto', 
                            marginTop: 4,
                            boxShadow: '0px 4px 10px #558B2F', 
                            backgroundColor:'#F1F8E9',
                             }}>
                    <CardMedia
                        component="img"
                        height="450"
                        image="/assets/background.jpg" 
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
                            Photo by <a href="https://unsplash.com/@skamenar">Steven Kamenar</a> on <a href="https://unsplash.com/">Unsplash</a>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
                </>

                
            )}      
            </>         
    );
};

export default Homepage;  