import { Link } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRatesList } from "../../services/PayoutDashboard";
import CountryFlag from "react-country-flag";
import { FormatCorrect, kFormatter3 } from "../../utils/format";
import { useState } from "react";
import UpdateRatesModal from "../../modals/UpdateRatesModal";
import { countryObjectsArray } from "../../../config/CountryCodes";
import { IconSearch } from "@arco-design/web-react/icon";
import { Input, Switch } from "@arco-design/web-react";
import { removeDup } from "../../utils/format";
import { togglecurrencyrateconversion } from "../../services/Dashboard";

function ExistingRatesTable({ setRecall, recall }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: rates,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getRatesList"],
    queryFn: () => getRatesList(),
  });
  const { mutate, isLoading: togglecurrencyrateconversionLoading } =
    useMutation({
      mutationFn: togglecurrencyrateconversion,
      onSuccess: (data) => {
        refetch();
      },
      onError: (data) => {
        //setModal(true);

        setTimeout(() => {
          //  seterr("")
        }, 2000);
        return;
      },
    });
  console.log(rates);

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
      title: "SENDING CURRENCY",
      dataIndex: "sending",
      width: 190,
      filters: removeDup(
        rates?.data?.map((item) => {
          return {
            text: item?.fromCurrency?.["code"],
            value: item?.fromCurrency?.["code"],
          };
        })
      ),

      onFilter: (value, row) => row?.fromCurrency?.["code"].indexOf(value) > -1,
      filterMultiple: true,
    },
    {
      title: "RECEIVING CURRENCY",
      dataIndex: "receiving",
      width: 190,
      filters: removeDup(
        rates?.data?.map((item) => {
          return {
            text: item?.toCurrency?.["code"],
            value: item?.toCurrency?.["code"],
          };
        })
      ),

      onFilter: (value, row) => row?.toCurrency?.["code"].indexOf(value) > -1,
      filterMultiple: true,
    },
    {
      title: "CURRENCY CODE",
      dataIndex: "currencyCode",
      width: 160,
      filters: removeDup(
        rates?.data?.map((item) => {
          return {
            text: item?.currencyRateMetaData?.currency["code"],
            value: item?.currencyRateMetaData?.currency["code"],
          };
        })
      ),

      onFilter: (value, row) =>
        row?.currencyRateMetaData?.currency["code"].indexOf(value) > -1,
      filterMultiple: true,
    },
    {
      title: "CATEGORY",
      dataIndex: "currencyRateMetaData['name']",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "RATE",
      dataIndex: "id",
      render: (ire) =>
        FormatCorrect(
          rates?.data?.find((item) => item?.id === ire)?.conversionRate,
          rates?.data?.find((item) => item?.id === ire)?.toCurrency?.code
        ),
      width: 120,

      sorter: {
        compare: (a, b) => a.conversionRate - b.conversionRate,
        multiple: 3,
      },
    },
    {
      title: "CURRENCY RATE CONVERSION",
      dataIndex: "toggleRateConversion",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "ENTRY DATE",
      dataIndex: "dateCreated",
      width: 220,
      //render: () => "Other 2",
    },
  ];
  const [modal, setModal] = useState();
  const [rate, setRate] = useState();
  const [cus, setCus] = useState();

  const newData = rates?.data?.map((item) => {
    return {
      ...item,
      action: (
        <div
          onClick={() => {
            setModal(true);
            setRate(item);
          }}
          style={{
            textDecoration: "none",
          }}
          to={`/client-detail?userId=${item?.userId}`}
        >
          <p
            onClick={() => {
              console.log(item?.userId);
            }}
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            Update Rate
          </p>
        </div>
      ),

      sending: (
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
            countryCode={item?.fromCurrency?.code?.slice(0, 2)}
            svg
          />
          {item?.fromCurrency["code"]}
        </div>
      ),
      receiving: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CountryFlag
            style={{
              marginRight: "10px",
              borderRadius: "10000000px",
            }}
            countryCode={item?.toCurrency?.code?.slice(0, 2)}
            svg
          />
          {item?.toCurrency["code"]}
        </div>
      ),
      toggleRateConversion: (
        <div>
          <Switch
            loading={
              (item === cus && togglecurrencyrateconversionLoading) ||
              (item === cus && togglecurrencyrateconversionLoading)
            }
            /* disabled={
              disallowusermulticurrencyLoading || allowMultiCurrencyLoading
            } */
            onClick={() => {
              setCus(item);
              if (item?.status) {
                mutate({
                  action: 0,
                  objectId: item?.id,
                });
              } else {
                mutate({
                  action: 1,
                  objectId: item?.id,
                });
              }
            }}
            checked={item?.status}
          />
        </div>
      ),

      currencyCode: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CountryFlag
            style={{
              marginRight: "10px",
              borderRadius: "10000000px",
            }}
            countryCode={item?.currencyRateMetaData?.currency?.code?.slice(
              0,
              2
            )}
            svg
          />
          {item?.currencyRateMetaData?.currency?.["code"]}
        </div>
      ) /*  */,
    };
  });

  console.log(newData);

  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Existing Rates </div>
          <div className="sub">
            This page allows you edit and update existing rates{" "}
          </div>
        </div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}

        <UpdateRatesModal
          modal={modal}
          setModal={setModal}
          rateItem={rate}
          recall={() => {
            refetch();
            setRecall((prev) => prev + 1);
          }}
        />
        <CustomTable
          noData={rates?.data?.length}
          loading={isLoading || isFetching}
          Apidata={newData}
          tableColumns={columns}
          scroll={{
            x: 800,
            y: 800,
          }}
        />

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

export default ExistingRatesTable;
const Content = styled.div`
  .top {
    padding: 10px 30px 30px 20px;
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
