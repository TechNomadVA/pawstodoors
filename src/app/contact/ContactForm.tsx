"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    try {
      // Use Formspree or your API: replace with your endpoint
      const res = await fetch(form.action || "#", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus("done");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="#"
      method="post"
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Your name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full max-w-[var(--content-narrow)] rounded-[var(--radius)] border border-[var(--colour-border)] px-4 py-2 font-body text-base focus:outline-none focus:ring-2 focus:ring-[var(--colour-focus)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full max-w-[var(--content-narrow)] rounded-[var(--radius)] border border-[var(--colour-border)] px-4 py-2 font-body text-base focus:outline-none focus:ring-2 focus:ring-[var(--colour-focus)]"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block font-medium mb-1">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full max-w-[var(--content-narrow)] rounded-[var(--radius)] border border-[var(--colour-border)] px-4 py-2 font-body text-base focus:outline-none focus:ring-2 focus:ring-[var(--colour-focus)]"
        >
          <option value="signup">Sign up / new client</option>
          <option value="inquiry">General inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your dog and what you're looking for…"
          className="w-full max-w-[var(--content-narrow)] rounded-[var(--radius)] border border-[var(--colour-border)] px-4 py-2 font-body text-base resize-y focus:outline-none focus:ring-2 focus:ring-[var(--colour-focus)]"
        />
      </div>
      {status === "done" && (
        <p className="text-[var(--colour-accent)] font-medium">
          Thanks! We&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600">
          Something went wrong. Please try again or contact us on social media.
        </p>
      )}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
