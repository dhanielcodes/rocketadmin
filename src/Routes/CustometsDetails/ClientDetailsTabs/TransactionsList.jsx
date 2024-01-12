import React from "react";
import CustomTable from "../../../reuseables/CustomTable";
import { kFormatter4 } from "../../../utils/format";
import TransferLogsTable from "../../Dashboard/TransferLogs";

export default function TransactionsList({ data }) {
  return <TransferLogsTable userId={data} />;
}
