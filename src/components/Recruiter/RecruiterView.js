import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../lib/Constants";
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatIcon from '@mui/icons-material/Chat';
import ApplicationPopupView from "../Common/ApplicationPopupView";
import { renderTimestamp } from "../../lib/Utils";
import { ThreeDots } from "react-loader-spinner";

const RecruiterView = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [openRows, setOpenRows] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchJobs = async () => {
    if (!isAuthenticated) return;
    try {
      const token = await getAccessTokenSilently();

      const userResponse = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!userResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const preData = await userResponse.json();
      if (preData.userData.role !== "recruiter") navigate("/applicant"); //Redirects directly to page since / -> /recruiter causes rate limit

      const response = await fetch(`${API_URL}/recruiter_jobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.jobs)
      setJobs(data.jobs);
      setOpenRows(Array(data.jobs.length).fill(false));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpen = (index) => {
    setOpenRows(openRows.map((value, i) => (i === index ? true : value)));
  };

  const handleClose = (index) => {
    setOpenRows(openRows.map((value, i) => (i === index ? false : value)));
  };

  return !isLoading ? (
    <div
      className="min-h-screen flex flex-col items-center py-4"
      style={{ paddingTop: 70 }}
    >
      <TableContainer
        component={Paper}
        style={{
          width: "100%",
          maxWidth: "95%",
          margin: "0 auto",
          marginTop: "1em",
          overflowX: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Chat</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Applicant</TableCell>
              <TableCell align="center">Applicant Email</TableCell>
              <TableCell align="center">Time Applied</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.jobTitle}</TableCell>
                <TableCell align="center">
                  <Button
                    href={`/chat/${encodeURIComponent(row.jobId)}`}
                    startIcon={<ChatIcon />}
                  >
                    Chat
                  </Button>
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.fullName}</TableCell>
                <TableCell align="center">{row.applicantEmail}</TableCell>
                <TableCell align="center">
                  {renderTimestamp(row.timeCreated)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleOpen(index)}
                    startIcon={<VisibilityIcon />}
                  >
                    View Application
                  </Button>
                  <ApplicationPopupView
                    application={row}
                    open={openRows[index]}
                    handleClose={() => handleClose(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <div className="h-full w-full flex justify-center items-center">
      <ThreeDots className="m-auto" color="#1976d2" />
    </div>
  );
};

export default RecruiterView;
