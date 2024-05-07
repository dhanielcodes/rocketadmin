import { useState, useEffect } from "react";
import BodyLayout from "../reuseables/BodyLayout";

import { styled } from "styled-components";
import PaymentType from "../Graphs/PaymentType";
import TransactionRecord from "../ChartComponent/TransactionRecord";
import PaymentTypeRecord from "../ChartComponent/PaymentTypeRecord";

import {
  getAdminDashboard,
  getAdminDashboardAnalytics,
} from "../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import Skeleton2 from "../reuseables/Skeleton2";
import { FormatCorrect, kFormatter2 } from "../utils/format";
import DeleteIcon from "../assets/icons/DeleteIcon";
import YellowCardIcon from "../assets/icons/YellowCardIcon";
import GreenCardIcon from "../assets/icons/GreenCard";
import PersonIcon from "../assets/icons/PersonIcon";
import { Link } from "react-router-dom";
import TransferLogsTable from "./Dashboard/TransferLogs";
import NewCustomerList from "./Dashboard/NewCustomersTableList";
import CountryDropdownDash from "../reuseables/CountryDropdownDash";
function Dashboard() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [selectedVolume, setSelectedVolume] = useState();

  //const [params] = useSearchParams()
  const {
    data: dashboard,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getAdminDashboard"],
    queryFn: () => getAdminDashboard(userDetails?.userId),
  });

  const {
    data: dashboardAnalytics,
    isLoading: isLoadingAna,
    isFetching: isFetchingAna,
    refetch,
  } = useQuery({
    queryKey: ["getAdminDashboardAnalytics"],
    queryFn: () =>
      getAdminDashboardAnalytics(
        selectedVolume?.currency ||
          dashboard?.data?.transactionVolumeByCurrency?.map((item) => {
            return {
              label: item?.currency,
              value: item?.currency,
              ...item,
            };
          })[0]?.currency
      ),
    enabled: dashboard?.data ? true : false,
  });

  console.log(dashboardAnalytics);

  const transactions = dashboardAnalytics?.data?.analyticsByTransactionStatus;
  const transactionsChannels =
    dashboardAnalytics?.data?.analyticsByTransactionChannel;
  const paymentTypes = dashboardAnalytics?.data?.analyticsByPaymentTypes;

  const volumeList = dashboard?.data?.transactionVolumeByCurrency;

  const newVolume =
    selectedVolume ||
    dashboard?.data?.transactionVolumeByCurrency?.map((item) => {
      return {
        label: item?.currency,
        value: item?.currency,
        ...item,
      };
    })[0];

  console.log(dashboard);
  console.log(selectedVolume);

  useEffect(() => {
    refetch();
  }, [selectedVolume]);

  return (
    <>
      <BodyLayout>
        <Content>
          {isLoading || isFetching ? (
            <Skeleton2
              height="450px"
              style={{
                marginBottom: "20px",
              }}
            />
          ) : (
            <div className="content1">
              <a className="contside1" href="#logs">
                <div className="contside1Text">
                  <h1>{dashboard?.data?.todayTransferCount || 0}</h1>
                  <p>Today’s transfer</p>
                </div>
              </a>
              <div className="contside2">
                <div className="contside22">
                  <div className="contside2up">
                    <div className="contside2child1">
                      <div
                        style={{
                          width: "120px",
                        }}
                      >
                        <CountryDropdownDash
                          value={
                            selectedVolume ||
                            dashboard?.data?.transactionVolumeByCurrency?.map(
                              (item) => {
                                return {
                                  label: item?.currency,
                                  value: item?.currency,
                                  ...item,
                                };
                              }
                            )[0]
                          }
                          option={
                            volumeList?.map((item) => {
                              return {
                                label: item?.currency,
                                value: item?.currency,
                                ...item,
                              };
                            }) || []
                          }
                          onChange={(e) => {
                            setSelectedVolume(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="contside2child2">
                      <div className="box">
                        <div style={{ fontSize: "2vw", fontWeight: "600" }}>
                          {FormatCorrect(
                            Math.ceil(newVolume?.lastSixtyDays || 0),
                            newVolume?.currency
                          )}
                        </div>{" "}
                        <br />
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                          Count:{" "}
                          {kFormatter2(
                            Math.ceil(newVolume?.lastSixtyDaysCount || 0)
                          )}
                        </div>
                        <br />
                        <span>Last 60 Days</span>
                      </div>
                      <div className="box">
                        <div style={{ fontSize: "2vw", fontWeight: "600" }}>
                          {FormatCorrect(
                            Math.ceil(newVolume?.lastNinetyDays || 0),
                            newVolume?.currency
                          )}
                        </div>{" "}
                        <br />
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                          Count:{" "}
                          {kFormatter2(
                            Math.ceil(newVolume?.lastNinetyDaysCount || 0)
                          )}
                        </div>
                        <br />
                        <span>Last 90 Days</span>
                      </div>
                      <div className="box">
                        <div style={{ fontSize: "2vw", fontWeight: "600" }}>
                          {FormatCorrect(
                            Math.ceil(newVolume?.lastOneTwentyDays || 0),
                            newVolume?.currency
                          )}
                        </div>{" "}
                        <br />
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                          Count:{" "}
                          {kFormatter2(
                            Math.ceil(newVolume?.lastOneTwentyDaysCount || 0)
                          )}
                        </div>
                        <br />
                        <span>Last 120 Days</span>
                      </div>
                    </div>
                  </div>
                  <div className="smallbox">
                    <Link className="smallcard" to="/send-money?step=1">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.1686 6.83145L9.24852 12.3303L0.964497 9.5686C0.386258 9.37546 -0.00330584 8.83294 2.11451e-05 8.22344C0.00339191 7.61395 0.397421 7.07476 0.977892 6.88836L22.1573 0.0678197C22.6607 -0.0940207 23.2133 0.0387961 23.5873 0.412776C23.9612 0.786755 24.0941 1.3393 23.9322 1.84277L17.1117 23.0221C16.9253 23.6026 16.3861 23.9966 15.7766 24C15.1671 24.0033 14.6246 23.6138 14.4314 23.0355L11.6563 14.7114L17.1686 6.83145Z"
                          fill="#464F60"
                        />
                      </svg>

                      <p>Send Money</p>
                    </Link>
                    <Link className="smallcard" to="/update-rate-&-fees">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.93682 -3.05176e-05C4.01087 -0.000648499 4.08429 0.0198488 4.15284 0.0602846C4.2214 0.100721 4.28376 0.160303 4.33634 0.235612L7.71257 5.11095C7.76472 5.18687 7.80598 5.27692 7.83398 5.37592C7.86199 5.47492 7.87618 5.58092 7.87575 5.68786C7.87665 5.79351 7.86327 5.89838 7.83636 5.99663C7.79378 6.1463 7.72123 6.27421 7.628 6.36396C7.53476 6.45371 7.4251 6.50123 7.31305 6.50042H5.62493L5.62493 13.8134C5.62493 14.0289 5.56565 14.2356 5.46012 14.388C5.35459 14.5404 5.21147 14.626 5.06223 14.626H2.81141C2.66217 14.626 2.51904 14.5404 2.41352 14.388C2.30799 14.2356 2.2487 14.0289 2.2487 13.8134L2.2487 6.50042H0.56059C0.449302 6.49974 0.340652 6.45143 0.248378 6.3616C0.156103 6.27176 0.0843488 6.14443 0.0421879 5.9957C2.68697e-05 5.84698 -0.0106472 5.68354 0.011515 5.52605C0.0336772 5.36857 0.0876806 5.22411 0.166697 5.11095L3.54292 0.235612C3.64773 0.0854969 3.7892 0.00086689 3.93682 -3.05176e-05Z"
                          fill="#464F60"
                        />
                        <path
                          d="M12.8146 15.7511C12.7406 15.7517 12.6672 15.7297 12.5986 15.6861C12.5301 15.6426 12.4677 15.5784 12.4151 15.4973L9.0389 10.247C8.98675 10.1652 8.94549 10.0682 8.91748 9.9616C8.88948 9.85499 8.87529 9.74082 8.87571 9.62566C8.87482 9.51189 8.8882 9.39894 8.9151 9.29314C8.95768 9.13196 9.03024 8.99421 9.12347 8.89756C9.2167 8.8009 9.32637 8.74973 9.43842 8.7506H11.1265V0.87506C11.1265 0.64298 11.1858 0.420405 11.2913 0.2563C11.3969 0.092194 11.54 0 11.6892 0L13.9401 0C14.0893 0 14.2324 0.092194 14.3379 0.2563C14.4435 0.420405 14.5028 0.64298 14.5028 0.87506V8.7506H16.1909C16.3022 8.75133 16.4108 8.80335 16.5031 8.9001C16.5954 8.99685 16.6671 9.13398 16.7093 9.29414C16.7514 9.45431 16.7621 9.63032 16.7399 9.79992C16.7178 9.96951 16.6638 10.1251 16.5848 10.247L13.2085 15.4973C13.1037 15.659 12.9623 15.7501 12.8146 15.7511Z"
                          fill="#464F60"
                        />
                      </svg>

                      <p>View Rates</p>
                    </Link>
                    <Link className="smallcard" to="/view-transfers">
                      <svg
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4915 0.00349014C5.40153 -0.13651 1.23153 3.95349 1.23153 9.00349H0.581513C0.131513 9.00349 -0.268494 9.00349 0.231513 9.85349L1.88153 12.6535C2.08153 12.8535 2.39153 12.8535 2.59153 12.6535L4.09151 9.85349C4.16061 9.783 4.2073 9.69362 4.2257 9.59663C4.24409 9.49965 4.23336 9.39938 4.19486 9.30849C4.15636 9.21759 4.09182 9.14012 4.00936 9.08584C3.9269 9.03156 3.83023 9.00291 3.73151 9.00349H3.23153C3.23153 5.10349 6.41153 1.95349 10.3315 2.00349C14.0515 2.05349 17.1815 5.18349 17.2315 8.90349C17.2815 12.8135 14.1315 16.0035 10.2315 16.0035C8.62153 16.0035 7.13153 15.4535 5.95153 14.5235C5.76 14.3726 5.51968 14.2974 5.2763 14.3121C5.03292 14.3269 4.80344 14.4306 4.63153 14.6035C4.21153 15.0235 4.24153 15.7335 4.71153 16.0935C6.28266 17.336 8.2285 18.0092 10.2315 18.0035C15.2815 18.0035 19.3715 13.8335 19.2315 8.74349C19.1015 4.05349 15.1815 0.13349 10.4915 0.00349014ZM9.98153 5.00349C9.57153 5.00349 9.23153 5.34349 9.23153 5.75349V9.43349C9.23153 9.78349 9.42153 10.1135 9.72153 10.2935L12.8415 12.1435C13.2015 12.3535 13.6615 12.2335 13.8715 11.8835C14.0815 11.5235 13.9615 11.0635 13.6115 10.8535L10.7315 9.14349V5.74349C10.7315 5.34349 10.3915 5.00349 9.98153 5.00349Z"
                          fill="#464F60"
                        />
                      </svg>

                      <p>View Transfers</p>
                    </Link>
                    <Link className="smallcard" to="/customers">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.6176 7.57528C20.6176 10.1021 18.8795 12.1506 16.7353 12.1506C14.5911 12.1506 12.8529 10.1021 12.8529 7.57528C12.8529 5.04842 14.5911 3 16.7353 3C18.8795 3 20.6176 5.04842 20.6176 7.57528Z"
                          fill="#464F60"
                        />
                        <path
                          d="M24.5 19.0135C24.5 21.793 20.5471 20.8436 16.7353 20.8436C12.9234 20.8436 8.97058 21.793 8.97058 19.0135C8.97058 16.2339 12.9234 13.9807 16.7353 13.9807C20.5471 13.9807 24.5 16.2339 24.5 19.0135Z"
                          fill="#464F60"
                        />
                        <path
                          d="M14.8293 6.83783C14.8293 9.78583 12.8383 12.1757 10.3823 12.1757C7.92623 12.1757 5.93522 9.78583 5.93522 6.83783C5.93522 3.88983 7.92623 1.5 10.3823 1.5C12.8383 1.5 14.8293 3.88983 14.8293 6.83783Z"
                          fill="#464F60"
                        />
                        <path
                          d="M19.2764 20.1824C19.2764 23.4252 14.7486 22.3175 10.3823 22.3175C6.01598 22.3175 1.48816 23.4252 1.48816 20.1824C1.48816 16.9396 6.01598 14.3108 10.3823 14.3108C14.7486 14.3108 19.2764 16.9396 19.2764 20.1824Z"
                          fill="#464F60"
                        />
                        <path
                          d="M14.8293 6.83783C14.8293 9.78583 12.8383 12.1757 10.3823 12.1757C7.92623 12.1757 5.93522 9.78583 5.93522 6.83783C5.93522 3.88983 7.92623 1.5 10.3823 1.5C12.8383 1.5 14.8293 3.88983 14.8293 6.83783Z"
                          stroke="white"
                          stroke-width="0.588235"
                        />
                        <path
                          d="M19.2764 20.1824C19.2764 23.4252 14.7486 22.3175 10.3823 22.3175C6.01598 22.3175 1.48816 23.4252 1.48816 20.1824C1.48816 16.9396 6.01598 14.3108 10.3823 14.3108C14.7486 14.3108 19.2764 16.9396 19.2764 20.1824Z"
                          stroke="white"
                          stroke-width="0.588235"
                        />
                      </svg>
                      <p>Manage customers</p>
                    </Link>
                  </div>
                </div>
                <div className="contside2down">
                  <div className="contside2childdown">
                    <div
                      className=""
                      style={{
                        borderRight: "1px solid rgba(213, 219, 229, 1)",
                        marginLeft: "1vw",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          transform: "translateX(-2px)",
                        }}
                      >
                        <PersonIcon />
                        <div
                          style={{
                            color: "#909090",
                            fontSize: "0.8vw",
                          }}
                        >
                          {" "}
                          Total Transactions
                        </div>
                      </div>
                      <div style={{ fontSize: "2vw", fontWeight: "600" }}>
                        {FormatCorrect(
                          Math.ceil(
                            newVolume?.depositedAmount +
                              newVolume?.pendingAmount +
                              newVolume?.failedAmount || 0
                          ),
                          newVolume?.currency
                        )}
                      </div>

                      <br />

                      <div style={{ fontSize: "16px", fontWeight: "500" }}>
                        Count:{" "}
                        {kFormatter2(
                          Math.ceil(
                            newVolume?.deposited +
                              newVolume?.pending +
                              newVolume?.failed || 0
                          )
                        )}
                      </div>
                    </div>
                    <div
                      className=""
                      style={{
                        borderRight: "1px solid rgba(213, 219, 229, 1)",
                        marginLeft: "1vw",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          transform: "translateX(-2px)",
                        }}
                      >
                        <GreenCardIcon />
                        <div
                          style={{
                            color: "#909090",
                            fontSize: "0.8vw",
                          }}
                        >
                          Deposited
                        </div>
                      </div>
                      <div style={{ fontSize: "2vw", fontWeight: "600" }}>
                        {FormatCorrect(
                          Math.ceil(newVolume?.depositedAmount || 0),
                          newVolume?.currency
                        )}
                      </div>
                      <br />

                      <div style={{ fontSize: "16px", fontWeight: "500" }}>
                        Count:{" "}
                        {kFormatter2(Math.ceil(newVolume?.deposited || 0))}
                      </div>
                    </div>
                    <div
                      className=""
                      style={{
                        borderRight: "1px solid rgba(213, 219, 229, 1)",
                        marginLeft: "1vw",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          transform: "translateX(-2px)",
                        }}
                      >
                        <YellowCardIcon />
                        <div
                          style={{
                            color: "#909090",
                            fontSize: "0.8vw",
                          }}
                        >
                          Pending
                        </div>
                      </div>
                      <div style={{ fontSize: "2vw", fontWeight: "600" }}>
                        {FormatCorrect(
                          Math.ceil(newVolume?.pendingAmount || 0),
                          newVolume?.currency
                        )}
                      </div>
                      <br />
                      <div style={{ fontSize: "16px", fontWeight: "500" }}>
                        Count: {kFormatter2(Math.ceil(newVolume?.pending || 0))}
                      </div>
                    </div>
                    <div
                      className=""
                      style={{
                        marginLeft: "1vw",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          transform: "translateX(-2px)",
                        }}
                      >
                        <DeleteIcon />
                        <div
                          style={{
                            color: "#909090",
                            fontSize: "0.8vw",
                          }}
                        >
                          Failed
                        </div>
                      </div>
                      <div style={{ fontSize: "2vw", fontWeight: "600" }}>
                        {FormatCorrect(
                          Math.ceil(newVolume?.failedAmount || 0),
                          newVolume?.currency
                        )}
                      </div>
                      <br />

                      <div style={{ fontSize: "16px", fontWeight: "500" }}>
                        Count: {kFormatter2(Math.ceil(newVolume?.failed || 0))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Bar Chart Components Stamp */}
          <div className="PaymentTypeChart">
            {isLoading || isFetching || isLoadingAna || isFetchingAna ? (
              <Skeleton2
                height="400px"
                style={{
                  marginBottom: "20px",
                }}
              />
            ) : (
              <div className="Payment">
                <div className="type">
                  <p>Payment Type</p>
                  <span>
                    Shows a snapshot of payment types of your business
                  </span>
                </div>

                <PaymentType
                  currency={newVolume?.currency}
                  apiData={paymentTypes}
                />
              </div>
            )}
          </div>

          {/* Transaction Chart Stamp */}
          <div className="PaymentTypeChart2">
            {isLoading || isFetching || isLoadingAna || isFetchingAna ? (
              <Skeleton2
                height="400px"
                style={{
                  marginBottom: "20px",
                }}
              />
            ) : (
              <TransactionRecord
                currency={newVolume?.currency}
                apidata={transactions}
              />
            )}
            {isLoading || isFetching || isLoadingAna || isFetchingAna ? (
              <Skeleton2
                height="400px"
                style={{
                  marginBottom: "20px",
                }}
              />
            ) : (
              <PaymentTypeRecord
                currency={newVolume?.currency}
                apiData={transactionsChannels}
              />
            )}
          </div>
          {/*    <div className="PaymentTypeChart2">
            <BranchWise />
            <CountryRates />
          </div> */}
          <div id="logs">
            <TransferLogsTable typeee="Today" />
          </div>
          <NewCustomerList />
        </Content>
      </BodyLayout>
    </>
  );
}

const Content = styled.div`
  .limit {
    display: flex;
    justify-content: space-between;
  }
  .limit p {
    font-size: 14px;
    font-weight: 500;
    color: #5a6376;
  }
  .limit span {
    color: #464f60;
    font-weight: 500;
    font-size: 14px;
  }
  .feeslimit {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px 20px 20px 20px;
  }
  .score {
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 40px 20px 20px 20px;
  }
  .score span {
    font-size: 16px;
    font-weight: 400;
    color: #5a6376;
    line-height: 19.36px;
  }
  .flexhold {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .monthlyThreshold {
    background-color: white;
    border-radius: 10px;
  }
  .PaymentTypeChart {
    display: grid;
    grid-template-columns: 100%;
    padding: 30px 0px 30px 0px;
    gap: 10px;
  }
  .PaymentTypeChart2 {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 30px 0px 30px 0px;
    gap: 10px;
  }
  .Payment {
    background-color: white;
    border-radius: 10px;
    padding-left: 10px;
  }
  .type {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .type p {
    font-size: 24px;
    font-weight: 500;
    line-height: 29.05px;
  }
  .type span {
    font-size: 14px;
    font-weight: 500;
    color: #909090;
  }
  .paymentmethod {
    padding: 20px 20px 40px 20px;
    display: flex;
    gap: 20px;
  }
  .color1 {
    background-color: #2a278f;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .color2 {
    background-color: #d94040;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .color3 {
    background-color: #d94040;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .color4 {
    background-color: #d94040;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .card {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .card span {
    font-size: 14px;
    color: #464f60;
    font-weight: 500;
    line-height: 16.94px;
  }
  .content1 {
    display: flex;
    gap: 10px;
    overflow: hidden;
    flex-wrap: wrap;
    @media screen and (max-width: 40em) {
      width: 100%;
      flex: 1;
    }

    .box {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .box2 {
      display: flex;
      flex-direction: column;

      .boxcont {
        display: flex;
        justify-content: space-around;
        gap: 20px;
        padding: 10px;
        align-items: center;
        flex-wrap: wrap;
        @media screen and (max-width: 40em) {
          justify-content: center;
        }
      }
    }
  }

  .contside1 {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    flex: 0.1;
    padding: 2em;
    text-align: center;
    border-radius: 10px;
    @media screen and (max-width: 40em) {
      flex: 1 !important;
    }
    > .contside1Text {
      height: 100%;
      vertical-align: center;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1 {
        font-size: clamp(3rem, 5vw, 4rem);
      }
    }
  }
  .contside2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
    flex: 1;
  }
  .contside22 {
    width: 100%;
    display: flex;
    gap: 10px;
    @media screen and (max-width: 40em) {
      flex: 1 !important;
      flex-direction: column;
    }

    .smallbox {
      width: 20%;
      grid-template-columns: 1fr;
      gap: 10px;
      .smallcard {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 10px;
        svg {
          margin-right: 6px;
        }

        @media screen and (max-width: 40em) {
          gap: 8px !important;
          font-size: 10px;
        }
      }
    }
  }
  .contside2up {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 2em 1em;
    border-radius: 10px;
    width: 80%;
    gap: 20px;
    .contside2child2 {
      display: flex;

      .box {
        border-right: 1px solid rgba(213, 219, 229, 1);
        padding-inline-start: 20px;
        &:last-of-type {
          border-right: none;
        }
      }
      @media screen and (max-width: 40em) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  .contside2down {
    .contside2childdown {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      background-color: #fff;
      padding: 1em;
      /* text-align: center; */
      border-radius: 10px;
      .box2 {
        border-right: 1px solid rgba(213, 219, 229, 1);
        padding-inline-start: 30px;

        display: inline-flex;
        &:last-of-type {
          border-right: none;
        }
      }
      @media screen and (max-width: 40em) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;

export default Dashboard;
