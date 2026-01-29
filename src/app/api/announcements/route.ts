import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET() {
  const announcements = await prisma.announcement.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json({ announcements });
}
