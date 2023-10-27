import React from "react";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import { TiDelete, TiDownload, TiPen, TiPencil } from "react-icons/ti";
import SmallDownload from "../../../assets/icons/Download";
import MDeleteIcon from "../../../assets/icons/MDeleteIcon";

export default function Documents({ clientDetails }) {
  return (
    <div>
      <div>
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            ID Documents
          </div>
          <div>View, edit and update your company ID</div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #EAECF0",
              borderBottom: "1px solid #EAECF0",
              paddingTop: "20px",
              marginTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <span
              style={{
                width: "40%",
                fontSize: "16px",
              }}
            >
              {" "}
              Form Co2
            </span>
            <div
              style={{
                padding: "14px",
                border: "1px dashed #c1c1c1",
                borderRadius: "10px",
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DownloadIcon
                  style={{
                    marginRight: "10px",
                  }}
                />

                <div style={{ width: "50%", wordBreak: "break-all" }}>
                  {clientDetails?.formCo2URL}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil />
                <SmallDownload
                  style={{
                    marginLeft: "14px",
                    marginRight: "14px",
                  }}
                />
                <MDeleteIcon />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderTop: "1px solid #EAECF0",
              borderBottom: "1px solid #EAECF0",
              paddingTop: "20px",
              marginTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <span
              style={{
                width: "40%",
                fontSize: "16px",
              }}
            >
              {" "}
              Form Co2
            </span>
            <div
              style={{
                padding: "14px",
                border: "1px dashed #c1c1c1",
                borderRadius: "10px",
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DownloadIcon
                  style={{
                    marginRight: "10px",
                  }}
                />

                <div style={{ width: "50%", wordBreak: "break-all" }}>
                  {clientDetails?.formCo7URL}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil />
                <SmallDownload
                  style={{
                    marginLeft: "14px",
                    marginRight: "14px",
                  }}
                />
                <MDeleteIcon />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderTop: "1px solid #EAECF0",
              borderBottom: "1px solid #EAECF0",
              paddingTop: "20px",
              marginTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <span
              style={{
                width: "40%",
                fontSize: "16px",
              }}
            >
              {" "}
              Utility Bill
            </span>
            <div
              style={{
                padding: "14px",
                border: "1px dashed #c1c1c1",
                borderRadius: "10px",
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DownloadIcon
                  style={{
                    marginRight: "10px",
                  }}
                />

                <div style={{ width: "50%", wordBreak: "break-all" }}>
                  {clientDetails?.utilityBill}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil />
                <SmallDownload
                  style={{
                    marginLeft: "14px",
                    marginRight: "14px",
                  }}
                />
                <MDeleteIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
