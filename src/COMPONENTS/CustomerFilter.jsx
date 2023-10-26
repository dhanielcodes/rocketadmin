import React from "react";
import { styled } from "styled-components";
import Modal from "../reuseables/Modal";
import { AiOutlineDown } from "react-icons/ai";
import AppInput from "../reuseables/AppInput";
import Appbutton from "../reuseables/Appbutton";
function CustomerFilter({ closeCustomer }) {
  return (
    <Content>
      <Modal title="Filter" onClick={() => closeCustomer(false)}>
        <div className="top">
          <div className="ref">
            <label>Customer Ref.</label>

            <AppInput placeholder="TX0000" width="16vw" />
          </div>
          <div className="ref">
            <label>Email ID.</label>

            <AppInput placeholder="TX0000" width="16vw" />
          </div>
          <div className="ref">
            <label>Customer Name</label>

            <AppInput placeholder="TX0000" width="16vw" />
          </div>
          <div className="ref">
            <label>Mobile Number</label>

            <AppInput placeholder="TX0000" width="16vw" />
          </div>
          <div className="ref">
            <label>Branch</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="ref">
            <label>Post Code</label>

            <AppInput placeholder="TX0000" width="16vw" />
          </div>
          <div className="ref">
            <label> ID Verification.</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="ref">
            <label>Customer Status</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="ref">
            <label>Compliance Status.</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="ref">
            <label>File Reference</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="ref">
            <label>User</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="ref">
            <label>User</label>
            <AppInput type="Date" width="16vw" />
          </div>
          <div className="ref">
            <label>Date of Birth</label>
            <AppInput type="Date" width="16vw" />
          </div>
        </div>
        <div className="checkDiv">
          <div className="checkbox">
            <input type="checkbox" className="checkboxx" />
            <span>Apply Date Filter</span>
          </div>
          <div className="checkbox">
            <input type="checkbox" className="checkboxx" />
            <span>Show File Reference</span>
          </div>
          <div className="checkbox">
            <input type="checkbox" className="checkboxx" />
            <span>Latest ID Uploaded</span>
          </div>
        </div>
        <div className="btn">
          <Appbutton
            placeholder="Reset"
            style={{
              backgroundColor: "transparent",
              border: "1px solid gainsboro",
            }}
            onClick={() => closeCustomer(false)(false)}
          />
          <Appbutton
            placeholder="Apply Filter"
            style={{
              backgroundColor: "#00A85A",
              color: "white",
              border: "1px solid #00A85A",
            }}
          />
        </div>
      </Modal>
    </Content>
  );
}

export default CustomerFilter;
const Content = styled.div`
  .top {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
  }
  .ref {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .select select {
    appearance: none;
    border: none;
    padding: 10px;
    width: 100%;
  }
  .select {
    width: 16.5vw;
    padding-right: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    border: 1px solid gainsboro;
  }
  .checkDiv {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .checkbox {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .checkboxx {
    width: 20px;
    height: 20px;
    border: 1px solid gainsboro;
  }
  .btn {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }
`;
