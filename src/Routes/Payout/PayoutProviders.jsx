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
import {
  getPayoutClientDashboard,
  getPayoutProviders,
} from "../../services/PayoutDashboard";
import BodyLayout from "../../reuseables/BodyLayout";

function PayoutProvidersPage() {
  const [sortdate, setSortDate] = useState(0);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: providers,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getPayoutProviders(),
  });

  console.log(providers);

  const columns = [
    {
      title: "PROVIDER ID",
      dataIndex: "id",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
    },
    {
      title: "PROVIDER NAME",
      dataIndex: "name",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateCreated",
    },
    {
      title: "STATUS",
      dataIndex: "statusNew",
    },
  ];

  const newData = providers?.data?.map((item) => {
    return {
      ...item,
      statusNew: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background: item?.status ? "#37d7446c" : "#ff63634b",
              color: item?.status ? "green" : "red",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.status ? "Active" : "Inactive"}
          </div>
        </>
      ),
    };
  });

  console.log(newData);

  return (
    <BodyLayout>
      <Content>
        <div className="tablecontent">
          <div className="content">
            <div className="heading">Payout Providers </div>
            <div className="sub">
              This page allows you to add and update payment providers
            </div>
          </div>
          <div className="top">
            <SearchInput
              placeholder="Search Records"
              className="SearchRecords"
            />
          </div>
          <CustomTable
            noData={newData?.length}
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
    </BodyLayout>
  );
}

export default PayoutProvidersPage;
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
