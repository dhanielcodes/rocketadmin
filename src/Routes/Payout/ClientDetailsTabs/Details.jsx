import React from "react";
import styled from "styled-components";
import AppInput from "../../../reuseables/AppInput";

export default function Details({ clientDetails }) {
  return (
    <DetailsStyle>
      <div className="name">
        <label>Full Name</label>
        <AppInput
          placeholder="Enter name"
          type="text"
          width="95%"
          name="firstName"
          value={clientDetails?.companyName}
        />
      </div>
      <div className="name">
        <label>Email</label>
        <AppInput
          placeholder="Enter name"
          type="text"
          width="95%"
          name="firstName"
          value={clientDetails?.email}
        />
      </div>
      <div className="name">
        <label>City</label>
        <AppInput
          placeholder="Enter name"
          type="text"
          width="95%"
          name="firstName"
          value={clientDetails?.city?.name}
        />
      </div>
      <div className="name">
        <label>Address</label>
        <AppInput
          placeholder="Enter name"
          type="text"
          width="95%"
          name="firstName"
          value={
            clientDetails?.city?.name + ", " + clientDetails?.country?.name
          }
        />
      </div>
    </DetailsStyle>
  );
}

const DetailsStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  .name {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .name label {
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    color: #344054;
  }
`;
