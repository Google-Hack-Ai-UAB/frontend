import React, { useState } from "react";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Function to handle file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      // You can perform file upload logic here
      console.log("Uploading file:", selectedFile);
      // Reset selected file state after upload
      setSelectedFile(null);
    } else {
      alert("Please select a file to upload.");
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
    </div>
  );
};

export default FileUploader;
