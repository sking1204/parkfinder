import React from 'react';
import FavoritedParks from '../components/FavoritedParks';
import { useLocation } from 'react-router-dom';

const FavoritedParksWrapper = () => {
  const location = useLocation();
  const { user, park, parkCode } = location.state || {};

  return (
    <>
      <div>
        <h1>Favorited Parks Wrapper</h1>
      </div>
      <FavoritedParks user={user} park={park} parkCode={parkCode} />
    </>
  );
};

export default FavoritedParksWrapper;