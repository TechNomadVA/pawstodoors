import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Manage dogs",
  description: "Add, edit dogs and assign owners.",
};

export default function AdminDogsPage() {
  return (
    <div className="container-wide py-8 md:py-12">
      <h1 className="font-heading text-3xl font-semibold mb-4">
        Manage dogs
      </h1>
      <p className="text-[var(--colour-text-muted)] mb-8">
        Admin will list all dogs, add new ones, assign owners, and open each
        dog’s page to post to their feed.
      </p>
      <Button href="/admin">Back to admin</Button>
    </div>
  );
}
