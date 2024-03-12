import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import {
  AiOutlineArrowRight,
  AiOutlineDown,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import CustomTable from "../reuseables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getPayoutClientDashboard } from "../services/PayoutDashboard";
import { kFormatter3, kFormatter4, removeDup } from "../utils/format";
import { DatePicker, Input } from "@arco-design/web-react";
import { IconSearch } from "@arco-design/web-react/icon";
import {
  getpayouttransactionbydate,
  getpayouttransactionbyref,
} from "../services/Dashboard";

function TransactionList({ clients, isLoading, isFetching, refetch }) {
  const [sortdate, setSortDate] = useState(0);
  const [date, setDate] = useState();
  const [ref, setRef] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);
  const {
    data,
    refetch: refetcDate,
    isLoading: load1,
    isFetching: fetch1,
  } = useQuery({
    queryKey: ["getpayouttransactionbydate"],
    queryFn: () => getpayouttransactionbydate(date?.[0], date?.[1]),
  });

  const {
    data: newArr,
    refetch: refetchRef,
    isLoading: load2,
    isFetching: fetch2,
  } = useQuery({
    queryKey: ["getpayouttransactionbyref"],
    queryFn: () => getpayouttransactionbyref(ref),
  });

  const lowData = ref
    ? newArr?.data || []
    : date?.[1]
    ? data?.data || []
    : clients;

  console.log(lowData);

  useEffect(() => {
    refetcDate(date?.[0], date?.[1]);
  }, [date?.[1]]);

  useEffect(() => {
    refetchRef(ref);
  }, [ref]);

  const inputRef = useRef(null);

  const columns = [
    {
      title: "TRANSACTION REF",
      dataIndex: "note",
      fixed: "left",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      /*  filterIcon: <IconSearch />,
      filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
        return (
          <div className="arco-table-custom-filter">
            <Input.Search
              ref={inputRef}
              searchButton
              placeholder="Please enter ref"
              value={filterKeys[0] || ""}
              onChange={(value) => {
                setFilterKeys(value ? [value] : []);
              }}
              onSearch={() => {
                confirm();
              }}
            />
          </div>
        );
      },
      onFilter: (value, row) =>
        value
          ? row.clientRef.toUpperCase().indexOf(value.toUpperCase()) !== -1
          : true,
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => inputRef.current.focus(), 150);
        }
      }, */
      width: 160,
    },
    {
      title: "ID",
      dataIndex: "id",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 160,
    },
    {
      title: "TRANSACTION STATUS",
      dataIndex: "statusNew",
      width: 200,
      filters: removeDup(
        lowData?.map((item) => {
          return {
            text: item?.status,
            value: item?.status,
          };
        })
      ),

      onFilter: (value, row) => row.status.indexOf(value) > -1,
      filterMultiple: true,
    },
    {
      title: "DATE",
      dataIndex: "dateCreated",
      width: 250,
    },
    {
      title: "CLIENT",
      dataIndex: "payoutClientApp['appName']",
      width: 200,
      filters: removeDup(
        lowData?.map((item) => {
          return {
            text: item?.payoutClientApp?.["appName"],
            value: item?.payoutClientApp?.["appName"],
          };
        })
      ),
      onFilter: (value, row) =>
        row?.payoutClientApp?.["appName"].indexOf(value) > -1,
      filterMultiple: true,
    },
    {
      title: "GATEWAY",
      dataIndex: "newGateWay",
      width: 230,
      filters: removeDup(
        lowData?.map((item) => {
          return {
            text: item?.payOutProvider?.["name"],
            value: item?.payOutProvider?.["name"],
          };
        })
      ),
      onFilter: (value, row) =>
        row?.payOutProvider?.["name"].indexOf(value) > -1,
      filterMultiple: true,
      //render: () => "Other",
    },
    {
      title: "RECEIVER",
      dataIndex: "beneficiary['beneficiaryName']",
      //render: () => "Other 1",
      width: 220,
    },
    {
      title: "BANK",
      dataIndex: "beneficiary['beneficiaryBank']['bankName']",
      width: 200,
      //render: () => "Other 2",
    },
    {
      title: "ACCOUNT NO",
      dataIndex: "beneficiary['beneficiaryBank']['accountNumber']",
      width: 140,
    },
    {
      title: "CURRENCY",
      dataIndex: "currency['code']",
      width: 120,
      filters: removeDup(
        lowData?.map((item) => {
          return {
            text: item?.currency?.["code"],
            value: item?.currency?.["code"],
          };
        })
      ),
      onFilter: (value, row) => row?.currency?.["code"].indexOf(value) > -1,
      filterMultiple: true,
    },
    {
      title: "AMOUNT",
      dataIndex: "Amount",
      width: 120,
      render: (item) => kFormatter3(item),
      sorter: {
        compare: (a, b) => a.Amount - b.Amount,
        multiple: 3,
      },
    },
    {
      title: "TRANSFER FEE",
      dataIndex: "transferFee",
      render: (item) => kFormatter3(item),

      width: 120,
    },
    {
      title: "WALLET BALANCE",
      dataIndex: "walletBalance",
      render: (item) => kFormatter3(item || 0),
      width: 220,
    },
  ];

  const newData = lowData?.map((item) => {
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

  console.log(newData);
  const [showDate, setShowDate] = useState(false);
  const [showRef, setShowRef] = useState(false);
  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Payout Transactions List </div>
        </div>

        <div
          style={{
            padding: "0 20px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <button
              onClick={() => {
                setShowRef(false);
                setShowDate(true);
                setDate();
              }}
            >
              Filter By Date
            </button>
            &nbsp; &nbsp;
            <button
              onClick={() => {
                setShowDate(false);
                setShowRef(true);
                setRef();
              }}
            >
              Filter By Ref
            </button>
          </div>
          <br />

          {showRef && (
            <Input.Search
              searchButton
              placeholder="Please enter ref"
              onChange={(value) => {
                setRef(value);
                setDate();
              }}
              style={{
                width: "300px",
              }}
            />
          )}

          {showDate && (
            <DatePicker.RangePicker
              style={{}}
              onChange={(e) => {
                console.log(e);
                setDate(e);
                setRef();
              }}
            />
          )}
        </div>
        <CustomTable
          noData={newData?.length}
          loading={
            isLoading || isFetching || load1 || fetch1 || load2 || fetch2
          }
          Apidata={newData}
          tableColumns={columns}
        />
      </div>
    </Content>
  );
}

export default TransactionList;
const Content = styled.div`
  button {
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
  border-radius: 30px;
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
