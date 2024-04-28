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
import ApplicationPopupView from "../Common/ApplicationPopupView";

const RecruiterView = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [jobs, setJobs] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div id="table" className="h-full">
        <TableContainer component={Paper} className="px-8 pt-6 pb-8 mb-4 mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applicant</TableCell>
                <TableCell>Applicant Email</TableCell>
                <TableCell>Time Applied</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs &&
                jobs.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.jobTitle}</TableCell>
                    <TableCell>{row.status}</TableCell>const [open, setOpen] =
                    React.useState(false); const handleOpen = () =>
                    setOpen(true); const handleClose = () => setOpen(false);
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.applicantEmail}</TableCell>
                    <TableCell>{row.timeCreated}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={handleOpen}>
                        View Application
                      </Button>
                    </TableCell>
                    <ApplicationPopupView
                      application={row}
                      open={open}
                      handleClose={handleClose}
                    ></ApplicationPopupView>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RecruiterView;
