import React, { useState, useEffect } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SearchInput from "../reuseables/SearchInput";
import BeneficiaryComponent from "../COMPONENTS/BeneficiaryComponent";
import SendMoneyCustomersTableList from "./SendMoney/SendMoneyCustomersTableList";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import {
  addNewDocument,
  getIdTypes,
  getRoleMeta,
  getUserDocTypes,
  updateDocument,
} from "../services/Dashboard";
import { getCurrencies } from "../services/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import SectionHeader from "../reuseables/SectionHeader";
import AppSelect from "../reuseables/AppSelect";
import AppInput from "../reuseables/AppInput";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Switch } from "@arco-design/web-react";
import AppSelect2 from "../reuseables/AppSelect2";
import FileUpload from "../services/FileUpload";
import FileUpload2 from "../services/FileUpload2";
function EditNewDocument({}) {
  const [params] = useSearchParams();

  const selectDoc = JSON.parse(params.get("document"));

  console.log(selectDoc);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  //   Component useState
  const [beneficiaryComponent, setBeneficiaryComponent] = useState(false);

  const [docType, setDocType] = useState();
  const [docName, setDocName] = useState();
  const [docNumber, setDocNumber] = useState();
  const [issueDate, setIssueDate] = useState();
  const [expiryDate, setExpiryData] = useState();
  const [placeOfIssue, setPlaceOfIssue] = useState();
  const [comments, setComments] = useState();

  const [imageOne, setImageOne] = useState(selectDoc?.documentFrontPageURL);
  const [imageTwo, setImageTwo] = useState(selectDoc?.documentBackPageURL);

  const navigate = useNavigate();

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: updateDocument,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success(data?.transactionRef);
        navigate(
          `/customers-details?from=${params.get("from")}&userId=${params.get(
            "userId"
          )}`
        );
        //refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);
      //toast.error("Rate Request wasn't created");

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const { data: docTypes } = useQuery({
    queryKey: ["getIdTypes"],
    queryFn: () => getUserDocTypes(),
  });

  return (
    <BodyLayout>
      {beneficiaryComponent && (
        <BeneficiaryComponent
          closeBeneficiaryComponent={setBeneficiaryComponent}
        />
      )}
      {beneficiaryComponent ? (
        ""
      ) : (
        <Content>
          <div className="top">
            <p>ID Upload</p>
          </div>

          <div className="main">
            <div
              style={{
                padding: "20px",
              }}
            >
              <SectionHeader title="ID Details" desc="Upload a document" />{" "}
              <hr
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  opacity: "0.4",
                }}
              ></hr>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "40px",
                }}
              >
                <div className="name">
                  <AppSelect
                    label="Document Type"
                    options={docTypes?.data?.map((item) => {
                      return {
                        ...item,
                        label: item?.name,
                        value: item?.id,
                      };
                    })}
                    onChange={(e) => {
                      setDocType(e);
                    }}
                    value={{
                      label: selectDoc?.documentType?.name,
                      value: selectDoc?.documentType?.id,
                    }}
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Name on Document</label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setDocName(e.target.value);
                    }}
                    width="95%"
                    name="username"
                    defaultValue={selectDoc?.nameOnTheDocument}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gridGap: "40px",
                }}
              >
                <div className="name" style={{}}>
                  <label>Document Number</label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setDocNumber(e.target.value);
                    }}
                    width="97%"
                    name="username"
                    defaultValue={selectDoc?.documentNumber}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "40px",
                }}
              >
                <div className="name" style={{}}>
                  <label>Issue Date</label>
                  <AppInput
                    placeholder=""
                    type="date"
                    onChange={(e) => {
                      setIssueDate(e.target.value);
                    }}
                    width="95%"
                    name="username"
                    defaultValue={selectDoc?.dateIssued}
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Expiry Date</label>
                  <AppInput
                    placeholder=""
                    type="date"
                    onChange={(e) => {
                      setExpiryData(e.target.value);
                    }}
                    width="95%"
                    name="username"
                    defaultValue={selectDoc?.expiryDate}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "40px",
                }}
              >
                <div className="name" style={{}}>
                  <label>Place of Issue</label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setPlaceOfIssue(e.target.value);
                    }}
                    width="95%"
                    name="username"
                    defaultValue={selectDoc?.placeIssued}
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Comments</label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setComments(e.target.value);
                    }}
                    width="95%"
                    name="username"
                    defaultValue={selectDoc?.comment}
                  />
                </div>
              </div>
              <SectionHeader
                title="Upload your documents"
                desc="Upload a document"
              />{" "}
              <hr
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  opacity: "0.4",
                }}
              ></hr>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "40px",
                }}
              >
                <div style={{ width: "90%" }}>
                  <div>Upload Front of Id</div>
                  <br />

                  <FileUpload2
                    setValue={setImageOne}
                    value={imageOne}
                    setLoading={setLoading}
                    otherId={params.get("userId")?.userId}
                  />
                </div>
                <div style={{ width: "90%" }}>
                  <div>Upload Back of Id</div>
                  <br />
                  <FileUpload2
                    setValue={setImageTwo}
                    value={imageTwo}
                    setLoading={setLoading2}
                    otherId={params.get("userId")?.userId}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                width: "38%",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "10px",
                marginTop: "30px",
                marginLeft: "auto",
                paddingBottom: "20px",
                paddingRight: "20px",
              }}
            >
              <button
                className="cancel"
                onClick={() => {
                  navigate(`/customers-details?userId=${params.get("userId")}`);
                }}
              >
                {" "}
                <span>Go Back</span>
              </button>

              <button
                onClick={() => {
                  mutate({
                    userId: JSON.parse(params.get("userId")),
                    userKYCDocument: {
                      id: selectDoc?.id,
                      documentType: {
                        id: docType?.id || selectDoc?.documentType?.id,
                      },
                      nameOnTheDocument:
                        docName || selectDoc?.nameOnTheDocument,
                      documentNumber: docNumber || selectDoc?.documentNumber,
                      placeIssued: placeOfIssue || selectDoc?.placeIssued,
                      dateIssued: issueDate || selectDoc?.dateIssued,
                      expiryDate: expiryDate || selectDoc?.expiryDate,
                      uploadedBy: 0,
                      verifiedBy: 0,
                      documentFrontPageURL:
                        imageOne?.secure_url || selectDoc?.documentFrontPageURL, //Call file upload endpoint to upload the file then set the return URL as this value..
                      documentBackPageURL:
                        imageTwo?.secure_url || selectDoc?.documentBackPageURL, //Call file upload endpoint to upload the file then set the return URL as this value..
                      comment: comments || selectDoc?.comment,
                    },
                  });
                }}
                className="confirm"
                disabled={mutateLoading}
              >
                {" "}
                <span>{mutateLoading ? "creating..." : "Update Document"}</span>
              </button>
            </div>
          </div>
        </Content>
      )}
    </BodyLayout>
  );
}

