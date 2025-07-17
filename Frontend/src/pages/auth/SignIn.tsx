import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/auth/sign-in",
        {
          email,
          password,
        }
      );
      const token = response.data.data.token;

      if (token) {
        localStorage.setItem("token", token);
        toast.success("User signed in successfully");
        navigate("/");
      } else {
        toast.error("token is not recieved");
      }
    } catch (error: unknown) {
      if(error.response && error.response.status === 404){
        toast.warning("User Not Found. Please sign up")
      } else{
        toast.error("Error signing in")
      }
    }
  };
  return (
    <main className="bg-white grid grid-cols-12 min-h-screen">
      {/* ===============================1st======================Row== */}
      <div className="flex col-span-12 md:col-span-6 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* ==================breadcrumbs====================== */}

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

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Didn't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* =============================2ndRow========================== */}
      <div className="md:col-span-6 md:block hidden">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
          className="h-full object-cover"
        />
      </div>
    </main>
  );
}
