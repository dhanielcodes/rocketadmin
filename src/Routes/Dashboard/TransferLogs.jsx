import { Link } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getAgentRates } from "../../services/PayoutDashboard";
import CountryFlag from "react-country-flag";
import { kFormatter3, kFormatter2, kFormatter4 } from "../../utils/format";
import { Tranx } from "../../services/Dashboard";
import AmountFormatter from "../../reuseables/AmountFormatter";

function TransferLogsTable({ userId }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: rates,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["Tranx"],
    queryFn: () => Tranx(userId),
  });

  console.log(rates, userId);

  const columns = [
    {
      title: "TRANSACTION STATUS",
      dataIndex: "status",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "COLLECTION STATUS",
      dataIndex: "status2",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "TRANSACTION REF",
      dataIndex: "paymentRef",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "CUSTOMER REF",
      dataIndex: "userId",
      width: 190,
    },
    {
      title: "SENDER",
      dataIndex: "senderName",
      width: 190,
    },

    {
      title: "RECEIVER",
      dataIndex: "beneficiaryName",
      width: 280,

      //render: () => "Other",
    },
    {
      title: "COUNTRY",
      dataIndex: "countryo",
      width: 240,

      //render: () => "Other",
    },
    {
      title: "MOBILE",
      dataIndex: "beneficiaryPhone",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "GBP AMOUNT",
      dataIndex: "newPaymentAmount",
      width: 120,
    },

    {
      title: "RATE",
      dataIndex: "rate",
      render: (ire) => kFormatter3(ire),
      width: 120,
    },
    {
      title: "FOREIGN CURRENCY AMOUNT",
      dataIndex: "receivedAmount",
      render: (ire) => kFormatter3(ire),
      width: 260,
    },
    {
      title: "COLLECTION TYPE",
      dataIndex: "collectionType",
      width: 200,

      //render: () => "Other",
    },

    {
      title: "BRANCH",
      dataIndex: "transactionSource",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "PAYMENT DATE",
      dataIndex: "paymentDate",
      width: 260,
      //render: () => "Other 2",
    },
  ];

  const newData = rates?.data?.map((item) => {
    return {
      ...item,
      newPaymentAmount: (
        <>
          {" "}
          <div>
            <AmountFormatter
              currency={item?.senderCurrency}
              value={item?.paymentAmount}
            />
          </div>
        </>
      ),
      status: (
        <>
          {" "}
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "10000px",
              background:
                item?.paymentStatus === "Deposited"
                  ? "#63ff706c"
                  : item?.paymentStatus === "Pending"
                  ? "#ffe06357"
                  : "#ff63634b",
              color:
                item?.paymentStatus === "Deposited"
                  ? "#63ff70"
                  : item?.paymentStatus === "Pending"
                  ? "#ffe063"
                  : "#ff6363",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.paymentStatus}
          </div>
        </>
      ),

      status2: (
        <>
          {" "}
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "10000px",
              background:
                item?.collectStatus === "Received"
                  ? "#63ff706c"
                  : item?.collectStatus === "Pending"
                  ? "#ffe06357"
                  : item?.collectStatus === ""
                  ? "#93939383"
                  : "#ff63634b",
              color:
                item?.collectStatus === "Received"
                  ? "#63ff70"
                  : item?.collectStatus === "Pending"
                  ? "#ffe063"
                  : item?.collectStatus === ""
                  ? "#939393"
                  : "#ff6363",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.collectStatus || "Pending"}
          </div>
        </>
      ),

      countryo: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CountryFlag
            style={{
              borderRadius: "10000000px",
              marginRight: "10px",
            }}
            countryCode={item?.senderCurrency?.slice(0, 2)}
            svg
          />
          {item?.senderCountry}
        </div>
      ),
    };
  });

  console.log(newData);

  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Transfer List</div>
        </div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}
        <CustomTable
          noData={rates?.data?.length}
          loading={isLoading || isFetching}
          Apidata={newData}
          tableColumns={columns}
        />

        {/* <div className="row">
          <span>Showing 1-5 of entries</span>
          <div className="pagins">
            <p>Rows per page:</p>
            <select>
              <option>5</option>
            </select>
            <div className="arrow">
              <button
                onClick={() => {
                  // setSortDate(sortdate - 1);
                  // setEnd((prev) => prev - end);
                }}
              >
                <AiOutlineLeft />
              </button>
              <button>{sortdate}</button>
              <button>
                <AiOutlineRight />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </Content>
  );
}

export default TransferLogsTable;
const Content = styled.div`
  .top {
    padding: 10px 30px 30px 20px;
  }

  .tablecontent {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 10px;
  }
  .content {
    padding: 15px 20px 0px 20px;
  }
  .content .heading {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;
  }
  .content .sub {
    font-size: 14px;
    color: #848d87;
  }
  .content button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 7rem;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    cursor: pointer;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100%;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  /* .table tr:nth-child(odd) {
    background-color: #f6f6f6;
} */

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
  }
  .table span {
    font-size: 14px;
    font-weight: 400;
    color: #667085;
  }
  .row {
    display: flex;
    justify-content: space-between;
    padding: 25px;
  }

  .row span {
    font-size: 15px;
    color: #687182;
  }

  .pagins {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  .pagins p {
    font-size: 14px;
    color: #687182;
  }

  .pagins select {
    width: 48px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    padding: 2px;
    border-radius: 3px;
  }

  .arrow {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .arrow button {
    width: 28.8px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    border-radius: 3px;
  }
`;
