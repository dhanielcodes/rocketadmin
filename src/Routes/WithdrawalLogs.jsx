import WalletWithdrawLogs from "./Dashboard/WalletWithdrawLogs";
import BodyLayout from "../reuseables/BodyLayout";
import styled from "styled-components";
import { getwithdrawalrequestlog } from "../services/Dashboard";
import { useQuery } from "@tanstack/react-query";

export default function WithdrawalLogs() {
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["getwithdrawalrequestlog"],
    queryFn: () => getwithdrawalrequestlog(),
  });
  return (
    <>
      <BodyLayout>
        <Header>
          <div className="content">
            <div className="heading">Wallet Withdrawal Logs </div>
            <div className="sub">
              This page allows you to see all wallet withdrawals made.{" "}
            </div>
          </div>
        </Header>
        <WalletWithdrawLogs
          data={data?.data}
          refetch={refetch}
          loading={isLoading || isFetching}
        />
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
