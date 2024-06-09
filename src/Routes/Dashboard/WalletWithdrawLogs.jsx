import { styled } from "styled-components";

import CustomTable from "../../reuseables/CustomTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPayoutPartner,
  processuserwithdrawalrequest,
} from "../../services/Dashboard";
import AmountFormatter from "../../reuseables/AmountFormatter";
import { IconMoreVertical } from "@arco-design/web-react/icon";
import { Dropdown, Menu } from "@arco-design/web-react";
import { useState } from "react";
import ReusableModal from "../../reuseables/ReusableModal";
import Btn from "../../reuseables/Btn";
import toast from "react-hot-toast";
import AppSelect from "../../reuseables/AppSelect";
import InputNumber from "rc-input-number";

const Droplist = ({ action, setModal }) => (
  //   <Menu.Item key='1' onClick={() => onNavigate(id)}>
  <Menu
    style={{
      borderRadius: "10px",
      paddingTop: "6px",
      // width: "150px",
    }}
  >
    <Menu.Item
      onClick={() => {
        setModal(true);
        action("decline");
      }}
      key="5"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00016 1.33398C11.6668 1.33398 14.6668 4.33398 14.6668 8.00065C14.6668 11.6673 11.6668 14.6673 8.00016 14.6673C4.3335 14.6673 1.3335 11.6673 1.3335 8.00065C1.3335 4.33398 4.3335 1.33398 8.00016 1.33398ZM8.00016 2.66732C6.7335 2.66732 5.60016 3.06732 4.7335 3.80065L12.2002 11.2673C12.8668 10.334 13.3335 9.20065 13.3335 8.00065C13.3335 5.06732 10.9335 2.66732 8.00016 2.66732ZM11.2668 12.2007L3.80016 4.73398C3.06683 5.60065 2.66683 6.73398 2.66683 8.00065C2.66683 10.934 5.06683 13.334 8.00016 13.334C9.26683 13.334 10.4002 12.934 11.2668 12.2007Z"
          fill="#F04438"
        />
      </svg>

      <span
        style={{
          marginLeft: "10px",
        }}
      >
        Decline
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        setModal(true);
        action("approve");
      }}
      key="8"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00016 1.33398C11.6668 1.33398 14.6668 4.33398 14.6668 8.00065C14.6668 11.6673 11.6668 14.6673 8.00016 14.6673C4.3335 14.6673 1.3335 11.6673 1.3335 8.00065C1.3335 4.33398 4.3335 1.33398 8.00016 1.33398ZM8.00016 2.66732C6.7335 2.66732 5.60016 3.06732 4.7335 3.80065L12.2002 11.2673C12.8668 10.334 13.3335 9.20065 13.3335 8.00065C13.3335 5.06732 10.9335 2.66732 8.00016 2.66732ZM11.2668 12.2007L3.80016 4.73398C3.06683 5.60065 2.66683 6.73398 2.66683 8.00065C2.66683 10.934 5.06683 13.334 8.00016 13.334C9.26683 13.334 10.4002 12.934 11.2668 12.2007Z"
          fill="#38f03e"
        />
      </svg>

      <span
        style={{
          marginLeft: "10px",
        }}
      >
        Approve
      </span>
    </Menu.Item>
  </Menu>
);

