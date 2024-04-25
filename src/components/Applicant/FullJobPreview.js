import React from "react";
import Typography from "@mui/material/Typography"; // Ensure Typography is correctly imported from MUI
import { Button } from "@mui/base";

const FullJobPreview = ({ job }) => {
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
            <Button className="m-auto bg-blue-500 p-2 rounded-md">
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
