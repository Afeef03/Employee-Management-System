import SignIn from "./pages/auth/SignIn";
import Layout from "./layout/AppLayout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/auth/SignUp";
import Employees from "./pages/dashboard/Employees";
import Profile from "./pages/dashboard/Profile";
import { Dashboard } from "./pages/dashboard/DashBoard";
import EditProfile from "./pages/dashboard/EditProfile";
import AddEmployee from "./components/Dashboard/AddEmployee";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Route>

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
