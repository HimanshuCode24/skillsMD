"use client";

import { useEffect } from "react";
import { Github, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type CommunityAuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CommunityAuthModal({
  open,
  onClose,
}: CommunityAuthModalProps) {
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  async function handleProvider(provider: "github" | "google") {
    if (!supabase) {
      onClose();
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/community`,
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <Card className="relative w-full max-w-md rounded-[1.75rem] border-white/50 bg-white shadow-2xl">
        <button
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
          onClick={onClose}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Join the community
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-sm leading-7 text-muted-foreground">
            Sign in to submit posts, star your favorite builders, and connect with
            people publishing reusable Claude workflows.
          </p>
          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={() => handleProvider("github")}
              type="button"
              variant="outline"
            >
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
            <Button
              className="w-full"
              onClick={() => handleProvider("google")}
              type="button"
              variant="outline"
            >
              Sign in with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
