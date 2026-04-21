import { CommunityThreadForm } from "@/components/community-thread-form";
import { Badge } from "@/components/ui/badge";

export default function NewCommunityThreadPage() {
  return (
    <main className="container py-16">
      <div className="mb-10 max-w-3xl space-y-4">
        <Badge className="bg-secondary text-secondary-foreground">New thread</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">
          Start a discussion with other Claude skill builders
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Ask for feedback, share a launch breakdown, or start a conversation about
          pricing, packaging, and workflow design.
        </p>
      </div>
      <CommunityThreadForm />
    </main>
  );
}
