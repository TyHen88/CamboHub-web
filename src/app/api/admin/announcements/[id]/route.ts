import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getCurrentUserFromToken } from "@/lib/auth/getServerUser";
import { AuthError, requireRole } from "@/lib/auth/roleGuard";

const schema = z.object({
  title: z.string().min(3).optional(),
  body: z.string().min(10).optional(),
  audience: z.enum(["ALL", "STUDENT", "ADMIN"]).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);
    const body = schema.parse(await request.json());
    const { id } = await params;

    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        ...body,
        publishedAt: body.status === "PUBLISHED" ? new Date() : undefined,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "announcement.update",
        entityType: "Announcement",
        entityId: announcement.id,
        userId: currentUser!.id,
      },
    });

    return NextResponse.json({ announcement });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to update announcement" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);
    const { id } = await params;

    const announcement = await prisma.announcement.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        action: "announcement.delete",
        entityType: "Announcement",
        entityId: announcement.id,
        userId: currentUser!.id,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to delete announcement" }, { status: 500 });
  }
}
