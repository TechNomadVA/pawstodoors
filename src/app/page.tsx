import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61558587395731";
const INSTAGRAM_URL = "https://www.instagram.com/paws2doors_/";

export default function HomePage() {
  return (
    <div className="container-wide py-8 md:py-12">
      <section className="rounded-[var(--radius-lg)] bg-[var(--colour-accent-soft)] px-6 py-10 md:py-14 text-center">
        <Image
          src="/banner.png"
          alt="Welcoming all paws through our doors — Paws2Doors"
          width={1200}
          height={400}
          className="mx-auto mb-8 max-h-72 w-full object-cover object-center rounded-[var(--radius-lg)]"
          priority
        />
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-[var(--colour-text)] mb-4">
          Welcoming all paws through our doors
        </h1>
        <p className="text-lg text-[var(--colour-text-muted)] max-w-[var(--content-narrow)] mx-auto mb-6">
          Dog walking and pet services in Widnes, Rainhill & surrounding areas.
          First aid trained, insured and DBS checked. Each dog gets their own
          space — photos, updates and requests in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/contact">Inquire or sign up</Button>
          <Button href="/services" variant="secondary">
            What we offer
          </Button>
        </div>
      </section>

      <section className="py-10">
        <h2 className="font-heading text-2xl font-semibold border-b-2 border-[var(--colour-accent-soft)] pb-2 mb-4">
          What we do
        </h2>
        <p className="text-[var(--colour-text)] mb-4">
          We offer regular dog walking and extra services so your dog gets the
          attention they deserve. As a client, you&apos;ll get updates and a
          dedicated place to see your dog&apos;s profile, request extra walks,
          tell us about holidays or breaks, and stay in the loop — without
          chasing updates on social media.
        </p>
        <Link href="/services" className="font-medium">
          See our services
        </Link>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-[var(--colour-bg-alt)] p-8 md:p-10">
        <h2 className="font-heading text-2xl font-semibold mt-0 mb-4">
          Follow along
        </h2>
        <p className="text-[var(--colour-text)] mb-6">
          Our main updates, photos and news are on social media. Follow us and
          check back here for inquiries and owner login.
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--colour-border)] bg-[var(--colour-surface)] px-4 py-2 font-medium hover:bg-[var(--colour-accent-soft)] no-underline"
          >
            Instagram
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--colour-border)] bg-[var(--colour-surface)] px-4 py-2 font-medium hover:bg-[var(--colour-accent-soft)] no-underline"
          >
            Facebook
          </a>
        </div>
        <div
          className="max-w-[500px] mx-auto"
          aria-label="Paws2Doors Facebook feed"
        >
          <iframe
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_URL)}&tabs=timeline&width=400&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
            width={400}
            height={500}
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder={0}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Paws2Doors on Facebook"
            className="w-full max-w-full"
          />
        </div>
      </section>
    </div>
  );
}
