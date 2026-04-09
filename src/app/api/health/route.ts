import { NextResponse } from "next/server";

interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
}

export const GET = async () => {
  const generateResponse = (status: HealthCheckResponse["status"]) => {
    const response: HealthCheckResponse = {
      status: status,
      timestamp: new Date().toISOString(),
    };

    return response;
  };

  try {
    return NextResponse.json(generateResponse("healthy"), { status: 200 });
  } catch {
    return NextResponse.json(generateResponse("unhealthy"), { status: 503 });
  }
};
