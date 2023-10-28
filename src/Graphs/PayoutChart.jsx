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
  const data = apiData || [];

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
          dataKey="providerName"
          fontSize={16.5}
          dy={10}
        />
        <YAxis axisLine={false} tickLine={false} />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar
          dataKey="successfulValue"
          stackId="a"
          fill="#5adbbd"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar
          dataKey="failedValue"
          fill="#ef7474"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar
          dataKey="pendingValue"
          fill="#2A278F"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PayoutChart;