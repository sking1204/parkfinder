import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ParkfinderApi from '../services/ParkfinderApi';

const INITIAL_STATE = {
    parkName: '',
    activities: '',
    events: '',
    thingsToDo: ''
};

const TripPlannerForm = () => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [parks, setParks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parksData = await ParkfinderApi.getAllParksForForm();
                setParks(parksData);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            console.log('Form submitted:', formData);
            navigate('/');
        } catch (err) {
            console.error('Error during form submission:', err);
            alert('Failed to submit form');
        }
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));
    };

    return (
        <>
            <h1>Plan Your Trip</h1>
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="form-style"
            >
                <Select
                    label="Park Name"
                    fullWidth
                    margin="normal"
                    id="parkName"
                    name="parkName"
                    value={formData.parkName}
                    onChange={handleChange}
                    className="formField"
                >
                    {parks.map((park) => (
                        <MenuItem key={park.parkCode} value={park.fullName}>
                            {park.fullName}
                        </MenuItem>
                    ))}
                </Select>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    className="submitButton"
                >
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default TripPlannerForm;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';

// import ParkfinderApi from '../services/ParkfinderApi';


// const INITIAL_STATE = {
//     parkName: '',
//     activities: '',
//     events: '',
//     thingsToDo: ''
// };

// const TripPlannerForm = () => {
//     const [formData, setFormData] = useState(INITIAL_STATE);
//     const [parks, setParks] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchParks = async () => {
//             try {
//                 const parksData = await ParkfinderApi.getAllParks();
//                 setParks(parksData);
//             } catch (err) {
//                 console.error('Error fetching parks:', err);
//             }
//         };

//         fetchParks();
//     }, []);

//     const handleSubmit = async (evt) => {
//         evt.preventDefault();
//         try {
//             // Handle form submission logic
//             console.log('Form submitted:', formData);
//             navigate('/');
//         } catch (err) {
//             console.error('Error during form submission:', err);
//             alert('Failed to submit form');
//         }
//     };

//     const handleChange = (evt) => {
//         const { name, value } = evt.target;
//         setFormData((formData) => ({
//             ...formData,
//             [name]: value
//         }));
//     };

//     return (
//         <>
//             <h1>Plan Your Trip</h1>
//             <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 className="form-style"
//             >
//                 <TextField
//                     label="Park Name"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     id="parkName"
//                     name="parkName"
//                     value={formData.parkName}
//                     onChange={handleChange}
//                     className="formField"
//                 />
//                 <TextField
//                     label="Activities"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     id="activities"
//                     name="activities"
//                     value={formData.activities}
//                     onChange={handleChange}
//                     className="formField"
//                 />
//                 <TextField
//                     label="Events"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     id="events"
//                     name="events"
//                     value={formData.events}
//                     onChange={handleChange}
//                     className="formField"
//                 />
//                 <TextField
//                     label="Things To Do"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     id="thingsToDo"
//                     name="thingsToDo"
//                     value={formData.thingsToDo}
//                     onChange={handleChange}
//                     className="formField"
//                 />
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     fullWidth
//                     className="submitButton"
//                 >
//                     Submit
//                 </Button>
//             </Box>
//         </>
//     );
// };

// export default TripPlannerForm;






