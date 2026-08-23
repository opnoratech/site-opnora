// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Helper to generate the email HTML with Opnora Dark/Premium aesthetic (shared with SSR production)
function generateEmailHtml(data: any) {
	const isSimulador = data.type === "simulador";
	const isStatusUpdate = data.type === "status_update";

	let detailsHtml = "";
	if (isSimulador) {
		detailsHtml = `
      <div style="margin-bottom: 25px; background: #121218; padding: 18px; border-radius: 8px; border: 1px solid #1c1c25;">
        <h3 style="color: #a280ff; font-size: 13px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px; font-weight: bold;">2. Escopo do Simulador</h3>
        <table style="width: 100%; font-size: 13px; color: #d1d1d6; border-collapse: collapse; line-height: 1.6;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px; color: #8e8e93;">Objetivos:</td><td style="color: #ffffff;">${data.objectives || "Nenhum selecionado"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Soluções desejadas:</td><td style="color: #ffffff;">${data.solutions || "Nenhuma selecionada"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Recursos escolhidos:</td><td style="color: #ffffff;">${data.features || "Nenhum selecionado"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Plano Base:</td><td style="color: #ffffff;">${data.basePlanoLabel || "Sob medida"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Prazo Desejado:</td><td style="color: #ffffff;">${data.prazo || "A definir na análise"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Orçamento Estimado:</td><td style="color: #ffffff;">${data.investimento || "A definir"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Estimativa Técnica:</td><td style="color: #a280ff; font-weight: bold;">${data.estimativaPreco || "Sob consulta"}</td></tr>
        </table>
      </div>
    `;
	} else if (isStatusUpdate) {
		detailsHtml = `
      <div style="margin-bottom: 25px; background: #121218; padding: 18px; border-radius: 8px; border: 1px solid #1c1c25;">
        <h3 style="color: #a280ff; font-size: 13px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px; font-weight: bold;">2. Atualização de Status</h3>
        <table style="width: 100%; font-size: 13px; color: #d1d1d6; border-collapse: collapse; line-height: 1.6;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px; color: #8e8e93;">Novo Status:</td><td style="color: #58e5a6; font-weight: bold; text-transform: uppercase;">${data.status}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Assunto/Tipo:</td><td style="color: #ffffff;">${data.tipoContato || "Contato Geral"}</td></tr>
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

	let headerSubtitle = isStatusUpdate ? "Atualização de Lead (Admin)" : "Nova Oportunidade Comercial";
	let badgeText = isStatusUpdate ? "Status Admin" : (isSimulador ? "Simulador" : "Contato");

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
                <span style="font-size: 10px; color: #6e6e73; font-family: monospace; text-transform: uppercase; tracking-wider; display: block; margin-top: 2px;">${headerSubtitle}</span>
              </div>
              <div style="float: right; background: rgba(162, 128, 255, 0.1); border: 1px solid rgba(162, 128, 255, 0.2); padding: 4px 10px; border-radius: 20px; color: #a280ff; font-size: 10px; font-family: monospace; text-transform: uppercase; margin-top: 5px;">
                ${badgeText}
              </div>
            </div>
 
            <!-- Dados do Cliente -->
            <div style="margin-bottom: 25px; clear: both;">
              <h3 style="color: #a280ff; font-size: 13px; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px; font-weight: bold;">1. Informações de Contato</h3>
              <table style="width: 100%; font-size: 13px; color: #d1d1d6; border-collapse: collapse; line-height: 1.6;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 140px; color: #8e8e93;">Nome Completo:</td><td style="color: #ffffff; font-weight: 600;">${data.nome}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Empresa:</td><td style="color: #ffffff;">${data.empresa || "Não informada"}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">E-mail:</td><td><a href="mailto:${data.email}" style="color: #a280ff; text-decoration: none;">${data.email}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">WhatsApp:</td><td><a href="https://wa.me/${(data.whatsapp || "").replace(/\D/g, "")}" style="color: #58e5a6; text-decoration: none; font-weight: bold;">${data.whatsapp || "Não informado"}</a></td></tr>
                ${data.cidade ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #8e8e93;">Localização:</td><td style="color: #ffffff;">${data.cidade}</td></tr>` : ""}
              </table>
            </div>
 
            <!-- Detalhes Específicos -->
            ${detailsHtml}
 
            <!-- Descrição/Mensagem -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #a280ff; font-size: 13px; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px; font-weight: bold;">3. Mensagem / Descrição</h3>
              <div style="font-size: 13px; color: #d1d1d6; line-height: 1.6; background: #121218; padding: 15px; border-radius: 8px; border: 1px solid #1c1c25; white-space: pre-wrap;">${data.descricao || data.mensagem || "Sem descrição informada."}</div>
            </div>

            <!-- Botão de Ação para o Painel Admin -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #1c1c21;">
              <a href="https://opnora.me/admin/leads" target="_blank" style="background: linear-gradient(135deg, #a280ff, #7952eb); color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: bold; border-radius: 8px; display: inline-block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Ver Detalhes no Painel Admin →
              </a>
              <p style="color: #6e6e73; font-size: 11px; margin-top: 12px; margin-bottom: 0;">Você pode alterar o status do lead e responder ao cliente diretamente pelo painel.</p>
            </div>
            
          </div>
        </div>
      </body>
    </html>
  `;
}

export default defineConfig({
	tanstackStart: {
		// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
		// nitro/vite builds from this
		server: { entry: "server" },
	},
	vite: {
		plugins: [
			{
				name: "api-contato-dev-middleware",
				configureServer(server) {
					server.middlewares.use(async (req, res, next) => {
						if (
							req.url &&
							(req.url.startsWith("/api/contato") || req.url === "/api/contato")
						) {
							if (req.method !== "POST") {
								res.statusCode = 405;
								res.setHeader("Content-Type", "application/json");
								res.end(JSON.stringify({ error: "Method Not Allowed" }));
								return;
							}

							try {
								// Ler o body da request
								const chunks = [];
								for await (const chunk of req) {
									chunks.push(chunk);
								}
								const data = JSON.parse(Buffer.concat(chunks).toString());

								// Validar dados
								if (!data.nome || !data.email) {
									res.statusCode = 400;
									res.setHeader("Content-Type", "application/json");
									res.end(
										JSON.stringify({
											error: "Nome e e-mail são obrigatórios.",
										}),
									);
									return;
								}

								const isSimulador = data.type === "simulador";
								const isStatusUpdate = data.type === "status_update";

								// Chamar API do Resend
								const resendApiKey = process.env.RESEND_API_KEY || "";
								const receiver =
									process.env.CONTACT_RECEIVER_EMAIL || "opnora.tech@gmail.com";
								const sender =
									process.env.CONTACT_SENDER_EMAIL ||
									"Opnora <onboarding@resend.dev>";
								
								let subject = `Contato Opnora: Nova Mensagem - ${data.nome}`;
								if (isStatusUpdate) {
									subject = `Admin Opnora: Lead "${data.nome}" atualizado para ${data.status.toUpperCase()}`;
								} else if (isSimulador) {
									subject = `Simulador Opnora: Novo Projeto - ${data.nome} (${data.empresa || "Sem empresa"})`;
								}

								const emailHtml = generateEmailHtml(data);

								const resendResponse = await fetch(
									"https://api.resend.com/emails",
									{
										method: "POST",
										headers: {
											Authorization: `Bearer ${resendApiKey}`,
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											from: sender,
											to: [receiver],
											subject: subject,
											html: emailHtml,
										}),
									},
								);

								if (!resendResponse.ok) {
									const errText = await resendResponse.text();
									console.error("Resend API Error (Dev):", errText);
									res.statusCode = 500;
									res.setHeader("Content-Type", "application/json");
									res.end(
										JSON.stringify({
											error: "Erro no Resend",
											details: errText,
										}),
									);
									return;
								}

								res.statusCode = 200;
								res.setHeader("Content-Type", "application/json");
								res.end(JSON.stringify({ success: true }));
							} catch (err: any) {
								console.error("Dev API Middleware Error:", err);
								res.statusCode = 500;
								res.setHeader("Content-Type", "application/json");
								res.end(
									JSON.stringify({
										error: "Internal Server Error",
										details: err.message,
									}),
								);
							}
							return;
						}
						next();
					});
				},
			},
		],
	},
});
