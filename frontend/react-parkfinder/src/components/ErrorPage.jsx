import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "An unknown error occurred.";

  return (
    <div>
      <Typography variant="h5" color="error" marginBottom="20px">{message}</Typography>
      <Button onClick={() => navigate("/")}>Go Back to Home</Button>
    </div>
  );
}

export default ErrorPage;