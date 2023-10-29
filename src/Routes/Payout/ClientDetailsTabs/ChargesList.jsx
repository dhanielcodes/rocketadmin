import React from "react";
import CustomTable from "../../../reuseables/CustomTable";

export default function ChargesList({ data }) {
  const columns = [
    /*   {
      title: "ACTIONS",
      dataIndex: "action",
      fixed: "left",
     
      width: 130,
    }, */
    {
      title: "COUNTRY",
      dataIndex: "currency['name']",
      width: 140,
    },
    {
      title: "CURRENCY",
      dataIndex: "currency['currencyCode']",
      width: 190,
    },
    {
      title: "CHARGE TYPE",
      dataIndex: "payoutChargeType['typeName']",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "AMOUNT",
      dataIndex: "baseValue",
      //render: () => "Other 1",
      width: 220,
    },
    {
      title: "MIN FIXED CAPPED AMT",
      dataIndex: "minimumFixedCapped",
      width: 220,
      //render: () => "Other 2",
    },
    {
      title: "MAX FIXED CAPPED AMT",
      dataIndex: "maximumFixedCapped",
      width: 220,
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateCreated",
      width: 220,
    },
    {
      title: "LAST UPDATED",
      dataIndex: "lastUpdated",
      width: 220,
    },
  ];

  const newData = data?.payOutClientCharges?.map((item) => {
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
        Apidata={newData || []}
        tableColumns={columns}
      />
    </div>
  );
}
