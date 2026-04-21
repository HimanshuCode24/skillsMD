"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthControls() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  if (!supabase) {
    return <p className="text-xs text-muted-foreground">Demo mode</p>;
  }

  if (loading) {
    return <p className="text-xs text-muted-foreground">Checking account...</p>;
  }

  if (!user) {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: `${window.location.origin}/dashboard`,
            },
          });
        }}
      >
        Sign in with GitHub
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium">{user.user_metadata?.user_name ?? "Creator"}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={async () => {
          await supabase.auth.signOut();
        }}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
}
