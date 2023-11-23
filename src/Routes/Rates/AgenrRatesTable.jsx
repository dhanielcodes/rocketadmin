import { Link } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getAgentRates } from "../../services/PayoutDashboard";
import CountryFlag from "react-country-flag";
import {
  kFormatter,
  kFormatter2,
  kFormatter3,
  kFormatter4,
} from "../../utils/format";

function AgentRatesTable() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: rates,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getAgentRates"],
    queryFn: () => getAgentRates(),
  });

  console.log(rates);

  const columns = [
    {
      title: "RATE ID",
      dataIndex: "id",
      width: 140,

      //render: () => "Other",
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
      title: "RATE CATEGORY",
      dataIndex: "rateUpdateOption",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "INITIAL RATE",
      dataIndex: "conversionRate",
      render: (ire) => kFormatter(ire),
      width: 120,
    },
    {
      title: "UPDATED RATE",
      dataIndex: "rateUpdateValue",
      render: (ire) => kFormatter4(ire),
      width: 120,
    },
    {
      title: "ADMIN LAST UPDATED DATE",
      dataIndex: "adminLastUpdate",
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
            countryCode={item?.fromCountryCurrency?.currencyCode?.slice(0, 2)}
            svg
          />
          {item?.fromCountryCurrency["name"]}
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
            countryCode={item?.toCountryCurrency?.currencyCode?.slice(0, 2)}
            svg
          />
          {item?.toCountryCurrency["name"]}
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
            countryCode={item?.currencyRateMetaData?.country?.currencyCode?.slice(
              0,
              2
            )}
            svg
          />
          {item?.currencyRateMetaData?.country["name"]}
        </div>
      ),
    };
  });

  console.log(newData);

  return (
    <Content>
      <div className="tablecontent">
        <div className="content">
          <div className="heading">Agent Rates </div>
        </div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}
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

export default AgentRatesTable;
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
