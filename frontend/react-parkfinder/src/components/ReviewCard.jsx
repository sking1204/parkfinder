import React from 'react';
import {Link} from 'react-router-dom';
import "./ReviewCard.css";

function ReviewCard({ id,park_code,username,title,description,rating, created_at }) {
    return (
        // <Link className="parkcard" to = {`/parks/${company.handle}`}>
        <div className="card">
            <h1>Park Code:{park_code}</h1>
            {/* <h1>Park: {parkFullName}</h1> */}
            <h2>Review Title:{title}</h2>             
            <h4>Reviewed by: {username}</h4>
            <p>Review:{description}</p> 
            <h4>Rating:{rating}</h4> 
            <h5>Created At: {created_at}</h5>           
            
            {/* <p>{company.description}</p> */}
            

        </div>
        // </Link>
    );
}


export default ReviewCard;