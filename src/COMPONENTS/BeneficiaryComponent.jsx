import React, { useState } from "react";
import { styled } from "styled-components";
import { DummyProfile, saheedprofile } from "../../public/IMAGES";
import { FiMoreVertical } from "react-icons/fi";
import SendMoneyComponent from "./SendMoneyComponent";
function BeneficiaryComponent({ closeBeneficiaryComponent }) {
  const [selectSender, setSelectSender] = useState(false);
  const [beneficiary, setBeneficiary] = useState(true);
  const [sendmoney, setSendMoney] = useState();
  const [reviewTransfer, setReviewTransfer] = useState();

  //   check usestate
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [beneficiaryCheck, setBeneficiaryCheck] = useState(false);
  const AppData = JSON.parse(localStorage?.getItem("AppData"));
  console.log(JSON.parse(localStorage?.getItem("AppData")));
  return (
    <Content>
      <div className="top">
        <div onClick={() => closeBeneficiaryComponent(false)} className="back">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25 12.2734L19.25 12.2734"
              stroke="#00A85A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.2998 18.299L4.2498 12.275L10.2998 6.25"
              stroke="#00A85A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Back to Send Money</span>
        </div>
        <p>Send money to Saheed Albert</p>
      </div>
      <div className="main">
        <div className="selection">
          <div
            className="sender"
            onClick={() => {
              setSelectSender(true);
              setBeneficiary(false);
              setSendMoney(false);
              setReviewTransfer(false);
            }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="32" height="32" rx="16" fill="#00A85A" />
              <path
                d="M25.6666 14L16.5 23.1667L12.3333 19"
                stroke="white"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="3"
                y="3"
                width="32"
                height="32"
                rx="16"
                stroke="#00A85A"
                stroke-opacity="0.1"
                stroke-width="5"
              />
            </svg>

            <p style={{ color: selectSender ? "#00A85A" : "" }}>
              Select Sender
            </p>
          </div>
          <div
            className="sender"
            onClick={() => {
              setSelectSender(false);
              setBeneficiary(true);
              setSendMoney(false);
              setReviewTransfer(false);
            }}
          >
            {sendmoney ? (
              ""
            ) : (
              <span
                style={{ border: beneficiary ? "3px solid #00a85a5a" : "" }}
              >
                2
              </span>
            )}
            {sendmoney && (
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="32"
                  height="32"
                  rx="16"
                  fill="#00A85A"
                />
                <path
                  d="M25.6666 14L16.5 23.1667L12.3333 19"
                  stroke="white"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <rect
                  x="3"
                  y="3"
                  width="32"
                  height="32"
                  rx="16"
                  stroke="#00A85A"
                  stroke-opacity="0.1"
                  stroke-width="5"
                />
              </svg>
            )}
            <p style={{ color: beneficiary ? "#00A85A" : "" }}>Beneficiary</p>
          </div>
          <div
            className="sender"
            onClick={() => {
              setSelectSender(false);
              setBeneficiary(false);
              setSendMoney(true);
              setReviewTransfer(false);
            }}
          >
            {reviewTransfer && (
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="32"
                  height="32"
                  rx="16"
                  fill="#00A85A"
                />
                <path
                  d="M25.6666 14L16.5 23.1667L12.3333 19"
                  stroke="white"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <rect
                  x="3"
                  y="3"
                  width="32"
                  height="32"
                  rx="16"
                  stroke="#00A85A"
                  stroke-opacity="0.1"
                  stroke-width="5"
                />
              </svg>
            )}
            {reviewTransfer ? (
              ""
            ) : (
              <span style={{ border: sendmoney ? "3px solid #00a85a5a" : "" }}>
                3
              </span>
            )}
            <p style={{ color: sendmoney ? "#00A85A" : "" }}>Send Money</p>
          </div>
          <div
            className="sender"
            onClick={() => {
              setSelectSender(false);
              setBeneficiary(false);
              setSendMoney(false);
              setReviewTransfer(true);
            }}
          >
            <span
              style={{
                border: reviewTransfer ? "3px solid #00a85a5a" : "",
              }}
            >
              4
            </span>
            <p style={{ color: reviewTransfer ? "#00A85A" : "" }}>
              Review Transfer
            </p>
          </div>
        </div>

        {sendmoney ? (
          ""
        ) : (
          <>
            <div className="header">
              <div className="top2">
                <p>Beneficiary</p>
                <span>Select a beneficiary to send money to</span>
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
                  {/* <svg
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
                  fill="white"
                />
              </svg> */}
                  Add a Beneficiary
                </button>
              </div>
            </div>
            <div className="flexwrap">
              <div className="GridProfiles">
                <div
                  className="profiles"
                  style={{ border: check ? "1px solid #00a85a" : "" }}
                  onClick={() => setCheck(!check)}
                >
                  <div className="BeneficiaryProfile">
                    {check && (
                      <svg
                        width="50"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          fill="#169D07"
                        />
                        <path
                          d="M11.1102 5.66797L6.83361 9.94454L4.88971 8.00065"
                          stroke="white"
                          stroke-width="1.55512"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          stroke="#169D07"
                          stroke-width="0.933071"
                        />
                      </svg>
                    )}
                    {check ? (
                      ""
                    ) : (
                      <svg
                        width="50"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          fill="white"
                        />
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          stroke="#D0D5DD"
                          stroke-width="0.933071"
                        />
                      </svg>
                    )}

                    <img src={saheedprofile} alt="" />
                    <FiMoreVertical size={20} />
                  </div>
                  <div className="ProfileName">
                    <p>Albert Saheed A.</p>
                    <span>Nigeria</span>
                  </div>
                  <span>Account ending with ....6152</span>
                </div>
              </div>
              <div className="GridProfiles">
                <div
                  className="profiles"
                  style={{ border: check2 ? "1px solid #00a85a" : "" }}
                  onClick={() => setCheck2(!check2)}
                >
                  <div className="BeneficiaryProfile">
                    {check2 && (
                      <svg
                        width="50"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          fill="#169D07"
                        />
                        <path
                          d="M11.1102 5.66797L6.83361 9.94454L4.88971 8.00065"
                          stroke="white"
                          stroke-width="1.55512"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          stroke="#169D07"
                          stroke-width="0.933071"
                        />
                      </svg>
                    )}
                    {check2 ? (
                      ""
                    ) : (
                      <svg
                        width="50"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          fill="white"
                        />
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          stroke="#D0D5DD"
                          stroke-width="0.933071"
                        />
                      </svg>
                    )}

                    <img src={DummyProfile} alt="" />
                    <FiMoreVertical size={20} />
                  </div>
                  <div className="ProfileName">
                    <p>Albert Saheed A.</p>
                    <span>Nigeria</span>
                  </div>
                  <span>Account ending with ....6152</span>
                </div>
              </div>
            </div>
            <div className="btn2">
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                  border: "1px solid #464F6029",
                }}
                onClick={() => closeBeneficiaryComponent(false)}
              >
                Back
              </button>
              <button
                style={{ backgroundColor: "#00A85A", color: "white" }}
                onClick={() => {
                  setSendMoney(true);
                  //   setReviewTransfer(false);
                  //   setBeneficiaryCheck(false);
                }}
              >
                Continue
              </button>
            </div>
          </>
        )}
        {sendmoney && (
          <SendMoneyComponent
            reviewTransfer={setReviewTransfer}
            sendMoney={setSendMoney}
          />
        )}
      </div>
    </Content>
  );
}

