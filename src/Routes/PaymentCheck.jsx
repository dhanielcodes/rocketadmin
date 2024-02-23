import BodyLayout from "../reuseables/BodyLayout";
import styled from "styled-components";
import TransferLogsTable from "./Dashboard/TransferLogs";

export default function IncompleteTransfersPage() {
  return (
    <>
      <BodyLayout>
        <Header>
          <div className="content">
            <div className="heading">Incomplete Transfers </div>
            <div className="sub">
              This page allows you to see all Incomplete Transfers made.{" "}
            </div>
          </div>
          {/*   <button
            onClick={() => {
              setModal(true);
            }}
            className="confirm"
          >
            {" "}
            <span>Create Metadata</span>
          </button> */}
        </Header>
        <TransferLogsTable category={1} />
      </BodyLayout>
    </>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .content {
    margin-bottom: 40px;
  }
  .content .heading {
    font-weight: 600;
    font-size: 28px;
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
`;
