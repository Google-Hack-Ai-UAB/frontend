import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Navbar() {
  const logo = require("../../images/recruit.png");
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [userData, setUserData] = React.useState(null);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleVisitJobs = () => {
    navigate("/jobs");
  };

  const handleVisitProfile = () => {
    navigate("/applicant");
  };

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedUserData);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className="justify-between">
          <div className="flex flex-row items-center align-middle mr-2">
            <img src={logo} style={{ height: 70 }} alt="logo" />
            <Typography>RecruitWise</Typography>
          </div>
          <div>
            {userData && userData.role === "applicant" ? (
              <Button color="inherit" onClick={handleVisitProfile}>
                Applicant Profile
              </Button>
            ) : null}
            {userData && userData.role === "applicant" ? (
              <Button color="inherit" onClick={handleVisitJobs}>
                View Jobs
              </Button>
            ) : null}
          </div>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
