import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getAgentRates } from "../../services/PayoutDashboard";
import CountryFlag from "react-country-flag";
import { kFormatter3, kFormatter2, kFormatter4 } from "../../utils/format";
import { Tranx, getUsers } from "../../services/Dashboard";
import { useState } from "react";

function SendMoneyCustomersTableList({
  setStep,
  setUserSelected,
  userSelected,
}) {
  const [filter, setFilter] = useState(false);

  const navigate = useNavigate();
  const AppData = JSON.parse(localStorage?.getItem("AppData"));
  console.log(AppData);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: customers,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getUserws"],
    queryFn: () => getUsers(),
  });

  console.log(customers);

  const columns = [
    {
      title: "ACTION",
      dataIndex: "sendMoney",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 200,
    },
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
    },

    {
      title: "NAME",
      dataIndex: "action",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 200,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      width: 280,
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
            {item?.firstName}
          </p>
        </div>
      ),
      sendMoney: (
        <p
          onClick={() => {
            console.log(item?.userId);
            setUserSelected(item);
            setStep(2);
            navigate(`/sendmoney?id=${item?.userId}&step=2`);
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

  return (
    <Content>
      <div className="tablecontent">
        <CustomTable
          noData={customers?.data?.length}
          loading={isLoading || isFetching}
          Apidata={newData}
          tableColumns={columns}
        />
      </div>
    </Content>
  );
}

export default SendMoneyCustomersTableList;
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
