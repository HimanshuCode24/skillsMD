import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Skills Directory",
  description: "Discover, copy, and submit reusable Claude AI skills structured as SKILL.md files."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain font-display antialiased">
        <header className="sticky top-0 z-50 border-b bg-[#fffaf2]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 font-mono text-sm font-semibold text-orange-300 shadow-soft">
                SK
              </span>
              <span className="text-lg font-semibold tracking-tight">Claude Skills Directory</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
              <Link className="transition hover:text-slate-950" href="/skills">
                Skills
              </Link>
              <Link className="rounded-full bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800" href="/submit">
                Submit
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
