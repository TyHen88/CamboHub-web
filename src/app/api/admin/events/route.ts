import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getCurrentUserFromToken } from "@/lib/auth/getServerUser";
import { AuthError, requireRole } from "@/lib/auth/roleGuard";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().optional(),
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function GET(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);

    const events = await prisma.event.findMany({
      orderBy: { startAt: "desc" },
    });

    return NextResponse.json({ events });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to load events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);
    const body = schema.parse(await request.json());

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        startAt: body.startAt ? new Date(body.startAt) : new Date(),
        endAt: body.endAt ? new Date(body.endAt) : new Date(),
        status: body.status ?? "DRAFT",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "event.create",
        entityType: "Event",
        entityId: event.id,
        userId: currentUser!.id,
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to create event" }, { status: 500 });
  }
}
