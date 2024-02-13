import BodyLayout from "../reuseables/BodyLayout";
import styled from "styled-components";
import { getKycNotifications, markKycNotifAsRead } from "../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Skeleton } from "@arco-design/web-react";
import { useState } from "react";

export default function KycAlertsPage() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["getKycNotifications"],
    queryFn: () => getKycNotifications(),
  });

  const [loading, setLoading] = useState(false);

  const markAsRead = async (id) => {
    setLoading(true);
    try {
      const data = await markKycNotifAsRead(id);
      console.log(data);
      refetch();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  console.log(data);
  return (
    <>
      <BodyLayout>
        <Header>
          <div className="content">
            <div className="heading">Alerts</div>
            <div className="sub">This page allows you to see all alerts. </div>
          </div>
          {/*   <button
            onClick={() => {
              setModal(true);
            }}
            className="confirm"
          >
            {" "}
            <span>Create Metadata</span>
          </button> */}
        </Header>
        <AuditStyle>
          <div>
            <div className="audit_cont">
              {isLoading || isFetching || loading ? (
                <div
                  style={{
                    padding: "0 20px",
                  }}
                >
                  <Skeleton />
                  <br />
                  <br />
                  <Skeleton />
                  <br />
                  <br />
                  <Skeleton />
                </div>
              ) : (
                data?.data?.length === 0 && (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    No Alerts.
                  </div>
                )
              )}
              {data?.data?.map((item) => {
                return isLoading || isFetching || loading ? (
                  ""
                ) : (
                  <div
                    className="audit"
                    onClick={() => {
                      markAsRead(item?.id);
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1601_37742)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.9997 3.33398C10.7947 3.33398 3.33301 10.7957 3.33301 20.0007C3.33301 29.2057 10.7947 36.6673 19.9997 36.6673C29.2047 36.6673 36.6663 29.2057 36.6663 20.0007C36.6663 10.7957 29.2047 3.33398 19.9997 3.33398ZM14.1663 15.834C14.1663 15.0679 14.3172 14.3094 14.6104 13.6017C14.9035 12.8939 15.3332 12.2509 15.8749 11.7092C16.4166 11.1675 17.0596 10.7378 17.7674 10.4447C18.4751 10.1515 19.2336 10.0007 19.9997 10.0007C20.7657 10.0007 21.5243 10.1515 22.232 10.4447C22.9397 10.7378 23.5828 11.1675 24.1245 11.7092C24.6661 12.2509 25.0958 12.8939 25.389 13.6017C25.6821 14.3094 25.833 15.0679 25.833 15.834C25.833 17.3811 25.2184 18.8648 24.1245 19.9588C23.0305 21.0527 21.5468 21.6673 19.9997 21.6673C18.4526 21.6673 16.9688 21.0527 15.8749 19.9588C14.7809 18.8648 14.1663 17.3811 14.1663 15.834ZM30.4297 28.3073C29.1821 29.8767 27.596 31.1439 25.79 32.0143C23.9839 32.8847 22.0045 33.3359 19.9997 33.334C17.9948 33.3359 16.0154 32.8847 14.2094 32.0143C12.4033 31.1439 10.8173 29.8767 9.56967 28.3073C12.2713 26.369 15.958 25.0007 19.9997 25.0007C24.0413 25.0007 27.728 26.369 30.4297 28.3073Z"
                          fill="#B7B7B7"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1601_37742">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      <b>
                        {item?.customerName} - {item?.transactionRef}
                      </b>
                      <div
                        style={{
                          color: "#667085",
                          margin: "6px 0",
                        }}
                      >
                        Customer Name: {item?.customerUserName}
                      </div>
                      <div>
                        {moment(item?.activityTime).format(
                          "DD-MMM-YYYY : hh:mma"
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AuditStyle>{" "}
      </BodyLayout>
    </>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .content {
    margin-bottom: 40px;
  }
  .content .heading {
    font-weight: 600;
    font-size: 28px;
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
`;
const AuditStyle = styled.div`
  border-radius: 16px;
  background-color: white;
  overflow: hidden;
  padding: 40px 0;
  .audit {
    padding: 20px;
    background-color: #f3f9fe;
    display: flex;
    align-items: center;
    border-top: 1px solid #e7e7e7;
    cursor: pointer;
  }
`;
