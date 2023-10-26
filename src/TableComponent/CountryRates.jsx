import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  AiOutlineArrowRight,
  AiOutlineDown,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { TiArrowUnsorted, TiMediaRecord } from "react-icons/ti";
import SearchInput from "../reuseables/SearchInput";

function CountryRates() {
  const [sortdate, setSortDate] = useState(0);
  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <h1>Popular Country Rates</h1>
          <button>
            See All <AiOutlineArrowRight size={17} />
          </button>
        </div>
        <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>CURRENCY</th>
              <th>MIN AMT</th>
              <th>MAX AMT</th>
              <th>RATE</th>
              <th>FEE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {history.slice(end, start).map((h) => {
              return (
                <tr>
                  <td>
                    <input type="checkbox" />
                    &nbsp; &nbsp;
                    <Image
                      src={h.icon}
                      width={30}
                      height={30}
                      style={{ marginBottom: "-8px", marginRight: "10px" }}
                    />
                    {h.customer_name}
                  </td>

                  <td>{h.email_address}</td>

                  <td>{h.merchant}</td>

                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Image src={h.icon2} width={40} height={40} />
                    <p>
                      {h.type}
                      <br />
                      <span>{h.expiry}</span>
                    </p>
                  </td>

                  <td>
                    <div
                      style={{
                        color:
                          h.status === "Tokenized"
                            ? "#027A48"
                            : h.status === "De-tokenized"
                            ? "#B42318"
                            : "red",

                        backgroundColor:
                          h.status === "Tokenized"
                            ? "#ECFDF3"
                            : h.status === "De-tokenized"
                            ? "#FFFAEB"
                            : "#FEF3F2",
                        display: "inline-flex",
                        gap: "10px",
                        width: " 100%",
                        justifyContent: "center",
                        padding: "9px",
                        borderRadius: " 5px",
                      }}
                    >
                      <TiMediaRecord /> {h.status}
                    </div>
                  </td>

                  <td>{h.date}</td>

                  <td>
                    <FiMoreVertical size={20} />
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
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
              <button>{sortdate}</button>
              <button>
                <AiOutlineRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}

export default CountryRates;
const Content = styled.div`
  .top {
    padding: 10px 30px 30px 20px;
  }

  .tablecontent {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 10px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 0px 20px;
  }
  .content h1 {
    font-weight: 500;
    font-size: 24px;
  }
  .content button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 7rem;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    cursor: pointer;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100%;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  /* .table tr:nth-child(odd) {
    background-color: #f6f6f6;
} */

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
