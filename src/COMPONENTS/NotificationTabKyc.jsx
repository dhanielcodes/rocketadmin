import React, { useState } from "react";
import styled from "styled-components";
import { getKycNotifications, markKycNotifAsRead } from "../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@arco-design/web-react";
import { Link } from "react-router-dom";

export default function NotificationTabKyc({ close }) {
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
    <NotStyle>
      <div
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "18px",
          borderBottom: " 1px solid #d4d4d4",
        }}
      >
        <span style={{ transform: "translateX(200px)" }}>Alerts</span>
        <svg
          onClick={() => {
            close();
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1064_127530)">
            <path
              d="M7.22688 5.63609C6.78754 5.19675 6.07523 5.19675 5.63589 5.63609C5.19654 6.07543 5.19655 6.78774 5.63589 7.22708L10.4089 12L5.63593 16.773C5.19659 17.2123 5.19659 17.9246 5.63593 18.364C6.07527 18.8033 6.78758 18.8033 7.22692 18.364L11.9998 13.591L16.7728 18.364C17.2122 18.8033 17.9245 18.8033 18.3638 18.364C18.8031 17.9247 18.8031 17.2124 18.3638 16.773L13.5908 12L18.3639 7.22703C18.8032 6.78769 18.8032 6.07538 18.3639 5.63604C17.9245 5.1967 17.2122 5.1967 16.7729 5.63604L11.9998 10.4091L7.22688 5.63609Z"
              fill="#464F60"
            />
          </g>
          <defs>
            <clipPath id="clip0_1064_127530">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div
        style={{
          overflow: "hidden",
          overflowY: "scroll",
          height: "400px",
        }}
      >
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
            <Skeleton />{" "}
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
        {data?.data?.slice(0, 5)?.map((item) => {
          return isLoading || isFetching || loading ? (
            ""
          ) : (
            <div
              className="datum"
              onClick={() => {
                markAsRead(item?.transactionRef);
              }}
              style={{
                padding: "16px",
                background: "#F3F9FE",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                borderBottom: "1px solid #e2e2e2",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <svg
                  style={{ marginRight: "10px" }}
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="25"
                    stroke={
                      item?.documentCheckResult === "Passed"
                        ? "#00A85A"
                        : "#ff6363"
                    }
                    fill-opacity="0.1"
                  />
                  <path
                    d="M29.6783 19.9334L19.0717 30.54"
                    stroke={
                      item?.documentCheckResult === "Passed"
                        ? "#00A85A"
                        : "#ff6363"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.1407 19.9513L29.6783 19.9329L29.6606 28.4712"
                    stroke={
                      item?.documentCheckResult === "Passed"
                        ? "#00A85A"
                        : "#ff6363"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="inner_dets">
                  <div>
                    <b>
                      {" "}
                      {item?.userName} - {item?.userId}
                    </b>
                  </div>
                  <b
                    style={{
                      color:
                        item?.documentCheckResult === "Passed"
                          ? "#00A85A"
                          : "#ff6363",
                    }}
                  >
                    {item?.depositStatus}
                  </b>
                  <div
                    style={{
                      color: "#667085",
                    }}
                  >
                    Verification Type: {item?.verificationType}
                  </div>
                </div>
              </div>
              <div>1 min ago</div>
            </div>
          );
        })}
      </div>
      <Link to="/alerts">
        <div className="view">View All Alerts</div>
      </Link>
    </NotStyle>
  );
}

const NotStyle = styled.div`
  position: absolute;
  //pointer-events: none;
  //opacity: 0;
  top: 0;
  right: 20px;
  background: white;
  margin-top: 50px;
  border-radius: 20px;
  width: 500px;

  border: 1px solid #d4d4d4;
  z-index: 10;
  line-height: normal;
  .datum:hover {
    background: #f3f9fe;
  }
  .inner_dets div {
    margin: 10px 0px;
  }
  .view {
    padding: 20px;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #d4d4d4;
  }
`;
