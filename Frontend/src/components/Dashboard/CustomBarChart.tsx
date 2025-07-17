import React ,{ useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';



const CustomBarChart = () => {
  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/employees/joining-stats");
        const graphData = response.data.data;
        setData(graphData)
        // console.log(graphData);
      } catch (error) {
        alert(error);
      }
    };

    fetchData(); 
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#155dfc" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        {/* <Bar dataKey="Employees" fill="#1b2559" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(CustomBarChart);
