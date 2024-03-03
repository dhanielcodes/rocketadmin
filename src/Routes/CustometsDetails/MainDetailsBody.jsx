import React from "react";
import logo from "../../images/logo.svg";
import { useSearchParams } from "react-router-dom";

export default function CustomerDetailsTop({
  customerDetails,
  profile,
  mail,
  phone,
}) {
  const [params] = useSearchParams();
  const user = JSON.parse(localStorage.getItem("customer_details"));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "100%",
        paddingTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          padding: "0 30px",
        }}
      >
        {customerDetails?.profileImageURL ? (
          <img
            src={customerDetails?.profileImageURL}
            alt=""
            style={{
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "3000px",
              marginRight: "10px",
            }}
          />
        ) : (
          <svg
            style={{
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            width="85"
            height="85"
            viewBox="0 0 85 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1064_127863)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M42.4997 7.08203C22.939 7.08203 7.08301 22.9381 7.08301 42.4987C7.08301 62.0593 22.939 77.9154 42.4997 77.9154C62.0603 77.9154 77.9163 62.0593 77.9163 42.4987C77.9163 22.9381 62.0603 7.08203 42.4997 7.08203ZM30.1038 33.6445C30.1038 32.0167 30.4245 30.4048 31.0474 28.9009C31.6704 27.3969 32.5834 26.0304 33.7345 24.8794C34.8856 23.7283 36.2521 22.8152 37.756 22.1923C39.2599 21.5693 40.8718 21.2487 42.4997 21.2487C44.1275 21.2487 45.7394 21.5693 47.2434 22.1923C48.7473 22.8152 50.1138 23.7283 51.2649 24.8794C52.4159 26.0304 53.329 27.3969 53.9519 28.9009C54.5749 30.4048 54.8955 32.0167 54.8955 33.6445C54.8955 36.9321 53.5895 40.085 51.2649 42.4097C48.9402 44.7344 45.7873 46.0404 42.4997 46.0404C39.2121 46.0404 36.0592 44.7344 33.7345 42.4097C31.4098 40.085 30.1038 36.9321 30.1038 33.6445ZM64.6634 60.1504C62.0123 63.4853 58.6419 66.1781 54.804 68.0278C50.9662 69.8774 46.76 70.836 42.4997 70.832C38.2394 70.836 34.0332 69.8774 30.1953 68.0278C26.3575 66.1781 22.9871 63.4853 20.3359 60.1504C26.077 56.0314 33.9111 53.1237 42.4997 53.1237C51.0882 53.1237 58.9224 56.0314 64.6634 60.1504Z"
                fill="#D3D0D0"
              />
            </g>
            <defs>
              <clipPath id="clip0_1064_127863">
                <rect width="85" height="85" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "22px",
                textTransform: "capitalize",
                marginRight: "10px",
              }}
            >
              {user?.firstName + " " + user?.surName}
            </div>

            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  color: "#63666A",
                  marginBottom: "3%",
                }}
              >
                Reference
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#333B4A",
                  fontWeight: "700",
                  marginBottom: "3%",
                }}
              >
                {user?.userId}
              </div>
            </div>

            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  color: "#63666A",
                  marginBottom: "3%",
                }}
              >
                Registration Date
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#333B4A",
                  fontWeight: "700",
                  marginBottom: "3%",
                }}
              >
                {user?.dateCreated}
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  color: "#63666A",
                  marginBottom: "3%",
                }}
              >
                Referred By Agent
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#333B4A",
                  fontWeight: "700",
                  marginBottom: "3%",
                }}
              >
                {user?.agentId}
              </div>
            </div>
          </div>

          <div
            style={{
              alignSelf: "flex-start",
              justifySelf: "flex-start",
            }}
          >
            <div
              style={{
                padding: "6px",
                borderRadius: "7px",
                background: user?.status ? "#2dda58" : "#ff6363",
                color: "white",
                width: "fit-content",
                fontWeight: "700",
                marginLeft: "auto",
              }}
            >
              {user?.status ? "Active" : "Inactive"}
            </div>

            <div
              style={{
                padding: "6px",
                borderRadius: "7px",
                fontSize: "14px",
                background: user?.isKYCCompleted
                  ? "#2dda58"
                  : user?.isKYCCompleted
                  ? "#ffe063"
                  : "#ff6363",
                color: "white",
                width: "100px",
                textAlign: "center",
                fontWeight: "700",
                marginTop: "10px",
                marginLeft: "auto",
              }}
            >
              KYC: {user?.isKYCCompleted ? "Verified" : "Not Verified"}
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          padding: "0 30px",
          borderLeft: "1px solid #e1e1e1",
        }}
      >
        <div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#63666A",
                marginBottom: "3%",
              }}
            >
              Address
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#333B4A",
                fontWeight: "700",
                marginBottom: "3%",
              }}
            >
              {user?.address}
            </div>
          </div>

          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#63666A",
                marginBottom: "3%",
              }}
            >
              Mobile Number
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "#333B4A",
                fontWeight: "700",
                marginBottom: "3%",
              }}
            >
              {user?.phone}
            </div>
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#63666A",
                marginBottom: "3%",
              }}
            >
              Email Address
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "#333B4A",
                fontWeight: "700",
                marginBottom: "3%",
              }}
            >
              {user?.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
