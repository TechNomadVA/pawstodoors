import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `Dog profile`,
    description: `View updates and request services for your dog.`,
  };
}

export default async function DogProfilePage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="container-wide py-8 md:py-12">
      <h1 className="font-heading text-3xl font-semibold mb-4">
        Dog profile
      </h1>
      <p className="text-[var(--colour-text-muted)] mb-6">
        Once the owner portal is live, this page will show the dog’s profile,
        feed (photos, videos, statuses), and forms to request extra walks,
        holidays or breaks. Dog ID: {id}
      </p>
      <div className="flex gap-4">
        <Button href="/dashboard">Back to dashboard</Button>
        <Button href="/login" variant="secondary">
          Log in
        </Button>
      </div>
    </div>
  );
}
