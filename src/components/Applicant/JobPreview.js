import { ListItem, Box, Typography } from "@mui/material";
import React from "react";

const JobPreview = ({ job, setJob }) => {
  return (
    <ListItem
      onClick={() => {
        setJob(job);
      }}
    >
      <Box className="bg-white rounded-md p-2 text-blue-900 w-full shadow-md">
        <Typography variant="h6" className="!font-bold">
          {job.job_title}
        </Typography>
        <Box className="flex flex-row space-x-2 items-center">
          <Typography variant="body2" className="text-blue-700">
            {job.company}
          </Typography>
          <Typography
            variant="body2"
            className="ml-2 p-1 rounded-sm bg-blue-200"
          >
            {job.salary || "Salary not listed"}
          </Typography>
          <Typography
            variant="body2"
            className="ml-2 p-1 rounded-sm bg-blue-200"
          >
            {job.job_type}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default JobPreview;
