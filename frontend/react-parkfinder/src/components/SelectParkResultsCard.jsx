import React from 'react';
import {Link} from 'react-router-dom';
import ParkfinderRoutes from './ParkfinderRoutes';
import './SelectParkResultsCard.css'

function SelectParkResultsCard({ park, onClick }) {
    return (
        // <Link className="parkcard" to = {`/parks/${company.handle}`}>
        <div className="card" onClick ={() =>onClick(park.parkCode)}>
            <h2>{park.fullName}</h2>
            <div>
                <h3>Park Code: {park.parkCode}</h3>
            </div>

            <img width= "200px" src={park.images[0].url} />
            <p>{park.description}</p>
            {/* <p>{company.description}</p> */}
            

        </div>
        // </Link>
    );
}


export default SelectParkResultsCard;

// return (
//     <>
//       <h1>Parks in {selectedState}:</h1>
//       <div className="selected-states-park-list">
//         {parks.map((park) => (
//           <Link key={park.parkCode} className="companycard" to={`/parks/parkCode/${park.parkCode}`}>
//             <div className="card">             
//               <h2>{park.fullName}</h2>
//               <p>{park.description}</p>
//               <img width = "200px" src={park.images[0].url}/>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
//   }
  