import BodyLayout from "../reuseables/BodyLayout";
import styled from "styled-components";
import AmountFormatter from "../reuseables/AmountFormatter";

export default function TransferDetailsPage() {
  const payload = JSON.parse(localStorage.getItem("transDetails"));
  const beneficiary = JSON.parse(localStorage.getItem("userBene"));

  console.log(payload, "userd");
  return (
    <>
      <BodyLayout>
        <Header>
          <div className="content">
            <div className="heading">
              Transaction Details - {payload?.paymentRef}
            </div>
          </div>
        </Header>
        <Content>
          <div className="tablecontent">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div>
                <div className="top_tips">
                  Sender Name - <b>{payload?.senderAgent}</b>{" "}
                </div>
                <div className="top_tips">
                  Sender User Id - <b>{payload?.userId}</b>
                </div>
                <div className="top_tips">
                  Transaction Source - <b> {payload?.transactionSource}</b>
                </div>
              </div>
              <div>
                <div className="top_tips">
                  Sender Address - <b>{payload?.senderAddress}</b>{" "}
                </div>
                <div className="top_tips">
                  Sender Country - <b>{payload?.senderCountry}</b>
                </div>
                <div className="top_tips">
                  Payment Date - <b> {payload?.paymentDate}</b>
                </div>
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
                gridTemplateColumns: "1fr 1fr",
                gridGap: "40px",
              }}
            >
              <div className="box">
                <div className="inner_box">
                  <div className="inner_box_text">
                    Amount Sent in {payload?.senderCurrency}
                  </div>
                  <div>
                    <AmountFormatter
                      currency={payload?.senderCurrency}
                      value={payload?.paymentAmount || 0}
                    />
                  </div>
                </div>
                <div className="inner_box">
                  <div className="inner_box_text">Exchange Rate</div>
                  <div>
                    {" "}
                    <AmountFormatter
                      currency={payload?.beneficiaryCurrency}
                      value={payload?.rate || 0}
                    />
                  </div>
                </div>
                <div className="inner_box">
                  <div className="inner_box_text">
                    Amount in Foreign Currency
                  </div>
                  <div>
                    <AmountFormatter
                      currency={payload?.beneficiaryCurrency}
                      value={payload?.receivedAmount || 0}
                    />
                  </div>
                </div>
                <div className="inner_box">
                  <div className="inner_box_text">
                    Transfer Fees in {payload?.senderCurrency}
                  </div>
                  <div>
                    <AmountFormatter
                      currency={payload?.senderCurrency}
                      value={payload?.transitionFee || 0}
                    />
                  </div>
                </div>
                <div className="inner_box">
                  <div className="inner_box_text">Beneficiary Id</div>
                  <div>{payload?.beneficiaryId}</div>
                </div>
              </div>
              <div className="box">
                <div className="inner_box">
                  <div className="inner_box_text">Payment Type</div>
                  <div>{payload?.paymentType}</div>
                </div>
                <div className="inner_box">
                  <div className="inner_box_text">Collection Type</div>
                  <div>{payload?.collectionType}</div>
                </div>
                <div className="inner_box">
                  <div className="inner_box_text">Payment Status</div>
                  <div
                    style={{
                      padding: "6px 14px",
                      borderRadius: "7px",
                      background:
                        payload?.paymentStatus === "Deposited"
                          ? "#37d744"
                          : payload?.paymentStatus === "Pending"
                          ? "#ffe063"
                          : "#ff6363",
                      color: "white",
                      width: "fit-content",
                      fontWeight: "700",
                    }}
                  >
                    {payload?.paymentStatus}
                  </div>{" "}
                </div>
                <div className="inner_box">
                  <div className="inner_box_text">Collection Status</div>
                  <div
                    style={{
                      padding: "6px 14px",
                      borderRadius: "7px",
                      background:
                        payload?.collectStatus === "Deposited"
                          ? "#37d744"
                          : payload?.collectStatus === "Pending"
                          ? "#ffe063"
                          : "#ff6363",
                      color: "white",
                      width: "fit-content",
                      fontWeight: "700",
                    }}
                  >
                    {payload?.collectStatus}
                  </div>{" "}
                </div>
                <div className="inner_box">
                  <div className="inner_box_text">Note</div>
                  <div>{payload?.transactionNote}</div>
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
                <div>Account Name</div>
                <div className="box_data">{payload?.beneficiaryName}</div>
              </div>

              <div className="box_bank_card">
                <div>Total amount payed</div>
                <div className="box_data">
                  <AmountFormatter
                    currency={payload?.senderCurrency}
                    value={payload?.paymentAmount + payload?.transitionFee || 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </Content>
      </BodyLayout>
    </>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .content {
    margin-bottom: 40px;
  }
  .content .heading {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 10px;
  }
  .content .sub {
    font-size: 14px;
    color: #848d87;
  }
  .content button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 7rem;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    cursor: pointer;
  }
`;

const Content = styled.div`
  .tablecontent {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 10px;

    padding: 20px;
  }

  .top_tips {
    font-size: 18px;
    margin-bottom: 20px;
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
    grid-template-columns: 1fr 1fr;
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
