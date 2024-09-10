import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import AppModal from "../../../COMPONENTS/AppModal";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CustomTable from "../../../reuseables/CustomTable";
import SectionHeader from "../../../reuseables/SectionHeader";
import { Dropdown, Menu, Input } from "@arco-design/web-react";
import {
  IconDownload,
  IconEye,
  IconMoreVertical,
} from "@arco-design/web-react/icon";
import {
  activateAccount,
  addcommenttouserkycdocument,
  deactivateAccount,
  markuseridasverified,
  viewuserkycdocumentcomment,
} from "../../../services/Dashboard";
import Btn from "../../../reuseables/Btn";
const TextArea = Input.TextArea;

const Droplist = ({
  action,
  setModal,
  download,
  edit,
  setFront,
  setBack,
  setAdd,
  setVer,
  ver,
}) => (
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
        setFront();
      }}
      key="1"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconEye
        fontSize={20}
        style={{
          margin: 0,
        }}
      />
      <span
        style={{
          marginLeft: "10px",
        }}
      >
        View ID Front Page
      </span>
    </Menu.Item>

    <Menu.Item
      key="2"
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        download();
      }}
    >
      <IconDownload
        fontSize={20}
        style={{
          margin: 0,
        }}
      />
      <span
        style={{
          marginLeft: "10px",
        }}
      >
        Download Front ID
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        edit();
      }}
      key="3"
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
        <g clip-path="url(#clip0_4000_16424)">
          <path
            d="M11.334 1.99955C11.5091 1.82445 11.7169 1.68556 11.9457 1.5908C12.1745 1.49604 12.4197 1.44727 12.6673 1.44727C12.9149 1.44727 13.1601 1.49604 13.3889 1.5908C13.6177 1.68556 13.8256 1.82445 14.0007 1.99955C14.1757 2.17465 14.3146 2.38252 14.4094 2.61129C14.5042 2.84006 14.5529 3.08526 14.5529 3.33288C14.5529 3.58051 14.5042 3.8257 14.4094 4.05448C14.3146 4.28325 14.1757 4.49112 14.0007 4.66622L5.00065 13.6662L1.33398 14.6662L2.33398 10.9995L11.334 1.99955Z"
            stroke="#464F60"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_4000_16424">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <span
        style={{
          marginLeft: "10px",
        }}
      >
        Edit Document
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        setBack();
      }}
      key="4"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconEye
        fontSize={20}
        style={{
          margin: 0,
        }}
      />
      <span
        style={{
          marginLeft: "10px",
        }}
      >
        View Comments
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        setAdd();
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
        <g clip-path="url(#clip0_4000_16424)">
          <path
            d="M11.334 1.99955C11.5091 1.82445 11.7169 1.68556 11.9457 1.5908C12.1745 1.49604 12.4197 1.44727 12.6673 1.44727C12.9149 1.44727 13.1601 1.49604 13.3889 1.5908C13.6177 1.68556 13.8256 1.82445 14.0007 1.99955C14.1757 2.17465 14.3146 2.38252 14.4094 2.61129C14.5042 2.84006 14.5529 3.08526 14.5529 3.33288C14.5529 3.58051 14.5042 3.8257 14.4094 4.05448C14.3146 4.28325 14.1757 4.49112 14.0007 4.66622L5.00065 13.6662L1.33398 14.6662L2.33398 10.9995L11.334 1.99955Z"
            stroke="#464F60"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_4000_16424">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <span
        style={{
          marginLeft: "10px",
        }}
      >
        Add Comments
      </span>
    </Menu.Item>
    <Menu.Item
      key="6"
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        setVer();
      }}
    >
      <IconDownload
        fontSize={20}
        style={{
          margin: 0,
        }}
      />
      <span
        style={{
          marginLeft: "10px",
        }}
      >
        {ver === "Verified" ? "UnVerify Document" : " Verify Document"}
      </span>
    </Menu.Item>
  </Menu>
);

