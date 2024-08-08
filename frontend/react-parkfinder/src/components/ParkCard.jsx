import React from 'react';  

function ParkCard({ id,name,description,image }) {
    return (         
        <div className="card">
            <h2>{name}</h2>
            <img className="parkcard-image" width= "300px" src={image} />
            <p>{description}</p>   
        </div>
        
    );
}


export default ParkCard;