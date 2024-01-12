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
import { kFormatter4 } from "../utils/format";

function TransactionsChartPayout({ apiData }) {
  const data = [
    {
      name: "Jan",
      amt: apiData?.January?.successfulValue,
      pv: apiData?.January?.pendingValue,
      uv: apiData?.January?.failedValue,
    },
    {
      name: "Feb",
      amt: apiData?.February?.successfulValue,
      pv: apiData?.February?.pendingValue,
      uv: apiData?.February?.failedValue,
    },
    {
      name: "Mar",
      amt: apiData?.March?.successfulValue,
      pv: apiData?.March?.pendingValue,
      uv: apiData?.March?.failedValue,
    },
    {
      name: "Apr",
      amt: apiData?.April?.successfulValue,
      pv: apiData?.April?.pendingValue,
      uv: apiData?.April?.failedValue,
    },
    {
      name: "May",
      amt: apiData?.May?.successfulValue,
      pv: apiData?.May?.pendingValue,
      uv: apiData?.May?.failedValue,
    },
    {
      name: "June",
      amt: apiData?.June?.successfulValue,
      pv: apiData?.June?.pendingValue,
      uv: apiData?.June?.failedValue,
    },
    {
      name: "July",
      amt: apiData?.July?.successfulValue,
      pv: apiData?.July?.pendingValue,
      uv: apiData?.July?.failedValue,
    },
    {
      name: "Aug",
      amt: apiData?.August?.successfulValue,
      pv: apiData?.August?.pendingValue,
      uv: apiData?.August?.failedValue,
    },
    {
      name: "Sep",
      amt: apiData?.September?.successfulValue,
      pv: apiData?.September?.pendingValue,
      uv: apiData?.September?.failedValue,
    },
    {
      name: "Oct",
      amt: apiData?.October?.successfulValue,
      pv: apiData?.October?.pendingValue,
      uv: apiData?.October?.failedValue,
    },
    {
      name: "Nov",
      amt: apiData?.November?.successfulValue,
      pv: apiData?.November?.pendingValue,
      uv: apiData?.November?.failedValue,
    },
    {
      name: "Dec",
      amt: apiData?.December?.successfulValue,
      pv: apiData?.December?.pendingValue,
      uv: apiData?.December?.failedValue,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    return (
      <div
        style={{ background: "#e7e7e7", borderRadius: "10px", padding: "10px" }}
        className="custom-tooltip"
      >
        <h2 className="label">{`${label}`}</h2>
        <p>
          Success:{" "}
          <span style={{ color: payload?.[0]?.stroke }}>
            {kFormatter4(payload?.[0]?.value)}
          </span>
        </p>
        <p>
          Pending:{" "}
          <span style={{ color: payload?.[1]?.stroke }}>
            {kFormatter4(payload?.[1]?.value)}
          </span>
        </p>

        <p>
          Failed:{" "}
          <span style={{ color: payload?.[1]?.stroke }}>
            {kFormatter4(payload?.[2]?.value)}
          </span>
        </p>
      </div>
    );
  };

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
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Bar
          dataKey="amt"
          stackId="a"
          fill="#46A246"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar dataKey="pv" fill="#CBC7C6" barSize={10} radius={[3, 3, 0, 0]} />
        <Bar dataKey="uv" fill="#D94040" barSize={10} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TransactionsChartPayout;
