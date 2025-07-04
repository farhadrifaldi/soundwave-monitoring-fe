"use client";

import React, { useEffect, useState } from "react";
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

// Data type for anomaly alert based on provided schema
type AnomalyAlert = {
  id: number;
  timestamp: string; // ISO string from DateTime
  createdAt: string;
  updatedAt: string;
  machine: string;
  anomaly: string;
  sensor: string;
  soundClipUrl: string;
  suspectedReason?: string;
  actionRequired?: string;
  comment?: string;
  isNew: boolean;
};

const MainContent = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyAlert | null>(
    null
  );
  const [filterMachine, setFilterMachine] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("/api/anomalies");
        if (!res.ok) throw new Error("Failed to fetch alerts");
        const data = await res.json();
        // Adjust this if your API response shape is different
        setAlerts(data || []);
        setSelectedAnomaly(data[0] || null); // Set first alert as selected by default
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <Layout style={{ background: "#fff", margin: 30, padding: 10 }}>
      {/* Dropdown */}
      <Select
        defaultValue="CNC Machine"
        style={{ width: 200, marginBottom: 16 }}
        onChange={(value) => setFilterMachine(value)}
      >
        <Option value="CNC Machine">CNC Machine</Option>
        <Option value="Milling Machine">Milling Machine</Option>
      </Select>
      <Layout>
        {/* Sidebar */}
        <Sider width={280} style={{ background: "#fff", padding: 16 }}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Button type="link">Back</Button>
            <Text strong>{alerts.length} Alerts</Text>
            <Tag color="blue">{alerts.filter((a) => a.isNew).length} New</Tag>

            {loading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text type="danger">{error}</Text>
            ) : (
              alerts
                .filter((a) => {
                  if (!filterMachine) return true; // Show all if no filter
                  return a.machine === filterMachine;
                })
                .map((alert, i) => (
                  <Card
                    onClick={() => setSelectedAnomaly(alert)}
                    key={i}
                    size="small"
                    variant="outlined"
                    style={{
                      borderColor:
                        selectedAnomaly?.id === alert.id
                          ? "#2F80ED"
                          : "#d9d9d9",
                    }}
                  >
                    <Space
                      direction="vertical"
                      size={0}
                      style={{ width: "100%" }}
                    >
                      <Space
                        style={{
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Text type="secondary">
                          ID #0000{alert.id || alert.id}
                        </Text>
                        <Tag
                          color={
                            alert.anomaly === "Mild"
                              ? "green"
                              : alert.anomaly === "Moderate"
                              ? "orange"
                              : "red"
                          }
                        >
                          {alert.anomaly}
                        </Tag>
                      </Space>
                      <Text strong>
                        {alert.suspectedReason || "Unknown Anomally"}
                      </Text>
                      <Text type="secondary">
                        Detected at {alert.timestamp || "-"}
                      </Text>
                      <Link href={""}>
                        {alert.machine || "Unknown Machine"}
                      </Link>
                    </Space>
                  </Card>
                ))
            )}
          </Space>
        </Sider>

        {/* Main Content */}
        <Content style={{ padding: 24, background: "#fff" }}>
          {/* Header */}
          <Title level={5} style={{ marginBottom: 4 }}>
            Alert ID #0000{selectedAnomaly?.id}
          </Title>
          <Text type="secondary">Detected at {selectedAnomaly?.timestamp}</Text>

          <Divider />

          {/* Spectrogram Section */}
          <Row gutter={24}>
            <Col span={12}>
              <Title level={5}>Anomaly Machine Output</Title>
              <SoundWave soundUrl={selectedAnomaly?.soundClipUrl ?? ""} />
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
              <strong>Equipment:</strong>{" "}
              {selectedAnomaly?.machine || "Unknown Machine"}
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
