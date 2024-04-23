import { useState } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
//import SearchInput from "../reuseables/SearchInput";
import CustomTable from "../reuseables/CustomTable";
import AddPaymentProcessorModal from "../modals/AddPaymentProcessorModal";
import { Select, Switch } from "@arco-design/web-react";
import {
  getBanks,
  getCompanyBanks,
  getRoles,
  updateUserMenu,
} from "../services/Dashboard";
import { useMutation, useQuery } from "@tanstack/react-query";
import AppSelect from "../reuseables/AppSelect";
import toast from "react-hot-toast";
import AddBank from "../COMPONENTS/AddBank";
import ReactCountryFlag from "react-country-flag";
import AddBankCompany from "../COMPONENTS/AddBankCompany";

// hhhhhhh
function CompanyBanksPage() {
  const [inviteAgent, setInviteAgent] = useState(false);

  const [selectedRole, setSelectedRole] = useState();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails?.userRoleMenuAccess);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["getCompanyBanks"],
    queryFn: () => getCompanyBanks(),
  });

  console.log(data?.data);
  const columns = [
    {
      title: "S/N",
      dataIndex: "sn",
      width: 50,
    },

    {
      title: "BANK NAME",
      dataIndex: "bankName",
      width: 100,
      //render: () => "Other 2",
    },

    {
      title: "ACCOUNT HOLDER NAME",
      dataIndex: "accountName",
      width: 150,
      //render: () => "Other 2",
    },
    {
      title: "CURRENCY NAME",
      dataIndex: "sending",
      width: 130,
      //render: () => "Other 2",
    },

    {
      title: "STATUS",
      dataIndex: "status",
      width: 100,
      //render: () => "Other 2",
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateCreated",
      width: 170,
      //render: () => "Other 2",
    },
    {
      title: "ACTIONS",
      dataIndex: "edit",
      width: 100,
      //render: () => "Other 2",
    },
  ];

  const [selected, setSelected] = useState();
  const newData = data?.data?.map((item) => {
    return {
      ...item,
      edit: (
        <div
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            setItem(item);
            setInviteAgent(true);
          }}
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
            Edit Details
          </p>
        </div>
      ),
      sending: (
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
            countryCode={item?.currency?.code?.slice(0, 2)}
            svg
          />
          {item?.currency["name"]}
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

  const [item, setItem] = useState();

  return (
    <>
      {inviteAgent && (
        <AddBankCompany
          closeinviteAgent={setInviteAgent}
          item={item}
          setItem={setItem}
          recall={refetch}
        />
      )}

      <BodyLayout active={window.location.pathname}>
        <Content>
          <div className="header">
            <div className="top">
              <p>Company Banks</p>
              <span>This page allows you to manage all company banks</span>
            </div>
            <div className="btn">
              <button
                style={{
                  backgroundColor: "#00A85A",
                  color: "white",
                }}
                onClick={() => {
                  setInviteAgent(true);
                }}
              >
                {/* <AiOutlinePlus size={18} style={{ color: "white" }} /> */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99999 2C8.4142 2 8.74999 2.33579 8.74999 2.75V7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41422 13.6642 8.75 13.25 8.75H8.74999V13.25C8.74999 13.6642 8.4142 14 7.99999 14C7.58578 14 7.24999 13.6642 7.24999 13.25V8.75H2.75C2.33579 8.75 2 8.41422 2 8C2 7.58579 2.33579 7.25 2.75 7.25H7.24999V2.75C7.24999 2.33579 7.58578 2 7.99999 2Z"
                    fill="white"
                  />
                </svg>
                Add Bank
              </button>
            </div>
          </div>
          <div className="main">
            <br />
            <br />
            <CustomTable
              noData={newData?.length}
              Apidata={newData || []}
              tableColumns={columns}
              loading={isLoading || isFetching}
              scroll={{
                x: 800,
                y: 800,
              }}
            />
          </div>

          <br />
        </Content>
      </BodyLayout>
    </>
  );
}

export default CompanyBanksPage;

const Content = styled.div`
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
  .search {
    display: flex;
    justify-content: space-between;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
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