export default EditNewDocument;
const Content = styled.div`
  .top p {
    font-size: 32px;
    font-weight: 500;
  }
  .top {
    padding-bottom: 20px;
  }
  .top span {
    font-size: 15px;
    color: #848d87;
    font-weight: 400;
  }
  .btn {
    display: flex;
    gap: 10px;
  }
  .btn button {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 12px 13px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
  .info {
    background-color: #e1ebf9;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #bfd5f5;
  }
  .selection {
    padding: 40px 40px 0px 30px;
    display: flex;
    gap: 50px;
    cursor: pointer;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 20px;
  }
  .sender {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sender p {
    font-size: 17px;
    font-weight: 500;
    color: #a1a9b8;
    line-height: 48px;
  }
  .sender span {
    /* border: 8px solid #00a85a24; */
    border: 1px solid gainsboro;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    color: #a1a9b8;
    font-size: 17px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .note {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .note p {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #464f60;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .head button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .TableGrid {
    overflow: hidden;
    overflow: scroll;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100vw;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
    color: #5a6376;
    cursor: pointer;
  }
  .table span {
    font-size: 14px;
    font-weight: 400;
    color: #667085;
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 25px;
  }

  .row span {
    font-size: 15px;
    color: #687182;
  }
  .arrow {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .arrow button {
    width: 28.8px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    border-radius: 3px;
  }
  .pagins {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  .pagins p {
    font-size: 14px;
    color: #687182;
  }

  .pagins select {
    width: 48px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    padding: 2px;
    border-radius: 3px;
  }
`;
