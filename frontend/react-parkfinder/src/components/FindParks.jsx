import { useContext } from "react";
// import "./Homepage.css"

import ParksByState from "./ParksByState";
import ParksByParkCode from "./ParksByParkCode";
import { useState } from "react";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";

const FindParks = ({ user }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  return (
    <>
      {selectedCode === "" && (
        <ParksByState 
          user={user}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      )}
      {selectedState === "" && (
        <ParksByParkCode 
          user={user}
          selectedCode={selectedCode}
          setSelectedCode={setSelectedCode}
        />
      )}
      {selectedState === "" && selectedCode === "" && (
        <div className="img-container">
          <img src="../src/assets/background.jpg" alt="" />
        </div>
      )}
    </>
  );
};

export default FindParks;

//old
// const FindParks = ({user}) =>{  
//     const [selectedState,setSelectedState] = useState("");
//     const [selectedCode,setSelectedCode] = useState("");
//     const [showParksByState, setShowParksByState] = useState(false);
    
    
//     return(
//         <>
//         <ParksByState 
//         user={user}
//         // selectedState={selectedState}
//         // setSelectedState={setSelectedState}
//           />
//         <ParksByParkCode user={user} 
     
        
//         />
//         {selectedState  === "" && selectedCode === "" && (
//         <div className="img-container">
//           <img src="../src/assets/background.jpg" alt="" />
//         </div>
//         )}                     
                       
        
//         </>
//     );
// };

// export default FindParks;




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