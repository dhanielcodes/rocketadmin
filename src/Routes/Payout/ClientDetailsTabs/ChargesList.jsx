import React, { useState } from "react";
import CustomTable from "../../../reuseables/CustomTable";
import SectionHeader from "../../../reuseables/SectionHeader";
import CountryDropdown2 from "../../../reuseables/CountryDropdown2";
import AppModal from "../../../COMPONENTS/AppModal";
import AppInput from "../../../reuseables/AppInput";
import AppSelect from "../../../reuseables/AppSelect";
import { useMutation } from "@tanstack/react-query";
import { addClientCharges } from "../../../services/PayoutDashboard";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function ChargesList({ data }) {
  const columns = [
    /*   {
      title: "ACTIONS",
      dataIndex: "action",
      fixed: "left",
     
      width: 130,
    }, */
    {
      title: "COUNTRY",
      dataIndex: "currency['name']",
      width: 140,
    },
    {
      title: "CURRENCY",
      dataIndex: "currency['currencyCode']",
      width: 190,
    },
    {
      title: "CHARGE TYPE",
      dataIndex: "payoutChargeType['typeName']",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "AMOUNT",
      dataIndex: "baseValue",
      //render: () => "Other 1",
      width: 220,
    },
    {
      title: "MIN FIXED CAPPED AMT",
      dataIndex: "minimumFixedCapped",
      width: 220,
      //render: () => "Other 2",
    },
    {
      title: "MAX FIXED CAPPED AMT",
      dataIndex: "maximumFixedCapped",
      width: 220,
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateCreated",
      width: 220,
    },
    {
      title: "LAST UPDATED",
      dataIndex: "lastUpdated",
      width: 220,
    },
  ];

  const newData = data?.payOutClientCharges?.map((item) => {
    return {
      ...item,
      statusNew: (
        <>
          {" "}
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "10000px",
              background:
                item?.status === "Successful"
                  ? "#63ff706c"
                  : item?.status === "Pending"
                  ? "#FEF0C7"
                  : "#ff63634b",
              color:
                item?.status === "Successful"
                  ? "green"
                  : item?.status === "Pending"
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

  const [modal, setModal] = useState(false);

  const [currency, setCurrency] = useState();
  const [type, setType] = useState();
  const [base, setBase] = useState();
  const [max, setMax] = useState();
  const [min, setMin] = useState();
  const [params] = useSearchParams();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: addClientCharges,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success(data?.message);
        setModal(false);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);
      toast.error("Funding Request wasn't created");

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  console.log(type);
  return (
    <div>
      <div>
        <div
          style={{
            paddingBottom: "20px",
            borderBottom: "1px solid #d8d8d8",
          }}
        >
          <SectionHeader title="Charges Type" />
        </div>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            marginLeft: "auto",
            width: "fit-content",
          }}
        >
          <button
            onClick={() => {
              setModal(true);
            }}
            className="confirm"
          >
            {" "}
            <span>New Charges</span>
          </button>
        </div>
      </div>
      <CustomTable
        noData={false}
        //loading={isLoading || isFetching}
        Apidata={newData || []}
        tableColumns={columns}
      />

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
            setAmount();
            setDescription();
          }}
          heading="Add New Charge"
        >
          <div className="name">
            <label>Country</label>
            <CountryDropdown2
              defaultValue={"NGN"}
              onChange={(e) => {
                setCurrency(e);
              }}
            />
          </div>
          <AppSelect
            options={[{ name: "hi", value: "hi" }]}
            label="Charge Type"
            onChange={(e) => {
              setType(e);
            }}
          />
          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Base Value</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setBase(e.target.value);
              }}
              width="96%"
              name="username"
              padding="12px"
            />
          </div>

          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Min. Fixed Capped Amount</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setMin(e.target.value);
              }}
              width="96%"
              name="username"
              padding="12px"
            />
          </div>

          <div
            className="name"
            style={{
              marginTop: "20px",
            }}
          >
            <label>Max. Fixed Capped Amount</label>
            <AppInput
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setMax(e.target.value);
              }}
              width="96%"
              name="username"
              padding="12px"
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
                setAmount();
                setDescription();
              }}
              className="cancel"
            >
              {" "}
              <span>Cancel</span>
            </button>
            <button
              onClick={() => {
                mutate({
                  adminI: userDetails?.userId,
                  clientId: params.get("userId"),
                  data: {
                    currency: {
                      id: currency,
                    },
                    payoutChargeType: {
                      id: 4,
                    },
                    baseValue: base,
                    minimumFixedCapped: min,
                    maximumFixedCapped: max,
                  },
                });
              }}
              className="confirm"
            >
              {" "}
              <span>Create</span>
            </button>
          </div>
        </AppModal>
      </div>
    </div>
  );
}
