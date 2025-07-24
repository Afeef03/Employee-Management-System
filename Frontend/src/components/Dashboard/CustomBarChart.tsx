import React from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchGraphData } from '../../api/Employees';

const CustomBarChart = () => {

  const {
    data: graphData = [],
    isError,
    isLoading
  } = useQuery({
    queryKey: ["graphData"],
    queryFn: fetchGraphData
  })

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-500">Failed to load chart data.</div>;


  const colors = ['#6366f1', '#7c3aed', '#4f46e5', '#4338ca', '#3730a3'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <p className="text-sm text-indigo-600">Count: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Joinings (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={graphData}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
          barSize={100}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={[0, 'dataMax + 2']} />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            activeBar={<Rectangle fill="#c7d2fe" stroke="#4f46e5" />}
            isAnimationActive={true}
            animationDuration={800}
          >
            {graphData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(CustomBarChart);
