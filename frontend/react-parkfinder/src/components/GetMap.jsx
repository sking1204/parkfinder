import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import './GetMap.css';
import ParkfinderApi from '../services/ParkfinderApi';


const GetMap = ({ park, user, parkCode }) => {

    const [savedMap, setSavedMap] = useState([]);
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState([]);

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
                    iconUrl: 'https://cdn-icons-png.freepik.com/256/149/149059.png?ga=GA1.1.1500839574.1718835439&semt=ais_hybrid', // Adjust the path to your images
                    // iconUrl: 'https://cdn-icons-png.freepik.com/256/149/149059.png?semt=ais_hybrid', // Adjust the path to your images
                    // shadowUrl: 'path/to/leaf-shadow.png', // Adjust the path to your images
                
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

                 // Add the circle
                //  L.circle([latitude, longitude], {
                //     color: 'red',
                //     fillColor: '#f03',
                //     fillOpacity: 0.5,
                //     radius: 500
                // }).addTo(map);                             

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
          latitude: latitude,
          longitude: longitude
         
         
          // cost: event.cost
          // date: event.selectedDate // Assuming you capture and pass the selected date
        };
      
        try {
          await ParkfinderApi.saveMap(user, parkCode, mapData);
          console.log("Event saved to database:", mapData);
          setSavedMap([...savedMap, map]);
        } catch (err) {
          console.error("Error saving event to database:", err);
        }
      };
    

    return (
        // <div id="map" >
        <>
        <div id="map" style={{ height: '100vh', width: '100%', border: '3px solid #bbb8b8' }}>
            {/* This is the mapholder component placeholder! */}
        </div>
        <div>
        <Button className="submit-button"onClick={handleSaveMap}> Save Map !</Button>
        </div>
        </>
    );
};

export default GetMap;
