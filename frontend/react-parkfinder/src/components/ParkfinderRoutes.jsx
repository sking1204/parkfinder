import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Homepage from "./Homepage";
import ParksList from "./ParksList";
import StateCodeSearch from "../Old-UnusedComponents/StateCodeSearch";
import ParkCodeSearch from "./SelectParkResultsCard";
import LoginForm from "../auth/LoginForm";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";



import UserProfile from "./UserProfile";

import Navigation from "./Navigation";
import PlanTrip from "../Old-UnusedComponents/PlanTrip";
import ParksByState from "./ParksByState";
import SelectParkResultsCard from "./SelectParkResultsCard";
import SelectParks from "./SelectParks";
import ParkDetail from "./ParkDetail";
import FindParks from "./FindParks";
import SignUpForm from "../auth/SignUpForm";
import ParkfinderApi from "../services/ParkfinderApi";
import useLocalStorage from "../hooks/useLocalStorage";
import TripPlannerForm from "../Old-UnusedComponents/TripPlannerForm";
import ParksByName from "./ParksByName";
import ParkReview from "./ParkReview"; 
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import SavedEvents from "./SavedEvents";
import ParkForm from "./ParkForm";
import SavedItems from "./SavedItems";
import FavoritedParks from "./FavoritedParks"
import FavoritedParksWrapper from "./FavoritedParksWrapper";
import FavoritesList from "./FavoritesList"
import ParksByParkCode from "./ParksByParkCode";
import PageNotFound from "./PageNotFound";




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
          {/* <Route path="/" element={<Homepage user={user} />} /> */}
          <Route path="/" element={<Homepage user={user} />} />
          {/* <Route path="/parks" element={<FindParks token={token} user={user} setUser={setUser} />} /> */}
          <Route path="/parks" element={<FindParks user={user}/>} />
          {/* <Route path="/parks" element={<ParksList />} /> */}
          {/* HARDCODING THIS TO FL PARKS FOR NOW... */}
          {/* <Route path="/parks/FL-parks" element={<ParksList />} /> */}
          <Route path="/parks/stateCode" element={<ParksByState  />} />
          <Route path="/parks/parkCode" element={<ParksByParkCode user={user} />} />
          <Route path="/parks/stateCode/:stateCode" element={<SelectParks user={user} />} />
          <Route path="/parks/parkCode/:parkCode" element={<ParkDetail user={user}  />} />
          <Route path="/parks/parkCode/:parkCode/review" element={<ParkReview />} />
          <Route path="/users/:username/reviews/:parkCode" element={<ParkReview user={user} />} />
          <Route path="/users/:username/leave-review" element={<ParksByName  />} />
          <Route path="/users/:username/saved-items" element={<SavedItems user ={user}  />} />          
          <Route path="/users/:username/all-saved-favorites" element={<FavoritedParks user ={user}  />} />           
          {/* <Route path="/users/:username/favorites" element={<FavoritedParksWrapper user={user}  />} />            */}
                     
          {/* <Route path="/plan-trip" element={<TripPlannerForm />} /> */}
          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/park-form" element={<ParkForm />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setUser={setUser}/>} />
          {/* <Route path="/saved-trips" element={<SavedTrips />} /> */}
          {/* <Route path="/saved-trips" element={<PlanTrip />} /> */}
          {/* <Route path="/reviews" element={<ParkReviewForm user={user} />} /> */}
           <Route path="/reviews" element={<ReviewsList />} />
           {/* OLD */}
           {/* <Route path="/users/:username/favorites" element={<FavoritesList />} /> */}
           {/* NEW */}
            <Route path="/users/:username/favorites" element={<FavoritesList user={user} />} />
          <Route path="/review-park" element={<ParksByName/>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/users/:username/profile" element={<UserProfile user={user} setUser={setUser} setToken={setToken} />} />
          <Route path="*" element={<PageNotFound />} />
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
