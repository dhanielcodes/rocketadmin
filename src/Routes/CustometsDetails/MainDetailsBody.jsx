import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import AppModal from "../../COMPONENTS/AppModal";
import AppInput from "../../reuseables/AppInput";
import AppButton from "../../reuseables/AppButton";
import {
  updateauseraccounttype,
  updateuseraddress,
  updateuserdob,
  updateuseremail,
  updateusername,
  updateuserphone,
} from "../../services/Dashboard";
import AppSelect from "../../reuseables/AppSelect";

export default function CustomerDetailsTop({
  customerDetails,
  profile,
  mail,
  phone,
  from,
  refetch,
}) {
  const navigate = useNavigate();

  const faceScore = customerDetails?.faceMatchConfidenceScore?.toFixed();

  const [modal, setModal] = useState(false);

  const { mutate: mutateupdateusername, isLoading: isLoadingupdateusername } =
    useMutation({
      mutationFn: updateusername,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });
  const { mutate: mutateupdateuseremail, isLoading: isLoadingupdateuseremail } =
    useMutation({
      mutationFn: updateuseremail,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });
  const { mutate: mutateupdateuserphone, isLoading: isLoadingupdateuserphone } =
    useMutation({
      mutationFn: updateuserphone,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });
  const {
    mutate: mutateupdateuseraddress,
    isLoading: isLoadingupdateuseraddress,
  } = useMutation({
    mutationFn: updateuseraddress,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });
  const { mutate: mutateupdateuserdob, isLoading: isLoadingupdateuserdob } =
    useMutation({
      mutationFn: updateuserdob,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });
  const {
    mutate: mutateupdateauseraccounttype,
    isLoading: isLoadingupdateauseraccounttype,
  } = useMutation({
    mutationFn: updateauseraccounttype,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const [type, setType] = useState({});
  const [user, setUser] = useState({
    firstName: "",
    surName: "",
    email: "",
    phone: "",
    dob: "",
    accountType: "",
    address: "",
  });

  const nType = {
    label: user.accountType === 1 ? "individual" : "Business",
    value: user.accountType,
  };

  useEffect(() => {
    setUser(customerDetails);
  }, [customerDetails.accountType]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "100%",
        paddingTop: "30px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "30px",
          cursor: "pointer",
        }}
      >
        <FiEdit
          onClick={() => {
            setModal(true);
          }}
          style={{
            width: "22px",
            height: "22px",
          }}
        />
      </div>
      {modal && (
        <AppModal
          closeModal={() => {
            setModal(false);
          }}
          heading="Update User"
          maxWidth={600}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "14px",
              paddingBottom: "40px",
            }}
          >
            <div
              style={{
                padding: "14px",
                border: "1px solid #d2d2d2",
                borderRadius: "10px",
              }}
            >
              <AppInput
                placeholder="Update Last Name"
                width="inherit"
                label="Update Last Name"
                value={user.surName}
                onChange={(e) => {
                  setUser({
                    ...user,
                    surName: e.target.value,
                  });
                }}
              />
              &nbsp;
              <AppInput
                placeholder="Update First Name"
                width="inherit"
                value={user.firstName}
                label="Update First Name"
                onChange={(e) => {
                  setUser({
                    ...user,
                    firstName: e.target.value,
                  });
                }}
              />
              &nbsp;
              <AppButton
                disabled={isLoadingupdateusername}
                loading={isLoadingupdateusername}
                placeholder="Update"
                onClick={() => {
                  mutateupdateusername({
                    adminId: 0,
                    user: {
                      userId: customerDetails?.userId,
                      firstName: user.firstName,
                      surName: user.surName,
                    },
                  });
                }}
                margin="0"
              />
            </div>

            <div
              style={{
                padding: "14px",
                border: "1px solid #d2d2d2",
                borderRadius: "10px",
              }}
            >
              <AppInput
                placeholder="Update Email"
                width="inherit"
                value={user.email}
                label="Update Email"
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
              />
              &nbsp;
              <AppButton
                placeholder="Update"
                onClick={() => {
                  mutateupdateuseremail({
                    adminId: 0,
                    user: {
                      userId: customerDetails?.userId,
                      email: user.email,
                    },
                  });
                }}
                margin="0"
              />
            </div>

            <div
              style={{
                padding: "14px",
                border: "1px solid #d2d2d2",
                borderRadius: "10px",
              }}
            >
              <AppInput
                placeholder="Update Phone"
                width="inherit"
                value={user.phone}
                label="Update Phone"
                type={"number"}
                onChange={(e) => {
                  setUser({
                    ...user,
                    phone: e.target.value,
                  });
                }}
              />
              &nbsp;
              <AppButton
                disabled={isLoadingupdateuserphone}
                loading={isLoadingupdateuserphone}
                placeholder="Update"
                onClick={() => {
                  mutateupdateuserphone({
                    adminId: 0,
                    user: {
                      userId: customerDetails?.userId,
                      phone: user.phone,
                    },
                  });
                }}
                margin="0"
              />
            </div>

            <div
              style={{
                padding: "14px",
                border: "1px solid #d2d2d2",
                borderRadius: "10px",
              }}
            >
              <AppInput
                placeholder="Update Address"
                width="inherit"
                label="Update Address"
                value={user.address}
                onChange={(e) => {
                  setUser({
                    ...user,
                    address: e.target.value,
                  });
                }}
              />
              &nbsp;
              <AppButton
                disabled={isLoadingupdateuseraddress}
                loading={isLoadingupdateuseraddress}
                placeholder="Update"
                onClick={() => {
                  mutateupdateuseraddress({
                    adminId: 0,
                    user: {
                      userId: customerDetails?.userId,
                      address: user.address,
                      postcode: "100101",
                      country: {
                        id: user.country.id,
                      },
                      state: {
                        id: user.city.id,
                      },
                      city: {
                        id: user.city.id,
                      },
                    },
                  });
                }}
                margin="0"
              />
            </div>

            <div
              style={{
                padding: "14px",
                border: "1px solid #d2d2d2",
                borderRadius: "10px",
              }}
            >
              <AppInput
                placeholder="Update DOB"
                width="inherit"
                type="date"
                label="Update DOB"
                value={user.dob}
                onChange={(e) => {
                  setUser({
                    ...user,
                    dob: e.target.value,
                  });
                }}
              />
              &nbsp;
              <AppButton
                disabled={isLoadingupdateuserdob}
                loading={isLoadingupdateuserdob}
                placeholder="Update"
                onClick={() => {
                  mutateupdateuserdob({
                    adminId: 0,
                    user: {
                      userId: customerDetails?.userId,
                      dob: user.dob,
                    },
                  });
                }}
                margin="0"
              />
            </div>

            <div
              style={{
                padding: "14px",
                border: "1px solid #d2d2d2",
                borderRadius: "10px",
              }}
            >
              <AppSelect
                label="Update Account Type"
                styles={{
                  padding: "0px !important",
                  // You can add custom styles here if needed
                }}
                options={[
                  { label: "individual", value: 1 },
                  { label: "Business", value: 2 },
                ]}
                // value={use} // Pass the selected option to the value prop
                onChange={(e) => {
                  console.log(e, "ddddsdsf");
                  setType(e);
                  setUser({
                    ...user,
                    accountType: e.value,
                  });
                }}
                value={nType || type} // Handle option selection
                placeholder="Please select a account type"
                showSearch
                isClearable={true} // Allow clearing the selected option
              />
              &nbsp;
              <AppButton
                placeholder="Update"
                disabled={isLoadingupdateauseraccounttype}
                loading={isLoadingupdateauseraccounttype}
                onClick={() => {
                  mutateupdateauseraccounttype({
                    adminId: 0,
                    user: {
                      userId: customerDetails?.userId,
                      accountType: type.value,
                    },
                  });
                }}
                margin="0"
              />
            </div>
          </div>
        </AppModal>
      )}
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
              {customerDetails?.firstName + " " + customerDetails?.surName}
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
                {customerDetails?.userId}
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
                {customerDetails?.dateCreated}
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
                Date of Birth
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#333B4A",
                  fontWeight: "700",
                  marginBottom: "3%",
                }}
              >
                {customerDetails?.dob}
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
                {customerDetails?.agentId || "None"}
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
                background:
                  customerDetails?.status === "InActive"
                    ? "#ff6363"
                    : customerDetails?.status === "inactive"
                    ? "#ff6363"
                    : customerDetails?.status === "Active"
                    ? "#37d744"
                    : "#d7ac37",
                color: "white",
                width: "fit-content",
                fontWeight: "700",
                marginLeft: "auto",
              }}
            >
              {customerDetails?.status}
            </div>
            <div
              style={{
                padding: "6px",
                borderRadius: "7px",
                fontSize: "14px",
                background: customerDetails?.isKYCCompleted
                  ? "#2dda58"
                  : customerDetails?.isKYCCompleted
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
              KYC:{" "}
              {customerDetails?.isKYCCompleted ? "Verified" : "Not Verified"}
            </div>
            <br />
            {from === "customer" ? (
              <>
                <hr />
                <br />
                <div>
                  {/*  <div
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#313131",
                marginBottom: "3%",
                textAlign: "right",
              }}
            >
              Action
            </div> */}
                  <div
                    onClick={() => {
                      navigate(
                        `/send-money?id=${customerDetails?.userId}&step=2`
                      );
                      localStorage.setItem(
                        "userSend",
                        JSON.stringify(customerDetails)
                      );
                    }}
                    style={{
                      padding: "6px",
                      borderRadius: "7px",
                      fontSize: "14px",
                      background: "#000000",
                      color: "white",
                      width: "100px",
                      textAlign: "center",
                      fontWeight: "700",
                      marginLeft: "auto",
                      cursor: "pointer",
                    }}
                  >
                    Send Money
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
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
              {customerDetails?.address}
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
              {customerDetails?.phone}
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
                marginBottom: "5%",
              }}
            >
              {customerDetails?.email}
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
              Face Confidence Match Score
            </div>
            <div
              style={{
                borderRadius: "7px",
                overflow: "hidden",
                background: "#d8d8d8",
                width: "300px",
                fontWeight: "700",
              }}
            >
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: "7px",
                  background:
                    faceScore < 50
                      ? "#ff6363"
                      : faceScore < 50
                      ? "#ff6363"
                      : faceScore > 75
                      ? "#37d744"
                      : "#d7ac37",
                  color: "white",
                  width: `${faceScore}%`,
                  fontWeight: "700",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                  }}
                >
                  {faceScore}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
