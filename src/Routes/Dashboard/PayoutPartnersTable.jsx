import { Link } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import CountryFlag from "react-country-flag";
import { kFormatter3, kFormatter2, kFormatter4 } from "../../utils/format";
import {
  TodayLogss,
  Tranx,
  addcommenttotransaction,
  cancelTransaction,
  confirmTransaction,
  holdtransaction,
  markaspay,
  marktransactionsuspicious,
  paytransaction,
  revertholdtransaction,
  viewCommentsTransaction,
} from "../../services/Dashboard";
import AmountFormatter from "../../reuseables/AmountFormatter";
import { IconEye, IconMoreVertical } from "@arco-design/web-react/icon";
import { Dropdown, Input, Menu } from "@arco-design/web-react";
import { useState } from "react";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import Btn from "../../reuseables/Btn";
import toast from "react-hot-toast";
const TextArea = Input.TextArea;

function PayoutPartnersTable() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);
  const [userId, setUserIdd] = useState("");

  const {
    data: rates,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["TodayLogss"],
    queryFn: () => TodayLogss(),
  });

  const [modal, setModal] = useState(false);
  const [note, setNote] = useState(false);

  const [call, setCall] = useState("");

  const [userIdd, setUserId] = useState();
  const odk = userIdd;

  const {
    data: comments,
    isLoading: viewloading,
    refetch,
  } = useQuery({
    queryKey: [odk?.sn],
    queryFn: () => viewCommentsTransaction(odk?.sn),
  });

  console.log(rates, userId);

  const columns = [
    {
      title: "S/N",
      dataIndex: "status",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "GATEWAY ID",
      dataIndex: "status2",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "PAYOUT ID",
      dataIndex: "paymentRef",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "GATEWAY NAME",
      dataIndex: "userId",
      width: 190,
    },
    {
      title: "BANK CODE",
      dataIndex: "senderName",
      width: 190,
    },

    {
      title: "BANK NAME",
      dataIndex: "beneficiaryName",
      width: 280,

      //render: () => "Other",
    },
    {
      title: "ACCOUNT NUMBER",
      dataIndex: "countryo",
      width: 240,

      //render: () => "Other",
    },
    {
      title: "ACCOUNT NAME",
      dataIndex: "beneficiaryPhone",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "TRANSACTION ID",
      dataIndex: "newPaymentAmount",
      width: 120,
    },

    {
      title: "GATEWAYREF",
      dataIndex: "rate",
      render: (ire) => kFormatter3(ire),
      width: 120,
    },
    {
      title: "STATUS",
      dataIndex: "receivedAmount",
      render: (ire) => kFormatter3(ire),
      width: 260,
    },
    {
      title: "CHARGES",
      dataIndex: "collectionType",
      width: 200,

      //render: () => "Other",
    },

    {
      title: "NARRATION",
      dataIndex: "transactionSource",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "DATE",
      dataIndex: "paymentDate",
      width: 260,
      //render: () => "Other 2",
    },
  ];

  const newData = rates?.data?.map((item) => {
    return {
      ...item,
    };
  });

  console.log(newData);

  return (
    <Content>
      <div className="tablecontent">
        <div className="content"></div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}
        <CustomTable
          noData={rates?.data?.length}
          loading={isLoading || isFetching}
          Apidata={newData}
          tableColumns={columns}
        />

        {modal && (
          <ReusableModal
            isOpen={modal}
            width={400}
            onClose={() => {
              setModal(false);
              setCall();
            }}
          >
            <Msg>
              {/* {err} */}
              <p>
                {call === "markAsSuspicious"
                  ? "Are you sure you want to Mark as suspicious?"
                  : call === "markAsPay"
                  ? "Are you sure you want to Mark as pay?"
                  : call === "holdTransaction"
                  ? "Are you sure you want to Hold Transaction?"
                  : call === "cancelTransaction"
                  ? "Are you sure you want to Cancel Transaction?"
                  : call === "revertHoldTransaction"
                  ? "Are you sure you want to Revert Hold Transaction?"
                  : call === "confirmTransaction"
                  ? "Are you sure you want to Confirm Transaction?"
                  : call === "payTransaction"
                  ? "Are you sure you want to Pay Transaction?"
                  : call === "addComment"
                  ? "Add Comment"
                  : ""}
              </p>
              <br />
              {call === "viewComment"
                ? comments?.data?.map((item) => {
                    return viewloading ? (
                      "loading..."
                    ) : (
                      <div className="comment">{item?.comment}</div>
                    );
                  })
                : ""}

              {call === "addComment" && (
                <TextArea
                  name="address"
                  className="textarea"
                  placeholder="Enter comments ..."
                  style={{
                    minHeight: 104,
                    background: "transparent",
                    border: "1px solid #d8d8d8",
                    borderRadius: "8px",
                  }}
                  onChange={(e) => {
                    setNote(e);
                  }}
                />
              )}

              <br />

              {call === "viewComment" ? (
                ""
              ) : (
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
                    Cancel
                  </Btn>
                  &nbsp; &nbsp;
                  <Btn
                    clicking={() => {
                      call === "markAsSuspicious"
                        ? "Mark as suspicious"
                        : call === "markAsPay"
                        ? "Mark as pay"
                        : call === "holdTransaction"
                        ? "Hold Transaction"
                        : call === "cancelTransaction"
                        ? "Cancel Transaction"
                        : call === "revertHoldTransaction"
                        ? "Revert Hold Transaction"
                        : call === "confirmTransaction"
                        ? "Confirm Transaction"
                        : call === "payTransaction"
                        ? "Pay Transaction"
                        : "Add Comment";

                      if (call === "markAsSuspicious") {
                        marktransactionsuspiciousMutation(userIdd?.paymentRef);
                      } else if (call === "markAsPay") {
                        markaspayMutation(userIdd.paymentRef);
                      } else if (call === "holdTransaction") {
                        holdTransactionMutation(userIdd.paymentRef);
                      } else if (call === "cancelTransaction") {
                        cancelTransactionMutation(userIdd.paymentRef);
                      } else if (call === "revertHoldTransaction") {
                        revertholdtransactionMutation(userIdd.paymentRef);
                      } else if (call === "confirmTransaction") {
                        confirmTransactionMutation(userIdd.paymentRef);
                      } else if (call === "payTransaction") {
                        payTransactionMutation(userIdd.paymentRef);
                      } else {
                        addcommenttotransactionMutation({
                          customerId: userId,
                          transactionId: userIdd?.sn,
                          commentBy: 0,
                          comment: note,
                        });
                      }
                    }}
                    size={30}
                    disabled={
                      loading1 ||
                      loading2 ||
                      loading3 ||
                      loading4 ||
                      loading5 ||
                      loading6 ||
                      loading7 ||
                      loading8
                    }
                    styles={{
                      width: "100%",
                      marginRight: "10px",
                      padding: "8px",
                      color: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    {loading1 ||
                    loading2 ||
                    loading3 ||
                    loading4 ||
                    loading5 ||
                    loading6 ||
                    loading7
                      ? "loading..."
                      : "Confirm"}
                  </Btn>
                </div>
              )}
            </Msg>
          </ReusableModal>
        )}

        {/* <div className="row">
          <span>Showing 1-5 of entries</span>
          <div className="pagins">
            <p>Rows per page:</p>
            <select>
              <option>5</option>
            </select>
            <div className="arrow">
              <button
                onClick={() => {
                  // setSortDate(sortdate - 1);
                  // setEnd((prev) => prev - end);
                }}
              >
                <AiOutlineLeft />
              </button>
              <button>{sortdate}</button>
              <button>
                <AiOutlineRight />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </Content>
  );
}

export default PayoutPartnersTable;
const Content = styled.div`
  .top {
    padding: 10px 30px 30px 20px;
  }
  .comment {
    border: 1px solid #c7c7c7;
    width: 100%;
    border-radius: 14px;
    padding: 20px 0px;
    display: grid;
    margin-bottom: 10px;
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
