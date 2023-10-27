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

function PayoutChart({ apiData }) {
  const data = [
    {
      name: "May",
      uv: 3000,
      pv: 1398,
      amt: 2000,
    },
    {
      name: "June",
      uv: 2000,
      pv: 4000,
      amt: 2000,
    },
    {
      name: "July",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Aug",
      uv: 1890,
      pv: 4800,
      amt: 2000,
    },
    {
      name: "Sept",
      uv: 2390,
      pv: 3800,
      amt: 2000,
    },
    {
      name: "Oct",
      uv: apiData?.successfulValue,
      pv: apiData?.pendingValue,
      amt: apiData?.failedValue,
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
          fill="#5adbbd"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar dataKey="uv" fill="#ef7474" barSize={10} radius={[3, 3, 0, 0]} />
        <Bar dataKey="amt" fill="#2A278F" barSize={10} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PayoutChart;
