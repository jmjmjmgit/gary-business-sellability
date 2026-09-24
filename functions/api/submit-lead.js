// Cloudflare Pages Function: /api/submit-lead
// Receives assessment lead submissions, sends to MailerLite, and forwards to webhook if configured

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    // Validate required fields
    if (!data.email || !data.name) {
      return new Response(JSON.stringify({ error: "Name and email are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanName = data.name.trim();
    const cleanCompany = (data.company || "").trim();

    const leadPayload = {
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany || "Not provided",
      score: data.score ?? null,
      rawScore: data.rawScore ?? null,
      tier: data.tierKey || "IN_PROGRESS",
      estimatedValuation: data.valuationData?.todaysValue ? `£${data.valuationData.todaysValue.toLocaleString()}` : "N/A",
      multiple: data.valuationData?.finalMultiple ? `${data.valuationData.finalMultiple}x` : "N/A",
      valuationGap: data.valuationData?.valuationGap ? `£${data.valuationData.valuationGap.toLocaleString()}` : "N/A",
      primaryKiller: data.primaryKiller?.title || "N/A",
      status: data.status || "STARTED",
      timestamp: new Date().toISOString(),
      source: "Gary Ashworth Sellability Assessment"
    };

    // 1. Submit lead to MailerLite Form (Account: 1848379, Form: 197317486398408585)
    try {
      const mlParams = new URLSearchParams();
      mlParams.append("fields[name]", cleanName);
      mlParams.append("fields[email]", cleanEmail);
      if (cleanCompany) {
        mlParams.append("fields[company]", cleanCompany);
      }
      mlParams.append("ml-submit", "1");
      mlParams.append("anticsrf", "true");

      await fetch("https://assets.mailerlite.com/jsonp/1848379/forms/197317486398408585/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: mlParams.toString()
      });
    } catch (mlErr) {
      console.error("MailerLite form integration error:", mlErr);
    }

    // 2. If a MailerLite API Key is configured in Cloudflare environment variables
    const apiKey = context.env?.MAILERLITE_API_KEY;
    if (apiKey) {
      try {
        await fetch("https://connect.mailerlite.com/api/subscribers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            email: cleanEmail,
            fields: {
              name: cleanName,
              company: cleanCompany
            },
            status: "active"
          })
        });
      } catch (apiErr) {
        console.error("MailerLite REST API error:", apiErr);
      }
    }

    // 3. If an external webhook is configured (Zapier, Make, Google Sheets, CRM)
    const webhookUrl = context.env?.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadPayload)
        });
      } catch (webhookErr) {
        console.error("Webhook forwarding error:", webhookErr);
      }
    }

    return new Response(JSON.stringify({ success: true, lead: leadPayload }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Failed to process lead." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
