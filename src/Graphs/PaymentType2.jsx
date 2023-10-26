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

function PaymentType2() {
  const data = [
    {
      name: "Apr",
      uv: 6000,
      pv: 4400,
      amt: 2400,
    },
    {
      name: "May",
      uv: 5000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "June",
      uv: 4000,
      pv: 4000,
      amt: 2290,
    },
    {
      name: "July",
      uv: 4780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Aug",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Sep",
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
          fill="#FB923C"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar dataKey="uv" fill="#CBC7C6" barSize={10} radius={[3, 3, 0, 0]} />
        <Bar dataKey="uv" fill="#7694E0" barSize={10} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PaymentType2;
