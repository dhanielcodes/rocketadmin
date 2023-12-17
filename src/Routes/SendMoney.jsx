import React, { useState, useEffect } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SearchInput from "../reuseables/SearchInput";
import BeneficiaryComponent from "../COMPONENTS/BeneficiaryComponent";
import SendMoneyCustomersTableList from "./SendMoney/SendMoneyCustomersTableList";
import SelectBeneficiary from "./SendMoney/SelectBeneficiary";
import SendDetails from "./SendMoney/SendDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
function SendMoney() {
  const [selectSender, setSelectSender] = useState(true);
  const [beneficiary, setBeneficiary] = useState();
  const [sendmoney, setSendMoney] = useState();
  const [reviewTransfer, setReviewTransfer] = useState();
  const [userSelected, setUserSelected] = useState("");
  const [params] = useSearchParams();

  const [step, setStep] = useState(Number(params.get("step")) || 1);

  const [Noteinfo, setNoteinfo] = useState(true);
  const navigate = useNavigate();

  const [active, setActive] = useState("");

  //   Component useState
  const [beneficiaryComponent, setBeneficiaryComponent] = useState(false);
  return (
    <BodyLayout>
      {beneficiaryComponent && (
        <BeneficiaryComponent
          closeBeneficiaryComponent={setBeneficiaryComponent}
        />
      )}
      {beneficiaryComponent ? (
        ""
      ) : (
        <Content>
          <div className="top">
            <p>Send Money</p>
            <span>
              This page let's you send money to customer beneficiaries
            </span>
          </div>

          <div className="main">
            {step === 1 && (
              <SendMoneyCustomersTableList
                setStep={setStep}
                setUserSelected={setUserSelected}
                userSelected={userSelected}
              />
            )}
            {params.get("step") === "2" && (
              <SelectBeneficiary active={active} setActive={setActive} />
            )}
            {params.get("step") === "3" && <SendDetails />}
          </div>
          <div
            style={{
              display: "grid",
              width: "28%",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "10px",
              marginTop: "30px",
              marginLeft: "auto",
              paddingBottom: "20px",
              paddingRight: "20px",
            }}
          >
            {step === 1 ? (
              <div></div>
            ) : (
              <button
                onClick={() => {
                  setStep((prev) => prev - 1);
                }}
                className="cancel"
              >
                {" "}
                <span>Previous</span>
              </button>
            )}

            {step === 1 ? (
              ""
            ) : (
              <button
                onClick={() => {
                  setStep((prev) => prev + 1);
                  if (step === 1) {
                    navigate(`/sendmoney?id=${params.get("id")}&step=${2}`);
                  }
                  if (step === 2) {
                    navigate(
                      `/sendmoney?id=${params.get(
                        "id"
                      )}&beneficiary=${JSON.stringify(active)}&step=${3}`
                    );
                  }
                  if (step === 3) {
                    navigate(
                      `/sendmoney?id=${params.get(
                        "id"
                      )}&beneficiary=${JSON.stringify(active)}&step=${4}`
                    );
                  }
                }}
                className="confirm"
              >
                {" "}
                <span>Continue</span>
              </button>
            )}
          </div>
        </Content>
      )}
    </BodyLayout>
  );
}

export default SendMoney;
const Content = styled.div`
  .top p {
    font-size: 32px;
    font-weight: 500;
  }
  .top {
    padding-bottom: 20px;
  }
  .top span {
    font-size: 15px;
    color: #848d87;
    font-weight: 400;
  }
  .btn {
    display: flex;
    gap: 10px;
  }
  .btn button {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 12px 13px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
  .info {
    background-color: #e1ebf9;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #bfd5f5;
  }
  .selection {
    padding: 40px 40px 0px 30px;
    display: flex;
    gap: 50px;
    cursor: pointer;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 20px;
  }
  .sender {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sender p {
    font-size: 17px;
    font-weight: 500;
    color: #a1a9b8;
    line-height: 48px;
  }
  .sender span {
    /* border: 8px solid #00a85a24; */
    border: 1px solid gainsboro;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    color: #a1a9b8;
    font-size: 17px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .note {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .note p {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #464f60;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .head button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .TableGrid {
    overflow: hidden;
    overflow: scroll;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100vw;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
    color: #5a6376;
    cursor: pointer;
  }
  .table span {
    font-size: 14px;
    font-weight: 400;
    color: #667085;
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 25px;
  }

  .row span {
    font-size: 15px;
    color: #687182;
  }
  .arrow {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .arrow button {
    width: 28.8px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    border-radius: 3px;
  }
  .pagins {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  .pagins p {
    font-size: 14px;
    color: #687182;
  }

  .pagins select {
    width: 48px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    padding: 2px;
    border-radius: 3px;
  }
`;
