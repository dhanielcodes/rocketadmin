import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPayoutClientDashboard } from "../../services/PayoutDashboard";
import { isError, useQuery } from "@tanstack/react-query";
import BodyLayout from "../../reuseables/BodyLayout";
import styled from "styled-components";
import { BackTop, Button, Skeleton } from "@arco-design/web-react";
import phone from "../../assets/icons/phoneIcon.svg";
import mail from "../../assets/icons/mailIcon.svg";
import profile from "../../assets/images/profile.png";
import Details from "./ClientDetailsTabs/Details";

export default function ClientDetailsPage() {
  const [params] = useSearchParams();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const userId = params.get("userId");

  const {
    data: client,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getPayoutClientDashboard(userId),
  });

  console.log(client);
  const clientUser = client?.data;
  const navigate = useNavigate();

  const [active, setActive] = useState("Profile");

  const tab = ["Profile", "ID Documents", "Transactions", "Charges"];

  return (
    <BodyLayout>
      {isLoading ||
        (isFetching && (
          <div style={{ padding: "20px" }}>
            <Skeleton
              style={{ height: "100vh", width: "100%", background: "white" }}
            />
          </div>
        ))}
      {client?.data && (
        <Client>
          <div className="topBar">
            <div>
              <div
                className="back_buttton"
                onClick={() => {
                  navigate("/clients");
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

                <span>Back to Clients</span>
              </div>

              <div className="top_name">{clientUser?.companyName}</div>
            </div>

            <div style={{ display: "flex" }}>
              <button className="fund">
                {" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.99999 2C8.4142 2 8.74999 2.33579 8.74999 2.75V7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41422 13.6642 8.75 13.25 8.75H8.74999V13.25C8.74999 13.6642 8.4142 14 7.99999 14C7.58578 14 7.24999 13.6642 7.24999 13.25V8.75H2.75C2.33579 8.75 2 8.41422 2 8C2 7.58579 2.33579 7.25 2.75 7.25H7.24999V2.75C7.24999 2.33579 7.58578 2 7.99999 2Z"
                    fill="#5A6376"
                  />
                </svg>
                <span>Fund Wallet</span>
              </button>
              &nbsp; &nbsp;
              <button className="suspend">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2412_13671)">
                    <path
                      d="M5.3335 8.00016H10.6668M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2412_13671">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span>Suspend</span>
              </button>
            </div>
          </div>

          <div className="body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div className="left_body">
                <div className="profile">PROFILE</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      width: "80%",
                    }}
                  >
                    <div
                      className="rounded-full overflow-hidden w-[8vw] h-[8vw] rounded-fulls mr-[2%]"
                      style={{
                        borderRadius: "10000px",
                        overflow: "hidden",
                        width: "160px",
                        height: "160px",
                        marginRight: "2%",
                      }}
                    >
                      <img
                        className="w-full- h-full"
                        style={{ width: "100%", height: "100%" }}
                        src={profile}
                        alt=""
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.8vw",
                            textTransform: "capitalize",
                            marginRight: "10px",
                          }}
                        >
                          {clientUser?.companyName}
                        </div>
                        <div
                          style={{
                            padding: "8px 16px",
                            borderRadius: "10000px",
                            background: clientUser?.isEmailVerified
                              ? "#63ff706c"
                              : "#ff63634b",
                            color: clientUser?.isEmailVerified
                              ? "green"
                              : "red",
                            width: "fit-content",
                            fontWeight: "700",
                          }}
                        >
                          {clientUser?.isEmailVerified ? "Active" : "Inactive"}
                        </div>
                      </div>

                      <div
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "16px",
                            color: "#63666A",
                            marginBottom: "3%",
                          }}
                        >
                          Client ID
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            color: "#333B4A",
                            fontWeight: "700",
                            marginBottom: "3%",
                          }}
                        >
                          {clientUser?.clientKeys?.clientId}
                        </div>
                      </div>

                      <div
                        style={{
                          marginBottom: "40px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "16px",
                            color: "#63666A",
                            marginBottom: "3%",
                          }}
                        >
                          Registration Date
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            color: "#333B4A",
                            fontWeight: "700",
                            marginBottom: "3%",
                          }}
                        >
                          {clientUser?.dateRegistered}
                        </div>
                      </div>

                      {/* <div
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "16px",
                          color: "#63666A",
                          marginBottom: "3%",
                        }}
                      >
                        DOB
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          color: "#333B4A",
                          fontWeight: "700",
                          marginBottom: "3%",
                        }}
                      >
                        {clientUser?.dateRegistered}
                      </div>
                    </div> */}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-[1vw] text-[#909090] my-[2%]"
                      style={{
                        fontSize: "22px",
                        color: "#909090",
                        marginBottom: "2%",
                        marginTop: "2%",
                      }}
                    >
                      CONTACT INFORMATION
                    </div>

                    <div
                      className="flex items-start my-[5%]"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "5%",
                        marginTop: "5%",
                      }}
                    >
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "4px",
                        }}
                        className="w-14 h-14 mr-1"
                        src={mail}
                        alt=""
                      />
                      <div
                        className="ml-[4%]"
                        style={{
                          marginLeft: "4%",
                        }}
                      >
                        <div
                          className="text-[1vw] mb-[2%]"
                          style={{
                            fontSize: "18px",
                            marginBottom: "2%",
                          }}
                        >
                          Email
                        </div>
                        <div
                          className="text-[1vw] text-[#63666A] mb-[3%]"
                          style={{
                            fontSize: "18px",
                            color: "#63666A",
                            marginBottom: "3%",
                          }}
                        >
                          {clientUser?.email}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "5%",
                        marginTop: "5%",
                      }}
                    >
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "4px",
                        }}
                        src={phone}
                        alt=""
                      />
                      <div
                        className="ml-[4%]"
                        style={{
                          marginLeft: "4%",
                        }}
                      >
                        <div
                          className="text-[1vw] mb-[2%]"
                          style={{
                            fontSize: "18px",
                            marginBottom: "2%",
                          }}
                        >
                          Phone
                        </div>
                        <div
                          className="text-[1vw] text-[#63666A] mb-[3%]"
                          style={{
                            fontSize: "18px",
                            color: "#63666A",
                            marginBottom: "3%",
                          }}
                        >
                          {clientUser?.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginBottom: "20px",
                marginTop: "80px",
                borderBottom: "1px solid #EAECF0",
                display: "flex",
              }}
            >
              {tab.map((item) => {
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
                        color: active === item ? "#00A85A" : "#667085",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>

            {active === "Profile" && <Details clientDetails={clientUser} />}
            {active === "ID Documents" && (
              <Details clientDetails={clientUser} />
            )}
            {active === "Transactions" && (
              <Details clientDetails={clientUser} />
            )}
            {active === "Charges" && <Details clientDetails={clientUser} />}
          </div>
        </Client>
      )}
    </BodyLayout>
  );
}

const Client = styled.div`
  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

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
  }

  .body {
    padding: 20px;
    width: 100%;
    background-color: white;
    border-radius: 20px;

    .left_body {
      width: 90%;

      .profile {
        font-size: 20px;
        color: "#909090";
        margin-bottom: 20px;
      }
    }
  }
`;
