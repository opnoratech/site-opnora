import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Import the built SSR server (Fetch API interface)
const serverModule = await import("../../dist/server/server.js");
const server = serverModule.default;

export default async function handler(req, res) {
  // Build a Web API Request from the Node.js IncomingMessage
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const url = `${protocol}://${host}${req.url}`;

  // Read body
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

  const fetchRequest = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? body : undefined,
  });

  try {
    const response = await server.fetch(fetchRequest, {}, {});

    res.statusCode = response.status;

    // Copy response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const responseBody = await response.arrayBuffer();
    res.end(Buffer.from(responseBody));
  } catch (error) {
    console.error("SSR Error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error");
  }
}
