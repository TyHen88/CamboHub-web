import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getCurrentUserFromToken } from "@/lib/auth/getServerUser";
import { AuthError, requireRole } from "@/lib/auth/roleGuard";

const schema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  level: z.string().optional(),
  durationWeeks: z.number().optional(),
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

    const course = await prisma.course.update({
      where: { id },
      data: body,
    });

    await prisma.auditLog.create({
      data: {
        action: "course.update",
        entityType: "Course",
        entityId: course.id,
        userId: currentUser!.id,
        metadata: { title: course.title },
      },
    });

    return NextResponse.json({ course });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to update course" }, { status: 500 });
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

    const course = await prisma.course.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: "course.delete",
        entityType: "Course",
        entityId: course.id,
        userId: currentUser!.id,
        metadata: { title: course.title },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to delete course" }, { status: 500 });
  }
}
