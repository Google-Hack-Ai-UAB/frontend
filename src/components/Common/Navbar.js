import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [userData, setUserData] = React.useState(null);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleVisitJobs = () => {
    navigate("/jobs");
  };

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedUserData);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar className="justify-between">
          {userData && userData.role === "applicant" ? (
            <Button color="inherit" onClick={handleVisitJobs}>
              View Jobs
            </Button>
          ) : null}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
