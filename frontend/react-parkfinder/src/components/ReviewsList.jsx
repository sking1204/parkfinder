import React, { useState, useEffect } from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import ReviewCard from './ReviewCard';
import { Card, CardContent, CardMedia,Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
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
    return <div className="no-reviews">No reviews yet!</div>;
  }

//new 8/5
return (
    <Card style={{ marginBottom: '20px', backgroundColor: '#DCEDC8' }}>
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Reviews</Typography>
        {reviews.length > 0 ? (
          <Grid container spacing={3}>
            {reviews.map((review, index) => (
              <ReviewCard
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
          </Grid>
        ) : (
          <Typography>No reviews found.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewsList;



//     return (
//         <div className="reviews-grid">
//             {/* <SearchForm searchFor={search} /> */}
//             {reviews.map(review => (
//                 <ReviewCard 
//                 // parkFullName={park.fullName}
//                 key={review.id}
//                 id={review.id}
//                 park_code={review.park_code}  
//                 title={review.review_title}
//                 description={review.review_data}
//                 created_at={review.created_at}  
//                 rating={review.rating} 
//                 username={review.username}             
                
                
//                 />
//             ))}
//         </div>
//     );
// }

// export default ReviewsList;
