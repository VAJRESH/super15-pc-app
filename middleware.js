import { NextResponse } from "next/server";

export default async function middleware(request) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  const protocol = request.headers["x-forwarded-proto"] || request.protocol;
  const host = request.headers.host;

  // Construct the base URL without the port number
  const baseUrl = `${protocol}://${host}`;

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", baseUrl);

  return response;
}
