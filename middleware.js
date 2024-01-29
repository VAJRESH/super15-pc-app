import { NextResponse } from "next/server";

export default async function middleware(request) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  const protocol = request.headers["x-forwarded-proto"] || request.protocol;
  const host = request.headers.host;

  // Construct the base URL without the port number
  let baseUrl = `${protocol}://${host}`;
  if (!protocol || !host) baseUrl = request.headers.origin;
  if (!baseUrl) baseUrl = request.headers.referer || "*";

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", baseUrl);

  return response;
}
