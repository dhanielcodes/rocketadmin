import { useRef, useState } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
//import SearchInput from "../reuseables/SearchInput";
import CustomerFilter from "../COMPONENTS/CustomerFilter";
import CustomTable from "../reuseables/CustomTable";
import { kFormatter3, removeDup } from "../utils/format";
import {
  activateAccount,
  getAgentInviteList,
  getUsers,
  sendAgentInvite,
  suspendAccount,
  updateUserWatchList,
} from "../services/Dashboard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  IconEye,
  IconMoreVertical,
  IconSearch,
} from "@arco-design/web-react/icon";
import { Dropdown, Input, Menu } from "@arco-design/web-react";
import UpdateAgentCustomerRates from "../modals/UpdateAgentCustomerRates";
import toast from "react-hot-toast";
const Droplist = ({
  id,
  name,
  setModal,
  watch,
  changeStatus,
  stateStatus,
  watchStatus,
}) => (
  //   <Menu.Item key='1' onClick={() => onNavigate(id)}>
  <Menu
    style={{
      borderRadius: "10px",
      paddingTop: "6px",
      // width: "150px",
    }}
  >
    <Menu.Item
      onClick={() => setModal()}
      key="3"
      style={{
        display: "flex",
        alignItems: "center",
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
          d="M5.83398 4.16797V16.668"
          stroke="#464F60"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.168 15.834L14.168 3.33398"
          stroke="#464F60"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.33398 5.83398L5.24473 3.78155C5.52251 3.48317 5.6614 3.33398 5.83398 3.33398C6.00657 3.33398 6.14546 3.48317 6.42324 3.78155L8.33398 5.83398"
          stroke="#464F60"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.668 14.168L13.5787 16.2204C13.8565 16.5188 13.9954 16.668 14.168 16.668C14.3406 16.668 14.4794 16.5188 14.7572 16.2204L16.668 14.168"
          stroke="#464F60"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        style={{
          marginLeft: "10px",
        }}
      >
        Update Rate
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => changeStatus()}
      key="3"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {stateStatus === "Active" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00016 1.33398C11.6668 1.33398 14.6668 4.33398 14.6668 8.00065C14.6668 11.6673 11.6668 14.6673 8.00016 14.6673C4.3335 14.6673 1.3335 11.6673 1.3335 8.00065C1.3335 4.33398 4.3335 1.33398 8.00016 1.33398ZM8.00016 2.66732C6.7335 2.66732 5.60016 3.06732 4.7335 3.80065L12.2002 11.2673C12.8668 10.334 13.3335 9.20065 13.3335 8.00065C13.3335 5.06732 10.9335 2.66732 8.00016 2.66732ZM11.2668 12.2007L3.80016 4.73398C3.06683 5.60065 2.66683 6.73398 2.66683 8.00065C2.66683 10.934 5.06683 13.334 8.00016 13.334C9.26683 13.334 10.4002 12.934 11.2668 12.2007Z"
            fill="#F04438"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00016 1.33398C11.6668 1.33398 14.6668 4.33398 14.6668 8.00065C14.6668 11.6673 11.6668 14.6673 8.00016 14.6673C4.3335 14.6673 1.3335 11.6673 1.3335 8.00065C1.3335 4.33398 4.3335 1.33398 8.00016 1.33398ZM8.00016 2.66732C6.7335 2.66732 5.60016 3.06732 4.7335 3.80065L12.2002 11.2673C12.8668 10.334 13.3335 9.20065 13.3335 8.00065C13.3335 5.06732 10.9335 2.66732 8.00016 2.66732ZM11.2668 12.2007L3.80016 4.73398C3.06683 5.60065 2.66683 6.73398 2.66683 8.00065C2.66683 10.934 5.06683 13.334 8.00016 13.334C9.26683 13.334 10.4002 12.934 11.2668 12.2007Z"
            fill="#38f03e"
          />
        </svg>
      )}

      <span
        style={{
          marginLeft: "10px",
        }}
      >
        {stateStatus === "Active" ? "Deactivate Customer" : "Activate Customer"}
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => watch()}
      key="3"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconEye
        fontSize={20}
        style={{
          margin: 0,
        }}
      />
      <span
        style={{
          marginLeft: "10px",
        }}
      >
        {watchStatus ? "Unwatch Customer" : "Watch Customer"}
      </span>
    </Menu.Item>
  </Menu>
);
function AgentInviteList() {
  const [filter, setFilter] = useState(false);
  const AppData = JSON.parse(localStorage?.getItem("AppData"));
  console.log(AppData);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: customers,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getAgentInviteList"],
    queryFn: () => getAgentInviteList(),
  });

  console.log(customers);
  const inputRef = useRef(null);

  const columns = [
    {
      title: "S/N",
      dataIndex: "index",
      width: 100,
    },
    {
      title: "ACTION",
      dataIndex: "action2",
      width: 170,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      width: 140,

      //render: () => "Other 2",
    },

    {
      title: "AGENT EMAIL",
      dataIndex: "email",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      sorter: (a, b) => a.email.length - b.email.length,

      width: 270,
    },
    {
      title: "AGENT NAME",
      dataIndex: "name",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      sorter: (a, b) => a.name.length - b.name.length,
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
          ? row.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
          : true,
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => inputRef.current.focus(), 150);
        }
      },

      width: 250,
    },
    {
      title: "AGENT INVITE CODE",
      dataIndex: "inviteCode",
      width: 170,
      filters: removeDup(
        customers?.data?.map((item) => {
          return {
            text: item?.country?.name,
            value: item?.country?.name,
          };
        })
      ),

      onFilter: (value, row) => row.address.indexOf(value) > -1,
      filterMultiple: true,
    },

    {
      title: "AGENT URL",
      dataIndex: "action",
      width: 160,
    },
  ];
  const [rate, setRate] = useState();

  const { mutate, isLoading: isResending } = useMutation({
    mutationFn: sendAgentInvite,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message || "Invite Resent");
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const newData = customers?.data?.map((item, index) => {
    return {
      ...item,
      index: index + 1,
      action: (
        <p
          onClick={() => {
            console.log(item?.signUpURL);

            navigator.clipboard.writeText(item?.signUpURL);
            toast.success("Agent Link Copied!");
          }}
          style={{
            color: "#00A85A",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          INVITE URL &nbsp;
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
              fill="#00A85A"
            />
            <path
              d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
              stroke="#00A85A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </p>
      ),

      action2: (
        <div
          onClick={() => {
            mutate({
              firstName: item?.name,
              email: item?.email,
            });
          }}
          style={{
            padding: "6px 14px",
            borderRadius: "10px",
            background: "#00b044",
            color: "white",
            width: "fit-content",
            cursor: "pointer",
          }}
        >
          RESEND INVITE
        </div>
      ),
      status: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background:
                item?.status === "Accepted"
                  ? "#37d744"
                  : item?.status === "Sent"
                  ? "#afafaf"
                  : "#ff6363",
              color: "#fff",
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
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [watch, setWatch] = useState(false);

  return (
    <>
      {filter && <CustomerFilter closeCustomer={setFilter} />}
      <UpdateAgentCustomerRates
        modal={modal}
        setModal={setModal}
        rateItem={rate}
        setRateItem={setRate}
      />
      <BodyLayout>
        <Content>
          <div className="header">
            <div className="top">
              <p>Agent Invites</p>
              <span>This page allows you to manage agent invites</span>
            </div>
            <div className="btn">
              {/*
              <button
                style={{
                  backgroundColor: "white",
                  color: "#464F60",
                  border: "2px solid gainsboro",
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
                  backgroundColor: "#00A85A",
                  color: "white",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99999 2C8.4142 2 8.74999 2.33579 8.74999 2.75V7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41422 13.6642 8.75 13.25 8.75H8.74999V13.25C8.74999 13.6642 8.4142 14 7.99999 14C7.58578 14 7.24999 13.6642 7.24999 13.25V8.75H2.75C2.33579 8.75 2 8.41422 2 8C2 7.58579 2.33579 7.25 2.75 7.25H7.24999V2.75C7.24999 2.33579 7.58578 2 7.99999 2Z"
                    fill="white"
                  />
                </svg>
                New Customers
              </button>
             */}
            </div>
          </div>

          <div className="main">
            {/*  <div className="head">
              <SearchInput placeholder="Search" style={{ width: "30vw" }} />
              <button onClick={() => setFilter(true)}>
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
                Filter
              </button>
            </div> */}

            <div className="tablecontent">
              {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}

              <CustomTable
                showDateFilter={false}
                noData={customers?.data?.length}
                loading={isLoading || isResending}
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
          </div>
        </Content>
      </BodyLayout>
    </>
  );
}

export default AgentInviteList;
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
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .head button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
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
  .tabledata {
    td {
      font-size: small;
      font-weight: 400;
    }
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
