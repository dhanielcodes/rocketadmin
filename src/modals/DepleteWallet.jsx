import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  createRate,
  fundWallet,
  updateSpecialRate,
} from "../services/PayoutDashboard";
import AppModal from "../COMPONENTS/AppModal";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { getCurrencies } from "../services/Auth";
import AppInput from "../reuseables/AppInput";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";
import AppSelect from "../reuseables/AppSelect";
import { GetDetails, GetUserDetails, getRoleMeta } from "../services/Dashboard";
import CountryListAgent from "../reuseables/CountryListAgent";
import AmountFormatter from "../reuseables/AmountFormatter";
import InputNumber from "rc-input-number";

export default function DepleteWallet({
  rateItem,
  modal,
  setRateItem,
  setModal,
  walletId,
  recall,
}) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const {
    data: customer,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["GetUserDetailsdd"],
    queryFn: () => GetUserDetails(rateItem?.userId),
  });

  const customerDetails = customer?.data || {};

  const [rate, setRate] = useState();
  const [rateMeta, setRateMeta] = useState();
  const [fee, setFee] = useState();
  const [send, setSend] = useState();
  const [receive, setReceive] = useState();

  console.log(rateItem, "rateItem");
  const [selectedCountry, setSelectedCountry] = useState();

  const handleRates = (e) => {
    setSelectedCountry(e);
    setRate(e?.currencyRate?.conversionRate);
    setFee(e?.currencyRate?.charge);
    console.log(e, "kdksdsdsd");
  };

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: fundWallet,
    onSuccess: (data) => {
      setRateItem();
      console.log(data);
      if (data?.status) {
        toast.success(data?.message);
        setModal(false);
        setRateMeta();
        setRate();
        setFee();
        setSend();
        setReceive();
        recall();
        setSelectedCountry();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);
      //toast.error("Rate Request wasn't created");

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const { data: newOptions } = useQuery({
    queryKey: [0],
    queryFn: GetDetails,
    onSuccess: (data) => {
      //setCountries(data?.data);
    },
    // refetchInterval: 10000, // fetch data every 10 seconds
    onError: (err) => {
      //   setMessage(err.response.data.detail || err.message);
      //   setOpen(true);
      console.log(err);
    },
  });

  const { data: rateMetas } = useQuery({
    queryKey: ["getRoleMeta"],
    queryFn: () => getRoleMeta("basic"),
  });

  console.log(rateMetas?.data);
  return (
    <div
      style={{
        opacity: modal ? "1" : "0",
        pointerEvents: modal ? "all" : "none",
      }}
    >
      {modal && (
        <AppModal
          closeModal={() => {
            setModal(false);
            setRateMeta();
            setRate();
            setSend();
            setReceive();
            setSelectedCountry();
            setRateItem();
          }}
          maxWidth="500px"
          heading={`Deplete ${walletId?.name || ""} Wallet `}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr ",
              gridGap: "20px",
            }}
          >
            {walletId ? (
              ""
            ) : (
              <div className="name" style={{}}>
                <label>Currency</label>
                <CountryListAgent
                  optionsNew={customerDetails?.wallet}
                  formatter={(country) => (
                    <div
                      style={{
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <ReactCountryFlag
                        className="flag"
                        countryCode={country?.currency?.code?.slice(0, 2)}
                        svg
                      />{" "}
                      &nbsp; &nbsp;
                      {country?.currency?.code}
                      &nbsp; (
                      <AmountFormatter
                        currency={country?.currency?.code}
                        value={country?.balance}
                      />
                      )
                    </div>
                  )}
                  value={selectedCountry}
                  setValue={setSelectedCountry}
                  onChange={handleRates}
                />
              </div>
            )}
            <div
              className="name"
              style={{
                width: "100%",
              }}
            >
              <label>Amount</label>
              <Container>
                <InputNumber
                  className="input"
                  placeholder="Enter Amount"
                  style={{
                    borderSize: "0.5px",
                    fontSize: "15px",
                    borderRadius: "8px",
                    border: "1px solid #939393",
                    background: "#ffffff",
                    color: "#000000",
                  }}
                  onChange={(e) => {
                    setRate(e);
                  }}
                  formatter={(value) => {
                    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }}
                />
              </Container>
            </div>
            <div
              className="name"
              style={{
                width: "100%",
              }}
            >
              <label>Note</label>
              <AppInput
                placeholder="note"
                type="text"
                onChange={(e) => {
                  setFee(e.target.value);
                }}
                width="95%"
                name="username"
                //value={selectedCountry?.charge}
                defaultValue={walletId?.name || selectedCountry?.name}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gridGap: "10px",
              marginTop: "30px",
            }}
          >
            <div></div>
            <div></div>
            <div></div>
            <button
              onClick={() => {
                setModal(false);
                setSelectedCountry();
                setRateMeta();
                setRate();
                setSend();
                setReceive();
              }}
              className="cancel"
            >
              {" "}
              <span>Cancel</span>
            </button>
            <button
              onClick={() => {
                mutate({
                  adminId: 0,
                  userId: rateItem?.userId,
                  userWallet: {
                    walletId: walletId?.walletId || selectedCountry?.walletId,
                    balance: -Number(rate),
                    note: walletId?.name || fee,
                  },
                });
              }}
              className="confirm"
            >
              {" "}
              <span>{mutateLoading ? "depleting..." : "Deplete"}</span>
            </button>
          </div>
        </AppModal>
      )}
    </div>
  );
}

const Container = styled.div`
  .rc-input-number-input {
    background: #fff;
    border: none;
    color: black;
    width: 95%;
    border-radius: 8px;
    padding: 12px;
  }
`;
