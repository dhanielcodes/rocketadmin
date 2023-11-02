import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import {
  AiOutlineArrowRight,
  AiOutlineDown,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { TiArrowUnsorted, TiMediaRecord } from "react-icons/ti";
import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getPayoutClientDashboard } from "../../services/PayoutDashboard";

function ClientTable() {
  const [sortdate, setSortDate] = useState(0);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: clients,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getPayoutClientDashboard(userDetails?.userId),
  });

  console.log(clients);

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
      title: "CLIENT ID",
      dataIndex: "clientId",
      width: 140,
    },
    {
      title: "ID VERIFICATION",
      dataIndex: "idNumber",
      width: 190,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      width: 160,
    },
    {
      title: "NAME",
      dataIndex: "name",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      //render: () => "Other 1",
      width: 220,
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      width: 220,
      //render: () => "Other 2",
    },
    {
      title: "MOBILE NO",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateAdded",
      width: 220,
    },
  ];

  const newData = clients?.data?.allPayoutClients?.map((item) => {
    return {
      action: (
        <Link
          style={{
            textDecoration: "none",
          }}
          to={`/client-detail?userId=${item?.userId}`}
        >
          <p
            onClick={() => {
              console.log(item?.userId);
            }}
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            View Details
          </p>
        </Link>
      ),
      clientId: item?.userId,
      idNumber: (
        <div
          style={{
            padding: "8px 16px",
            borderRadius: "10000px",
            background: item?.isKYCCompleted ? "#63ff706c" : "#ff63634b",
            color: item?.isKYCCompleted ? "green" : "red",
            width: "fit-content",
            fontWeight: "700",
          }}
        >
          {item?.isKYCCompleted ? "Verified" : "Not Verified"}
        </div>
      ),
      name: item?.companyName,
      address: item?.address,
      email: item?.email,
      phone: item?.phone,
      dateAdded: item?.lastUpdated,
      status: (
        <>
          {" "}
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "10000px",
              background: item?.status === "Active" ? "#63ff706c" : "#ff63634b",
              color: item?.status === "Active" ? "green" : "red",
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

  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Clients </div>
          <div className="sub">
            This page allows you edit and update clients{" "}
          </div>
        </div>
        <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div>
        <CustomTable
          noData={clients?.data?.allPayoutClients?.length}
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

export default ClientTable;
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
