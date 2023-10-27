import React from "react";
import CustomTable from "../../../reuseables/CustomTable";

export default function ChargesList() {
  const columns = [
    {
      title: "ACTIONS",
      dataIndex: "action",
      fixed: "left",
      /*   sorter: {
            compare: (a, b) => a.name - b.name,
            multiple: 1,
          }, */
      width: 130,
    },
    {
      title: "COUNTRY",
      dataIndex: "clientId",
      width: 140,
    },
    {
      title: "CURRENCY",
      dataIndex: "idNumber",
      width: 190,
    },
    {
      title: "CHARGE TYPE",
      dataIndex: "name",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "AMOUNT",
      dataIndex: "address",
      //render: () => "Other 1",
      width: 220,
    },
    {
      title: "MIN FIXED CAPPED AMT",
      dataIndex: "email",
      width: 220,
      //render: () => "Other 2",
    },
    {
      title: "MAX FIXED CAPPED AMT",
      dataIndex: "phone",
      width: 220,
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateAdded",
      width: 220,
    },
    {
      title: "LAST UPDATED",
      dataIndex: "dateAdded",
      width: 220,
    },
  ];
  return (
    <div>
      <div>
        <div
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            fontWeight: 600,
          }}
        >
          Charges Type
        </div>
      </div>
      <CustomTable
        noData={false}
        //loading={isLoading || isFetching}
        Apidata={[]}
        tableColumns={columns}
      />
    </div>
  );
}
