import "./Homepage.css"
import ParksByState from "./ParksByState";
import ParksByParkCode from "./ParksByParkCode";
import FormTextArea from "./FormTextArea";

const Homepage = () =>{
    return(
        <>

        {/* <ParksByState />
        <ParksByParkCode /> */}
        <div className="homepage">
            <h1 className="homepage-header">This is the homepage placeholder!</h1>
        </div>
        <div>
            <FormTextArea />
        </div>
        </>
    )
}

export default Homepage;