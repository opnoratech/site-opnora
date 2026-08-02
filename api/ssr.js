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

// Helper to generate the email HTML with Opnora Dark/Premium aesthetic
function generateEmailHtml(data) {
  const isSimulador = data.type === "simulador";

  let detailsHtml = "";
  if (isSimulador) {
    detailsHtml = `
      <div style="margin-bottom: 25px; background: #121218; padding: 18px; border-radius: 8px; border: 1px solid #1c1c25;">
        <h3 style="color: #a280ff; font-size: 13px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px; font-weight: bold;">2. Escopo do Simulador</h3>
        <table style="width: 100%; font-size: 13px; color: #d1d1d6; border-collapse: collapse; line-height: 1.6;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px; vertical-align: top; color: #8e8e93;">Objetivos:</td><td style="color: #ffffff;">${data.objectives || "Nenhum selecionado"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; vertical-align: top; color: #8e8e93;">Soluções desejadas:</td><td style="color: #ffffff;">${data.solutions || "Nenhuma selecionada"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #8e8e93;">Recursos escolhidos:</td><td style="color: #ffffff;">${data.features || "Nenhum selecionado"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; vertical-align: top; color: #8e8e93;">Plano Base:</td><td style="color: #ffffff;">${data.basePlanoLabel || "Sob medida"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; vertical-align: top; color: #8e8e93;">Prazo Desejado:</td><td style="color: #ffffff;">${data.prazo || "A definir na análise"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; vertical-align: top; color: #8e8e93;">Orçamento Estimado:</td><td style="color: #ffffff;">${data.investimento || "A definir"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; vertical-align: top; color: #8e8e93;">Estimativa Técnica:</td><td style="color: #a280ff; font-weight: bold;">${data.estimativaPreco || "Sob consulta"}</td></tr>
        </table>
      </div>
    `;
  } else {
    detailsHtml = `
      <div style="margin-bottom: 25px; background: #121218; padding: 18px; border-radius: 8px; border: 1px solid #1c1c25;">
        <h3 style="color: #a280ff; font-size: 13px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px; font-weight: bold;">2. Assunto do Contato</h3>
        <table style="width: 100%; font-size: 13px; color: #d1d1d6; border-collapse: collapse; line-height: 1.6;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px; color: #8e8e93;">Assunto/Tipo:</td><td style="color: #ffffff;">${data.tipoContato || "Contato Geral"}</td></tr>
        </table>
      </div>
    `;
  }

  return `
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        </style>
      </head>
      <body>
        <div style="background-color: #050507; padding: 30px 10px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0c0c0f; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #1c1c21; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
            
            <!-- Cabeçalho -->
            <div style="border-bottom: 1px solid #1c1c21; padding-bottom: 15px; margin-bottom: 20px; clear: both; overflow: hidden;">
              <div style="float: left;">
                <h2 style="margin: 0; color: #a280ff; font-size: 18px; letter-spacing: 1.5px; font-weight: 800; text-transform: uppercase; font-family: monospace;">OPNORA</h2>
                <span style="font-size: 10px; color: #6e6e73; font-family: monospace; text-transform: uppercase; tracking-wider; display: block; margin-top: 2px;">Nova Oportunidade Comercial</span>
              </div>
              <div style="float: right; background: rgba(162, 128, 255, 0.1); border: 1px solid rgba(162, 128, 255, 0.2); padding: 4px 10px; border-radius: 20px; color: #a280ff; font-size: 10px; font-family: monospace; text-transform: uppercase; margin-top: 5px;">
                ${isSimulador ? "Simulador" : "Contato"}
              </div>
            </div>

            <!-- Dados do Cliente -->
            <div style="margin-bottom: 25px; clear: both;">
              <h3 style="color: #a280ff; font-size: 13px; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px; font-weight: bold;">1. Informações de Contato</h3>
              <table style="width: 100%; font-size: 13px; color: #d1d1d6; border-collapse: collapse; line-height: 1.6;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 140px; color: #8e8e93;">Nome Completo:</td><td style="color: #ffffff; font-weight: 600;">${data.nome}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Empresa:</td><td style="color: #ffffff;">${data.empresa || "Não informada"}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">E-mail:</td><td><a href="mailto:${data.email}" style="color: #a280ff; text-decoration: none;">${data.email}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">WhatsApp:</td><td><a href="https://wa.me/${data.whatsapp.replace(/\D/g, "")}" style="color: #58e5a6; text-decoration: none; font-weight: bold;">${data.whatsapp}</a></td></tr>
                ${data.cidade ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Localização:</td><td style="color: #ffffff;">${data.cidade}</td></tr>` : ""}
              </table>
            </div>

            <!-- Detalhes Específicos -->
            ${detailsHtml}

            <!-- Descrição/Mensagem -->
            <div style="margin-bottom: 10px;">
              <h3 style="color: #a280ff; font-size: 13px; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px; font-weight: bold;">3. Descrição / Mensagem</h3>
              <div style="font-size: 13px; color: #d1d1d6; line-height: 1.6; background: #121218; padding: 15px; border-radius: 8px; border: 1px solid #1c1c25; white-space: pre-wrap;">${data.descricao || data.mensagem || "Sem descrição informada."}</div>
            </div>
            
          </div>
        </div>
      </body>
    </html>
  `;
}

export default async function handler(req, res) {
  // Intercepta e gerencia o endpoint de envio de e-mails em /api/contato
  if (req.url && (req.url.startsWith("/api/contato") || req.url === "/api/contato")) {
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Method Not Allowed" }));
      return;
    }

    try {
      // Ler body da request
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const data = JSON.parse(Buffer.concat(chunks).toString());

      // Validar dados mínimos obrigatórios
      if (!data.nome || !data.email) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Nome e e-mail são obrigatórios." }));
        return;
      }

      // Token do Resend (obtido via variável de ambiente)
      const resendApiKey = process.env.RESEND_API_KEY || "";
      
      const emailHtml = generateEmailHtml(data);
      const isSimulador = data.type === "simulador";
      const subject = isSimulador 
        ? `Simulador Opnora: Novo Projeto - ${data.nome} (${data.empresa || "Sem empresa"})`
        : `Contato Opnora: Nova Mensagem - ${data.nome}`;

      // Envia via API HTTP do Resend
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_SENDER_EMAIL || "Opnora <onboarding@resend.dev>",
          to: [process.env.CONTACT_RECEIVER_EMAIL || "nicolasharnisch@gmail.com"],
          subject: subject,
          html: emailHtml,
        }),
      });

      if (!resendResponse.ok) {
        const errText = await resendResponse.text();
        console.error("Resend API Error:", errText);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Erro ao enviar e-mail via Resend.", details: errText }));
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: true }));
      return;
    } catch (error) {
      console.error("API Contato Error:", error);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Internal Server Error", details: error.message }));
      return;
    }
  }

  // Comportamento normal de SSR para as outras rotas
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
