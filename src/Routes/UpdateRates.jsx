import BodyLayout from "../reuseables/BodyLayout";
import ExistingRatesTable from "./Rates/Existing";
import styled from "styled-components";
import OurRatesTable from "./Rates/OurRatesTable";
import AgentRatesTable from "./Rates/AgenrRatesTable";
import { useState } from "react";
import CreateRateModal from "../modals/CreateRateModal";

export default function UpdateRatesPage() {
  const [modal, setModal] = useState();
  return (
    <>
      <BodyLayout>
        <CreateRateModal modal={modal} setModal={setModal} />

        <Header>
          <div className="content">
            <div className="heading">Update Rates & Fees </div>
            <div className="sub">
              This page allows you to manage and update transfer rates and fee{" "}
            </div>
          </div>
          <button
            onClick={() => {
              setModal(true);
            }}
            className="confirm"
          >
            {" "}
            <span>Create Rate</span>
          </button>
        </Header>
        <ExistingRatesTable />

        <OurRatesTable />
        <AgentRatesTable />
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
