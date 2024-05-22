import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

import CustomTable from "../../reuseables/CustomTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import CountryFlag from "react-country-flag";
import { kFormatter3 } from "../../utils/format";
import {
  TodayLogss,
  Tranx,
  addcommenttotransaction,
  cancelTransaction,
  confirmTransaction,
  gettransactionlogbydate,
  gettransactionlogbyref,
  holdtransaction,
  markaspay,
  marktransactionsuspicious,
  paytransaction,
  revertholdtransaction,
  viewCommentsTransaction,
} from "../../services/Dashboard";
import AmountFormatter from "../../reuseables/AmountFormatter";
import { IconEye, IconMoreVertical } from "@arco-design/web-react/icon";
import { DatePicker, Dropdown, Input, Menu } from "@arco-design/web-react";
import { useCallback, useEffect, useState } from "react";
import ReusableModal from "../../reuseables/ReusableModal";
import Msg from "../../reuseables/Msg";
import Btn from "../../reuseables/Btn";
import toast from "react-hot-toast";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { saveAs } from "file-saver";
import AppModal from "../../COMPONENTS/AppModal";
import SmallDownload from "../../assets/icons/Download";
import { TiEye } from "react-icons/ti";
const TextArea = Input.TextArea;

const Droplist = ({ action, setModal, setUserId, viewDetails }) => (
  //   <Menu.Item key='1' onClick={() => onNavigate(id)}>
  <Menu
    style={{
      borderRadius: "10px",
      paddingTop: "6px",
      // width: "150px",
    }}
  >
    <Menu.Item
      key="1"
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        viewDetails();
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
        View Details
      </span>
    </Menu.Item>

    <Menu.Item
      key="2"
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        setModal(true);
        action("viewComment");
        setUserId();
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
        action("markAsSuspicious");
        setUserId();
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
        Mark as Suspicious
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
        Cancel Transaction
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        setModal(true);
        action("addComment");
        setUserId();
      }}
      key="7"
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
        Add Comment to Transaction
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        setModal(true);
        action("confirmTransaction");
      }}
      key="8"
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
        Confirm Transaction
      </span>
    </Menu.Item>
  </Menu>
);

const Droplist2 = ({ action, setModal, setUserId, viewDetails }) => (
  //   <Menu.Item key='1' onClick={() => onNavigate(id)}>
  <Menu
    style={{
      borderRadius: "10px",
      paddingTop: "6px",
      // width: "150px",
    }}
  >
    <Menu.Item
      key="3"
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        viewDetails();
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
        View Details
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        setModal(true);
        action("markAsPay");
        setUserId();
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
        Mark as Pay
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        setModal(true);
        action("payTransaction");
        setUserId();
      }}
      key="9"
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
        Pay Transaction
      </span>
    </Menu.Item>
  </Menu>
);

const DroplistPending = ({ action, setModal, setUserId, viewDetails }) => (
  //   <Menu.Item key='1' onClick={() => onNavigate(id)}>
  <Menu
    style={{
      borderRadius: "10px",
      paddingTop: "6px",
      // width: "150px",
    }}
  >
    <Menu.Item
      key="1"
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        viewDetails();
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
        View Details
      </span>
    </Menu.Item>

    <Menu.Item
      key="2"
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        setModal(true);
        action("viewComment");
        setUserId();
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
        action("markAsSuspicious");
        setUserId();
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
        Mark as Suspicious
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
        Cancel Transaction
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        setModal(true);
        action("addComment");
        setUserId();
      }}
      key="7"
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
        Add Comment to Transaction
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        setModal(true);
        action("confirmTransaction");
      }}
      key="8"
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
        Confirm Transaction
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        setModal(true);
        setUserId();
        action("holdTransaction");
      }}
      key="4"
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
        Hold Transaction
      </span>
    </Menu.Item>
  </Menu>
);

/*  <Menu.Item
      onClick={() => {
        setModal(true);
        action("payTransaction");
        setUserId();
      }}
      key="9"
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
        Pay Transaction
      </span>
    </Menu.Item> */
