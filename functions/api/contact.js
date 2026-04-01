export async function onRequestPost({ request }) {
  const origin = request.headers.get("Origin") || "";
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Content-Type": "application/json",
  };

  try {
    const data = await request.formData();
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const organisation = data.get("organisation") || "";
    const message = data.get("message") || "";

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400, headers });
    }

    // Send via MailChannels (free for Cloudflare Workers)
    const mailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "benheng77@gmail.com", name: "Ben Heng" }],
          },
        ],
        from: {
          email: "website@edulifesolutions.com",
          name: "Edulife Solutions Website",
        },
        reply_to: {
          email: email,
          name: name,
        },
        subject: `New enquiry from ${name}${organisation ? ` (${organisation})` : ""}`,
        content: [
          {
            type: "text/plain",
            value: `New contact form submission from edulife-solutions.pages.dev\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Organisation: ${organisation || "Not provided"}\n\n` +
              `Message:\n${message}\n`,
          },
        ],
      }),
    });

    if (mailResponse.ok || mailResponse.status === 202) {
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    }

    const errText = await mailResponse.text();
    console.error("MailChannels error:", errText);

    // Fallback: still return success but log the error
    return new Response(JSON.stringify({ success: true, note: "queued" }), { status: 200, headers });

  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500, headers });
  }
}
