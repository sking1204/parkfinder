import "./Homepage.css"
import {Link} from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import FindParks from "./FindParks";
import ParksByState from "./ParksByState";
import ParksByParkCode from "./ParksByParkCode";
import FormTextArea from "./ReviewForm";

const Homepage = ({ user }) => {
    return (
        <>
            {/* <ParksByState />
            <ParksByParkCode /> */}
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
                            boxShadow: '0px 4px 10px #558B2F)', // Custom colored box shadow
                            backgroundColor:'#F1F8E9',
                             }}>
                    <CardMedia
                        component="img"
                        height="450"
                        image="../src/assets/background.jpg" // Ensure the path is correct
                        alt="Park image"
                        sx={{
                            // border: '5px solid #C5E1A5', /* Add border */
                            borderRadius: '2px', /* Optional: rounded corners */
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
                    {/* <div>
                    <Link className="parks-link" to={`/parks`}>Click here to find a park!</Link>
                    </div> */}
                    {/* <div>
                        <FindParks/>
                    </div> */}
                    {/* <div className="img-container">
                        <img src="../src/assets/background.jpg" alt="" />
                    </div> */}
                    
            
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
                            boxShadow: '0px 4px 10px #558B2F)', // Custom colored box shadow
                            backgroundColor:'#F1F8E9',
                             }}>
                    <CardMedia
                        component="img"
                        height="450"
                        image="../src/assets/background.jpg" // Ensure the path is correct
                        alt="Park image"
                        sx={{
                            // border: '5px solid #C5E1A5', /* Add border */
                            borderRadius: '2px', /* Optional: rounded corners */
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
           
            {/* <div>
                <img className="homepage-img" src='../src/assets/background.jpg' alt="Park image" />
                <div>
                Photo by <a href="https://unsplash.com/@skamenar">Steven Kamenar</a> on <a href="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">Unsplash</a>
                    {/* Photo by <a href="https://unsplash.com/@eberhardgross?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">eberhard 🖐 grossgasteiger</a> on <a href="https://unsplash.com/photos/a-mountain-is-reflected-in-the-still-water-of-a-lake-l4xUUnampgU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
                {/* </div>
            </div>  */}
            
            </>



        
    );
};

export default Homepage;

// const Homepage = ({user}) =>{
//     return(
//         <>

//         {/* <ParksByState />
//         <ParksByParkCode /> */}
//         <div className="homepage-login-msg">current user : {user.username}</div>



//         <div className="homepage">
//             <h1 className="homepage-header">Welcome to Parkfinder!</h1>            
//             {!user && <h4>Login or signup to find a park!</h4>}
//         </div>
//         {/* <div>
//             <FormTextArea />
//         </div> */}
//         <div>
//         <img className="homepage-img" src='../src/assets/background3.jpg' alt="Park image" />
//         <div>
//         Photo by <a href="https://unsplash.com/@eberhardgross?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">eberhard 🖐 grossgasteiger</a> on <a href="https://unsplash.com/photos/a-mountain-is-reflected-in-the-still-water-of-a-lake-l4xUUnampgU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
//         </div>
//         </div>
//         </>
//     )
// }

// export default Homepage;