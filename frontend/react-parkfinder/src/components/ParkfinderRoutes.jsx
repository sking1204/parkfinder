import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Homepage from "./Homepage";   
import LoginForm from "../auth/LoginForm";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";    
import UserProfile from "./UserProfile"; 
import Navigation from "./Navigation"; 
import ParksByState from "./ParksByState"; 
import SelectParks from "./SelectParks";
import ParkDetail from "./ParkDetail";
import FindParks from "./FindParks";
import SignUpForm from "../auth/SignUpForm";
import ParkfinderApi from "../services/ParkfinderApi";
import useLocalStorage from "../hooks/useLocalStorage";  
import ParkReview from "./ParkReview";  
import ReviewsList from "./ReviewsList";  
import SavedItems from "./SavedItems";
import FavoritedParks from "./FavoritedParks" 
import FavoritesList from "./FavoritesList"
import ParksByParkCode from "./ParksByParkCode";
import PageNotFound from "./PageNotFound";




const ParkfinderRoutes = () => { 
    
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
          <Route path="/parks" element={<FindParks user={user} />} />           
          <Route path="/parks/stateCode" element={<ParksByState  />} />           
          <Route path="/parks/parkCode" element={<ParksByParkCode user={user} />} />           
          <Route path="/parks/parkCode" element={<ParksByParkCode />} />
          <Route path="/parks/stateCode/:stateCode" element={<SelectParks user={user} />} />
          <Route path="/parks/parkCode/:parkCode" element={<ParkDetail user={user}  />} />
          <Route path="/parks/parkCode/:parkCode/review" element={<ParkReview />} />
          <Route path="/users/:username/reviews/:parkCode" element={<ParkReview user={user} />} />           
          <Route path="/users/:username/saved-items" element={<SavedItems user ={user}  />} />          
          <Route path="/users/:username/all-saved-favorites" element={<FavoritedParks user ={user}  />} />            
          <Route path="/login" element={<LoginForm setToken={setToken} setUser={setUser}/>} />          
          <Route path="/reviews" element={<ReviewsList />} />         
          <Route path="/users/:username/favorites" element={<FavoritesList user={user} />} />         
          <Route path="/signup" element={<SignUpForm setToken={setToken} setUser={setUser} />} />
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


