import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { createRate } from "../services/PayoutDashboard";
import AppModal from "../COMPONENTS/AppModal";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { getCurrencies } from "../services/Auth";
import AppInput from "../reuseables/AppInput";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";
import AppSelect from "../reuseables/AppSelect";
import { GetDetails, getRoleMeta } from "../services/Dashboard";
import CountryListAgent from "../reuseables/CountryListAgent";
import AmountFormatter from "../reuseables/AmountFormatter";

export default function UpdateAgentCustomerRates({
  rateItem,
  modal,
  setModal,
}) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

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
    mutationFn: createRate,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success("Rate Created Successfully");
        setModal(false);
        setRateMeta();
        setRate();
        setSend();
        setReceive();
        //refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);
      toast.error("Rate Request wasn't created");

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
        transition: "all 0.3s",
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
          }}
          maxWidth="1100px"
          heading="Update Rate"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "20px",
            }}
          >
            <div className="name" style={{}}>
              <label>Currency</label>
              <CountryListAgent
                agentRates={rateItem?.specialRates}
                value={selectedCountry}
                setValue={setSelectedCountry}
                onChange={handleRates}
              />
            </div>
            <div
              className="name"
              style={{
                width: "100%",
              }}
            >
              <label>Special Rate</label>
              <AppInput
                placeholder="How much"
                type="number"
                onChange={(e) => {
                  setRate(e.target.value);
                }}
                width="92%"
                name="username"
                //value={selectedCountry?.specialRate}
                defaultValue={selectedCountry?.specialRate}
              />
            </div>
            <div
              className="name"
              style={{
                width: "100%",
              }}
            >
              <label>Transfer Fee</label>
              <AppInput
                placeholder="How much"
                type="number"
                onChange={(e) => {
                  setFee(e.target.value);
                }}
                width="92%"
                name="username"
                //value={selectedCountry?.charge}
                defaultValue={selectedCountry?.charge}
              />
            </div>
          </div>

          <Container>
            <div className="rates">
              <div className="pri">
                <ReactCountryFlag
                  countryCode={selectedCountry?.currencyRate?.fromCurrency?.code.slice(
                    0,
                    2
                  )}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  svg
                />
                <AmountFormatter
                  currency={selectedCountry?.currencyRate?.fromCurrency?.code}
                  value={1}
                />

                {/* <p>{rates?.data?.fromAmount}</p> */}
              </div>
              <div style={{ color: "#000" }}>=</div>
              <div className="sec">
                <ReactCountryFlag
                  countryCode={selectedCountry?.currencyRate?.toCurrency?.code.slice(
                    0,
                    2
                  )}
                  svg
                />
                <AmountFormatter
                  currency={selectedCountry?.currencyRate?.toCurrency?.code}
                  value={selectedCountry?.currencyRate?.conversionRate || 0}
                />
              </div>
            </div>
          </Container>

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
              }}
              className="cancel"
            >
              {" "}
              <span>Cancel</span>
            </button>
            <button
              onClick={() => {
                mutate({
                  currencyRateMetaData: {
                    id: rateMeta?.id,
                    role: {
                      id: rateMeta?.role?.id,
                    },
                  },
                  updatedBy: {
                    userId: userDetails?.userId,
                    firstName: "Admin",
                  },
                  conversionRate: rate,
                  fromCurrency: {
                    id: send?.id,
                  },
                  toCurrency: {
                    id: receive?.id,
                  },
                });
              }}
              className="confirm"
            >
              {" "}
              <span>{mutateLoading ? "creating..." : "Create"}</span>
            </button>
          </div>
        </AppModal>
      )}
    </div>
  );
}

const Container = styled.div`
  .rates {
    display: flex;
    width: 40%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    @media screen and (max-width: 40em) {
      padding: 0 !important;
    }

    .pri,
    .sec {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        font-weight: 400;
        color: #000;
      }
    }

    > .pri img {
      width: 50px !important;
      vertical-align: middle;
      height: 50px !important;
      border-radius: 50%;
      @media screen and (max-width: 40em) {
        height: 50px !important;
        width: 50px !important;
      }
    }

    > .sec img {
      width: 50px !important;
      vertical-align: middle;
      height: 50px !important;
      border-radius: 50%;
      @media screen and (max-width: 40em) {
        height: 50px !important;
        width: 50px !important;
      }
    }
  }
`;
