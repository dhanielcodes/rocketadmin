import React, { useState } from "react";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import { TiDelete, TiDownload, TiPen, TiPencil } from "react-icons/ti";
import SmallDownload from "../../../assets/icons/Download";
import MDeleteIcon from "../../../assets/icons/MDeleteIcon";
import { isError, useMutation, useQuery } from "@tanstack/react-query";
import AppModal from "../../../COMPONENTS/AppModal";
import AppInput from "../../../reuseables/AppInput";
import { saveAs } from "file-saver";
import FileUpload from "../../../services/FileUpload";
import { uploadFile } from "../../../services/Auth";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { updateFile } from "../../../services/PayoutDashboard";
import CustomTable from "../../../reuseables/CustomTable";
import SectionHeader from "../../../reuseables/SectionHeader";
import { Dropdown, Menu } from "@arco-design/web-react";
import {
  IconDownload,
  IconEye,
  IconMoreVertical,
} from "@arco-design/web-react/icon";

const Droplist = ({ action, setModal, download, edit, setFront, setBack }) => (
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
        View ID Back Page
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
        Download ID
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
        setModal(true);
        action("cancelTransaction");
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
  </Menu>
);

export default function Documents({ clientDetails, refetch }) {
  const [params] = useSearchParams();

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
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
      title: "S/N",
      dataIndex: "id",
      width: 40,

      //render: () => "Other",
    },
    {
      title: "NAME ON ID",
      dataIndex: "nameOnTheDocument",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "ID TYPE",
      dataIndex: "documentType['name']",
      width: 240,

      //render: () => "Other",
    },
    {
      title: "ID NAME",
      dataIndex: "nameOnTheDocument",
      width: 190,
    },
    {
      title: "ID NUMBER",
      dataIndex: "documentNumber",
      width: 190,
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

  const newData = clientDetails?.userKYCDocuments?.map((item) => {
    return {
      ...item,
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
                  setBack={() => {
                    setImage(item?.documentBackPageURL);
                    setModal(true);
                  }}
                  download={() => {}}
                  edit={() => {
                    navigate(
                      `/edit-document?userId=${params.get(
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
      <div>
        <div>
          <div
            style={{
              paddingBottom: "20px",
              borderBottom: "1px solid #d8d8d8",
            }}
          >
            <SectionHeader title="ID Documents" />
          </div>
          <div
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              marginLeft: "auto",
              width: "fit-content",
            }}
          >
            <Link to={`/new-document?userId=${params.get("userId")}`}>
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
