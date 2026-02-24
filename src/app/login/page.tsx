import Link from "next/link";
import { Button } from "@/components/ui/Button";

const INSTAGRAM_URL = "https://www.instagram.com/paws2doors_/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61558587395731";

export const metadata = {
  title: "Owner login",
  description: "Log in to view your dog's profile, updates and requests.",
};

export default function LoginPage() {
  return (
    <div className="container-wide py-8 md:py-12">
      <h1 className="font-heading text-3xl font-semibold mb-8">
        Owner login
      </h1>

      <div className="max-w-[var(--content-narrow)] mx-auto rounded-[var(--radius-lg)] bg-[var(--colour-accent-soft)] p-8 md:p-10 text-center">
        <p className="font-semibold text-[var(--colour-text)] mb-4">
          Owner portal coming soon.
        </p>
        <p className="text-[var(--colour-text)] mb-6">
          We&apos;re building a dedicated area where you can log in, see your
          dog&apos;s profile, get photos and updates, and request extra walks,
          holidays or breaks. In the meantime, please get in touch via{" "}
          <Link href="/contact" className="font-medium">
            contact
          </Link>
          ,{" "}
          <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </Link>{" "}
          or{" "}
          <Link href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            Facebook
          </Link>
          .
        </p>
        <Button href="/">Back to home</Button>
      </div>
    </div>
  );
}
