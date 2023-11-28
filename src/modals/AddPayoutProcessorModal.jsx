import React, { useState, useEffect } from "react";
import AppInput from "../reuseables/AppInput";
import Modal from "../reuseables/Modal";
import { styled } from "styled-components";
import AppButton from "../reuseables/AppButton";
import { AiOutlineDown } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addPayoutProcessor, sendAgentInvite } from "../services/Dashboard";
import toast from "react-hot-toast";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { countries } from "../../config/Test";
import {
  getPaymentProviders,
  getPayoutProviders,
} from "../services/PayoutDashboard";
import GatewayDropdown from "../reuseables/GatewayDropdown";
function AddPayoutProcessorModal({ closeinviteAgent }) {
  const { data: providersP } = useQuery({
    queryKey: ["providersP"],
    queryFn: () => getPayoutProviders(),
  });

  const { data: paymentP } = useQuery({
    queryKey: ["paymentP"],
    queryFn: () => getPaymentProviders(),
  });

  const [selectedCountry, setSelectedCountry] = useState();
  const [payout, setPayout] = useState();
  const [payment, setPayment] = useState();

  const [processor, setProcessor] = useState({
    name: "",
    description: "",
    country: {
      id: selectedCountry?.id,
    },
    paymentChannel: {
      id: payment?.id,
    },
    paymentProvider: {
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
      processor?.country?.id &&
      processor?.paymentChannel?.id &&
      processor?.paymentProvider?.id
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
        toast.success(data?.message);
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
            option={
              countries?.data?.map((item) => {
                return {
                  label: item?.name + " - " + item?.currencyCode,
                  value: item?.name,
                  ...item,
                };
              }) || []
            }
            onChange={(e) => {
              setSelectedCountry(e);
              setProcessor({
                ...processor,
                country: {
                  id: e?.id,
                },
              });
            }}
          />
        </div>
        <div className="name">
          <label>Payout Channel</label>
          <GatewayDropdown
            value={payout}
            options={paymentP?.data?.map((item) => {
              return {
                ...item,
                name: `${item?.name} - [${item?.paymentProviderSupportedCurrency[0]?.currencyCode}]`,
                value: `${item?.name} - [${item?.paymentProviderSupportedCurrency[0]?.currencyCode}]`,
              };
            })}
            onChange={(e) => {
              setPayment(e);
              setProcessor({
                ...processor,
                paymentChannel: {
                  id: e?.id,
                },
              });
            }}
          />
        </div>
        <div className="name">
          <label>Provider Channel</label>
          <GatewayDropdown
            value={payout}
            options={providersP?.data?.map((item) => {
              return {
                ...item,
                name: `${item?.name} - [${
                  item?.payOutProviderSupportedCurrency[0]?.currencyCode || "--"
                }]`,
                value: `${item?.name} - [${
                  item?.payOutProviderSupportedCurrency[0]?.currencyCode || "--"
                }]`,
              };
            })}
            onChange={(e) => {
              setPayout(e);
              setProcessor({
                ...processor,
                paymentProvider: {
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
