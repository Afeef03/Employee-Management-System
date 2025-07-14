import axios from "axios";
import React, { useState } from "react";


const SignUp: React.FC = () => {
  const [fristName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5500/api/v1/auth/sign-up")
    } catch (error) {

    }
  }
  return (
    <main className="flex h-screen justify-center items-center">
      <form className="w-full max-w-lg">
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
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
