import React, { useState } from "react";
import { Drawer, TableCell, Modal } from "@mui/material";
import clsx from "clsx";

const ApplicationPopupView = ({
  application,
  open,
  handleClose,
  isOpen,
  onClose,
}) => {
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(comments);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="bg-white p-8 w-1/2 m-auto">
        <h2 className="text-xl font-bold mb-4">Applicant Details</h2>
        <div className="mb-4">
          <table>
            <tbody>
              <tr>
                <td className="pr-2 font-semibold">Job Title:</td>
                <td>{application.jobTitle}</td>
              </tr>
              <tr>
                <td className="pr-2 font-semibold">Status:</td>
                <td>{application.status}</td>
              </tr>
              <tr>
                <td className="pr-2 font-semibold">Full Name:</td>
                <td>{application.fullName}</td>
              </tr>
              <tr>
                <td className="pr-2 font-semibold">Applicant Email:</td>
                <td>{application.applicantEmail}</td>
              </tr>
              <tr>
                <td className="pr-2 font-semibold">Time Created:</td>
                <td>{application.timeCreated}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-32 border border-gray-300 rounded p-2 mb-4"
            placeholder="Add your comments here..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ApplicationPopupView;
