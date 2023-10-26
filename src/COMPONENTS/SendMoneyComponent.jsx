import React, { useState } from "react";
import { styled } from "styled-components";
import { DummyProfile, saheedprofile } from "../../public/IMAGES";
import style from "../styles/ComponentStyle/sendmoney.module.css";
import { AiOutlineDown } from "react-icons/ai";
import Appbutton from "../reuseables/Appbutton";
import ReviewTransferComponent from "./ReviewTransferComponent";

function SendMoneyComponent({ reviewTransfer, sendMoney }) {
  const [viewTransfer, setViewTransfer] = useState(false);
  return (
    <Content>
      {viewTransfer ? (
        ""
      ) : (
        <>
          {/* client Details for transaction */}
          <div className="GridLayouts">
            <div className="container">
              <img src={DummyProfile} alt="" />
              <div className="main">
                <p className="senderdetails">Sender Details</p>
                <div className="content">
                  <span>Reference</span>
                  <p>TR09657846484</p>
                </div>
                <div className="content">
                  <span>Name</span>
                  <p style={{ color: "#417CD4", cursor: "pointer" }}>
                    Funke Oba
                  </p>
                </div>
                <div className="content">
                  <span>Mobile Number</span>
                  <p>074536392733</p>
                </div>
                <div className="content">
                  <span>Address</span>
                  <p>
                    2b Frances Avenue Ilford
                    <br /> United Kingdom IG1 1TS
                  </p>
                </div>
              </div>
            </div>

            <div className="container">
              <img src={saheedprofile} alt="" />
              <div className="main">
                <p className="senderdetails">Receiver Details</p>

                <div className="content">
                  <span>Name</span>
                  <p style={{ color: "#417CD4", cursor: "pointer" }}>
                    Albert Saheed
                  </p>
                </div>

                <div className="content">
                  <span>Address</span>
                  <p>
                    29a Berkley street, Lagos
                    <br /> Island.
                  </p>
                </div>
                <div className="region">
                  <div className="content">
                    <span>City</span>
                    <p>Lagos</p>
                  </div>
                  <div className="content">
                    <span>Country</span>
                    <p>
                      {" "}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1224_22854)">
                          <path
                            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                            fill="#F0F0F0"
                          />
                          <path
                            d="M-0.000366211 10.001C-0.000366211 14.3007 2.71338 17.9661 6.52139 19.3791V0.623047C2.71338 2.03594 -0.000366211 5.70141 -0.000366211 10.001Z"
                            fill="#6DA544"
                          />
                          <path
                            d="M19.9999 10.001C19.9999 5.70141 17.2862 2.03594 13.4781 0.623047V19.3791C17.2862 17.9661 19.9999 14.3007 19.9999 10.001Z"
                            fill="#6DA544"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1224_22854">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Nigeria
                    </p>
                  </div>
                  <div className="content">
                    <span>Mobile Number</span>
                    <p>074253783638</p>
                  </div>
                </div>
                <div className="region">
                  <div className="content">
                    <span>Bank Name</span>
                    <p>FIDELITY BANK</p>
                  </div>

                  <div className="content">
                    <span>Account Number</span>
                    <p>074253783638</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="transactionDate">
              <label>Transaction Date</label>
              <input type="date" />
            </div>
          </div>
          {/* PAYMENT TYPE FOR THE TRANSACTIONS */}
          <div className="type">
            <div className="ref">
              <label>How will the sender pay</label>
              <div className="select">
                <select>
                  <option>Pay with Bank</option>
                </select>
                <AiOutlineDown />
              </div>
            </div>
            <div className="ref">
              <label>Collection Type</label>
              <div className="select">
                <select>
                  <option>Direct to Bank</option>
                </select>
                <AiOutlineDown />
              </div>
            </div>
            <div className="ref">
              <label>Delivery Type</label>
              <div className="select">
                <select>
                  <option>Instant Transfer</option>
                </select>
                <AiOutlineDown />
              </div>
            </div>
            <div className="check">
              <input type="checkbox" className="checkbox" />
              <label>Select Collection Point Later</label>
            </div>
          </div>
          {/* Currency Rates */}
          <div className="type">
            <div className="ref">
              <label>Amount in GBP</label>
              <div className="currency">
                <div className="gdp">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1229_23412)">
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M2.06718 3.91016C1.28167 4.93215 0.689365 6.11008 0.344482 7.38973H5.54675L2.06718 3.91016Z"
                        fill="#0052B4"
                      />
                      <path
                        d="M19.6558 7.38969C19.3109 6.11008 18.7186 4.93215 17.9331 3.91016L14.4536 7.38969H19.6558Z"
                        fill="#0052B4"
                      />
                      <path
                        d="M0.344482 12.6094C0.689404 13.889 1.28171 15.0669 2.06718 16.0889L5.54663 12.6094H0.344482Z"
                        fill="#0052B4"
                      />
                      <path
                        d="M16.0879 2.06649C15.0659 1.28098 13.888 0.688672 12.6084 0.34375V5.54598L16.0879 2.06649Z"
                        fill="#0052B4"
                      />
                      <path
                        d="M3.91162 17.9306C4.93361 18.7161 6.11155 19.3084 7.39116 19.6534V14.4512L3.91162 17.9306Z"
                        fill="#0052B4"
                      />
                      <path
                        d="M7.39111 0.34375C6.1115 0.688672 4.93357 1.28098 3.91162 2.06644L7.39111 5.54593V0.34375Z"
                        fill="#0052B4"
                      />
                      <path
                        d="M12.6084 19.6534C13.888 19.3084 15.0659 18.7161 16.0879 17.9307L12.6084 14.4512V19.6534Z"
                        fill="#0052B4"
                      />
                      <path
                        d="M14.4536 12.6094L17.9331 16.0889C18.7186 15.0669 19.3109 13.889 19.6558 12.6094H14.4536Z"
                        fill="#0052B4"
                      />
                      <path
                        d="M19.9154 8.69566H11.3044H11.3044V0.0846484C10.8774 0.0290625 10.4421 0 10 0C9.55785 0 9.12262 0.0290625 8.69566 0.0846484V8.69559V8.69563H0.0846484C0.0290625 9.12262 0 9.55793 0 10C0 10.4421 0.0290625 10.8774 0.0846484 11.3043H8.69559H8.69563V19.9154C9.12262 19.9709 9.55785 20 10 20C10.4421 20 10.8774 19.971 11.3043 19.9154V11.3044V11.3044H19.9154C19.9709 10.8774 20 10.4421 20 10C20 9.55793 19.9709 9.12262 19.9154 8.69566Z"
                        fill="#D80027"
                      />
                      <path
                        d="M12.6086 12.6094L17.071 17.0718C17.2762 16.8666 17.472 16.6521 17.6588 16.4298L13.8384 12.6094H12.6086V12.6094Z"
                        fill="#D80027"
                      />
                      <path
                        d="M7.39122 12.6094H7.39114L2.92883 17.0717C3.13399 17.2769 3.34848 17.4727 3.57083 17.6595L7.39122 13.839V12.6094Z"
                        fill="#D80027"
                      />
                      <path
                        d="M7.3911 7.39019V7.39012L2.92876 2.92773C2.72352 3.13289 2.52774 3.34738 2.34094 3.56973L6.16137 7.39016H7.3911V7.39019Z"
                        fill="#D80027"
                      />
                      <path
                        d="M12.6086 7.39199L17.071 2.92957C16.8659 2.72434 16.6514 2.52855 16.429 2.3418L12.6086 6.16223V7.39199Z"
                        fill="#D80027"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1229_23412">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>GBP</span>
                </div>
                <input type="text" placeholder="£20.00" />
              </div>
            </div>
            <div className="ref">
              <label>Receiver Currency</label>
              <div className="select">
                <select>
                  <option> Direct to Bank</option>
                </select>
                <AiOutlineDown />
              </div>
            </div>
            <div className="ref">
              <label>Amount in Foreign Currency (Sending to Nigeria) </label>

              <div className="currency">
                <div className="gdp">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1224_22854)">
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M-0.000366211 10.001C-0.000366211 14.3007 2.71338 17.9661 6.52139 19.3791V0.623047C2.71338 2.03594 -0.000366211 5.70141 -0.000366211 10.001Z"
                        fill="#6DA544"
                      />
                      <path
                        d="M19.9999 10.001C19.9999 5.70141 17.2862 2.03594 13.4781 0.623047V19.3791C17.2862 17.9661 19.9999 14.3007 19.9999 10.001Z"
                        fill="#6DA544"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1224_22854">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>{" "}
                  <span>NGN</span>
                </div>
                <input type="text" placeholder="₦24260" />
              </div>
            </div>
            <div className="ref">
              <label>Select Purpose of Transfer</label>
              <div className="select">
                <select>
                  <option>Family Support</option>
                </select>
                <AiOutlineDown />
              </div>
            </div>
            <div className="fee">
              <label>Transaction Note</label>
              <input
                type="text"
                placeholder="Type a Note"
                style={{ paddingBottom: "114px" }}
              />
            </div>
          </div>
          <div className="type">
            <div className="fee">
              <label>Transfer Fee</label>
              <input type="text" placeholder="0" />
            </div>
            <div className="fee">
              <label>Transaction Note</label>
              <input type="text" placeholder="1213.000" />
            </div>
          </div>

          {/* Additional Information */}
          <div className="onlineRate">
            <div className="additionalinfo">
              <h2>Additional Information</h2>
              <div className="promocode">
                <p>Promo Code (optional)</p>
                <span>View available codes</span>
              </div>
              <div className="apply">
                <input type="text" />
                <Appbutton
                  style={{ backgroundColor: "#00A85A", color: "white" }}
                  placeholder="Apply"
                />
              </div>
            </div>
            <div className="rates">
              <span>Our Online Rates:</span>
              <p>1213.0000</p>
            </div>
          </div>

          {/* Transfer Count  */}
          <div className="tranfercount">
            <div className="count">
              <p>Customer Transfer Count</p>
              <span>2</span>
            </div>
            <div className="count">
              <p>Total GBP today</p>
              <span>70.00</span>
            </div>
          </div>
          <div
            className="tranfercount"
            style={{
              borderTop: "1px solid gainsboro",
              borderBottom: "1px solid gainsboro",
            }}
          >
            <div className="count">
              <p>Total amount you'll be paying</p>
              <span>£100.00</span>
            </div>
          </div>
          <div className="btn2">
            <Appbutton
              onClick={() => sendMoney(false)}
              placeholder="Back"
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "1px solid gainsboro",
              }}
            />
            <Appbutton
              placeholder="Continue"
              style={{ backgroundColor: "#00A85A", color: "white" }}
              onClick={() => {
                reviewTransfer(true), setViewTransfer(true);
              }}
            />
          </div>
        </>
      )}
      {viewTransfer && (
        <ReviewTransferComponent
          reviewTransfer={reviewTransfer}
          ViewTransfer={setViewTransfer}
        />
      )}
    </Content>
  );
}

