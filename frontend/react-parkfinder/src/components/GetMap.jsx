import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import './GetMap.css';
import ParkfinderApi from '../services/ParkfinderApi';



const GetMap = ({ park, user, parkCode }) => {

    const [savedMap, setSavedMap] = useState([]);
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    

    useEffect(() => {
        if (park.latLong) {
            try {
                // Parse the latLong string to extract latitude and longitude
                const latLongString = park.latLong;
                const [latPart, longPart] = latLongString.split(',').map(coord => coord.split(':')[1].trim());
                const latitude = parseFloat(latPart);
                const longitude = parseFloat(longPart);
                setLatitude(latitude);
                setLongitude(longitude);

                var greenIcon = L.icon({
                    iconUrl: 'https://cdn-icons-png.freepik.com/256/149/149059.png?ga=GA1.1.1500839574.1718835439&semt=ais_hybrid', 
                 
                
                    iconSize:     [20, 45], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                
                // Check if latitude and longitude are valid numbers
                if (!isNaN(latitude) && !isNaN(longitude)) {
                    // Initialize the map with the extracted coordinates
                    const map = L.map('map').setView([latitude, longitude], 10);

                

            

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);

                    // L.marker([latitude, longitude]).addTo(map);
                    L.marker([latitude, longitude], {icon: greenIcon}).addTo(map); 
                                       

                    return () => {
                        // Clean up the map instance on component unmount
                        map.remove();
                    };
                } else {
                    console.error('Invalid latitude or longitude values:', latitude, longitude);
                }
            } catch (error) {
                console.error('Error parsing latLong:', error);
            }
        } else {
            console.error('latLong is not defined');
        }
    }, [park]);

    const handleSaveMap = async (event) => {
        const mapData = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),          
         
        };
      
        try {
          await ParkfinderApi.saveMap(user, parkCode, mapData);
          console.log("Event saved to database:", mapData);

          
          setSavedMap([...savedMap, map]);
          setSuccessMessage('Map saved successfully!');
          setIsSubmitted(true); 
          const successTimeout = setTimeout(() => {
            setSuccessMessage('');
        }, 3000); 

        } catch (err) {
          console.error("Error saving map to database:", err);
          setErrorMessage('Failed to save map. Please try again.');
          const failureTimeout = setTimeout(() => {
            setErrorMessage('');
        }, 3000); 

        }
      };

      return (
        <Card sx={{ padding: 2, margin: 2, backgroundColor: '#DCEDC8', width:'1216px' }}>
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: '25px',
                color: '#3B403C',
              }}
            >
              Map - {park.fullName}
            </Typography>
    
        {successMessage && <Typography className="success-message" marginBottom="20px">{successMessage}</Typography>}
        {errorMessage && <Typography className="error-message" marginBottom="20px">{errorMessage}</Typography>}
            
            
    
            <Box id="map" sx={{ height: '100vh', width: '100%', border: '3px solid #bbb8b8' }}>              
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveMap}
              disabled={isSubmitted}
              sx={{ 
                marginTop: '20px'            
               }}
            >
              Save Map!
            </Button>
          </CardContent>
        </Card>
      );
    };
    
    export default GetMap;
    


