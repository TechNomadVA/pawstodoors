import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Admin",
  description: "Manage dogs, owners, posts and requests.",
};

export default function AdminPage() {
  return (
    <div className="container-wide py-8 md:py-12">
      <h1 className="font-heading text-3xl font-semibold mb-4">Admin</h1>
      <p className="text-[var(--colour-text-muted)] mb-8">
        When Liv is logged in as admin, she’ll see an overview, requests queue,
        and links to manage dogs and post to feeds.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
        <Link
          href="/admin/dogs"
          className="rounded-[var(--radius)] border border-[var(--colour-border)] bg-[var(--colour-surface)] p-6 font-medium no-underline hover:bg-[var(--colour-accent-soft)]"
        >
          Manage dogs
        </Link>
        <span className="rounded-[var(--radius)] border border-[var(--colour-border)] bg-[var(--colour-bg-alt)] p-6 text-[var(--colour-text-muted)]">
          Requests queue (coming soon)
        </span>
      </div>
      <p className="mt-8">
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </p>
    </div>
  );
}
