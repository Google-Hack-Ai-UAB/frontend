import React from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/base";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../lib/Constants";
import { Divider } from "@mui/material";

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

  return job ? (
    <div
      id="full-job-preview"
      className="max-h-[95%] bg-white rounded-md overflow-scroll p-2 text-blue-900 shadow-md w-1/2 mt-2"
    >
      <div className="flex flex-row">
        <Typography variant="h5" className="w-3/4 !font-bold">
          {job.job_title}
        </Typography>
        <button
          className="ml-auto mt-auto mr-2 bg-blue-500 p-2 rounded-md text-white font-bold max-h-10"
          style={{minWidth: "6.5em"}}
          onClick={handleApply}
        
        >
          Easy Apply
        </button>
      </div>
      <Typography>{job.company}</Typography>
      <Typography>{job.job_type}</Typography>
      <Typography>{job.salary}</Typography>
      <Divider sx={{ borderBottomWidth: 3 }}></Divider>
      <br />
      <div style={{ whiteSpace: "pre-wrap" }}>{job.description}</div>
    </div>
  ) : null;
};

export default FullJobPreview;
