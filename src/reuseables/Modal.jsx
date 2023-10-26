import React from "react";
import { styled } from "styled-components";

function Modal({ onClick, title, children }) {
  return (
    <Content>
      <div className="overlay">
        <div className="white">
          <div className="main">
            <h2>{title}</h2>
            <svg
              onClick={onClick}
              width="42"
              height="42"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1054_124834)">
                <path
                  d="M11.2274 9.63609C10.788 9.19675 10.0757 9.19675 9.63637 9.63609C9.19703 10.0754 9.19703 10.7877 9.63637 11.2271L14.4093 16L9.63642 20.773C9.19708 21.2123 9.19708 21.9246 9.63642 22.364C10.0758 22.8033 10.7881 22.8033 11.2274 22.364L16.0003 17.591L20.7733 22.364C21.2126 22.8033 21.925 22.8033 22.3643 22.364C22.8036 21.9247 22.8036 21.2124 22.3643 20.773L17.5913 16L22.3643 11.227C22.8037 10.7877 22.8037 10.0754 22.3643 9.63604C21.925 9.1967 21.2127 9.1967 20.7734 9.63604L16.0003 14.4091L11.2274 9.63609Z"
                  fill="#464F60"
                />
              </g>
              <defs>
                <clipPath id="clip0_1054_124834">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(4 4)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          {children}
        </div>
      </div>
    </Content>
  );
}

export default Modal;
const Content = styled.div`
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000000be;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  .white {
    background-color: white;
    position: relative;
    border-radius: 10px;
    width: 100%;
    max-height: 50%;
    max-width: 600px;
    overflow: hidden;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 30px 30px 30px;
  }
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main h2 {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
  }

  /* .check input[type="checkbox"]{
    width: 25px;
  } */
`;
