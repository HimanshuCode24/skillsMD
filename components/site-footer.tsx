import Link from "next/link";

const footerGroups = [
  {
    title: "Product",
    links: [
      { href: "/skills", label: "Directory" },
      { href: "/submit", label: "Submit" },
      { href: "/pricing", label: "Pricing" },
      { href: "/community", label: "Community" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/install-guide", label: "Install Guide" },
      { href: "/faq", label: "FAQ" },
      { href: "/submission-guidelines", label: "Submission Guidelines" },
      { href: "/creator-guide", label: "Creator Guide" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-white/70">
      <div className="container py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Claude Skills Directory</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Discover reusable Claude skills, MCP servers, and install-ready
                workflows for builders who want less prompting and more shipping.
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Skills, MCPs, and reusable workflows
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.title}
              </p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
