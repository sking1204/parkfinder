import React from 'react';
import {Link} from 'react-router-dom';
import './ParkCard.css';


function ParkCard({ id,name,description,image }) {
    return (
        // <Link className="parkcard" to = {`/parks/${company.handle}`}>
        <div className="card">
            <h2>{name}</h2>
            <img className="parkcard-image" width= "300px" src={image} />
            <p>{description}</p>
            {/* <p>{company.description}</p> */}
            

        </div>
        // </Link>
    );
}


export default ParkCard;