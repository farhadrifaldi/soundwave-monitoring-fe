"use client";

import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const HeaderBar = () => (
  <Header style={{ background: '#fff', paddingLeft: 20 }}>
    <Title level={4} style={{ margin: 0 }}>Monitor Alert</Title>
  </Header>
);

export default HeaderBar;
