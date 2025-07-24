import AddIcon from "@mui/icons-material/Add";
import FilterDropdowns from "./Search";
import { Link } from "react-router-dom";
import EmployeeTable from "../../components/Dashboard/DataTable";
import { useState } from "react";
import BasicModal from "../../components/Dashboard/Modal";
import SearchInput from "../../components/Dashboard/SearchInput";

//first pass props from search component to employees component then make an api call then update the list

const Employees = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");
  return (
    <main>
      <div
        className="flex flex-col sm:flex-row justify-between items-center gap-5 mb-4"
      >
        <div className="flex gap-3">
          <button className="bg-btn py-2 px-3 border rounded-lg  text-white hover:bg-btn/90">
            <Link to={"/add-employee"}>Add Employee <AddIcon /></Link>
          </button>
          <BasicModal />
        </div>
        <div className="md:flex sm:flex-row flex-col justify-center gap-2 items-center">
          <SearchInput onSearch={setSearch} />
          <FilterDropdowns onChange={setFilters} />
        </div>
      </div>
      <EmployeeTable filters={filters} search={search} />
    </main>
  );
};

export default Employees;