const DroplistProcessing = ({ action, setModal, setUserId, viewDetails }) => (
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
        viewDetails();
      }}
      key="3"
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
        View Details
      </span>
    </Menu.Item>
  </Menu>
);
const DroplistProcessed = ({ action, setModal, setUserId, viewDetails }) => (
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
        setModal(true);
        setUserId();
        action("holdTransaction");
      }}
      key="4"
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
        Hold Transaction
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        viewDetails();
      }}
      key="3"
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
        View Details
      </span>
    </Menu.Item>
  </Menu>
);

const DroplistHold = ({ action, setModal, setUserId, viewDetails }) => (
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
        setModal(true);
        action("markAsSuspicious");
        setUserId();
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
        Mark as Suspicious
      </span>
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        setModal(true);
        action("revertHoldTransaction");
        setUserId();
      }}
      key="6"
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
        Revert Hold Transaction
      </span>
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        viewDetails();
      }}
      key="3"
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
        View Details
      </span>
    </Menu.Item>
  </Menu>
);

const DroplistCancelled = ({ viewDetails }) => (
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
        viewDetails();
      }}
      key="3"
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
        View Details
      </span>
    </Menu.Item>
  </Menu>
);

function TransferLogsTable({ category, showFilter = false, typeee }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);
  const [userId, setUserIdd] = useState("");

  const [params] = useSearchParams();
  const userWe = params.get("userId");

  const {
    data: rates,
    isLoading,
    refetch: refetchingTwo,
    isFetching,
  } = useQuery({
    queryKey: typeee === "Today" ? ["TodayLogss"] : ["Tranx"],
    queryFn: () =>
      typeee === "Today" ? TodayLogss() : Tranx(userWe, category),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.location.pathname === "/dashboard") {
        refetchingTwo();
      }
    }, 300000);
    return () => clearInterval(intervalId);
  }, []);
  const [modal, setModal] = useState(false);
  const [note, setNote] = useState(false);

  const [call, setCall] = useState("");

  const { mutate: cancelTransactionMutation, isLoading: loading1 } =
    useMutation({
      mutationFn: cancelTransaction,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetchingTwo();
          setModal(false);
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });

  const { mutate: confirmTransactionMutation, isLoading: loading2 } =
    useMutation({
      mutationFn: confirmTransaction,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetchingTwo();
          setModal(false);
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });

  const { mutate: marktransactionsuspiciousMutation, isLoading: loading3 } =
    useMutation({
      mutationFn: marktransactionsuspicious,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetchingTwo();
          setModal(false);
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });

  const { mutate: markaspayMutation, isLoading: loading8 } = useMutation({
    mutationFn: markaspay,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        refetchingTwo();
        setModal(false);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const { mutate: payTransactionMutation, isLoading: loading4 } = useMutation({
    mutationFn: paytransaction,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        refetchingTwo();
        setModal(false);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const { mutate: holdTransactionMutation, isLoading: loading5 } = useMutation({
    mutationFn: holdtransaction,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        refetchingTwo();
        setModal(false);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  const { mutate: revertholdtransactionMutation, isLoading: loading6 } =
    useMutation({
      mutationFn: revertholdtransaction,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetchingTwo();

          setModal(false);
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });

  const { mutate: addcommenttotransactionMutation, isLoading: loading7 } =
    useMutation({
      mutationFn: addcommenttotransaction,
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data?.message);
          refetchingTwo();

          setModal(false);
        } else {
          toast.error(data?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.message);
      },
    });
  const [userIdd, setUserId] = useState();
  const odk = userIdd;

  const {
    data: comments,
    isLoading: viewloading,
    refetch,
  } = useQuery({
    queryKey: [odk?.sn],
    queryFn: () => viewCommentsTransaction(odk?.sn),
  });

  console.log(rates, userId);

  const [details, setDetails] = useState();

  const columns = [
    {
      title: "ACTION",
      dataIndex: "action2",
      width: 70,
      //render: () => "Other 2",
      fixed: "left",
    },
    {
      title: "TRANSACTION STATUS",
      dataIndex: "status",
      width: 170,

      //render: () => "Other",
    },
    {
      title: "COLLECTION STATUS",
      dataIndex: "status2",
      width: 170,

      //render: () => "Other",
    },
    {
      title: "PAYMENT DATE",
      dataIndex: "paymentDate",
      width: 210,
      //render: () => "Other 2",
    },
    {
      title: "TRANSACTION REF",
      dataIndex: "paymentRef",
      width: 150,

      //render: () => "Other",
    },
    {
      title: "CUSTOMER REF",
      dataIndex: "userId",
      width: 130,
    },

    {
      title: "BENEFICIARY",
      dataIndex: "nameNew",
      width: 360,
    },
    {
      title: "DOCUMENT",
      dataIndex: "doc",
      width: 200,
    },
    {
      title: "CUSTOMER TYPE",
      dataIndex: "type",
      width: 140,
    },
    {
      title: "AMOUNT",
      dataIndex: "newPaymentAmount",
      width: 120,
    },

    {
      title: "RATE",
      dataIndex: "newRate",
      width: 120,
    },
    {
      title: "FOREX AMOUNT",
      dataIndex: "forexAmt",
      width: 170,
    },
    {
      title: "FEE",
      dataIndex: "fee",
      width: 120,
    },

    {
      title: "AGENT COMMISSION",
      dataIndex: "agentCommission",
      width: 160,
    },
    {
      title: "SENDER",
      dataIndex: "senderName",
      width: 190,
    },

    {
      title: "RECEIVER",
      dataIndex: "userBeneficiary[beneficiaryBank][accountName]",
      width: 280,

      //render: () => "Other",
    },
    {
      title: "COUNTRY",
      dataIndex: "countryo",
      width: 110,

      //render: () => "Other",
    },

    {
      title: "MOBILE",
      dataIndex: "beneficiaryPhone",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "TRX LOCATION",
      dataIndex: "tnxLocation",
      width: 130,
    },

    {
      title: "BRANCH",
      dataIndex: "transactionSource",
      width: 100,

      //render: () => "Other",
    },
    {
      title: "PAYMENT TYPE",
      dataIndex: "paymentType",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "COLLECTION TYPE",
      dataIndex: "collectionType",
      width: 160,

      //render: () => "Other",
    },

    {
      title: "COMMENT",
      dataIndex: "comment",
      width: 350,
    },
    {
      title: "RELEASED BY",
      dataIndex: "releasedBy",
      render: (row) => (
        <div>
          {row?.firstName} {row?.surName}
        </div>
      ),
      width: 250,
    },
  ];

  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [ref, setRef] = useState("");
  const {
    data,
    refetch: refetcDate,
    isLoading: load1,
    isFetching: fetch1,
  } = useQuery({
    queryKey: ["gettransactionlogbydate"],
    queryFn: () => gettransactionlogbydate(date?.[0], date?.[1]),
  });

  const {
    data: newArr,
    refetch: refetchRef,
    isLoading: load2,
    isFetching: fetch2,
  } = useQuery({
    queryKey: ["gettransactionlogbyref"],
    queryFn: () => gettransactionlogbyref(ref),
  });
  const lowData = ref
    ? newArr?.data || []
    : date?.[1]
    ? data?.data || []
    : rates?.data;

  const [showLocation, setShowLocation] = useState();
  console.log(lowData);
  const downloadImage = (image_url, image) => {
    saveAs(image_url, image); // Put your image URL here.
  };
  const [modal2, setModal2] = useState(false);

  const newData = lowData?.map((item) => {
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
              console.log(item?.userId);
              setUserId(item);
            }}
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            <Dropdown
              droplist={
                item?.paymentStatus === "Deposited" ? (
                  <Droplist2
                    action={setCall}
                    setModal={setModal}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    paymentStatus={item?.paymentStatus}
                    collectStatus={item?.collectionStatus}
                  />
                ) : item?.paymentStatus === "Pending" ? (
                  <DroplistPending
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                ) : item?.paymentStatus === "Processed" ? (
                  <DroplistProcessed
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                ) : item?.collectionStatus === "Processing" ? (
                  <DroplistProcessing
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                ) : item?.collectionStatus === "Received" ? (
                  <DroplistProcessing
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                ) : item?.paymentStatus.toLocaleLowerCase() === "cancelled" ? (
                  <DroplistCancelled
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                ) : item?.paymentStatus === "On-Hold" ? (
                  <DroplistHold
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                ) : item?.paymentStatus === "Successful" ? (
                  <DroplistCancelled
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                ) : item?.paymentStatus === "Failed" ? (
                  <DroplistCancelled
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                ) : (
                  <Droplist
                    action={setCall}
                    setModal={setModal}
                    viewDetails={() => {
                      localStorage.setItem(
                        "transDetails",
                        JSON.stringify(item)
                      );
                      navigate("/transaction-details");
                    }}
                    setUserId={() => {
                      setUserIdd(item?.userId);
                      refetch(item?.sn);
                    }}
                  />
                )
              }
              position="bl"
              on
            >
              {" "}
              <Link style={{ marginRight: 40 }}>
                <IconMoreVertical
                  style={{
                    fontSize: 15,
                    marginLeft: 6,
                    color: "#000",
                  }}
                />
              </Link>
            </Dropdown>
          </p>
        </div>
      ),
      forexAmt: (
        <>
          {" "}
          {/* ß */}
          <div>
            <AmountFormatter
              currency={item?.beneficiaryCurrency}
              value={item?.receivedAmount}
            />
          </div>
        </>
      ),
      doc: (
        <>
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
          >
            {item?.transactionAttachedDocumentName}
            &nbsp; &nbsp; &nbsp;
            <TiEye
              size="20px"
              onClick={() => {
                setModal2(item?.transactionAttachedDocumentURL);
              }}
              style={{
                cursor: "pointer",
              }}
            ></TiEye>
            &nbsp; &nbsp;
            <SmallDownload
              onClick={(e) => {
                e.stopPropagation();
                downloadImage(
                  item?.transactionAttachedDocumentURL,
                  `${item?.transactionAttachedDocumentName}.png`
                );
              }}
              style={{
                marginRight: "14px",
                cursor: "pointer",
              }}
            />
          </div>
        </>
      ),
      newRate: (
        <>
          {" "}
          <div>
            <AmountFormatter
              currency={item?.beneficiaryCurrency}
              value={item?.rate}
            />
          </div>
        </>
      ),
      agentCommission: (
        <>
          {" "}
          <div>
            <AmountFormatter
              currency={"NGN"}
              value={item?.senderAgentCommission}
            />
          </div>
        </>
      ),
      newPaymentAmount: (
        <>
          {" "}
          <div>
            <AmountFormatter
              currency={item?.senderCurrency}
              value={item?.paymentAmount}
            />
          </div>
        </>
      ),
      fee: (
        <>
          {" "}
          <div>
            <AmountFormatter
              currency={item?.senderCurrency}
              value={item?.transitionFee}
            />
          </div>
        </>
      ),
      status: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background:
                item?.paymentStatus === "Deposited"
                  ? "#37d744"
                  : item?.paymentStatus === "Pending"
                  ? "#ffe063"
                  : "#ff6363",
              color: "white",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.paymentStatus}
          </div>
        </>
      ),

      status2: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background:
                item?.collectStatus === "Received"
                  ? "#37d744"
                  : item?.collectStatus === "Pending"
                  ? "#ffe063"
                  : item?.collectStatus === "Processing"
                  ? "#d7ac37"
                  : item?.collectStatus === ""
                  ? "#939393"
                  : "#ff6363",
              color: "white",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.collectStatus || "Pending"}
          </div>
        </>
      ),

      tnxLocation: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            const select =
              typeof item?.transactionLocation === "string"
                ? JSON.parse(item?.transactionLocation)
                : item?.transactionLocation;

            if (select) {
              setShowLocation(select);
              setMarkers({
                lat: Number(select?.latitude) || 6.52438,
                lng: Number(select?.longitude) || 3.37921,
              });
            }
          }}
        >
          {typeof item?.transactionLocation === "string" ? (
            <img
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "1000px",
              }}
              src={JSON.parse(item?.transactionLocation)?.country_flag}
              alt=""
            />
          ) : (
            <img
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "1000px",
              }}
              src={item?.transactionLocation?.country_flag}
              alt=""
            />
          )}
          &nbsp; &nbsp;
          {typeof item?.transactionLocation === "string"
            ? JSON.parse(item?.transactionLocation)?.currency?.code
            : item?.transactionLocation?.currency?.code || "-"}
        </div>
      ),
      paymentRef: (
        <div
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            localStorage.setItem("transDetails", JSON.stringify(item));
            navigate("/transaction-details");
          }}
        >
          <p
            style={{
              color: "blue",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item?.paymentRef}
          </p>
        </div>
      ),
      userId: (
        <div
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            //localStorage.setItem("customer_details", JSON.stringify(item));
            navigate(
              `/customers-details?from=customer&userId=${JSON.stringify(
                item?.userId
              )}`
            );
          }}
        >
          <p
            style={{
              color: "blue",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item?.userId}
          </p>
        </div>
      ),
      nameNew: (
        <div
          onClick={() => {
            setDetails(item);
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {item?.userBeneficiary?.beneficiaryBank?.accountName}
            &nbsp; &nbsp;
            <div
              style={{
                padding: "8px",
                borderRadius: "5px",
                background: "#00A85A",
                fontSize: "12px",
                cursor: "pointer",
                width: "fit-content",
                color: "#fff !important",
              }}
            >
              View Details
            </div>
          </p>
        </div>
      ),
      type: <div>{item?.senderAgentId === 0 ? "DIR-TRX" : "AGENT-TRX"}</div>,
      countryo: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CountryFlag
            style={{
              borderRadius: "10000000px",
              marginRight: "10px",
            }}
            countryCode={item?.senderCurrency?.slice(0, 2)}
            svg
          />
          {item?.senderCurrency}
        </div>
      ),
    };
  });

  const selectedLocation =
    typeof showLocation === "string" ? JSON.parse(showLocation) : showLocation;

  console.log(selectedLocation, "hello");
  useEffect(() => {
    refetcDate(date?.[0], date?.[1]);
  }, [date?.[1]]);

  useEffect(() => {
    refetchRef(ref);
  }, [ref]);
  console.log(newData);
  const [showDate, setShowDate] = useState(false);
  const [showRef, setShowRef] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    /*   googleMapsApiKey: "AIzaSyD-_l9nxSDNe8aCG5iBVYjREj-R1DFyg2I", */
    googleMapsApiKey: "AIzaSyD-_l9nxSDNe8aCG5iBVYjREj-R1DFyg2I",
  });

  const [markers, setMarkers] = useState({});

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(markers);
    map.fitBounds(bounds);
  };

  const onUnmount = useCallback(function callback(map) {
    console.log(map);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  console.log(markers);

  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">
            {typeee === "Today" ? "Today's Logs" : "Transfer List"}
          </div>
        </div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}
        <div
          style={{
            padding: "0 20px",
          }}
        >
          {showFilter && (
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                onClick={() => {
                  setShowRef(false);
                  setShowDate(true);
                  setDate();
                }}
              >
                Filter By Date
              </button>
              &nbsp; &nbsp;
              <button
                onClick={() => {
                  setShowDate(false);
                  setShowRef(true);
                  setRef();
                }}
              >
                Filter By Ref
              </button>
            </div>
          )}
          <br />
          {showRef && (
            <Input.Search
              searchButton
              placeholder="Please enter ref"
              onChange={(value) => {
                setRef(value);
                setDate();
              }}
              style={{
                width: "300px",
              }}
            />
          )}

          {showDate && (
            <DatePicker.RangePicker
              style={{}}
              onChange={(e) => {
                console.log(e);
                setDate(e);
                setRef();
              }}
            />
          )}
        </div>
        <CustomTable
          noData={rates?.data?.length}
          loading={
            isLoading || isFetching || load1 || fetch1 || load2 || fetch2
          }
          Apidata={newData || []}
          tableColumns={columns}
        />

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
              setModal2();
            }}
            heading={"Document"}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <img
                style={{
                  width: "100%",
                }}
                src={modal2}
              />
            </div>
          </AppModal>
        </div>

        <ReusableModal
          isOpen={showLocation}
          width={"70%"}
          spanWidth={"100%"}
          center={false}
          onClose={() => {
            setShowLocation();
            setMarkers({});
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              position: "relative",
              gridGap: "20px",
              width: "100%",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              {
                <Map>
                  {isLoaded && (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                    >
                      <Marker
                        position={markers}
                        icon={"https://img.icons8.com/fluency/48/null/maps.png"}
                      />
                    </GoogleMap>
                  )}
                </Map>
              }
            </div>
            <div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  marginBottom: "20px",
                }}
              >
                Location Details
              </div>
              <div
                style={{
                  padding: " 0 20px",
                  background: "#f1f1f1",
                  borderRadius: "20px",
                  border: "1px solid #dadada",
                }}
              >
                <div
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid #dadada",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Country</div>
                  <div>{selectedLocation?.country_name}</div>
                </div>
                <div
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid #dadada",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>State</div>
                  <div>{selectedLocation?.state_prov}</div>
                </div>
                <div
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid #dadada",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>City</div>
                  <div>{selectedLocation?.city}</div>
                </div>
                <div
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid #dadada",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>IP Address</div>
                  <div>{selectedLocation?.ip}</div>
                </div>
                <div
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid #dadada",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Currency</div>
                  <div>{selectedLocation?.currency?.code}</div>
                </div>
                <div
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid #dadada",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>TImezone</div>
                  <div>{selectedLocation?.time_zone?.name}</div>
                </div>
              </div>
            </div>
          </div>
        </ReusableModal>

        <ReusableModal
          isOpen={details}
          width={400}
          onClose={() => {
            setDetails();
          }}
        >
          <center>
            <span
              style={{
                fontSize: "15px",
                color: "#757575",
              }}
            >
              Beneficiary Bank Details
            </span>
            <br />
            <h2>
              Bank -{" "}
              <b>{details?.userBeneficiary?.beneficiaryBank?.bankName}</b>
            </h2>
            <hr></hr>
            <h4>
              Account Name -{" "}
              <b>{details?.userBeneficiary?.beneficiaryBank?.accountName}</b>
            </h4>
            <hr></hr>

            <h3>
              Account Number -{" "}
              <b>
                {details?.userBeneficiary?.beneficiaryBank?.accountNumber}{" "}
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText(
                      details?.userBeneficiary?.beneficiaryBank?.accountNumber
                    );
                    toast.success("Copied!");
                  }}
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                    fill="#00A85A"
                  />
                  <path
                    d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                    stroke="#00A85A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </b>
            </h3>
            <br />
            {details?.userBeneficiary?.correspondenceBank && (
              <>
                <span
                  style={{
                    fontSize: "15px",
                    color: "#757575",
                  }}
                >
                  Correspondence Bank Details
                </span>
                <br />
                <h2>
                  Bank -{" "}
                  <b>
                    {details?.userBeneficiary?.correspondenceBank?.bankName}
                  </b>
                </h2>
                <hr></hr>
                <h4>
                  IBAN/BIC -{" "}
                  <b>
                    {details?.userBeneficiary?.correspondenceBank?.bic ||
                      details?.userBeneficiary?.correspondenceBank?.iban}{" "}
                    <svg
                      onClick={() => {
                        navigator.clipboard.writeText(
                          details?.userBeneficiary?.correspondenceBank?.bic ||
                            details?.userBeneficiary?.correspondenceBank?.iban
                        );
                        toast.success("Copied!");
                      }}
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                        fill="#00A85A"
                      />
                      <path
                        d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                        stroke="#00A85A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </b>
                </h4>
                <hr></hr>

                <h3>
                  Account Number -{" "}
                  <b>
                    {
                      details?.userBeneficiary?.correspondenceBank
                        ?.accountNumber
                    }{" "}
                    <svg
                      onClick={() => {
                        navigator.clipboard.writeText(
                          details?.userBeneficiary?.correspondenceBank
                            ?.accountNumber
                        );
                        toast.success("Copied!");
                      }}
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.834 5.9987H6.83398C6.09761 5.9987 5.50065 6.59565 5.50065 7.33203V13.332C5.50065 14.0684 6.09761 14.6654 6.83398 14.6654H12.834C13.5704 14.6654 14.1673 14.0684 14.1673 13.332V7.33203C14.1673 6.59565 13.5704 5.9987 12.834 5.9987Z"
                        fill="#00A85A"
                      />
                      <path
                        d="M3.49104 9.60817C3.13742 9.60817 1.90039 9.60817 1.22451 9.60817C0.97446 9.35813 0.833984 9.01899 0.833984 8.66536V2.66536C0.833984 2.31174 0.97446 1.9726 1.22451 1.72256C1.47456 1.47251 1.8137 1.33203 2.16732 1.33203H8.16732C8.52094 1.33203 8.86008 1.47251 9.11013 1.72256C9.36018 1.9726 9.50065 2.31174 9.50065 2.66536V3.33203M6.83398 5.9987H12.834C13.5704 5.9987 14.1673 6.59565 14.1673 7.33203V13.332C14.1673 14.0684 13.5704 14.6654 12.834 14.6654H6.83398C6.09761 14.6654 5.50065 14.0684 5.50065 13.332V7.33203C5.50065 6.59565 6.09761 5.9987 6.83398 5.9987Z"
                        stroke="#00A85A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </b>
                </h3>
              </>
            )}
          </center>
        </ReusableModal>
        {modal && (
          <ReusableModal
            isOpen={modal}
            width={400}
            onClose={() => {
              setModal(false);
              setCall();
            }}
          >
            {call === "viewComment" && <h2>View Comments</h2>}

            {call === "viewComment" ? (
              comments?.data?.map((item) => {
                return viewloading ? (
                  "loading..."
                ) : (
                  <div className="comment">
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
              })
            ) : (
              <Msg>
                {/* {err} */}
                <p>
                  {call === "markAsSuspicious"
                    ? "Are you sure you want to Mark as suspicious?"
                    : call === "markAsPay"
                    ? "Are you sure you want to Mark as pay?"
                    : call === "holdTransaction"
                    ? "Are you sure you want to Hold Transaction?"
                    : call === "cancelTransaction"
                    ? "Are you sure you want to Cancel Transaction?"
                    : call === "revertHoldTransaction"
                    ? "Are you sure you want to Revert Hold Transaction?"
                    : call === "confirmTransaction"
                    ? "Are you sure you want to Confirm Transaction?"
                    : call === "payTransaction"
                    ? "Are you sure you want to Pay Transaction?"
                    : call === "addComment"
                    ? "Add Comment"
                    : ""}
                </p>
                <br />

                {call === "addComment" && (
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
                )}

                <br />

                {call === "viewComment" ? (
                  ""
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Btn
                      clicking={() => {
                        setModal(false);
                        setCall();
                      }}
                      size={30}
                      styles={{
                        width: "100%",
                        marginRight: "10px",
                        padding: "8px",
                        fontWeight: "600",
                        background: "#b0b0b0",
                      }}
                    >
                      <span
                        style={{
                          color: "#fff",
                        }}
                      >
                        Cancel
                      </span>
                    </Btn>
                    &nbsp; &nbsp;
                    <Btn
                      clicking={() => {
                        call === "markAsSuspicious"
                          ? "Mark as suspicious"
                          : call === "markAsPay"
                          ? "Mark as pay"
                          : call === "holdTransaction"
                          ? "Hold Transaction"
                          : call === "cancelTransaction"
                          ? "Cancel Transaction"
                          : call === "revertHoldTransaction"
                          ? "Revert Hold Transaction"
                          : call === "confirmTransaction"
                          ? "Confirm Transaction"
                          : call === "payTransaction"
                          ? "Pay Transaction"
                          : "Add Comment";

                        if (call === "markAsSuspicious") {
                          marktransactionsuspiciousMutation(
                            userIdd?.paymentRef
                          );
                        } else if (call === "markAsPay") {
                          markaspayMutation(userIdd.paymentRef);
                        } else if (call === "holdTransaction") {
                          holdTransactionMutation(userIdd.paymentRef);
                        } else if (call === "cancelTransaction") {
                          cancelTransactionMutation(userIdd.paymentRef);
                        } else if (call === "revertHoldTransaction") {
                          revertholdtransactionMutation(userIdd.paymentRef);
                        } else if (call === "confirmTransaction") {
                          confirmTransactionMutation(userIdd.paymentRef);
                        } else if (call === "payTransaction") {
                          payTransactionMutation(userIdd.paymentRef);
                        } else {
                          addcommenttotransactionMutation({
                            customerId: userId,
                            transactionId: userIdd?.sn,
                            commentBy: 0,
                            comment: note,
                          });
                        }
                      }}
                      size={30}
                      disabled={
                        loading1 ||
                        loading2 ||
                        loading3 ||
                        loading4 ||
                        loading5 ||
                        loading6 ||
                        loading7 ||
                        loading8
                      }
                      styles={{
                        width: "100%",
                        marginRight: "10px",
                        padding: "8px",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    >
                      <span
                        style={{
                          color: "#fff",
                        }}
                      >
                        {loading1 ||
                        loading2 ||
                        loading3 ||
                        loading4 ||
                        loading5 ||
                        loading6 ||
                        loading7
                          ? "loading..."
                          : "Confirm"}
                      </span>
                    </Btn>
                  </div>
                )}
              </Msg>
            )}

            {""}
          </ReusableModal>
        )}

        {/* <div className="row">
          <span>Showing 1-5 of entries</span>
          <div className="pagins">
            <p>Rows per page:</p>
            <select>
              <option>5</option>
            </select>
            <div className="arrow">
              <button
                onClick={() => {
                  // setSortDate(sortdate - 1);
                  // setEnd((prev) => prev - end);
                }}
              >
                <AiOutlineLeft />
              </button>
              <button>{sortdate}</button>
              <button>
                <AiOutlineRight />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </Content>
  );
}

export default TransferLogsTable;

const Map = styled.div`
  height: 116.7%;
  width: 51%;
  transform: translate(-3.4%, -10.23%);
  border-radius: 14px 0 0 14px;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
`;
const Content = styled.div`
  button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 7rem;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    cursor: pointer;
  }
  .arco-btn-primary {
    background-color: #00a85a !important;
    color: white !important;
    svg {
      stroke: #ffffff !important;
    }
  }
  .top {
    padding: 10px 30px 30px 20px;
  }
  .comment {
    background: #e5e5e5;
    width: 360px;
    color: #000000;
    border-radius: 12px;
    padding: 18px;
    display: grid;
    margin-top: 20px;
    font-size: 14px;
  }
  .tablecontent {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 10px;
  }
  .content {
    padding: 15px 20px 0px 20px;
  }
  .content .heading {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;
  }
  .content .sub {
    font-size: 14px;
    color: #848d87;
  }
  .content button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 7rem;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    cursor: pointer;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100%;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  /* .table tr:nth-child(odd) {
    background-color: #f6f6f6;
} */

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
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
`;
