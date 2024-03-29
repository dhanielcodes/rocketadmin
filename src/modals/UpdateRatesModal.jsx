import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateRate } from "../services/PayoutDashboard";
import AppModal from "../COMPONENTS/AppModal";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { getCurrencies } from "../services/Auth";
import AppInput from "../reuseables/AppInput";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";

export default function UpdateRatesModal({ rateItem, modal, setModal }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [rate, setRate] = useState();
  const [send, setSend] = useState();
  const [receive, setReceive] = useState();

  console.log(rateItem);

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: updateRate,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success("Rate Updated Successfully");
        setModal(false);
        //refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);

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

  console.log(countries?.data);
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
          }}
          heading="Update Rate"
        >
          <div className="name">
            <label>Sending Currency</label>
            <CountryDropdown2
              disabled={true}
              value={{
                ...rateItem,
                label:
                  rateItem?.fromCurrency?.name +
                  " - " +
                  rateItem?.fromCurrency?.code,
                value: rateItem?.fromCurrency?.name,
              }}
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
              disabled={true}
              collectionStatus
              value={{
                label:
                  rateItem?.toCurrency?.name +
                  " - " +
                  rateItem?.toCurrency?.code,
                value: rateItem?.toCurrency?.name,
                ...rateItem,
              }}
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
              defaultValue={rateItem?.conversionRate}
              //defaultValue={charge?.baseValue}
            />
          </div>

          <Container>
            <div className="rates">
              <div className="pri">
                <ReactCountryFlag
                  countryCode={rateItem?.fromCurrency?.code.slice(0, 2)}
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
                <ReactCountryFlag
                  countryCode={rateItem?.toCurrency?.code.slice(0, 2)}
                  svg
                />
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
                  id: rateItem?.id,
                  updatedBy: {
                    userId: userDetails?.userId,
                    firstName: "Admin",
                  },
                  conversionRate: rateItem?.conversionRate || rate,
                  fromCurrency: {
                    id: rateItem?.fromCurrency?.id,
                  },
                  toCurrency: {
                    id: rateItem?.toCurrency?.id,
                  },
                });
              }}
              className="confirm"
            >
              {" "}
              <span>{mutateLoading ? "updating..." : "Update"}</span>
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
