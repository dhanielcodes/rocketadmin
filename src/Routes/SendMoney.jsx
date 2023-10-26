import React, { useState, useEffect } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SearchInput from "../reuseables/SearchInput";
import BeneficiaryComponent from "../COMPONENTS/BeneficiaryComponent";
function SendMoney() {
  const [selectSender, setSelectSender] = useState(true);
  const [beneficiary, setBeneficiary] = useState();
  const [sendmoney, setSendMoney] = useState();
  const [reviewTransfer, setReviewTransfer] = useState();

  const [Noteinfo, setNoteinfo] = useState(true);

  //   Component useState
  const [beneficiaryComponent, setBeneficiaryComponent] = useState(false);
  return (
    <BodyLayout>
      {beneficiaryComponent && (
        <BeneficiaryComponent
          closeBeneficiaryComponent={setBeneficiaryComponent}
        />
      )}
      {beneficiaryComponent ? (
        ""
      ) : (
        <Content>
          <div className="top">
            <p>Incomplete Registrations</p>
            <span>
              This page shows you customers with incomplete registrations
            </span>
          </div>
          {Noteinfo && (
            <div className="info">
              <div className="note">
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0001 12.8327V9.49935M10.0001 6.16602H10.0084M18.3334 9.49935C18.3334 14.1017 14.6025 17.8327 10.0001 17.8327C5.39771 17.8327 1.66675 14.1017 1.66675 9.49935C1.66675 4.89698 5.39771 1.16602 10.0001 1.16602C14.6025 1.16602 18.3334 4.89698 18.3334 9.49935Z"
                    stroke="#417CD4"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p>
                  Note, Click on{" "}
                  <span style={{ color: "#417CD4" }}>Send Money</span> from the
                  table list below to send money to a customer.
                </p>
              </div>
              <svg
                onClick={() => setNoteinfo(false)}
                cursor="pointer"
                width="36"
                height="37"
                viewBox="0 0 36 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 13.5L13 23.5M13 13.5L23 23.5"
                  stroke="#344054"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
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
                <span
                  style={{ border: selectSender ? "8px solid #00a85a24" : "" }}
                >
                  1
                </span>
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
                <span
                  style={{ border: beneficiary ? "8px solid #00a85a24" : "" }}
                >
                  2
                </span>
                <p style={{ color: beneficiary ? "#00A85A" : "" }}>
                  Beneficiary
                </p>
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
                <span
                  style={{ border: sendmoney ? "8px solid #00a85a24" : "" }}
                >
                  3
                </span>
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
                    border: reviewTransfer ? "8px solid #00a85a24" : "",
                  }}
                >
                  4
                </span>
                <p style={{ color: reviewTransfer ? "#00A85A" : "" }}>
                  Review Transfer
                </p>
              </div>
            </div>
            <div className="head">
              <SearchInput placeholder="Search" style={{ width: "30vw" }} />
              {/* <button onClick={() => setFilter(true)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 5.83301H17.5"
                  stroke="#344054"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M5 10H15"
                  stroke="#344054"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8.33337 14.167H11.6667"
                  stroke="#344054"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              Filter
            </button> */}
            </div>

            <div className="TableGrid">
              <table className="table">
                <thead>
                  <tr>
                    <th>CUSTOMER REF </th>
                    <th>ID VERIFICATIONS</th>
                    <th>REFRERENCE NO</th>
                    <th>COMPLIANCE</th>
                    <th>NAME</th>
                    <th>EMAIL ID</th>
                    <th>ADDRESS </th>
                    <th>MOBILE NO</th>
                    <th>DATE</th>
                    <th>BRANCH</th>
                    <th>STATUS</th>
                    <th>FILE REF</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{ color: "#417CD4" }}
                      onClick={() => setBeneficiaryComponent(true)}
                    >
                      Send Money
                    </td>
                    <td>Verified</td>
                    <td>TRO8357383</td>
                    <td>0 Alert</td>
                    <td>Saheed Albert</td>
                    <td>Olamide@gmail.com</td>
                    <td>42 Avoca Court</td>
                    <td>44-88888</td>
                    <td>23/08/2021</td>
                    <td>Web Branch</td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <span>Showing 1-5 of entries</span>
              <div className="pagins">
                <p>Rows per page:</p>
                <select>
                  <option>5</option>
                </select>
                <div className="arrow">
                  <button
                    onClick={() => {
                      // setSortDate(sortdate - 1);
                      // setEnd((prev) => prev - end);
                    }}
                  >
                    <AiOutlineLeft />
                  </button>
                  <button>0</button>
                  <button>
                    <AiOutlineRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Content>
      )}
    </BodyLayout>
  );
}

export default SendMoney;
const Content = styled.div`
  .top p {
    font-size: 32px;
    font-weight: 500;
  }
  .top {
    padding-bottom: 20px;
  }
  .top span {
    font-size: 15px;
    color: #848d87;
    font-weight: 400;
  }
  .btn {
    display: flex;
    gap: 10px;
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
  .info {
    background-color: #e1ebf9;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #bfd5f5;
  }
  .selection {
    padding: 40px 40px 0px 30px;
    display: flex;
    gap: 50px;
    cursor: pointer;
    border-bottom: 1px solid gainsboro;
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
  .note {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .note p {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #464f60;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .head button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .TableGrid {
    overflow: hidden;
    overflow: scroll;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100vw;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
    color: #5a6376;
    cursor: pointer;
  }
  .table span {
    font-size: 14px;
    font-weight: 400;
    color: #667085;
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 25px;
  }

  .row span {
    font-size: 15px;
    color: #687182;
  }
  .arrow {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .arrow button {
    width: 28.8px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    border-radius: 3px;
  }
  .pagins {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  .pagins p {
    font-size: 14px;
    color: #687182;
  }

  .pagins select {
    width: 48px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    padding: 2px;
    border-radius: 3px;
  }
`;
