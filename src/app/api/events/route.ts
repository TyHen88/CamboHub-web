import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { startAt: "asc" },
  });

  return NextResponse.json({ events });
}
