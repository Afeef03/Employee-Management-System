import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import FilterDropdowns from "./Search";
import { Link } from "react-router-dom";
import EmployeeTable from "../../components/Dashboard/DataTable";

const Employees = () => {
  return (
    <main>
      <div className="flex mb-4" style={{ justifyContent: "space-between", alignItems: "center", gap: "50px" }}>
        <Button variant="contained" endIcon={<AddIcon />}>
          <Link to={'/add-employee'}>
            Add Employee
          </Link>
        </Button>
        <div className="flex justify-center items-center">
          <FilterDropdowns onSendData  />
        </div>
      </div>
      <EmployeeTable />
    </main>
  );
};

export default Employees;