function WalletWithdrawLogs({ data, loading, refetch }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const [modal, setModal] = useState(false);
  const [call, setCall] = useState("");
  const [item, setItem] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: processuserwithdrawalrequest,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        setModal(false);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      width: 70,
      //render: () => "Other 2",
      fixed: "left",
    },
    {
      title: "TRANSACTION ID",
      dataIndex: "id",
      width: 150,

      //render: () => "Other",
    },
    {
      title: "TRANSACTION STATUS",
      dataIndex: "statuss",
      width: 170,

      //render: () => "Other",
    },
    {
      title: "AMOUNT REQUESTED",
      dataIndex: "amount",
      width: 170,
    },
    {
      title: "AMOUNT PAID",
      dataIndex: "amount2",
      width: 170,
    },
    {
      title: "AGENT ACCOUNT DETAILS",
      dataIndex: "nameNew",
      width: 280,
    },

    {
      title: "DATE APPROVED",
      dataIndex: "dateApproved",
      width: 170,
    },
    {
      title: "DATE CREATED",
      dataIndex: "dateCreated",
      width: 170,
    },
  ];
  const [details, setDetails] = useState();
  const [amount, setAmount] = useState();

  const newData = data?.map((item) => {
    return {
      action: (
        <>
          <Dropdown
            disabled={item?.status !== "Pending"}
            droplist={<Droplist action={setCall} setModal={setModal} />}
          >
            <IconMoreVertical
              onClick={() => {
                setItem(item);
                setAmount(item?.amountRequested);
              }}
            ></IconMoreVertical>
          </Dropdown>
        </>
      ),
      amount: (
        <>
          {" "}
          {/* ß */}
          <div>
            <AmountFormatter
              currency={item?.userBeneficiary?.beneficiaryCountry?.currencyCode}
              value={item?.amountRequested}
            />
          </div>
        </>
      ),
      amount2: (
        <>
          {" "}
          {/* ß */}
          <div>
            <AmountFormatter
              currency={item?.userBeneficiary?.beneficiaryCountry?.currencyCode}
              value={item?.amountPaid}
            />
          </div>
        </>
      ),
      nameNew: (
        <div>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {item?.userBeneficiary?.beneficiaryBank?.accountName}
            &nbsp; &nbsp;
            <div
              onClick={() => {
                setDetails(item);
              }}
              style={{
                width: "fit-content",
                color: "blue",
                cursor: "pointer",
              }}
            >
              View Details
            </div>
          </p>
        </div>
      ),
      statuss: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background:
                item?.status === "Approved"
                  ? "#37d744"
                  : item?.status === "Pending"
                  ? "#ffe063"
                  : "#ff6363",
              color: "white",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.status}
          </div>
        </>
      ),
      ...item,
    };
  });

  const { data: payoutPartner } = useQuery({
    queryKey: ["getPayoutPartnerd"],
    queryFn: () => getPayoutPartner(),
  });
  const [selectedPartner, setSelectedPartner] = useState();

  console.log(selectedPartner, "selectedPartner");

  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Withdrawal Logs</div>
        </div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}
        <div
          style={{
            padding: "0 20px",
          }}
        >
          <CustomTable
            noData={newData?.length}
            loading={loading}
            Apidata={newData || []}
            tableColumns={columns}
          />

          <ReusableModal
            isOpen={details}
            width={400}
            onClose={() => {
              setDetails();
            }}
          >
            <center>
              <span
                style={{
                  fontSize: "15px",
                  color: "#757575",
                }}
              >
                Beneficiary Bank Details
              </span>
              <br />
              <h2>
                Bank -{" "}
                <b>
                  {details?.userBeneficiary?.beneficiaryBank?.bankName}{" "}
                  <svg
                    onClick={() => {
                      navigator.clipboard.writeText(
                        details?.userBeneficiary?.beneficiaryBank?.bankName
                      );
                      toast.success("Copied!");
                    }}
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                      fill="#00A85A"
                    />
                    <path
                      d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                      stroke="#00A85A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </b>
              </h2>
              <hr></hr>
              <h4>
                Account Name -{" "}
                <b>
                  {details?.userBeneficiary?.beneficiaryBank?.accountName}
                  <svg
                    onClick={() => {
                      navigator.clipboard.writeText(
                        details?.userBeneficiary?.beneficiaryBank?.accountName
                      );
                      toast.success("Copied!");
                    }}
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                      fill="#00A85A"
                    />
                    <path
                      d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                      stroke="#00A85A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </b>
              </h4>
              <hr></hr>

              <h3>
                Account Number -{" "}
                <b>
                  {details?.userBeneficiary?.beneficiaryBank?.accountNumber}{" "}
                  <svg
                    onClick={() => {
                      navigator.clipboard.writeText(
                        details?.userBeneficiary?.beneficiaryBank?.accountNumber
                      );
                      toast.success("Copied!");
                    }}
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                      fill="#00A85A"
                    />
                    <path
                      d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                      stroke="#00A85A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </b>
              </h3>
              <br />
              {details?.userBeneficiary?.correspondenceBank && (
                <>
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#757575",
                    }}
                  >
                    Correspondence Bank Details
                  </span>
                  <br />
                  <h2>
                    Bank -{" "}
                    <b>
                      {details?.userBeneficiary?.correspondenceBank?.bankName}
                      <svg
                        onClick={() => {
                          navigator.clipboard.writeText(
                            details?.userBeneficiary?.correspondenceBank
                              ?.bankName
                          );
                          toast.success("Copied!");
                        }}
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                          fill="#00A85A"
                        />
                        <path
                          d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                          stroke="#00A85A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </b>
                  </h2>
                  <hr></hr>

                  <h3>
                    Address -{" "}
                    <b>
                      {details?.userBeneficiary?.correspondenceBank?.address}{" "}
                      <svg
                        onClick={() => {
                          navigator.clipboard.writeText(
                            details?.userBeneficiary?.correspondenceBank
                              ?.address
                          );
                          toast.success("Copied!");
                        }}
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                          fill="#00A85A"
                        />
                        <path
                          d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                          stroke="#00A85A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </b>
                  </h3>
                  <hr></hr>
                  <h4>
                    IBAN/BIC -{" "}
                    <b>
                      {details?.userBeneficiary?.correspondenceBank?.bic ||
                        details?.userBeneficiary?.correspondenceBank?.iban}{" "}
                      <svg
                        onClick={() => {
                          navigator.clipboard.writeText(
                            details?.userBeneficiary?.correspondenceBank?.bic ||
                              details?.userBeneficiary?.correspondenceBank?.iban
                          );
                          toast.success("Copied!");
                        }}
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                          fill="#00A85A"
                        />
                        <path
                          d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                          stroke="#00A85A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </b>
                  </h4>
                </>
              )}
            </center>
          </ReusableModal>

          {modal && (
            <ReusableModal
              isOpen={modal}
              width={400}
              onClose={() => {
                setModal(false);
                setCall();
              }}
            >
              <p>
                {call === "decline" ? (
                  <h1 style={{ fontSize: "20px" }}>
                    Are you sure you want to Decline this Request?
                  </h1>
                ) : (
                  <div style={{}}>
                    <h1 style={{ fontSize: "20px" }}>
                      Are you sure you want to Decline this Request?
                    </h1>{" "}
                    <br />
                    <div style={{}}>
                      <AppSelect
                        label="Select Payout Partner"
                        options={payoutPartner?.data?.map((item) => {
                          return {
                            ...item,
                            label: item?.name,
                            value: item?.name,
                          };
                        })}
                        onChange={(e) => {
                          setSelectedPartner(e);
                        }}
                      />{" "}
                      &nbsp; &nbsp; &nbsp;
                      <div>
                        <div>Amount Paid</div>
                        <InputNumber
                          className="input"
                          placeholder="Enter Amount"
                          style={{
                            borderSize: "0.5px",
                            fontSize: "15px",
                            borderRadius: "8px",
                            border: "1px solid #c5c5c5",
                            background: "#ffffff",
                            color: "#000000",
                          }}
                          onChange={(e) => {
                            setAmount(e);
                          }}
                          value={amount}
                          formatter={(value) => {
                            return `${value}`.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </p>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Btn
                  clicking={() => {
                    setModal(false);
                    setCall();
                  }}
                  size={30}
                  styles={{
                    width: "100%",
                    marginRight: "10px",
                    padding: "8px",
                    fontWeight: "600",
                    background: "#b0b0b0",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                    }}
                  >
                    Cancel
                  </span>
                </Btn>
                &nbsp; &nbsp;
                <Btn
                  clicking={() => {
                    if (call === "approve") {
                      mutate({
                        adminId: 0,
                        updateType: 1,
                        userId: item?.userBeneficiary?.id,
                        pamentGatewayId: selectedPartner?.id,
                        WithdrawalRequest: {
                          id: item?.id,
                          amountPaid: amount || item?.amountRequested,
                        },
                      });
                    } else {
                      mutate({
                        adminId: 0,
                        updateType: 2,
                        userId: item?.userBeneficiary?.id,
                        WithdrawalRequest: {
                          id: item?.id,
                          amountPaid: item?.amountRequested,
                        },
                      });
                    }
                  }}
                  disabled={isLoading}
                  size={30}
                  styles={{
                    width: "100%",
                    marginRight: "10px",
                    padding: "8px",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                    }}
                  >
                    {isLoading ? "loading..." : "Proceed"}
                  </span>
                </Btn>
              </div>
            </ReusableModal>
          )}
        </div>
      </div>
    </Content>
  );
}

export default WalletWithdrawLogs;

const Content = styled.div`
  .rc-input-number-input {
    background: #fff;
    border: none;
    color: black;
    width: 70%;
    border-radius: 300px;
    padding: 16px;
    border: 1px solid #ffffff;
  }
  button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 7rem;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    cursor: pointer;
  }
  .arco-btn-primary {
    background-color: #00a85a !important;
    color: white !important;
    svg {
      stroke: #ffffff !important;
    }
  }
  .top {
    padding: 10px 30px 30px 20px;
  }
  .comment {
    background: #e5e5e5;
    width: 360px;
    color: #000000;
    border-radius: 12px;
    padding: 18px;
    display: grid;
    margin-top: 20px;
    font-size: 14px;
  }
  .tablecontent {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 10px;
  }
  .content {
    padding: 15px 20px 0px 20px;
  }
  .content .heading {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;
  }
  .content .sub {
    font-size: 14px;
    color: #848d87;
  }
  .content button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 7rem;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    cursor: pointer;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100%;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  /* .table tr:nth-child(odd) {
    background-color: #f6f6f6;
} */

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
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
`;
