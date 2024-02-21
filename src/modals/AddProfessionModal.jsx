import React, { useState, useEffect } from "react";
import AppInput from "../reuseables/AppInput";
import Modal from "../reuseables/Modal";
import { styled } from "styled-components";
import AppButton from "../reuseables/AppButton";
import { AiOutlineDown } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Paymentchannel,
  addPaymentProcessor,
  getRisks,
  sendAgentInvite,
  updatePayoutProvider,
} from "../services/Dashboard";
import toast from "react-hot-toast";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { countries } from "../../config/Test";
import {
  getPaymentProviders,
  getPayoutProviders,
} from "../services/PayoutDashboard";
import GatewayDropdown from "../reuseables/GatewayDropdown";
import ReactCountryFlag from "react-country-flag";
import { countryObjectsArray } from "../../config/CountryCodes";
import Select from "react-select";

function AddProfessionModal({ closeinviteAgent, item }) {
  console.log(item?.payOutProviderSupportedCurrency);

  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [riskLevel, setRiskLevel] = useState();

  async function UpdateProvider() {
    mutate({
      id: 1,
      name: "accountant",
      status: "Active",
      riskLevel: {
        id: 2,
      },
    });
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: updatePayoutProvider,
    onSuccess: (data) => {
      if (data.status) {
        console.log(data);
        toast.success(data?.message);
        closeinviteAgent(false);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return (
    <Content>
      <Modal title="Add New Profession" onClick={() => closeinviteAgent(false)}>
        <div className="name" style={{}}>
          <label>Profession</label>
          <AppInput
            placeholder=""
            type="text"
            width="95%"
            name="username"
            //defaultValue={charge?.baseValue}
          />
        </div>
        <div className="name" style={{}}>
          <label>Status</label>
          <Select
            options={[{ label: "Hello", value: "hi" }]}
            placeholder="Please select status"
          />
        </div>
        <div className="name" style={{}}>
          <label>Risk Level</label>
          <Select
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            placeholder="Please select status"
          />
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
            placeholder={isLoading ? "updating provider..." : "Update Provider"}
            disabled={isLoading}
            style={{
              backgroundColor: "#00A85A",
              color: "white",
              border: "1px solid #00A85A",
            }}
            onClick={UpdateProvider}
          />
        </div>
      </Modal>
    </Content>
  );
}

export default AddProfessionModal;
const Content = styled.div`
  .css-13cymwt-control {
    border-radius: 8px;
    padding: 3px;
  }
  .flexout {
    display: grid;
    /* grid-template-columns: repeat(2, auto); */
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
`;
