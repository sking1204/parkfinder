import './ParkFees.css';

const ParkFees =({ park }) => {
  return (
    <>
    <div className="park-fees">
      <h2>Entrance Fees</h2>      
        
      {park.entranceFees.length > 0 ? (
        <ul>
          {park.entranceFees.map((fee, index) => (
            <li key={index}>
              <p><strong>Cost:</strong> ${fee.cost}</p>
              <p><strong>Description:</strong> {fee.description}</p>
              <p><strong>Title:</strong> {fee.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{park.fullName} is FREE, no entrance pass required!</p>
      )}
    </div>
    </>
  );
}

export default ParkFees;