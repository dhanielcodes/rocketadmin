import React from "react";
import { styled } from "styled-components";

function AppButton({ placeholder, onClick, style, disabled }) {
  return (
    <Content>
      <div className="btn" onClick={onClick}>
        <button disabled={disabled} style={style}>
          {placeholder}
        </button>
      </div>
    </Content>
  );
}

export default AppButton;
const Content = styled.div`
  .btn button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    color: white;
    border: none;
    margin: auto;
    background-color: #00a85a;
  }
`;
