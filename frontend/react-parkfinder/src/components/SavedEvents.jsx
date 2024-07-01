import stripHtmlTags from "../helper/stripHtmlTags";

const SavedEvents = ({ savedEvents }) => {
  return (
    <div className="saved-events">
      <h2>Saved Events</h2>
      {savedEvents.length > 0 ? (
        <ul>
          {savedEvents.map((event, index) => (
            <li key={index}>
              <p><strong>Event Title:</strong> {event.title}</p>
              <p><strong>Event Type:</strong> {event.types}</p>
              <p><strong>Description:</strong> {stripHtmlTags(event.description)}</p>
              <p><strong>Dates:</strong></p>
              {Array.isArray(event.dates) && (
                <select>
                  {event.dates.map((date, dateIndex) => (
                    <option key={dateIndex} value={date}>{date}</option>
                  ))}
                </select>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved events.</p>
      )}
    </div>
  );
};

export default SavedEvents;
