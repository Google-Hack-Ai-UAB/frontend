import React from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
        <div className="mb-4">
          <Avatar className="mx-auto w-20 h-20">
            {/* You can put initials or a profile picture here */}
          </Avatar>
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="socialMedia"
            label="Social Media Links"
            name="socialMedia"
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
