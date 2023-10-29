/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Select from "react-select";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import {
  getPaymentProviders,
  getPayoutProviders,
} from "../services/PayoutDashboard";
const GatewayDropdown = ({ value, onChange, style, defaultValue, options }) => {
  return (
    <CountyCont>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        defaultValue={defaultValue}
        getOptionLabel={(provider) => (
          <div className="countryName" style={{ fontSize: "16px" }}>
            {provider.name}
          </div>
        )}
        styles={{
          option: (styles) => ({
            ...styles,
            display: "flex",
            alignItems: "center",
            color: "#000",
            width: "100%",
            fontSize: "30px",
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
    </CountyCont>
  );
};

const CountyCont = styled.div`
  width: 100%;
  margin-top: 10px;

  .flag {
    @media screen and (max-width: 40em) {
      font-size: 20px;
    }
    font-size: 30px;
    margin-top: 5px;
    /* border: 1px solid rgba(5, 142, 78, 1); */
  }
  .countryName {
    /* font-weight: bold !important ; */
  }
  .dropdown:focus {
    color: #ffffff;
  }
`;

export default GatewayDropdown;
