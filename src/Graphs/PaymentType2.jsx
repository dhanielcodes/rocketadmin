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

function PaymentType2({ apiData }) {
  const data = [
    {
      name: "Jan",
      amt: apiData?.January?.appTransactionValue,
      pv: apiData?.January?.backOfficeTransactionValue,
      uv: apiData?.January?.webTransactionValue,
    },
    {
      name: "Feb",
      amt: apiData?.February?.appTransactionValue,
      pv: apiData?.February?.backOfficeTransactionValue,
      uv: apiData?.February?.webTransactionValue,
    },
    {
      name: "Mar",
      amt: apiData?.March?.appTransactionValue,
      pv: apiData?.March?.backOfficeTransactionValue,
      uv: apiData?.March?.webTransactionValue,
    },
    {
      name: "Apr",
      amt: apiData?.April?.appTransactionValue,
      pv: apiData?.April?.backOfficeTransactionValue,
      uv: apiData?.April?.webTransactionValue,
    },
    {
      name: "May",
      amt: apiData?.May?.appTransactionValue,
      pv: apiData?.May?.backOfficeTransactionValue,
      uv: apiData?.May?.webTransactionValue,
    },
    {
      name: "June",
      amt: apiData?.June?.appTransactionValue,
      pv: apiData?.June?.backOfficeTransactionValue,
      uv: apiData?.June?.webTransactionValue,
    },
    {
      name: "July",
      amt: apiData?.July?.appTransactionValue,
      pv: apiData?.July?.backOfficeTransactionValue,
      uv: apiData?.July?.webTransactionValue,
    },
    {
      name: "Aug",
      amt: apiData?.August?.appTransactionValue,
      pv: apiData?.August?.backOfficeTransactionValue,
      uv: apiData?.August?.webTransactionValue,
    },
    {
      name: "Sep",
      amt: apiData?.September?.appTransactionValue,
      pv: apiData?.September?.backOfficeTransactionValue,
      uv: apiData?.September?.webTransactionValue,
    },
    {
      name: "Oct",
      amt: apiData?.October?.appTransactionValue,
      pv: apiData?.October?.backOfficeTransactionValue,
      uv: apiData?.October?.webTransactionValue,
    },
    {
      name: "Nov",
      amt: apiData?.November?.appTransactionValue,
      pv: apiData?.November?.backOfficeTransactionValue,
      uv: apiData?.November?.webTransactionValue,
    },
    {
      name: "Dec",
      amt: apiData?.December?.appTransactionValue,
      pv: apiData?.December?.backOfficeTransactionValue,
      uv: apiData?.December?.webTransactionValue,
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
          App:{" "}
          <span style={{ color: payload?.[0]?.stroke }}>
            {kFormatter4(payload?.[0]?.value)}
          </span>
        </p>
        <p>
          Back Office:{" "}
          <span style={{ color: payload?.[1]?.stroke }}>
            {kFormatter4(payload?.[1]?.value)}
          </span>
        </p>

        <p>
          Web:{" "}
          <span style={{ color: payload?.[2]?.stroke }}>
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
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Bar
          dataKey="pv"
          stackId="a"
          fill="#FB923C"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar dataKey="amt" fill="#CBC7C6" barSize={10} radius={[3, 3, 0, 0]} />
        <Bar dataKey="uv" fill="#7694E0" barSize={10} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PaymentType2;
