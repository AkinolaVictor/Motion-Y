// /api/contact — Next.js API route for the contact form.
// Receives a JSON POST, validates the payload, then sends two emails via Resend:
//   1. A notification to the owner (CONTACT_TO) with the full submission.
//   2. A thank-you auto-reply to the submitter.
// Both emails use RESEND_FROM as the sender; replyTo is set so hitting
// "Reply" in either inbox goes to the right person.
//
// Env vars (set in .env.local, never committed):
//   RESEND_API_KEY    Resend API key (re_...)
//   RESEND_FROM       Sender identity, e.g. "Akinola <hello@akinola.dev>"
//   CONTACT_TO        Destination address for the notification email
//
// Rate limiting is a small in-memory bucket per IP — fine for a portfolio.
// Replace with a shared store (Redis/Upstash) if you scale traffic.

import { Resend } from "resend";

// Lazy-init so missing env vars only break at request time, not at import.
function getResend() {
  const key = process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

// --- Validation ---------------------------------------------------------------

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
const RATE_MAX = 5;

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
      "ai-application": "AI Application",
      "ai-agent": "AI Agent",
      "rag-system": "RAG System",
      "developer-tool": "Developer Tool",
      collaboration: "Collaboration",
      job: "Job Opportunity",
      other: "Other",
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
            New contact form submission
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
  return [
    `New contact form submission`,
    ``,
    `From:    ${name}`,
    `Email:   ${email}`,
    `Type:    ${typeLabel(type)}`,
    ``,
    `Message:`,
    message,
    ``,
    `Reply directly to this email to respond to ${name}.`,
  ].join("\n");
}

function buildAutoReplyHtml({ name }) {
  const safe = escapeHtml(name);
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#0b0c10; color:#e7e9ee; padding:24px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px; margin:0 auto;">
        <tr><td>
          <p style="font-family: 'JetBrains Mono', ui-monospace, monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7cf6c0; margin:0 0 12px;">
            Message received
          </p>
          <h1 style="font-size:24px; margin:0 0 16px; color:#ffffff;">Thanks for reaching out${safe ? `, ${safe}` : ""}.</h1>
          <p style="font-size:15px; line-height:1.7; color:#cfd2d8; margin:0 0 12px;">
            Your message landed in my inbox. I read everything that comes through, and I'll reply within 48 hours, Monday to Friday.
          </p>
          <p style="font-size:15px; line-height:1.7; color:#cfd2d8; margin:0 0 24px;">
            If it's time-sensitive, just reply to this email — it comes straight to me.
          </p>
          <p style="font-size:15px; line-height:1.7; color:#cfd2d8; margin:0 0 4px;">Talk soon,</p>
          <p style="font-size:15px; line-height:1.4; color:#ffffff; margin:0;">Akinola Victor</p>
          <p style="font-family: 'JetBrains Mono', monospace; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#7a7f87; margin:24px 0 0;">
            Sent automatically — you don't need to reply.
          </p>
        </td></tr>
      </table>
    </div>
  `;
}

function buildAutoReplyText({ name }) {
  return [
    `Thanks for reaching out${name ? `, ${name}` : ""}.`,
    ``,
    `Your message landed in my inbox. I read everything that comes through,`,
    `and I'll reply within 48 hours, Monday to Friday.`,
    ``,
    `If it's time-sensitive, just reply to this email — it comes straight to me.`,
    ``,
    `Talk soon,`,
    `Akinola Victor`,
    ``,
    `Sent automatically — you don't need to reply.`,
  ].join("\n");
}

// --- Handler -----------------------------------------------------------------

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  // Rate limit by client IP. Trust x-forwarded-for in prod; fall back to socket.
  const ip =
    (req.headers["x-forwarded-for"]?.toString().split(",")[0] || "").trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (!rateLimit(ip)) {
    return res
      .status(429)
      .json({ ok: false, error: "Too many requests. Try again later." });
  }

  // Next.js parses JSON bodies automatically when Content-Type matches.
  const { errors, clean } = validate(req.body);
  if (!clean) {
    return res.status(400).json({ ok: false, error: "Invalid input.", fields: errors });
  }
  const { name, email, type, message } = clean;

  let resend;
  try {
    resend = getResend();
  } catch (e) {
    console.error("[contact] Resend init failed:", e);
    return res
      .status(500)
      .json({ ok: false, error: "Server misconfigured. Email me directly." });
  }

  const from = process.env.NEXT_PUBLIC_RESEND_FROM || "Portfolio <onboarding@resend.dev>";
  const to = process.env.NEXT_PUBLIC_CONTACT_TO || "akinolavictor50@gmail.com";

  // Send both emails in parallel. If the user-facing auto-reply fails (e.g.
  // unverified domain restricting recipient), the notification email should
  // still land — so we handle them independently rather than failing together.
  const ownerPromise = resend.emails
    .send({
      from,
      to: [to],
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: buildOwnerHtml(clean),
      text: buildOwnerText(clean),
    })
    .then(() => ({ ok: true, target: "owner" }))
    .catch((e) => {
      console.error("[contact] owner email failed:", e);
      return { ok: false, target: "owner", error: e?.message || "send_failed" };
    });

  const replyPromise = resend.emails
    .send({
      from,
      to: [email],
      replyTo: to,
      subject: "Thanks for reaching out — got your message",
      html: buildAutoReplyHtml(clean),
      text: buildAutoReplyText(clean),
    })
    .then(() => ({ ok: true, target: "user" }))
    .catch((e) => {
      console.error("[contact] auto-reply failed:", e);
      return { ok: false, target: "user", error: e?.message || "send_failed" };
    });

  const [ownerResult, replyResult] = await Promise.all([ownerPromise, replyPromise]);

  // The notification to the owner is the load-bearing email. If it fails,
  // surface an error so the form shows the user something actionable.
  if (!ownerResult.ok) {
    return res.status(502).json({
      ok: false,
      error:
        "Couldn't deliver your message right now. Please email me directly at akinolavictor50@gmail.com.",
    });
  }

  // If the auto-reply failed but the owner notification succeeded, the user
  // still gets the success state — they've reached me, which is what matters.
  // We log it but don't break the UX.
  if (!replyResult.ok) {
    console.warn(
      "[contact] auto-reply failed (likely unverified sender domain):",
      replyResult.error,
    );
  }

  return res.status(200).json({
    ok: true,
    autoReplyDelivered: replyResult.ok,
  });
}
