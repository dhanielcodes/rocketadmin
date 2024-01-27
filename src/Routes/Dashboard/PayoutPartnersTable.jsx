import { styled } from "styled-components";
import CustomTable from "../../reuseables/CustomTable";
import { kFormatter3 } from "../../utils/format";

function PayoutPartnersTable({ data, isLoading }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  console.log(userDetails);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 150,

      //render: () => "Other",
    },
    {
      title: "GATEWAY ID",
      dataIndex: "payoutClientApp['id']",
      width: 190,

      //render: () => "Other",
    },
    {
      title: "PAYOUT ID",
      dataIndex: "payOutProvider['id']",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "GATEWAY NAME",
      dataIndex: "payoutClientApp['appName']",
      width: 190,
    },
    {
      title: "BANK CODE",
      dataIndex: "beneficiary['beneficiaryBank']['bankCode']",
      width: 190,
    },

    {
      title: "BANK NAME",
      dataIndex: "beneficiary['beneficiaryBank']['bankName']",
      width: 280,

      //render: () => "Other",
    },
    {
      title: "ACCOUNT NUMBER",
      dataIndex: "beneficiary['beneficiaryBank']['accountNumber']",
      width: 170,

      //render: () => "Other",
    },
    {
      title: "ACCOUNT NAME",
      dataIndex: "beneficiary['beneficiaryBank']['accountName']",
      width: 240,

      //render: () => "Other",
    },
    {
      title: "TRANSACTION ID",
      dataIndex: "clientRef",
      width: 120,
    },

    {
      title: "STATUS",
      dataIndex: "status",
      width: 140,
    },
    {
      title: "CHARGES",
      dataIndex: "transferFee",
      width: 200,

      //render: () => "Other",
    },

    {
      title: "NARRATION",
      dataIndex: "note",
      width: 140,

      //render: () => "Other",
    },
    {
      title: "DATE",
      dataIndex: "dateCreated",
      width: 260,
      //render: () => "Other 2",
    },
  ];

  return (
    <Content>
      <div className="tablecontent">
        <div className="content"></div>
        {/*   <div className="top">
          <SearchInput placeholder="Search Records" className="SearchRecords" />
        </div> */}
        <CustomTable
          noData={data?.length}
          loading={isLoading}
          Apidata={data}
          tableColumns={columns}
        />
      </div>
    </Content>
  );
}

export default PayoutPartnersTable;
const Content = styled.div`
  .top {
    padding: 10px 30px 30px 20px;
  }
  .comment {
    border: 1px solid #c7c7c7;
    width: 100%;
    border-radius: 14px;
    padding: 20px 0px;
    display: grid;
    margin-bottom: 10px;
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
