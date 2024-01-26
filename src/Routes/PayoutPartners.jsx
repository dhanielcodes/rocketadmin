import { DatePicker } from "@arco-design/web-react";
import AppSelect from "../reuseables/AppSelect";
import BodyLayout from "../reuseables/BodyLayout";
import styled from "styled-components";
import PayoutPartnersTable from "./Dashboard/PayoutPartnersTable";
import {
  getPayoutPartner,
  getPayoutPartnerGateways,
  getPayoutPartnerLog,
} from "../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function PayoutPartnersPage() {
  const {
    data: payoutPartner,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getPayoutPartner"],
    queryFn: () => getPayoutPartner(),
  });
  const [selectedPartner, setSelectedPartner] = useState();
  const [selectedGateway, setSelectedGateway] = useState();
  const [date, setDate] = useState();

  const idd = selectedPartner?.id;

  const { data: payoutGateway, refetch } = useQuery({
    queryKey: ["getPayoutPartnerGateways"],
    queryFn: () => getPayoutPartnerGateways(idd),
  });

  const { data: payoutPartnerLogs, refetch: refetchLogs } = useQuery({
    queryKey: ["getPayoutPartnerLog"],
    queryFn: () =>
      getPayoutPartnerLog(
        `?partnerId=${selectedGateway?.providerId}&start=${date[0]}&end=${date[1]}`
      ),
  });
  console.log(payoutPartnerLogs);

  return (
    <>
      <BodyLayout>
        <Header>
          <div className="content">
            <div className="heading">Payout Partners </div>
            <div className="sub">
              This page allows you to manage all payout partners.{" "}
            </div>
          </div>
        </Header>
        <Body>
          <div className="body_card">
            <div className="card_top">OHP!</div>
            <div className="card_middle">Naira Balance</div>
            <div className="card_bottom">123</div>
          </div>
        </Body>
        <DataFields>
          <div className="data_cont">
            <div className="cont">
              <AppSelect
                label="Payout Partner"
                options={payoutPartner?.data?.map((item) => {
                  return {
                    ...item,
                    label: item?.name,
                    value: item?.name,
                  };
                })}
                onChange={(e) => {
                  setSelectedPartner(e);
                  refetch(e?.id);
                }}
              />{" "}
              <div>
                <label>Date Range</label>

                <DatePicker.RangePicker
                  placeholder="warning status"
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
              </div>
              <button
                className="confirm"
                onClick={() => {
                  refetchLogs();
                }}
              >
                {" "}
                <span>Search</span>
              </button>
            </div>
            <div className="cont">
              <AppSelect
                options={
                  payoutGateway?.data?.map((item) => {
                    return {
                      ...item,
                      label: item?.providerName,
                      value: item?.providerName,
                    };
                  }) || []
                }
                onChange={(e) => {
                  setSelectedGateway(e);
                }}
                label="Gateway"
              />{" "}
            </div>
          </div>
        </DataFields>

        <PayoutPartnersTable />
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

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .body_card {
    padding: 60px;
    background-color: white;
    border-radius: 20px;
    text-align: center;

    .card_top {
      font-weight: 500;
      font-size: 16px;
      color: #5a6376;
    }
    .card_middle {
      font-size: 16px;
      margin: 10px 0;
      color: #5a6376;
      font-weight: 500;
    }
    .card_bottom {
      font-size: 36px;
    }
  }
`;

const DataFields = styled.div`
  margin: 20px 0;
  border-radius: 20px;
  width: 100%;
  background-color: white;

  .data_cont {
    padding: 30px;
  }

  .cont {
    display: grid;
    grid-template-columns: 2fr 1.3fr 0.6fr 1fr 1fr;
    margin-bottom: 24px;
    align-items: flex-end;
    grid-gap: 20px;
  }
`;
