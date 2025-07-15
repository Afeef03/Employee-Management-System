import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProfile: React.FC = () => {
  const [name, setName] = useState("Afeef")
  const [email, setEmail] = useState("exmaple@gmail.com")
  const [location, setLocation] = useState("Hyderabad");
  const [summary, setSummary] = useState("Summary section")
  const [phone, setPhone] = useState("9267899261")

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const userData = response.data.data.user;

        setName(userData.name)
        setEmail(userData.email)
        setLocation(userData.location)
        setSummary(userData.summary)
        setPhone(userData.phone)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchData()
  }, [])

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5500/api/v1/users/${id}`,{
        name,
        email,
        location,
        summary,
        phone
      })

      console.log(response)
      toast.success("Employee Updated Successfully")
      navigate(`/employees/${id}`)
      // setName('')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <main className="flex h-screen justify-center items-center">
      <form className="w-full max-w-lg" onSubmit={submitData}>
        <h1 className="text-primary font-bold text-xl my-5">
          Edit Your Profile
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="Name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Name
            </label>
            <input
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Jane"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        {/* <div className="flex flex-wrap -mx-3 mb-6">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div> */}

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="email"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Hyderabad,India"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="email"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              placeholder="9234788751"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded cursor-pointer"
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
