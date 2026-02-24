import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `Edit dog`, description: `Edit dog and post to feed.` };
}

export default async function AdminDogPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="container-wide py-8 md:py-12">
      <h1 className="font-heading text-3xl font-semibold mb-4">Edit dog</h1>
      <p className="text-[var(--colour-text-muted)] mb-6">
        Admin view for dog {id}: edit details, assign owners, and post
        photos/videos/statuses to this dog’s feed.
      </p>
      <Button href="/admin/dogs">Back to dogs</Button>
    </div>
  );
}
