import { useState } from "react";
import styled from "styled-components";
import AmountFormatter from "../../../reuseables/AmountFormatter";
import CountryDropdownDash from "../../../reuseables/CountryDropdownDash";
import GaugeChart from "react-gauge-chart";
import moment from "moment";

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

  const day = new Date();
  const today = new Date().setDate(day.getDate());
  const last30Day = new Date().setDate(day.getDate() - 30);
  const last60Day = new Date().setDate(day.getDate() - 60);
  const last90Day = new Date().setDate(day.getDate() - 90);
  const last120Day = new Date().setDate(day.getDate() - 120);
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
            style={{
              width: "100%",
              height: "100%",
              transform: "translateY(100px)",
            }}
            textColor="#000"
            percent={score / 33}
          />
          <div
            style={{
              fontSize: "32px",
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
              <br />
              <div className="">From: {moment(today).format("DD-MM-YYYY")}</div>
              <div className="">
                To: {moment(last30Day).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">
                <AmountFormatter
                  value={newSelected?.lastThirtyDays}
                  currency={newSelected?.currency}
                />
              </div>
              <div className="">
                (Fees:{" "}
                <AmountFormatter
                  value={newSelected?.lastThirtyDaysTransitionFee}
                  currency={newSelected?.currency}
                />{" "}
                )
              </div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">{newSelected?.lastThirtyDaysCount}</div>
              <div>Transfer count</div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">{newSelected?.lastThirtyDaysCount}</div>
              <div>Average Transaction Value</div>
            </div>
          </div>

          <div className="box_bank">
            <div className="box_bank_card">
              <div className="box_data">Roll Over 2 month</div>
              <br />
              <div className="">From: {moment(today).format("DD-MM-YYYY")}</div>
              <div className="">
                To: {moment(last60Day).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">
                <AmountFormatter
                  value={newSelected?.lastSixtyDays}
                  currency={newSelected?.currency}
                />
              </div>
              <div className="">
                (Fees:{" "}
                <AmountFormatter
                  value={newSelected?.lastSixtyDaysTransitionFee}
                  currency={newSelected?.currency}
                />{" "}
                )
              </div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">{newSelected?.lastSixtyDaysCount}</div>
              <div>Transfer count</div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">{newSelected?.lastSixtyDaysCount}</div>
              <div>Average Transaction Value</div>
            </div>
          </div>

          <div className="box_bank">
            <div className="box_bank_card">
              <div className="box_data">Roll Over 3 month</div>
              <br />
              <div className="">From: {moment(today).format("DD-MM-YYYY")}</div>
              <div className="">
                To: {moment(last90Day).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">
                <AmountFormatter
                  value={newSelected?.lastNinetyDays}
                  currency={newSelected?.currency}
                />
              </div>
              <div className="">
                (Fees:{" "}
                <AmountFormatter
                  value={newSelected?.lastNinetyDaysTransitionFee}
                  currency={newSelected?.currency}
                />{" "}
                )
              </div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">{newSelected?.lastNinetyDaysCount}</div>
              <div>Transfer count</div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">{newSelected?.lastNinetyDaysCount}</div>
              <div>Average Transaction Value</div>
            </div>
          </div>

          <div className="box_bank">
            <div className="box_bank_card">
              <div className="box_data">Roll Over 4 month</div>
              <br />
              <div className="">From: {moment(today).format("DD-MM-YYYY")}</div>
              <div className="">
                To: {moment(last120Day).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">
                <AmountFormatter
                  value={newSelected?.lastOneTwentyDays}
                  currency={newSelected?.currency}
                />
              </div>
              <div className="">
                (Fees:{" "}
                <AmountFormatter
                  value={newSelected?.lastOneTwentyDaysTransitionFee}
                  currency={newSelected?.currency}
                />{" "}
                )
              </div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">
                {newSelected?.lastOneTwentyDaysCount}
              </div>
              <div>Transfer count</div>
            </div>
            <div className="box_bank_card two">
              <div className="box_data">
                {newSelected?.lastOneTwentyDaysCount}
              </div>
              <div>Average Transaction Value</div>
            </div>
          </div>
        </div>
      </DetailsStyle>
      <Boxx className="box_bank">
        <h2>Lifetime Summary</h2>
        <div className="box_bank">
          <div className="box_bank_card two">
            <div className="box_data">
              <AmountFormatter
                value={
                  newSelected?.pendingAmount +
                  newSelected?.processedAmount +
                  newSelected?.depositedAmount +
                  newSelected?.failedAmount +
                  newSelected?.cancelledAmount
                }
                currency={newSelected?.currency}
              />
            </div>
            <div className="">
              (Fees:{" "}
              <AmountFormatter value={0} currency={newSelected?.currency} /> )
            </div>
          </div>
          <div className="box_bank_card two">
            <div className="box_data">{newSelected?.lastSixtyDaysCount}</div>
            <div>Transfer count</div>
          </div>
          <div className="box_bank_card two">
            <div className="box_data">
              {newSelected?.pending +
                newSelected?.processed +
                newSelected?.deposited +
                newSelected?.failed +
                newSelected?.cancelled}
            </div>
            <div>Average Transaction Value</div>
          </div>
        </div>
      </Boxx>
    </>
  );
}

const DetailsStyle = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2.5fr;
  grid-gap: 20px;
  margin-top: 20px;
  .gauge {
    border-radius: 14px;
    border: 1px solid #c7c7c7;
    display: grid;
    place-items: center;
    height: 600px;
  }
  .box_bank {
    border: 1px solid #c7c7c7;
    width: 100%;
    border-radius: 14px;
    padding: 20px 0px;
    display: grid;
    margin-bottom: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .box_bank_card.two {
      text-align: center;
    }
    .box_bank_card {
      border-right: 1px solid #c7c7c7;
      padding: 0 20px;
      .box_data {
        font-size: 18px;
        font-weight: 600;
        margin-top: 10px;
      }
    }
    .box_bank_card:last-child {
      border-right: none;
    }
  }
`;

const Boxx = styled.div`
  margin-top: 20px;
  border: 1px solid #c7c7c7;
  width: 100%;
  border-radius: 14px;
  padding: 20px;
  display: grid;
  margin-bottom: 10px;
  .box_bank {
    border: 1px solid #c7c7c7;
    width: 100%;
    border-radius: 14px;
    padding: 20px 0px;
    display: grid;
    margin-bottom: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    .box_bank_card.two {
      text-align: center;
    }
    .box_bank_card {
      border-right: 1px solid #c7c7c7;
      padding: 0 20px;
      .box_data {
        font-size: 18px;
        font-weight: 600;
        margin-top: 10px;
      }
    }
    .box_bank_card:last-child {
      border-right: none;
    }
  }
`;
