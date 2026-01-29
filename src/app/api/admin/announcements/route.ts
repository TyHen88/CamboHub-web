import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getCurrentUserFromToken } from "@/lib/auth/getServerUser";
import { AuthError, requireRole } from "@/lib/auth/roleGuard";

const schema = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
  audience: z.enum(["ALL", "STUDENT", "ADMIN"]).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function GET(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);

    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ announcements });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to load announcements" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);
    const body = schema.parse(await request.json());

    const announcement = await prisma.announcement.create({
      data: {
        title: body.title,
        body: body.body,
        audience: body.audience ?? "ALL",
        status: body.status ?? "DRAFT",
        publishedAt: body.status === "PUBLISHED" ? new Date() : null,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "announcement.create",
        entityType: "Announcement",
        entityId: announcement.id,
        userId: currentUser!.id,
      },
    });

    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to create announcement" }, { status: 500 });
  }
}
