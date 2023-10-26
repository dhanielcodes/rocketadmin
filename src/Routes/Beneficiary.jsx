import React, { useState } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SearchInput from "../reuseables/SearchInput";
import AddNewBeneficiary from "../COMPONENTS/AddNewBeneficiary";

function Beneficiary() {
  const [AddBeneficiary, setAddBeneficiary] = useState(false);
  console.log(JSON.parse(localStorage?.getItem("AppData")));

  return (
    <>
      <BodyLayout>
        {AddBeneficiary && (
          <AddNewBeneficiary closeBeneficiary={setAddBeneficiary} />
        )}
        {AddBeneficiary ? (
          ""
        ) : (
          <Content>
            <div className="header">
              <div className="top">
                <p>Beneficiary</p>
                <span>This page allows you to manage beneficiaries</span>
              </div>
              <div className="btn">
                <button
                  style={{
                    backgroundColor: "#00A85A",
                    color: "white",
                  }}
                  onClick={() => setAddBeneficiary(true)}
                >
                  {/* <AiOutlinePlus size={18} style={{ color: "white" }} /> */}
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
                      fill="white"
                    />
                  </svg>
                  New Beneficiary
                </button>
              </div>
            </div>
            <div className="main">
              <div className="head">
                <SearchInput placeholder="Search" style={{ width: "30vw" }} />
                <button>
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
                </button>
              </div>

              <div className="TableGrid">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ACTIONS</th>
                      <th>CUSTOMER REF </th>
                      <th>NAME </th>
                      <th>BENEFICIARY NAME</th>
                      <th>ADDRESS</th>
                      <th>MOBILE NO</th>
                      <th>CITY NAME</th>
                      <th>COUNTRY NAME</th>
                      <th>STATUS</th>
                      {/* <th>EMAIL ID</th>
                <th>MOBILE NO</th> */}
                    </tr>
                  </thead>
                  <tbody></tbody>
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
    </>
  );
}

export default Beneficiary;
const Content = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top p {
    font-size: 32px;
    font-weight: 500;
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
  .main {
    background-color: white;
    /* height: 750px; */
    margin-top: 30px;
    border-radius: 10px;
    overflow: hidden;
    overflow: scroll;
  }
  .TableGrid {
    overflow: hidden;
    overflow: scroll;
    position: relative;
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
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100%;
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
`;
