import { Table } from "@arco-design/web-react";
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

const CustomTable = ({ Apidata, tableColumns, loading, noData }) => {
  return (
    <Content>
      <Table
        loading={loading}
        noDataElement={noData}
        columns={tableColumns || columns}
        data={Apidata || data}
        className="table3"
        onChange={(pagination, changedSorter) => {
          console.log(changedSorter);
        }}
        pagination={{
          showTotal: true,
          total: Apidata?.length,
          pageSize: 10,
          pageSizeChangeResetCurrent: true,
        }}
        style={{
          padding: "12px 0",
        }}
        scroll={{
          x: 1600,
          y: 400,
        }}
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
