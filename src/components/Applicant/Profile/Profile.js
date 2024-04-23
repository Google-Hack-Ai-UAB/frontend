import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { API_URL } from "../../../lib/Constants";
import { useAuth0 } from "@auth0/auth0-react";

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

  useEffect(() => {
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
          fullName: data.userData.name,
          email: data.userData.email,
          phone: "",
          address: "",
          bio: "",
          socialMedia: "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [getAccessTokenSilently, isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
        <div className="mb-4">
          <Avatar
            className="mx-auto w-20 h-20"
            src={profileData?.picture}
          ></Avatar>
          <Typography component="h1" variant="h5" className="text-center mt-4">
            User Profile
          </Typography>
        </div>
        <form className="mb-4">
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
