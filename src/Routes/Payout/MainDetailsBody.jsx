import React from "react";
import logo from "../../images/logo.svg";

export default function MainDetailsBody({ clientUser, profile, mail, phone }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <div className="left_body">
        <div className="profile">PROFILE</div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "80%",
            }}
          >
            <div
              className="rounded-full overflow-hidden w-[8vw] h-[8vw] rounded-fulls mr-[2%]"
              style={{
                borderRadius: "10000px",
                overflow: "hidden",
                width: "160px",
                height: "160px",
                marginRight: "2%",
              }}
            >
              {/* <img
                className="w-full- h-full"
                style={{ width: "100%", height: "100%" }}
                src="https://img.icons8.com/user"
                alt=""
              /> */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#e1e1e14f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={logo}
                  style={{
                    width: "50%",
                    height: "50%",
                    opacity: 0.3,
                    mixBlendMode: "hard-light",
                  }}
                  alt=""
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.8vw",
                    textTransform: "capitalize",
                    marginRight: "10px",
                  }}
                >
                  {clientUser?.companyName}
                </div>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: "10000px",
                    background:
                      clientUser?.status !== "Suspended"
                        ? "#37d7446c"
                        : "#ff63634b",
                    color: clientUser?.status !== "Suspended" ? "green" : "red",
                    width: "fit-content",
                    fontWeight: "700",
                  }}
                >
                  {clientUser?.status !== "Suspended" ? "Active" : "Inactive"}
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
                  Client ID
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "#333B4A",
                    fontWeight: "700",
                    marginBottom: "3%",
                  }}
                >
                  {clientUser?.clientKeys?.clientId}
                </div>
              </div>

              <div
                style={{
                  marginBottom: "40px",
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
                  {clientUser?.dateRegistered}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              className="text-[1vw] text-[#909090] my-[2%]"
              style={{
                fontSize: "22px",
                color: "#909090",
                marginBottom: "2%",
                marginTop: "2%",
              }}
            >
              CONTACT INFORMATION
            </div>

            <div
              className="flex items-start my-[5%]"
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "4px",
                }}
                className="w-14 h-14 mr-1"
                src={mail}
                alt=""
              />
              <div
                className="ml-[4%]"
                style={{
                  marginLeft: "4%",
                }}
              >
                <div
                  className="text-[1vw] mb-[2%]"
                  style={{
                    fontSize: "18px",
                    marginBottom: "2%",
                  }}
                >
                  Email
                </div>
                <div
                  className="text-[1vw] text-[#63666A] mb-[3%]"
                  style={{
                    fontSize: "18px",
                    color: "#63666A",
                    marginBottom: "3%",
                  }}
                >
                  {clientUser?.email}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "5%",
                marginTop: "5%",
              }}
            >
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "4px",
                }}
                src={phone}
                alt=""
              />
              <div
                className="ml-[4%]"
                style={{
                  marginLeft: "4%",
                }}
              >
                <div
                  className="text-[1vw] mb-[2%]"
                  style={{
                    fontSize: "18px",
                    marginBottom: "2%",
                  }}
                >
                  Phone
                </div>
                <div
                  className="text-[1vw] text-[#63666A] mb-[3%]"
                  style={{
                    fontSize: "18px",
                    color: "#63666A",
                    marginBottom: "3%",
                  }}
                >
                  {clientUser?.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
