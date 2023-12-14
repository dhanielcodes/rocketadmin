import React from "react";
import styled from "styled-components";
import Select from "react-select";

export default function AppSelect2({
  label,
  value,
  onChange,
  options,
  defaultValue,
  optionLabel,
  disabled,
  removeCutBorder,
  cut,
}) {
  return (
    <NewSelect className="name">
      {label && <label>{label}</label>}
      <Select
        className={cut && "other"}
        classNames={cut && "other"}
        value={value}
        onChange={onChange}
        options={options}
        defaultValue={defaultValue}
        isDisabled={disabled}
        getOptionLabel={(provider) => (
          <span className="countryName" style={{ fontSize: "16px" }}>
            {provider.label}
          </span>
        )}
        styles={{
          option: (styles) => ({
            ...styles,
            display: "flex",
            alignItems: "center",
            color: "#000",
            width: "100%",
            fontSize: "30px",
            /*  borderRadius: cut ? "8px 0px 0px 8px" : "8px",
            borderRight: removeCutBorder ? "none" : "1px solid #b3b3b3", */
            //   border:"0.1px solid #d8d8d8",
            //   backgroundColor:"#e4e4e4",
            //   borerRadius:"18px"
          }),
          menuList: (styles) => ({
            ...styles,
            display: "flex",
            backgroundColor: "#FFF",
            flexDirection: "column",
            // gap:"10px",
            color: "#FFF",
            borerRadius: "18px",
            width: "100%",
            alignItems: "center",
          }),

          singleValue: (styles) => ({
            ...styles,
            display: "flex",
            width: "100%",
            color: "#000",
            alignItems: "center",
            "> svg": {
              marginRight: "8px",
              borderRadius: "50%",
            },
          }),
        }}
      />
    </NewSelect>
  );
}

const NewSelect = styled.div`
  width: 100%;
  .css-13cymwt-control {
    padding: 2px;
    border-radius: 8px 0px 0px 8px;
    border-right: 1px solid #b3b3b3;
  }

  .css-13cymwt-control.other {
    padding: 2px;
    border-radius: 8px;
    border-right: none;
  }
  .select {
    padding: 20px;
  }
`;
