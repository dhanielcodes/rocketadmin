import React, { useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Message,
} from "@arco-design/web-react";
import {
  IconHome,
  IconCalendar,
  IconCaretRight,
  IconCaretLeft,
} from "@arco-design/web-react/icon";
import "@arco-design/web-react/dist/css/arco.css";
import "../../styles/layout.css";
import Head from "./Head";
import Logo from "../assets/logo.png.svg";
import { useNavigate } from "react-router-dom";
import NewNavBar from "./NewNavBar";

const { Sider, Header, Footer, Content } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

const BodyLayout = ({ children, active }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  console.log(
    "🚀 ~ file: BodyLayout.jsx:28 ~ BodyLayout ~ window.location.pathname:",
    window.location.pathname.toString().replace("/", "")
  );

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout-collapse-demo" style={{ display: "flex" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        collapsible
        //trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
        breakpoint="xl"
        style={{
          width: collapsed ? "0" : "fit-content",
          paddingRight: "20px",
        }}
      >
        <NewNavBar />
      </Sider>

      <Layout>
        <Header style={{ paddingLeft: 20 }}>
          <Head />
        </Header>
        <Layout style={{ padding: "0 24px", height: "100%" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: "none", width: "100%" }}>{children}</div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BodyLayout;
