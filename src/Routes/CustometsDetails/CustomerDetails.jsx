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
import { kFormatter3 } from "../../utils/format";
import AmountFormatter from "../../reuseables/AmountFormatter";
import CountryFlag, { ReactCountryFlag } from "react-country-flag";
import CustomTable from "../../reuseables/CustomTable";
import CountryListAgent from "../../reuseables/CountryListAgent";

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
  const [selectedCountry, setSelectedCountry] = useState();

  const tab = [
    "Overview",
    "ID Documents",
    "Transfer List",
    "Beneficiary List",
    "Audit Logs",
    "Wallets",
  ];

  const tabAAgent = [
    "Overview",
    "ID Documents",
    "Transfer List",
    "Customers List",
    "Audit Logs",
    "Wallets",
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
                    {"" ||
                      (active === "Wallets" && (
                        <>
                          <Body>
                            {customerDetails?.wallet?.map((item) => {
                              return (
                                <div className="body_card">
                                  <div className="card_top">
                                    {" "}
                                    <CountryFlag
                                      style={{
                                        borderRadius: "10000000px",
                                        marginRight: "10px",
                                      }}
                                      countryCode={item?.currency?.code?.slice(
                                        0,
                                        2
                                      )}
                                      svg
                                    />
                                    {item?.name}
                                  </div>

                                  <div className="card_bottom">
                                    <AmountFormatter
                                      currency={item?.currency?.code}
                                      value={item?.balance}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </Body>
                          <br />
                          <div>
                            <div
                              style={{
                                width: "300px",
                                marginLeft: "auto",
                                position: "relative",
                                zIndex: "1000",
                              }}
                            >
                              <CountryListAgent
                                optionsNew={customerDetails?.wallet}
                                formatter={(country) => (
                                  <div
                                    style={{
                                      fontSize: "16px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {" "}
                                    <ReactCountryFlag
                                      className="flag"
                                      countryCode={country?.currency?.code?.slice(
                                        0,
                                        2
                                      )}
                                      svg
                                    />{" "}
                                    &nbsp; &nbsp;
                                    {country?.currency?.code}
                                    &nbsp; (
                                    <AmountFormatter
                                      currency={country?.currency?.code}
                                      value={country?.balance}
                                    />
                                    )
                                  </div>
                                )}
                                value={selectedCountry}
                                setValue={setSelectedCountry}
                                onChange={(e) => {
                                  setSelectedCountry(e);
                                }}
                              />
                            </div>
                            <br />
                            <CustomTable
                              Apidata={customerDetails?.walletTransactions
                                ?.filter((item) =>
                                  selectedCountry
                                    ? item?.walletId ===
                                      selectedCountry?.walletId
                                    : item
                                )
                                ?.map((item) => {
                                  return {
                                    ...item,
                                    countryo: (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <CountryFlag
                                          style={{
                                            borderRadius: "10000000px",
                                            marginRight: "10px",
                                          }}
                                          countryCode={item?.currency?.slice(
                                            0,
                                            2
                                          )}
                                          svg
                                        />
                                        {item?.currency}
                                      </div>
                                    ),
                                    type: (
                                      <>
                                        {" "}
                                        <div
                                          style={{
                                            padding: "6px 14px",
                                            borderRadius: "7px",
                                            background:
                                              item?.requestType === "Credit"
                                                ? "#37d744"
                                                : "#ff6363",
                                            color: "white",
                                            width: "fit-content",
                                            fontWeight: "700",
                                          }}
                                        >
                                          {item?.requestType}
                                        </div>
                                      </>
                                    ),
                                    status: (
                                      <>
                                        {" "}
                                        <div
                                          style={{
                                            padding: "6px 14px",
                                            borderRadius: "7px",
                                            background:
                                              item?.status === "Successful"
                                                ? "#37d744"
                                                : item?.status === "Pending"
                                                ? "#ffe063"
                                                : "#ff6363",
                                            color: "white",
                                            width: "fit-content",
                                            fontWeight: "700",
                                          }}
                                        >
                                          {item?.status}
                                        </div>
                                      </>
                                    ),
                                  };
                                })}
                              tableColumns={[
                                {
                                  title: "TXID",
                                  dataIndex: "id",
                                  width: 110,
                                },
                                {
                                  title: "DATE",
                                  dataIndex: "dateCreated",
                                  width: 140,
                                },
                                {
                                  title: "CURRENCY",
                                  dataIndex: "countryo",
                                  width: 140,
                                },
                                {
                                  title: "NOTE",
                                  dataIndex: "note",
                                  width: 140,
                                },
                                {
                                  title: "REQUEST TYPE",
                                  dataIndex: "type",
                                  width: 140,
                                },
                                {
                                  title: "AMOUNT",
                                  dataIndex: "amount",
                                  render: (i) => <AmountFormatter value={i} />,
                                  width: 140,
                                },
                                {
                                  title: "TRANSACTION STATUS",
                                  dataIndex: "status",
                                  width: 170,

                                  //render: () => "Other",
                                },
                              ]}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                )}
              </div>
            </Client>
          ))}
      </div>
    </BodyLayout>
  );
}

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  .body_card {
    padding: 60px;
    background-color: white;
    border: 1px solid #d6d6d6;
    border-radius: 20px;
    text-align: center;
    margin-right: 10px;

    .card_top {
      font-weight: 500;
      font-size: 16px;
      color: #5a6376;
    }
    .card_middle {
      font-size: 16px;
      margin: 10px 0;
      color: #5a6376;
      font-weight: 500;
    }
    .card_bottom {
      font-size: 36px;
    }
  }
`;
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
