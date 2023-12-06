import React, { useState, useEffect } from "react";
import AppInput from "../reuseables/AppInput";
import Modal from "../reuseables/Modal";
import { styled } from "styled-components";
import AppButton from "../reuseables/AppButton";
import { AiOutlineDown } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Paymentchannel,
  Payoutchannel,
  addPayoutProcessor,
  sendAgentInvite,
} from "../services/Dashboard";
import toast from "react-hot-toast";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { countries } from "../../config/Test";
import {
  getPaymentProviders,
  getPayoutProviders,
} from "../services/PayoutDashboard";
import GatewayDropdown from "../reuseables/GatewayDropdown";
function AddPayoutProcessorModal({ closeinviteAgent }) {
  const { data: paymentChannels } = useQuery({
    queryKey: ["paymentChannels"],
    queryFn: () => Payoutchannel(),
  });

  const { data: paymentP } = useQuery({
    queryKey: ["paymentP"],
    queryFn: () => getPayoutProviders(),
  });

  const [selectedCountry, setSelectedCountry] = useState();
  const [payout, setPayout] = useState();
  const [payment, setPayment] = useState();

  const [processor, setProcessor] = useState({
    name: "",
    description: "",
    currency: {
      id: selectedCountry?.id,
    },
    payoutChannel: {
      id: payment?.id,
    },
    payoutProvider: {
      id: payout?.id,
    },
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setProcessor((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(processor);
  };

  async function AppPayoutProcessor() {
    if (
      processor?.name &&
      processor?.description &&
      processor?.currency?.id &&
      processor?.payoutChannel?.id &&
      processor?.payoutProvider?.id
    ) {
      mutate(processor);
    } else {
      toast.error("Fill all fields");
    }
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: addPayoutProcessor,
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

  console.log(processor);
  return (
    <Content>
      <Modal
        title="Add Payout Processor"
        onClick={() => closeinviteAgent(false)}
      >
        <div className="flexout">
          <div className="name">
            <label>Name</label>
            <AppInput
              placeholder="Enter name"
              type="text"
              width="95%"
              name="name"
              onChange={handleOnChange}
            />
          </div>

          <div className="name">
            <label>Description</label>
            <AppInput
              placeholder="Enter description"
              width="95%"
              type="text"
              name="description"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div
          className="name"
          style={{
            marginTop: "20px",
          }}
        >
          <label>Country</label>
          <CountryDropdown2
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e);
              setProcessor({
                ...processor,
                currency: {
                  id: e?.id,
                },
              });
            }}
          />
        </div>
        <div className="name">
          <label>Payout Channel</label>

          <GatewayDropdown
            value={payment}
            options={paymentChannels?.data?.map((item) => {
              return {
                ...item,
                name: `${item?.name} - [${item?.description || "--"}]`,
                value: `${item?.name} - [${item?.description || "--"}]`,
              };
            })}
            onChange={(e) => {
              setPayment(e);
              setProcessor({
                ...processor,
                payoutChannel: {
                  id: e?.id,
                },
              });
            }}
          />
        </div>
        <div className="name">
          <label>Provider</label>
          <GatewayDropdown
            value={payout}
            options={paymentP?.data?.map((item) => {
              return {
                ...item,
                name: `${item?.name} - [${item?.description || "--"}]`,
                value: `${item?.name} - [${item?.description || "--"}]`,
              };
            })}
            onChange={(e) => {
              setPayout(e);
              setProcessor({
                ...processor,
                payoutProvider: {
                  id: e?.id,
                },
              });
            }}
          />
        </div>
        <div className="btn">
          <AppButton
            placeholder="Cancel"
            style={{
              backgroundColor: "transparent",
              border: "1px solid gainsboro",
            }}
            onClick={() => closeinviteAgent(false)}
          />
          <AppButton
            placeholder={isLoading ? "adding processor..." : "Add Processor"}
            disabled={isLoading}
            style={{
              backgroundColor: "#00A85A",
              color: "white",
              border: "1px solid #00A85A",
            }}
            onClick={AppPayoutProcessor}
          />
        </div>
      </Modal>
    </Content>
  );
}

export default AddPayoutProcessorModal;
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
