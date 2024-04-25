import { ListItem, Box, Typography } from "@mui/material";
import React from "react";

const JobPreview = ({ job, setJob }) => {
  return (
    <ListItem
      onClick={() => {
        setJob(job);
      }}
    >
      <Box className="bg-slate-600 rounded-md p-2 text-white w-full">
        <Typography variant="h6">{job.job_title}</Typography>
        <Box className="flex flex-row">
          <Typography variant="body2">{job.company}</Typography>
          <Typography
            variant="body2"
            className="!ml-2 rounded-sm p-1 bg-slate-400"
          >
            {job.salary || "Salary not listed"}
          </Typography>
          <Typography
            variant="body2"
            className="!ml-2 p-1 rounded-sm bg-slate-400"
          >
            {job.job_type}
          </Typography>
        </Box>
        <Typography></Typography>
      </Box>
    </ListItem>
  );
};

export default JobPreview;
