import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { EmployeeType } from "../../../types/index";
import { toast } from "react-toastify";

//accepts value as string and an array of strings
const EmployeeTable: React.FC<{ filters?: Record<string, string[]> }> = ({ filters = {} }) => {
  const [employee, setEmployee] = useState<EmployeeType[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const queryParams = new URLSearchParams();

        let convertedToArray = Object.entries(filters);
        convertedToArray.forEach(([key, values]) => {
          values.forEach(value => {
            queryParams.append(key, value);
          });
        });

        const hasFilters = Object.values(filters).some(values => values.length > 0);

        const endpoint = hasFilters
          ? `http://localhost:5500/api/v1/employees/search?${queryParams.toString()}`
          : `http://localhost:5500/api/v1/employees/`;

        const token = localStorage.getItem('token')
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        const employees = response.data.data.employees;
        setEmployee(employees);
      } catch (error) {
        toast.error("Failed to fetch employees");
      }
    };

    fetchEmployees();
  }, [filters]);



  const deleteEmployee = async (id: string) => {
    const confirmMessage = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmMessage) return;
    try {
      await axios.delete(`http://localhost:5500/api/v1/employees/${id}`);
      setEmployee((prev) => prev.filter((emp) => emp._id !== id));
      toast.success("Employee deleted succefully");
    } catch (error) {
      toast.error("Failed deleting employee");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Name", "Title", "Status", "Phone", "Email", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employee.map((employee) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <Link to={`/employees/${employee._id}`}>
                      <div className="text-sm font-medium text-gray-900">
                        {employee.firstName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.email}
                      </div>
                    </Link>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {employee.designation}
                </div>
                <div className="text-sm text-gray-500">
                  {employee.department}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${employee.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : employee.status === "OnLeave"
                        ? "bg-yellow-100 text-yellow-800"
                        : employee.status === "Inactive"
                          ? "bg-gray-200 text-gray-700"
                          : employee.status === "Left"
                            ? "bg-red-100 text-red-800"
                            : ""
                    }`}
                >
                  {employee.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.phoneNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  to={`/employees/edit/${employee._id}`}
                  className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                >
                  Edit
                </Link>
                <button
                  className="ml-2 text-red-600 hover:text-red-900 cursor-pointer"
                  onClick={() => deleteEmployee(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
