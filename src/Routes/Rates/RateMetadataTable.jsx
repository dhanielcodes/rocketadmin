import { Link } from "react-router-dom";
import { styled } from "styled-components";

import SearchInput from "../../reuseables/SearchInput";
import CustomTable from "../../reuseables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getRatesList } from "../../services/PayoutDashboard";
import CountryFlag from "react-country-flag";
import { kFormatter } from "../../utils/format";
import { useEffect, useState } from "react";
import UpdateRatesModal from "../../modals/UpdateRatesModal";
import { getRoleMeta } from "../../services/Dashboard";
import CreateRateMetadataModal from "../../modals/CreateRateMetadataModal";
import UpdateRateMetadataModal from "../../modals/UpdateRateMetadataModal";

function RateMetadataTable({ recall, setRecall }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const {
    data: rates,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getRoleMetaa"],
    queryFn: () => getRoleMeta(),
  });

  console.log(rates);
  useEffect(() => {
    refetch();
    //eslint-disable-next-line
  }, [recall]);

  const columns = [
    {
      title: "ACTIONS",
      dataIndex: "action",
      fixed: "left",

      width: 100,
    },
    {
      title: "CATEGORY",
      dataIndex: "categoryRate",
      width: 100,
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      width: 300,
    },
    {
      title: "NAME",
      dataIndex: "name",
      width: 160,
    },
    {
      title: "TRANSFER BONUS THRESHOLD",
      dataIndex: "transferBonusThreshold",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "DATE CREATED",
      dataIndex: "dateCreated",
      width: 160,
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
            Update Metadata
          </p>
        </div>
      ),
    };
  });

  console.log(newData);

  return (
    <>
      <UpdateRateMetadataModal
        modal={modal}
        setModal={setModal}
        rateItem={rate}
        recall={recall}
        setRecall={setRecall}
      />

      <Content>
        <div className="tablecontent">
          <div className="content">
            <div className="heading"> </div>
            <div className="sub"></div>
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
    </>
  );
}

export default RateMetadataTable;
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
