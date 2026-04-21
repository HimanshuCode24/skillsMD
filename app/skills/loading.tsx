export default function SkillsLoading() {
  return (
    <main className="container py-16">
      <div className="animate-pulse space-y-8">
        <div className="space-y-4">
          <div className="h-4 w-24 rounded-full bg-muted" />
          <div className="h-10 w-80 rounded-full bg-muted" />
          <div className="h-6 w-full max-w-2xl rounded-full bg-muted" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-11 rounded-2xl bg-muted" />
          <div className="h-11 rounded-2xl bg-muted" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 rounded-[1.5rem] border border-border bg-card/60"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
