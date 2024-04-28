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
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../../lib/Constants";

const JobTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [jobs, setJobs] = useState([]);

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
      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div id="table" className="h-full">
      <TableContainer
        component={Paper}
        className="px-8 pt-6 pb-8 mb-4 ml-4 mt-10"
      >
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
            {jobs &&
              jobs.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.jobTitle}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.timeCreated}</TableCell>
                  <TableCell>
                    <Button size="small">View Application</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default JobTable;
