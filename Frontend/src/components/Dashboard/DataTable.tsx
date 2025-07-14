import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import type { EmployeeType } from "../../../types/index"
import { toast } from 'react-toastify';



const EmployeeTable: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeType[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/employees/");
        const employees = response.data.data.employees;
        setEmployee(employees)
        
      } catch (error) {
        toast.error("Failed Creating employee");
      }
    }

    fetchEmployees();
  }, [])

  const deleteEmployee = async(id : string) => {
    const confirmMessage = window.confirm("Are you sure you want to delete this employee?");
    if(!confirmMessage) return;
    try { 
        const response = await axios.delete(`http://localhost:5500/api/v1/employees/${id}`);
        setEmployee(prev => prev.filter(emp => emp._id !== id));
        toast.success("Employee deleted succefully")
    } catch (error) {
      toast.error("Failed deleting employee")
    }
  }


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Name', 'Title', 'Status', 'Phone', 'Email', 'Actions'].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employee.map((employee) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={'https://i.pravatar.cc/150?img=1'}
                      alt={employee.firstName}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{employee.firstName}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.designation}</div>
                <div className="text-sm text-gray-500">{employee.department}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${employee.status === 'Active' ? 'bg-green-100 text-green-800' :
                  employee.status === 'OnLeave' ? 'bg-yellow-100 text-yellow-800' :
                    employee.status === 'Inactive' ? 'bg-gray-200 text-gray-700' :
                      employee.status === 'Left' ? 'bg-red-100 text-red-800' :
                        ''
                  }`}>
                  {employee.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/edit/${employee._id}`} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                  Edit
                </Link>
                <button className="ml-2 text-red-600 hover:text-red-900 cursor-pointer" onClick={() => deleteEmployee(employee._id)}>
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
