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

function PaymentType({ apiData }) {
  const data = [
    {
      name: "Jan",
      amt: apiData?.January?.ManualBankTransferValue,
      pv: apiData?.January?.PayWithBankValue,
      uv: apiData?.January?.WalletValue,
    },
    {
      name: "Feb",
      amt: apiData?.February?.ManualBankTransferValue,
      pv: apiData?.February?.PayWithBankValue,
      uv: apiData?.February?.WalletValue,
    },
    {
      name: "Mar",
      amt: apiData?.March?.ManualBankTransferValue,
      pv: apiData?.March?.PayWithBankValue,
      uv: apiData?.March?.WalletValue,
    },
    {
      name: "Apr",
      amt: apiData?.April?.ManualBankTransferValue,
      pv: apiData?.April?.PayWithBankValue,
      uv: apiData?.April?.WalletValue,
    },
    {
      name: "May",
      amt: apiData?.May?.ManualBankTransferValue,
      pv: apiData?.May?.PayWithBankValue,
      uv: apiData?.May?.WalletValue,
    },
    {
      name: "June",
      amt: apiData?.June?.ManualBankTransferValue,
      pv: apiData?.June?.PayWithBankValue,
      uv: apiData?.June?.WalletValue,
    },
    {
      name: "July",
      amt: apiData?.July?.ManualBankTransferValue,
      pv: apiData?.July?.PayWithBankValue,
      uv: apiData?.July?.WalletValue,
    },
    {
      name: "Aug",
      amt: apiData?.August?.ManualBankTransferValue,
      pv: apiData?.August?.PayWithBankValue,
      uv: apiData?.August?.WalletValue,
    },
    {
      name: "Sep",
      amt: apiData?.September?.ManualBankTransferValue,
      pv: apiData?.September?.PayWithBankValue,
      uv: apiData?.September?.WalletValue,
    },
    {
      name: "Oct",
      amt: apiData?.October?.ManualBankTransferValue,
      pv: apiData?.October?.PayWithBankValue,
      uv: apiData?.October?.WalletValue,
    },
    {
      name: "Nov",
      amt: apiData?.November?.ManualBankTransferValue,
      pv: apiData?.November?.PayWithBankValue,
      uv: apiData?.November?.WalletValue,
    },
    {
      name: "Dec",
      amt: apiData?.December?.ManualBankTransferValue,
      pv: apiData?.December?.PayWithBankValue,
      uv: apiData?.December?.WalletValue,
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
          Manual Bank Transfer:{" "}
          <span style={{ color: payload?.[0]?.stroke }}>
            {kFormatter4(payload?.[0]?.value)}
          </span>
        </p>
        <p>
          Pay With Bank:{" "}
          <span style={{ color: payload?.[1]?.stroke }}>
            {kFormatter4(payload?.[1]?.value)}
          </span>
        </p>

        <p>
          Wallet:{" "}
          <span style={{ color: payload?.[2]?.stroke }}>
            {kFormatter4(payload?.[2]?.value)}
          </span>
        </p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" aspect={3}>
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
        <Tooltip content={<CustomTooltip />} /> {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar
          dataKey="pv"
          stackId="a"
          fill="#5E5ADB"
          barSize={10}
          radius={[3, 3, 0, 0]}
        />
        <Bar dataKey="amt" fill="#2A278F" barSize={10} radius={[3, 3, 0, 0]} />
        <Bar dataKey="uv" fill="#2A278F" barSize={10} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PaymentType;
