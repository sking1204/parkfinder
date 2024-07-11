import React, { useState, useContext } from 'react';
import ParksByName from '../components/ParksByName';
import ParkForm from '../components/ParkForm';
import SavedEvents from '../components/SavedEvents';
import UserContext from '../contexts/UserContext';


const PlanTrip = () => {
  const [selectedPark, setSelectedPark] = useState({ name: "", code: "" });
  const { user } = useContext(UserContext); 

  const handleParkSelect = (name, code) => {
    setSelectedPark({ name, code });
  };

  return (
    <>
    <div>
      <ParksByName onParkSelect={handleParkSelect} />
      {selectedPark.name && selectedPark.code && (
        <ParkForm selectedName={selectedPark.name} selectedCode={selectedPark.code} />
      )}
    </div>
    <div>
      <SavedEvents user={user} />
    </div>
    </>
  );
};

export default PlanTrip;