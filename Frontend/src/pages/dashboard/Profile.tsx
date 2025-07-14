import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`http://localhost:5500/api/v1/users/me`,{
          headers: {
            Authorization: `Bearer : ${token}`
          }
        });
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, []);
  return (
    <main className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
              alt="Profile"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-primary dark:border-primary transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-primarymb-2">John Doe</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Software Developer
            </p>
            <button className="mt-4 cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
              <Link to={"/edit-profile"}>Edit Profile</Link>
            </button>
          </div>

          {/* Right Section */}
          <div className="md:w-2/3 md:pl-8">
            <h2 className="text-xl font-semibold text-primary  mb-4">
              About Me
            </h2>
            <p className="text-gray-700 mb-6">
              Passionate software developer with 5 years of experience in web
              technologies. I love creating user-friendly applications and
              solving complex problems.
            </p>

            <h2 className="text-xl font-semibold text-indigo-800 mb-4">
              Contact Information
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-3">
                <EmailIcon />
                john.doe@example.com
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <LocationOnIcon />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Inline styles for animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
    </main>
  );
};

export default Profile;
