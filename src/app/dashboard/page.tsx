import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "My dashboard",
  description: "Your dogs and quick links.",
};

export default function DashboardPage() {
  return (
    <div className="container-wide py-8 md:py-12">
      <h1 className="font-heading text-3xl font-semibold mb-4">
        My dashboard
      </h1>
      <p className="text-[var(--colour-text-muted)] mb-8">
        When you’re logged in, you’ll see your dogs here and quick links to
        their profiles and request forms.
      </p>
      <div className="rounded-[var(--radius-lg)] bg-[var(--colour-accent-soft)] p-8 max-w-lg">
        <p className="mb-4">Owner portal is being built. You’ll be able to:</p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-[var(--colour-text)]">
          <li>See all your dogs in one place</li>
          <li>Open each dog’s profile and feed</li>
          <li>Request extra walks, holidays or breaks</li>
          <li>Get updates and photos per dog</li>
        </ul>
        <Button href="/login">Go to login</Button>
      </div>
    </div>
  );
}
