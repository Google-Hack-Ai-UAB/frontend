import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { API_URL } from "../../../lib/Constants";
import { useAuth0 } from "@auth0/auth0-react";
import FileUploader from "../../Files/FileUploader";
import { useNavigate } from "react-router-dom";
import JobTable from "./JobTable";
import { ThreeDots } from "react-loader-spinner";
import "./profile.css";

const Profile = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    socialMedia: "",
  });

  const fetchProfileData = async () => {
    if (!isAuthenticated) return;

    try {
      const token = await getAccessTokenSilently();
      const userResponse = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!userResponse.ok) {
        throw new Error("Network response was not ok");
      }

      if ((await userResponse.json()).userData.role !== "applicant") navigate("/recruiter"); //Redirects directly to page since / -> /recruiter causes rate limit


      const response = await fetch(`${API_URL}/applicant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setProfileData(data.userData);
      setFormData({
        fullName: data.userData.fullName || "",
        email: data.userData.email || "",
        phone: data.userData.phone || "",
        address: data.userData.address || "",
        bio: data.userData.bio || "",
        socialMedia: data.userData.socialMedia || "",
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      fetchProfileData();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/applicant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      console.log("Profile updated successfully");
      alert("Profile updated successfully!");

      fetchProfileData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return profileData ? (
    <div
      className="bg-gray-100 flex flex-col md:flex-row items-start"  // Adjust alignment to start to ensure containers grow with content
      style={{ marginTop: 65, minHeight: 'calc(100vh - 65px)' }}  // Ensure minimum height is full screen minus any top margin
    >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 mx-4 flex flex-col w-full md:w-1/2">
        <div className="mb-2">
          <Avatar className="mx-auto w-20 h-20" src={profileData?.picture} />
          <Typography component="h1" variant="h5" className="text-center mt-4">
            Applicant Profile
          </Typography>
          <div className="flex flex-col mt-2">
            <Typography>Upload your resume:</Typography>
            <FileUploader></FileUploader>
            {profileData?.pdf && (
              <Typography
              class="mt-3 font-bold">Your current resume: {profileData.pdf}</Typography>
            )}
          </div>
        </div>
        <form className="mb-4" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="bio"
            label="Bio"
            name="bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="socialMedia"
            label="Social Media Links"
            name="socialMedia"
            value={formData.socialMedia}
            onChange={handleChange}
          />
          <button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="mt-4"
            style={{
              backgroundColor: "#007BFE",
              color: "white",
              padding: ".6em",
              borderRadius: ".5em",
              paddingRight: "0",
              paddingLeft: "0",
             
              width: "100%",
             
            }}
          >
            Save
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 mx-4">
        <JobTable />
      </div>
    </div>
  ) : (
    <div className="h-full w-full flex justify-center items-center">
      <ThreeDots className="m-auto" color="#1976d2" />
    </div>
  );
};

export default Profile;
