"use client";

import { Check, Clock, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { skillStatuses, type SkillStatus } from "@/lib/admin";
import type { Skill } from "@/lib/types";

const statusIcons = {
  pending: Clock,
  approved: Check,
  rejected: X
};

export function AdminModerationPanel() {
  const [secret, setSecret] = useState("");
  const [activeStatus, setActiveStatus] = useState<SkillStatus>("pending");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const savedSecret = window.localStorage.getItem("skills_admin_secret");
    if (savedSecret) setSecret(savedSecret);
  }, []);

  function loadSkills(status = activeStatus) {
    setError("");
    window.localStorage.setItem("skills_admin_secret", secret);

    startTransition(async () => {
      const response = await fetch(`/api/admin/skills?status=${status}`, {
        headers: { "x-admin-secret": secret }
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        setError(body?.error ?? "Could not load skills.");
        setSkills([]);
        return;
      }

      setSkills(body.skills ?? []);
    });
  }

  function changeStatus(id: string, status: SkillStatus) {
    setError("");

    startTransition(async () => {
      const response = await fetch("/api/admin/skills", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret
        },
        body: JSON.stringify({ id, status })
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        setError(body?.error ?? "Could not update skill.");
        return;
      }

      setSkills((current) => current.filter((skill) => skill.id !== id));
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Admin access</h2>
          <p className="text-sm leading-6 text-slate-600">
            Enter the `ADMIN_SECRET` configured in production. This MVP keeps the secret in local storage on this device.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              placeholder="ADMIN_SECRET"
            />
            <Button type="button" onClick={() => loadSkills()} disabled={!secret || isPending}>
              {isPending ? "Loading..." : "Load queue"}
            </Button>
          </div>
          {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        {skillStatuses.map((status) => {
          const Icon = statusIcons[status];
          return (
            <Button
              key={status}
              type="button"
              variant={activeStatus === status ? "default" : "secondary"}
              onClick={() => {
                setActiveStatus(status);
                if (secret) loadSkills(status);
              }}
            >
              <Icon className="mr-2 h-4 w-4" />
              {status}
            </Button>
          );
        })}
      </div>

      {skills.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-white/60 p-10 text-center">
          <h3 className="text-lg font-semibold">No {activeStatus} skills loaded</h3>
          <p className="mt-2 text-sm text-slate-600">Load the queue or switch moderation status.</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{skill.category}</Badge>
                  <Badge>{skill.difficulty}</Badge>
                  <Badge>{skill.status}</Badge>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{skill.title}</h3>
                <p className="max-w-3xl text-sm leading-6 text-slate-600">{skill.description}</p>
              </CardHeader>
              <CardContent>
                <pre className="max-h-72 overflow-auto rounded-2xl bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100">
                  <code>{skill.skill_md}</code>
                </pre>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button type="button" onClick={() => changeStatus(skill.id, "approved")} disabled={isPending}>
                    Approve
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => changeStatus(skill.id, "pending")} disabled={isPending}>
                    Mark pending
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => changeStatus(skill.id, "rejected")} disabled={isPending}>
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

