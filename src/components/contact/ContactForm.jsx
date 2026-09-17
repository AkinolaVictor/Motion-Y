// ContactForm — right column of the contact band.
// Premium accessible form: Name, Email, project type, Message, Send.
// Client-side validation mirrors the server; on submit the form POSTs to
// FORM_ENDPOINT (/api/contact) which delivers two emails via Resend.

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { PROJECT_TYPES, FORM_ENDPOINT } from "../../data/contact";

const INITIAL = { name: "", email: "", type: "", message: "" };
const MIN_MESSAGE = 10;

export default function ContactForm() {
  const formRef = useRef(null);
  const successRef = useRef(null);
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState(null);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(formRef.current.querySelectorAll("[data-field]"), {
        y: 14,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.1,
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  function validate(field, value) {
    if (field === "name" && !value.trim()) return "Please add your name.";
    if (field === "email") {
      if (!value.trim()) return "Please add your email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "That email looks off.";
    }
    if (field === "type" && !value) return "Pick what you're working on.";
    if (field === "message") {
      if (!value.trim()) return "Tell me a little about the problem.";
      if (value.trim().length < MIN_MESSAGE) return "A few more words, please.";
    }
    return null;
  }

  function onChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Live-clear errors as the user types once they've touched the field.
    if (touched[name]) {
      const err = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: err || undefined }));
    }
  }

  function onBlur(e) {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const err = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: err || undefined }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    // Validate every field at submit time.
    const next = {};
    Object.keys(INITIAL).forEach((k) => {
      const err = validate(k, values[k]);
      if (err) next[k] = err;
    });
    setErrors(next);
    setTouched({ name: true, email: true, type: true, message: true });
    if (Object.keys(next).length) return;

    setStatus("sending");
    setServerError(null);
    try {
      // axios auto-stringifies JSON, sets Content-Type, and throws on non-2xx.
      const { data } = await axios.post(FORM_ENDPOINT, values, {
        headers: { Accept: "application/json" },
        timeout: 15000,
      });

      setStatus("sent");
      // Brief success animation, then reset the form.
      if (successRef.current) {
        gsap.from(successRef.current, {
          y: 8,
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      }
      // data.autoReplyDelivered is available if you want to surface it later.
      void data;
    } catch (e) {
      setStatus("error");
      // axios attaches the parsed response payload to error.response.data.
      const payload = e?.response?.data;
      if (payload?.fields) {
        // Server-side validation errors — surface them per field.
        setErrors(payload.fields);
        setTouched({ name: true, email: true, type: true, message: true });
      }
      const msg =
        payload?.error ||
        (e?.code === "ECONNABORTED"
          ? "Request timed out. Check your connection and try again."
          : e?.response
          ? `Send failed (${e.response.status}). Try again or email directly.`
          : "Couldn't reach the server. Check your connection or email me directly.");
      setServerError(msg);
    }
  }

  function resetForm() {
    setValues(INITIAL);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setServerError(null);
  }

  return (
    <div className="w9:col-span-7 flex flex-col">
      {status === "sent" ? (
        <div
          ref={successRef}
          role="status"
          className="flex flex-col gap-4 rounded-xl border border-[var(--accent)]/40 bg-[var(--bg-surface)] px-6 py-8"
        >
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
            Message sent
          </p>
          <h3 className="overpass text-[24px] font-semibold tracking-tight text-[var(--text-primary)]">
            Thanks — I'll reply soon.
          </h3>
          <p className="text-[14px] leading-[1.7] text-[var(--text-muted)]">
            Your message landed. Expect a reply within 48 hours, Monday to Friday. If it's
            urgent, the fastest path is{" "}
            <a
              href={`mailto:${"akinolavictor50@gmail.com"}`}
              className="text-[var(--text-primary)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
            >
              {"akinolavictor50@gmail.com"}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="mono self-start text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            Send another →
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-5"
          aria-label="Contact form"
        >
          <Field
            label="Name"
            name="name"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.name ? errors.name : undefined}
            placeholder="Your name"
            autoComplete="name"
          />

          <Field
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.email ? errors.email : undefined}
            placeholder="you@company.com"
            autoComplete="email"
          />

          <SelectField
            label="What are you working on?"
            name="type"
            value={values.type}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.type ? errors.type : undefined}
            options={PROJECT_TYPES}
          />

          <TextareaField
            label="Message"
            name="message"
            value={values.message}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.message ? errors.message : undefined}
            placeholder="Tell us a little about the problem..."
          />

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <p
              className={[
                "mono text-[11px] uppercase tracking-[0.22em]",
                status === "error"
                  ? "text-red-400"
                  : "text-[var(--text-muted)]/70",
              ].join(" ")}
              role={status === "error" ? "alert" : undefined}
            >
              {status === "error"
                ? serverError || "Something went wrong. Try again or email directly."
                : "No spam. No newsletter. Just a reply."}
            </p>

            <button
              type="submit"
              disabled={status === "sending"}
              className={[
                "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-medium tracking-tight",
                "transition-[transform,background-color,opacity] duration-200 will-change-transform select-none",
                "bg-[var(--accent)] text-[var(--accent-fg)]",
                "hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--accent)_70%,transparent)]",
                "disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]",
              ].join(" ")}
            >
              {status === "sending" ? (
                <>
                  <Spinner />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// --- Field primitives ---------------------------------------------------------

const fieldBase =
  "block w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] " +
  "px-4 py-3 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 " +
  "outline-none transition-colors focus:border-[var(--accent)]";

function Field({ label, error, id, ...rest }) {
  const errorId = error ? `${id}-err` : undefined;
  return (
    <div data-field className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={[fieldBase, error ? "border-red-400/70" : ""].join(" ")}
        {...rest}
      />
      {error && (
        <p id={errorId} className="mono text-[11px] uppercase tracking-[0.18em] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({ label, error, id, ...rest }) {
  const errorId = error ? `${id}-err` : undefined;
  return (
    <div data-field className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={[fieldBase, "resize-y min-h-[120px]", error ? "border-red-400/70" : ""].join(" ")}
        {...rest}
      />
      {error && (
        <p id={errorId} className="mono text-[11px] uppercase tracking-[0.18em] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, error, id, options, ...rest }) {
  const errorId = error ? `${id}-err` : undefined;
  return (
    <div data-field className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={[
            fieldBase,
            "appearance-none pr-10",
            rest.value === "" ? "text-[var(--text-muted)]/60" : "",
            error ? "border-red-400/70" : "",
          ].join(" ")}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.value === ""}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[var(--text-muted)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
      {error && (
        <p id={errorId} className="mono text-[11px] uppercase tracking-[0.18em] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
