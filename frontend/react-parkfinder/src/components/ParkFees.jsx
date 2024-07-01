import {useState} from 'react';
import ParkfinderApi from '../services/ParkfinderApi';
import './ParkFees.css';

const ParkFees = ({ park, user }) => {
  const [checkedFees, setCheckedFees] = useState(new Set());


  const handleCheckboxChange = (evt) => {
    const { value, checked } = evt.target;
    setCheckedFees((prevCheckedFees) => {
      const newCheckedFees = new Set(prevCheckedFees);
      if (checked) {
        newCheckedFees.add(value);
      } else {
        newCheckedFees.delete(value);
      }
      return newCheckedFees;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert checkedFees to an array of IDs
    const titles = Array.from(checkedFees);
  
    console.log('Selected activities:', titles);
  
    try {
      const response = await ParkfinderApi.saveEntranceFees(user, park.parkCode, { titles });
      console.log('Activities saved successfully:', response);
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  };

  return (
    <div className="park-fees">
      <h2>Entrance Fees</h2>       
      {park.entranceFees.length > 0 ? (
        <form onSubmit={handleSubmit}>
        <ul>
          {park.entranceFees.map((fee, index) => (
            <li key={index}>
              <p>{fee.title} - <strong>${fee.cost}</strong></p>
              <label>
                <input type="checkbox"
                  value={fee.title}
                  onChange={handleCheckboxChange}
                  />
              </label>
            </li>
          ))}
        </ul>
        <button type="submit" className="submit-button">Submit</button>
        </form>
      ) : (
        <p>{park.fullName} is FREE, no entrance pass required!</p>
      )}
    </div>
  );
};

export default ParkFees;

/* Once selected fee, then show description/details */

  {/* <p><strong>Cost:</strong> ${fee.cost}</p>
              <p><strong>Description:</strong> {fee.description}</p> */}
              {/* <p><strong>Title:</strong> {fee.title} - ${fee.cost}</p> */}