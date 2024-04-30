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
function UpdatePayoutProvider({ closeinviteAgent, item }) {
  console.log(item?.payOutProviderSupportedCurrency);

  const [selectedCountry, setSelectedCountry] = useState();

  const [array, setArray] = useState(item?.payOutProviderSupportedCurrency);
  const handleRemove = (id) => {
    const newC = array.filter((item) => item !== id);

    setArray(newC);
  };
  async function UpdateProvider() {
    mutate({
      id: item?.id,
      payOutProviderSupportedCurrency: array?.map((item) => {
        return {
          id: item?.id,
        };
      }),
    });
  }

  console.log(
    array?.map((item) => {
      return {
        id: item?.id,
      };
    })
  );

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
      <Modal
        title="Update Payout Provider"
        onClick={() => closeinviteAgent(false)}
      >
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
              if (array?.map((item) => item?.id)?.includes(e?.id)) {
                return;
              } else {
                setArray([
                  ...array,
                  {
                    ...e,
                  },
                ]);
              }
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridGap: "10px",
          }}
        >
          {array?.map((item, index) => {
            return (
              <div
                style={{
                  background: "#e2e2e2",
                  borderRadius: "10px",
                  padding: "9px",
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <ReactCountryFlag
                  countryCode={item?.code?.slice(0, 2)}
                  style={{
                    marginRight: "10px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "10000000px",
                  }}
                  svg
                />
                <p>{item?.code}</p>
                <svg
                  onClick={() => {
                    handleRemove(item);
                  }}
                  width="22"
                  height="22"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <g clip-path="url(#clip0_1054_124834)">
                    <path
                      d="M11.2274 9.63609C10.788 9.19675 10.0757 9.19675 9.63637 9.63609C9.19703 10.0754 9.19703 10.7877 9.63637 11.2271L14.4093 16L9.63642 20.773C9.19708 21.2123 9.19708 21.9246 9.63642 22.364C10.0758 22.8033 10.7881 22.8033 11.2274 22.364L16.0003 17.591L20.7733 22.364C21.2126 22.8033 21.925 22.8033 22.3643 22.364C22.8036 21.9247 22.8036 21.2124 22.3643 20.773L17.5913 16L22.3643 11.227C22.8037 10.7877 22.8037 10.0754 22.3643 9.63604C21.925 9.1967 21.2127 9.1967 20.7734 9.63604L16.0003 14.4091L11.2274 9.63609Z"
                      fill="#464F60"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1054_124834">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            );
          })}
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

export default UpdatePayoutProvider;
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
