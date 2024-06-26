import { Link } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getOurRates } from "../../services/PayoutDashboard";
import CountryFlag from "react-country-flag";
import {
  FormatCorrect,
  Gsh,
  kFormatter3,
  numberWithCommas,
  removeDup,
} from "../../utils/format";
import { countryObjectsArray } from "../../../config/CountryCodes";
import { useEffect } from "react";

function OurRatesTable({ recall }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: rates,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getOurRates"],
    queryFn: () => getOurRates(),
  });

  console.log(rates);
  useEffect(() => {
    refetch();
    //eslint-disable-next-line
  }, [recall]);

  const columns = [
    {
      title: "S/N",
      dataIndex: "sn",
      fixed: "left",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 80,
    },
    {
      title: "CREATED BY",
      dataIndex: "createdByName",
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
            text: item?.fromCurrency,
            value: item?.fromCurrency,
          };
        })
      ),

      onFilter: (value, row) => row?.fromCurrency.indexOf(value) > -1,
      filterMultiple: true,
    },
    {
      title: "RECEIVING CURRENCY",
      dataIndex: "receiving",
      width: 190,
      filters: removeDup(
        rates?.data?.map((item) => {
          return {
            text: item?.toCurrency,
            value: item?.toCurrency,
          };
        })
      ),

      onFilter: (value, row) => row?.toCurrency.indexOf(value) > -1,
      filterMultiple: true,
    },
    {
      title: "CATEGORY",
      dataIndex: "currencyRateMetaData['name']",
      /*   sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      }, */
      width: 230,
    },
    {
      title: "RATE",
      dataIndex: "sn",
      render: (ire) =>
        FormatCorrect(
          rates?.data?.find((item) => item?.sn === ire)?.rate,
          rates?.data?.find((item) => item?.sn === ire)?.toCurrency
        ),
      width: 120,

      sorter: {
        compare: (a, b) => a.rate - b.rate,
        multiple: 3,
      },
    },
    {
      title: "CREATED DATE",
      dataIndex: "ratAsAt",
      width: 220,
      //render: () => "Other 2",
    },
  ];

  const newData = rates?.data?.map((item) => {
    return {
      ...item,

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
            countryCode={item?.fromCurrency?.slice(0, 2)}
            svg
          />
          {item?.fromCurrency}
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
            countryCode={item?.toCurrency?.slice(0, 2)}
            svg
          />
          {item?.toCurrency}
        </div>
      ),
    };
  });

  console.log(newData);

  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Our Rates</div>
        </div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}
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

export default OurRatesTable;
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
