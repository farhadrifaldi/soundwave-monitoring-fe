import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:4000";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(BACKEND_API_URL + "/anomalies/" + body.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.BACKEND_API_KEY || "",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to update anomaly" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
