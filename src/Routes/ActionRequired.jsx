import React, { useRef } from "react";
import { styled } from "styled-components";
import BodyLayout from "../reuseables/BodyLayout";
import AppInput from "../reuseables/AppInput";
//import AppButton from "../reuseables/AppButton";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import SearchInput from "../reuseables/SearchInput";
import UpcomingExpiredID from "../COMPONENTS/UpcomingExpiredID";
import SendMoney_inactiveCustomers from "../COMPONENTS/SendMoney_inactiveCustomers";

import { useState } from "react";
//import SearchInput from "../reuseables/SearchInput";
import CustomerFilter from "../COMPONENTS/CustomerFilter";
import CustomTable from "../reuseables/CustomTable";
import { kFormatter, removeDup } from "../utils/format";
import { getUsers } from "../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IconSearch } from "@arco-design/web-react/icon";
import { Input } from "@arco-design/web-react";

function ActionRequired() {
  const [filter, setFilter] = useState(false);
  const AppData = JSON.parse(localStorage?.getItem("AppData"));
  console.log(AppData);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: customers,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getUserfs"],
    queryFn: () => getUsers(),
  });

  console.log(customers);
  const inputRef = useRef(null);

  const columns = [
    {
      title: "CUSTOMER REF",
      dataIndex: "userId",
      width: 190,
    },
    {
      title: "ID VERIFICATION",
      dataIndex: "idNumber",
      width: 190,
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      width: 260,
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "NAME",
      dataIndex: "action",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      filterIcon: <IconSearch />,
      filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
        return (
          <div className="arco-table-custom-filter">
            <Input.Search
              ref={inputRef}
              searchButton
              placeholder="Please enter name"
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
          ? row.firstName.toUpperCase().indexOf(value.toUpperCase()) !== -1
          : true,
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => inputRef.current.focus(), 150);
        }
      },

      width: 200,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      width: 280,
      filters: removeDup(
        customers?.data?.map((item) => {
          return {
            text: item?.city?.name + ", " + item?.country?.name,
            value: item?.city?.name + ", " + item?.country?.name,
          };
        })
      ),

      onFilter: (value, row) => row.address.indexOf(value) > -1,
      filterMultiple: true,
    },

    {
      title: "MOBILE NO",
      dataIndex: "phone",
      width: 160,
    },
    {
      title: "DATE CREATED",
      dataIndex: "dateCreated",
      width: 190,

      //render: () => "Other",
    },

    {
      title: "EMAIL VERIFIED",
      dataIndex: "status",
      width: 220,

      //render: () => "Other 2",
    },
  ];

  console.log(
    customers?.data?.filter(
      (item) =>
        item?.isKYCCompleted === false ||
        item?.isEmailVerified === false ||
        item?.status === "Suspended"
    )
  );
  const newData = customers?.data
    ?.filter(
      (item) =>
        item?.isKYCCompleted === false ||
        item?.isEmailVerified === false ||
        item?.status === "Suspended"
    )
    ?.map((item) => {
      return {
        ...item,
        action: (
          <div
            style={{
              textDecoration: "none",
            }}
            to={`/customers-details?userId=${JSON.stringify(item)}`}
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
              {item?.firstName}
            </p>
          </div>
        ),
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
        status: (
          <>
            {" "}
            <div
              style={{
                padding: "8px 16px",
                borderRadius: "10000px",
                background: item?.status ? "#63ff706c" : "#ff63634b",
                color: item?.status ? "green" : "red",
                width: "fit-content",
                fontWeight: "700",
              }}
            >
              {item?.status ? "True" : "False"}
            </div>
          </>
        ),
      };
    });

  console.log(newData);
  return (
    <BodyLayout>
      <Content>
        <div className="header">
          <div className="top">
            <p>Action Required</p>
            <span>
              This page allows shows customers with certain actions required
            </span>
          </div>
          <div className="btn">
            <button
              style={{
                backgroundColor: "white",
                color: "#464F60",
                border: "2px solid gainsboro",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 5.83301H17.5"
                  stroke="#344054"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M5 10H15"
                  stroke="#344054"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8.33337 14.167H11.6667"
                  stroke="#344054"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              Filter{" "}
            </button>
          </div>
        </div>
        <div className="main">
          <div className="head">
            <div className="status">
              <h2>Inactive Customers</h2>
              <SearchInput placeholder="Search" style={{ width: "30vw" }} />
            </div>
            <div className="btn">
              <button
                style={{
                  backgroundColor: "white",
                  color: "#464F60",
                }}
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66661 13.1666L9.99994 16.4999M9.99994 16.4999L13.3333 13.1666M9.99994 16.4999V8.99994M17.3999 14.0749C18.1244 13.5655 18.6677 12.8384 18.951 11.9992C19.2343 11.1601 19.2428 10.2525 18.9753 9.40813C18.7078 8.56381 18.1782 7.82669 17.4633 7.30375C16.7485 6.78081 15.8856 6.49925 14.9999 6.49994H13.9499C13.6993 5.52317 13.2304 4.61598 12.5784 3.84668C11.9264 3.07737 11.1084 2.46599 10.186 2.05857C9.2635 1.65115 8.26065 1.4583 7.25288 1.49454C6.24512 1.53078 5.25871 1.79517 4.36791 2.2678C3.47711 2.74043 2.70513 3.40898 2.1101 4.22314C1.51507 5.03729 1.11249 5.97582 0.932662 6.96807C0.752836 7.96032 0.800453 8.98044 1.07193 9.95163C1.3434 10.9228 1.83166 11.8198 2.49994 12.5749"
                    stroke="#344054"
                    stroke-width="1.336"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Export Report{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8 11L14 5"
                    stroke="#868FA0"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#464F60",
                }}
              >
                <span style={{ color: "gray" }}>Branch:</span>
                {/* <AiOutlinePlus size={18} style={{ color: "white" }} /> */}
                30 Days
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8 11L14 5"
                    stroke="#868FA0"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <CustomTable
            noData={customers?.data?.length}
            loading={isLoading || isFetching}
            Apidata={newData}
            tableColumns={columns}
          />
        </div>
        {/*   <div className="main">
          <div className="head">
            <div className="status">
              <h2>Expired IDs</h2>
              <SearchInput placeholder="Search" style={{ width: "30vw" }} />
            </div>
            <div className="btn">
              <button
                style={{
                  backgroundColor: "white",
                  color: "#464F60",
                }}
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66661 13.1666L9.99994 16.4999M9.99994 16.4999L13.3333 13.1666M9.99994 16.4999V8.99994M17.3999 14.0749C18.1244 13.5655 18.6677 12.8384 18.951 11.9992C19.2343 11.1601 19.2428 10.2525 18.9753 9.40813C18.7078 8.56381 18.1782 7.82669 17.4633 7.30375C16.7485 6.78081 15.8856 6.49925 14.9999 6.49994H13.9499C13.6993 5.52317 13.2304 4.61598 12.5784 3.84668C11.9264 3.07737 11.1084 2.46599 10.186 2.05857C9.2635 1.65115 8.26065 1.4583 7.25288 1.49454C6.24512 1.53078 5.25871 1.79517 4.36791 2.2678C3.47711 2.74043 2.70513 3.40898 2.1101 4.22314C1.51507 5.03729 1.11249 5.97582 0.932662 6.96807C0.752836 7.96032 0.800453 8.98044 1.07193 9.95163C1.3434 10.9228 1.83166 11.8198 2.49994 12.5749"
                    stroke="#344054"
                    stroke-width="1.336"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Export Report{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8 11L14 5"
                    stroke="#868FA0"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="TableGrid">
            <table className="table">
              <thead>
                <tr>
                  <th> </th>
                  <th>CUSTOMER REF </th>
                  <th>ID </th>
                  <th>NAME</th>
                  <th>EMAIL ID</th>
                  <th>MOBILE NO</th>
                  <th>REGISTRATION DATE</th>
                  <th>EXPIRY DATE</th>
                  <th>ACTIVE STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div className="row">
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
                <button>0</button>
                <button>
                  <AiOutlineRight />
                </button>
              </div>
            </div>
          </div>
        </div> */}
        {/*      <UpcomingExpiredID />
        <SendMoney_inactiveCustomers /> */}
      </Content>
    </BodyLayout>
  );
}

export default ActionRequired;
const Content = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top p {
    font-size: 32px;
    font-weight: 500;
  }
  .top span {
    font-size: 15px;
    color: #848d87;
    font-weight: 400;
  }
  .btn {
    display: flex;
    gap: 10px;
  }
  .btn button {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 12px 13px 12px;
    border: 1px solid gainsboro;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
  .status {
    display: flex;
    flex-direction: column;
  }
  .status h2 {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
  }
  .main {
    background-color: white;
    /* height: 750px; */
    margin-top: 30px;
    border-radius: 10px;
    overflow: hidden;
    overflow: scroll;
  }
  .TableGrid {
    overflow: hidden;
    overflow: scroll;
    position: relative;
  }
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100vw;
    overflow: scroll;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

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
`;
