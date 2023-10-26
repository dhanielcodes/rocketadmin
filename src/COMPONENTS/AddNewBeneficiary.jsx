import React, { useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { styled } from "styled-components";
import Appbutton from "../reuseables/Appbutton";

function AddNewBeneficiary({ closeBeneficiary }) {
  //  const handleOnChange = (e) => {
  //   const { value, name } = e.target;
  //   setSendInvite((prev) => {
  //     return { ...prev, [name]: value };
  //   });

  //   console.log(sendInvite);
  // };

  const [beneficiaryName, setBeneName] = useState();
  const [id, setID] = useState();
  const [beneficiaryPhoneNumber, setBeneficiaryPhoneNumber] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [bankId, setBankId] = useState();
  const [userId, setUserId] = useState();

  const handleBeneficiary = (e) => {
    setBeneName(e?.target?.value);
    setID(e?.target?.value);
    setBeneficiaryPhoneNumber(e?.target?.value);
    setAccountNumber(e?.target?.value);
    setBankId(e?.target?.value);
    setUserId(e?.target?.value);
  };

  async function ProceedPayment() {
    const response = await fetch(`${process.env.BASE_URL}adduserbeneficiary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        userBeneficiary: {
          country: {
            id: id,
          },
          beneficiaryName: beneficiaryName,
          beneficiaryPhoneNumber: beneficiaryPhoneNumber,
          beneficiaryBank: {
            accountNumber: accountNumber,
            bankId: bankId,
          },
        },
      }),
    });
    const server = await response.json();
    console.log(server);
  }

  return (
    <Content>
      <div className="top">
        <div className="back" onClick={() => closeBeneficiary(false)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25 12.2734L19.25 12.2734"
              stroke="#00A85A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.2998 18.299L4.2498 12.275L10.2998 6.25"
              stroke="#00A85A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Back to Send Money</span>
        </div>
        <p>Add Beneficiary</p>
        <div className="white">
          <p>Collection Details</p>

          <div className="labul">
            <label>UserID</label>
            <input
              name="beneficiaryName"
              type="text"
              placeholder="Jane Doe"
              onChange={handleBeneficiary}
            />
          </div>
          <div className="labul">
            <label>Beneficiary Name</label>
            <input
              name="beneficiaryName"
              type="text"
              placeholder="Jane Doe"
              onChange={handleBeneficiary}
            />
          </div>
          <div className="labul">
            <label>Beneficiary Number</label>
            <input
              name="beneficiaryName"
              type="text"
              placeholder="0912786333"
              onChange={handleBeneficiary}
            />
          </div>
          <div className="labul">
            <label>Beneficiary AccountNumber</label>
            <input
              name="beneficiaryName"
              type="text"
              placeholder="912786333"
              onChange={handleBeneficiary}
            />
          </div>
          <div className="labul">
            <label>BankID</label>
            <input
              name="beneficiaryName"
              type="text"
              placeholder="Bank ID"
              onChange={handleBeneficiary}
            />
          </div>
          {/* <div className="ref">
            <label>Country Name</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="ref">
            <label>Collection Type</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div> */}
        </div>
        {/* <div className="white">
          <p>Bank Details</p>
          <div className="labul">
            <label>Bank Name</label>
            <input type="text" placeholder="Jane Doe" />
          </div>
          <div className="ref">
            <label>Country Name</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="ref">
            <label>Collection Type</label>
            <div className="select">
              <select>
                <option>All</option>
              </select>
              <AiOutlineDown />
            </div>
          </div>
          <div className="btn2">
            <Appbutton
              placeholder="Cancel"
              style={{
                backgroundColor: "transparent",
                color: "#595959",
                border: "1px solid gainsboro",
              }}
            />
            <Appbutton
              placeholder="Proceed to Payment"
              style={{
                border: "none",
                backgroundColor: "#00A85A",
                color: "white",
                width: "100%",
              }}
              onClick={ProceedPayment}
            />
          </div>
        </div> */}
      </div>
    </Content>
  );
}

export default AddNewBeneficiary;

const Content = styled.div`
  .btn2 {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 20px 20px 20px 0px;
    border: none;
    gap: 10px;
  }
  /* .ref {
    display: flex;
    justify-content: space-evenly;
    padding: 0px 20px 20px 0px;
    border-bottom: 1px solid gainsboro;
  }
  .labels {
    display: flex;
    justify-content: space-evenly;
    padding: 20px 75% 20px 0px;
    border-bottom: 1px solid gainsboro;
  } */
  .labul {
    display: flex;
    justify-content: space-between;
    width: 50%;
    /* grid-template-columns: auto auto; */
  }
  .labul label {
    font-size: 15px;
    color: #344054;
    font-weight: 500;
  }
  .labul input {
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 15px;
    font-size: 15px;
    width: 50%;
  }
  .ref {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }
  .select {
    border-radius: 5px;
    display: flex;
    align-items: center;
    border: 1px solid gainsboro;
    padding-right: 20px;
    width: 51.5%;
  }
  .select select {
    appearance: none;
    border: none;
    padding: 15px;
    font-size: 15px;
    width: 100%;
    color: #344054;
  }

  /* .labels label {
    font-size: 15px;
    color: #344054;
    font-weight: 500;
  }
  .labels input {
    width: 50%;
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 15px;
    font-size: 15px;
  } */
  .back {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .top {
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
  }
  .top p {
    font-size: 32px;
    font-weight: 500;
    line-height: 28px;
    padding: 20px 0px 20px 0px;
  }
  .white {
    background-color: white;
    padding: 20px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .white p {
    font-size: 20px;
  }
`;
