import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createFundingRequest,
  getPayoutClientDashboard,
  updatePayoutClientStatus,
} from "../../services/PayoutDashboard";
import { isError, useMutation, useQuery } from "@tanstack/react-query";
import BodyLayout from "../../reuseables/BodyLayout";
import styled from "styled-components";
import { BackTop, Button, Select, Skeleton } from "@arco-design/web-react";
import phone from "../../assets/icons/phoneIcon.svg";
import mail from "../../assets/icons/mailIcon.svg";
import profile from "../../assets/images/profile.png";
import Details from "./ClientDetailsTabs/Details";
import Documents from "./ClientDetailsTabs/Documents";
import TransactionsList from "./ClientDetailsTabs/TransactionsList";
import ChargesList from "./ClientDetailsTabs/ChargesList";
import Skeleton2 from "../../reuseables/Skeleton2";
import AppModal from "../../COMPONENTS/AppModal";
import AppSelect from "../../reuseables/AppSelect";
import GatewayDropdown from "../../reuseables/GatewayDropdown";
import AppInput from "../../reuseables/AppInput";
import MainDetailsBody from "./MainDetailsBody";
import SuspendIcon from "../../assets/icons/SuspendIcon";
import { TiPlus } from "react-icons/ti";
import PlusIcon from "../../assets/icons/PlusIcon";
import toast from "react-hot-toast";
import Gateways from "./ClientDetailsTabs/Gateways";
import CustomerDetailsTop from "./MainDetailsBody";
import { GetDetails, GetUserDetails } from "../../services/Dashboard";
import AuditLogs from "./ClientDetailsTabs/AuditLogs";
import RiskTable from "./ClientDetailsTabs/RiskTable";
import CustomerList from "./ClientDetailsTabs/CustomerList";

export default function CustomerDetailsPage() {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const from = params.get("from");

  const customerDetails = JSON.parse(localStorage.getItem("customer_details"));

  const clientUser = JSON.parse(localStorage.getItem("customer_details"));
  const {
    data: customer,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["GetUserDetails"],
    queryFn: () => GetUserDetails(userId),
  });

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(customerDetails, clientUser, "daeo");

  const navigate = useNavigate();

  const [active, setActive] = useState("Overview");
  const [viewRisk, setViewRisk] = useState(false);

  const tab = [
    "Overview",
    "ID Documents",
    "Transfer List",
    "Beneficiary List",
    "Audit Logs",
  ];

  const tabAAgent = [
    "Overview",
    "ID Documents",
    "Transfer List",
    "Customers List",
    "Audit Logs",
  ];

  const [modal, setModal] = useState(false);

  const [gateway, setGateWay] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  console.log();

  return (
    <BodyLayout>
      <div
        style={{
          width: "100%",
        }}
      >
        {false ||
          (false && (
            <div style={{ padding: "20px" }}>
              <Skeleton2
                height="10vh"
                style={{
                  marginBottom: "20px",
                }}
              />
              <Skeleton2 height="80vh" />
            </div>
          )) ||
          (clientUser && (
            <Client>
              <div className="topBar">
                <div>
                  <div
                    className="back_buttton"
                    onClick={() => {
                      if (from === "agent") {
                        navigate("/agent");
                      } else {
                        navigate("/customers");
                      }
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.25 12.2744L19.25 12.2744"
                        stroke="#00A85A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.2998 18.2985L4.2498 12.2745L10.2998 6.24951"
                        stroke="#00A85A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <span>
                      Back to {from === "agent" ? "Agents" : "Customers"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="body">
                <CustomerDetailsTop clientUser={customer?.data} />

                <div
                  style={{
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "20px",
                      marginTop: "80px",
                      borderBottom: "1px solid #EAECF0",
                      display: "flex",
                    }}
                  >
                    {from === "agent"
                      ? tabAAgent.map((item) => {
                          return (
                            <div
                              onClick={() => {
                                setActive(item);
                              }}
                              style={{
                                paddingBottom: "10px",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                borderBottom:
                                  active !== item
                                    ? "1px solid transparent"
                                    : "1px solid #00A85A",
                                width: "fit-content",
                                fontSize: "16px",
                                cursor: "pointer",
                                marginRight: "10px",
                              }}
                            >
                              <span
                                style={{
                                  width: "100%",
                                  color:
                                    active === item ? "#00A85A" : "#667085",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          );
                        })
                      : tab.map((item) => {
                          return (
                            <div
                              onClick={() => {
                                setActive(item);
                              }}
                              style={{
                                paddingBottom: "10px",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                borderBottom:
                                  active !== item
                                    ? "1px solid transparent"
                                    : "1px solid #00A85A",
                                width: "fit-content",
                                fontSize: "16px",
                                cursor: "pointer",
                                marginRight: "10px",
                              }}
                            >
                              <span
                                style={{
                                  width: "100%",
                                  color:
                                    active === item ? "#00A85A" : "#667085",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          );
                        })}
                  </div>

                  {active === "Overview" &&
                    ((viewRisk && (
                      <RiskTable
                        clientDetails={customer?.data}
                        setViewRisk={setViewRisk}
                      />
                    )) || (
                      <Details
                        clientDetails={customer?.data}
                        setViewRisk={setViewRisk}
                      />
                    ))}
                  {active === "ID Documents" && (
                    <Documents clientDetails={customer?.data} />
                  )}
                  {active === "Audit Logs" && (
                    <AuditLogs clientDetails={customer?.data} />
                  )}
                  {active === "Transfer List" && (
                    <TransactionsList
                      data={clientUser?.userId}
                    ></TransactionsList>
                  )}
                  {active === "Beneficiary List" && (
                    <ChargesList data={clientUser?.userId}></ChargesList>
                  )}

                  {active === "Customers List" && (
                    <CustomerList data={clientUser?.userId}></CustomerList>
                  )}

                  {active === "Gateways" && (
                    <Gateways data={clientUser}></Gateways>
                  )}
                </div>
              </div>
            </Client>
          ))}
      </div>
    </BodyLayout>
  );
}

const Client = styled.div`
  width: 100%;
  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    width: 100%;

    .back_buttton {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        color: #00a85a;
        font-size: 16px;
        margin-left: 10px;
      }
    }

    .top_name {
      font-size: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: 600;
      text-transform: capitalize;
    }

    .fund {
      background-color: white;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      padding: 14px 14px;
      border-radius: 6px;
      cursor: pointer;

      span {
        margin-left: 10px;
        font-size: 16px;
      }
    }

    .suspend {
      background-color: #d1293d;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      padding: 14px 18px;
      border-radius: 6px;
      cursor: pointer;

      span {
        margin-left: 10px;
        color: white;
        font-size: 16px;
      }
    }
    .active {
      background-color: #3dd129;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      padding: 14px 18px;
      border-radius: 6px;
      cursor: pointer;

      span {
        color: white;
        font-size: 16px;
      }
    }
  }

  .body {
    width: 100%;
    background-color: white;
    border-radius: 20px;

    .left_body {
      width: 90%;
      padding: 20px;

      .profile {
        font-size: 20px;
        color: "#909090";
        margin-bottom: 20px;
      }
    }
  }
`;
