import { useContext } from "react";


import ParksByState from "./ParksByState";
import ParksByParkCode from "./ParksByParkCode";
import { useState } from "react";

import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import "./FindParks.css";


const FindParks = ({user}) =>{  
    const [selectedState,setSelectedState] = useState("");
    const [selectedCode,setSelectedCode] = useState("");
    const [showParksByState, setShowParksByState] = useState(false);
    
    
    return(
        <>
        <ParksByState 
        user={user}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
          />
        <ParksByParkCode user={user} 
        selectedCode={selectedCode}
        setSelectedCode={setSelectedCode}
     
        
        />
        {selectedState  === "" && selectedCode === "" && (
        <div className="img-container">
          <img src="/assets/background.jpg" alt="" />
        </div>
        )}                     
                       
        
        </>
    );
};

export default FindParks;

//old
// const FindParks = ({ user }) => {
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCode, setSelectedCode] = useState("");

//   return (
//     <>
      
//         <ParksByState 
//           user={user}
//           selectedState={selectedState}
//           setSelectedState={setSelectedState}
//         />
      

      
//         <ParksByParkCode 
//           user={user}
//           selectedCode={selectedCode}
//           setSelectedCode={setSelectedCode}
//         />
      
//       {selectedState === "" && selectedCode === "" && (
//         <div className="img-container">
//           <img src="../src/assets/background.jpg" alt="" />
//         </div>
//       )}
//     </>
//   );
// };

// export default FindParks;

// const FindParks = ({ user }) => {
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCode, setSelectedCode] = useState("");

//   return (
//     <>
//       {selectedCode === "" && (
//         <ParksByState 
//           user={user}
//           selectedState={selectedState}
//           setSelectedState={setSelectedState}
//         />
//       )}

//       {/* Need to figure out loading issue with parksbyparkcode display error message "Error loading park details" even after data has completely loaded */}
//       {selectedState === "" && (
//         <ParksByParkCode 
//           user={user}
//           selectedCode={selectedCode}
//           setSelectedCode={setSelectedCode}
//         />
//       )}
//       {selectedState === "" && selectedCode === "" && (
//         <div className="img-container">
//           <img src="../src/assets/background.jpg" alt="" />
//         </div>
//       )}
//     </>
//   );
// };

// export default FindParks;

//old


//old


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