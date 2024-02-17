import React, { useRef, useState } from "react";
import CustomTable from "../../../reuseables/CustomTable";
import SectionHeader from "../../../reuseables/SectionHeader";
import CountryDropdown2 from "../../../reuseables/CountryDropdown2";
import AppModal from "../../../COMPONENTS/AppModal";
import AppInput from "../../../reuseables/AppInput";
import AppSelect from "../../../reuseables/AppSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addClientCharges,
  updateClientCharges,
} from "../../../services/PayoutDashboard";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { getClientChargeTypes, getCurrencies } from "../../../services/Auth";
import { kFormatter4, removeDup } from "../../../utils/format";
import Beneficiaries from "../../Beneficiary";
import { Dropdown, Input, Menu } from "@arco-design/web-react";
import {
  IconEye,
  IconMoreVertical,
  IconSearch,
} from "@arco-design/web-react/icon";
import {
  activateAccount,
  beneficiaries,
  getAgentCustomers,
  suspendAccount,
  updateUserWatchList,
} from "../../../services/Dashboard";
import UpdateAgentCustomerRates from "../../../modals/UpdateAgentCustomerRates";
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
export default function CustomerList({ data }) {
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
    queryKey: ["getAgentCustomers"],
    queryFn: () => getAgentCustomers(data),
  });

  console.log(customers);
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
      title: "CUSTOMER REF",
      dataIndex: "userId",
      width: 190,
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

      width: 270,
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

  const newData = customers?.data?.map((item) => {
    return {
      ...item,
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
                    if (item?.status) {
                      suspend({
                        userId: item?.userId,
                      });
                    } else {
                      activate({
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
    <div>
      <UpdateAgentCustomerRates
        modal={modal}
        setModal={setModal}
        rateItem={rate}
      />
      <CustomTable
        noData={customers?.data?.length}
        loading={isLoading || isFetching}
        Apidata={newData}
        tableColumns={columns}
      />
    </div>
  );
}
