import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Resolve the path to the built SSR server relative to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serverPath = resolve(__dirname, "../dist/server/server.js");

// Dynamically import the built SSR server (Fetch API interface)
let server;
try {
  const serverModule = await import(serverPath);
  server = serverModule.default;
} catch (e) {
  console.error("Failed to load SSR server:", e);
}

export default async function handler(req, res) {
  if (!server) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("SSR server failed to load");
    return;
  }

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
