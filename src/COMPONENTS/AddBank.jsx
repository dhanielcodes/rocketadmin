import React, { useState, useEffect } from "react";
import AppInput from "../reuseables/AppInput";
import Modal from "../reuseables/Modal";
import { styled } from "styled-components";
import AppButton from "../reuseables/AppButton";
import { AiOutlineDown } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { sendAgentInvite } from "../services/Dashboard";
import toast from "react-hot-toast";
function AddBank({ closeinviteAgent }) {
  const [firstName, setFirstname] = useState();
  const [surName, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [postcode, setPostcode] = useState();
  const [employmentStatusId, setEmploymentStatusId] = useState();
  const [professionId, setProfessionId] = useState();
  const [companyName, setCompanyName] = useState();
  const [onboardingSource, setOnboardingSource] = useState();
  const [agentInvite, setAgentInvite] = useState();

  const [sendInvite, setSendInvite] = useState({
    firstName: "",
    email: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setSendInvite((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(sendInvite);
  };

  async function AgentInvitationHandler() {
    if (sendInvite?.firstName && sendInvite?.email) {
      mutate(sendInvite);
    } else {
      toast.error("Fill all fields");
    }
  }

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: sendAgentInvite,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
      closeinviteAgent(false);
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return (
    <Content>
      <Modal title="Add Bank" onClick={() => closeinviteAgent(false)}>
        <div className="flexout">
          <div className="name">
            <label>Bank Name</label>
            <AppInput
              type="text"
              width="95%"
              name="bankName"
              onChange={handleOnChange}
            />
          </div>

          <div className="name">
            <label>Bank Code</label>
            <AppInput
              width="95%"
              type="text"
              name="bankCode"
              onChange={handleOnChange}
            />
          </div>

          <div className="name">
            <label>BIC/CBN Code</label>
            <AppInput
              width="95%"
              type="text"
              name="code2"
              onChange={handleOnChange}
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
            placeholder={isLoading ? "Sending Invite..." : "Invite Agent"}
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

export default AddBank;
const Content = styled.div`
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
