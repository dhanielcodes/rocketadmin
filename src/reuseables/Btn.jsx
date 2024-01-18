/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@arco-design/web-react";
import styled from "styled-components";

function Btn({
  children,
  loading,
  type,
  styles,
  size,
  disabled,
  clicking,
  className,
}) {
  return (
    <BtnS>
      <Button
        className={className}
        onClick={clicking}
        disabled={disabled}
        style={{
          color: "#fff",
          padding: "11px",
          borderRadius: "5px",
          background: "#00A85A",
          fontSize: "16px",
          cursor: "pointer",
          width: "100%",
          ...styles,
        }}
        type={type}
        loading={loading}
        size={90}
      >
        {children}
      </Button>
    </BtnS>
  );
}

const BtnS = styled.div`
  button {
    color: #fff !important;
  }
`;
export default Btn;
