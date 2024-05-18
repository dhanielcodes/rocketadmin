import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
import AppSelect from "../reuseables/AppSelect";

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

  const [thresh, setThresh] = useState();
  const [fee, setFee] = useState(null);
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
      title: "CHARGE/FEE",
      dataIndex: "charge",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },

    {
      title: "MINIMUM AMOUNT",
      dataIndex: "minimumAmount",
      /*  render: (ire) =>
        FormatCorrect(
          rateItem?.adminRateBands?.find((item) => item?.id === ire)
            ?.minimumAmount,
          null
        ), */
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },
    {
      title: "MAXIMUM AMOUNT",
      dataIndex: "maximumAmount",
      /*  render: (ire) =>
        FormatCorrect(
          rateItem?.adminRateBands?.find((item) => item?.id === ire)
            ?.maximumAmount,
          null
        ), */
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 130,
    },

    {
      title: "RATE",
      dataIndex: "rate",
      /* render: (ire) =>
        FormatCorrect(
          rateItem?.adminRateBands?.find((item) => item?.id === ire)?.rate,
          rateItem?.toCurrency?.code
        ), */
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 170,
    },
  ];

  const [rateBands, setRateBands] = useState([]);
  const [rateBand, setRateBand] = useState({});
  const [modal2, setModal2] = useState(false);

  useEffect(() => {
    setRateBands(rateItem?.adminRateBands);
    setFee(rateItem?.feePercentage);
    setThresh(rateItem?.transactionFeeThreshold);
    setRate(rateItem?.conversionRate);
  }, [rateItem]);
  const updateRateBandsArray = () => {
    const newState = rateBands?.map((obj) => {
      // 👇️ if id equals 2, update country property
      setModal2(false);

      if (obj?.id === rateBand?.id) {
        toast.success(`Rate Column Updated`);
        setModal2(false);
        return {
          ...obj,
          maximumAmount: rateBand?.maximumAmount,
          minimumAmount: rateBand?.minimumAmount,
          rate: rateBand?.rate,
          chargeType: rateBand?.chargeType,
          charge: rateBand?.charge,
        };
      }

      // 👇️ otherwise return the object as is
      return obj;
    });

    console.log(newState, "fkks");

    setRateBands(newState);
  };
  console.log(rateBands, "fkks");

  const newData = rateBands?.map((item) => {
    return {
      ...item,
      action: (
        <div
          style={{
            textDecoration: "none",
          }}
          onClick={() => {
            setRateBand(item);
            setModal2(true);
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
    <>
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
              <div>
                <label
                  style={{
                    width: "60%",
                    display: "block",
                  }}
                >
                  Category
                </label>
                <AppSelect
                  options={[
                    {
                      label: "Agent",
                      value: 5,
                    },
                    {
                      label: "Customer",
                      value: 6,
                    },
                  ]}
                  disabled
                  defaultValue={{
                    ...rateItem?.currencyRateMetaData,
                    label: rateItem?.currencyRateMetaData?.name,
                    value: rateItem?.currencyRateMetaData?.name,
                  }}
                />
              </div>
              <div className="name">
                <label>Sending Currency</label>
                <CountryDropdown2
                  disabled={true}
                  value={{
                    ...rateItem,
                    label:
                      rateItem?.fromCurrency?.name +
                      " - " +
                      rateItem?.fromCurrency?.code,
                    value: rateItem?.fromCurrency?.name,
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
                      rateItem?.toCurrency?.name +
                      " - " +
                      rateItem?.toCurrency?.code,
                    value: rateItem?.toCurrency?.name,
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
                  value={rate}
                  //defaultValue={charge?.baseValue}
                />
              </div>

              <div className="name" style={{}}>
                <label>Charge Percentage</label>
                <AppInput
                  placeholder="How much"
                  type="number"
                  onChange={(e) => {
                    setFee(e.target.value);
                  }}
                  width="95%"
                  name="username"
                  value={fee}
                  //defaultValue={charge?.baseValue}
                />
              </div>
              <div className="name" style={{}}>
                <label>Charge Threshold</label>
                <AppInput
                  placeholder="How much"
                  type="number"
                  onChange={(e) => {
                    setThresh(e.target.value);
                  }}
                  width="95%"
                  name="username"
                  value={thresh}
                  //defaultValue={charge?.baseValue}
                />
              </div>
            </div>

            <Container>
              <div className="rates">
                <div className="pri">
                  <ReactCountryFlag
                    countryCode={rateItem?.fromCurrency?.code.slice(0, 2)}
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
                    countryCode={rateItem?.toCurrency?.code.slice(0, 2)}
                    svg
                  />
                </div>
              </div>
            </Container>

            <CustomTable
              noData={newData?.length}
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
                    conversionRate: rate,
                    fromCurrency: {
                      id: rateItem?.fromCurrency?.id,
                    },
                    toCurrency: {
                      id: rateItem?.toCurrency?.id,
                    },
                    feePercentage: fee,
                    transactionFeeThreshold: thresh,
                    adminRateBands: rateBands,
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
      {modal2 && (
        <AppModal
          closeModal={() => {
            setModal2(false);
            setRateBand({});
          }}
          heading="Update Fees"
          maxWidth="980px"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              <label>Minimum Amount</label>
              <AppInput
                type="number"
                padding="12px"
                width="88%"
                defaultValue={rateBand?.minimumAmount}
                onChange={(e) => {
                  setRateBand({
                    ...rateBand,
                    minimumAmount: Number(e.target.value),
                  });
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
              }}
            >
              <label>Maximum Amount</label>
              <AppInput
                type="number"
                padding="12px"
                width="90%"
                defaultValue={rateBand?.maximumAmount}
                onChange={(e) => {
                  setRateBand({
                    ...rateBand,
                    maximumAmount: Number(e.target.value),
                  });
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
              }}
            >
              <label>Rate</label>
              <AppInput
                type="number"
                padding="12px"
                width="90%"
                defaultValue={rateBand?.rate}
                onChange={(e) => {
                  setRateBand({
                    ...rateBand,
                    rate: Number(e.target.value),
                  });
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
              }}
            >
              <label>Transfer Fee</label>
              <AppInput
                defaultValue={rateBand?.charge}
                type="number"
                padding="12px"
                width="88%"
                onChange={(e) => {
                  setRateBand({
                    ...rateBand,
                    charge: Number(e.target.value),
                  });
                }}
              />
            </div>
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
                setRateBand({});
              }}
              className="cancel"
            >
              {" "}
              <span>Cancel</span>
            </button>
            <button
              className="confirm"
              onClick={() => {
                updateRateBandsArray();
              }}
            >
              {" "}
              <span>Update</span>
            </button>
          </div>
        </AppModal>
      )}
    </>
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
