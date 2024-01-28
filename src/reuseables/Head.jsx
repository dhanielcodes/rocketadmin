import { Badge, Avatar, Space, Grid } from "@arco-design/web-react";
import { IconClockCircle } from "@arco-design/web-react/icon";
import { IconUser, IconNotification } from "@arco-design/web-react/icon";
import { Breadcrumb } from "@arco-design/web-react";
import styled from "styled-components";
import NotificationTab from "../COMPONENTS/NotificationTab";
import { useState } from "react";
import NotificationTabKyc from "../COMPONENTS/NotificationTabKyc";
const BreadcrumbItem = Breadcrumb.Item;

const App = () => {
  const [notif, setNotif] = useState(false);
  const [kyc, setKyc] = useState(false);
  return (
    <Content>
      <Breadcrumb>
        <Breadcrumb.Item>Transfer Rocket</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ position: "relative" }}>
          <svg
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={() => {
              setKyc(!kyc);
              setNotif(false);
            }}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_524_24238)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.8695 14.4006L30.7885 22.9206L35.7076 31.4406C36.0975 32.1161 36.0975 32.9238 35.7076 33.5993C35.3176 34.2748 34.6181 34.6786 33.8381 34.6786H14.162C13.382 34.6786 12.6825 34.2748 12.2925 33.5993C11.9025 32.9238 11.9025 32.1161 12.2925 31.4406L17.2115 22.9206L22.1306 14.4006C22.5206 13.7251 23.2201 13.3213 24 13.3213C24.7801 13.3213 25.4795 13.7251 25.8695 14.4006ZM24 29.2214C24.5447 29.2214 24.9862 29.6629 24.9862 30.2076C24.9862 30.7522 24.5447 31.1937 24 31.1937C23.4554 31.1937 23.0139 30.7522 23.0139 30.2076C23.0139 29.6629 23.4554 29.2214 24 29.2214ZM24.0005 18.33C24.6629 18.33 25.264 18.8755 25.2277 19.5572L24.7894 27.7969H23.3431L22.7733 19.5572C22.7268 18.8839 23.3256 18.33 24.0005 18.33Z"
                fill="#FDB022"
              />
            </g>
            <defs>
              <clipPath id="clip0_524_24238">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(12 12)"
                />
              </clipPath>
            </defs>
          </svg>
          <div
            style={{
              opacity: kyc ? 1 : 0,
              pointerEvents: kyc ? "all" : "none",
            }}
          >
            <NotificationTabKyc
              close={() => {
                setKyc(false);
              }}
            />
          </div>
        </div>

        <div style={{ paddingRight: "20px", position: "relative" }}>
          <svg
            style={{ cursor: "pointer" }}
            onClick={() => {
              setNotif(!notif);
              setKyc(false);
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.80597 8.51163C5.80597 4.91535 8.57913 2 12 2C15.4209 2 18.194 4.91535 18.194 8.51163V11.329C18.194 12.4999 18.6829 13.6196 19.5463 14.4265C20.4952 15.3131 19.8566 16.8837 18.5472 16.8837H5.45275C4.14343 16.8837 3.50485 15.3131 4.45368 14.4265C5.31715 13.6196 5.80597 12.4999 5.80597 11.329V8.51163Z"
              fill="#A1A9B8"
            />
            <path
              d="M11.9998 22C13.6792 22 15.0407 20.7208 15.0407 19.1429C15.0407 19.1161 15.0403 19.0895 15.0395 19.0629C15.0327 18.8324 14.82 18.6648 14.5747 18.6622L9.4371 18.6075C9.19176 18.6048 8.97505 18.7679 8.96282 18.9981C8.96027 19.0461 8.95898 19.0943 8.95898 19.1429C8.95898 20.7208 10.3204 22 11.9998 22Z"
              fill="#A1A9B8"
            />
          </svg>
          <div
            style={{
              opacity: notif ? 1 : 0,
              pointerEvents: notif ? "all" : "none",
            }}
          >
            <NotificationTab
              close={() => {
                setNotif(false);
              }}
            />
          </div>
        </div>
      </div>
      {/* <Space size={30} style={{display:'inline-flex',float:'right',paddingRight:'5px'}}>
      <Badge count={9} >
        <Avatar shape='circle' >
        <span>
      <IconNotification />
          </span>
        </Avatar>

      </Badge> 
       <Badge
        count={9}
        dot
        dotStyle={{ width: 8, height: 8 }}
      >
        <Avatar shape='square'>
            <span>
            <IconUser />

            </span>
        </Avatar>
      </Badge> 
       <Badge
        count={
          <IconClockCircle
            style={{ verticalAlign: 'middle', color: 'var(--color-text-2)' }}
          />
        }
        dotStyle={{
          height: 16,
          width: 16,
          fontSize: 14,
        }}
      >
        <Avatar shape='square' />
      </Badge>
       
    </Space> */}
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default App;
