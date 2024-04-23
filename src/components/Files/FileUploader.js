import React, { useState } from "react";
import { API_URL } from "../../lib/Constants";
import { useAuth0 } from "@auth0/auth0-react";

const FileUploader = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [selectedFile, setSelectedFile] = useState(null);
  const [queryText, setQueryText] = useState("");

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    const token = await getAccessTokenSilently();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("resume", selectedFile); // Ensure 'resume' matches the expected field name

      fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully:", data);
          // Reset selected file state after upload
          setSelectedFile(null);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please select a file to upload.");
    }
  };

  // Function to handle text query
  const handleTextQuery = () => {
    if (queryText.trim() !== "") {
      fetch(`${API_URL}/resume/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: queryText }),
      })
        .then((response) => response.blob()) // Get the response as a Blob
        .then((blob) => {
          const url = URL.createObjectURL(blob); // Create a URL from the Blob
          window.open(url, "_blank"); // Open the URL in a new tab
        })
        .catch((error) => {
          console.error("Error querying API:", error);
        });
    } else {
      alert("Please enter a query text.");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.gif,.pdf"
      />
      <button onClick={handleFileUpload}>Upload</button>
      {selectedFile && (
        <div>
          Selected file: {selectedFile.name} (
          {(selectedFile.size / 1024).toFixed(2)} KB)
        </div>
      )}

      {/* <input */}
      {/*   type="text" */}
      {/*   value={queryText} */}
      {/*   onChange={(e) => setQueryText(e.target.value)} */}
      {/*   placeholder="Enter query text" */}
      {/* /> */}
      {/* <button onClick={handleTextQuery}>Query</button> */}
    </div>
  );
};

export default FileUploader;
