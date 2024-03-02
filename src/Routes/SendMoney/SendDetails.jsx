import styled from "styled-components";
import SectionHeader from "../../reuseables/SectionHeader";
import { useState } from "react";
import {
  Paymentchannel,
  agentCustomerGetRate,
  beneficiaries,
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

export default function SendDetails({
  details,
  setDetails,
  setRate,
  newPurpose,
  setPurpose,
  payout,
  setPayout,
  payment,
  setPayment,
  selectedCountry,
  setSelectedCountry,
  selectedCountry2,
  setSelectedCountry2,
  customer,
}) {
  const [params] = useSearchParams();

  const { data: purpose } = useQuery({
    queryKey: ["TransferPurposed"],
    queryFn: () => TransferPurpose(),
  });

  const { data: payoutChannels } = useQuery({
    queryKey: ["Payoutchannels"],
    queryFn: () => Payoutchannel(),
  });

  const { data: paymentChannels } = useQuery({
    queryKey: ["Paymentchannels"],
    queryFn: () => Paymentchannel(),
  });

  const user = JSON.parse(localStorage.getItem("userSend"));

  const { data: rates } = useQuery({
    queryKey: [
      selectedCountry?.id,
      selectedCountry2?.id,
      details?.amount,
      0,
      user?.role?.id,
      user?.agentId,
      user?.userId,
    ],
    queryFn: user?.agentId ? agentCustomerGetRate : customerRates,
    onSuccess: (data) => {
      setRate(data);
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });
  console.log(details);
  console.log(rates, "jklssds");
  return (
    <Content>
      <div className="tablecontent">
        <SendDetailsTop clientUser={customer} />
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
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "20px",
          }}
        >
          <div>
            <p className="">How will the sender pay?</p>

            <AppSelect
              value={payment}
              options={paymentChannels?.data?.map((item) => {
                return {
                  label: item?.name,
                  value: item?.name,
                  ...item,
                };
              })}
              onChange={(val) => {
                setDetails({
                  ...details,
                  paymentChannelId: val.id,
                });
                setPayment(val);
              }}
            />
          </div>{" "}
          <div>
            <p className="">Collection Type</p>
            <AppSelect
              value={payout}
              options={payoutChannels?.data?.map((item) => {
                return {
                  label: item?.name,
                  value: item?.name,
                  ...item,
                };
              })}
              onChange={(val) => {
                setDetails({
                  ...details,
                  payoutChannelId: val.id,
                });
                setPayout(val);
              }}
            />
          </div>
          <div>
            <p className="">Select purpose of transfer</p>
            <AppSelect
              value={newPurpose}
              options={purpose?.data?.map((item) => {
                return {
                  label: item?.name,
                  value: item?.name,
                };
              })}
              onChange={(val) => {
                setDetails({
                  ...details,
                  purpose: val.label,
                });
                setPurpose(val);
              }}
              placeholder="Family support"
            />
          </div>
        </div>

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
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "20px",
          }}
        >
          <div>
            <p className="">Sending Currency</p>

            <div className="cont1">
              <CountryDropdown
                onChange={(e) => {
                  setSelectedCountry(e);
                  setDetails({
                    ...details,
                    fromCurrencyId: e?.id,
                  });
                }}
                value={selectedCountry}
              />
              <InputNumber
                className="input"
                style={{
                  borderSize: "0.5px",
                  fontSize: "15px",
                  borderRadius: "0  0 10px",
                  border: "1px solid #ccc",
                  background: "#ffffff",
                  color: "#000000",
                }}
                onChange={(newValue) => {
                  console.log("Change:", `${newValue}`);
                  setDetails({
                    ...details,
                    amount: newValue,
                  });
                }}
                formatter={(value) => {
                  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }}
              />
            </div>
          </div>{" "}
          <div>
            <p className="">Receiving Currency</p>
            <div className="cont3">
              <CountryDropdown
                collectionStatus
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  setSelectedCountry2(e);
                  setDetails({
                    ...details,
                    toCurrencyId: e?.id,
                  });
                }}
                value={selectedCountry2}
              />
              <InputNumber
                className="input"
                style={{
                  borderSize: "0.5px",
                  fontSize: "15px",
                  borderRadius: "0  0 10px",
                  padding: "13px",
                  border: "1px solid #ccc",
                  background: "#ffffff",
                  color: "#000000",
                  width: "100%",
                  backgroundColor: "transparent",
                }}
                formatter={(value) => {
                  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }}
                value={rates?.data?.computedToAmount}
                disabled
              />
            </div>
          </div>
          <div></div>
          <div>
            <p>Transaction note</p>
            <Input.TextArea
              name="address"
              className="textarea"
              placeholder="Enter comments ..."
              onChange={(e) => {
                setDetails({
                  ...details,
                  note: e,
                });
              }}
              style={{
                minHeight: 104,
                background: "transparent",
                border: "1px solid #d8d8d8",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
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
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "20px",
          }}
        >
          <div>
            <label>Transfer Fee</label>
            <AppInput
              placeholder="How much"
              type="number"
              width="92%"
              name="username"
              disabled
              //value={selectedCountry?.charge}
              value={rates?.data?.transitionFee || 0}
            />
          </div>
          <div>
            <label>Exchange Rate</label>
            <AppInput
              placeholder="How much"
              type="number"
              width="92%"
              name="username"
              disabled
              //value={selectedCountry?.charge}
              value={rates?.data?.conversionRate || 0}
            />
          </div>
        </div>
        <hr
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            opacity: "0.4",
          }}
        ></hr>
        <div className="box_bank">
          <div className="box_bank_card">
            <div>Total amount you will be paying</div>
            <div className="box_data">
              <AmountFormatter
                currency={selectedCountry?.code}
                value={rates?.data?.totalAmountToPay || 0}
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

  .box_bank {
    border: 1px solid #c7c7c7;
    width: 100%;
    border-radius: 14px;
    padding: 40px 0px;
    text-align: center;
    .box_bank_card {
      border-right: 1px solid #c7c7c7;
      padding: 0 26px;
      .box_data {
        font-size: 26px;
        margin-top: 10px;
      }
    }
    .box_bank_card:last-child {
      border-right: none;
    }
  }
  .rc-input-number-input {
    background: #fff;
    border: none;
    color: black;
    width: 100%;
  }
  .cont1,
  .cont3 {
    display: grid;
    grid-template-columns: 3.4fr 4fr;

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
