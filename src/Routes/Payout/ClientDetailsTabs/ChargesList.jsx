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

export default function ChargesList({ data, refetch }) {
  const columns = [
    {
      title: "ACTIONS",
      dataIndex: "action",
      fixed: "left",

      width: 130,
    },
    {
      title: "COUNTRY",
      dataIndex: "currency['name']",
      width: 160,
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
      render: (item) => kFormatter4(item),
      width: 220,
    },
    {
      title: "MIN FIXED CAPPED AMT",
      dataIndex: "minimumFixedCapped",
      width: 220,
      render: (item) => kFormatter4(item),
    },
    {
      title: "MAX FIXED CAPPED AMT",
      dataIndex: "maximumFixedCapped",
      width: 220,
      render: (item) => kFormatter4(item),
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

  const [charge, setCharge] = useState();

  const newData = data?.payOutClientCharges?.map((item) => {
    return {
      ...item,
      action: (
        <p
          onClick={() => {
            console.log(item?.userId);
            setCharge(item);
            setCurrency(item?.currency);
            setType(item?.payoutChargeType);
            setBase(item?.baseValue);
            setMax(item?.maximumFixedCapped);
            setMin(item?.minimumFixedCapped);
            setModal2(true);
          }}
          style={{
            color: "blue",
            cursor: "pointer",
          }}
        >
          Edit Charge
        </p>
      ),
      statusNew: (
        <>
          {" "}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "7px",
              background:
                item?.status === "Successful"
                  ? "#37d7446c"
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
  const [modal2, setModal2] = useState(false);

  const [currency, setCurrency] = useState();
  const [type, setType] = useState();
  const [base, setBase] = useState();
  const [max, setMax] = useState();
  const [min, setMin] = useState();
  const [params] = useSearchParams();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: modal2 ? updateClientCharges : addClientCharges,
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
      toast.error("Charge Request wasn't created");

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const {
    data: countries,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCurrencies(),
  });
  const { data: clientCharges } = useQuery({
    queryKey: ["charges"],
    queryFn: () => getClientChargeTypes(),
  });
  console.log(countries?.data);

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
            setBase();
            setCurrency();
            setMax();
            setMin();
            setType();
          }}
          heading="Add New Charge"
        >
          <div className="name">
            <label>Country</label>
            <CountryDropdown2
              defaultValue={"NGN"}
              option={
                countries?.data?.map((item) => {
                  return {
                    label: item?.name + " - " + item?.currencyCode,
                    value: item?.name,
                    ...item,
                  };
                }) || []
              }
              onChange={(e) => {
                setCurrency(e);
              }}
            />
          </div>

          <AppSelect
            options={clientCharges?.data?.map((item) => {
              return {
                label: item?.typeName,
                value: item?.typeName,
                ...item,
              };
            })}
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
                if (type?.label === "Fixed") {
                  setMin(e.target.value);
                  setMax(e.target.value);
                }
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
              disabled={type?.label === "Fixed"}
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setMin(e.target.value);
              }}
              width="96%"
              name="username"
              padding="12px"
              defaultValue={min}
              value={min}
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
              disabled={type?.label === "Fixed"}
              placeholder="How much"
              type="number"
              onChange={(e) => {
                setMax(e.target.value);
              }}
              width="96%"
              name="username"
              padding="12px"
              value={max}
              defaultValue={max}
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
                setBase();
                setCurrency();
                setMax();
                setMin();
                setType();
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
                      id: currency?.id,
                    },
                    payoutChargeType: {
                      id: type?.id,
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
              <span>{mutateLoading ? "creating..." : "Create"}</span>
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
        {modal2 && (
          <AppModal
            closeModal={() => {
              setModal2(false);
              setBase();
              setCurrency();
              setMax();
              setMin();
              setType();
            }}
            heading="Edit Charge"
          >
            <div className="name">
              <label>Country</label>
              <CountryDropdown2
                value={{
                  label:
                    charge?.currency?.name + " - " + charge?.currency?.code,
                  value: charge?.currency?.name,
                  regionId: charge?.currency?.regionId,
                  subRegionId: charge?.currency?.subRegionId,
                  telephoneCode: charge?.currency?.telephoneCode,
                  currencyCode: charge?.currency?.currencyCode,
                  emoji: charge?.currency?.emoji,
                  status: charge?.currency?.status,
                  id: charge?.currency?.id,
                  longitude: charge?.currency?.longitude,
                  latitude: charge?.currency?.latitude,
                }}
                disabled={true}
                option={
                  countries?.data?.map((item) => {
                    return {
                      label: item?.name + " - " + item?.currencyCode,
                      value: item?.name,
                      ...item,
                    };
                  }) || []
                }
                onChange={(e) => {
                  setCurrency(e);
                }}
              />
            </div>

            <AppSelect
              disabled={true}
              options={clientCharges?.data?.map((item) => {
                return {
                  label: item?.typeName,
                  value: item?.typeName,
                  ...item,
                };
              })}
              label="Charge Type"
              onChange={(e) => {
                setType(e);
              }}
              value={{
                label: charge?.payoutChargeType?.typeName,
                value: charge?.payoutChargeType?.typeName,
                id: charge?.payoutChargeType?.id,
                typeName: charge?.payoutChargeType?.typeName,
                createdBy: charge?.payoutChargeType?.createdBy,
                dateCreated: charge?.payoutChargeType?.dateCreated,
                lastUpdated: charge?.payoutChargeType?.lastUpdated,
                defaultType: charge?.payoutChargeType?.defaultType,
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
                  if (charge?.payoutChargeType?.typeName === "Fixed") {
                    setMin(e.target.value);
                    setMax(e.target.value);
                  }
                }}
                width="96%"
                name="username"
                padding="12px"
                defaultValue={charge?.baseValue}
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
                disabled={charge?.payoutChargeType?.typeName === "Fixed"}
                placeholder="How much"
                type="number"
                onChange={(e) => {
                  setMin(e.target.value);
                }}
                width="96%"
                name="username"
                padding="12px"
                defaultValue={charge?.minimumFixedCapped}
                value={min}
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
                disabled={charge?.payoutChargeType?.typeName === "Fixed"}
                placeholder="How much"
                type="number"
                onChange={(e) => {
                  setMax(e.target.value);
                }}
                width="96%"
                name="username"
                padding="12px"
                defaultValue={charge?.maximumFixedCapped}
                value={max}
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
                  setModal2(false);
                  setBase();
                  setCurrency();
                  setMax();
                  setMin();
                  setType();
                }}
                className="cancel"
              >
                {" "}
                <span>Cancel</span>
              </button>
              <button
                onClick={() => {
                  mutate({
                    adminId: userDetails?.userId,
                    clientId: params.get("userId"),
                    data: {
                      id: charge?.id,
                      baseValue: base,
                      minimumFixedCapped: min,
                      maximumFixedCapped: max,
                    },
                  });
                }}
                className="confirm"
              >
                {" "}
                <span>{mutateLoading ? "editing..." : "Edit"}</span>
              </button>
            </div>
          </AppModal>
        )}
      </div>
    </div>
  );
}
