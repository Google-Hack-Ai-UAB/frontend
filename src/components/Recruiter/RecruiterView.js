import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../lib/Constants";
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
import ApplicationPopupView from "../Common/ApplicationPopupView";

const RecruiterView = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [jobs, setJobs] = useState([]);
  const [openRows, setOpenRows] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = await getAccessTokenSilently();
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
      setJobs(data.jobs);
      setOpenRows(Array(data.jobs.length).fill(false));
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

  return (
    <div
      className="min-h-screen flex flex-col items-center py-4"
      style={{ paddingTop: 70 }}
    >
      <TableContainer
        component={Paper}
        style={{
          width: "100%", // Ensures it takes the full width of its container
          maxWidth: "95%", // Limits maximum width to 90% of the viewport width
          margin: "0 auto", // Centers the table in the available space
          marginTop: "1em",
          overflowX: "auto", // Ensures the table is scrollable horizontally if it overflows
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
                    href={`/chat/${row.jobId}`}
                    startIcon={<VisibilityIcon />}
                  >
                    Chat
                  </Button>
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.fullName}</TableCell>
                <TableCell align="center">{row.applicantEmail}</TableCell>
                <TableCell align="center">{row.timeCreated}</TableCell>
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
  );
};

export default RecruiterView;
