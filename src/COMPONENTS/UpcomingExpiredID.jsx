import React from "react";
import { styled } from "styled-components";
import SearchInput from "../reuseables/SearchInput";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function UpcomingExpiredID() {
  return (
    <Content>
      <div className="main">
        <div className="head">
          <div className="status">
            <h2>Upcoming Expiring IDs</h2>
            <SearchInput placeholder="Search" style={{ width: "30vw" }} />
          </div>
          <div className="btn">
            <button
              style={{
                backgroundColor: "white",
                color: "#464F60",
              }}
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66661 13.1666L9.99994 16.4999M9.99994 16.4999L13.3333 13.1666M9.99994 16.4999V8.99994M17.3999 14.0749C18.1244 13.5655 18.6677 12.8384 18.951 11.9992C19.2343 11.1601 19.2428 10.2525 18.9753 9.40813C18.7078 8.56381 18.1782 7.82669 17.4633 7.30375C16.7485 6.78081 15.8856 6.49925 14.9999 6.49994H13.9499C13.6993 5.52317 13.2304 4.61598 12.5784 3.84668C11.9264 3.07737 11.1084 2.46599 10.186 2.05857C9.2635 1.65115 8.26065 1.4583 7.25288 1.49454C6.24512 1.53078 5.25871 1.79517 4.36791 2.2678C3.47711 2.74043 2.70513 3.40898 2.1101 4.22314C1.51507 5.03729 1.11249 5.97582 0.932662 6.96807C0.752836 7.96032 0.800453 8.98044 1.07193 9.95163C1.3434 10.9228 1.83166 11.8198 2.49994 12.5749"
                  stroke="#344054"
                  stroke-width="1.336"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Export Report{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8 11L14 5"
                  stroke="#868FA0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="TableGrid">
          <table className="table">
            <thead>
              <tr>
                <th>S/N </th>
                <th>CUSTOMER REF </th>
                <th>ID VERIFICATION </th>
                <th>COMPLIANCE</th>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th>EMAIL ID</th>
                <th>MOBILE NO</th>
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
  );
}

export default UpcomingExpiredID;
const Content = styled.div`
  .status {
    display: flex;
    flex-direction: column;
  }
  .status h2 {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
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
    align-items: center;
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
