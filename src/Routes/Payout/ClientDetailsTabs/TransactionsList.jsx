import React from "react";
import CustomTable from "../../../reuseables/CustomTable";
import { kFormatter4 } from "../../../utils/format";

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
      title: "TRANSACTION STATUS",
      dataIndex: "statusNew",
      width: 200,
    },
    {
      title: "DATE",
      dataIndex: "dateCreated",
      width: 160,
    },
    {
      title: "GATEWAY",
      dataIndex: "newGateWay",
      width: 230,

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
      render: (item) => kFormatter4(item),
    },
    {
      title: "TRANSFER FEE",
      dataIndex: "transferFee",
      width: 120,
    },
  ];

  const newData = data?.payOutTransactions?.map((item) => {
    return {
      ...item,
      newGateWay: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "1000px",
              marginRight: "10px",
              objectFit: "cover",
            }}
            src={item?.payOutProvider["logo"]}
            alt=""
          />
          {item?.payOutProvider["name"]}
        </div>
      ),
      statusNew: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background:
                item?.status === "Successful"
                  ? "#37d7446c"
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
