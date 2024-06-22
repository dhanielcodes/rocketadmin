import { useRef, useState } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
//import SearchInput from "../reuseables/SearchInput";
import CustomerFilter from "../COMPONENTS/CustomerFilter";
import CustomTable from "../reuseables/CustomTable";
import { kFormatter3, removeDup } from "../utils/format";
import {
  activateAccount,
  allowusermulticurrency,
  deactivateAccount,
  disallowusermulticurrency,
  getUsers,
  suspendAccount,
  updateUserWatchList,
} from "../services/Dashboard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  IconEye,
  IconMoreVertical,
  IconSearch,
} from "@arco-design/web-react/icon";
import { Dropdown, Input, Menu } from "@arco-design/web-react";
import UpdateAgentCustomerRates from "../modals/UpdateAgentCustomerRates";
import { Switch } from "@arco-design/web-react";
import FundWallet from "../modals/FundWallet";
import DepleteWallet from "../modals/DepleteWallet";

const Droplist = ({
  id,
  name,
  setModal,
  watch,
  changeStatus,
  changeStatus2,
  stateStatus,
  watchStatus,
  fund,
  deplete,
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
      key="1"
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
      key="2"
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
      onClick={() => changeStatus2()}
      key="3"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          marginLeft: "10px",
        }}
      >
        {stateStatus === "Suspended"
          ? " Unsuspend Customer"
          : "Suspend Customer"}
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => watch()}
      key="4"
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
    <Menu.Item
      onClick={() => fund()}
      key="4"
      style={{
        display: "flex",
        alignItems: "center",
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
          d="M14.7732 3.09026H2.5065C2.34384 3.09026 2.18783 3.02641 2.07281 2.91275C1.95779 2.79909 1.89317 2.64493 1.89317 2.4842C1.89317 2.32346 1.95779 2.16931 2.07281 2.05565C2.18783 1.94199 2.34384 1.87814 2.5065 1.87814H12.9332C13.0958 1.87814 13.2518 1.81428 13.3669 1.70063C13.4819 1.58697 13.5465 1.43281 13.5465 1.27208C13.5465 1.11134 13.4819 0.957185 13.3669 0.843527C13.2518 0.729868 13.0958 0.666016 12.9332 0.666016H2.5065C2.01851 0.666016 1.55049 0.857574 1.20543 1.19855C0.860361 1.53952 0.666504 2.00199 0.666504 2.4842V12.1812C0.666504 12.6634 0.860361 13.1258 1.20543 13.4668C1.55049 13.8078 2.01851 13.9993 2.5065 13.9993H14.7732C15.0985 13.9993 15.4105 13.8716 15.6406 13.6443C15.8706 13.417 15.9998 13.1087 15.9998 12.7872V4.30238C15.9998 3.9809 15.8706 3.6726 15.6406 3.44528C15.4105 3.21796 15.0985 3.09026 14.7732 3.09026ZM14.7732 12.7872H2.5065C2.34384 12.7872 2.18783 12.7234 2.07281 12.6097C1.95779 12.4961 1.89317 12.3419 1.89317 12.1812V4.19859C2.09011 4.26757 2.29756 4.30268 2.5065 4.30238H14.7732V12.7872ZM11.0932 8.24177C11.0932 8.06197 11.1471 7.88621 11.2482 7.73671C11.3493 7.58721 11.493 7.47069 11.6611 7.40188C11.8292 7.33308 12.0142 7.31507 12.1927 7.35015C12.3711 7.38523 12.535 7.47181 12.6637 7.59895C12.7924 7.72609 12.88 7.88807 12.9155 8.06442C12.951 8.24076 12.9328 8.42355 12.8631 8.58967C12.7935 8.75578 12.6756 8.89776 12.5243 8.99765C12.373 9.09755 12.1951 9.15086 12.0132 9.15086C11.7692 9.15086 11.5352 9.05508 11.3626 8.8846C11.1901 8.71411 11.0932 8.48288 11.0932 8.24177Z"
          fill="#464F60"
        />
      </svg>

      <span
        style={{
          marginLeft: "10px",
        }}
      >
        Fund Wallet
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => deplete()}
      key="4"
      style={{
        display: "flex",
        alignItems: "center",
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
          d="M14.7732 3.09026H2.5065C2.34384 3.09026 2.18783 3.02641 2.07281 2.91275C1.95779 2.79909 1.89317 2.64493 1.89317 2.4842C1.89317 2.32346 1.95779 2.16931 2.07281 2.05565C2.18783 1.94199 2.34384 1.87814 2.5065 1.87814H12.9332C13.0958 1.87814 13.2518 1.81428 13.3669 1.70063C13.4819 1.58697 13.5465 1.43281 13.5465 1.27208C13.5465 1.11134 13.4819 0.957185 13.3669 0.843527C13.2518 0.729868 13.0958 0.666016 12.9332 0.666016H2.5065C2.01851 0.666016 1.55049 0.857574 1.20543 1.19855C0.860361 1.53952 0.666504 2.00199 0.666504 2.4842V12.1812C0.666504 12.6634 0.860361 13.1258 1.20543 13.4668C1.55049 13.8078 2.01851 13.9993 2.5065 13.9993H14.7732C15.0985 13.9993 15.4105 13.8716 15.6406 13.6443C15.8706 13.417 15.9998 13.1087 15.9998 12.7872V4.30238C15.9998 3.9809 15.8706 3.6726 15.6406 3.44528C15.4105 3.21796 15.0985 3.09026 14.7732 3.09026ZM14.7732 12.7872H2.5065C2.34384 12.7872 2.18783 12.7234 2.07281 12.6097C1.95779 12.4961 1.89317 12.3419 1.89317 12.1812V4.19859C2.09011 4.26757 2.29756 4.30268 2.5065 4.30238H14.7732V12.7872ZM11.0932 8.24177C11.0932 8.06197 11.1471 7.88621 11.2482 7.73671C11.3493 7.58721 11.493 7.47069 11.6611 7.40188C11.8292 7.33308 12.0142 7.31507 12.1927 7.35015C12.3711 7.38523 12.535 7.47181 12.6637 7.59895C12.7924 7.72609 12.88 7.88807 12.9155 8.06442C12.951 8.24076 12.9328 8.42355 12.8631 8.58967C12.7935 8.75578 12.6756 8.89776 12.5243 8.99765C12.373 9.09755 12.1951 9.15086 12.0132 9.15086C11.7692 9.15086 11.5352 9.05508 11.3626 8.8846C11.1901 8.71411 11.0932 8.48288 11.0932 8.24177Z"
          fill="#ff5252"
        />
      </svg>

      <span
        style={{
          marginLeft: "10px",
        }}
      >
        Deplete Wallet
      </span>
    </Menu.Item>
  </Menu>
);
function CustomersTable() {
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
    queryKey: ["getUsers"],
    queryFn: () => getUsers(),
  });

  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation({
    mutationFn: updateUserWatchList,
    onSuccess: (data) => {
      refetch();
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const { mutate: suspend, isLoading: suspendLoading } = useMutation({
    mutationFn: suspendAccount,
    onSuccess: (data) => {
      refetch();
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const { mutate: activate, isLoading: activateLoading } = useMutation({
    mutationFn: activateAccount,
    onSuccess: (data) => {
      refetch();
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const { mutate: deactivate, isLoading: deactivateLoading } = useMutation({
    mutationFn: deactivateAccount,
    onSuccess: (data) => {
      refetch();
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const {
    mutate: allowMultiCurrencyMutation,
    isLoading: allowMultiCurrencyLoading,
  } = useMutation({
    mutationFn: allowusermulticurrency,
    onSuccess: (data) => {
      refetch();
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });
  const {
    mutate: disallowusermulticurrencyMutation,
    isLoading: disallowusermulticurrencyLoading,
  } = useMutation({
    mutationFn: disallowusermulticurrency,
    onSuccess: (data) => {
      refetch();
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });
  console.log(customers);
  const inputRef = useRef(null);

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action2",
      width: 70,
      //render: () => "Other 2",
      fixed: "left",
    },
    {
      title: "SEND MONEY",
      dataIndex: "sendMoney",
      width: 140,
      //render: () => "Other 2",
    },
    {
      title: "CUSTOMER REF",
      dataIndex: "userId",
      width: 140,
    },
    {
      title: "ACCOUNT TYPE",
      dataIndex: "accountType",
      render: (e) => <div>{e === 1 ? "Individual" : "Business"}</div>,
      width: 140,
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

      width: 270,
    },
    {
      title: "STATUS",
      dataIndex: "userStatus",
      width: 190,
      //render: () => "Other 2",
    },
    {
      title: "ID VERIFICATION",
      dataIndex: "idNumber",
      width: 190,
    },
    {
      title: "MULTIPLE CURRENCY TRADING",
      dataIndex: "multiCurrencySwitch",
      width: 220,
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      width: 260,
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "ADDRESS",
      dataIndex: "address",
      width: 280,
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
      title: "COUNTRY",
      dataIndex: "country[name]",
      width: 180,
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
  const [rate, setRate] = useState();
  const [cus, setCus] = useState();
  const navigate = useNavigate();

  const [modalFund, setModalFund] = useState(false);
  const [modalDeplete, setModalDeplete] = useState(false);

  const newData = customers?.data?.map((item) => {
    return {
      ...item,
      sendMoney: (
        <p
          onClick={() => {
            console.log(item?.userId);
            navigate(`/send-money?id=${item?.userId}&step=2`);
            localStorage.setItem("userSend", JSON.stringify(item));
          }}
          style={{
            color: "blue",
            cursor: "pointer",
          }}
        >
          Send Money
        </p>
      ),
      action: (
        <Link
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            localStorage.setItem("customer_details", JSON.stringify(item));
          }}
          to={`/customers-details?from=customer&userId=${JSON.stringify(
            item?.userId
          )}`}
        >
          <p
            onClick={() => {
              console.log(item?.userId);
            }}
            style={{
              color: "blue",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item?.firstName + " " + item?.surName}
            &nbsp;
            {item?.watchListStatus && <IconEye fontSize={20} />}
          </p>
        </Link>
      ),
      userStatus: (
        <div
          style={{
            padding: "6px 14px",
            borderRadius: "7px",
            background:
              item?.status === "InActive"
                ? "#ff6363"
                : item?.status === "Active"
                ? "#37d744"
                : "#d7ac37",
            color: "white",
            width: "fit-content",
            fontWeight: "700",
          }}
        >
          {item?.status}
        </div>
      ),
      action2: (
        <div
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            setRate(item);
          }}
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
            <Dropdown
              droplist={
                <Droplist
                  id={item?.userId}
                  name={item?.firstName + " " + item?.surName}
                  setModal={() => {
                    setModal(true);
                  }}
                  changeStatus={() => {
                    setStatus(true);

                    if (item?.status === "InActive") {
                      activate({
                        userId: item?.userId,
                      });
                    }
                    if (!item?.status) {
                      activate({
                        userId: item?.userId,
                      });
                    }
                    if (item?.status === "Active") {
                      deactivate({
                        userId: item?.userId,
                      });
                    }
                  }}
                  fund={() => {
                    setModalFund(true);
                  }}
                  deplete={() => {
                    setModalDeplete(true);
                  }}
                  changeStatus2={() => {
                    setStatus(true);
                    if (item?.status === "Suspended") {
                      activate({
                        userId: item?.userId,
                      });
                    }
                    if (!item?.status) {
                      activate({
                        userId: item?.userId,
                      });
                    }
                    if (item?.status === "Active") {
                      suspend({
                        userId: item?.userId,
                      });
                    }
                  }}
                  stateStatus={item?.status}
                  watch={() => {
                    setWatch(true);
                    if (item?.watchListStatus) {
                      updateUser({
                        userId: item?.userId,
                        watchListStatus: false,
                      });
                    } else {
                      updateUser({
                        userId: item?.userId,
                        watchListStatus: true,
                      });
                    }
                  }}
                  watchStatus={item?.watchListStatus}
                />
              }
              position="bl"
              on
            >
              {" "}
              <Link style={{ marginRight: 40 }}>
                <IconMoreVertical
                  style={{
                    fontSize: 15,
                    marginLeft: 6,
                    color: "#000",
                  }}
                />
              </Link>
            </Dropdown>
          </p>
        </div>
      ),
      multiCurrencySwitch: (
        <div>
          <Switch
            loading={
              (item === cus && disallowusermulticurrencyLoading) ||
              (item === cus && allowMultiCurrencyLoading)
            }
            /* disabled={
              disallowusermulticurrencyLoading || allowMultiCurrencyLoading
            } */
            onClick={() => {
              setCus(item);
              if (item?.allowMultiCurrencyTrading) {
                disallowusermulticurrencyMutation(item?.userId);
              } else {
                allowMultiCurrencyMutation(item?.userId);
              }
            }}
            checked={item?.allowMultiCurrencyTrading}
          />
        </div>
      ),
      idNumber: (
        <div
          style={{
            padding: "6px 14px",
            borderRadius: "7px",
            background: item?.isKYCCompleted ? "#37d744" : "#ff6363",
            color: "white",
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
              padding: "6px 14px",
              borderRadius: "7px",
              background: item?.status ? "#37d744" : "#ff6363",
              color: "white",
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
      {modalFund && (
        <FundWallet
          modal={modalFund}
          setModal={setModalFund}
          rateItem={rate}
          setRateItem={setRate}
        />
      )}{" "}
      {modalDeplete && (
        <DepleteWallet
          modal={modalDeplete}
          setModal={setModalDeplete}
          rateItem={rate}
          setRateItem={setRate}
        />
      )}
      <Content>
        <div className="header">
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
          <div className="tablecontent">
            <CustomTable
              noData={customers?.data?.length}
              loading={
                isLoading ||
                isFetching ||
                updateUserLoading ||
                activateLoading ||
                deactivateLoading ||
                suspendLoading
              }
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
    </>
  );
}

export default CustomersTable;
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
