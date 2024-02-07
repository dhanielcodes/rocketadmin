import React, { useState } from "react";
import CustomTable from "../../../reuseables/CustomTable";
import SectionHeader from "../../../reuseables/SectionHeader";
import CountryDropdown2 from "../../../reuseables/CountryDropdown2";
import AppModal from "../../../COMPONENTS/AppModal";
import AppInput from "../../../reuseables/AppInput";
import AppSelect from "../../../reuseables/AppSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addClientCharges,
  updateClientCharges,
} from "../../../services/PayoutDashboard";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getClientChargeTypes, getCurrencies } from "../../../services/Auth";
import { kFormatter4 } from "../../../utils/format";

export default function Gateways({ data }) {
  const columns = [
    {
      title: "COUNTRY",
      dataIndex: "wallet['country']['name']",
      width: 40,
    },
    {
      title: "STATUS",
      dataIndex: "statusNew",
      width: 40,
    },
    {
      title: "PROVIDER",
      dataIndex: "providerName",
      width: 40,
    },
    {
      title: "CURRENCY",
      dataIndex: "wallet['country']['currencyCode']",
      width: 40,
    },

    {
      title: "BALANCE",
      dataIndex: "wallet['balance']",
      width: 40,
      render: (item) => kFormatter4(item),
    },

    {
      title: "WALLET ID",
      dataIndex: "wallet['walletId']",
      width: 40,
    },
  ];

  const [charge, setCharge] = useState();

  const newData = data?.payOutClientWalletPayOutProviders?.map((item) => {
    return {
      ...item,

      statusNew: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background:
                item?.status === "true"
                  ? "#37d7446c"
                  : item?.status === "true"
                  ? "#FEF0C7"
                  : "#ff63634b",
              color:
                item?.status === "true"
                  ? "green"
                  : item?.status === "true"
                  ? "#DC6803"
                  : "red",
              width: "fit-content",
              fontWeight: "700",
            }}
          >
            {item?.status}
          </div>
        </>
      ),
    };
  });

  return (
    <div>
      <div>
        <div
          style={{
            paddingBottom: "20px",
            borderBottom: "1px solid #d8d8d8",
          }}
        >
          <SectionHeader
            title="Gateways"
            desc="List of client gateways are listed here"
          />
        </div>
      </div>

      <CustomTable
        noData={false}
        //loading={isLoading || isFetching}
        Apidata={newData || []}
        tableColumns={columns}
      />
    </div>
  );
}
