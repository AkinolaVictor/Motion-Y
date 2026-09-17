// /api/contact — Next.js API route for the contact form.
// Replaced Resend with Nodemailer for direct SMTP delivery.
// Sends two emails:
//   1. Notification to the owner (akinolavictor50@gmail.com) with full details.
//   2. Professional confirmation to the client.

import nodemailer from "nodemailer";

// --- Validation -----------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 5000;
const MAX_NAME = 120;

function validate(body) {
  const errors = {};
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const type = String(body?.type ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name) errors.name = "Please add your name.";
  else if (name.length > MAX_NAME) errors.name = "Name is too long.";

  if (!email) errors.email = "Please add your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email looks off.";

  if (!type) errors.type = "Pick what you're working on.";

  if (!message) errors.message = "Tell me a little about the problem.";
  else if (message.length < MIN_MESSAGE)
    errors.message = "A few more words, please.";
  else if (message.length > MAX_MESSAGE)
    errors.message = "Message is too long (5,000 char max).";

  return {
    errors,
    clean: errors.name || errors.email || errors.type || errors.message
      ? null
      : { name, email, type, message },
  };
}

// --- Rate limit (per-IP, in-memory) ------------------------------------------

const buckets = new Map();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 10;

function rateLimit(ip) {
  const now = Date.now();
  const entry = buckets.get(ip) ?? { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_WINDOW_MS;
  }
  entry.count += 1;
  buckets.set(ip, entry);
  return entry.count <= RATE_MAX;
}

// --- Email templates ---------------------------------------------------------

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function typeLabel(type) {
  return (
    {
      "ai-agent": "AI Agent",
      "process-automation": "Process Automation",
      "ai-software": "AI Software",
      "api-integration": "API Integration",
      "ai-consulting": "AI Consulting",
      "marketting-system": "Marketing System",
      "collaboration": "Collaboration",
      "other": "Other",
    }[type] || type
  );
}

function buildOwnerHtml({ name, email, type, message }) {
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    type: escapeHtml(typeLabel(type)),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
  };
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#0b0c10; color:#e7e9ee; padding:24px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px; margin:0 auto;">
        <tr><td>
          <p style="font-family: 'JetBrains Mono', ui-monospace, monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7a7f87; margin:0 0 12px;">
            New Project Inquiry
          </p>
          <h1 style="font-size:22px; margin:0 0 16px; color:#ffffff;">From ${safe.name}</h1>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; margin:16px 0;">
            <tr>
              <td style="padding:8px 0; border-bottom:1px solid #1c1f25; font-family: 'JetBrains Mono', monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7a7f87; width:120px;">Email</td>
              <td style="padding:8px 0; border-bottom:1px solid #1c1f25; color:#e7e9ee;">
                <a href="mailto:${safe.email}" style="color:#7cf6c0; text-decoration:none;">${safe.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0; border-bottom:1px solid #1c1f25; font-family: 'JetBrains Mono', monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7a7f87;">Project type</td>
              <td style="padding:8px 0; border-bottom:1px solid #1c1f25; color:#e7e9ee;">${safe.type}</td>
            </tr>
          </table>
          <p style="font-family: 'JetBrains Mono', monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7a7f87; margin:24px 0 8px;">Message</p>
          <div style="background:#11141a; border:1px solid #1c1f25; border-radius:8px; padding:16px; color:#e7e9ee; line-height:1.6; white-space:pre-wrap;">${safe.message}</div>
          <p style="font-family: 'JetBrains Mono', monospace; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#7a7f87; margin:24px 0 0;">
            Reply directly to this email to respond to ${safe.name}.
          </p>
        </td></tr>
      </table>
    </div>
  `;
}

function buildOwnerText({ name, email, type, message }) {
  return `New Project Inquiry from ${name}
--------------------------------------------------
Email: ${email}
Type: ${typeLabel(type)}

Message:
${message}
--------------------------------------------------
Reply directly to this email to respond to the client.`;
}

function buildClientHtml({ name }) {
  const safe = escapeHtml(name);
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#0b0c10; color:#e7e9ee; padding:24px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px; margin:0 auto;">
        <tr><td>
          <p style="font-family: 'JetBrains Mono', ui-monospace, monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7cf6c0; margin:0 0 12px;">
            Communication Received
          </p>
          <h1 style="font-size:24px; margin:0 0 16px; color:#ffffff;">Thank you for reaching out, ${safe}.</h1>
          <p style="font-size:15px; line-height:1.7; color:#cfd2d8; margin:0 0 12px;">
            Your inquiry has been successfully delivered to us. We have received the details regarding your project and are currently reviewing them.
          </p>
          <p style="font-size:15px; line-height:1.7; color:#cfd2d8; margin:0 0 24px;">
            We will contact you shortly to discuss how we can best support your objectives.
          </p>
          <p style="font-size:15px; line-height:1.7; color:#cfd2d8; margin:0 0 4px;">Regards,</p>
          <p style="font-size:15px; line-height:1.4; color:#ffffff; margin:0; font-weight: 600;">Motion-Y</p>
        </td></tr>
      </table>
    </div>
  `;
}

function buildClientText({ name }) {
  return `Hello ${name},\n\nThank you for reaching out to Motion-Y.\n\nYour inquiry has been successfully delivered to us. We have received your project details and are currently reviewing them.\n\nWe will contact you shortly to discuss how we can best support your objectives.\n\nRegards,\nMotion-Y`;
}

// --- Handler -----------------------------------------------------------------

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const ip =
    (req.headers["x-forwarded-for"]?.toString().split(",")[0] || "").trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (!rateLimit(ip)) {
    return res
      .status(429)
      .json({ ok: false, error: "Too many requests. Try again later." });
  }

  const { errors, clean } = validate(req.body);
  if (!clean) {
    return res.status(400).json({ ok: false, error: "Invalid input.", fields: errors });
  }
  const { name, email } = clean;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_USEMAIL,
      pass: process.env.NEXT_PUBLIC_USEPASS,
    },
  });

  try {
    const results = await Promise.allSettled([
      transporter.sendMail({
        from: `Motion-Y <${process.env.NEXT_PUBLIC_USEMAIL}>`,
        // from: `process.env.NEXT_PUBLIC_USEMAIL`,
        to: "akinolavictor50@gmail.com",
        subject: `Inquiry from ${name} regarding project`,
        html: buildOwnerHtml(clean),
        text: buildOwnerText(clean),
      }),
      transporter.sendMail({
        from: `Motion-Y <${process.env.NEXT_PUBLIC_USEMAIL}>`,
        // from: process.env.NEXT_PUBLIC_USEMAIL,
        to: email,
        subject: `Thank you for contacting Motion-Y, ${name}`,
        html: buildClientHtml({ name }),
        text: buildClientText({ name }),
      }),
    ]);

    const ownerResult = results[0];
    const clientResult = results[1];

    if (ownerResult.status === "rejected") {
      console.error("[contact] Owner email failed:", ownerResult.reason);
    }
    if (clientResult.status === "rejected") {
      console.error("[contact] Client email failed:", clientResult.reason);
    }

    if (ownerResult.status === "rejected" && clientResult.status === "rejected") {
      throw new Error("Both email deliveries failed.");
    }

    return res.status(200).json({
      ok: true,
      ownerSent: ownerResult.status === "fulfilled",
      clientSent: clientResult.status === "fulfilled",
    });
  } catch (e) {
    console.error("[contact] Critical mail delivery failure:", e);
    return res.status(500).json({
      ok: false,
      error: "Failed to deliver message. Please email us directly at akinolavictor50@gmail.com.",
    });
  }
}
