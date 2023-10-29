import React from "react";
import CustomTable from "../../../reuseables/CustomTable";

export default function TransactionsList({ data }) {
  const columns = [
    /*  {
      title: "ACTIONS",
      dataIndex: "action",
    
      width: 130,
    }, */
    {
      title: "TRANSACTION REF",
      dataIndex: "id",
      width: 140,
    },
    {
      title: "DATE",
      dataIndex: "dateCreated",
      width: 160,
    },
    {
      title: "GATEWAY",
      dataIndex: "payOutProvider['name']",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "RECEIVER",
      dataIndex: "senderName",
      //render: () => "Other 1",
      width: 180,
    },
    {
      title: "BANK",
      dataIndex: "beneficiary['beneficiaryBank']['bankName']",
      width: 180,
      //render: () => "Other 2",
    },
    {
      title: "ACCOUNT NO",
      dataIndex: "beneficiary['beneficiaryBank']['accountNumber']",
      width: 120,
    },
    {
      title: "CURRENCY",
      dataIndex: "country['currencyCode']",
      width: 100,
    },
    {
      title: "AMOUNT",
      dataIndex: "Amount",
      width: 120,
    },
    {
      title: "TRANSFER FEE",
      dataIndex: "transferFee",
      width: 120,
    },
    {
      title: "TRANSACTION STATUS",
      dataIndex: "statusNew",
      width: 200,
    },
  ];

  const newData = data?.payOutTransactions?.map((item) => {
    return {
      ...item,
      statusNew: (
        <>
          {" "}
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "10000px",
              background:
                item?.status === "Successful"
                  ? "#63ff706c"
                  : item?.status === "Pending"
                  ? "#FEF0C7"
                  : "#ff63634b",
              color:
                item?.status === "Successful"
                  ? "green"
                  : item?.status === "Pending"
                  ? "#DC6803"
                  : "red",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.status}
          </div>
        </>
      ),
    };
  });
  return (
    <CustomTable
      noData={false}
      //loading={isLoading || isFetching}
      Apidata={newData || []}
      tableColumns={columns}
    />
  );
}
