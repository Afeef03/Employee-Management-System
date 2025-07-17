import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isValidPhoneNumber } from "libphonenumber-js";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formattedPhone = `+91${phone}`;
      if (!isValidPhoneNumber(formattedPhone)) {
        toast.error("Please enter a valid Indian phone number");
        return;
      }

      const response = await axios.post(
        "http://localhost:5500/api/v1/auth/sign-up",
        {
          name,
          password,
          email,
          phone,
          summary,
          location,
        }
      );
      // console.log(res.data.data.token)
      const token = response.data.data.token;

      if (token) {
        localStorage.setItem("token", token);
        toast.success("Signed Up SUccessfully");
        navigate("/");
      } else {
        toast.error("Token not recieved from server");
      }

      setEmail("");
      setLocation("");
      setName("");
      setPassword("");
      setSummary("");
      setPhone("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.warning("Email is already registered");
      } else {
        toast.error("Error Signing Up");
      }
    }
  };
  return (
    <main className="flex sm:h-screen sm:p-0 p-5 justify-center items-center">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div
          role="presentation"
          className="flex justify-center m-2"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">
              <KeyboardArrowLeftIcon /> Back To Dashboard
            </Link>
          </Breadcrumbs>
        </div>
        <h1 className="text-primary font-bold text-xl my-5">
          Sign Up To Your Account
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="first-name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Afeef"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="email"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              htmlFor="password"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******************"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and strong
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="number"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="number"
              placeholder="8688284092"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="location"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Hyderabad, India"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              htmlFor="summary"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Summary
            </label>
            <textarea
              id="summary"
              // type="textarea"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Frontend developer improving user interfaces"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