export default function Documents({ clientDetails, refetch }) {
  const [params] = useSearchParams();

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [image, setImage] = useState();

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action2",
      width: 70,
      //render: () => "Other 2",
      fixed: "left",
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 80,

      //render: () => "Other",
    },
    {
      title: "ID NAME",
      dataIndex: "nameOnTheDocument",
      width: 270,

      //render: () => "Other",
    },

    {
      title: "VERIFIED STATUS",
      dataIndex: "status",
      width: 160,

      //render: () => "Other",
    },
    {
      title: "ID TYPE",
      dataIndex: "documentType['name']",
      width: 280,

      //render: () => "Other",
    },

    {
      title: "ID NUMBER",
      dataIndex: "documentNumber",
      width: 130,
    },

    {
      title: "PLACE OF ISSUE",
      dataIndex: "placeIssued",
      width: 150,

      //render: () => "Other",
    },
    {
      title: "EXPIRY DATE",
      dataIndex: "expiryDate",
      width: 170,

      //render: () => "Other",
    },
    {
      title: "DATE UPLOADED",
      dataIndex: "dateUploaded",
      width: 240,

      //render: () => "Other",
    },
    {
      title: "UPLOADED BY",
      dataIndex: "uploadedBy",
      width: 120,
    },

    {
      title: "VERIFIED BY",
      dataIndex: "verifiedBy",
      width: 120,

      //render: () => "Other",
    },

    {
      title: "VERIFIED DATE",
      dataIndex: "dateIssued",
      width: 240,

      //render: () => "Other",
    },
  ];

  const [document, setDocument] = useState();
  const [modal4, setModal4] = useState(false);
  const [commentId, setCommentId] = useState(false);
  const [vers, setVerS] = useState();
  const downloadFile = () => {
    fetch(clientDetails?.idVerificationReportURL)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = window.document.createElement("a");
        a.href = url;
        a.download = "GBG-PDF.pdf";
        window.document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.error("Error downloading the file", error));
  };
  const [note, setNote] = useState("");
  const {
    data: comments,
    isLoading: viewloading,
    refetch: refetchDocComments,
  } = useQuery({
    queryKey: [commentId],
    queryFn: () => viewuserkycdocumentcomment(commentId),
    enabled: commentId ? true : false,
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: addcommenttouserkycdocument,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        setNote();
        setModal3(false);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const { mutate: ver, isLoading: isLoadingVer } = useMutation({
    mutationFn: markuseridasverified,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        setNote();
        setModal4(false);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const newData = clientDetails?.userKYCDocuments?.map((item) => {
    return {
      ...item,
      status: (
        <div
          style={{
            padding: "6px",
            borderRadius: "7px",
            background:
              item?.verificationStatus === "Verified" ? "#37d744" : "#d7ac37",
            color: "white",
            width: "fit-content",
            fontWeight: "700",
          }}
        >
          {item?.verificationStatus}
        </div>
      ),
      action2: (
        <div
          style={{
            textDecoration: "none",
          }}
          onClick={() => {}}
        >
          <p
            onClick={() => {
              console.log(item);
              setDocument(item);
            }}
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            <Dropdown
              droplist={
                <Droplist
                  setFront={() => {
                    setImage(item?.documentFrontPageURL);
                    setModal(true);
                  }}
                  ver={item?.verificationStatus}
                  setVer={() => {
                    setModal4(true);
                    setCommentId(item?.id);
                    setVerS(item?.verificationStatus);
                  }}
                  setBack={() => {
                    setModal2(true);
                    setCommentId(item?.id);
                    refetchDocComments();
                  }}
                  setAdd={() => {
                    setCommentId(item?.id);
                    setModal3(true);
                  }}
                  download={() => {
                    saveAs(item?.documentFrontPageURL, "id_front"); // Put your image URL here.
                  }}
                  download2={() => {
                    saveAs(item?.documentBackPageURL, "id_back"); // Put your image URL here.
                  }}
                  edit={() => {
                    navigate(
                      `/edit-document?from=${params.get(
                        "from"
                      )}&userId=${params.get(
                        "userId"
                      )}&document=${JSON.stringify(item)}`
                    );
                  }}
                />
              }
              position="bl"
              on
            >
              {" "}
              <div style={{ marginRight: 40 }}>
                <IconMoreVertical
                  style={{
                    fontSize: 15,
                    marginLeft: 6,
                    color: "#000",
                  }}
                />
              </div>
            </Dropdown>
          </p>
        </div>
      ),
    };
  });
  const { mutate: activate, isLoading: activateLoading } = useMutation({
    mutationFn: activateAccount,
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
  const { mutate: deactivate, isLoading: deactivateLoading } = useMutation({
    mutationFn: deactivateAccount,
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
  console.log(newData);
  return (
    <div>
      <div
        style={{
          opacity: modal ? "1" : "0",
          pointerEvents: modal ? "all" : "none",
          transition: "all 0.3s",
        }}
      >
        <AppModal
          padding="40px"
          closeModal={() => {
            setModal(false);
            setImage();
          }}
          heading={"Document"}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <img
              style={{
                width: "100%",
              }}
              src={image}
            />
          </div>
        </AppModal>
      </div>

      <div
        style={{
          opacity: modal2 ? "1" : "0",
          pointerEvents: modal2 ? "all" : "none",
          transition: "all 0.3s",
        }}
      >
        <AppModal
          padding="40px"
          closeModal={() => {
            setModal2(false);
          }}
          heading={"View Comments"}
        >
          {comments?.data?.map((item) => {
            return viewloading ? (
              "loading..."
            ) : comments?.data?.length === 0 ? (
              "No Comments"
            ) : (
              <div
                key={item}
                style={{
                  background: "#e5e5e5",
                  width: "410px",
                  color: "#000000",
                  borderRadius: "12px",
                  padding: "18px",
                  display: "grid",
                  marginTop: "20px",
                  fontSize: "14px",
                }}
              >
                <span>{item?.comment}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontWeight: "700",
                    marginTop: "5px",
                    fontSize: "12px",
                  }}
                >
                  {item?.commentDate}
                </span>
              </div>
            );
          })}
        </AppModal>
      </div>
      {modal4 && (
        <AppModal
          padding="40px"
          closeModal={() => {
            setModal4(false);
          }}
          heading={
            vers === "Verified"
              ? "Confirm UnVerification"
              : "Confirm Verification"
          }
        >
          <Btn
            clicking={() => {
              ver({
                userId: params.get("userId"),
                userKYCDocument: {
                  documentVerificationStatusToggle: vers === "Verified" ? 0 : 1,
                  id: commentId,
                },
              });
            }}
            disabled={isLoadingVer}
          >
            <span
              style={{
                color: "#fff",
              }}
            >
              {isLoadingVer ? "Verifying Document..." : "Verify Document"}
            </span>
          </Btn>
        </AppModal>
      )}
      <div
        style={{
          opacity: modal3 ? "1" : "0",
          pointerEvents: modal3 ? "all" : "none",
          transition: "all 0.3s",
        }}
      >
        <AppModal
          padding="40px"
          closeModal={() => {
            setModal3(false);
          }}
          heading={"Add Comment"}
        >
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
          <br />
          <br />
          <Btn
            clicking={() => {
              mutate({
                userId: params.get("userId"),
                documentId: commentId,
                commentBy: 0,
                comment: note,
              });
            }}
            disabled={isLoading || !note}
          >
            <span
              style={{
                color: "#fff",
              }}
            >
              {isLoading ? "Adding comment..." : "Add Comment"}
            </span>
          </Btn>
        </AppModal>
      </div>
      <div>
        <div>
          <div
            style={{
              paddingBottom: "20px",
              borderBottom: "1px solid #d8d8d8",
            }}
          >
            <SectionHeader title="ID Documents" />
            <div
              style={{
                display: "flex",
                width: "380px",
                marginLeft: "auto",
              }}
            >
              {activateLoading || deactivateLoading ? (
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "7px",
                    fontSize: "14px",
                    background: "#505050",
                    color: "white",
                    width: "fit-content",
                    textAlign: "center",
                    fontWeight: "700",
                    marginLeft: "auto",
                    cursor: "pointer",
                    opacity: 0.3,
                  }}
                >
                  Loading...
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (clientDetails?.status === "Active") {
                      deactivate({
                        userId: clientDetails?.userId,
                      });
                    } else {
                      activate({
                        userId: clientDetails?.userId,
                      });
                    }
                  }}
                  style={{
                    padding: "8px",
                    borderRadius: "7px",
                    fontSize: "14px",
                    background:
                      clientDetails?.status === "Active"
                        ? "#ff6363"
                        : clientDetails?.status === "inactive"
                        ? "#37d744"
                        : clientDetails?.status === "InActive"
                        ? "#37d744"
                        : "#ff6363",
                    color: "white",
                    width: "fit-content",
                    textAlign: "center",
                    fontWeight: "700",
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                >
                  {clientDetails?.status === "Active"
                    ? "Deactivate User"
                    : "Activate User"}
                </div>
              )}
              <div
                onClick={downloadFile}
                style={{
                  padding: "8px",
                  borderRadius: "7px",
                  fontSize: "14px",
                  background: "#505050",
                  color: "white",
                  width: "fit-content",
                  textAlign: "center",
                  fontWeight: "700",
                  marginLeft: "auto",
                  cursor: "pointer",
                }}
              >
                Download ID Verification Report
              </div>
            </div>
          </div>
          <div
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              marginLeft: "auto",
              width: "fit-content",
            }}
          >
            <Link
              to={`/new-document?from=${params.get("from")}&userId=${params.get(
                "userId"
              )}`}
            >
              <button
                onClick={() => {
                  setModal(true);
                }}
                className="confirm"
              >
                {" "}
                <span>Add New Documents</span>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <CustomTable
            noData={newData?.length}
            Apidata={newData || []}
            tableColumns={columns}
          />
        </div>
      </div>
    </div>
  );
}
