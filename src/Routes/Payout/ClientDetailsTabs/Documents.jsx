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
import { useSearchParams } from "react-router-dom";
import { updateFile } from "../../../services/PayoutDashboard";

export default function Documents({ clientDetails, refetch }) {
  const downloadImage = (image_url, image) => {
    saveAs(image_url, image); // Put your image URL here.
  };

  const [params] = useSearchParams();

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [type, setType] = useState();
  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: updateFile,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success(data?.message);
        setModal(false);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);
      toast.error("Request wasn't created");

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });
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
          closeModal={() => {
            setModal(false);
            setFile();
            setImage();
          }}
          heading="Edit Document"
        >
          <div style={{ width: "90%" }}>
            <FileUpload
              setValue={setImage}
              value={image}
              placeholder="Click to update file"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "10px",
              marginTop: "30px",
            }}
          >
            <div></div>
            <button
              onClick={() => {
                setModal(false);
                setFile();
                setImage();
              }}
              className="cancel"
            >
              {" "}
              <span>Cancel</span>
            </button>
            <button
              onClick={() => {
                mutate({
                  objectId: params.get("userId"),
                  action: 1,
                  fileName: file,
                  fileURL: image?.secure_url,
                });
              }}
              className="confirm"
            >
              {" "}
              <span>{mutateLoading ? "sending..." : "Submit"}</span>
            </button>
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
          closeModal={() => {
            setModal2(false);
            setFile();
            setImage();
          }}
          heading={type === "view" ? "" : "Delete Document"}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <img
              style={{
                width: "130px",
              }}
              src={image}
            />
          </div>

          {type !== "view" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridGap: "10px",
                marginTop: "30px",
              }}
            >
              <div></div>
              <button
                onClick={() => {
                  setModal2(false);
                  setFile();
                  setImage();
                }}
                className="cancel"
              >
                {" "}
                <span>Cancel</span>
              </button>
              <button
                onClick={() => {
                  mutate({
                    objectId: params.get("userId"),
                    action: 0,
                    fileName: file,
                    fileURL: image,
                  });
                }}
                className="confirm"
              >
                {" "}
                <span>{mutateLoading ? "sending..." : "Submit"}</span>
              </button>
            </div>
          )}
        </AppModal>
      </div>
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

                <div
                  onClick={() => {
                    setModal2(true);
                    setType("view");
                    setImage(clientDetails?.formCo2URL);
                  }}
                  style={{
                    width: "100%",
                    wordBreak: "break-all",
                    color: "#3769b9",
                    cursor: "pointer",
                  }}
                >
                  FormCo2Url
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModal(true);
                    setFile("formco2");
                  }}
                />
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
                <MDeleteIcon
                  onClick={() => {
                    setModal2(true);
                    setType();
                    setImage(clientDetails?.formCo2URL);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
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

                <div
                  onClick={() => {
                    setModal2(true);
                    setType("view");
                    setImage(clientDetails?.formCo7URL);
                  }}
                  style={{
                    width: "100%",
                    wordBreak: "break-all",
                    color: "#3769b9",
                    cursor: "pointer",
                  }}
                >
                  FormCo7Url
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModal(true);
                    setFile("formco7");
                  }}
                />
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
                <MDeleteIcon
                  onClick={() => {
                    setType();

                    setModal2(true);
                    setImage(clientDetails?.formCo7URL);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
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

                <div
                  onClick={() => {
                    setModal2(true);
                    setType("view");
                    setImage(clientDetails?.utilityBill);
                  }}
                  style={{
                    width: "100%",
                    wordBreak: "break-all",
                    color: "#3769b9",
                    cursor: "pointer",
                  }}
                >
                  Utility Bill
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <TiPencil
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModal(true);
                    setFile("utilitybill");
                  }}
                />
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
                <MDeleteIcon
                  onClick={() => {
                    setType();

                    setModal2(true);
                    setImage(clientDetails?.utilityBill);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
