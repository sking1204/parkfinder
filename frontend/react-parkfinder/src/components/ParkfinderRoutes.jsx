import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Homepage from "./Homepage";
import ParksList from "./ParksList";
import StateCodeSearch from "./StateCodeSearch";
import ParkCodeSearch from "./SelectParkResultsCard";
import LoginForm from "../auth/LoginForm";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";



import UserProfile from "./UserProfile";
import SavedTrips from "./SavedTrips";
import Navigation from "./Navigation";
import PlanTrip from "./PlanTrip";
import ParksByState from "./ParksByState";
import SelectParkResultsCard from "./SelectParkResultsCard";
import SelectParks from "./SelectParks";
import ParkDetail from "./ParkDetail";
import FindParks from "./FindParks";
import SignUpForm from "../auth/SignUpForm";
import ParkfinderApi from "../services/ParkfinderApi";
import useLocalStorage from "../hooks/useLocalStorage";
import TripPlannerForm from "./TripPlannerForm";
import ParksByName from "./ParksByName";
import ParkReviewForm from "./ParkReviewForm";
import Placeholder from "./Placeholder";
import FormTextArea from "./FormTextArea";
import ReviewsList from "./ReviewsList";
import SavedEvents from "./SavedEvents";
import ParkForm from "./ParkForm";




const ParkfinderRoutes = () => {

    // const [token, setToken] = useState([]);
    const [token, setToken] = useLocalStorage('token', null);
    const [user, setUser] = useState(null);
   
    
    useEffect( () => {
      async function getCurrentUser() {
          if(!token) return;
          if(!ParkfinderApi.token) {
              ParkfinderApi.token = token;
          }
          try {
              console.log("TOKEN", token);
              const decoded = jwtDecode(token);
              let res = await ParkfinderApi.getUser(decoded.username);
              setUser(res);               
          } catch(error) {
              console.error(error);
          }
      }
      getCurrentUser();
  }, [token]);
    return (
      <BrowserRouter>
        <Navigation user={user} setToken={setToken} setUser={setUser} />
        <main>
        <TokenContext.Provider value={token}>
        <UserContext.Provider 
        value={{user, setUser}}> 
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          <Route path="/parks" element={<FindParks />} />
          {/* <Route path="/parks" element={<ParksList />} /> */}
          {/* HARDCODING THIS TO FL PARKS FOR NOW... */}
          <Route path="/parks/FL-parks" element={<ParksList />} />
          <Route path="/parks/stateCode" element={<ParksByState user={user} />} />
          <Route path="/parks/stateCode/:stateCode" element={<SelectParks user={user} />} />
          <Route path="/parks/parkCode/:parkCode" element={<ParkDetail  />} />
          <Route path="/parks/parkCode/:parkCode/review" element={<ParkReviewForm />} />
          <Route path="/users/:username/reviews/:parkCode" element={<ParkReviewForm />} />
          <Route path="/users/:username/leave-review" element={<ParksByName  />} />
          {/* <Route path="/plan-trip" element={<TripPlannerForm />} /> */}
          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/park-form" element={<ParkForm />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setUser={setUser}/>} />
          {/* <Route path="/saved-trips" element={<SavedTrips />} /> */}
          <Route path="/saved-trips" element={<PlanTrip />} />
          {/* <Route path="/reviews" element={<ParkReviewForm user={user} />} /> */}
           <Route path="/reviews" element={<ReviewsList />} />
          <Route path="/review-park" element={<ParksByName/>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/profile" element={<UserProfile user={user} setUser={setUser} />} />
        </Routes>
        </UserContext.Provider>
        </TokenContext.Provider>
        </main>
      </BrowserRouter>
    );
  };
  
  export default ParkfinderRoutes;


// const ParkfinderRoutes = () =>{
//     return(
//         <BrowserRouter>
//         <Navigation />
//         <Routes>
//             <Route path="/" element = {<Homepage />} />
//         </Routes>
//         <Routes>
//             <Route path="/parks" element = {<FindParks />} />
//         </Routes>
//         {/* <Routes>
//             <Route path="/parks" element = {<ParksList />} />
//         </Routes> */}
//         {/* HARDCODING THIS TO FL PARKS FOR NOW... */}
//         <Routes>
//             <Route path="/parks/FL-parks" element = {<ParksList />} />
//         </Routes>
//         <Routes>
//             <Route path="/parks/stateCode" element = {<ParksByState />} />
//         </Routes>
//         <Routes>
//             <Route path="/parks/stateCode/:stateCode" element = {<SelectParks />} />
//         </Routes>
//         <Routes>
//             <Route path="/parks/parkCode/:parkCode" element = {<ParkDetail />} />
//         </Routes>
//         <Routes>
//             <Route path="/plan-trip" element = {<PlanTrip />} />
//         </Routes>
//         <Routes>
//             <Route path="/login" element = {<LogIn />} />
//         </Routes>
//         <Routes>
//             <Route path="/saved-trips" element = {<SavedTrips />} />
//         </Routes>
//         <Routes>
//             <Route path="/signup" element = {<SignUp />} />
//         </Routes>
//         <Routes>
//             <Route path="/profile" element = {<UserProfile />} />
//         </Routes>
//         </BrowserRouter>
//     )
// }

// export default ParkfinderRoutes;
