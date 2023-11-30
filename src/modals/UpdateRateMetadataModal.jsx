import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { createRate, updateRateMetadata } from "../services/PayoutDashboard";
import AppModal from "../COMPONENTS/AppModal";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { getCountries } from "../services/Auth";
import AppInput from "../reuseables/AppInput";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";
import AppSelect from "../reuseables/AppSelect";
import { getRoleMeta } from "../services/Dashboard";

export default function UpdateRateMetadataModal({
  rateItem,
  modal,
  setModal,
  recall,
  setRecall,
}) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [minTransfer, setMinTransfer] = useState();
  const [maxTransfer, setMaxTransfer] = useState();
  const [dailyTransfer, setDailyTransfer] = useState();
  const [weeklyTransfer, setWeeklyTransfer] = useState();
  const [monthlyTransfer, setMonthlyTransfer] = useState();
  const [annualTransfer, setAnnualTransfer] = useState();
  const [popThresh, setPopThresh] = useState();
  const [sofThresh, setSofThresh] = useState();
  const [allowBelow, setAllowBelow] = useState();
  const [belowMinCharges, setBelowMinCharges] = useState();
  const [transferBonusThresh, setTransferBonusThresh] = useState();
  const [bonusRate, setBonusRate] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [rateMeta, setRateMeta] = useState();

  console.log(rateItem);

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: updateRateMetadata,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success("Rate Updated Successfully");
        setRecall(!recall);

        setModal(false);
        setRateMeta();
        setName();
        setDesc();
        setMinTransfer();
        setMaxTransfer();
        setDailyTransfer();
        setWeeklyTransfer();
        setMonthlyTransfer();
        setAnnualTransfer();
        setAllowBelow();
        setBelowMinCharges();
        setPopThresh();
        setSofThresh();
        setBonusRate();
        setSelectedCountry();
        setTransferBonusThresh();
        //refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);
      toast.error(data?.message);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  console.log(rateMeta);

  const {
    data: countries,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["countrie3s"],
    queryFn: () => getCountries(),
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
            setName();
            setDesc();
            setMinTransfer();
            setMaxTransfer();
            setDailyTransfer();
            setWeeklyTransfer();
            setMonthlyTransfer();
            setAnnualTransfer();
            setAllowBelow();
            setBelowMinCharges();
            setPopThresh();
            setSofThresh();
            setBonusRate();
            setSelectedCountry();
            setTransferBonusThresh();
          }}
          heading="Update Currency Rate Metadata"
        >
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Country</label>
            <CountryDropdown2
              value={{
                label:
                  rateItem?.country?.name +
                  " - " +
                  rateItem?.country?.currencyCode,
                value: rateItem?.country?.name,
              }}
              disabled={true}
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
              }}
            />
          </div>

          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Name</label>
            <AppInput
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.name}
            />
          </div>

          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Description</label>
            <AppInput
              placeholder="How much"
              type="text"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.description}
            />
          </div>

          <div
            className="name"
            style={{
              marginBottom: "20px",
            }}
          >
            <AppSelect
              options={[
                {
                  label: "Agent",
                  value: 5,
                },
                {
                  label: "Customer",
                  value: 6,
                },
              ]}
              disabled={true}
              value={{
                label: rateItem?.role?.name,
                value: rateItem?.role?.id,
              }}
              label="Rate Metadata"
              onChange={(e) => {
                setRateMeta(e);
              }}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Minimum Transfer Limit</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setMinTransfer(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.minimumTransferLimit}
            />
          </div>

          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Maximu Transfer Limit</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setMaxTransfer(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.maximumTransferLimit}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Daily Limit</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setDailyTransfer(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.dailyLimit}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Weekly Limit</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setWeeklyTransfer(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.weeklyLimit}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Monthly Limit</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setMonthlyTransfer(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.monthlyLimit}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Annual Limit</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setAnnualTransfer(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.annualLimit}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Proof of Payment Threshold</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setPopThresh(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.proofOfPaymentAmountThreshold}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Source of Funds Threshold</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setSofThresh(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.sourceOfFundAmountThreshold}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Allow Below Minimum</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setAllowBelow(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.transferBelowMinimumAllowed}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Below Minimum Charges</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setBelowMinCharges(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.transferBelowMinimumCharges}
            />
          </div>
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Transfer Bonus Threshold</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setTransferBonusThresh(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.transferBonusThreshold}
            />
          </div>

          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Bonus Rate Value</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setBonusRate(e.target.value);
              }}
              width="95%"
              name="username"
              defaultValue={rateItem?.transferBonusRateValue}
            />
          </div>

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
                  updatedBy: userDetails?.userId,
                  name: name || rateItem?.name,
                  description: desc || rateItem?.description,
                  minTransferLimit: minTransfer || rateItem?.minTransferLimit,
                  maxTransferLimit: maxTransfer || rateItem?.maxTransferLimit,
                  dailyLimit: dailyTransfer || rateItem?.dailyLimit,
                  weeklyLimit: weeklyTransfer || rateItem?.weeklyLimit,
                  monthlyLimit: monthlyTransfer || rateItem?.monthlyLimit,
                  annualLimit: annualTransfer || rateItem?.annualLimit,
                  proofOfPaymentThresholdAmount:
                    popThresh || rateItem?.proofOfPaymentThresholdAmount,
                  sourceOfFundThresholdAmount:
                    sofThresh || rateItem?.sourceOfFundThresholdAmount,
                  transferBelowMinimumAllowed:
                    allowBelow || rateItem?.transferBelowMinimumAllowed,
                  transferBelowMinimumCharges:
                    belowMinCharges || rateItem?.transferBelowMinimumCharges,
                  transferBonusThreshold:
                    transferBonusThresh || rateItem?.transferBonusThreshold,
                  transferBonusRateValue:
                    bonusRate || rateItem?.transferBonusRateValue,
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
