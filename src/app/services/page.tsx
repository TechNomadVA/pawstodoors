import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Services",
  description:
    "Dog walking and pet services in Widnes, Rainhill and surrounding areas. First aid trained, insured and DBS checked.",
};

export default function ServicesPage() {
  return (
    <div className="container-wide py-8 md:py-12">
      <h1 className="font-heading text-3xl font-semibold mb-4">
        Our services
      </h1>
      <p className="font-medium text-[var(--colour-text)] mb-8">
        Widnes, Rainhill & surrounding areas — First aid trained, insured and
        DBS checked.
      </p>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold border-b border-[var(--colour-accent-soft)] pb-2 mb-3">
          Regular dog walking
        </h2>
        <p className="text-[var(--colour-text)]">
          Consistent, reliable walks tailored to your dog&apos;s needs.
          We&apos;ll keep you updated with photos and action shots so
          you&apos;re never left wondering how the walk went.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold border-b border-[var(--colour-accent-soft)] pb-2 mb-3">
          Play dates & socialisation
        </h2>
        <p className="text-[var(--colour-text)]">
          Would your pooch benefit from time with furry friends? We can arrange
          play dates and socialisation as part of our service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold border-b border-[var(--colour-accent-soft)] pb-2 mb-3">
          Extra walks
        </h2>
        <p className="text-[var(--colour-text)]">
          Need an additional walk or a one-off? Once you&apos;re a client, you
          can request extra walks through your dog&apos;s profile (owner
          login).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold border-b border-[var(--colour-accent-soft)] pb-2 mb-3">
          Holidays & breaks
        </h2>
        <p className="text-[var(--colour-text)]">
          Going away or pausing services? Let us know via your dog&apos;s
          profile so we can plan together and resume when you&apos;re back.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold border-b border-[var(--colour-accent-soft)] pb-2 mb-3">
          Other pet services
        </h2>
        <p className="text-[var(--colour-text)]">
          We can discuss other options — pop in an inquiry on our{" "}
          <Link href="/contact" className="font-medium">
            contact page
          </Link>{" "}
          and we&apos;ll get back to you.
        </p>
      </section>

      <Button href="/contact">Inquire or sign up</Button>
    </div>
  );
}
