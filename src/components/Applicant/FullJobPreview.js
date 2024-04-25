import React from "react";
import Typography from "@mui/material/Typography"; // Ensure Typography is correctly imported from MUI

const FullJobPreview = ({ job }) => {
  return (
    <div className="mt-4 mb-4 w-1/2 mr-4">
      {job ? (
        <div
          id="full-job-preview"
          className="bg-slate-600 rounded-md max-h-screen overflow-scroll p-2 text-white w-full"
        >
          <Typography variant="h5">{job.job_title}</Typography>
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
