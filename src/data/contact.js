// contact.js — content for the Contact page.
// Keep copy and links here so each section component stays focused on layout/animation.

export const EMAIL = "akinolavictor50@gmail.com";
export const EMAIL_LABEL = "Email";
export const PHONE = "+234 810 170 0105";
export const PHONE_LABEL = "Call or WhatsApp";
export const RESPONSE_WINDOW = "Replies within 48 hours, Mon–Fri.";

// Endpoint the form posts to. Wired to pages/api/contact.js (Resend).
export const FORM_ENDPOINT = "/api/contact";

// Sender identity used by the API route. Read from env so secrets stay
// out of source. Defaults to Resend's sandbox sender — switch to a
// verified domain like `hello@akinola.dev` for production.
export const RESEND_FROM =
  process.env.NEXT_PUBLIC_RESEND_FROM || "Portfolio <onboarding@resend.dev>";

export const SOCIALS = [
  // {
  //   label: "GitHub",
  //   href: "https://github.com/AkinolaVictor",
  //   icon: (
  //     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  //       <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.18c-3.2.7-3.87-1.37-3.87-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.39.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.25 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z"/>
  //     </svg>
  //   ),
  // },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victoral/",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.71h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.45c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21h-4V9z"/>
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/MoreThanAVictor",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.79-6.262L4.8 22H2.043l6.98-7.972L2 2h6.914l4.34 5.74L18.244 2zm-1.193 18.293h1.51L7.07 3.61H5.45l11.6 16.683z"/>
      </svg>
    ),
  },
];

// Form field options for "What are you working on?"
export const PROJECT_TYPES = [
  { value: "", label: "Select one" },
  { value: "ai-agent",       label: "AI Agent" },
  { value: "process-automation",       label: "Process Automation" },
  { value: "ai-software", label: "AI Software" },
  { value: "api-integration",     label: "API Integration" },
  { value: "ai-consulting",     label: "AI Consulting" },
  { value: "marketting-system",     label: "Marketting System" },
  { value: "collaboration",  label: "Collaboration" },
  { value: "other",          label: "Other" },
];

// The form posts here. The API route reads RESEND_API_KEY / RESEND_FROM /
// CONTACT_TO from environment variables (see .env.example).
// Destination address for the notification email. Pulled from env so it stays
// out of source. Falls back to the public EMAIL constant if unset.
export const CONTACT_TO =
  process.env.NEXT_PUBLIC_CONTACT_TO || EMAIL;
