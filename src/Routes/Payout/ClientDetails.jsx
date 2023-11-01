import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createFundingRequest,
  getPayoutClientDashboard,
  updatePayoutClientStatus,
} from "../../services/PayoutDashboard";
import { isError, useMutation, useQuery } from "@tanstack/react-query";
import BodyLayout from "../../reuseables/BodyLayout";
import styled from "styled-components";
import { BackTop, Button, Select, Skeleton } from "@arco-design/web-react";
import phone from "../../assets/icons/phoneIcon.svg";
import mail from "../../assets/icons/mailIcon.svg";
import profile from "../../assets/images/profile.png";
import Details from "./ClientDetailsTabs/Details";
import Documents from "./ClientDetailsTabs/Documents";
import TransactionsList from "./ClientDetailsTabs/TransactionsList";
import ChargesList from "./ClientDetailsTabs/ChargesList";
import Skeleton2 from "../../reuseables/Skeleton2";
import AppModal from "../../COMPONENTS/AppModal";
import AppSelect from "../../reuseables/AppSelect";
import GatewayDropdown from "../../reuseables/GatewayDropdown";
import AppInput from "../../reuseables/AppInput";
import MainDetailsBody from "./MainDetailsBody";
import SuspendIcon from "../../assets/icons/SuspendIcon";
import { TiPlus } from "react-icons/ti";
import PlusIcon from "../../assets/icons/PlusIcon";
import toast from "react-hot-toast";
import Gateways from "./ClientDetailsTabs/Gateways";

