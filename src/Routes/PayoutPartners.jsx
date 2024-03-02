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
import { useEffect, useState } from "react";
import { kFormatter, kFormatter2, kFormatter3 } from "../utils/format";
import toast from "react-hot-toast";

export default function PayoutPartnersPage() {
  const { data: payoutPartner } = useQuery({
    queryKey: ["getPayoutPartner"],
    queryFn: () => getPayoutPartner(),
  });
  const [selectedPartner, setSelectedPartner] = useState();
  const [selectedGateway, setSelectedGateway] = useState();

  const [loading, setLoading] = useState(false);

  const [logs, setLogs] = useState([]);

  const [gateWays, setGateWays] = useState([]);

  const [date, setDate] = useState();

  const getPayoutPartnerLogs = async (id) => {
    setLoading(true);

    try {
      const data = await getPayoutPartnerLog(id);
      console.log(data?.data);
      setLoading(false);
      if (data?.status) {
        setLogs(data?.data || []);
      } else {
        toast.error(data?.message);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getPayoutGateways = async (id) => {
    try {
      const data = await getPayoutPartnerGateways(id);
      console.log(data?.data);
      setGateWays(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(gateWays);

  console.log(
    logs?.filter(
      (item) => item?.payOutProvider?.id === selectedGateway?.providerId
    )
  );

  const filtered =
    logs?.filter(
      (item) => item?.payOutProvider?.id === selectedGateway?.providerId
    ) || [];

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
          {gateWays?.map((item) => {
            return (
              <div className="body_card">
                <div className="card_top">{item?.providerName}</div>
                <div className="card_middle">Naira Balance</div>
                <div className="card_bottom">
                  {kFormatter3(item?.wallet?.balance)}
                </div>
              </div>
            );
          })}
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
                  getPayoutGateways(e?.id);
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
                  getPayoutPartnerLogs(
                    `?partnerId=${selectedPartner?.id}&start=${date[0]}&end=${date[1]}`
                  );
                }}
              >
                {" "}
                <span>Search</span>
              </button>
            </div>
            <div className="cont">
              <AppSelect
                options={
                  gateWays?.map((item) => {
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

        {
          <PayoutPartnersTable
            isLoading={loading}
            data={filtered || logs || []}
          />
        }
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
    margin-right: 10px;

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
