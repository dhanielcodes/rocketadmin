import React from "react";
import SectionHeader from "../../reuseables/SectionHeader";
import BodyLayout from "../../reuseables/BodyLayout";
import { Provider } from "react-intl/src/components/injectIntl";
import styled from "styled-components";
import {
  getKYCProviders,
  getPayoutClientDashboard,
  updatePayoutClientWalletProvider,
} from "../../services/PayoutDashboard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@arco-design/web-react";

export default function KYCProvider() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const {
    data: kyrproviders,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["kyrproviders"],
    queryFn: () => getKYCProviders(),
  });

  const {
    mutate,
    isLoading: mutateLoading,
    isError,
  } = useMutation({
    mutationFn: updatePayoutClientWalletProvider,
    onSuccess: (data) => {
      refetch();
    },
    onError: (data) => {
      //setModal(true);

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const providers = kyrproviders?.data;
  return (
    <BodyLayout>
      <SectionHeader
        title="KYC Providers"
        desc="This page allows you to select a KYC Provider for your platform"
      />

      <ProviderStyle>
        <div
          style={{
            borderBottom: "1px solid #EAECF0",
            width: "100%",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Choose your preferred KYC Provider
          </div>
          <div>
            Select a provider from the options below and click update to save
            changes
          </div>
        </div>

        <div
          style={{
            borderBottom: "1px solid #EAECF0",
            width: "100%",
            paddingBottom: "20px",
            paddingTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {providers?.map((item) => {
            return isLoading || mutateLoading || isFetching ? (
              <Skeleton />
            ) : (
              <div
                onClick={() => {
                  if (item?.status) {
                    return;
                    // mutate({ objectId: userId, action: 0, payOutClientWalletProviderId: });
                  } else {
                    /*  mutate({
                    objectId: userId,
                    action: 1,
                    payOutClientWalletProviderId: item?.id,
                  }); */
                    mutate(item?.id);
                  }
                }}
                style={{
                  border: item?.status
                    ? "1px solid #00A85A"
                    : "1px solid #EAECF0",
                  borderRadius: "10px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "1000px",
                        marginRight: "10px",
                      }}
                      src={item?.logo}
                      alt=""
                    />

                    <span>{item?.name}</span>
                  </div>
                  {item?.status ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.466535"
                        y="0.466535"
                        width="15.0669"
                        height="15.0669"
                        rx="6.99803"
                        fill="#169D07"
                      />
                      <path
                        d="M11.1102 5.66699L6.83362 9.94357L4.88972 7.99967"
                        stroke="white"
                        stroke-width="1.55512"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="0.466535"
                        y="0.466535"
                        width="15.0669"
                        height="15.0669"
                        rx="6.99803"
                        stroke="#169D07"
                        stroke-width="0.933071"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.466535"
                        y="0.466535"
                        width="15.0669"
                        height="15.0669"
                        rx="6.99803"
                        fill="white"
                      />
                      <rect
                        x="0.466535"
                        y="0.466535"
                        width="15.0669"
                        height="15.0669"
                        rx="6.99803"
                        stroke="#D0D5DD"
                        stroke-width="0.933071"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ProviderStyle>
    </BodyLayout>
  );
}

const ProviderStyle = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 20px;

  margin-top: 20px;
`;
