import React, { useState, useEffect } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SearchInput from "../reuseables/SearchInput";
import BeneficiaryComponent from "../COMPONENTS/BeneficiaryComponent";
import SendMoneyCustomersTableList from "./SendMoney/SendMoneyCustomersTableList";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { getRoleMeta } from "../services/Dashboard";
import { getCurrencies } from "../services/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createRateMetadata,
  updateRateMetadata,
} from "../services/PayoutDashboard";
import SectionHeader from "../reuseables/SectionHeader";
import AppSelect from "../reuseables/AppSelect";
import AppInput from "../reuseables/AppInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Switch } from "@arco-design/web-react";
import AppSelect2 from "../reuseables/AppSelect2";
function UpdateRateMetaData({ recall, setRecall, setModal, modal }) {
  const [selectSender, setSelectSender] = useState(true);
  const [beneficiary, setBeneficiary] = useState();
  const [sendmoney, setSendMoney] = useState();
  const [reviewTransfer, setReviewTransfer] = useState();
  const [userSelected, setUserSelected] = useState("");
  const [params] = useSearchParams();

  const rateItem = JSON.parse(params.get("item"));

  const [step, setStep] = useState(1);

  const [Noteinfo, setNoteinfo] = useState(true);

  //   Component useState
  const [beneficiaryComponent, setBeneficiaryComponent] = useState(false);

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
  const [transferBonusThresh, setTransferBonusThresh] = useState();
  const [bonusRate, setBonusRate] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [rateMeta, setRateMeta] = useState();
  const [allowKyc, setAllowKyc] = useState(
    rateItem?.allowTransferPreKCY || false
  );
  const [kycThreshold, setKycThreshold] = useState();

  const [allowMin, setAllowMin] = useState(
    rateItem?.allowBelowMinimum || false
  );
  const [allowMax, setAllowMax] = useState(
    rateItem?.allowAboveMaximum || false
  );

  const [autoPayout, setAutoPayout] = useState(rateItem?.autoPayout || false);

  const [allowMinTf, setAllowMinTf] = useState(false);
  const [allowMaxTf, setAllowMaxTf] = useState(false);

  const [allowMinFee, setAllowMinFee] = useState(false);
  const [allowMaxFee, setAllowMaxFee] = useState(false);

  const navigate = useNavigate();

  console.log(rateItem);

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: rateItem ? updateRateMetadata : createRateMetadata,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success(`Rate ${rateItem ? "Updated" : "Created"} Successfully`);
        navigate("/rate-metadata");
        setRecall(!recall);
        //refetch();
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

  console.log(rateMeta);

  const { data: countries } = useQuery({
    queryKey: ["countrie3s"],
    queryFn: () => getCurrencies(),
  });

  const { data: rateMetas } = useQuery({
    queryKey: ["getRoleMeta"],
    queryFn: () => getRoleMeta("basic"),
  });

  console.log(rateMetas?.data);
  return (
    <BodyLayout>
      {beneficiaryComponent && (
        <BeneficiaryComponent
          closeBeneficiaryComponent={setBeneficiaryComponent}
        />
      )}
      {beneficiaryComponent ? (
        ""
      ) : (
        <Content>
          <div className="top">
            <p>{rateItem ? "Update" : "Create"} Currency Rate Metadata</p>
          </div>

          <div className="main">
            {step === 1 && (
              <div
                style={{
                  padding: "20px",
                }}
              >
                <SectionHeader
                  title="Category Details"
                  desc="Add basic information about the category"
                />{" "}
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <label
                    style={{
                      width: "60%",
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    Currency
                  </label>
                  <CountryDropdown2
                    defaultValue={
                      selectedCountry || {
                        label: rateItem?.currency?.name,
                        value: rateItem?.currency?.name,
                        id: rateItem?.currency?.id,
                        ...rateItem?.currency,
                      }
                    }
                    collectionStatus
                    onChange={(e) => {
                      setSelectedCountry(e);
                    }}
                  />
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <label
                    style={{
                      width: "60%",
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    User Type
                  </label>
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
                    defaultValue={{
                      label: rateItem?.role?.name,
                      value: rateItem?.role?.id,
                    }}
                    onChange={(e) => {
                      setRateMeta(e);
                    }}
                  />
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>
                <div
                  className="name"
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <label
                    style={{
                      width: "60%",
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    Name
                  </label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    width="95%"
                    name="username"
                    defaultValue={rateItem?.name}
                  />
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>
                <div
                  className="name"
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <label
                    style={{
                      width: "60%",
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    Description
                  </label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    width="95%"
                    name="username"
                    defaultValue={rateItem?.description}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div
                style={{
                  padding: "20px",
                }}
              >
                <SectionHeader title="Limit" desc="Set Limit" />{" "}
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>{" "}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "40px",
                  }}
                >
                  <div className="name" style={{}}>
                    <label>Minimum Transfer Limit</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setMinTransfer(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={
                        minTransfer || rateItem?.minimumTransferLimit
                      }
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div>Allow below Minimum Transfer</div>
                      <div style={{ color: "#6b6b6b", fontSize: "12px" }}>
                        All Users in this category are to transfer lower than
                        the minimum category
                      </div>
                    </div>

                    <Switch
                      onClick={() => {
                        setAllowMin(!allowMin);
                      }}
                      checked={allowMin}
                    />
                  </div>
                  {allowMin && (
                    <div>
                      <label>Min. Transfer Fee (%)</label>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "3fr 4fr",
                        }}
                      >
                        <AppSelect2
                          cut
                          options={[
                            {
                              label: "Fixed",
                              value: "Fixed",
                            },
                            {
                              label: "Percentage",
                              value: "Percentage",
                            },
                          ]}
                          onChange={(e) => {
                            setAllowMinTf(e.value);
                          }}
                          defaultValue={{
                            label: rateItem?.belowMinimumChargeType,
                            value: rateItem?.belowMinimumChargeType,
                          }}
                        />
                        <AppInput
                          placeholder=""
                          type="number"
                          cut
                          removeCutBorder
                          onChange={(e) => {
                            setAllowMinFee(e.target.value);
                          }}
                          width="90%"
                          name="username"
                          defaultValue={
                            allowMinFee || rateItem?.transferBelowMinimumCharges
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "40px",
                  }}
                >
                  <div className="name" style={{}}>
                    <label>Maximum Transfer Limit</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setMaxTransfer(e.target.value);
                      }}
                      width="93%"
                      name="username"
                      defaultValue={
                        maxTransfer || rateItem?.maximumTransferLimit
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div>Allow above Maximum Transfer</div>
                      <div style={{ color: "#6b6b6b", fontSize: "12px" }}>
                        All Users in this category are to transfer above the the
                        maximum category
                      </div>
                    </div>
                    <Switch
                      onClick={() => {
                        setAllowMax(!allowMax);
                      }}
                      checked={allowMax}
                    />
                  </div>
                  {allowMax && (
                    <div>
                      <label>Max. Transfer Fee (%)</label>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "3fr 4fr",
                        }}
                      >
                        <AppSelect2
                          cut
                          options={[
                            {
                              label: "Fixed",
                              value: "Fixed",
                            },
                            {
                              label: "Percentage",
                              value: "Percentage",
                            },
                          ]}
                          onChange={(e) => {
                            setAllowMaxTf(e.value);
                          }}
                          defaultValue={{
                            label: rateItem?.aboveMaximumChargeType,
                            value: rateItem?.aboveMaximumChargeType,
                          }}
                        />
                        <AppInput
                          placeholder=""
                          type="number"
                          cut
                          removeCutBorder
                          onChange={(e) => {
                            setAllowMaxFee(e.target.value);
                          }}
                          width="90%"
                          name="username"
                          defaultValue={
                            allowMaxFee || rateItem?.transferAboveMaximumCharges
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>{" "}
                <div
                  style={{
                    display: "flex",
                    gridGap: "40px",
                  }}
                >
                  <div>Auto-Payout</div>
                  <Switch
                    onClick={() => {
                      setAutoPayout(!autoPayout);
                    }}
                    checked={autoPayout}
                  />
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>{" "}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "40px",
                  }}
                >
                  <div className="name" style={{}}>
                    <label>Daily Limit</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setDailyTransfer(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={dailyTransfer || rateItem?.dailyLimit}
                    />
                  </div>
                  <div className="name" style={{}}>
                    <label>Weekly Limit</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setWeeklyTransfer(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={weeklyTransfer || rateItem?.weeklyLimit}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "40px",
                  }}
                >
                  <div className="name" style={{}}>
                    <label>Monthly Limit</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setMonthlyTransfer(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={monthlyTransfer || rateItem?.monthlyLimit}
                    />
                  </div>
                  <div className="name" style={{}}>
                    <label>Annual Limit</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setAnnualTransfer(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={annualTransfer || rateItem?.annualLimit}
                    />
                  </div>
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "40px",
                  }}
                >
                  <div className="name" style={{}}>
                    <label>Transfer Bonus Threshold</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setTransferBonusThresh(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={
                        transferBonusThresh || rateItem?.transferBonusThreshold
                      }
                    />
                  </div>

                  <div className="name" style={{}}>
                    <label>Bonus Rate Value</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setBonusRate(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={
                        bonusRate || rateItem?.transferBonusRateValue
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div
                style={{
                  padding: "20px",
                }}
              >
                <SectionHeader
                  title="KYC Threshold & Partners"
                  desc="Set thresholds"
                />{" "}
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "40px",
                  }}
                >
                  <div className="name" style={{}}>
                    <label>Proof of Payment Threshold</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setPopThresh(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={
                        popThresh || rateItem?.proofOfPaymentAmountThreshold
                      }
                    />
                  </div>
                  <div className="name" style={{}}>
                    <label>Source of Funds Threshold</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setSofThresh(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={
                        sofThresh || rateItem?.sourceOfFundAmountThreshold
                      }
                    />
                  </div>
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.4",
                  }}
                ></hr>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "40px",
                  }}
                >
                  <div className="name" style={{}}>
                    <label>Transfer Bonus Threshold</label>
                    <AppInput
                      placeholder=""
                      type="number"
                      onChange={(e) => {
                        setTransferBonusThresh(e.target.value);
                      }}
                      width="95%"
                      name="username"
                      defaultValue={
                        transferBonusThresh || rateItem?.transferBonusThreshold
                      }
                    />
                  </div>
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    opacity: "0.3",
                  }}
                ></hr>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridGap: "40px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div>Allow KYC Threshold</div>
                      <div style={{ color: "#6b6b6b", fontSize: "12px" }}>
                        All Users in this category are to transfer pre KYC
                      </div>
                    </div>
                    <Switch
                      onClick={() => {
                        setAllowKyc(!allowKyc);
                      }}
                      checked={allowKyc}
                    />
                  </div>
                  {allowKyc && (
                    <div className="name" style={{}}>
                      <label>KYC Threshold</label>
                      <AppInput
                        placeholder=""
                        type="number"
                        onChange={(e) => {
                          setKycThreshold(e.target.value);
                        }}
                        width="95%"
                        name="username"
                        defaultValue={kycThreshold || rateItem?.kycThreshold}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              style={{
                display: "grid",
                width: "28%",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "10px",
                marginTop: "30px",
                marginLeft: "auto",
                paddingBottom: "20px",
                paddingRight: "20px",
              }}
            >
              {step === 1 ? (
                <div></div>
              ) : (
                <button
                  onClick={() => {
                    setStep((prev) => prev - 1);
                  }}
                  className="cancel"
                >
                  {" "}
                  <span>Previous</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (step === 1) {
                    setStep((prev) => prev + 1);
                  }
                  if (step === 2) {
                    setStep((prev) => prev + 1);
                  }
                  if (step === 3) {
                    mutate({
                      id: rateItem?.id,
                      updatedBy: userDetails?.userId,
                      name: name || rateItem?.name,
                      description: desc || rateItem?.description,
                      minTransferLimit:
                        minTransfer || rateItem?.minTransferLimit,
                      maxTransferLimit:
                        maxTransfer || rateItem?.maxTransferLimit,
                      dailyLimit: dailyTransfer || rateItem?.dailyLimit,
                      weeklyLimit: weeklyTransfer || rateItem?.weeklyLimit,
                      monthlyLimit: monthlyTransfer || rateItem?.monthlyLimit,
                      annualLimit: annualTransfer || rateItem?.annualLimit,
                      proofOfPaymentThresholdAmount:
                        popThresh || rateItem?.proofOfPaymentThresholdAmount,
                      sourceOfFundThresholdAmount:
                        sofThresh || rateItem?.sourceOfFundThresholdAmount,
                      transferBonusThreshold:
                        transferBonusThresh || rateItem?.transferBonusThreshold,
                      transferBonusRateValue:
                        bonusRate || rateItem?.transferBonusRateValue,
                      allowTransferPreKCY:
                        allowKyc?.value || rateItem?.allowTransferPreKCY,
                      kycThreshold: kycThreshold || rateItem?.kycThreshold,
                      currency: {
                        id: selectedCountry?.id || rateItem?.currency?.id,
                      },
                      role: {
                        id: rateMeta?.value || rateItem?.role?.id,
                      },
                      allowBelowMinimum:
                        allowMin || rateItem?.allowBelowMinimum,
                      belowMinimumChargeType:
                        allowMinTf || rateItem?.belowMinimumChargeType,
                      belowMinimumCharges:
                        allowMinFee || rateItem?.belowMinimumCharges,
                      allowAboveMaximum:
                        allowMax || rateItem?.allowAboveMaximum,
                      aboveMaximumChargeType:
                        allowMaxTf || rateItem?.aboveMaximumChargeType,
                      aboveMaximumLimitCharges:
                        allowMaxFee || rateItem?.aboveMaximumLimitCharges,
                      bonusRateValue: bonusRate || rateItem?.bonusRateValue,
                      autopayout: autoPayout || rateItem?.autoPayout,
                    });
                  }
                }}
                className="confirm"
                disabled={mutateLoading}
              >
                {" "}
                <span>
                  {mutateLoading
                    ? rateItem
                      ? "updating..."
                      : "creating..."
                    : step === 3
                    ? rateItem
                      ? "Update"
                      : "Create"
                    : "Continue"}
                </span>
              </button>
            </div>
          </div>
        </Content>
      )}
    </BodyLayout>
  );
}

export default UpdateRateMetaData;
const Content = styled.div`
  .top p {
    font-size: 32px;
    font-weight: 500;
  }
  .top {
    padding-bottom: 20px;
  }
  .top span {
    font-size: 15px;
    color: #848d87;
    font-weight: 400;
  }
  .btn {
    display: flex;
    gap: 10px;
  }
  .btn button {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 12px 13px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
  .info {
    background-color: #e1ebf9;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #bfd5f5;
  }
  .selection {
    padding: 40px 40px 0px 30px;
    display: flex;
    gap: 50px;
    cursor: pointer;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 20px;
  }
  .sender {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sender p {
    font-size: 17px;
    font-weight: 500;
    color: #a1a9b8;
    line-height: 48px;
  }
  .sender span {
    /* border: 8px solid #00a85a24; */
    border: 1px solid gainsboro;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    color: #a1a9b8;
    font-size: 17px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .note {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .note p {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #464f60;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .head button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .TableGrid {
    overflow: hidden;
    overflow: scroll;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100vw;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
    color: #5a6376;
    cursor: pointer;
  }
  .table span {
    font-size: 14px;
    font-weight: 400;
    color: #667085;
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 25px;
  }

  .row span {
    font-size: 15px;
    color: #687182;
  }
  .arrow {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .arrow button {
    width: 28.8px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    border-radius: 3px;
  }
  .pagins {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  .pagins p {
    font-size: 14px;
    color: #687182;
  }

  .pagins select {
    width: 48px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    padding: 2px;
    border-radius: 3px;
  }
`;
