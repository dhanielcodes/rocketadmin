import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import CountryFlag from "react-country-flag";
import { kFormatter3, kFormatter2, kFormatter4 } from "../../utils/format";
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
import {
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
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

const DroplistCancelled = ({ action, setModal, setUserId, viewDetails }) => (
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
      width: 190,

      //render: () => "Other",
    },
    {
      title: "COLLECTION STATUS",
      dataIndex: "status2",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "TRANSACTION REF",
      dataIndex: "paymentRef",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "CUSTOMER REF",
      dataIndex: "userId",
      width: 190,
    },
    {
      title: "AMOUNT",
      dataIndex: "newPaymentAmount",
      width: 120,
    },

    {
      title: "RATE",
      dataIndex: "rate",
      render: (ire) => kFormatter3(ire),
      width: 120,
    },
    {
      title: "FOREX AMOUNT",
      dataIndex: "receivedAmount",
      render: (ire) => kFormatter3(ire),
      width: 260,
    },
    {
      title: "SENDER",
      dataIndex: "senderName",
      width: 190,
    },

    {
      title: "RECEIVER",
      dataIndex: "beneficiaryName",
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
      width: 200,
    },

    {
      title: "COLLECTION TYPE",
      dataIndex: "collectionType",
      width: 200,

      //render: () => "Other",
    },

    {
      title: "BRANCH",
      dataIndex: "transactionSource",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "PAYMENT DATE",
      dataIndex: "paymentDate",
      width: 260,
      //render: () => "Other 2",
    },

    {
      title: "COMMENT",
      dataIndex: "comment",
      width: 220,
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

            setMarkers([
              {
                lat: Number(select?.latitude) || 6.52438,
                lng: Number(select?.longitude) || 3.37921,
              },
            ]);
            setShowLocation(
              select || {
                ip: "197.210.8.165",
                continent_code: "AF",
                continent_name: "Africa",
                country_code2: "NG",
                country_code3: "NGA",
                country_name: "Nigeria",
                country_name_official: "Federal Republic of Nigeria",
                country_capital: "Abuja",
                state_prov: "Lagos",
                state_code: "NG-LA",
                district: "",
                city: "Obalende",
                zipcode: "101245",
                latitude: "6.52438",
                longitude: "3.37921",
                is_eu: false,
                calling_code: "+234",
                country_tld: ".ng",
                languages: "en-NG,ha,yo,ig,ff",
                country_flag: "https://ipgeolocation.io/static/flags/ng_64.png",
                geoname_id: "10482923",
                isp: "MTN Nigeria",
                connection_type: "",
                organization: "MTN NIGERIA PREFIX",
                country_emoji: "🇳🇬",
                currency: {
                  code: "NGN",
                  name: "Nigerian Naira",
                  symbol: "₦",
                },
                time_zone: {
                  name: "Africa/Lagos",
                  offset: 1,
                  offset_with_dst: 1,
                  current_time: "2024-04-12 12:07:03.673+0100",
                  current_time_unix: 1712920023.673,
                  is_dst: false,
                  dst_savings: 0,
                  dst_exists: false,
                  dst_start: "",
                  dst_end: "",
                },
              }
            );
          }}
        >
          <img
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "1000px",
            }}
            src={
              item?.transactionLocation?.country_flag ||
              "https://ipgeolocation.io/static/flags/ng_64.png"
            }
            alt=""
          />
          &nbsp; &nbsp;
          {item?.transactionLocation?.currency?.code || "NGN"}
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
    googleMapsApiKey: "AIzaSyC6wfkl5KXXDBYuP7BBVI8UbsC6xNfupZQ",
  });

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };
  const onLoad2 = (infoWindow) => {
    console.log("infoWindow: ", infoWindow);
  };

  const onUnmount = useCallback(function callback(map) {
    console.log(map);
  }, []);

  const [markers, setMarkers] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

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

        <ReusableModal
          isOpen={showLocation}
          width={"70%"}
          spanWidth={"100%"}
          center={false}
          onClose={() => {
            setShowLocation();
            setMarkers([]);
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
                      {markers?.map((item) => {
                        return (
                          <>
                            <Marker
                              position={{ lat: item?.lat, lng: item?.lng }}
                              icon={
                                "https://img.icons8.com/fluency/48/null/maps.png"
                              }
                            />
                            <InfoWindow
                              onLoad={onLoad2}
                              position={{ lat: item?.lat, lng: item?.lng }}
                            >
                              <div>
                                <h1>{item?.state}</h1>
                              </div>
                            </InfoWindow>
                          </>
                        );
                      })}
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
