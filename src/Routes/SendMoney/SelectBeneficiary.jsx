import styled from "styled-components";
import SectionHeader from "../../reuseables/SectionHeader";
import { useState } from "react";
import { beneficiaries } from "../../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@arco-design/web-react";

export default function SelectBeneficiary({ active, setActive }) {
  const [params] = useSearchParams();

  const {
    data: benelist,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["beneficiariessw"],
    queryFn: () => beneficiaries(params.get("id")),
  });
  return (
    <Content>
      <div className="tablecontent">
        <SectionHeader
          title="Beneficiary"
          desc="Select a beneficiary to send money to"
        />
        <hr
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            opacity: "0.4",
          }}
        ></hr>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr ",
            gridGap: "40px",
          }}
        >
          {benelist?.data?.length ? (
            benelist?.data?.map((item) => {
              return (
                <div
                  onClick={() => {
                    setActive(item);
                  }}
                  className="card"
                  style={{
                    border: `1px solid ${
                      active === item ? "#00A85A" : "#E9EDF5"
                    }`,
                  }}
                >
                  <svg
                    width="85"
                    height="85"
                    viewBox="0 0 85 85"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1064_127863)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M42.4997 7.08203C22.939 7.08203 7.08301 22.9381 7.08301 42.4987C7.08301 62.0593 22.939 77.9154 42.4997 77.9154C62.0603 77.9154 77.9163 62.0593 77.9163 42.4987C77.9163 22.9381 62.0603 7.08203 42.4997 7.08203ZM30.1038 33.6445C30.1038 32.0167 30.4245 30.4048 31.0474 28.9009C31.6704 27.3969 32.5834 26.0304 33.7345 24.8794C34.8856 23.7283 36.2521 22.8152 37.756 22.1923C39.2599 21.5693 40.8718 21.2487 42.4997 21.2487C44.1275 21.2487 45.7394 21.5693 47.2434 22.1923C48.7473 22.8152 50.1138 23.7283 51.2649 24.8794C52.4159 26.0304 53.329 27.3969 53.9519 28.9009C54.5749 30.4048 54.8955 32.0167 54.8955 33.6445C54.8955 36.9321 53.5895 40.085 51.2649 42.4097C48.9402 44.7344 45.7873 46.0404 42.4997 46.0404C39.2121 46.0404 36.0592 44.7344 33.7345 42.4097C31.4098 40.085 30.1038 36.9321 30.1038 33.6445ZM64.6634 60.1504C62.0123 63.4853 58.6419 66.1781 54.804 68.0278C50.9662 69.8774 46.76 70.836 42.4997 70.832C38.2394 70.836 34.0332 69.8774 30.1953 68.0278C26.3575 66.1781 22.9871 63.4853 20.3359 60.1504C26.077 56.0314 33.9111 53.1237 42.4997 53.1237C51.0882 53.1237 58.9224 56.0314 64.6634 60.1504Z"
                        fill="#D3D0D0"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1064_127863">
                        <rect width="85" height="85" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="card_title">{item?.beneficiaryName}</div>
                  <div className="card_cont">
                    {item?.beneficiaryCountry?.name}
                  </div>
                  <div className="card_num">
                    Account ending with ...
                    {item?.beneficiaryBank?.accountNumber?.slice(6, 10)}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                    }}
                  >
                    {active === item ? (
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
                        <rect
                          x="0.466535"
                          y="0.466535"
                          width="15.0669"
                          height="15.0669"
                          rx="6.99803"
                          stroke="#169D07"
                          stroke-width="0.933071"
                        />
                        <path
                          d="M11.1101 5.66797L6.83355 9.94454L4.88965 8.00065"
                          stroke="white"
                          stroke-width="1.55512"
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
            })
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </Content>
  );
}

const Content = styled.div`
  .tablecontent {
    background-color: white;
    margin-bottom: 30px;
    border-radius: 10px;

    padding: 20px;
  }

  .card {
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;

    .card_title {
      color: #5a6376;
      font-size: 16px;
    }
    .card_cont {
      color: #667085;
      margin-bottom: 30px;
      margin-top: 10px;
    }
    .card_num {
      font-size: 12px;
      color: #667085;
    }
  }
`;
