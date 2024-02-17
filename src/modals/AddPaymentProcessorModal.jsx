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
  sendAgentInvite,
  updatePaymentProcessor,
} from "../services/Dashboard";
import toast from "react-hot-toast";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { countries } from "../../config/Test";
import {
  getPaymentProviders,
  getPayoutProviders,
} from "../services/PayoutDashboard";
import GatewayDropdown from "../reuseables/GatewayDropdown";
import { Switch } from "@arco-design/web-react";
function AddPaymentProcessorModal({ closeinviteAgent, type, item, setItem }) {
  const { data: paymentChannels } = useQuery({
    queryKey: ["paymentChannels"],
    queryFn: () => Paymentchannel(),
  });

  const { data: paymentP } = useQuery({
    queryKey: ["paymentP"],
    queryFn: () => getPaymentProviders(),
  });

  const [selectedCountry, setSelectedCountry] = useState();
  const [payment, setPayment] = useState();
  const [payout, setPayout] = useState();
  const [active, setActive] = useState(false);
  const [processor, setProcessor] = useState({
    id: item?.id,
    name: "" || item?.name,
    description: "" || item?.description,
    currency: {
      id: selectedCountry?.id || item?.currency?.id,
    },
    paymentChannel: {
      id: payment?.id || item?.paymentChannel?.id,
    },
    paymentProvider: {
      id: payout?.id || item?.paymentChannel?.id,
    },
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setProcessor((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(processor);
  };

  async function AppPaymentProcessor() {
    if (
      processor?.name &&
      processor?.description &&
      processor?.currency?.id &&
      processor?.paymentChannel?.id &&
      processor?.paymentProvider?.id
    ) {
      mutate(processor);
    } else {
      toast.error("Fill all fields");
    }
  }

  const { mutate, isLoading } = useMutation({
    mutationFn:
      type === "update" ? updatePaymentProcessor : addPaymentProcessor,

    onSuccess: (data) => {
      if (data.status) {
        console.log(data);
        toast.success(data?.message);
        setItem();

        closeinviteAgent(false);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  console.log(item);
  return (
    <Content>
      <Modal
        title={
          type === "update"
            ? "Update Payment Processor"
            : "Add Payment Processor"
        }
        onClick={() => closeinviteAgent(false)}
      >
        <div className="flexout">
          {type === "update" && (
            <div
              style={{
                display: "flex",
                gridGap: "40px",
              }}
            >
              <div>Status</div>
              <Switch
                onClick={() => {
                  setActive(!active);
                }}
                checked={active || item?.status}
              />
            </div>
          )}
          <div className="name">
            <label>Name</label>
            <AppInput
              placeholder="Enter name"
              type="text"
              width="95%"
              name="name"
              onChange={handleOnChange}
              defaultValue={item?.name}
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
              defaultValue={item?.description}
            />
          </div>
        </div>
        <div
          className="name"
          style={{
            marginTop: "20px",
          }}
        >
          <label>Currency</label>
          <CountryDropdown2
            value={
              selectedCountry || {
                value: item?.currency?.name,
                label: item?.currency?.label,
                id: item?.currency?.id,
                ...item?.currency,
              }
            }
            collectionStatus
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
          <label>Payment Channel</label>

          <GatewayDropdown
            value={
              payment || {
                value: item?.paymentChannel?.name,
                label: item?.paymentChannel?.label,
                ...item?.paymentChannel,
              }
            }
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
                paymentChannel: {
                  id: e?.id,
                },
              });
            }}
          />
        </div>
        <div className="name">
          <label>Provider</label>
          <GatewayDropdown
            value={
              payout || {
                value: item?.paymentProvider?.name,
                label: item?.paymentProvider?.label,

                ...item?.paymentProvider,
              }
            }
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
            placeholder={
              isLoading
                ? "loading..."
                : type === "update"
                ? "Update Processor"
                : "Add Processor"
            }
            disabled={isLoading}
            style={{
              backgroundColor: "#00A85A",
              color: "white",
              border: "1px solid #00A85A",
            }}
            onClick={AppPaymentProcessor}
          />
        </div>
      </Modal>
    </Content>
  );
}

export default AddPaymentProcessorModal;
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
