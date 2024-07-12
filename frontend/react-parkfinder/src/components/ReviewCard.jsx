import React from 'react';
import {Link} from 'react-router-dom';
import "./ReviewCard.css";

function ReviewCard({ id,park_code,username,title,description,rating, created_at }) {
    return (
        // <Link className="parkcard" to = {`/parks/${company.handle}`}>
        <div className="card">
            <h1>Title: {title}</h1>
            <h2>Reviewed by: {username}</h2>
            <h4>Park Code:{park_code}</h4>
            {/* <h1>Park: {parkFullName}</h1> */}
                         
            
            <p>Review:{description}</p> 
            <h2>Rating:{rating}</h2> 
            <h5>Created At: {created_at}</h5>           
            
            {/* <p>{company.description}</p> */}
            

        </div>
        // </Link>
    );
}


export default ReviewCard;