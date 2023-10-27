import React from "react";
import CustomTable from "../../../reuseables/CustomTable";

export default function TransactionsList({ data }) {
  const columns = [
    {
      title: "ACTIONS",
      dataIndex: "action",
      /*   sorter: {
            compare: (a, b) => a.name - b.name,
            multiple: 1,
          }, */
      width: 130,
    },
    {
      title: "TRANSACTION REF",
      dataIndex: "clientId",
      width: 240,
    },
    {
      title: "DATE",
      dataIndex: "idNumber",
      width: 190,
    },
    {
      title: "GATEWAY",
      dataIndex: "name",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "RECEIVER",
      dataIndex: "address",
      //render: () => "Other 1",
      width: 420,
    },
    {
      title: "BANK",
      dataIndex: "email",
      width: 320,
      //render: () => "Other 2",
    },
    {
      title: "ACCOUNT NO",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "CURRENCY",
      dataIndex: "dateAdded",
      width: 220,
    },
    {
      title: "AMOUNT",
      dataIndex: "dateAdded",
      width: 220,
    },
    {
      title: "TRANSFER FEE",
      dataIndex: "dateAdded",
      width: 220,
    },
    {
      title: "TRANSACTION STATUS",
      dataIndex: "status",
      width: 200,
    },
  ];
  return (
    <CustomTable
      noData={false}
      //loading={isLoading || isFetching}
      Apidata={[]}
      tableColumns={columns}
    />
  );
}
