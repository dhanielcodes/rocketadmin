import React, { useState } from "react";
import { TiEye } from "react-icons/ti";
import { styled } from "styled-components";

function AppTextarea({
  placeholder,
  value,
  onChange,
  width,
  type,
  name,
  padding = "10px",
  disabled,
  defaultValue,
  cut,
  removeCutBorder,
  label,
}) {
  const [ntype, setType] = useState("password");

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };
  return (
    <Content>
      <div className="top">
        {label && (
          <div
            style={{
              marginBottom: "6px",
            }}
          >
            {label}
          </div>
        )}
        <textarea
          style={{
            width: width,
            padding: padding,
            borderRadius: "8px",
            border: "1px solid #b3b3b3",
          }}
          type={type === "password" ? ntype : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onWheel={numberInputOnWheelPreventChange}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          onKeyDown={(evt) => {
            if (type === "number") {
              ["e", "E", "+", "-", "=", "(", ")", "*", "&"].includes(evt.key) &&
                evt.preventDefault();
            }
          }}
        />
      </div>
      {/* HELLO */}
      {type === "password" && (
        <TiEye
          onClick={() => {
            if (ntype === "password") {
              setType("text");
            } else {
              setType("password");
            }
          }}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        />
      )}
    </Content>
  );
}

export default AppTextarea;
const Content = styled.div`
  position: relative;
  width: 100%;

  .top {
    padding: 0 !important;
  }

  .top input {
    padding: 11px;
    width: 100%;
    font-size: 14px;
    color: #000000;
    font-weight: 500;
    background-color: white;
  }
  .top ::placeholder {
    font-size: 14px;
    color: #7b7b7b;
    font-weight: 500;
  }
`;
