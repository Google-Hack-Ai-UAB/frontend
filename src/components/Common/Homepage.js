import React, { useState, useEffect } from "react";
import { API_URL } from "../../lib/Constants";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ThreeDots } from "react-loader-spinner";

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const history = useNavigate();

  const fetchProfileData = async () => {
    if (!isAuthenticated) return;
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUserData(data.userData);
      localStorage.setItem("userData", JSON.stringify(data.userData));
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    if (userData) {
      if (userData.role === "applicant" && !userData.fullName) {
        history("/applicant");
      } else if (userData.role === "applicant") {
        history("/jobs");
      } else if (userData.role === "recruiter") {
        history("/recruiter");
      }
    }
  }, [userData, history]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <ThreeDots className="m-auto" color="#1976d2" />
    </div>
  );
};

export default Homepage;
