import { DatePicker, Table } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    fixed: "left",
    width: 140,
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 1,
    },
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Other",
    dataIndex: "other",
    render: () => "Other",
  },
  {
    title: "Other 1",
    dataIndex: "other1",
    render: () => "Other 1",
  },
  {
    title: "Other 2",
    dataIndex: "other2",
    render: () => "Other 2",
  },
  {
    title: "Salary",
    dataIndex: "salary",
    fixed: "right",
    width: 120,
  },
];
const data = [
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com",
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com",
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com",
  },
];

const CustomTable = ({
  Apidata,
  tableColumns,
  loading,
  noData,
  scroll = {
    x: 1600,
    y: 800,
  },
  showDateFilter = false,
  date,
  setDate,
  pagination = true,
}) => {
  const [reportData, setReportData] = useState(Apidata);

  useEffect(() => {
    if (date !== null) {
      setReportData(
        Apidata?.filter((obj) => {
          if (obj?.dateCreated) {
            return (
              new Date(obj?.dateCreated).getTime() >=
                new Date(date?.[0]).getTime() &&
              new Date(obj?.dateCreated).getTime() <=
                new Date(date?.[1]).getTime()
            );
          }
          if (obj?.paymentDate) {
            return (
              new Date(obj?.paymentDate).getTime() >=
                new Date(date?.[0]).getTime() &&
              new Date(obj?.paymentDate).getTime() <=
                new Date(date?.[1]).getTime()
            );
          } else {
            return;
          }
        })
      );
    }
  }, [date?.[1]]);

  console.log(reportData, date, date?.[1] ? true : false, "reportData");
  return (
    <Content>
      {showDateFilter && (
        <div
          style={{
            padding: "20px",
            width: "300px",
          }}
        >
          (
          <DatePicker.RangePicker
            style={{
              width: "100%",
              padding: "21px",
              borderRadius: "8px",
              borderTop: "1px solid #b3b3b3",
              borderLeft: "1px solid #b3b3b3",
              borderRight: "1px solid #b3b3b3",
              borderBottom: "1px solid #b3b3b3",
              fontSize: "14px",
              color: "#000000",
              fontWeight: 500,
              backgroundColor: "white",
            }}
            onChange={(e) => {
              console.log(e);
              setDate(e);
            }}
          />
          )
        </div>
      )}
      <Table
        loading={loading}
        noDataElement={noData}
        columns={tableColumns || columns}
        data={Apidata || data}
        className="table3"
        onChange={(pagination, changedSorter) => {
          console.log(changedSorter);
        }}
        pagination={
          pagination
            ? {
                showTotal: true,
                total: Apidata?.length,
                pageSize: 10,
                pageSizeChangeResetCurrent: true,
              }
            : false
        }
        style={{
          padding: "12px 0",
        }}
        scroll={scroll}
      />
    </Content>
  );
};

export default CustomTable;
const Content = styled.div`
  .table3 {
    th {
      padding: 0px;
      font-size: 12px;
    }
    td {
      padding: 20px;
    }
  }
`;
