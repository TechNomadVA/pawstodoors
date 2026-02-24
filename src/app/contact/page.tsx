import Link from "next/link";
import { ContactForm } from "./ContactForm";

const INSTAGRAM_URL = "https://www.instagram.com/paws2doors_/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61558587395731";

export const metadata = {
  title: "Contact & sign up",
  description:
    "Get in touch or sign up for dog walking and pet services. Widnes, Rainhill and surrounding areas. Inquiries and new clients welcome.",
};

export default function ContactPage() {
  return (
    <div className="container-wide py-8 md:py-12">
      <h1 className="font-heading text-3xl font-semibold mb-4">
        Contact & sign up
      </h1>
      <p className="text-[var(--colour-text)] mb-8">
        Interested in joining the Paws2Doors family or have a question? Send
        us a message and we&apos;ll get back to you.
      </p>

      <div className="max-w-[var(--content-narrow)]">
        <ContactForm />
      </div>

      <p className="mt-8 text-[var(--colour-text-muted)]">
        You can also reach us on{" "}
        <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          Instagram
        </Link>{" "}
        or{" "}
        <Link href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
          Facebook
        </Link>{" "}
        if you prefer.
      </p>
    </div>
  );
}
