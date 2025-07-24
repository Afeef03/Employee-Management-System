import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEmployees } from "../../api/Employees";
import axios from "axios";

const ITEMS_PER_PAGE = 8;

const EmployeeTable: React.FC<{ filters?: Record<string, string[]>, search: string }> = ({
  filters = {}, search = ""
} ) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data: employees = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["employee", filters, search],
    queryFn: ({ signal }) => fetchEmployees(filters, signal, search),
  });


  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:5500/api/v1/employees/${id}`);
    },
    onSuccess: () => {
      toast.success("Employee deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: () => {
      toast.error("Failed deleting employee");
    },
  });

  const deleteEmployee = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    deleteMutation.mutate(id);
  };


  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const currentPageData = useMemo(
    () =>
      employees.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [employees, page]
  );

  const isAllSelected = currentPageData.every((emp) => selected.has(emp._id));

  const toggleSelectAll = () => {
    const updated = new Set(selected);
    if (isAllSelected) {
      currentPageData.forEach((emp) => updated.delete(emp._id));
    } else {
      currentPageData.forEach((emp) => updated.add(emp._id));
    }
    setSelected(updated);
  };

  const toggleSelectOne = (id: string) => {
    const updated = new Set(selected);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelected(updated);
  };

  if (isLoading) return <div className="p-4">Loading employees...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load employees.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </th>
            {["Name", "Title", "Status", "Phone", "Email", "Actions"].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((employee) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selected.has(employee._id)}
                  onChange={() => toggleSelectOne(employee._id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/employees/${employee._id}`}>
                  <div className="text-sm font-medium text-gray-900">{employee.firstName}</div>
                  <div className="text-sm text-gray-500">{employee.email}</div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.designation}</div>
                <div className="text-sm text-gray-500">{employee.department}</div>
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
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEmployee(employee._id)}
                  className="ml-2 text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default React.memo(EmployeeTable);
