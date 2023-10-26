import React from "react";
import { styled } from "styled-components";
import PaymentType2 from "../Graphs/PaymentType2";

function PaymentTypeRecord() {
    const AppData = JSON.parse(localStorage.getItem("AppData"))
    console.log("🚀 ~ file: PaymentTypeRecord.jsx:7 ~ PaymentTypeRecord ~ AppData:", AppData)
  return (
    <Content>
      <div className="Payment">
        <div className="type">
          <p>Payment Type</p>
          <span>Shows a snapshot of payment types on your system</span>
        </div>
        <div className="paymentmethod">
          <div className="card">
            <div className="color1"></div>
            <span>Bank Office</span>
          </div>
          <div className="card">
            <div className="color2"></div>
            <span>Web</span>
          </div>
          <div className="card">
            <div className="color3"></div>
            <span>App</span>
          </div>
        </div>
        <PaymentType2 />
      </div>
    </Content>
  );
}

export default PaymentTypeRecord;
const Content = styled.div`
  .Payment {
    background-color: white;
    border-radius: 10px;
    padding-left: 10px;
  }
  .type {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .type p {
    font-size: 24px;
    font-weight: 500;
    line-height: 29.05px;
  }
  .type span {
    font-size: 14px;
    font-weight: 500;
    color: #909090;
  }
  .paymentmethod {
    padding: 20px 20px 40px 20px;
    display: flex;
    gap: 20px;
  }
  .color1 {
    background-color: #fb923c;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .color2 {
    background-color: #cbc7c6;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .color3 {
    background-color: #7694e0;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .color4 {
    background-color: #d94040;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .card {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .card span {
    font-size: 14px;
    color: #464f60;
    font-weight: 500;
    line-height: 16.94px;
  }
`;
