import React from "react";

const JobPreview = ({ job }) => {
  return (
    <>
      <p>{job.title}</p>
      <p>{job.company}</p>
    </>
  );
};

export default JobPreview;
