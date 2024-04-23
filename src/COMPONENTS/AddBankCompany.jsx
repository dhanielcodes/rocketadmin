import React, { useState, useEffect } from "react";
import AppInput from "../reuseables/AppInput";
import Modal from "../reuseables/Modal";
import { styled } from "styled-components";
import AppButton from "../reuseables/AppButton";
import { AiOutlineDown } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import {
  addCompanyBank,
  editCompanyBank,
  sendAgentInvite,
} from "../services/Dashboard";
import toast from "react-hot-toast";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import ReactSelect from "react-select";
function AddBankCompany({ closeinviteAgent, item, setItem, recall }) {
  const [sendInvite, setSendInvite] = useState({
    description: "",
    currency: {
      id: "",
    },
    accountName: "",
    bankName: "",
    accountNumber: "",
    sortCode: "",
    iban: "",
    bic: "",
    branch: "",
    status: true,
    createdBy: {
      userId: 0,
    },
    lastUpdatedBy: {
      userId: 0,
    },
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setSendInvite((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(sendInvite);
  };

  async function AgentInvitationHandler() {
    mutate(sendInvite);
  }

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: item ? editCompanyBank : addCompanyBank,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
      closeinviteAgent(false);
      recall();
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  useEffect(() => {
    setSendInvite(item);
  }, [item]);

  console.log(sendInvite);

  return (
    <Content>
      <Modal
        title={item ? "Edit Company Bank" : "Add Company Bank"}
        onClick={() => {
          closeinviteAgent(false);
          setItem({
            description: "",
            currency: {
              id: "",
            },
            accountName: "",
            bankName: "",
            accountNumber: "",
            sortCode: "",
            iban: "",
            bic: "",
            branch: "",
            status: true,
            createdBy: {
              userId: 0,
            },
            lastUpdatedBy: {
              userId: 0,
            },
          });
        }}
      >
        <div className="flexout">
          <div className="name">
            <label>Company Bank Name</label>
            <AppInput
              type="text"
              width="95%"
              name="bankName"
              onChange={handleOnChange}
              defaultValue={item?.bankName}
            />
          </div>
          <div className="name">
            <label>Company Bank Description</label>
            <AppInput
              width="95%"
              type="text"
              name="description"
              onChange={handleOnChange}
              defaultValue={item?.description}
            />
          </div>

          <div className="name">
            <label>Account Name</label>
            <AppInput
              width="95%"
              type="text"
              name="accountName"
              onChange={handleOnChange}
              defaultValue={item?.accountName}
            />
          </div>
          <div className="name">
            <label>Account Number</label>
            <AppInput
              width="95%"
              type="number"
              name="accountNumber"
              onChange={handleOnChange}
              defaultValue={item?.accountNumber}
            />
          </div>
          <div className="name">
            <label>Currency Name</label>
            <CountryDropdown2
              collectionStatus
              defaultValue={{
                label: item?.currency?.name,
                value: item?.currency?.name,
                id: item?.currency?.id,
                ...item?.currency,
              }}
              onChange={(e) => {
                setSendInvite({
                  ...sendInvite,
                  currency: {
                    id: e.id,
                  },
                });
              }}
            />
          </div>

          <div className="name">
            <label>BIC/CBN Code</label>
            <AppInput
              width="95%"
              type="text"
              name="bic"
              onChange={handleOnChange}
              defaultValue={item?.bic}
            />
          </div>
          <div className="name">
            <label>Sort Code</label>
            <AppInput
              width="95%"
              type="text"
              name="sortCode"
              onChange={handleOnChange}
              defaultValue={item?.sortCode}
            />
          </div>

          <div className="name">
            <label>IBAN</label>
            <AppInput
              width="95%"
              type="text"
              name="iban"
              onChange={handleOnChange}
              defaultValue={item?.iban}
            />
          </div>
          <div className="name" style={{}}>
            <label>Status</label>
            <ReactSelect
              defaultValue={{
                label: `${JSON.stringify(item?.status)}`,
                value: item?.status,
              }}
              options={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
              onChange={(e) => {
                setSendInvite({
                  ...sendInvite,
                  status: e.value,
                });
              }}
              placeholder="Please select status"
            />
          </div>
        </div>

        <div className="btn">
          <AppButton
            placeholder="Cancel"
            style={{
              backgroundColor: "transparent",
              border: "1px solid gainsboro",
              color: "black",
            }}
            onClick={() => closeinviteAgent(false)}
          />
          <AppButton
            placeholder={
              isLoading
                ? item
                  ? "Editing Bank..."
                  : "Adding Bank..."
                : item
                ? "Edit Bank"
                : "Add Bank"
            }
            disabled={isLoading}
            style={{
              backgroundColor: "#00A85A",
              color: "white",
              border: "1px solid #00A85A",
            }}
            onClick={AgentInvitationHandler}
          />
        </div>
      </Modal>
    </Content>
  );
}

export default AddBankCompany;
const Content = styled.div`
  .flexout {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 20px;
  }
  .name {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .name label {
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    color: #344054;
  }
  .btn {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }
  .ref {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .select select {
    appearance: none;
    border: none;
    padding: 10px;
    width: 100%;
  }
  .select {
    padding-right: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid gainsboro;
  }

  .css-13cymwt-control {
    border-radius: 8px;
    padding: 3px;
  }
`;
