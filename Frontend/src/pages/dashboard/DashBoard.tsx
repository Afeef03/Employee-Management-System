import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CustomBarChart from '../../components/Dashboard/CustomBarChart';
import CustomPieChart from '../../components/Dashboard/CustomPieChart';
import EmployeeTable from '../../components/Dashboard/DataTable';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import type { EmployeeType } from '../../../types';



export const Dashboard = () => {
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [unactiveEmployees, setUnactiveEmployees] = useState(0);

  const filters = useMemo(() => ({}), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/employees/");
        const employees: EmployeeType[] = response.data.data.employees;
        setNumberOfEmployees(employees.length)

        let active = 0;
        let inActive = 0;

        employees.forEach(emp => {
          const status = emp.status?.toLowerCase();
          if (status === "active") active += 1;
          else if (status === "inactive") inActive += 1;
        })

        setActiveEmployees(active);
        setUnactiveEmployees(inActive);
      } catch (error) {
        alert(error)
      }
    }

    fetchData();
  }, []);


  return (
    <main className='grid grid-cols-12 gap-6 min-h-screen p-4 sm:p-6 overflow-auto'>
      {/* ==================1st Row============= */}
      <div className="sm:col-span-4 col-span-12 bg-white p-4 rounded-xl border border-gray-200 shadow-md transition duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <Card title='Total Employees' value={numberOfEmployees} icon={<PeopleOutlineRoundedIcon fontSize='large' />} />
      </div>
      <div className="sm:col-span-4 col-span-12 bg-white p-4 rounded-xl border border-gray-200 shadow-md transition duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <Card title='Active Employees' value={activeEmployees} icon={<CheckCircleIcon fontSize='large' />} />
      </div>
      <div className="sm:col-span-4 col-span-12 bg-white p-4 rounded-xl border border-gray-200 shadow-md transition duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <Card title='Inactive Employees' value={unactiveEmployees} icon={<RemoveCircleIcon fontSize='large' />} />
      </div>

      {/* ===================2nd Row================ */}
      <div className="sm:col-span-8 col-span-12 bg-white p-3  pt-5 rounded-md border border-gray-200 shadow-xl">
        <CustomBarChart />
      </div>
      <div className="sm:col-span-4 col-span-12 bg-white p-3 rounded-md border border-gray-200 shadow-xl">
        <CustomPieChart />
      </div>

      {/* ===================3rd Row================ */}
      <div className="col-span-12 p-5 pb-5 border border-gray-200 bg-white shadow-xl">
        <h1 className='text-2xl font-semibold text-primary mb-4'>Employee Data</h1>
        <EmployeeTable filters={filters} />
      </div>
    </main>
  );
};

const Card = ({
  title,
  icon,
  value,
}: {
  title: string;
  icon: React.ReactNode;
  value: string | number;
}) => {
  return (
    <div className="flex items-center justify-start gap-4 bg-white rounded-2xl p-4 w-full max-w-xs">
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h2 className="text-sm text-gray-400 font-semibold">{title}</h2>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};