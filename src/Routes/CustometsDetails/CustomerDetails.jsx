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
import FundWallet from "../../modals/FundWallet";
import DepleteWallet from "../../modals/DepleteWallet";

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

  const [modalFund, setModalFund] = useState(false);
  const [modalDeplete, setModalDeplete] = useState(false);
  const [rate, setRate] = useState();
  const [walletId, setWalletId] = useState();

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
                  <CustomerDetailsTop
                    customerDetails={customerDetails}
                    from={from}
                  />
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
                          {modalFund && (
                            <FundWallet
                              modal={modalFund}
                              setModal={setModalFund}
                              rateItem={{ userId: customerDetails?.userId }}
                              setRateItem={setRate}
                              walletId={walletId}
                            />
                          )}{" "}
                          {modalDeplete && (
                            <DepleteWallet
                              modal={modalDeplete}
                              setModal={setModalDeplete}
                              rateItem={{ userId: customerDetails?.userId }}
                              setRateItem={setRate}
                              walletId={walletId}
                            />
                          )}
                          <Body>
                            {customerDetails?.wallet?.map((item) => {
                              return (
                                <div className="body_card">
                                  <div className="body_card_inner">
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
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "20px 16px",
                                      width: "fit-content",
                                      margin: "auto",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      className="fund"
                                      onClick={() => {
                                        setModalFund(true);
                                        setWalletId(item);
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
                                          fill="#FFF"
                                        />
                                      </svg>

                                      <span
                                        style={{
                                          marginLeft: "10px",
                                        }}
                                      >
                                        Fund Wallet
                                      </span>
                                    </div>
                                    &nbsp; &nbsp;
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      className="suspend"
                                      onClick={() => {
                                        setModalDeplete(true);
                                        setWalletId(item);
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
                                          fill="#FFF"
                                        />
                                      </svg>

                                      <span
                                        style={{
                                          marginLeft: "10px",
                                        }}
                                      >
                                        Deplete Wallet
                                      </span>
                                    </div>
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
    .body_card_inner {
      padding: 60px;
    }

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

  .fund {
    background-color: white;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;

    span {
      margin-left: 10px;
      font-size: 12px;
    }
  }

  .suspend {
    background-color: #d1293d;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;

    span {
      margin-left: 10px;
      color: white;
      font-size: 12px;
    }
  }
`;
const Client = styled.div`
  width: 100%;
  .fund {
    background-color: #3dd129;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;

    span {
      margin-left: 10px;
      font-size: 12px;
      color: white;
    }
  }

  .suspend {
    background-color: #d1293d;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;

    span {
      margin-left: 10px;
      color: white;
      font-size: 12px;
    }
  }
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
      background-color: #3dd129;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      padding: 12px 12px;
      border-radius: 6px;
      cursor: pointer;

      span {
        margin-left: 10px;
        color: white;
        font-size: 16px;
      }
    }

    .suspend {
      background-color: #d1293d;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      padding: 12px 12px;
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
