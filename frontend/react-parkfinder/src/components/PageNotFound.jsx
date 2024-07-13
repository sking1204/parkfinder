import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
      <>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
        <div>
        <div className="not-found">
        <Link className="back" to={`/`} >Back to Parkfinder!</Link>
      </div>
        </div>
      </>
    );
  };

  export default PageNotFound;