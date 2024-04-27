import React from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/base";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../lib/Constants";

const FullJobPreview = ({ job }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleApply = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set Content-Type to application/json
        },
        body: JSON.stringify({ job_id: job["_id"] }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      alert("Job Applied For!"); // TODO: material ui alert
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

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
            <Button
              className="m-auto bg-blue-500 p-2 rounded-md"
              onClick={handleApply}
            >
              Easy Apply
            </Button>
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
