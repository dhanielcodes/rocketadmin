import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import BodyLayout from "../../reuseables/BodyLayout";
import styled from "styled-components";

import Details from "./ClientDetailsTabs/Details";
import Documents from "./ClientDetailsTabs/Documents";
import TransactionsList from "./ClientDetailsTabs/TransactionsList";
import ChargesList from "./ClientDetailsTabs/ChargesList";
import Skeleton2 from "../../reuseables/Skeleton2";

import Gateways from "./ClientDetailsTabs/Gateways";
import CustomerDetailsTop from "./MainDetailsBody";
import { GetUserDetails } from "../../services/Dashboard";
import AuditLogs from "./ClientDetailsTabs/AuditLogs";
import RiskTable from "./ClientDetailsTabs/RiskTable";
import CustomerList from "./ClientDetailsTabs/CustomerList";

export default function CustomerDetailsPage() {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const from = params.get("from");

  const {
    data: customer,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["GetUserDetails"],
    queryFn: () => GetUserDetails(userId),
  });
  const customerDetails = customer?.data || {};

  //const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(customerDetails, "daeo");

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
          (customerDetails && (
            <Client>
              <div className="topBar">
                <div>
                  <div
                    className="back_buttton"
                    onClick={() => {
                      if (from === "agent") {
                        navigate("/agents");
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.2998 18.2985L4.2498 12.2745L10.2998 6.24951"
                        stroke="#00A85A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>
                      Back to {from === "agent" ? "Agents" : "Customers"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="body">
                {isLoading || isFetching ? (
                  <Skeleton2 height="400px" />
                ) : (
                  <CustomerDetailsTop customerDetails={customerDetails} />
                )}

                {isLoading || isFetching ? (
                  <Skeleton2 height="400px" />
                ) : (
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
                                key={item}
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
                                key={item}
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
                          clientDetails={customerDetails}
                          setViewRisk={setViewRisk}
                        />
                      )) || (
                        <Details
                          clientDetails={customerDetails}
                          setViewRisk={setViewRisk}
                        />
                      ))}
                    {active === "ID Documents" && (
                      <Documents clientDetails={customerDetails} />
                    )}
                    {active === "Audit Logs" && (
                      <AuditLogs clientDetails={customerDetails} />
                    )}
                    {active === "Transfer List" && (
                      <TransactionsList
                        data={customerDetails?.userId}
                      ></TransactionsList>
                    )}
                    {active === "Beneficiary List" && (
                      <ChargesList data={customerDetails?.userId}></ChargesList>
                    )}

                    {active === "Customers List" && (
                      <CustomerList
                        data={customerDetails?.userId}
                      ></CustomerList>
                    )}

                    {active === "Gateways" && (
                      <Gateways data={customerDetails}></Gateways>
                    )}
                  </div>
                )}
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
