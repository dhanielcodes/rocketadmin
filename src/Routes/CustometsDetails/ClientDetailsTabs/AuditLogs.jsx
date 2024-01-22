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

export default function AuditLogs({ clientDetails, refetch }) {
  const [params] = useSearchParams();
  console.log(clientDetails?.userKYCDocuments, clientDetails?.userActivities);
  return (
    <div>
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
        <div></div>
      </div>
    </div>
  );
}
