import React from "react";
import Transactions from "../Graphs/Transactions";
import { styled } from "styled-components";

function TransactionRecord() {
  return (
    <Content>
      <div className="Payment">
        <div className="type">
          <p>Transactions</p>
          <span>Shows a snapshot of payment types on your system</span>
        </div>
        <div className="paymentmethod">
          <div className="card">
            <div className="color1"></div>
            <span>Deposited</span>
          </div>
          <div className="card">
            <div className="color2"></div>
            <span>Processed</span>
          </div>
          <div className="card">
            <div className="color3"></div>
            <span>Spending</span>
          </div>
          <div className="card">
            <div className="color4"></div>
            <span>Cancelled</span>
          </div>
          <div className="card">
            <div className="color5"></div>
            <span>Hold</span>
          </div>
        </div>
        <Transactions />
      </div>
    </Content>
  );
}

export default TransactionRecord;
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
    background-color: #12b76a;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .color2 {
    background-color: #4945c4;
    height: 15px;
    width: 15px;
    border-radius: 50%;
  }
  .color3 {
    background-color: #e0be2d;
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
  .color5 {
    background-color: #fef0c7;
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
