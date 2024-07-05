import {useState} from 'react';
import { Link } from "react-router-dom";
import ParkfinderApi from '../services/ParkfinderApi';
import './ParkFees.css';

const ParkFees = ({ park, user }) => {
  const [checkedFees, setCheckedFees] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);


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

    // Clear any previous messages
    setSuccessMessage('');
    setErrorMessage('');

     // Check if any fees are selected
     if (checkedFees.size === 0 ) {
      setErrorMessage('Please make at least one selection.');
      return;
    }
  
    // Convert checkedFees to an array of IDs
    const titles = Array.from(checkedFees);
  
    console.log('Selected activities:', titles);
  
    try {
      const response = await ParkfinderApi.saveEntranceFees(user, park.parkCode, { titles });
      console.log('Activities saved successfully:', response);
      setSuccessMessage('Activities saved successfully!');
      setIsSubmitted(true); // Set submission status to true
    } catch (error) {
      console.error('Error saving activities:', error);
      setSuccessMessage('Failed to save activities. Please try again.');
    }
  };

  const handleBackClick = () => {
    setShowActivities(false);
  };

  return (
    <>
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
        <form onSubmit={handleSubmit}>
            <p>{park.fullName} is FREE, no entrance pass required!</p>
            <label>
              <input
                type="checkbox"
                value="Free"
                onChange={handleCheckboxChange}
                className={`check-box ${isSubmitted ? 'submitted' : ''}`}
                disabled={isSubmitted} // Disable checkbox if submitted
              />
              This park is free
            </label>
            <button
                type="submit"
                className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
                disabled={isSubmitted} // Disable button if submitted
              >
                Submit
              </button>
            {/* <button type="submit" className="submit-button">Submit</button> */}
          </form>
      )}
    </div>
    <div>
    <Link className="back" to={`/parks/parkCode/${park.parkCode}`} onClick={handleBackClick}>Back to Park Details!</Link>
    </div>
    </>
  );
};

export default ParkFees;

/* Once selected fee, then show description/details */

  {/* <p><strong>Cost:</strong> ${fee.cost}</p>
              <p><strong>Description:</strong> {fee.description}</p> */}
              {/* <p><strong>Title:</strong> {fee.title} - ${fee.cost}</p> */}