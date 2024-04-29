import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../../lib/Constants";
import { FallingLines } from "react-loader-spinner";
import FullJobPreview from "../FullJobPreview";
import ApplicationPopupView from "../../Common/ApplicationPopupView";

const JobTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/applied_jobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setJobs(data.jobs.map((job) => ({ ...job, open: false })));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpen = (index) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].open = true;
    setJobs(updatedJobs);
  };

  const handleClose = (index) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].open = false;
    setJobs(updatedJobs);
  };

  return !loading ? (
    <div id="table" className="h-full w-full mr-4 pt-4">
      <Typography>Job Applications</Typography>
      <TableContainer component={Paper} className="pt-2 pb-2 mb-4 mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time Applied</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.jobTitle}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.timeCreated}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleOpen(index)}>
                    View Application
                  </Button>
                </TableCell>
                <ApplicationPopupView
                  application={row}
                  open={row.open}
                  handleClose={() => handleClose(index)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <div className="h-full w-full flex justify-center items-center">
      <FallingLines className="m-auto" color="blue" />
    </div>
  );
};

export default JobTable;
