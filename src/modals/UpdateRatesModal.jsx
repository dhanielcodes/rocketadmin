import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateRate } from "../services/PayoutDashboard";
import AppModal from "../COMPONENTS/AppModal";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import { getCurrencies } from "../services/Auth";
import AppInput from "../reuseables/AppInput";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";
import CustomTable from "../reuseables/CustomTable";
import { IconPen } from "@arco-design/web-react/icon";
import { FormatCorrect } from "../utils/format";

export default function UpdateRatesModal({
  rateItem,
  modal,
  setModal,
  recall,
}) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [rate, setRate] = useState();
  const [send, setSend] = useState();
  const [receive, setReceive] = useState();

  console.log(rateItem);

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: updateRate,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success("Rate Updated Successfully");
        setModal(false);
        recall();
        //refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);

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
    queryKey: ["countrie3s"],
    queryFn: () => getCurrencies(),
  });

  console.log(countries?.data);

  const columns = [
    {
      title: "ACTIONS",
      dataIndex: "action",
      fixed: "left",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },
    {
      title: "ID",
      dataIndex: "id",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },
    {
      title: "CHARGE TYPE",
      dataIndex: "chargeType",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },
    {
      title: "CHARGE",
      dataIndex: "charge",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },
    {
      title: "CURRENCY RATE ID",
      dataIndex: "currencyRateId",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },

    {
      title: "MAXIMUM AMOUNT",
      dataIndex: "id",
      render: (ire) =>
        FormatCorrect(
          rateItem?.adminRateBands?.find((item) => item?.id === ire)
            ?.maximumAmount,
          null
        ),
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },
    {
      title: "MINIMUM AMOUNT",
      dataIndex: "id",
      render: (ire) =>
        FormatCorrect(
          rateItem?.adminRateBands?.find((item) => item?.id === ire)
            ?.minimumAmount,
          null
        ),
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },
    {
      title: "RATE",
      dataIndex: "id",
      render: (ire) =>
        FormatCorrect(
          rateItem?.adminRateBands?.find((item) => item?.id === ire)?.rate,
          rateItem?.toCountryCurrency?.code
        ),
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 170,
    },
  ];
  const [cus, setCus] = useState();

  const newData = rateItem?.adminRateBands?.map((item) => {
    return {
      ...item,
      action: (
        <div
          style={{
            textDecoration: "none",
          }}
        >
          <p
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            <IconPen />
          </p>
        </div>
      ),
    };
  });

  return (
    <div
      style={{
        opacity: modal ? "1" : "0",
        pointerEvents: modal ? "all" : "none",
      }}
    >
      {modal && (
        <AppModal
          closeModal={() => {
            setModal(false);
          }}
          maxWidth={`1400px`}
          heading="Update Rate"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "40px",
            }}
          >
            <div className="name">
              <label>Sending Currency</label>
              <CountryDropdown2
                disabled={true}
                value={{
                  ...rateItem,
                  label:
                    rateItem?.fromCountryCurrency?.name +
                    " - " +
                    rateItem?.fromCountryCurrency?.code,
                  value: rateItem?.fromCountryCurrency?.name,
                }}
                option={
                  countries?.data?.map((item) => {
                    return {
                      label: item?.name + " - " + item?.code,
                      value: item?.name,
                      ...item,
                    };
                  }) || []
                }
                onChange={(e) => {
                  setSend(e);
                }}
              />
            </div>
            <div className="name" style={{}}>
              <label>Receiving Currency</label>
              <CountryDropdown2
                collectionStatus
                disabled={true}
                value={{
                  label:
                    rateItem?.toCountryCurrency?.name +
                    " - " +
                    rateItem?.toCountryCurrency?.code,
                  value: rateItem?.toCountryCurrency?.name,
                  ...rateItem,
                }}
                option={
                  countries?.data?.map((item) => {
                    return {
                      label: item?.name + " - " + item?.code,
                      value: item?.name,
                      ...item,
                    };
                  }) || []
                }
                onChange={(e) => {
                  setReceive(e);
                }}
              />
            </div>

            <div className="name" style={{}}>
              <label>New Rate</label>
              <AppInput
                placeholder="How much"
                type="number"
                onChange={(e) => {
                  setRate(e.target.value);
                }}
                width="95%"
                name="username"
                defaultValue={rateItem?.conversionRate}
                //defaultValue={charge?.baseValue}
              />
            </div>
          </div>
          <br />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "40px",
            }}
          >
            <div className="name" style={{}}>
              <label>Charge Percentage</label>
              <AppInput
                placeholder="How much"
                type="number"
                onChange={(e) => {
                  setRate(e.target.value);
                }}
                width="95%"
                name="username"
                defaultValue={rateItem?.feePercentage}
                //defaultValue={charge?.baseValue}
              />
            </div>
            <div className="name" style={{}}>
              <label>Charge Threshold</label>
              <AppInput
                placeholder="How much"
                type="number"
                onChange={(e) => {
                  setRate(e.target.value);
                }}
                width="95%"
                name="username"
                defaultValue={rateItem?.transactionFeeThreshold}
                //defaultValue={charge?.baseValue}
              />
            </div>
          </div>

          <Container>
            <div className="rates">
              <div className="pri">
                <ReactCountryFlag
                  countryCode={rateItem?.fromCountryCurrency?.code.slice(0, 2)}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  svg
                />

                {/* <p>{rates?.data?.fromAmount}</p> */}
              </div>
              <div style={{ color: "#000" }}>=</div>
              <div className="sec">
                <ReactCountryFlag
                  countryCode={rateItem?.toCountryCurrency?.code.slice(0, 2)}
                  svg
                />
              </div>
            </div>
          </Container>

          <CustomTable
            noData={rateItem?.data?.length}
            Apidata={newData}
            tableColumns={columns}
            scroll={{
              x: 800,
              y: 800,
            }}
          />

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
              }}
              className="cancel"
            >
              {" "}
              <span>Cancel</span>
            </button>
            <button
              onClick={() => {
                mutate({
                  id: rateItem?.id,
                  updatedBy: {
                    userId: userDetails?.userId,
                    firstName: "Admin",
                  },
                  conversionRate: rate || rateItem?.conversionRate,
                  fromCountryCurrency: {
                    id: rateItem?.fromCountryCurrency?.id,
                  },
                  toCountryCurrency: {
                    id: rateItem?.toCountryCurrency?.id,
                  },
                  feePercentage: 0.0,
                  transactionFeeThreshold: 1000,
                  adminRateBands: [],
                });
              }}
              className="confirm"
            >
              {" "}
              <span>{mutateLoading ? "updating..." : "Update"}</span>
            </button>
          </div>
        </AppModal>
      )}
    </div>
  );
}

const Container = styled.div`
  .rates {
    display: flex;
    width: 40%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    @media screen and (max-width: 40em) {
      padding: 0 !important;
    }

    .pri,
    .sec {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        font-weight: 400;
        color: #000;
      }
    }

    > .pri img {
      width: 50px !important;
      vertical-align: middle;
      height: 50px !important;
      border-radius: 50%;
      @media screen and (max-width: 40em) {
        height: 50px !important;
        width: 50px !important;
      }
    }

    > .sec img {
      width: 50px !important;
      vertical-align: middle;
      height: 50px !important;
      border-radius: 50%;
      @media screen and (max-width: 40em) {
        height: 50px !important;
        width: 50px !important;
      }
    }
  }
`;
