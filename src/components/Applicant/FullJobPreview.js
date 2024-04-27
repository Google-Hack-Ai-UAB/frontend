import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography"; // Ensure Typography is correctly imported from MUI
import { Button } from "@mui/base";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../lib/Constants";


const FullJobPreview = ({ job }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [applied, setApplied] = useState(null);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error("Failed to apply for position");
      }

      console.log("Application sent!");
      alert("Application sent!");
      setApplied("Applied");

    } catch (error) {
      console.error("Error sending application:", error);
    }
  };

  const fetchJobStatus = async () => {
    if (!isAuthenticated) return;
    try {
      setApplied("Loading")
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/job_status`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      setApplied(data.status);
    } catch (error) {
      console.error("Error fetching job status:", error);
    }
  }

  useEffect(() => {
    fetchJobStatus()
  }, [job]);
  return (
    <div className="mt-4 mb-4 w-1/2 mr-4">
      {job ? (
        <div
          id="full-job-preview"
          className="bg-slate-600 rounded-md max-h-screen overflow-scroll p-2 text-white w-full"
        >
          <div className="flex flex-row">
            <Typography variant="h5" className="w-3/4">
              {job.job_title}
            </Typography>
            {applied ? 
              <Button className="m-auto bg-green-500 p-2 rounded-md">
                {applied}
              </Button>
              :
              <Button className="m-auto bg-blue-500 p-2 rounded-md" onClick={handleApply}>
                Easy Apply
              </Button>
            }
          </div>
          <Typography>{job.company}</Typography>
          <Typography>{job.job_type}</Typography>
          <Typography>{job.salary}</Typography>
          <div style={{ whiteSpace: "pre-wrap" }}>{job.description}</div>
        </div>
      ) : null}
    </div>
  );
};

export default FullJobPreview;
