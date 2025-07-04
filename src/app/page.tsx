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
  const [suspectedReason, setSuspectedReason] = useState<string>("");
  const [actionRequired, setActionRequired] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("/api/anomalies");
        if (!res.ok) throw new Error("Failed to fetch alerts");
        const data = await res.json();
        setAlerts(data || []);
        setSelectedAnomaly(data[0] || null);
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

  // Keep form fields in sync with selectedAnomaly
  useEffect(() => {
    setSuspectedReason(selectedAnomaly?.suspectedReason || "");
    setActionRequired(selectedAnomaly?.actionRequired || "");
    setComment(selectedAnomaly?.comment || "");
  }, [selectedAnomaly]);

  const handleUpdate = async () => {
    if (!selectedAnomaly) return;
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);
    try {
      const res = await fetch("/api/anomalies/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedAnomaly.id,
          suspectedReason,
          actionRequired,
          comment,
        }),
      });
      if (!res.ok) throw new Error("Failed to update anomaly");
      setUpdateSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUpdateError(err.message);
      } else {
        setUpdateError("Unknown error");
      }
    } finally {
      setUpdateLoading(false);
    }
  };

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
              <Select
                value={suspectedReason}
                onChange={setSuspectedReason}
                style={{ width: "100%" }}
              >
                <Option value="Unknown Anomally">Unknown Anomally</Option>
                <Option value="Bearing Fault">Bearing Fault</Option>
                <Option value="Loose Part">Loose Part</Option>
              </Select>
            </div>

            <div>
              <Text>Action Required</Text>
              <Select
                value={actionRequired}
                onChange={setActionRequired}
                placeholder="Select Action"
                style={{ width: "100%" }}
              >
                <Option value="Investigate">Investigate</Option>
                <Option value="Ignore">Ignore</Option>
                <Option value="Schedule Maintenance">Schedule Maintenance</Option>
              </Select>
            </div>

            <div>
              <Text>Comments</Text>
              <TextArea
                rows={4}
                placeholder="Write your notes here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {updateError && <Text type="danger">{updateError}</Text>}
            {updateSuccess && <Text type="success">Update successful!</Text>}

            <Button
              type="primary"
              block
              loading={updateLoading}
              onClick={handleUpdate}
              disabled={!selectedAnomaly}
            >
              UPDATE
            </Button>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainContent;
