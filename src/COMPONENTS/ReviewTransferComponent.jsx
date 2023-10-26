import React from "react";
import { styled } from "styled-components";
import Appbutton from "../reuseables/Appbutton";

function ReviewTransferComponent({ ViewTransfer, reviewTransfer }) {
  return (
    <Content>
      <div className="Gridouts">
        <div className="main">
          <p className="senderdetails">Sender Name: Funke Oba</p>
          <div className="content">
            <span>Reference</span>
            <p>TR09657846484</p>
          </div>
          <div className="content">
            <span>Name</span>
            <p>Funke Oba</p>
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
        <div className="main">
          <p className="senderdetails">Receiver Name: Saheed Albert</p>
          <div className="content">
            <span>Address</span>
            <p>29a Berkley street, Lagos Island</p>
          </div>
          <div className="content">
            <span>Email Address</span>
            <p>saheed@gmail.com</p>
          </div>
          <div className="content">
            <span>Mobile Number</span>
            <p>074536392733</p>
          </div>
          <div className="content">
            <span>User</span>
            <p>Admin</p>
          </div>
        </div>
      </div>

      <div className="contain">
        <h2 style={{ fontSize: "18px" }}>Transfer Details</h2>
        <div className="transferdetails">
          <div className="details">
            <div className="amount">
              <span>Amount sent in GBP</span>
              <p>20.00</p>
            </div>
            <div className="amount">
              <span>Exchange Rate</span>
              <p>1213.000</p>
            </div>
            <div className="amount">
              <span>Amount in Foreign Currency</span>
              <p>24260 NGN</p>
            </div>
            <div className="amount">
              <span>Transfer Fees in GBP</span>
              <p>0.00</p>
            </div>
          </div>
          <div className="details">
            <div className="amount">
              <span>Payment Type</span>
              <p>20.00</p>
            </div>
            <div className="amount">
              <span>Collection Type</span>
              <p>1213</p>
            </div>
            <div className="amount">
              <span>Delivery Type</span>
              <p>24260</p>
            </div>
            <div className="amount">
              <span>Purpose </span>
              <p>Family Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="BankDetails">
        <div className="BankInfo">
          <span>Bank Name</span>
          <p>Fidelity Bank</p>
        </div>
        <div className="BankInfo">
          <span>Branch</span>
          <p> hh</p>
        </div>
        <div className="BankInfo">
          <span>Account Number</span>
          <p>Fidelity Bank</p>
        </div>
        <div className="BankInfo">
          <span>Total amount you will be paying</span>
          <p>20.00 GBP</p>
        </div>
      </div>

      <div className="btn2">
        <Appbutton
          placeholder="Back"
          style={{
            backgroundColor: "transparent",
            color: "#595959",
            border: "1px solid gainsboro",
          }}
          onClick={() => {
            ViewTransfer(false), reviewTransfer(false);
          }}
        />
        <Appbutton
          placeholder="Proceed to Payment"
          style={{ backgroundColor: "#00A85A", color: "white", width: "100%" }}
        />
      </div>
    </Content>
  );
}

export default ReviewTransferComponent;
const Content = styled.div`
  .btn2 {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 20px 20px 20px 0px;
  }
  .BankDetails {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    padding: 50px;
    border: 1px solid #d0d5dd;
    border-radius: 10px;
  }
  .BankInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    border-left: 1px solid gainsboro;
  }
  .BankInfo span {
    font-weight: 500;
    font-size: 17px;
    color: #595959;
  }
  .BankInfo p {
    font-weight: 500;
    font-size: 18px;
    color: black;
  }
  .contain {
    padding: 20px 20px 40px 20px;
    border-bottom: 1px solid gainsboro;
  }
  .contain h2 {
    font-weight: 500;
    font-size: 18px;
    color: #595959;
    padding: 0px 20px 10px 0px;
  }
  .transferdetails {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .details {
  }
  .amount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d0d5dd;
    padding: 20px;
  }
  .amount span {
    /* color: #d0d5dd; */
    color: #909090;
  }
  .amount p {
    /* color: #d0d5dd; */
    color: black;
    font-weight: 500;
    font-size: 16px;
  }
  .Gridouts {
    padding: 20px 20px 20px 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gainsboro;
  }
  .content span {
    font-size: 14px;
    font-weight: 500;
    line-height: 16.94px;
    color: #909090;
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
    font-size: 21px;
    font-weight: 500;
    padding: 0;
    font-weight: 400;
    line-height: 29px;
    color: #333b4a;
  }
`;
