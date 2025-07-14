import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FilterDropdowns from "./Search";
import { Link } from "react-router-dom";
import EmployeeTable from "../../components/Dashboard/DataTable";
import { useState } from "react";

//first pass props from search component to employees component then make an api call then update the list

const Employees = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  return (
    <main>
      <div
        className="flex mb-4"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <Button variant="contained" endIcon={<AddIcon />}>
          <Link to={"/add-employee"}>Add Employee</Link>
        </Button>
        <div className="flex justify-center items-center">
          <FilterDropdowns onChange={setFilters} />
        </div>
      </div>
      <EmployeeTable filters={filters} />
    </main>
  );
};

export default Employees;
