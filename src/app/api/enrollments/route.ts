import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { getCurrentUserFromToken } from "@/lib/auth/getServerUser";
import { AuthError, requireRole } from "@/lib/auth/roleGuard";

export async function GET(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN", "STUDENT"]);

    const enrollments = await prisma.enrollment.findMany({
      where:
        currentUser?.role === "ADMIN"
          ? undefined
          : { userId: currentUser?.id },
      include: {
        course: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ enrollments });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to load enrollments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN", "STUDENT"]);
    const body = await request.json();

    if (!body.courseId) {
      return NextResponse.json({ error: "courseId required" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: body.courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const existing = await prisma.enrollment.findFirst({
      where: { userId: currentUser!.id, courseId: body.courseId },
    });

    if (existing) {
      return NextResponse.json({ enrollment: existing });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: currentUser!.id,
        courseId: body.courseId,
        status: "ACTIVE",
        progress: 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "enrollment.create",
        entityType: "Enrollment",
        entityId: enrollment.id,
        userId: currentUser!.id,
        metadata: {
          courseId: body.courseId,
        },
      },
    });

    return NextResponse.json({ enrollment });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to enroll" }, { status: 500 });
  }
}