export default BeneficiaryComponent;
const Content = styled.div`
  .flexwrap {
    display: flex;
    flex-wrap: wrap;
  }
  .GridProfiles {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
  .BeneficiaryProfile {
    display: flex;
    justify-content: space-between;
  }
  .profiles {
    border: 1px solid #e9edf5;
    height: 242px;
    padding-top: 13px;
    padding-bottom: 13px;
    padding-right: 10px;
    border-radius: 7px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  .profiles span {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.52px;
    color: #667085;
  }
  .ProfileName p {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #5a6376;
  }
  .ProfileName span {
    font-size: 13px;
    font-weight: 400;
    line-height: 15.73px;
    color: #667085;
  }
  .BeneficiaryProfile img {
    width: 138px;
    height: 138px;
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 40px;
  }
  .top p {
    font-size: 32px;
    font-weight: 500;
    line-height: 28px;
  }
  .back {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .back span {
    color: #00a85a;
    font-size: 15px;
    font-weight: 400;
  }
  .main {
    background-color: white;
    width: 100%;
    /* margin-top: 30px; */
    border-radius: 10px;
  }
  .selection {
    padding: 40px 40px 0px 30px;
    display: flex;
    gap: 50px;
    cursor: pointer;
    border-bottom: 1px solid #eaecf0;
    padding-bottom: 20px;
  }
  .sender {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sender p {
    font-size: 17px;
    font-weight: 500;
    color: #a1a9b8;
    line-height: 48px;
  }
  .sender span {
    /* border: 8px solid #00a85a24; */
    border: 1px solid gainsboro;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    color: #a1a9b8;
    font-size: 17px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 40px 40px 30px;
    border-bottom: 1px solid #eaecf0;
  }
  .top2 {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .top2 p {
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
  }
  .top2 span {
    font-size: 15px;
    color: #667085;
    font-weight: 400;
  }
  .btn {
    display: flex;
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
  .btn2 {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #464f6029;
  }
  .btn2 button {
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    height: 46px;
    width: 96px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
`;
