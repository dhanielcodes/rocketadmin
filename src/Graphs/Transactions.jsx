import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Transactions() {
  const data = [
    {
      name: "Apr",
      uv: 7000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "May",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "June",
      uv: 1000,
      pv: 7000,
      amt: 2290,
    },
    {
      name: "July",
      uv: 7780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Aug",
      uv: 890,
      pv: 800,
      amt: 2181,
    },
    {
      name: "Sept",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];

  return (
    <ResponsiveContainer width="100%" aspect={1.8}>
      <BarChart
        width={100}
        height={100}
        data={data}
        margin={{
          top: 0,
          right: 30,
          left: 0,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="name"
          fontSize={16.5}
          dy={10}
        />
        <YAxis axisLine={false} tickLine={false} />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar
          dataKey="pv"
          stackId="a"
          fill="#12B76A"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar dataKey="uv" fill="#4945C4" barSize={10} radius={[3, 3, 0, 0]} />
        <Bar dataKey="uv" fill="#E0BE2D" barSize={10} radius={[3, 3, 0, 0]} />
        <Bar dataKey="uv" fill="#D94040" barSize={10} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Transactions;
