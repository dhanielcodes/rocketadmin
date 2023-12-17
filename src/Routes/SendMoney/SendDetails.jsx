import styled from "styled-components";
import SectionHeader from "../../reuseables/SectionHeader";
import { useState } from "react";
import { beneficiaries } from "../../services/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@arco-design/web-react";
import SendDetailsTop from "./SendDetailsTop";

export default function SendDetails() {
  const [active, setActive] = useState("");

  const [params] = useSearchParams();

  const {
    data: benelist,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["beneficiariess"],
    queryFn: () => beneficiaries(params.get("id")),
  });
  return (
    <Content>
      <div className="tablecontent">
        <SendDetailsTop />
        <hr
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            opacity: "0.4",
          }}
        ></hr>
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
