import React, { useState, useEffect } from "react";
import { API_URL } from "../../../lib/Constants";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const fetchProfileData = async () => {
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
    fetchProfileData();
  }, []);

  return <></>;
};

export default JobTable;
