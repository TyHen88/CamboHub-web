import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getCurrentUserFromToken } from "@/lib/auth/getServerUser";
import { AuthError, requireRole } from "@/lib/auth/roleGuard";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  level: z.string().optional(),
  durationWeeks: z.number().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function GET(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);

    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to load courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);
    const body = schema.parse(await request.json());

    const course = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
        level: body.level ?? "Beginner",
        durationWeeks: body.durationWeeks ?? 6,
        status: body.status ?? "DRAFT",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "course.create",
        entityType: "Course",
        entityId: course.id,
        userId: currentUser!.id,
        metadata: { title: course.title },
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to create course" }, { status: 500 });
  }
}
