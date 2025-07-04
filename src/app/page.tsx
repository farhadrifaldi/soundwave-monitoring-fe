"use client";

import React from "react";
import {
  Layout,
  Button,
  Select,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Divider,
  Space,
  Tag,
} from "antd";
import Link from "next/link";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import SoundWave from "@/components/SoundWave";
// import dynamic from "next/dynamic";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

// const SpectrogramChart = dynamic(() => import("./SpectrogramChart"), {
//   ssr: false,
// });

const alerts = [
  { id: "#00013211", machine: "CNC Machine", selected: true },
  { id: "#00013211", machine: "CNC Machine" },
  { id: "#00013211", machine: "CNC Machine" },
  { id: "#00013211", machine: "Miling Machine" },
  { id: "#00013211", machine: "Miling Machine" },
  { id: "#00013211", machine: "Miling Machine" },
];

const MainContent = () => {
  // const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [_, setAction] = useState();
  // const [comment, setComment] = useState("");

  return (
    <Layout style={{ background: "#fff", margin: 30, padding: 10 }}>
      {/* Dropdown */}
      <Select
        defaultValue="CNC Machine"
        style={{ width: 200, marginBottom: 16 }}
      >
        <Option value="CNC Machine">CNC Machine</Option>
        <Option value="Miling Machine">Miling Machine</Option>
      </Select>
      <Layout>
        {/* Sidebar */}
        <Sider width={280} style={{ background: "#fff", padding: 16 }}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Button type="link">Back</Button>
            <Text strong>6 Alerts</Text>
            <Tag color="blue">2 New</Tag>

            {alerts.map((alert, i) => (
              <Card
                key={i}
                size="small"
                variant="outlined"
                style={{
                  borderColor: alert.selected ? "#2F80ED" : "#d9d9d9",
                }}
              >
                <Space direction="vertical" size={0} style={{ width: "100%" }}>
                  <Space
                    style={{ justifyContent: "space-between", width: "100%" }}
                  >
                    <Text type="secondary">ID {alert.id}</Text>
                    <Tag color="orange">Moderate</Tag>
                  </Space>
                  <Text strong>Unknown Anomally</Text>
                  <Text type="secondary">Detected at 2021-06-18 20:10:04</Text>
                  <Link href={""}>{alert.machine}</Link>
                </Space>
              </Card>
            ))}
          </Space>
        </Sider>

        {/* Main Content */}
        <Content style={{ padding: 24, background: "#fff" }}>
          {/* Header */}
          <Title level={5} style={{ marginBottom: 4 }}>
            Alert ID #00013211
          </Title>
          <Text type="secondary">Detected at 2021-04-22 20:10:04</Text>

          <Divider />

          {/* Spectrogram Section */}
          <Row gutter={24}>
            <Col span={12}>
              <Title level={5}>Anomaly Machine Output</Title>
              <SoundWave soundUrl="https://purfirhhszyvaxklrniq.supabase.co/storage/v1/object/public/wavs//2.wav" />
            </Col>
            <Col span={12}>
              <Title level={5}>Normal Machine Output</Title>
              <SoundWave soundUrl="https://purfirhhszyvaxklrniq.supabase.co/storage/v1/object/public/wavs//1.wav" />
            </Col>
          </Row>

          <Divider />

          {/* Form Section */}
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Text>
              <strong>Equipment:</strong> CNC Machine
            </Text>

            <div>
              <Text>Suspected Reason</Text>
              <Select defaultValue="Unknown Anomally" style={{ width: "100%" }}>
                <Option value="Unknown Anomally">Unknown Anomally</Option>
                <Option value="Bearing Fault">Bearing Fault</Option>
                <Option value="Loose Part">Loose Part</Option>
              </Select>
            </div>

            <div>
              <Text>Action Required</Text>
              <Select placeholder="Select Action" style={{ width: "100%" }}>
                <Option value="Investigate">Investigate</Option>
                <Option value="Ignore">Ignore</Option>
                <Option value="Schedule Maintenance">
                  Schedule Maintenance
                </Option>
              </Select>
            </div>

            <div>
              <Text>Comments</Text>
              <TextArea rows={4} placeholder="Write your notes here..." />
            </div>

            <Button type="primary" block>
              UPDATE
            </Button>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainContent;
