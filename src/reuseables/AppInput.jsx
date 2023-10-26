import React from "react";
import { styled } from "styled-components";

function AppInput({ placeholder, value, onChange, width, type, name }) {
  return (
    <Content>
      <div className="top">
        <input
          style={{ width: width }}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </Content>
  );
}

export default AppInput;
const Content = styled.div`
  .top input {
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid gainsboro;
    font-size: 14px;
    font-weight: 500;
  }
  .top ::placeholder {
    font-size: 14px;
    font-weight: 500;
  }
`;
