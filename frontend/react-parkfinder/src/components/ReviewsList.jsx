import React, { useState, useEffect } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import ReviewCard from './ReviewCard';
import "./ReviewsList.css";

function ReviewsList({park}) {
    const [reviews, setReviews] = useState([]);


    

    useEffect(() => {
        async function fetchParks() {
            try{
            const fetchedReviews = await ParkfinderApi.getAllReviews();
            console.log("Fetched Reviews:", fetchedReviews.reviews)
            setReviews(fetchedReviews.reviews);
        } catch (err){
            console.error("Error fetching parks: err");
        }
        }

        fetchParks();
        
    }, []);

  /** Triggered by search form submit; reloads companies. */
//   async function search(name) {
//     let companies = await JoblyApi.getCompanies(name);
//     setCompanies(companies);
//   }

if (reviews.length ===0) {
    return <div className="reviews">No reviews yet!</div>;
  }

    return (
        <div className="review-container">
            {/* <SearchForm searchFor={search} /> */}
            {reviews.map(review => (
                <ReviewCard 
                // parkFullName={park.fullName}
                key={review.id}
                id={review.id}
                park_code={review.park_code}  
                title={review.review_title}
                description={review.review_data}
                created_at={review.created_at}  
                rating={review.rating} 
                username={review.username}             
                
                
                />
            ))}
        </div>
    );
}

export default ReviewsList;
