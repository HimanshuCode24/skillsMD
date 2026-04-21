import { NextResponse } from "next/server";

export const skillStatuses = ["pending", "approved", "rejected"] as const;

export type SkillStatus = (typeof skillStatuses)[number];

export function isSkillStatus(value: unknown): value is SkillStatus {
  return typeof value === "string" && skillStatuses.includes(value as SkillStatus);
}

export function verifyAdminRequest(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return NextResponse.json({ error: "ADMIN_SECRET is not configured." }, { status: 503 });
  }

  const providedSecret = request.headers.get("x-admin-secret");
  if (providedSecret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
}

