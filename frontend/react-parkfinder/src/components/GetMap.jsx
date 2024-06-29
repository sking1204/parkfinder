import React, { useEffect } from 'react';



const GetMap = ({ park }) => {
    useEffect(() => {
        if (park.latLong) {
            try {
                // Parse the latLong string to extract latitude and longitude
                const latLongString = park.latLong;
                const [latPart, longPart] = latLongString.split(',').map(coord => coord.split(':')[1].trim());
                const latitude = parseFloat(latPart);
                const longitude = parseFloat(longPart);

                var greenIcon = L.icon({
                    iconUrl: 'https://cdn-icons-png.freepik.com/256/149/149059.png?semt=ais_hybrid', // Adjust the path to your images
                    // shadowUrl: 'path/to/leaf-shadow.png', // Adjust the path to your images
                
                    iconSize:     [38, 95], // size of the icon
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

    return (
        // <div id="map" >
        <div id="map" style={{ height: '100vh', width: '100%', border: '3px solid #bbb8b8' }}>
            {/* This is the mapholder component placeholder! */}
        </div>
    );
};

export default GetMap;
