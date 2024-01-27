import { Badge, Avatar, Space, Grid } from "@arco-design/web-react";
import { IconClockCircle } from "@arco-design/web-react/icon";
import { IconUser, IconNotification } from "@arco-design/web-react/icon";
import { Breadcrumb } from "@arco-design/web-react";
import styled from "styled-components";
import NotificationTab from "../COMPONENTS/NotificationTab";
const BreadcrumbItem = Breadcrumb.Item;

const App = () => {
  return (
    <Content>
      <Breadcrumb>
        <Breadcrumb.Item>Transfer Rocket</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ paddingRight: "20px", position: "relative" }}>
        <svg
          style={{ cursor: "pointer" }}
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
        <NotificationTab />
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
