import { useNavigate } from "react-router-dom";

import BodyLayout from "../reuseables/BodyLayout";
import styled from "styled-components";

import Skeleton2 from "../reuseables/Skeleton2";

export default function BeneficiaryDetailsPage() {
  const customerDetails =
    JSON.parse(localStorage.getItem("beneficiaryDetails")) || {};

  //const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(customerDetails, "daeo");

  const navigate = useNavigate();

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
                      navigate("/beneficiary");
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

                    <span>Back to Beneficiaries</span>
                  </div>
                </div>
              </div>

              <div className="body">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    width: "100%",
                    paddingTop: "30px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "0 30px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "70%",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "22px",
                            textTransform: "capitalize",
                            marginRight: "10px",
                          }}
                        >
                          {customerDetails?.beneficiaryName}
                        </div>

                        <div
                          style={{
                            marginTop: "20px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              color: "#63666A",
                              marginBottom: "3%",
                            }}
                          >
                            Date Created
                          </div>
                          <div
                            style={{
                              fontSize: "18px",
                              color: "#333B4A",
                              fontWeight: "700",
                              marginBottom: "3%",
                            }}
                          >
                            {customerDetails?.dateCreated}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  */}
                </div>

                <div
                  style={{
                    padding: "40px",
                  }}
                >
                  <div className="box_bank">
                    <div className="box_bank_card">
                      <div>Bank Name</div>
                      <div className="box_data">
                        {customerDetails?.beneficiaryBank?.bankName}
                      </div>
                    </div>
                    <div className="box_bank_card">
                      <div>Account Name</div>
                      <div className="box_data">
                        {customerDetails?.beneficiaryName}
                      </div>
                    </div>
                    <div className="box_bank_card">
                      <div>Account Number</div>
                      <div className="box_data">
                        {customerDetails?.beneficiaryBank?.accountNumber}
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      marginBottom: "40px",
                      marginTop: "40px",
                      opacity: "0.4",
                    }}
                  ></hr>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "40px",
                    }}
                  >
                    <div className="box">
                      <div className="inner_box">
                        <div className="inner_box_text">Country</div>
                        <div>{customerDetails?.beneficiaryCountry?.name}</div>
                      </div>
                      <div className="inner_box">
                        <div className="inner_box_text">Country Currency</div>
                        <div>
                          {" "}
                          {customerDetails?.beneficiaryCountry?.currencyCode}
                        </div>
                      </div>
                      <div className="inner_box">
                        <div className="inner_box_text">Telephone Code</div>
                        <div>
                          {customerDetails?.beneficiaryCountry?.telephoneCode}
                        </div>
                      </div>
                    </div>

                    <div className="box">
                      <div className="inner_box">
                        <div className="inner_box_text">Collection Status</div>
                        <div
                          style={{
                            padding: "6px 14px",
                            borderRadius: "7px",
                            background:
                              customerDetails?.beneficiaryCountry
                                ?.sendMoneyStatus === "Active"
                                ? "#37d744"
                                : customerDetails?.beneficiaryCountry
                                    ?.sendMoneyStatus === "InActive"
                                ? "#ff6363"
                                : "#ffe063",
                            color: "white",
                            width: "fit-content",
                            fontWeight: "700",
                          }}
                        >
                          {customerDetails?.beneficiaryCountry?.sendMoneyStatus}
                        </div>{" "}
                      </div>
                      <div className="inner_box">
                        <div className="inner_box_text">
                          Back Office Send Money Status
                        </div>
                        <div
                          style={{
                            padding: "6px 14px",
                            borderRadius: "7px",
                            background:
                              customerDetails?.beneficiaryCountry
                                ?.backOfficeSendMoneyStatus === "Active"
                                ? "#37d744"
                                : customerDetails?.beneficiaryCountry
                                    ?.backOfficeSendMoneyStatus === "InActive"
                                ? "#ff6363"
                                : "#ffe063",
                            color: "white",
                            width: "fit-content",
                            fontWeight: "700",
                          }}
                        >
                          {
                            customerDetails?.beneficiaryCountry
                              ?.backOfficeSendMoneyStatus
                          }
                        </div>{" "}
                      </div>
                      <div className="inner_box">
                        <div className="inner_box_text">Risk Level</div>
                        <div
                          style={{
                            padding: "6px 14px",
                            borderRadius: "7px",
                            background:
                              customerDetails?.beneficiaryCountry?.riskLevel
                                ?.name === "Low"
                                ? "#37d744"
                                : customerDetails?.beneficiaryCountry?.riskLevel
                                    ?.name === "Medium"
                                ? "#ffe063"
                                : "#ff6363",
                            color: "white",
                            width: "fit-content",
                            fontWeight: "700",
                          }}
                        >
                          {customerDetails?.beneficiaryCountry?.riskLevel?.name}
                        </div>
                      </div>
                    </div>
                  </div>
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
  .box {
    border: 1px solid #c7c7c7;
    border-radius: 14px;
    width: 100%;
    .inner_box {
      padding: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #c7c7c7;
      .inner_box_text {
        color: #656565;
      }
    }
    .inner_box:last-child {
      border-bottom: none;
    }
  }
  .box_bank {
    border: 1px solid #c7c7c7;
    width: 100%;
    border-radius: 14px;
    padding: 40px 0px;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .box_bank_card {
      border-right: 1px solid #c7c7c7;
      padding: 0 26px;
      .box_data {
        font-size: 20px;
        margin-top: 10px;
      }
    }
    .box_bank_card:last-child {
      border-right: none;
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
