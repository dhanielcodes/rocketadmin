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
import { kFormatter4 } from "../../../utils/format";
import Beneficiaries from "../../Beneficiary";
import { Dropdown, Input } from "@arco-design/web-react";
import { IconMoreVertical, IconSearch } from "@arco-design/web-react/icon";
import { beneficiaries } from "../../../services/Dashboard";
const Droplist = ({ id, name, setModal }) => (
  //   <Menu.Item key='1' onClick={() => onNavigate(id)}>
  <Menu
    style={{
      borderRadius: "10px",
      paddingTop: "6px",
      width: "150px",
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
  </Menu>
);
export default function ChargesList({ data }) {
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
    queryKey: ["beneficiariess"],
    queryFn: () => beneficiaries(data),
  });

  console.log(customers);
  const inputRef = useRef(null);

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action2",
      width: 70,
      //render: () => "Other 2",
    },
    {
      title: "CUSTOMER ID",
      dataIndex: "id",
      width: 140,
    },

    {
      title: "BENEFICIARY NAME",
      dataIndex: "action",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      sorter: (a, b) => a.beneficiaryName.length - b.beneficiaryName.length,
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
          ? row.beneficiaryName.toUpperCase().indexOf(value.toUpperCase()) !==
            -1
          : true,
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => inputRef.current.focus(), 150);
        }
      },

      width: 220,
    },

    {
      title: "BENEFICIARY BANK",
      dataIndex: "beneficiaryBank['bankName']",
      width: 160,
    },
    {
      title: "BENEFICIARY ACCOUNT NO.",
      dataIndex: "beneficiaryBank['accountNumber']",
      width: 160,
    },

    {
      title: "MOBILE NO",
      dataIndex: "beneficiaryPhoneNumber",
      width: 160,
    },
    {
      title: "DATE CREATED",
      dataIndex: "dateCreated",
      width: 200,

      //render: () => "Other",
    },
  ];
  const [rate, setRate] = useState();

  const newData = customers?.data?.map((item) => {
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
            {item?.beneficiaryName}
          </p>
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
  return (
    <div>
      <CustomTable
        noData={customers?.data?.length}
        loading={isLoading || isFetching}
        Apidata={newData}
        tableColumns={columns}
      />
    </div>
  );
}
