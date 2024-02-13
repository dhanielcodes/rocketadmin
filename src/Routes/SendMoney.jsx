import React, { useState, useEffect } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SearchInput from "../reuseables/SearchInput";
import BeneficiaryComponent from "../COMPONENTS/BeneficiaryComponent";
import SendMoneyCustomersTableList from "./SendMoney/SendMoneyCustomersTableList";
import SelectBeneficiary from "./SendMoney/SelectBeneficiary";
import SendDetails from "./SendMoney/SendDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import SendDetailsFinal from "./SendMoney/SendDetailsFinal";
import { useMutation } from "@tanstack/react-query";
import { sendMoney } from "../services/Dashboard";
import ReusableModal from "../reuseables/ReusableModal";
import Msg from "../reuseables/Msg";
import Btn from "../reuseables/Btn";
import toast from "react-hot-toast";
function SendMoney() {
  const [userSelected, setUserSelected] = useState("");

  const [newPurpose, setPurpose] = useState();
  const [payout, setPayout] = useState();
  const [payment, setPayment] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCountry2, setSelectedCountry2] = useState();

  const [rate, setRate] = useState("");

  const [params] = useSearchParams();
  const user = JSON.parse(params.get("user"));
  const statusCode = params.get("statusCode");

  const bene = JSON.parse(localStorage.getItem("userBene"));

  const [details, setDetails] = useState({
    userId: params.get("id"),
    userBeneficiaryId: bene?.id,
    fromCurrencyId: "",
    toCurrencyId: "",
    amount: "",
    paymentChannelId: "",
    walletId: 0,
    payoutChannelId: "",
    purpose: "",
    note: "",
    transactionSource: "backOffice",
    promoCode: "",
    redirectURL: `${window.location.origin}/sendmoney?step=1`,
    source: "backOffice",
  });

  const [step, setStep] = useState(params.get("step"));

  console.log(params.get("step") ? true : false);

  const [Noteinfo, setNoteinfo] = useState(true);
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  useEffect(() => {
    navigate("/sendmoney?step=1");
  }, []);

  useEffect(() => {
    setDetails({
      ...details,
      userId: params.get("id"),
      userBeneficiaryId: bene?.id,
    });

    //eslint-disable-next-line
  }, [params.get("step")]);

  //   Component useState
  const [beneficiaryComponent, setBeneficiaryComponent] = useState(false);

  const [open, setOpen] = useState(false);
  const [getmsg, setmsg] = useState("");
  const [getlink, setlink] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [status, setStatus] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: sendMoney,
    onSuccess: (data) => {
      console.log("🚀 ~ file: Login.jsx:61 ~ Login ~ data:", data?.data);
      setStep(1);
      navigate("/sendmoney?step=1");
      if (!data.status) {
        setOpen(true);
        setmsg(data?.message);
      } else {
        setlink(data?.data);
        setOpen(true);
        setmsg(data?.message);

        if (
          new RegExp(
            "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
          ).test(data?.data)
        ) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }

        setStatus(true);
      }
    },
    onError: (data) => {
      console.log("🚀 ~ file: SendMoney.jsx:286 ~ SendMoney ~ data:", data);

      // setShow(true)
      // setInfo(data)
      // setTimeout(() => {
      //     //  seterr("")
      // }, 2000)
      return;
    },
  });
  return (
    <BodyLayout>
      {beneficiaryComponent && (
        <BeneficiaryComponent
          closeBeneficiaryComponent={setBeneficiaryComponent}
        />
      )}
      {open && (
        <ReusableModal
          isOpen={open}
          onClose={() => {
            setOpen(!open);
            setSelectedCountry(null);
            setSelectedCountry2(null);
            setShowBtn(false);
          }}
        >
          {status === true ? (
            <>
              <Msg type={true}>{getmsg}</Msg>

              {showBtn && (
                <Btn
                  clicking={() => {
                    window.location.replace(getlink);
                  }}
                  styles={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  Proceed to Paymennt
                </Btn>
              )}
            </>
          ) : (
            <>
              {getmsg === "You are yet to complete your KYC." ? (
                <Msg>This User is yet to complete their KYC</Msg>
              ) : (
                <Msg>{getmsg}</Msg>
              )}
            </>
          )}
        </ReusableModal>
      )}
      {statusCode && (
        <ReusableModal
          isOpen={statusCode}
          onClose={() => {
            navigate("/user/sendmoney");
            localStorage.removeItem("amount");
          }}
        >
          <Msg type={statusCode === "0" ? true : false}>
            {params.get("statusMessage")}
          </Msg>
        </ReusableModal>
      )}
      {beneficiaryComponent ? (
        ""
      ) : (
        <Content>
          <div className="top">
            <p>Send Money</p>
            <span>
              This page let's you send money to customer beneficiaries
            </span>
          </div>

          <div className="main">
            {params.get("step") === "1" && (
              <SendMoneyCustomersTableList
                setStep={setStep}
                setUserSelected={setUserSelected}
                userSelected={userSelected}
              />
            )}
            {params.get("step") === "2" && (
              <SelectBeneficiary active={active} setActive={setActive} />
            )}
            {params.get("step") === "3" && (
              <SendDetails
                details={details}
                setDetails={setDetails}
                setRate={setRate}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                setSelectedCountry2={setSelectedCountry2}
                selectedCountry2={selectedCountry2}
                setPayment={setPayment}
                setPayout={setPayout}
                setPurpose={setPurpose}
                newPurpose={newPurpose}
                payment={payment}
                payout={payout}
              />
            )}
            {params.get("step") === "4" && <SendDetailsFinal rate={rate} />}
          </div>
          <div
            style={{
              display: "grid",
              width: "30%",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "10px",
              marginTop: "30px",
              marginLeft: "auto",
              paddingBottom: "20px",
              paddingRight: "20px",
            }}
          >
            {params.get("step") === "1" ? (
              <div></div>
            ) : (
              <button
                onClick={() => {
                  setStep((prev) => prev - 1);
                  if (step === 1) {
                    navigate(`/sendmoney?id=${params.get("id")}&step=${1}`);
                  }
                  if (step === 2) {
                    navigate(
                      `/sendmoney?id=${params.get(
                        "id"
                      )}&beneficiary=${JSON.stringify(
                        active
                      )}&user=${JSON.stringify(userSelected)}&step=${1}`
                    );
                  }
                  if (step === 3) {
                    navigate(
                      `/sendmoney?id=${params.get(
                        "id"
                      )}&beneficiary=${JSON.stringify(
                        active
                      )}&user=${JSON.stringify(userSelected)}&step=${2}`
                    );
                  }
                  if (step === 4) {
                    navigate(
                      `/sendmoney?id=${params.get(
                        "id"
                      )}&beneficiary=${JSON.stringify(
                        active
                      )}&user=${JSON.stringify(
                        userSelected
                      )}&fullDetails=${JSON.stringify({
                        fromCurrency: selectedCountry,
                        toCurrency: selectedCountry2,
                        rate: rate,
                        payment: payment,
                        payout: payout,
                        ...details,
                      })}&step=${3}`
                    );
                  }
                }}
                className="cancel"
              >
                {" "}
                <span>Previous</span>
              </button>
            )}

            {params.get("step") === "1" ? (
              ""
            ) : (
              <button
                disabled={isLoading}
                onClick={() => {
                  if (step === 1) {
                    navigate(`/sendmoney?id=${params.get("id")}&step=${2}`);
                    setStep((prev) => prev + 1);
                    localStorage.setItem(
                      "userSend",
                      JSON.stringify(userSelected)
                    );
                  }
                  if (step === 2) {
                    if (active) {
                      setStep((prev) => prev + 1);
                      localStorage.setItem("userBene", JSON.stringify(active));
                      navigate(`/sendmoney?id=${params.get("id")}&step=${3}`);
                    } else {
                      toast.error("Select a beneficiary");
                    }
                  }
                  if (step === 3) {
                    if (
                      selectedCountry &&
                      selectedCountry2 &&
                      rate &&
                      payment &&
                      payout &&
                      details?.fromCurrencyId &&
                      details?.toCurrencyId &&
                      details?.amount &&
                      details?.paymentChannelId &&
                      details?.purpose &&
                      details?.note
                    ) {
                      localStorage.setItem(
                        "sendDetails",
                        JSON.stringify({
                          fromCurrency: selectedCountry,
                          toCurrency: selectedCountry2,
                          rate: rate,
                          payment: payment,
                          payout: payout,
                          ...details,
                        })
                      );

                      navigate(`/sendmoney?id=${params.get("id")}&step=${4}`);
                    } else {
                      toast.error("All fields are required");
                    }
                  }
                  if (params.get("step") === "4") {
                    mutate(details);
                  }
                }}
                className="confirm"
              >
                {" "}
                <span>
                  {params.get("step") === "4"
                    ? isLoading
                      ? "sending..."
                      : "Proceed To Payment"
                    : "Continue"}
                </span>
              </button>
            )}
          </div>
        </Content>
      )}
    </BodyLayout>
  );
}

export default SendMoney;
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
