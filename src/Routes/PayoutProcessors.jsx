import { useEffect, useState } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
//import SearchInput from "../reuseables/SearchInput";
import InviteAgent from "../COMPONENTS/InviteAgent";
import {
  getAgents,
  getPayoutProcessors,
  togglepayoutchannelprovider,
} from "../services/Dashboard";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomTable from "../reuseables/CustomTable";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import AddPayoutProcessorModal from "../modals/AddPayoutProcessorModal";
import { removeDup } from "../utils/format";
import { Switch } from "@arco-design/web-react";

// hhhhhhh
function PayoutProcessors() {
  const [inviteAgent, setInviteAgent] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: payouts,
    isLoading: mutateLoading,
    isFetching: mutateFetching,
    refetch,
  } = useQuery({
    queryKey: ["getPayoutProcessors"],
    queryFn: () => getPayoutProcessors(),
  });

  console.log(payouts);

  useEffect(() => {
    refetch();
    //eslint-disable-next-line
  }, [inviteAgent]);

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action",
      width: 150,
      fixed: "left",
      //render: () => "Other 2",
    },
    {
      title: "CHANNEL ID",
      dataIndex: "id",
      width: 190,
    },

    {
      title: "CURRENCY",
      dataIndex: "sending",
      width: 220,
      filters: removeDup(
        payouts?.data?.map((item) => {
          return {
            text: item?.currency["name"],
            value: item?.currency["name"],
          };
        })
      ),

      onFilter: (value, row) => row.currency["name"].indexOf(value) > -1,
      filterMultiple: true,
    },

    {
      title: "PAYOUT CHANNEL NAME",
      dataIndex: "name",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */

      width: 240,
    },

    {
      title: "PAYOUT CHANNEL",
      dataIndex: "payoutChannel['name']",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      filters: removeDup(
        payouts?.data?.map((item) => {
          return {
            text: item?.payoutChannel["name"],
            value: item?.payoutChannel["name"],
          };
        })
      ),

      onFilter: (value, row) => row.payoutChannel["name"].indexOf(value) > -1,
      filterMultiple: true,

      width: 200,
    },
    {
      title: "PAYOUT PROCESSOR",
      dataIndex: "newGateWay",
      width: 240,
      filters: removeDup(
        payouts?.data?.map((item) => {
          return {
            text: item?.payoutProvider["name"],
            value: item?.payoutProvider["name"],
          };
        })
      ),

      onFilter: (value, row) => row.payoutProvider["name"].indexOf(value) > -1,
      filterMultiple: true,
    },

    {
      title: "PAYOUT DESCRIPTION",
      dataIndex: "payoutProvider['description']",
      width: 260,
    },

    {
      title: "STATUS",
      dataIndex: "toggle",
      width: 220,
      //render: () => "Other 2",
    },
  ];

  const { mutate, isLoading: togglecurrencyrateconversionLoading } =
    useMutation({
      mutationFn: togglepayoutchannelprovider,
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

  const { mutate: mutate2, isLoading: togglecurrencyrateconversionLoading2 } =
    useMutation({
      mutationFn: togglepayoutchannelprovider,
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
  const [type, setType] = useState("add");
  const [item, setItem] = useState("");
  const [cus, setCus] = useState();

  const newData = payouts?.data?.map((item) => {
    return {
      ...item,
      newGateWay: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "1000px",
              marginRight: "10px",
              objectFit: "cover",
            }}
            src={item?.payoutProvider["logo"]}
            alt=""
          />
          {item?.payoutProvider["name"]}
        </div>
      ),
      sending: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ReactCountryFlag
            style={{
              borderRadius: "10000000px",
              marginRight: "10px",
            }}
            countryCode={item?.currency?.code?.slice(0, 2)}
            svg
          />
          {item?.currency["code"]}
        </div>
      ),
      action: (
        <div
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            setType("update");
            setInviteAgent(true);
            setItem(item);
          }}
        >
          <p
            onClick={() => {
              console.log(item?.userId);
            }}
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            Update Channel
          </p>
        </div>
      ),
      toggle: (
        <div>
          <Switch
            loading={
              (item === cus && togglecurrencyrateconversionLoading) ||
              (item === cus && togglecurrencyrateconversionLoading)
            }
            /* disabled={
              disallowusermulticurrencyLoading || allowMultiCurrencyLoading
            } */
            onClick={() => {
              setCus(item);
              if (item?.status) {
                mutate({
                  action: 0,
                  objectId: item?.id,
                });
              } else {
                mutate({
                  action: 1,
                  objectId: item?.id,
                });
              }
            }}
            checked={item?.status}
          />
        </div>
      ),
      status: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background: item?.status ? "#37d7446c" : "#ff63634b",
              color: item?.status ? "green" : "red",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.status ? "Active" : "Inactive"}
          </div>
        </>
      ),
    };
  });

  console.log(newData);

  return (
    <>
      {inviteAgent && (
        <AddPayoutProcessorModal
          closeinviteAgent={setInviteAgent}
          setItem={setItem}
          type={type}
          item={item}
        />
      )}{" "}
      <BodyLayout active={window.location.pathname}>
        <Content>
          <div className="header">
            <div className="top">
              <p>Payout Channel Providers</p>
              <span>This page allows you to manage payout channels</span>
            </div>
            <div className="btn">
              {/*   <button
                style={{
                  backgroundColor: "white",
                  color: "#464F60",
                  border: "2px solid gainsboro",
                }}
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66661 13.1666L9.99994 16.4999M9.99994 16.4999L13.3333 13.1666M9.99994 16.4999V8.99994M17.3999 14.0749C18.1244 13.5655 18.6677 12.8384 18.951 11.9992C19.2343 11.1601 19.2428 10.2525 18.9753 9.40813C18.7078 8.56381 18.1782 7.82669 17.4633 7.30375C16.7485 6.78081 15.8856 6.49925 14.9999 6.49994H13.9499C13.6993 5.52317 13.2304 4.61598 12.5784 3.84668C11.9264 3.07737 11.1084 2.46599 10.186 2.05857C9.2635 1.65115 8.26065 1.4583 7.25288 1.49454C6.24512 1.53078 5.25871 1.79517 4.36791 2.2678C3.47711 2.74043 2.70513 3.40898 2.1101 4.22314C1.51507 5.03729 1.11249 5.97582 0.932662 6.96807C0.752836 7.96032 0.800453 8.98044 1.07193 9.95163C1.3434 10.9228 1.83166 11.8198 2.49994 12.5749"
                    stroke="#344054"
                    stroke-width="1.336"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Export Report{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8 11L14 5"
                    stroke="#868FA0"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button> */}
              <button
                style={{
                  backgroundColor: "#00A85A",
                  color: "white",
                }}
                onClick={() => {
                  setInviteAgent(true);
                  setType("add");
                }}
              >
                {/* <AiOutlinePlus size={18} style={{ color: "white" }} /> */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99999 2C8.4142 2 8.74999 2.33579 8.74999 2.75V7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41422 13.6642 8.75 13.25 8.75H8.74999V13.25C8.74999 13.6642 8.4142 14 7.99999 14C7.58578 14 7.24999 13.6642 7.24999 13.25V8.75H2.75C2.33579 8.75 2 8.41422 2 8C2 7.58579 2.33579 7.25 2.75 7.25H7.24999V2.75C7.24999 2.33579 7.58578 2 7.99999 2Z"
                    fill="white"
                  />
                </svg>
                New Processor
              </button>
            </div>
          </div>
          <div className="main">
            <div className="head">
              <div></div>
              <div
                style={{
                  display: "flex",
                }}
              >
                <button
                  onClick={() => {
                    mutate({
                      action: 0,
                      objectId: 0,
                    });
                  }}
                  disabled={togglecurrencyrateconversionLoading}
                  className="confirm"
                  style={{
                    background: "#7b7b7b",
                  }}
                >
                  {" "}
                  <span>
                    {togglecurrencyrateconversionLoading
                      ? "disabling channels..."
                      : "Disable Channels"}
                  </span>
                </button>
                &nbsp; &nbsp;
                <button
                  disabled={togglecurrencyrateconversionLoading2}
                  onClick={() => {
                    mutate2({
                      action: 1,
                      objectId: 0,
                    });
                  }}
                  className="confirm"
                >
                  {" "}
                  <span>
                    {togglecurrencyrateconversionLoading2
                      ? "activating channels..."
                      : "Activate Channels"}
                  </span>{" "}
                </button>
              </div>
            </div>

            <CustomTable
              noData={payouts?.data?.length}
              loading={mutateLoading || mutateFetching}
              Apidata={newData}
              tableColumns={columns}
            />
          </div>
        </Content>
      </BodyLayout>
    </>
  );
}

export default PayoutProcessors;

const Content = styled.div`
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .head button {
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
  }
  .search {
    display: flex;
    justify-content: space-between;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top p {
    font-size: 32px;
    font-weight: 500;
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
