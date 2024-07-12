import "./Homepage.css"
import {Link} from "react-router-dom";
import ParksByState from "./ParksByState";
import ParksByParkCode from "./ParksByParkCode";
import FormTextArea from "./ReviewForm";

const Homepage = ({ user }) => {
    return (
        <>
            {/* <ParksByState />
            <ParksByParkCode /> */}
            {user ? (
                <div className="homepage">
                    <h1 className="homepage-header">Welcome, {user.username}!</h1>
                    <div>
                    <Link className="parks-link" to={`/parks`}>Click here to find a park!</Link>
                    </div>
                    </div>                
            ) : (
                <div className="homepage">
                    <h1 className="homepage-header">Welcome to Parkfinder!</h1>
                    <h4>Login or signup to find a park!</h4>
                </div>
            )}

            {/* <div>
                <FormTextArea />
            </div> */}
            <div>
                <img className="homepage-img" src='../src/assets/background3.jpg' alt="Park image" />
                <div>
                    Photo by <a href="https://unsplash.com/@eberhardgross?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">eberhard 🖐 grossgasteiger</a> on <a href="https://unsplash.com/photos/a-mountain-is-reflected-in-the-still-water-of-a-lake-l4xUUnampgU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                </div>
            </div>
        </>
    );
};

export default Homepage;

// const Homepage = ({user}) =>{
//     return(
//         <>

//         {/* <ParksByState />
//         <ParksByParkCode /> */}
//         <div className="homepage-login-msg">current user : {user.username}</div>



//         <div className="homepage">
//             <h1 className="homepage-header">Welcome to Parkfinder!</h1>            
//             {!user && <h4>Login or signup to find a park!</h4>}
//         </div>
//         {/* <div>
//             <FormTextArea />
//         </div> */}
//         <div>
//         <img className="homepage-img" src='../src/assets/background3.jpg' alt="Park image" />
//         <div>
//         Photo by <a href="https://unsplash.com/@eberhardgross?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">eberhard 🖐 grossgasteiger</a> on <a href="https://unsplash.com/photos/a-mountain-is-reflected-in-the-still-water-of-a-lake-l4xUUnampgU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
//         </div>
//         </div>
//         </>
//     )
// }

// export default Homepage;