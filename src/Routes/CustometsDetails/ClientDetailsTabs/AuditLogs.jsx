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
import { Dropdown, Menu } from "@arco-design/web-react";
import { IconEye, IconMoreVertical } from "@arco-design/web-react/icon";
import styled from "styled-components";
import moment from "moment";

export default function AuditLogs({ clientDetails, refetch }) {
  const [params] = useSearchParams();
  console.log(clientDetails?.userActivities);
  return (
    <AuditStyle>
      <div>
        <div>
          <div
            style={{
              paddingBottom: "20px",
              borderBottom: "1px solid #d8d8d8",
            }}
          >
            <SectionHeader title="Audit Logs" />
          </div>
        </div>
        <div className="audit_cont">
          {clientDetails?.userActivities?.map((item) => {
            return (
              <div className="audit">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1601_37742)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.9997 3.33398C10.7947 3.33398 3.33301 10.7957 3.33301 20.0007C3.33301 29.2057 10.7947 36.6673 19.9997 36.6673C29.2047 36.6673 36.6663 29.2057 36.6663 20.0007C36.6663 10.7957 29.2047 3.33398 19.9997 3.33398ZM14.1663 15.834C14.1663 15.0679 14.3172 14.3094 14.6104 13.6017C14.9035 12.8939 15.3332 12.2509 15.8749 11.7092C16.4166 11.1675 17.0596 10.7378 17.7674 10.4447C18.4751 10.1515 19.2336 10.0007 19.9997 10.0007C20.7657 10.0007 21.5243 10.1515 22.232 10.4447C22.9397 10.7378 23.5828 11.1675 24.1245 11.7092C24.6661 12.2509 25.0958 12.8939 25.389 13.6017C25.6821 14.3094 25.833 15.0679 25.833 15.834C25.833 17.3811 25.2184 18.8648 24.1245 19.9588C23.0305 21.0527 21.5468 21.6673 19.9997 21.6673C18.4526 21.6673 16.9688 21.0527 15.8749 19.9588C14.7809 18.8648 14.1663 17.3811 14.1663 15.834ZM30.4297 28.3073C29.1821 29.8767 27.596 31.1439 25.79 32.0143C23.9839 32.8847 22.0045 33.3359 19.9997 33.334C17.9948 33.3359 16.0154 32.8847 14.2094 32.0143C12.4033 31.1439 10.8173 29.8767 9.56967 28.3073C12.2713 26.369 15.958 25.0007 19.9997 25.0007C24.0413 25.0007 27.728 26.369 30.4297 28.3073Z"
                      fill="#B7B7B7"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1601_37742">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <div>{item?.activity}</div>
                  <div>
                    {moment(item?.activityTime).format("DD-MMM-YYYY : hh:mma")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AuditStyle>
  );
}

const AuditStyle = styled.div`
  .audit {
    padding: 20px;
    background-color: #ebebeb;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin: 10px 0;
  }
  .audit:nth-child(odd) {
    background-color: #f9fafb;
  }
`;
