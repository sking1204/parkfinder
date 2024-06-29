import "./Homepage.css"
import ParksByState from "./ParksByState";
import ParksByParkCode from "./ParksByParkCode";

const FindParks = () =>{
    return(
        <>
        <ParksByState />
        <ParksByParkCode />
        
        </>
    )
}

export default FindParks;