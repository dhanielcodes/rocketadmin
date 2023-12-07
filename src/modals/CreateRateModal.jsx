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
import { getRoleMeta } from "../services/Dashboard";

export default function CreateRateModal({ rateItem, modal, setModal }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [rate, setRate] = useState();
  const [rateMeta, setRateMeta] = useState();
  const [send, setSend] = useState();
  const [receive, setReceive] = useState();

  console.log(rateItem);

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

  const {
    data: countries,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["countrie3s"],
    queryFn: () => getCurrencies(),
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
          heading="Create Rate"
        >
          <div
            className="name"
            style={{
              marginBottom: "20px",
            }}
          >
            <AppSelect
              options={rateMetas?.data?.map((item) => {
                return {
                  ...item,
                  label: item?.name,
                  value: item?.name,
                };
              })}
              label="Rate Metadata"
              onChange={(e) => {
                setRateMeta(e);
              }}
            />
          </div>

          <div className="name">
            <label>Sending Currency</label>
            <CountryDropdown2
              value={send}
              collectionStatus={true}
              option={
                countries?.data?.map((item) => {
                  return {
                    label: item?.name + " - " + item?.code,
                    value: item?.name,
                    ...item,
                  };
                }) || []
              }
              onChange={(e) => {
                setSend(e);
              }}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Receiving Currency</label>
            <CountryDropdown2
              value={receive}
              option={
                countries?.data?.map((item) => {
                  return {
                    label: item?.name + " - " + item?.code,
                    value: item?.name,
                    ...item,
                  };
                }) || []
              }
              onChange={(e) => {
                setReceive(e);
              }}
            />
          </div>

          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>New Rate</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setRate(e.target.value);
              }}
              width="95%"
              name="username"
              //defaultValue={charge?.baseValue}
            />
          </div>

          <Container>
            <div className="rates">
              <div className="pri">
                <ReactCountryFlag
                  countryCode={send?.code.slice(0, 2)}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  svg
                />

                {/* <p>{rates?.data?.fromAmount}</p> */}
              </div>
              <div style={{ color: "#000" }}>=</div>
              <div className="sec">
                <ReactCountryFlag countryCode={receive?.code.slice(0, 2)} svg />
              </div>
            </div>
          </Container>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "10px",
              marginTop: "30px",
            }}
          >
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
