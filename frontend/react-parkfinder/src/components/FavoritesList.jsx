import React, { useState, useEffect} from 'react';
import {Typography} from '@mui/material'; 
import ParkfinderApi from '../services/ParkfinderApi';
import FavoriteCard from './FavoriteCard';
import './FavoriteCard.css'

function FavoritesList({ user }) {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      async function fetchFavorites() {
        try {
          const fetchedFavorites = await ParkfinderApi.getFavoritesByUsername(user.username);
          console.log("Fetched Favorites:", fetchedFavorites.userFavorite);
          setFavorites(fetchedFavorites.userFavorite);
        } catch (err) {
          console.error("Error fetching favorites:", err);
        }
      }
  
      if (user && user.username) {
        fetchFavorites();
      }
    }, [user]);
  
    if (favorites.length === 0) {
      return <div className="no-favorites">No favorites yet!</div>;
    }
  
    return (
        <>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Favorites</Typography>
      <div className="favorites-grid">
        {favorites.map(favorite => (
          <FavoriteCard
            key={favorite.id}
            id={favorite.id}
            park_code={favorite.park_code}
            description={favorite.park_description}
            park_name={favorite.park_full_name}
            created_at={favorite.created_at}
            username={favorite.username}
            image={favorite.park_image_url}
          />
        ))}
      </div>
      </>
    );
  }
  
  export default FavoritesList;


  //OLD CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//orig

// function FavoritesList({user}) {
//     const [favorites, setFavorites] = useState([]);
//     // const { user } = useContext(UserContext); 


    

//     useEffect(() => {
//         async function fetchFavorites() {
//             try{
//             const fetchedFavorites = await ParkfinderApi.getFavoritesByUsername(user.username);
//             console.log("Fetched Favorites:", fetchedFavorites.userFavorite)
//             setFavorites(fetchedFavorites.userFavorite);
//         } catch (err){
//             console.error("Error fetching favorites: err");
//         }
//         }

//         fetchFavorites();
        
//     }, []);

//   /** Triggered by search form submit; reloads companies. */
// //   async function search(name) {
// //     let companies = await JoblyApi.getCompanies(name);
// //     setCompanies(companies);
// //   }

// if (favorites.length ===0) {
//     return <div className="reviews">No favorites yet!</div>;
//   }




//     return (
//         <>
//         <div className="card-container">
//             {/* <SearchForm searchFor={search} /> */}
//             {favorites.map(favorite => (
//                 <FavoriteCard 
//                 // parkFullName={park.fullName}
//                 key={favorite.id}
//                 id={favorite.id}
//                 park_code={favorite.park_code}  
//                 description={favorite.park_description}
//                 park_name={favorite.park_full_name}
//                 created_at={favorite.created_at}  
//                 username={favorite.username}             
//                 image={favorite.park_image_url}             
                
                
//                 />
//             ))}
//         </div>
        
//         </>
//     );
// }

// export default FavoritesList;

  //new with grid
//   return (
//     <Container>
//         <Grid container spacing={4}>
//             {favorites.map(favorite => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={favorite.id}>
//                     <FavoriteCard
//                         id={favorite.id}
//                         park_code={favorite.park_code}
//                         description={favorite.park_description}
//                         park_name={favorite.park_full_name}
//                         created_at={favorite.created_at}
//                         username={favorite.username}
//                         image={favorite.park_image_url}
//                     />
//                 </Grid>
//             ))}
//         </Grid>
//     </Container>
// );
// }

// export default FavoritesList;


  //old
