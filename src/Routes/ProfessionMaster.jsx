import { useEffect, useState } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
//import SearchInput from "../reuseables/SearchInput";

import { useQuery } from "@tanstack/react-query";
import CustomTable from "../reuseables/CustomTable";
import { useNavigate } from "react-router-dom";

import { getProfessions } from "../services/Dashboard";
import UpdateProfessionModal from "../modals/UpdateProfessionModal";
import AddProfessionModal from "../modals/AddProfessionModal";

// hhhhhhh
function ProfessionMaster() {
  const [inviteAgent, setInviteAgent] = useState(false);
  const [inviteAgent2, setInviteAgent2] = useState(false);
  /* {
    "id": 1,
    "paymentProviderSupportedCurrency": [
        {
            "id": 232
        },
        {
            "id": 232
        }
    ]
} */
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: payouts,
    isLoading: mutateLoading,
    isFetching: mutateFetching,
    refetch,
  } = useQuery({
    queryKey: ["getProfessions"],
    queryFn: () => getProfessions(),
  });

  console.log(payouts);

  useEffect(() => {
    refetch();
    //eslint-disable-next-line
  }, [inviteAgent]);

  const columns = [
    {
      title: "S/N",
      dataIndex: "agentId",
      width: 10,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 30,
    },

    {
      title: "PROFESSION NAME",
      dataIndex: "name",
      width: 90,
    },

    {
      title: "RISK LEVEL",
      dataIndex: "luStatus",
      width: 90,
      //render: () => "Other 2",
    },
  ];

  const navigate = useNavigate();

  const [active, setActive] = useState();
  const [item, setItem] = useState();
  const newData = payouts?.data?.map((item, index) => {
    return {
      ...item,
      action: (
        <div
          style={{
            position: "relative",
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (active === item?.id) {
              setActive("");
            } else {
              setActive(item?.id);
            }
          }}
        >
          <svg
            width="20"
            height="16"
            viewBox="0 0 5 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              cursor: "pointer",
            }}
          >
            <path
              d="M2.5 4C3.6 4 4.5 3.1 4.5 2C4.5 0.9 3.6 0 2.5 0C1.4 0 0.5 0.9 0.5 2C0.5 3.1 1.4 4 2.5 4ZM2.5 6C1.4 6 0.5 6.9 0.5 8C0.5 9.1 1.4 10 2.5 10C3.6 10 4.5 9.1 4.5 8C4.5 6.9 3.6 6 2.5 6ZM2.5 12C1.4 12 0.5 12.9 0.5 14C0.5 15.1 1.4 16 2.5 16C3.6 16 4.5 15.1 4.5 14C4.5 12.9 3.6 12 2.5 12Z"
              fill="#667085"
            />
          </svg>

          {active === item?.id && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                position: "absolute",
                border: "1px solid #d1d1d1",
                borderRadius: "10px",
                textAlign: "left",
                left: "30px",
                bottom: index !== 0 && "0",
                top: index === 0 && "0",
                background: "#fff",
                zIndex: "10000",
                width: "200px",
              }}
              className="absolute border border-gray-200 rounded-lg text-left left-0 top-[160%] bg-white z-10"
            >
              <div
                onClick={() => {
                  setInviteAgent(true);
                  setItem(item);
                }}
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <g clip-path="url(#clip0_2568_14904)">
                    <path
                      d="M14.6667 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4788 13.1394 11.2688 13.9817 9.89022 14.3893C8.5116 14.797 7.03815 14.748 5.68963 14.2498C4.3411 13.7516 3.18975 12.8308 2.40729 11.6248C1.62482 10.4188 1.25317 8.99211 1.34776 7.55761C1.44235 6.12312 1.99812 4.75762 2.93217 3.66479C3.86621 2.57195 5.1285 1.81033 6.53077 1.4935C7.93304 1.17668 9.40016 1.32163 10.7133 1.90674M14.6667 2.66674L7.99998 9.34007L5.99998 7.34007"
                      stroke="#101828"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2568_14904">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Update Profession
              </div>
            </div>
          )}
        </div>
      ),
      luStatus: (
        <div
          style={{
            padding: "6px 14px",
            borderRadius: "7px",
            background:
              item?.riskLevel?.name === "Low"
                ? "#37d744"
                : item?.riskLevel?.name === "Medium"
                ? "#d3b331"
                : "#ff6363",
            color: "white",
            width: "fit-content",
            fontWeight: "700",
          }}
        >
          {item?.riskLevel?.name}
        </div>
      ),
    };
  });

  console.log(newData);

  return (
    <>
      {inviteAgent && (
        <UpdateProfessionModal item={item} closeinviteAgent={setInviteAgent} />
      )}
      {inviteAgent2 && (
        <AddProfessionModal closeinviteAgent={setInviteAgent2} />
      )}
      <BodyLayout
        onClick={() => {
          setActive("");
        }}
        active={window.location.pathname}
      >
        <Content>
          <div className="header">
            <div className="top">
              <p>Profession</p>
              <span>This page allows you to add and update professions</span>
            </div>
            <div className="btn">
              <button
                style={{
                  backgroundColor: "#00A85A",
                  color: "white",
                }}
                onClick={() => {
                  setInviteAgent2(true);
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99999 2C8.4142 2 8.74999 2.33579 8.74999 2.75V7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41422 13.6642 8.75 13.25 8.75H8.74999V13.25C8.74999 13.6642 8.4142 14 7.99999 14C7.58578 14 7.24999 13.6642 7.24999 13.25V8.75H2.75C2.33579 8.75 2 8.41422 2 8C2 7.58579 2.33579 7.25 2.75 7.25H7.24999V2.75C7.24999 2.33579 7.58578 2 7.99999 2Z"
                    fill="white"
                  />
                </svg>
                New Profession
              </button>
            </div>
          </div>
          <div className="main">
            <CustomTable
              noData={payouts?.data?.length}
              loading={mutateLoading || mutateFetching}
              Apidata={newData}
              tableColumns={columns}
              scroll={{
                x: 800,
                y: 800,
              }}
            />
          </div>
        </Content>
      </BodyLayout>
    </>
  );
}

export default ProfessionMaster;

const Content = styled.div`
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
