import React from 'react';
import {Link} from 'react-router-dom';
import "./FavoriteCard.css";

function FavoriteCard({ id,park_code,description,park_name,created_at,username,image }) {
    return (
        // <Link className="parkcard" to = {`/parks/${company.handle}`}>
        <div className="card">
            <h1>{username}'s Favorites</h1>
           
            {/* <h1>Park: {parkFullName}</h1> */}
            <h1>Park Name:{park_name} - ParkCode : {park_code}</h1>                         
            <h2>Description:{description}</h2> 
            <p>Review:{description}</p> 
            <img src={image} width="400px" alt={park_name} />  
            <h5>Created At:{created_at}</h5>           
            
            {/* <p>{company.description}</p> */}
            

        </div>
        // </Link>
    );
}


export default FavoriteCard;