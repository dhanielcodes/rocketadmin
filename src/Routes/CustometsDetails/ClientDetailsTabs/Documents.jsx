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
import { Link, useSearchParams } from "react-router-dom";
import { updateFile } from "../../../services/PayoutDashboard";
import CustomTable from "../../../reuseables/CustomTable";
import SectionHeader from "../../../reuseables/SectionHeader";

export default function Documents({ clientDetails, refetch }) {
  const downloadImage = (image_url, image) => {
    saveAs(image_url, image); // Put your image URL here.
  };

  const [params] = useSearchParams();

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [loading, setLoading] = useState(false);

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
              setLoading={setLoading}
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
              disabled={mutateLoading || loading}
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
              <span>{mutateLoading || loading ? "sending..." : "Submit"}</span>
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
          padding="40px"
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
                width: "100%",
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
                disabled={loading || mutateLoading}
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
                <span>
                  {mutateLoading || loading ? "sending..." : "Submit"}
                </span>
              </button>
            </div>
          )}
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
        {/*         <div>
          <CustomTable  noData={clientDetails?.data?.length}
          loading={isLoading || isFetching}
          Apidata={newData}
          tableColumns={columns} />
        </div> */}
      </div>
    </div>
  );
}
