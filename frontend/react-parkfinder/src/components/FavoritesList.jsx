import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ParkfinderApi from '../services/ParkfinderApi';
import FavoriteCard from './FavoriteCard';

function FavoritesList() {
    const [favorites, setFavorites] = useState([]);
    const { user } = useContext(UserContext); 


    

    useEffect(() => {
        async function fetchFavorites() {
            try{
            const fetchedFavorites = await ParkfinderApi.getFavoritesByUsername(user.username);
            console.log("Fetched Favorites:", fetchedFavorites.userFavorite)
            setFavorites(fetchedFavorites.userFavorite);
        } catch (err){
            console.error("Error fetching favorites: err");
        }
        }

        fetchFavorites();
        
    }, []);

  /** Triggered by search form submit; reloads companies. */
//   async function search(name) {
//     let companies = await JoblyApi.getCompanies(name);
//     setCompanies(companies);
//   }

    return (
        <div className="card-container">
            {/* <SearchForm searchFor={search} /> */}
            {favorites.map(favorite => (
                <FavoriteCard 
                // parkFullName={park.fullName}
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
    );
}

export default FavoritesList;
