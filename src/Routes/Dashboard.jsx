import { useState, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import BodyLayout from "../reuseables/BodyLayout";
import CountryFlag from "react-country-flag";

import { styled } from "styled-components";
import CountryDropdown from "../reuseables/CountryDropdown";
import CustomTable from "../reuseables/CustomTable";
import PaymentType from "../Graphs/PaymentType";
import { loadericon } from "../../public/ICON";
import Transactions from "../Graphs/Transactions";
import TransactionRecord from "../ChartComponent/TransactionRecord";
import PaymentTypeRecord from "../ChartComponent/PaymentTypeRecord";
import BranchWise from "../TableComponent/BranchWise";
import CountryRates from "../TableComponent/CountryRates";
import Transferlist from "../TableComponent/Transferlist";
import NewCustomerList from "../TableComponent/NewCustomerList";
import { getAdminDashboard } from "../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import Skeleton2 from "../reuseables/Skeleton2";
function Dashboard() {
  const [count, setCount] = useState(0);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  //const [params] = useSearchParams()
  const {
    data: dashboard,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getAdminDashboard"],
    queryFn: () => getAdminDashboard(userDetails?.userId),
  });

  const transactions = dashboard?.data?.analyticByTransactionStatus;

  console.log(dashboard);

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
              <div className="contside1">
                <div className="contside1Text">
                  <h1>21</h1>
                  <p>Today’s transfer</p>
                </div>
              </div>
              <div className="contside2">
                <div className="contside22">
                  <div className="contside2up">
                    <div className="contside2child1">
                      <CountryDropdown defaultValue={"Nigeria"} />
                    </div>
                    <div className="contside2child2">
                      <div className="box">
                        <h2>3,534333</h2>
                        <span>Today’s total</span>
                      </div>
                      <div className="box">
                        <h2>3,534333</h2>
                        <span>Today’s total</span>
                      </div>
                      <div className="box">
                        <h2>3,534333</h2>
                        <span>Today’s total</span>
                      </div>
                    </div>
                  </div>
                  <div className="smallbox">
                    <div className="smallcard">
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
                    </div>
                    <div className="smallcard">
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
                    </div>
                    <div className="smallcard">
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
                    </div>
                    <div className="smallcard">
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
                    </div>
                  </div>
                </div>
                <div className="contside2down">
                  <div className="contside2childdown">
                    <div className="box2">
                      <div className="boxcont">
                        <svg
                          width="58"
                          height="38"
                          viewBox="0 0 58 58"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="5"
                            y="5"
                            width="48"
                            height="48"
                            rx="24"
                            fill="#31B550"
                          />
                          <path
                            d="M42 25.0039V23.8438C42 22.5148 40.8248 21.4375 39.375 21.4375H20.625C19.1753 21.4375 18 22.5148 18 23.8438V25.0039C18 25.1225 18.105 25.2188 18.2344 25.2188H41.7656C41.895 25.2188 42 25.1225 42 25.0039Z"
                            fill="white"
                          />
                          <path
                            d="M18 26.8086V34.1562C18 35.4852 19.1753 36.5625 20.625 36.5625H39.375C40.8248 36.5625 42 35.4852 42 34.1562V26.8086C42 26.69 41.895 26.5938 41.7656 26.5938H18.2344C18.105 26.5938 18 26.69 18 26.8086ZM24 32.4375C24 32.8172 23.6642 33.125 23.25 33.125H22.5C22.0858 33.125 21.75 32.8172 21.75 32.4375V31.75C21.75 31.3703 22.0858 31.0625 22.5 31.0625H23.25C23.6642 31.0625 24 31.3703 24 31.75V32.4375Z"
                            fill="white"
                          />
                          <rect
                            x="5"
                            y="5"
                            width="48"
                            height="48"
                            rx="24"
                            stroke="#31B550"
                            stroke-opacity="0.1"
                            stroke-width="9"
                          />
                        </svg>
                        <p>deposited</p>
                      </div>
                      <h2>18</h2>
                    </div>
                    <div className="box2">
                      <div className="boxcont">
                        <svg
                          width="58"
                          height="38"
                          viewBox="0 0 58 58"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="5"
                            y="5"
                            width="48"
                            height="48"
                            rx="24"
                            fill="#4945C4"
                          />
                          <path
                            d="M33.3412 24.3378C33.3412 27.2858 31.3502 29.6757 28.8941 29.6757C26.4381 29.6757 24.4471 27.2858 24.4471 24.3378C24.4471 21.3898 26.4381 19 28.8941 19C31.3502 19 33.3412 21.3898 33.3412 24.3378Z"
                            fill="white"
                          />
                          <path
                            d="M37.7882 37.6824C37.7882 40.9252 33.2604 39.8175 28.8941 39.8175C24.5278 39.8175 20 40.9252 20 37.6824C20 34.4396 24.5278 31.8108 28.8941 31.8108C33.2604 31.8108 37.7882 34.4396 37.7882 37.6824Z"
                            fill="white"
                          />
                          <rect
                            x="5"
                            y="5"
                            width="48"
                            height="48"
                            rx="24"
                            stroke="#4945C4"
                            stroke-opacity="0.1"
                            stroke-width="9"
                          />
                        </svg>

                        <p>deposited</p>
                      </div>
                      <h2>18</h2>
                    </div>
                    <div className="box2">
                      <div className="boxcont">
                        <svg
                          width="54"
                          height="38"
                          viewBox="0 0 54 54"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="48"
                            height="48"
                            rx="24"
                            fill="#D92D20"
                          />
                          <path
                            d="M20.1429 34.7778C20.1429 36 21.1714 37 22.4286 37H31.5714C32.8286 37 33.8571 36 33.8571 34.7778V21.4444H20.1429V34.7778ZM23.7657 27.6556C23.552 27.4478 23.432 27.166 23.432 26.8722C23.432 26.5784 23.552 26.2966 23.7657 26.0889C23.9794 25.8811 24.2692 25.7644 24.5714 25.7644C24.8736 25.7644 25.1635 25.8811 25.3771 26.0889L27 27.6556L28.6114 26.0889C28.8251 25.8811 29.1149 25.7644 29.4171 25.7644C29.7193 25.7644 30.0092 25.8811 30.2229 26.0889C30.4365 26.2966 30.5566 26.5784 30.5566 26.8722C30.5566 27.166 30.4365 27.4478 30.2229 27.6556L28.6114 29.2222L30.2229 30.7889C30.3287 30.8918 30.4126 31.0139 30.4699 31.1483C30.5271 31.2827 30.5566 31.4267 30.5566 31.5722C30.5566 31.7177 30.5271 31.8618 30.4699 31.9962C30.4126 32.1306 30.3287 32.2527 30.2229 32.3556C30.117 32.4584 29.9914 32.54 29.8532 32.5957C29.7149 32.6514 29.5668 32.68 29.4171 32.68C29.2675 32.68 29.1193 32.6514 28.9811 32.5957C28.8428 32.54 28.7172 32.4584 28.6114 32.3556L27 30.7889L25.3886 32.3556C25.2828 32.4584 25.1572 32.54 25.0189 32.5957C24.8807 32.6514 24.7325 32.68 24.5829 32.68C24.4332 32.68 24.2851 32.6514 24.1468 32.5957C24.0086 32.54 23.883 32.4584 23.7771 32.3556C23.6713 32.2527 23.5874 32.1306 23.5301 31.9962C23.4729 31.8618 23.4434 31.7177 23.4434 31.5722C23.4434 31.4267 23.4729 31.2827 23.5301 31.1483C23.5874 31.0139 23.6713 30.8918 23.7771 30.7889L25.3886 29.2222L23.7657 27.6556ZM33.8571 18.1111H31L30.1886 17.3222C29.9829 17.1222 29.6857 17 29.3886 17H24.6114C24.3143 17 24.0171 17.1222 23.8114 17.3222L23 18.1111H20.1429C19.5143 18.1111 19 18.6111 19 19.2222C19 19.8333 19.5143 20.3333 20.1429 20.3333H33.8571C34.4857 20.3333 35 19.8333 35 19.2222C35 18.6111 34.4857 18.1111 33.8571 18.1111Z"
                            fill="white"
                          />
                          <rect
                            x="3"
                            y="3"
                            width="48"
                            height="48"
                            rx="24"
                            stroke="#FEF3F2"
                            stroke-width="6"
                          />
                        </svg>

                        <p>deposited</p>
                      </div>
                      <h2>18</h2>
                    </div>
                    <div className="box2">
                      <div className="boxcont">
                        <svg
                          width="58"
                          height="38"
                          viewBox="0 0 58 58"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="5"
                            y="5"
                            width="48"
                            height="48"
                            rx="24"
                            fill="#E0BE2D"
                          />
                          <path
                            d="M42 25.0039V23.8438C42 22.5148 40.8248 21.4375 39.375 21.4375H20.625C19.1753 21.4375 18 22.5148 18 23.8438V25.0039C18 25.1225 18.105 25.2188 18.2344 25.2188H41.7656C41.895 25.2188 42 25.1225 42 25.0039Z"
                            fill="white"
                          />
                          <path
                            d="M18 26.8086V34.1562C18 35.4852 19.1753 36.5625 20.625 36.5625H39.375C40.8248 36.5625 42 35.4852 42 34.1562V26.8086C42 26.69 41.895 26.5938 41.7656 26.5938H18.2344C18.105 26.5938 18 26.69 18 26.8086ZM24 32.4375C24 32.8172 23.6642 33.125 23.25 33.125H22.5C22.0858 33.125 21.75 32.8172 21.75 32.4375V31.75C21.75 31.3703 22.0858 31.0625 22.5 31.0625H23.25C23.6642 31.0625 24 31.3703 24 31.75V32.4375Z"
                            fill="white"
                          />
                          <path
                            d="M39.0832 32.9619L38.5 33.5454L37.9178 32.9629C37.9176 32.9627 37.9174 32.9625 37.9172 32.9623C37.7961 32.8403 37.6329 32.7691 37.4611 32.7633C37.289 32.7575 37.1211 32.8176 36.9919 32.9315C36.8627 33.0453 36.7819 33.2042 36.7661 33.3757C36.7502 33.5472 36.8005 33.7183 36.9066 33.8539L36.9122 33.861L36.9181 33.8677L36.9496 33.9033L36.9557 33.9102L36.9622 33.9168L37.5452 34.4997L36.9633 35.0822C36.963 35.0825 36.9628 35.0827 36.9626 35.0829C36.8407 35.204 36.7695 35.3671 36.7637 35.5389C36.7578 35.711 36.818 35.8789 36.9318 36.0081C37.0457 36.1373 37.2046 36.2181 37.3761 36.2339L37.4037 35.9352L37.3761 36.2339C37.5476 36.2498 37.7186 36.1995 37.8543 36.0934L37.8613 36.0879L37.8679 36.082L37.9032 36.0509L37.9102 36.0447L37.9168 36.0381L38.5 35.4546L39.0822 36.0371C39.0824 36.0373 39.0826 36.0375 39.0828 36.0377C39.2039 36.1597 39.3671 36.2309 39.5389 36.2367C39.711 36.2425 39.8788 36.1824 40.0081 36.0685C40.1373 35.9547 40.2181 35.7958 40.2339 35.6243L39.9352 35.5966L40.2339 35.6243C40.2498 35.4528 40.1995 35.2817 40.0934 35.1461L40.0884 35.1397L40.083 35.1336L40.0519 35.098L40.0453 35.0904L40.0381 35.0832L39.4546 34.5L40.0371 33.9178C40.0373 33.9176 40.0375 33.9174 40.0377 33.9172C40.1597 33.7961 40.2309 33.6329 40.2367 33.4611C40.2425 33.289 40.1824 33.1211 40.0685 32.9919C39.9547 32.8627 39.7958 32.7819 39.6243 32.7661C39.4528 32.7502 39.2817 32.8005 39.1461 32.9066L39.1397 32.9116L39.1336 32.917L39.098 32.9481L39.0904 32.9547L39.0832 32.9619ZM38.5 31.05C40.4054 31.05 41.95 32.5946 41.95 34.5C41.95 36.4054 40.4054 37.95 38.5 37.95C36.5946 37.95 35.05 36.4054 35.05 34.5C35.05 32.5946 36.5946 31.05 38.5 31.05Z"
                            fill="white"
                            stroke="#E0BE2D"
                            stroke-width="0.6"
                          />
                          <rect
                            x="5"
                            y="5"
                            width="48"
                            height="48"
                            rx="24"
                            stroke="#F0C923"
                            stroke-opacity="0.1"
                            stroke-width="9"
                          />
                        </svg>

                        <p>deposited</p>
                      </div>
                      <h2>18</h2>
                    </div>
                    <div className="box2">
                      <div className="boxcont">
                        <svg
                          width="58"
                          height="38"
                          viewBox="0 0 58 58"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="5"
                            y="5"
                            width="48"
                            height="48"
                            rx="24"
                            fill="#E0BE2D"
                          />
                          <path
                            d="M42 25.0039V23.8438C42 22.5148 40.8248 21.4375 39.375 21.4375H20.625C19.1753 21.4375 18 22.5148 18 23.8438V25.0039C18 25.1225 18.105 25.2188 18.2344 25.2188H41.7656C41.895 25.2188 42 25.1225 42 25.0039Z"
                            fill="white"
                          />
                          <path
                            d="M18 26.8086V34.1562C18 35.4852 19.1753 36.5625 20.625 36.5625H39.375C40.8248 36.5625 42 35.4852 42 34.1562V26.8086C42 26.69 41.895 26.5938 41.7656 26.5938H18.2344C18.105 26.5938 18 26.69 18 26.8086ZM24 32.4375C24 32.8172 23.6642 33.125 23.25 33.125H22.5C22.0858 33.125 21.75 32.8172 21.75 32.4375V31.75C21.75 31.3703 22.0858 31.0625 22.5 31.0625H23.25C23.6642 31.0625 24 31.3703 24 31.75V32.4375Z"
                            fill="white"
                          />
                          <path
                            d="M39.0832 32.9619L38.5 33.5454L37.9178 32.9629C37.9176 32.9627 37.9174 32.9625 37.9172 32.9623C37.7961 32.8403 37.6329 32.7691 37.4611 32.7633C37.289 32.7575 37.1211 32.8176 36.9919 32.9315C36.8627 33.0453 36.7819 33.2042 36.7661 33.3757C36.7502 33.5472 36.8005 33.7183 36.9066 33.8539L36.9122 33.861L36.9181 33.8677L36.9496 33.9033L36.9557 33.9102L36.9622 33.9168L37.5452 34.4997L36.9633 35.0822C36.963 35.0825 36.9628 35.0827 36.9626 35.0829C36.8407 35.204 36.7695 35.3671 36.7637 35.5389C36.7578 35.711 36.818 35.8789 36.9318 36.0081C37.0457 36.1373 37.2046 36.2181 37.3761 36.2339L37.4037 35.9352L37.3761 36.2339C37.5476 36.2498 37.7186 36.1995 37.8543 36.0934L37.8613 36.0879L37.8679 36.082L37.9032 36.0509L37.9102 36.0447L37.9168 36.0381L38.5 35.4546L39.0822 36.0371C39.0824 36.0373 39.0826 36.0375 39.0828 36.0377C39.2039 36.1597 39.3671 36.2309 39.5389 36.2367C39.711 36.2425 39.8788 36.1824 40.0081 36.0685C40.1373 35.9547 40.2181 35.7958 40.2339 35.6243L39.9352 35.5966L40.2339 35.6243C40.2498 35.4528 40.1995 35.2817 40.0934 35.1461L40.0884 35.1397L40.083 35.1336L40.0519 35.098L40.0453 35.0904L40.0381 35.0832L39.4546 34.5L40.0371 33.9178C40.0373 33.9176 40.0375 33.9174 40.0377 33.9172C40.1597 33.7961 40.2309 33.6329 40.2367 33.4611C40.2425 33.289 40.1824 33.1211 40.0685 32.9919C39.9547 32.8627 39.7958 32.7819 39.6243 32.7661C39.4528 32.7502 39.2817 32.8005 39.1461 32.9066L39.1397 32.9116L39.1336 32.917L39.098 32.9481L39.0904 32.9547L39.0832 32.9619ZM38.5 31.05C40.4054 31.05 41.95 32.5946 41.95 34.5C41.95 36.4054 40.4054 37.95 38.5 37.95C36.5946 37.95 35.05 36.4054 35.05 34.5C35.05 32.5946 36.5946 31.05 38.5 31.05Z"
                            fill="white"
                            stroke="#E0BE2D"
                            stroke-width="0.6"
                          />
                          <rect
                            x="5"
                            y="5"
                            width="48"
                            height="48"
                            rx="24"
                            stroke="#F0C923"
                            stroke-opacity="0.1"
                            stroke-width="9"
                          />
                        </svg>

                        <p>deposited</p>
                      </div>
                      <h2>18</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Bar Chart Components Stamp */}
          <div className="PaymentTypeChart">
            {isLoading || isFetching ? (
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
                <div className="paymentmethod">
                  <div className="card">
                    <div className="color1"></div>
                    <span>Pay By Card</span>
                  </div>
                  <div className="card">
                    <div className="color2"></div>
                    <span>Pay By Cash</span>
                  </div>
                  <div className="card">
                    <div className="color3"></div>
                    <span>Bank Transfer</span>
                  </div>
                  <div className="card">
                    <div className="color4"></div>
                    <span>Pay By Bank</span>
                  </div>
                </div>
                <PaymentType />
              </div>
            )}
            {/* Three Shold Stamp */}
            {isLoading || isFetching ? (
              <Skeleton2
                height="400px"
                style={{
                  marginBottom: "20px",
                }}
              />
            ) : (
              <div className="monthlyThreshold">
                <div className="flexhold">
                  <div className="type">
                    <p>Monthly Threshold</p>
                    <span>
                      Shows a snapshot of monthly threshold on your system
                    </span>
                  </div>
                  <CountryDropdown
                    defaultValue={"Nigeria"}
                    style={{ padding: "20px" }}
                  />
                </div>

                <div className="score">
                  <span>Threshold Score</span>
                  <img src={loadericon} alt="" />
                </div>
                <div className="feeslimit">
                  <div className="limit">
                    <p>Threshold Limit</p>
                    <span>2,350,000,90</span>
                  </div>
                  <div className="limit">
                    <p>Total amount (including fee)</p>
                    <span>115,439,.09</span>
                  </div>
                  <div className="limit">
                    <p>Total fee</p>
                    <span>0.00</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transaction Chart Stamp */}
          <div className="PaymentTypeChart2">
            {isLoading || isFetching ? (
              <Skeleton2
                height="400px"
                style={{
                  marginBottom: "20px",
                }}
              />
            ) : (
              <TransactionRecord apidata={transactions} />
            )}
            {isLoading || isFetching ? (
              <Skeleton2
                height="400px"
                style={{
                  marginBottom: "20px",
                }}
              />
            ) : (
              <PaymentTypeRecord />
            )}
          </div>
          {/*    <div className="PaymentTypeChart2">
            <BranchWise />
            <CountryRates />
          </div> */}
          <Transferlist />
          <NewCustomerList />
          <CustomTable />
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
    grid-template-columns: 60% 40%;
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
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
      gap: 10px;
      .smallcard {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 25px;
        background-color: #fff;
        border-radius: 10px;

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
    padding: 2em;
    border-radius: 10px;
    width: 100%;
    gap: 20px;
    .contside2child2 {
      display: flex;

      .box {
        border-right: 1px solid rgba(213, 219, 229, 1);
        padding-inline-start: 30px;
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
      display: flex;
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
