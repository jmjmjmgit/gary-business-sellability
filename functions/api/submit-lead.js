// Cloudflare Pages Function: /api/submit-lead
// Securely receives lead capture submissions, logs data, and forwards to webhook if configured

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

    const leadPayload = {
      name: data.name,
      email: data.email,
      company: data.company || "Not provided",
      score: data.score ?? null,
      rawScore: data.rawScore ?? null,
      tier: data.tierKey || "IN_PROGRESS",
      estimatedValuation: data.valuationData?.todaysValue ? `£${data.valuationData.todaysValue.toLocaleString()}` : "N/A",
      multiple: data.valuationData?.finalMultiple ? `${data.valuationData.finalMultiple}x` : "N/A",
      valuationGap: data.valuationData?.valuationGap ? `£${data.valuationData.valuationGap.toLocaleString()}` : "N/A",
      primaryKiller: data.primaryKiller?.title || "N/A",
      timestamp: new Date().toISOString(),
      source: "Gary Ashworth Sellability Assessment"
    };

    // If an external webhook is provided in environment variables (Zapier, Make, Google Sheets, CRM)
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