export default SendMoneyComponent;
const Content = styled.div`
  .btn2 {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 20px 20px 20px 0px;
  }
  .tranfercount {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 20px 90px 20px;
    gap: 50px;
  }
  .count {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 358px;
    padding: 20px;
    gap: 15px;
    border-radius: 15px;
    box-shadow: 5px 3px 3px 3px #6362621a;
  }
  .count p {
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    color: #5a6376;
  }
  .count span {
    font-size: 32px;
    line-height: 38px;
    font-weight: 500;
  }
  .onlineRate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-top: 1px solid gainsboro;
  }
  .rates span {
    color: #909090;
    line-height: 19px;
    font-size: 17px;
    font-weight: 500;
  }
  .rates {
    display: flex;
    gap: 9px;
  }
  .rates p {
    color: #333b4a;
    line-height: 19px;
    font-size: 17px;
    font-weight: 500;
  }
  .additionalinfo {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 35%;
  }
  .additionalinfo h2 {
    font-size: 32px;
    font-weight: 500;
    line-height: 38px;
    color: #333b4a;
    letter-spacing: 1px;
  }
  .promocode {
    display: flex;
    width: 83%;
    justify-content: space-between;
  }
  .promocode p {
    color: #344054;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
  .promocode span {
    color: #417cd4;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .apply {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  .apply input {
    width: 100%;
    border: 1px solid #d0d5dd;
    border-radius: 5px;
    padding-left: 10px;
  }
  .fee {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .fee label {
    color: #344054;
    font-size: 15px;
    line-height: 20px;
    font-weight: 500;
  }
  .fee input {
    padding: 13px;
    border-radius: 5px;
    border: 1px solid gainsboro;
  }
  .fee ::placeholder {
    color: #667085;
    font-size: 15px;
  }
  .gdp {
    display: flex;
    gap: 10px;
    border-right: 1px solid gainsboro;
    padding: 10px;
    align-items: center;
  }
  .gdp p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #667085;
  }
  .currency {
    display: flex;
    border: 1px solid gainsboro;
    align-items: center;
    border-radius: 5px;
  }
  .currency input {
    border: none;
    outline: none;
    padding: 10px;
    width: 100%;
  }
  .currency ::placeholder {
    font-size: 15px;
    color: #667085;
  }
  .check {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .check label {
    color: #344054;
    font-size: 14px;
    font-weight: 500;
  }
  .checkbox {
    height: 15px;
    width: 15px;
  }
  .type {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    /* border-bottom: 1px solid #eaecf0; */
    /* padding: 30px; */
    /* justify-content: space-between; */
  }
  .ref {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .ref label {
    color: #344054;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }

  .select select {
    appearance: none;
    border: none;
    padding: 13px;
    width: 100%;
  }
  .select {
    padding-right: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    border: 1px solid gainsboro;
  }
  .GridLayouts {
    padding: 50px 30px 30px 30px;
    display: grid;
    grid-template-columns: repeat(3, auto);
    border-bottom: 1px solid gainsboro;
  }
  .container {
    display: flex;
    gap: 30px;
    /* align-items: center; */
  }
  .transactionDate {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .transactionDate input {
    width: 139px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid gainsboro;
    cursor: pointer;
    font-size: 14px;
    color: #344054;
  }
  .Sendcontainer {
    display: flex;
    gap: 20px;
  }

  .content span {
    font-size: 14px;
    font-weight: 500;
    line-height: 16.94px;
    color: #909090;
  }
  .container img {
    height: 140px;
    width: 140px;
  }
  .content p {
    font-size: 16px;
    font-weight: 500;
    color: #333b4a;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .senderdetails {
    font-size: 24px;
    padding: 0;
    font-weight: 400;
    line-height: 29px;
    color: #333b4a;
  }
  .region {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
