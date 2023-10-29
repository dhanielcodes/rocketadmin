import React from "react";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import { TiDelete, TiDownload, TiPen, TiPencil } from "react-icons/ti";
import SmallDownload from "../../../assets/icons/Download";
import MDeleteIcon from "../../../assets/icons/MDeleteIcon";
import { saveAs } from "file-saver";

export default function Documents({ clientDetails }) {
  const downloadImage = (image_url, image) => {
    saveAs(image_url, image); // Put your image URL here.
  };
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

                <a
                  href={clientDetails?.formCo2URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <div
                    style={{
                      width: "100%",
                      wordBreak: "break-all",
                      color: "#3769b9",
                    }}
                  >
                    FormCo2Url
                  </div>
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil />
                <SmallDownload
                  onClick={() => {
                    downloadImage(clientDetails?.formCo2URL, "formCo2URL.png");
                  }}
                  style={{
                    marginLeft: "14px",
                    marginRight: "14px",
                    cursor: "pointer",
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
              Form Co7
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

                <a
                  href={clientDetails?.formCo7URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <div
                    style={{
                      width: "100%",
                      wordBreak: "break-all",
                      color: "#3769b9",
                    }}
                  >
                    FormCo7Url
                  </div>
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil />
                <SmallDownload
                  onClick={() => {
                    downloadImage(clientDetails?.formCo7URL, "formCo7URL.png");
                  }}
                  style={{
                    marginLeft: "14px",
                    marginRight: "14px",
                    cursor: "pointer",
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

                <a href={clientDetails?.utilityBill} target="_blank">
                  <div
                    style={{
                      width: "100%",
                      wordBreak: "break-all",
                      color: "#3769b9",
                    }}
                  >
                    Utility Bill
                  </div>
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil />
                <SmallDownload
                  onClick={() => {
                    downloadImage(
                      clientDetails?.utilityBill,
                      "utility-bill.png"
                    );
                  }}
                  style={{
                    marginLeft: "14px",
                    marginRight: "14px",
                    cursor: "pointer",
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
