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

function TransactionsChartPayout({ apiData }) {
  const data = [
    {
      name: "May",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "June",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "July",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Aug",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Sep",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Oct",
      amt: apiData?.successfulValue,
      pv: apiData?.pendingValue,
      uv: apiData?.failedValue,
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
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={function (val) {
            return Math.abs(val) > 999999999
              ? `${("amount" === "amount" && "₦") || ""}${
                  Math.sign(val) * (Math.abs(val) / 1000000000).toFixed(1)
                }B`
              : Math.abs(val) > 999999
              ? `${("amount" === "amount" && "₦") || ""}${
                  Math.sign(val) * (Math.abs(val) / 1000000).toFixed(1)
                }M`
              : Math.abs(val) > 999
              ? `${("amount" === "amount" && "₦") || ""}${
                  Math.sign(val) * (Math.abs(val) / 1000).toFixed(1)
                }k`
              : Math.sign(val) * Math.abs(val);
          }}
        />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar
          dataKey="pv"
          stackId="a"
          fill="#46A246"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar dataKey="uv" fill="#CBC7C6" barSize={10} radius={[3, 3, 0, 0]} />
        <Bar dataKey="uv" fill="#D94040" barSize={10} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TransactionsChartPayout;
