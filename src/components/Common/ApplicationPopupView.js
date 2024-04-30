import React, { useEffect, useState } from "react";
import { Button, IconButton, Modal } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../lib/Constants";
import { CloudDownload } from "@mui/icons-material";

const ApplicationPopupView = ({ application, open, handleClose }) => {
  const [comments, setComments] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const [madeComments, setMadeComments] = useState([]);

  const handleCreateComment = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comments,
          applicationId: application.applicationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      gatherComments();

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const gatherComments = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: application.applicationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const data = await response.json();

      if (data) {
        setMadeComments(data.comments);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (open === true) {
      gatherComments();
    }
  }, [open]);

  const viewResume = () => {
    fetch(`${API_URL}/resume/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: application.applicantEmail }),
    })
      .then((response) => response.blob()) // Get the response as a Blob
      .then((blob) => {
        const url = URL.createObjectURL(blob); // Create a URL from the Blob
        window.open(url, "_blank"); // Open the URL in a new tab
      })
      .catch((error) => {
        console.error("Error querying API:", error);
      });
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="bg-white p-8 w-1/2 m-auto">
        <h2 className="text-xl font-bold mb-4">Application Details</h2>
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
              <tr>
                <td className="pr-2 font-semibold">Resume:</td>
                <td>
                  {application.userResume.filename || "No resume uploaded"}
                </td>
                {application.userResume.filename ? (
                  <IconButton size="small" color="black" onClick={viewResume}>
                    <CloudDownload></CloudDownload>
                    <p className="ml-2">View</p>
                  </IconButton>
                ) : null}
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {madeComments &&
          madeComments.map((comment, index) => (
            <div key={index} className="rounded-md bg-gray-100 p-2">
              <div className="flex flex-row justify-between">
                <p>{comment.userName || comment.userEmail}</p>
                <p>{comment.timeCreated}</p>
              </div>
              <p>{comment.text}</p>
            </div>
          ))}
        <br />
        <form onSubmit={handleCreateComment}>
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
