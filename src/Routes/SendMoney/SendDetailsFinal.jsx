import styled from "styled-components";
import SectionHeader from "../../reuseables/SectionHeader";
import { useState } from "react";
import {
  Paymentchannel,
  agentCustomerGetRate,
  customerRates,
} from "../../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Input, Skeleton } from "@arco-design/web-react";
import SendDetailsTop from "./SendDetailsTop";
import CustomSelect from "../../reuseables/CustomSelect";
import { Payoutchannel, TransferPurpose } from "../../services/PayoutDashboard";
import CountryDropdown from "../../reuseables/CountryList";
import InputNumber from "rc-input-number";
import AppSelect from "../../reuseables/AppSelect";
import AppInput from "../../reuseables/AppInput";
import AmountFormatter from "../../reuseables/AmountFormatter";

export default function SendDetailsFinal({ rate }) {
  const [params] = useSearchParams();

  const user = JSON.parse(params.get("fullDetails"));
  const beneficiary = JSON.parse(params.get("beneficiary"));

  console.log(user, rate);
  return (
    <Content>
      <div className="tablecontent">
        <SendDetailsTop />

        <hr
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            opacity: "0.4",
          }}
        ></hr>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "40px",
          }}
        >
          <div className="box">
            <div className="inner_box">
              <div className="inner_box_text">
                Amount Sent in {user?.fromCurrency?.code}
              </div>
              <div>
                <AmountFormatter
                  currency={user?.fromCurrency?.code}
                  value={user?.amount || 0}
                />
              </div>
            </div>
            <div className="inner_box">
              <div className="inner_box_text">Exchange Rate</div>
              <div>
                {" "}
                <AmountFormatter
                  currency={user?.toCurrency?.code}
                  value={user?.rate?.data?.conversionRate || 0}
                />
              </div>
            </div>
            <div className="inner_box">
              <div className="inner_box_text">Amount in Foreign Currency</div>
              <div>
                <AmountFormatter
                  currency={user?.toCurrency?.code}
                  value={user?.rate?.data?.computedToAmount || 0}
                />
              </div>
            </div>
            <div className="inner_box">
              <div className="inner_box_text">Transfer Fees in GBP</div>
              <div>
                <AmountFormatter
                  currency={user?.fromCurrency?.code}
                  value={user?.rate?.data?.transitionFee || 0}
                />
              </div>
            </div>
          </div>
          <div className="box">
            <div className="inner_box">
              <div className="inner_box_text">Payment Type</div>
              <div>{user?.payment?.name}</div>
            </div>
            <div className="inner_box">
              <div className="inner_box_text">Collection Type</div>
              <div>{user?.payout?.name}</div>
            </div>
            <div className="inner_box">
              <div className="inner_box_text">Purpose</div>
              <div>{user?.purpose}</div>
            </div>
            <div className="inner_box">
              <div className="inner_box_text">Note</div>
              <div>{user?.note}</div>
            </div>
          </div>
        </div>
        <hr
          style={{
            marginBottom: "40px",
            marginTop: "40px",
            opacity: "0.4",
          }}
        ></hr>

        <div className="box_bank">
          <div className="box_bank_card">
            <div>Bank Name</div>
            <div className="box_data">
              {beneficiary?.beneficiaryBank?.bankName}
            </div>
          </div>
          <div className="box_bank_card">
            <div>Account Name</div>
            <div className="box_data">{beneficiary?.beneficiaryName}</div>
          </div>
          <div className="box_bank_card">
            <div>Account Number</div>
            <div className="box_data">
              {beneficiary?.beneficiaryBank?.accountNumber}
            </div>
          </div>
          <div className="box_bank_card">
            <div>Total amount you will be paying</div>
            <div className="box_data">
              <AmountFormatter
                currency={user?.fromCurrency?.code}
                value={user?.rate?.data?.totalAmountToPay || 0}
              />
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}

const Content = styled.div`
  .tablecontent {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 10px;

    padding: 20px;
  }
  .rc-input-number-input {
    background: #fff;
    border: none;
    color: black;
    width: 100%;
  }
  .box {
    border: 1px solid #c7c7c7;
    border-radius: 14px;
    width: 100%;
    .inner_box {
      padding: 18px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #c7c7c7;
      .inner_box_text {
        color: #656565;
      }
    }
    .inner_box:last-child {
      border-bottom: none;
    }
  }
  .box_bank {
    border: 1px solid #c7c7c7;
    width: 100%;
    border-radius: 14px;
    padding: 40px 0px;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .box_bank_card {
      border-right: 1px solid #c7c7c7;
      padding: 0 26px;
      .box_data {
        font-size: 20px;
        margin-top: 10px;
      }
    }
    .box_bank_card:last-child {
      border-right: none;
    }
  }
  .cont1,
  .cont3 {
    display: grid;
    grid-template-columns: 4fr 2fr;

    width: 100%;
    .css-13cymwt-control {
      /* padding: 10px; */
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 0px;
      border-top-left-radius: 10px;
      border-top-right-radius: 0px;
      border-right: none;
      border-width: 1.5px;
    }

    .input {
      padding: 8px !important;
      /* border-bottom-left-radius: 10px; */
      /* border-top-left-radius: 10px; */
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
      /* border: none !important; */

      &::placeholder {
        font-size: 12px;
      }
    }
  }
  .cont2 {
    display: flex;
    /* flex-direction: column; */
    /* align-items: flex-start; */
    /* align-items: center; */
    /* justify-content: space-evenly; */
    width: 80%;
    margin: 0 auto;
    gap: 20px;

    .cont2content {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* border: 1px solid red;å */
    }

    .sidecontenr {
      /* border: 1px solid red;å */
      width: 300px;
      > h4 {
        font-weight: 500;
      }
    }

    .tecont {
      width: 100%;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
    }
    .te {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .card {
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;

    .card_title {
      color: #5a6376;
      font-size: 16px;
    }
    .card_cont {
      color: #667085;
      margin-bottom: 30px;
      margin-top: 10px;
    }
    .card_num {
      font-size: 12px;
      color: #667085;
    }
  }
`;
