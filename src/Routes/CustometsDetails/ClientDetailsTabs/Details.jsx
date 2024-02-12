import React, { useState } from "react";
import styled from "styled-components";
import AppInput from "../../../reuseables/AppInput";
import AmountFormatter from "../../../reuseables/AmountFormatter";
import CountryDropdownDash from "../../../reuseables/CountryDropdownDash";
import GaugeChart from "react-gauge-chart";

export default function Details({ clientDetails, setViewRisk }) {
  const [selected, setSelected] = useState();
  const newSelected =
    selected ||
    clientDetails?.transactionVolumeByCurrency?.map((item) => {
      return {
        label: item?.currency,
        value: item?.currency,
        ...item,
      };
    })?.[0];

  console.log(clientDetails?.userAssesmentScore / 33);

  const score = clientDetails?.userAssesmentScore || 0;
  return (
    <>
      <div
        style={{
          width: "200px",
          marginLeft: "auto",
        }}
      >
        <CountryDropdownDash
          option={
            clientDetails?.transactionVolumeByCurrency?.map((item) => {
              return {
                label: item?.currency,
                value: item?.currency,
                ...item,
              };
            }) || []
          }
          onChange={(e) => {
            setSelected(e);
            console.log(e);
          }}
        />
      </div>
      <DetailsStyle>
        <div className="gauge">
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              fontSize: "18px",
              margin: "auto",
            }}
          >
            <div>Customer Risk Chart</div>
            <div
              style={{
                color: "#417CD4",
                cursor: "pointer",
              }}
              onClick={() => {
                setViewRisk(true);
              }}
            >
              View Risk Analysis
            </div>
          </div>
          <GaugeChart
            id="gauge-chart3"
            nrOfLevels={3}
            colors={["#37ffa8", "#FFC371", "#EA4228"]}
            style={{ width: "100%" }}
            textColor="#000"
            percent={score / 33}
          />
          <div
            style={{
              fontSize: "32px",
              transform: "translateY(-70px)",
              color: "#FDA333",
              textTransform: "uppercase",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {score} / 33
            <br />
            {clientDetails?.userRiskLevel}
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div className="box_bank">
            <div className="box_bank_card">
              <div className="box_data">Roll Over 1 month</div>
              <div className="box_data">{newSelected?.lastThirtyDays}</div>
            </div>
            <div className="box_bank_card">
              <div className="box_data">{newSelected?.lastThirtyDays}</div>

              <div className="box_data">{clientDetails?.beneficiaryName}</div>
            </div>
            <div className="box_bank_card">
              <div>Account Number</div>
              <div className="box_data">
                {clientDetails?.beneficiaryBank?.accountNumber}
              </div>
            </div>
            <div className="box_bank_card">
              <div>Total amount you will be paying</div>
              <div className="box_data">
                <AmountFormatter
                  currency={clientDetails?.fromCurrency?.code}
                  value={clientDetails?.rate?.data?.totalAmountToPay || 0}
                />
              </div>
            </div>
          </div>

          <div className="box_bank">
            <div className="box_bank_card">
              <div className="box_data">Roll Over 2 months</div>
              <div className="box_data">{newSelected?.lastSixtyDays}</div>
            </div>
            <div className="box_bank_card">
              <div className="box_data">{newSelected?.lastSixtyDays}</div>

              <div className="box_data">{clientDetails?.beneficiaryName}</div>
            </div>
            <div className="box_bank_card">
              <div>Account Number</div>
              <div className="box_data">
                {clientDetails?.beneficiaryBank?.accountNumber}
              </div>
            </div>
            <div className="box_bank_card">
              <div>Total amount you will be paying</div>
              <div className="box_data">
                <AmountFormatter
                  currency={clientDetails?.fromCurrency?.code}
                  value={clientDetails?.rate?.data?.totalAmountToPay || 0}
                />
              </div>
            </div>
          </div>

          <div className="box_bank">
            <div className="box_bank_card">
              <div className="box_data">Roll Over 3 months</div>
              <div className="box_data">{newSelected?.lastNinetyDays}</div>
            </div>
            <div className="box_bank_card">
              <div className="box_data">{newSelected?.lastNinetyDays}</div>

              <div className="box_data">{clientDetails?.beneficiaryName}</div>
            </div>
            <div className="box_bank_card">
              <div>Account Number</div>
              <div className="box_data">
                {clientDetails?.beneficiaryBank?.accountNumber}
              </div>
            </div>
            <div className="box_bank_card">
              <div>Total amount you will be paying</div>
              <div className="box_data">
                <AmountFormatter
                  currency={clientDetails?.fromCurrency?.code}
                  value={clientDetails?.rate?.data?.totalAmountToPay || 0}
                />
              </div>
            </div>
          </div>

          <div className="box_bank">
            <div className="box_bank_card">
              <div className="box_data">Roll Over 4 months</div>
              <div className="box_data">{newSelected?.lastNinetyDays}</div>
            </div>
            <div className="box_bank_card">
              <div className="box_data">{newSelected?.lastNinetyDays}</div>

              <div className="box_data">{clientDetails?.beneficiaryName}</div>
            </div>
            <div className="box_bank_card">
              <div>Account Number</div>
              <div className="box_data">
                {clientDetails?.beneficiaryBank?.accountNumber}
              </div>
            </div>
            <div className="box_bank_card">
              <div>Total amount you will be paying</div>
              <div className="box_data">
                <AmountFormatter
                  currency={clientDetails?.fromCurrency?.code}
                  value={clientDetails?.rate?.data?.totalAmountToPay || 0}
                />
              </div>
            </div>
          </div>
        </div>
      </DetailsStyle>
    </>
  );
}

const DetailsStyle = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  grid-gap: 20px;
  margin-top: 20px;
  .gauge {
    border-radius: 14px;
    border: 1px solid #c7c7c7;
    display: grid;
    place-items: center;
  }
  .box_bank {
    border: 1px solid #c7c7c7;
    width: 100%;
    border-radius: 14px;
    padding: 20px 0px;
    display: grid;
    margin-bottom: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .box_bank_card {
      border-right: 1px solid #c7c7c7;
      padding: 0 26px;
      .box_data {
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .box_bank_card:last-child {
      border-right: none;
    }
  }
`;
