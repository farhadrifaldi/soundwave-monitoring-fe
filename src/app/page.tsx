"use client";

import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Select,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Divider,
} from "antd";
// import dynamic from "next/dynamic";

const { Sider } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

// const SpectrogramChart = dynamic(() => import("./SpectrogramChart"), {
//   ssr: false,
// });

const alerts = [
  {
    id: "#00013211",
    type: "CNC Machine",
    severity: "Moderate",
    date: "2021-06-18 20:10:04",
  },
  {
    id: "#00013211",
    type: "Milling Machine",
    severity: "Moderate",
    date: "2021-06-18 20:10:04",
  },
  {
    id: "#00013211",
    type: "Milling Machine",
    severity: "Moderate",
    date: "2021-06-18 20:10:04",
  },
];

const MainContent = () => {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAction] = useState();
  const [comment, setComment] = useState("");

  return (
    <Layout>
      <Sider width={300} theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={[
            {
              key: "group",
              type: "group",
              label: "6 Alerts",
              children: alerts.map((alert, index) => ({
                key: `${index}`,
                label: (
                  <div onClick={() => setSelectedAlert(alert)}>
                    <Text strong>ID {alert.id}</Text>
                    <br />
                    <Text type="secondary">Unknown Anomaly</Text>
                    <br />
                    <Text>{alert.type}</Text>
                    <br />
                    <Text type="secondary">Detected at {alert.date}</Text>
                  </div>
                ),
              })),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Card>
          <Text>Detected at {selectedAlert.date}</Text>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Title level={5}>Anomaly Machine Output</Title>
              {/* <SpectrogramChart type="anomaly" /> */}
            </Col>
            <Col span={12}>
              <Title level={5}>Normal Machine Output</Title>
              {/* <SpectrogramChart type="normal" /> */}
            </Col>
          </Row>

          <Divider />

          <Row gutter={16}>
            <Col span={8}>
              <Text strong>Equipment</Text>
              <br />
              <Text>{selectedAlert.type}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Suspected Reason</Text>
              <br />
              <Select defaultValue="Unknown Anomaly" style={{ width: "100%" }}>
                <Option value="Unknown Anomaly">Unknown Anomaly</Option>
                <Option value="Overload">Overload</Option>
                <Option value="Component Fault">Component Fault</Option>
              </Select>
            </Col>
            <Col span={8}>
              <Text strong>Action Required</Text>
              <br />
              <Select
                placeholder="Select Action"
                style={{ width: "100%" }}
                onChange={setAction}
              >
                <Option value="Check Machine">Check Machine</Option>
                <Option value="Log and Monitor">Log and Monitor</Option>
                <Option value="Schedule Maintenance">
                  Schedule Maintenance
                </Option>
              </Select>
            </Col>
          </Row>

          <Divider />

          <Text strong>Comments</Text>
          <TextArea
            rows={4}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />

          <Divider />

          <Button type="primary">Update</Button>
        </Card>
      </Layout>
    </Layout>
  );
};

export default MainContent;
