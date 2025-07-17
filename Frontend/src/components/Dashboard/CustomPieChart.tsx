import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: PieLabelRenderProps & { name?: string }) => {
  if (
    cx === undefined || cy === undefined || innerRadius === undefined ||
    outerRadius === undefined || midAngle === undefined || percent === undefined
  ) {
    return null;
  }

  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > Number(cx) ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const CustomPieChart: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/v1/employees/pie-chart");

        const formattedData = res.data.map((item: any) => ({
          name: item._id,
          value: item.count,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props) => renderCustomizedLabel({ ...props, name: props.name })}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(CustomPieChart);
