import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";

const AddEmployee: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [dateOfJoining, setdateOfJoining] = useState("");
  const [currentCTC, setcurrentCTC] = useState("");

  const addEmployee = async (e: React.FormEvent) => {
    // if (!firstName || !lastName || !email || !phoneNumber || !department || !designation || !status || !dateOfJoining || !currentCTC) {
    //   toast.error("Please fill in all fields");
    //   return;
    // }
    e.preventDefault();
    try {
      const formattedPhone = `+91${phoneNumber}`;
      if (!isValidPhoneNumber(formattedPhone)) {
        toast.error("Please enter a valid Indian phone number");
        return;
      }
      const employeeInput = {
        firstName,
        lastName,
        email,
        phoneNumber,
        department,
        designation,
        status,
        dateOfJoining,
        currentCTC,
      };
      console.log(employeeInput);
      const response = await axios.post(
        "http://localhost:5500/api/v1/employees",
        employeeInput
      );
      console.log(response);
      toast.success("Employee Added");

      setFirstName("");
      setLastName("");
      setEmail("");
      setphoneNumber("");
      setDepartment("");
      setDesignation("");
      setStatus("");
      setdateOfJoining("");
      setcurrentCTC("");

      console.log(response.status);
      if (response.status === 409) {
        toast.warning("Employee with this email already exists");
      }
      // if()
    } catch (error) {
      // toast.error(error.message)
      if (error.response && error.response.status === 409) {
        toast.warning("Employee with this email already exists");
      }
    }
  };
  console.log(dateOfJoining);
  return (
    <main className="flex h-screen justify-center items-center">
      <form className="w-full max-w-lg" onSubmit={addEmployee}>
        <h1 className="text-primary font-bold text-xl my-5">Add Employee</h1>

        {/* =========================1st-Row=================== */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="first-name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jane"
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="last-name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Doe"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        {/* ================================2nd-Row================= */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="first-name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Gmail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="number"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              phoneNumber
            </label>
            <input
              id="phoneNumber-number"
              type="text"
              placeholder="phoneNumber Number"
              value={phoneNumber}
              required
              onChange={(e) => setphoneNumber(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        {/* ===========================3rd-Row============================= */}
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="state"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Department
            </label>
            <div className="relative">
              <select
                id="state"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="default">Default</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Marketing">Marketing</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="first-name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Designation
            </label>
            <input
              id="designation"
              type="text"
              value={designation}
              required
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Full-Stack Developer"
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="state"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="state"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="default">Default</option>
                <option value="Active">Active</option>
                <option value="OnLeave">OnLeave</option>
                <option value="Inactive">Inactive</option>
                <option value="Left">Left</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================4th-Row=================== */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="Date-Of-Joining"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Date Of Joining
            </label>
            <input
              id="date"
              type="date"
              placeholder="01/0802025"
              value={dateOfJoining}
              required
              onChange={(e) => setdateOfJoining(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="number"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Current currentCTC
            </label>
            <input
              id="currentCTC"
              type="number"
              placeholder="500000"
              required
              value={currentCTC}
              onChange={(e) => setcurrentCTC(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded"
              // onClick={addEmployee}
            >
              Add Employee
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AddEmployee;
