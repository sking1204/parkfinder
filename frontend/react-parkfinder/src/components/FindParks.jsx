// import { useContext } from "react";
import "./Homepage.css"
import ParksByState from "./ParksByState";
import ParksByParkCode from "./ParksByParkCode";
// import TokenContext from "../contexts/TokenContext";
// import UserContext from "../contexts/UserContext";

const FindParks = ({user}) =>{  
    
    
    return(
        <>
        <ParksByState user={user}  />
        <ParksByParkCode user={user} />
        
        </>
    )
}

export default FindParks;




// import { useContext } from "react";
// import "./Homepage.css"
// import ParksByState from "./ParksByState";
// import ParksByParkCode from "./ParksByParkCode";
// import TokenContext from "../contexts/TokenContext";
// import UserContext from "../contexts/UserContext";

// const FindParks = () =>{
//     const token = useContext(TokenContext);
//     const { user, setUser } = useContext(UserContext);
//     return(
//         <>
//         <ParksByState />
//         <ParksByParkCode />
        
//         </>
//     )
// }

// export default FindParks;