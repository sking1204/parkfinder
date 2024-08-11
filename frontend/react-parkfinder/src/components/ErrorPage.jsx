import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Card,CardContent, CardMedia } from "@mui/material";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "An unknown error occurred.";

  return (
    <div>
       <Typography variant="h5" color="#FF1744" marginBottom="20px">{message}</Typography>
      <div className="image-card-container">
                <Card sx={{ maxWidth: 800,
                            margin: 'auto', 
                            marginTop: 4,
                            borderRadius: '5px'
                            
                           
                             }}>
                    <CardMedia
                        component="img"
                        height="450"
                        image="assets/errorimage.jpg" 
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
                            <a href="https://www.freepik.com/free-vector/sauce-tree-concept-illustration_31746148.htm#fromView=search&page=1&position=21&uuid=313f47cc-aa72-43de-badf-e7930ee96841">Image by storyset on Freepik</a>
                        </Typography>
                    </CardContent> 
                    </Card>
                    </div>         
     
      <Button onClick={() => navigate("/")}>Go Back to Home</Button>
    </div>
  );
}

export default ErrorPage;