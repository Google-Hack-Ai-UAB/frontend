import React, { useState, useEffect } from "react";
import { API_URL } from "../../lib/Constants";
import JobPreview from "./JobPreview";
import { List, Typography } from "@mui/material";
import FullJobPreview from "./FullJobPreview";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [fullJob, setFullJob] = useState(null);
  const fetchJobData = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: "GET",
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
    fetchJobData();
  }, []);

  useEffect(() => {
    setFullJob(jobs[0]);
  }, [jobs]);

  return (
    <div id="jobs">
      <Typography variant="h3" className="!ml-4 w-full">
        Job Postings
      </Typography>
      <div className="flex flex-row w-full">
        <List className="w-[50%]">
          {jobs &&
            jobs.map((job, index) => {
              return (
                <JobPreview
                  key={index}
                  job={job}
                  setJob={setFullJob}
                ></JobPreview>
              );
            })}
        </List>
        <FullJobPreview job={fullJob}></FullJobPreview>
      </div>
    </div>
  );
};

export default Jobs;
