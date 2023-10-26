import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { styled } from "styled-components";

function SearchInput({ value, onChange, placeholder, style }) {
  return (
    <Content>
      <div className="search">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
            stroke="#667085"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </Content>
  );
}

export default SearchInput;
const Content = styled.div`
  .search {
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    width: 100%;
    max-width: 16vw;
    border-radius: 5px;
  }
  .search input {
    border: none;
    width: 100%;
    font-size: 16px;
  }
  .search ::placeholder {
    font-size: 16px;
  }
`;
