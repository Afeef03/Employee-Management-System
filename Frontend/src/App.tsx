import SignIn from "./pages/auth/SignIn";
import Layout from "./layout/AppLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Employees from "./pages/dashboard/Employees";
import Profile from "./pages/dashboard/Profile";
import { Dashboard } from "./pages/dashboard/DashBoard";
import EditProfile from "./pages/dashboard/EditProfile";
import AddEmployee from "./components/Dashboard/AddEmployee";
import { ToastContainer, toast } from "react-toastify";
import Employee from "./pages/dashboard/Employee";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }

          >
          <Route index element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<Employee />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
