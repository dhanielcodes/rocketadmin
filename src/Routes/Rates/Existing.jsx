import { Link } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getRatesList } from "../../services/PayoutDashboard";
import CountryFlag from "react-country-flag";
import { kFormatter } from "../../utils/format";
import { useState } from "react";
import UpdateRatesModal from "../../modals/UpdateRatesModal";
import { countryObjectsArray } from "../../../config/CountryCodes";

function ExistingRatesTable() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: rates,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getRatesList"],
    queryFn: () => getRatesList(),
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
    },
    {
      title: "RECEIVING COUNTRY",
      dataIndex: "receiving",
      width: 190,
    },
    {
      title: "CURRENCY CODE",
      dataIndex: "currencyCode",
      width: 160,
    },
    {
      title: "CATEGORY",
      dataIndex: "currencyRateMetaData['name']",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "RATE",
      dataIndex: "conversionRate",
      render: (ire) => kFormatter(ire),
      width: 120,
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
            countryCode={countryObjectsArray(item?.fromCountryCurrency?.name)}
            svg
          />
          {item?.fromCountryCurrency["currencyCode"]}
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
            countryCode={countryObjectsArray(item?.toCountryCurrency?.name)}
            svg
          />
          {item?.toCountryCurrency["currencyCode"]}
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
            countryCode={countryObjectsArray(
              item?.currencyRateMetaData?.country?.name
            )}
            svg
          />
          {item?.currencyRateMetaData?.country["currencyCode"]}
        </div>
      ),
    };
  });

  console.log(newData);

  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Existing Rates </div>
          <div className="sub">
            This page allows you edit and update clients{" "}
          </div>
        </div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}

        <UpdateRatesModal modal={modal} setModal={setModal} rateItem={rate} />
        <CustomTable
          noData={rates?.data?.length}
          loading={isLoading || isFetching}
          Apidata={newData}
          tableColumns={columns}
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
