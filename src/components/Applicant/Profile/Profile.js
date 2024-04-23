import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { API_URL } from "../../../lib/Constants";
import { useAuth0 } from "@auth0/auth0-react";
import FileUploader from "../../Files/FileUploader";

const Profile = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [profileData, setProfileData] = useState(null);
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
    fetchProfileData();
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

      fetchProfileData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md mt-4">
        <div className="mb-2">
          <Avatar
            className="mx-auto w-20 h-20"
            src={profileData?.picture}
          ></Avatar>
          <Typography component="h1" variant="h5" className="text-center mt-4">
            Applicant Profile
          </Typography>
          <div className="flex flex-col mt-2">
            <Typography>Upload your resume:</Typography>
            <FileUploader></FileUploader>
            {profileData?.pdf ? (
              <Typography>Your current resume: {profileData.pdf}</Typography>
            ) : null}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
