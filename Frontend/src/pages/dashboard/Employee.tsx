import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import type { EmployeeType } from "../../../types";

const Employee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5500/api/v1/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data.employee;
        setEmployee(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(String(error));
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white max-w-3xl mx-auto mt-10 shadow rounded overflow-hidden">
      <div className="overflow-x-auto border-x border-t">
        <table className="table-auto w-full">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="text-left p-4 font-medium">Field</th>
              <th className="text-left p-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">Full Name</td>
              <td className="p-4">
                {employee ? `${employee.firstName} ${employee.lastName}` : ""}
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">Email</td>
              <td className="p-4">{employee?.email}</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">Phone Number</td>
              <td className="p-4">{employee?.phoneNumber}</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">Department</td>
              <td className="p-4">{employee?.department}</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">Designation</td>
              <td className="p-4">{employee?.designation}</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">Status</td>
              <td className="p-4">{employee?.status}</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">Date of Joining</td>
              <td className="p-4">{employee?.dateOfJoining}</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4">Current CTC</td>
              <td className="p-4">₹{employee?.currentCTC}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