export default function ClientDetailsPage() {
  const [params] = useSearchParams();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const userId = params.get("userId");

  const {
    data: client,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getPayoutClientDashboard(userId),
  });

  const {
    mutate,
    isLoading: mutateLoading,
    isError,
  } = useMutation({
    mutationFn: updatePayoutClientStatus,
    onSuccess: (data) => {
      refetch();
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const { mutate: mutateFunding, isLoading: mutateLoadingFund } = useMutation({
    mutationFn: createFundingRequest,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success(data?.message);
        setModal(false);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);
      toast.error("Funding Request wasn't created");

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  console.log(client);
  const clientUser = client?.data;
  const navigate = useNavigate();

  const [active, setActive] = useState("Profile");

  const tab = [
    "Profile",
    "ID Documents",
    "Transactions",
    "Charges",
    "Gateways",
  ];

  const [modal, setModal] = useState(false);

  const [gateway, setGateWay] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  console.log();

  return (
    <BodyLayout>
      <div
        style={{
          width: "100%",
        }}
      >
        {isLoading ||
          (isFetching && (
            <div style={{ padding: "20px" }}>
              <Skeleton2
                height="10vh"
                style={{
                  marginBottom: "20px",
                }}
              />
              <Skeleton2 height="80vh" />
            </div>
          )) ||
          (client?.data && (
            <Client>
              <div className="topBar">
                <div>
                  <div
                    className="back_buttton"
                    onClick={() => {
                      navigate("/clients");
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.25 12.2744L19.25 12.2744"
                        stroke="#00A85A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.2998 18.2985L4.2498 12.2745L10.2998 6.24951"
                        stroke="#00A85A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <span>Back to Clients</span>
                  </div>

                  <div className="top_name">{clientUser?.companyName}</div>
                </div>

                <div style={{ display: "flex" }}>
                  <button
                    className="fund"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    {" "}
                    {/*                   <TiPlus />
                     */}{" "}
                    <PlusIcon />
                    <span>Fund Wallet</span>
                  </button>
                  &nbsp; &nbsp;
                  {clientUser?.status !== "Suspended" ? (
                    <button
                      onClick={() => {
                        mutate({ objectId: userId, action: 0 });
                      }}
                      className="suspend"
                    >
                      <SuspendIcon />

                      {mutateLoading ? (
                        <span>Loading...</span>
                      ) : (
                        <span>Suspend</span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        mutate({ objectId: userId, action: 1 });
                      }}
                      className="active"
                    >
                      {mutateLoading ? (
                        <span>Loading...</span>
                      ) : (
                        <span>Activate</span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="body">
                <MainDetailsBody
                  clientUser={clientUser}
                  profile={profile}
                  mail={mail}
                  phone={phone}
                />

                <div
                  style={{
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "20px",
                      marginTop: "80px",
                      borderBottom: "1px solid #EAECF0",
                      display: "flex",
                    }}
                  >
                    {tab.map((item) => {
                      return (
                        <div
                          onClick={() => {
                            setActive(item);
                          }}
                          style={{
                            paddingBottom: "10px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            borderBottom:
                              active !== item
                                ? "1px solid transparent"
                                : "1px solid #00A85A",
                            width: "fit-content",
                            fontSize: "16px",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                        >
                          <span
                            style={{
                              width: "100%",
                              color: active === item ? "#00A85A" : "#667085",
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {active === "Profile" && (
                    <Details clientDetails={clientUser} />
                  )}
                  {active === "ID Documents" && (
                    <Documents clientDetails={clientUser} refetch={refetch} />
                  )}
                  {active === "Transactions" && (
                    <TransactionsList
                      refetch={refetch}
                      data={clientUser}
                    ></TransactionsList>
                  )}
                  {active === "Charges" && (
                    <ChargesList
                      refetch={refetch}
                      data={clientUser}
                    ></ChargesList>
                  )}

                  {active === "Gateways" && (
                    <Gateways data={clientUser}></Gateways>
                  )}
                </div>
              </div>
            </Client>
          ))}
        <div
          style={{
            opacity: modal ? "1" : "0",
            pointerEvents: modal ? "all" : "none",
            transition: "all 0.3s",
          }}
        >
          <AppModal
            closeModal={() => {
              setModal(false);
              setAmount();
              setDescription();
            }}
            heading="Fund Client"
          >
            <div className="name">
              <label>Gateway</label>
              <GatewayDropdown
                value={gateway}
                options={clientUser?.payOutClientWalletPayOutProviders?.map(
                  (item) => {
                    return {
                      ...item,
                      name: item?.providerName,
                      value: item?.providerName,
                    };
                  }
                )}
                onChange={(e) => {
                  setGateWay(e);
                }}
              />
            </div>
            <div
              className="name"
              style={{
                marginTop: "20px",
              }}
            >
              <label>Amount</label>
              <AppInput
                placeholder="How much"
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                width="96%"
                name="username"
                padding="12px"
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
                placeholder="Type a narration"
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                width="96%"
                name="username"
                padding="12px"
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
                  setAmount();
                  setDescription();
                }}
                className="cancel"
              >
                {" "}
                <span>Cancel</span>
              </button>
              <button
                onClick={() => {
                  mutateFunding({
                    userId: Number(params.get("userId")),
                    amountRequested: Number(amount),
                    userWallet: {
                      walletId: gateway?.wallet?.walletId,
                    },
                    comment: description,
                    astUpdatedBy: 0,
                  });
                }}
                className="confirm"
              >
                {" "}
                <span>{mutateLoadingFund ? "creating..." : "Fund"}</span>
              </button>
            </div>
          </AppModal>
        </div>
      </div>
    </BodyLayout>
  );
}

const Client = styled.div`
  width: 100%;
  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    width: 100%;

    .back_buttton {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        color: #00a85a;
        font-size: 16px;
        margin-left: 10px;
      }
    }

    .top_name {
      font-size: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: 600;
      text-transform: capitalize;
    }

    .fund {
      background-color: white;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      padding: 14px 14px;
      border-radius: 6px;
      cursor: pointer;

      span {
        margin-left: 10px;
        font-size: 16px;
      }
    }

    .suspend {
      background-color: #d1293d;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      padding: 14px 18px;
      border-radius: 6px;
      cursor: pointer;

      span {
        margin-left: 10px;
        color: white;
        font-size: 16px;
      }
    }
    .active {
      background-color: #3dd129;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      padding: 14px 18px;
      border-radius: 6px;
      cursor: pointer;

      span {
        color: white;
        font-size: 16px;
      }
    }
  }

  .body {
    width: 100%;
    background-color: white;
    border-radius: 20px;

    .left_body {
      width: 90%;
      padding: 20px;

      .profile {
        font-size: 20px;
        color: "#909090";
        margin-bottom: 20px;
      }
    }
  }
`;
