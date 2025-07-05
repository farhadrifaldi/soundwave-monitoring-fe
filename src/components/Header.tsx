"use client";

import React from "react";
import { Layout, Menu, Space, Badge, Divider } from "antd";
import { SettingOutlined, UserOutlined, BellOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left side: Logo and Menu */}
      <div style={{ display: "flex", alignItems: "center"}}>
        <div style={{ fontWeight: "bold", fontSize: 18, marginRight: 32 }}>
          <span style={{ fontFamily: "monospace" }}>GROUNDUP.AI</span>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["alerts"]}
          style={{ borderBottom: "none", width: "400px" }}
          items={[
            { key: "dashboard", label: "DASHBOARD" },
            { key: "alerts", label: "ALERTS" },
          ]}
        />
      </div>

      {/* Right side: Icons and Welcome */}
      <Space size="large">
        <SettingOutlined style={{ fontSize: 18 }} />
        <UserOutlined style={{ fontSize: 18 }} />
        <Badge count={3} size="small" offset={[-2, 2]}>
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>
        <Divider type="vertical" />
        <span>Welcome Admin!</span>
      </Space>
    </Header>
  );
};

export default AppHeader;
