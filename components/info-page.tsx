type InfoSection = {
  title: string;
  body: string[];
};

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
};

export function InfoPage({ eyebrow, title, intro, sections }: InfoPageProps) {
  return (
    <main className="container py-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="text-lg leading-8 text-muted-foreground">{intro}</p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.75rem] border border-border/70 bg-white/70 p-6"
            >
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
