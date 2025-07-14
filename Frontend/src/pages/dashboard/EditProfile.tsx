import React from "react";

// Name
// Job Role
// Status
// Location
// Gmail
// Password
// Profile Image
// Summary
// Department
const EditProfile: React.FC = () => {
  return (
    <main className="flex h-screen justify-center items-center">
      <form className="w-full max-w-lg">
        <h1 className="text-primary font-bold text-xl my-5">
          Edit Your Profile
        </h1>
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
              placeholder="Jane"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
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
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="state"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Experience Level
            </label>
            <div className="relative">
              <select
                id="state"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Entry Level</option>
                <option>Junior</option>
                <option>Senior</option>
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
              htmlFor="state"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Job Role
            </label>
            <div className="relative">
              <select
                id="state"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Full-Stack Developer</option>
                <option>Netsuite Developer</option>
                <option>Netsuite Functional Developer</option>
                <option>Devops Engineer</option>
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
              htmlFor="zip"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Profile Picture
            </label>
            <input
              id="zip"
              type="file"
              placeholder="Profile-Image"
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
              Summary
            </label>
            <input
              id="summary"
              type="text"
              placeholder="Frontend developer improving user interfaces"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditProfile;
