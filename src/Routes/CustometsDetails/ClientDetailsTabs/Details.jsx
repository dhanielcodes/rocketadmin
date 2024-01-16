import React, { useState } from "react";
import styled from "styled-components";
import AppInput from "../../../reuseables/AppInput";
import AmountFormatter from "../../../reuseables/AmountFormatter";
import CountryDropdownDash from "../../../reuseables/CountryDropdownDash";

export default function Details({ clientDetails }) {
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
        <div></div>
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
  grid-template-columns: 1fr 2fr;
  margin-top: 20px;
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
