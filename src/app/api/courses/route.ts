import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET() {
  const courses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      level: true,
      durationWeeks: true,
      status: true,
    },
  });

  return NextResponse.json({ courses });
}
