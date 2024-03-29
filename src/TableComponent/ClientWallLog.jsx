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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPayoutClientDashboard,
  processWalletLog,
} from "../services/PayoutDashboard";
import { kFormatter3, kFormatter4, removeDup } from "../utils/format";
import ReactCountryFlag from "react-country-flag";
import { IconSearch } from "@arco-design/web-react/icon";
import { DatePicker, Input } from "@arco-design/web-react";
import {
  getpayoutfundrequestbydate,
  getpayoutfundrequestbyref,
} from "../services/Dashboard";

function ClientWallLog({ clients, isLoading, isFetching, refetch }) {
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
    queryKey: ["getpayoutfundrequestbydate"],
    queryFn: () => getpayoutfundrequestbydate(date?.[0], date?.[1]),
  });

  const {
    data: newArr,
    refetch: refetchRef,
    isLoading: load2,
    isFetching: fetch2,
  } = useQuery({
    queryKey: ["getpayoutfundrequestbyref"],
    queryFn: () => getpayoutfundrequestbyref(ref),
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

  console.log(data, newArr, "dsdsds");

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: processWalletLog,
    onSuccess: (data) => {
      refetch();
      setActive("");
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });
  const inputRef = useRef(null);

  const columns = [
    {
      title: "ACTIONS",
      dataIndex: "action",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 60,
    },
    {
      title: "REQUEST STATUS",
      dataIndex: "statusNew",
      width: 160,
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
      title: "CLIENT ID",
      dataIndex: "userId",
      width: 100,
    },

    {
      title: "TRANSACTION REF",
      dataIndex: "id",
      width: 130,
    },
    {
      title: "CLIENT",
      dataIndex: "clientName",
      width: 130,
      filterIcon: <IconSearch />,
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
          ? row.clientName.toUpperCase().indexOf(value.toUpperCase()) !== -1
          : true,
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => inputRef.current.focus(), 150);
        }
      },
    },
    {
      title: "GATEWAY",
      dataIndex: "userWallet['name']",
      width: 160,
      filters: removeDup(
        lowData?.map((item) => {
          return {
            text: item?.userWallet["name"],
            value: item?.userWallet["name"],
          };
        })
      ),

      onFilter: (value, row) => row.userWallet["name"].indexOf(value) > -1,
      filterMultiple: true,
      //render: () => "Other",
    },
    {
      title: "CURRENNCY",
      dataIndex: "countryo",
      //render: () => "Other 1",
      width: 140,
    },
    {
      title: "AMOUNT",
      dataIndex: "amountApproved",
      width: 120,
      render: (item) => kFormatter3(item),
      sorter: {
        compare: (a, b) => a.amountApproved - b.amountApproved,
        multiple: 3,
      },
    },
    {
      title: "BALANCE BEFORE REQUEST",
      dataIndex: "balanceBeforeRequest",
      render: (item) => kFormatter3(item || 0),
      width: 220,
    },

    {
      title: "DATE",
      dataIndex: "dateCreated",
      width: 180,
    },
  ];

  const [active, setActive] = useState();

  const newData = lowData?.map((item, index) => {
    return {
      ...item,
      countryo: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ReactCountryFlag
            style={{
              borderRadius: "10000000px",
              marginRight: "10px",
            }}
            countryCode={item?.userWallet?.currency?.code?.slice(0, 2)}
            svg
          />
          {item?.userWallet?.currency?.code}
        </div>
      ),
      action: (
        <div
          style={{
            position: "relative",
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (item?.status === "Pending") {
              if (active === item?.id) {
                setActive("");
              } else {
                setActive(item?.id);
              }
            }
          }}
        >
          <svg
            width="20"
            height="16"
            viewBox="0 0 5 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              cursor: item?.status === "Pending" ? "pointer" : "not-allowed",
            }}
          >
            <path
              d="M2.5 4C3.6 4 4.5 3.1 4.5 2C4.5 0.9 3.6 0 2.5 0C1.4 0 0.5 0.9 0.5 2C0.5 3.1 1.4 4 2.5 4ZM2.5 6C1.4 6 0.5 6.9 0.5 8C0.5 9.1 1.4 10 2.5 10C3.6 10 4.5 9.1 4.5 8C4.5 6.9 3.6 6 2.5 6ZM2.5 12C1.4 12 0.5 12.9 0.5 14C0.5 15.1 1.4 16 2.5 16C3.6 16 4.5 15.1 4.5 14C4.5 12.9 3.6 12 2.5 12Z"
              fill="#667085"
            />
          </svg>

          {active === item?.id && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                position: "absolute",
                border: "1px solid #d1d1d1",
                borderRadius: "10px",
                textAlign: "left",
                left: "20px",
                bottom: index !== 0 && "0",
                top: index === 0 && "0",
                background: "#fff",
                zIndex: "10000",
                width: "160px",
              }}
              className="absolute border border-gray-200 rounded-lg text-left left-0 top-[160%] bg-white z-10"
            >
              <div
                onClick={() => {
                  mutate({
                    updatedBy: userDetails?.userId,
                    objectId: item?.id,
                    action: 1,
                  });
                }}
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <g clip-path="url(#clip0_2568_14904)">
                    <path
                      d="M14.6667 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4788 13.1394 11.2688 13.9817 9.89022 14.3893C8.5116 14.797 7.03815 14.748 5.68963 14.2498C4.3411 13.7516 3.18975 12.8308 2.40729 11.6248C1.62482 10.4188 1.25317 8.99211 1.34776 7.55761C1.44235 6.12312 1.99812 4.75762 2.93217 3.66479C3.86621 2.57195 5.1285 1.81033 6.53077 1.4935C7.93304 1.17668 9.40016 1.32163 10.7133 1.90674M14.6667 2.66674L7.99998 9.34007L5.99998 7.34007"
                      stroke="#101828"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2568_14904">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Approve
              </div>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#F04438",
                }}
                onClick={() => {
                  mutate({
                    updatedBy: userDetails?.userId,
                    objectId: item?.id,
                    action: 0,
                  });
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <path
                    d="M7.99998 1.3335C11.6666 1.3335 14.6666 4.3335 14.6666 8.00016C14.6666 11.6668 11.6666 14.6668 7.99998 14.6668C4.33331 14.6668 1.33331 11.6668 1.33331 8.00016C1.33331 4.3335 4.33331 1.3335 7.99998 1.3335ZM7.99998 2.66683C6.73331 2.66683 5.59998 3.06683 4.73331 3.80016L12.2 11.2668C12.8666 10.3335 13.3333 9.20016 13.3333 8.00016C13.3333 5.06683 10.9333 2.66683 7.99998 2.66683ZM11.2666 12.2002L3.79998 4.7335C3.06665 5.60016 2.66665 6.7335 2.66665 8.00016C2.66665 10.9335 5.06665 13.3335 7.99998 13.3335C9.26665 13.3335 10.4 12.9335 11.2666 12.2002Z"
                    fill="#F04438"
                  />
                </svg>
                Decline
              </div>
            </div>
          )}
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
                item?.status === "Approved"
                  ? "#37d7446c"
                  : item?.status === "Pending"
                  ? "#FEF0C7"
                  : "#ff63634b",
              color:
                item?.status === "Approved"
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
    <Content
      onClick={() => {
        setActive("");
      }}
    >
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Client Fund Request Log </div>
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
            isLoading ||
            isFetching ||
            mutateLoading ||
            load1 ||
            fetch1 ||
            load2 ||
            fetch2
          }
          Apidata={newData}
          tableColumns={columns}
          date={date}
          setDate={setDate}
        />
      </div>
    </Content>
  );
}

export default ClientWallLog;
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
